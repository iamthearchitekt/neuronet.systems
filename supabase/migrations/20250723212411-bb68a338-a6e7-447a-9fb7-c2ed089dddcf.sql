-- Create table to track rate limiting and lockouts
CREATE TABLE public.access_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  email TEXT,
  attempt_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_success BOOLEAN NOT NULL DEFAULT false,
  lockout_until TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.access_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting access attempts (for edge function)
CREATE POLICY "Allow public access attempt logging" 
ON public.access_attempts 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing attempts (admin only)
CREATE POLICY "Admin can view access attempts" 
ON public.access_attempts 
FOR SELECT 
USING (false);

-- Create index for efficient IP lookups
CREATE INDEX idx_access_attempts_ip_time ON public.access_attempts (ip_address, attempt_time);

-- Create index for cleanup queries
CREATE INDEX idx_access_attempts_time ON public.access_attempts (attempt_time);

-- Create function to clean up old access attempts (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_access_attempts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.access_attempts 
  WHERE attempt_time < now() - interval '24 hours';
END;
$$;