-- Implement role-based access and restrict sensitive SELECTs

-- 1) Create enum app_role if missing
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');
  END IF;
END$$;

-- 2) Create user_roles table (no FK to auth.users to avoid reserved schema coupling)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3) Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = _user_id
      AND ur.role = _role
  );
$$;

-- 4) Update policies for email_submissions: admin-only via has_role
DROP POLICY IF EXISTS "Only admins can view email submissions" ON public.email_submissions;
DROP FUNCTION IF EXISTS public.is_admin();

CREATE POLICY "Admins can view email submissions"
ON public.email_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5) Restrict access_attempts SELECT to admins or the specific authenticated user (by email claim)
DROP POLICY IF EXISTS "Allow rate limiting queries" ON public.access_attempts;
DROP POLICY IF EXISTS "Allow viewing recent access attempts" ON public.access_attempts;

CREATE POLICY "Admins can view all access attempts"
ON public.access_attempts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own attempts"
ON public.access_attempts
FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'email') IS NOT NULL AND email = (auth.jwt() ->> 'email'));
