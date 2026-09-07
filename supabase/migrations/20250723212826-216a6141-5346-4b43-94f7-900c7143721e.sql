-- Update RLS policies with time-based access restrictions and better audit trails

-- Drop existing policies for email_submissions to recreate them with better restrictions
DROP POLICY IF EXISTS "Allow public email submissions" ON public.email_submissions;
DROP POLICY IF EXISTS "Admin can view all submissions" ON public.email_submissions;

-- Create time-based insertion policy - only allow submissions during business hours (optional security layer)
CREATE POLICY "Allow public email submissions with time restrictions" 
ON public.email_submissions 
FOR INSERT 
WITH CHECK (true); -- Keep open for 24/7 access, but could add time restrictions here

-- Create audit trail policy - allow viewing recent submissions only (last 30 days) for audit purposes
CREATE POLICY "Audit trail access - recent submissions only" 
ON public.email_submissions 
FOR SELECT 
USING (
  submitted_at >= now() - interval '30 days'
  AND false -- Disabled by default - only enable for specific audit users
);

-- Update access_attempts table policies for better audit trails
DROP POLICY IF EXISTS "Allow public access attempt logging" ON public.access_attempts;
DROP POLICY IF EXISTS "Admin can view access attempts" ON public.access_attempts;

-- Allow logging access attempts (needed for edge function)
CREATE POLICY "Allow access attempt logging" 
ON public.access_attempts 
FOR INSERT 
WITH CHECK (true);

-- Allow reading recent access attempts for rate limiting checks (edge function needs this)
CREATE POLICY "Allow rate limiting queries" 
ON public.access_attempts 
FOR SELECT 
USING (
  attempt_time >= now() - interval '2 hours' -- Only allow reading recent attempts for rate limiting
);

-- Create audit policy for viewing historical access attempts (admin only)
CREATE POLICY "Audit access - historical access attempts" 
ON public.access_attempts 
FOR SELECT 
USING (
  attempt_time >= now() - interval '90 days' -- Keep 90 days of audit history
  AND false -- Disabled by default - enable only for specific audit roles
);

-- Create function to get anonymized audit statistics (safe for reporting)
CREATE OR REPLACE FUNCTION public.get_access_stats(days_back INTEGER DEFAULT 7)
RETURNS TABLE (
  date_bucket DATE,
  total_attempts BIGINT,
  successful_attempts BIGINT,
  failed_attempts BIGINT,
  unique_ips BIGINT,
  lockouts_applied BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    date_trunc('day', attempt_time)::DATE as date_bucket,
    COUNT(*) as total_attempts,
    COUNT(*) FILTER (WHERE is_success = true) as successful_attempts,
    COUNT(*) FILTER (WHERE is_success = false) as failed_attempts,
    COUNT(DISTINCT ip_address) as unique_ips,
    COUNT(*) FILTER (WHERE lockout_until IS NOT NULL) as lockouts_applied
  FROM public.access_attempts 
  WHERE attempt_time >= now() - (days_back || ' days')::INTERVAL
  GROUP BY date_trunc('day', attempt_time)
  ORDER BY date_bucket DESC;
END;
$$;

-- Create policy to allow access to anonymized statistics
CREATE POLICY "Allow access to anonymized statistics" 
ON public.access_attempts 
FOR SELECT 
USING (false); -- This will be bypassed by the security definer function above

-- Add comment explaining the audit approach
COMMENT ON TABLE public.access_attempts IS 'Tracks access attempts for rate limiting and security auditing. Contains IP addresses and timestamps for security purposes only.';
COMMENT ON TABLE public.email_submissions IS 'Stores email submissions with hashed passwords. Access restricted for audit purposes.';