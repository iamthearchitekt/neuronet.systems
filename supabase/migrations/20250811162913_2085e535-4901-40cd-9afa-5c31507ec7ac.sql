-- Security hardening: tighten RLS and add admin-only role management, plus helpful indexes

-- Ensure RLS is enabled on sensitive tables (idempotent)
ALTER TABLE IF EXISTS public.access_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.email_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_roles ENABLE ROW LEVEL SECURITY;

-- 1) Remove public INSERT capabilities (service role will bypass RLS for inserts via edge function)
DROP POLICY IF EXISTS "Allow access attempt logging" ON public.access_attempts;
DROP POLICY IF EXISTS "Allow public email submissions with time restrictions" ON public.email_submissions;

-- 2) Admin-only management for user_roles
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
CREATE POLICY "Admins can manage user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3) Helpful indexes to support rate limiting and audits (idempotent)
CREATE INDEX IF NOT EXISTS idx_access_attempts_ip_time ON public.access_attempts (ip_address, attempt_time DESC);
CREATE INDEX IF NOT EXISTS idx_access_attempts_email_time ON public.access_attempts (email, attempt_time DESC);
CREATE INDEX IF NOT EXISTS idx_email_submissions_time ON public.email_submissions (submitted_at DESC);