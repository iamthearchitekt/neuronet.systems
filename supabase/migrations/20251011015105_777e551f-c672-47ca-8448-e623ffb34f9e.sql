-- Drop password-related tables to eliminate all password functionality
-- This removes all password validation, storage, and attempt tracking

DROP TABLE IF EXISTS public.email_submissions CASCADE;
DROP TABLE IF EXISTS public.access_attempts CASCADE;

-- Note: The ACCESS_CODE_HASH secret can be manually removed from Supabase dashboard if desired