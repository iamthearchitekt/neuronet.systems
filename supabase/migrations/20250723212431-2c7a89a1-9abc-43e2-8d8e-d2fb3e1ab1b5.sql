-- Fix the search path security issue for the cleanup function
CREATE OR REPLACE FUNCTION public.cleanup_old_access_attempts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  DELETE FROM public.access_attempts 
  WHERE attempt_time < now() - interval '24 hours';
END;
$$;