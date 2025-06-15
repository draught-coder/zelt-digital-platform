
-- Enable RLS on blog_posts (if not done already)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read blog posts
CREATE POLICY "Public can read blog posts"
  ON public.blog_posts
  FOR SELECT
  USING (true);

-- Policy: Only admin can insert blog posts
CREATE POLICY "Admins can insert blog posts" 
  ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admin can update blog posts
CREATE POLICY "Admins can update blog posts"
  ON public.blog_posts
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admin can delete blog posts
CREATE POLICY "Admins can delete blog posts"
  ON public.blog_posts
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
