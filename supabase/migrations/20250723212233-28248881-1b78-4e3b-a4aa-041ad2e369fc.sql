-- Update email_submissions table to use hashed passwords
ALTER TABLE public.email_submissions 
RENAME COLUMN password_attempt TO password_hash;

-- Add comment to clarify this stores hashed passwords, not plaintext
COMMENT ON COLUMN public.email_submissions.password_hash IS 'Stores bcrypt hashed password attempts, never plaintext';