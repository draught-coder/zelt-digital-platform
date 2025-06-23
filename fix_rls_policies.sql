-- Fix RLS policies for bookkeepers to access blog_posts and tax tables
-- This migration allows bookkeepers (from profiles table) to access these tables

-- Drop existing policies that are too restrictive
DROP POLICY IF EXISTS "Admins can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;

-- Create new policies that allow bookkeepers to manage blog posts
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

-- Ensure tax tables have public read access (they should already have this)
-- But let's make sure the policies are correct
DROP POLICY IF EXISTS "Public can read individual tax rates" ON public.individual_tax_rates;
CREATE POLICY "Public can read individual tax rates" 
  ON public.individual_tax_rates 
  FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Public can read corporate tax rates" ON public.corporate_tax_rates;
CREATE POLICY "Public can read corporate tax rates" 
  ON public.corporate_tax_rates 
  FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Public can read tax reliefs" ON public.tax_reliefs;
CREATE POLICY "Public can read tax reliefs" 
  ON public.tax_reliefs 
  FOR SELECT 
  USING (true);

-- Add a function to check if user is bookkeeper (for easier policy management)
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

-- Add a function to check if user is admin (for easier policy management)
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(_user_id, 'admin');
$$;

-- Create a combined function to check if user is bookkeeper or admin
CREATE OR REPLACE FUNCTION public.is_bookkeeper_or_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT public.is_bookkeeper(_user_id) OR public.is_admin(_user_id);
$$; 