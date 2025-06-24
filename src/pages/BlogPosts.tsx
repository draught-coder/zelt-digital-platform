import React, { useState } from 'react';
import { supabase } from "../integrations/supabase/client";
import BlogHero from "./blog/BlogHero";
import BlogPostGrid from "./blog/BlogPostGrid";
import NewsletterSignup from "./blog/NewsletterSignup";
import { useQuery } from "@tanstack/react-query";

const BlogPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch blog posts
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['blog_posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
      return data;
    },
  });

  // Filtered posts according to search
  const filteredPosts = blogPosts?.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-white">
      <BlogHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BlogPostGrid posts={filteredPosts} isLoading={isLoading} />
      <NewsletterSignup />
    </div>
  );
};

export default BlogPosts;
