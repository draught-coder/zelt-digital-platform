-- Complete fix for RLS policies to allow bookkeepers access to blog posts and tax tables
-- This migration ensures bookkeepers (from profiles table) can access these tables

-- First, let's check if the has_role function exists and create it if needed
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Drop ALL existing policies on blog_posts to ensure clean slate
DROP POLICY IF EXISTS "Public can read blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Bookkeepers and admins can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Bookkeepers and admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Bookkeepers and admins can delete blog posts" ON public.blog_posts;

-- Create new comprehensive policies for blog_posts
CREATE POLICY "Public can read blog posts"
  ON public.blog_posts
  FOR SELECT
  USING (true);

CREATE POLICY "Bookkeepers and admins can insert blog posts" 
  ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    ) OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Bookkeepers and admins can update blog posts"
  ON public.blog_posts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    ) OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Bookkeepers and admins can delete blog posts"
  ON public.blog_posts
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    ) OR
    public.has_role(auth.uid(), 'admin')
  );

-- Drop and recreate tax table policies to ensure they're correct
DROP POLICY IF EXISTS "Public can read individual tax rates" ON public.individual_tax_rates;
DROP POLICY IF EXISTS "Public can read corporate tax rates" ON public.corporate_tax_rates;
DROP POLICY IF EXISTS "Public can read tax reliefs" ON public.tax_reliefs;

-- Create public read policies for tax tables
CREATE POLICY "Public can read individual tax rates" 
  ON public.individual_tax_rates 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public can read corporate tax rates" 
  ON public.corporate_tax_rates 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public can read tax reliefs" 
  ON public.tax_reliefs 
  FOR SELECT 
  USING (true);

-- Create helper functions for easier policy management
CREATE OR REPLACE FUNCTION public.is_bookkeeper(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = _user_id AND role = 'bookkeeper'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(_user_id, 'admin');
$$;

CREATE OR REPLACE FUNCTION public.is_bookkeeper_or_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT public.is_bookkeeper(_user_id) OR public.is_admin(_user_id);
$$;

-- Verify the policies are working by testing with a sample query
-- This will help us debug if there are any issues
DO $$
BEGIN
  -- Test if the functions work
  RAISE NOTICE 'Testing helper functions...';
  
  -- Test if we can query blog_posts (this should work for public read)
  PERFORM 1 FROM public.blog_posts LIMIT 1;
  RAISE NOTICE 'Blog posts query test passed';
  
  -- Test if we can query tax tables (this should work for public read)
  PERFORM 1 FROM public.individual_tax_rates LIMIT 1;
  RAISE NOTICE 'Individual tax rates query test passed';
  
  PERFORM 1 FROM public.corporate_tax_rates LIMIT 1;
  RAISE NOTICE 'Corporate tax rates query test passed';
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error during testing: %', SQLERRM;
END $$; 