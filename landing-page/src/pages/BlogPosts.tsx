
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import BlogHero from "./blog/BlogHero";
import BlogPostGrid from "./blog/BlogPostGrid";
import NewsletterSignup from "./blog/NewsletterSignup";
import { useQuery } from "@tanstack/react-query";

const BlogPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth?returnTo=/blog', { replace: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  // Fetch blog posts
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['blog_posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Filtered posts according to search
  const filteredPosts = blogPosts?.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      <BlogHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BlogPostGrid posts={filteredPosts} isLoading={isLoading} />
      <NewsletterSignup />
    </div>
  );
};

export default BlogPosts;
