-- Supabase table schema for form responses
-- Run this SQL in your Supabase SQL Editor to create the necessary table

CREATE TABLE IF NOT EXISTS form_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id TEXT NOT NULL,
  chapter_title TEXT,
  form_title TEXT,
  responses JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster queries by book_id
CREATE INDEX IF NOT EXISTS idx_form_responses_book_id ON form_responses(book_id);

-- Create an index for faster queries by chapter
CREATE INDEX IF NOT EXISTS idx_form_responses_chapter ON form_responses(chapter_title);

-- Enable Row Level Security (RLS) - REQUIRED for security
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to INSERT form responses
CREATE POLICY "Allow anonymous inserts" ON form_responses
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Policy: Block all SELECT/UPDATE/DELETE from anon users
-- Only the service_role key (server-side) can read/modify data
-- This means:
--   - Public users can ONLY submit forms
--   - Reading responses requires SUPABASE_SERVICE_ROLE_KEY (never exposed to browser)

-- If you need an admin dashboard to read responses, you have two options:
-- 
-- Option 1: Use service_role key in a server-side API route (recommended)
--   - Keep SUPABASE_SERVICE_ROLE_KEY in .env.local (not NEXT_PUBLIC_)
--   - Create an authenticated admin API route
--
-- Option 2: Create an authenticated admin policy (if using Supabase Auth)
--   CREATE POLICY "Allow authenticated admins to read" ON form_responses
--     FOR SELECT USING (auth.role() = 'authenticated' AND auth.email() IN ('admin@example.com'));
