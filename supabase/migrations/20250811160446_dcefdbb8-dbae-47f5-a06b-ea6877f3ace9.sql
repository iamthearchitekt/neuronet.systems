-- Tighten data access for sensitive table email_submissions
-- 1) Drop overly permissive public SELECT policy
DROP POLICY IF EXISTS "Allow viewing all email submissions" ON public.email_submissions;

-- 2) Helper to identify admins from JWT (expects app_metadata.role = 'admin')
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path TO ''
AS $$
  SELECT COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

-- 3) Allow SELECT only to admins
CREATE POLICY "Only admins can view email submissions"
ON public.email_submissions
FOR SELECT
USING (public.is_admin());