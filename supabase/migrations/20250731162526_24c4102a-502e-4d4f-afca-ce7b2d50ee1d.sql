-- Update RLS policy to allow viewing email submissions
DROP POLICY IF EXISTS "Audit trail access - recent submissions only" ON public.email_submissions;

-- Create a new policy that allows viewing all submissions
CREATE POLICY "Allow viewing all email submissions" 
ON public.email_submissions 
FOR SELECT 
USING (true);

-- Also update the access_attempts table policy to allow viewing recent attempts
DROP POLICY IF EXISTS "Allow access to anonymized statistics" ON public.access_attempts;
DROP POLICY IF EXISTS "Audit access - historical access attempts" ON public.access_attempts;

CREATE POLICY "Allow viewing recent access attempts" 
ON public.access_attempts 
FOR SELECT 
USING (attempt_time >= (now() - '30 days'::interval));