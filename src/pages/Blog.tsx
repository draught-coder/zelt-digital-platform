
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from 'react-router-dom';
import BlogHero from "./blog/BlogHero";
import BlogAdminSection from "./blog/BlogAdminSection";
import BlogPostGrid from "./blog/BlogPostGrid";
import NewsletterSignup from "./blog/NewsletterSignup";
import { useQuery } from "@tanstack/react-query";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch session and subscribe to auth updates
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log("Current user id (from auth):", session.user.id);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log("Current user id (from auth):", session.user.id);
      }
      if (!session) {
        if (location.pathname === "/blog") {
          navigate(`/auth?returnTo=/blog`, { replace: true });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase
      .from("user_roles")
      .select("role, user_id")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        const isUserAdmin = Array.isArray(data) && data.some((row) => row.role === "admin");
        setIsAdmin(isUserAdmin);
      });
  }, [user]);

  // Fetch blog posts for main display section (for everyone)
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
      {/* DEBUG BAR: show admin/user info */}
      <div className="fixed top-0 left-0 z-50 bg-black text-white text-xs px-4 py-1 opacity-80">
        USER: {user?.email || user?.id} | ADMIN: {String(isAdmin)}
      </div>
      <BlogHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BlogAdminSection isAdmin={isAdmin} />
      <BlogPostGrid posts={filteredPosts} isLoading={isLoading} />
      <NewsletterSignup />
    </div>
  );
};

export default Blog;

