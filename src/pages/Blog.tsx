
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
  const [isCheckingRole, setIsCheckingRole] = useState(true);

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
    if (!user) { 
      setIsAdmin(false); 
      setIsCheckingRole(false);
      return; 
    }
    
    setIsCheckingRole(true);
    supabase
      .from("user_roles")
      .select("role, user_id")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        const isUserAdmin = Array.isArray(data) && data.some((row) => row.role === "admin");
        setIsAdmin(isUserAdmin);
        setIsCheckingRole(false);
        
        // Redirect based on admin status
        if (isUserAdmin) {
          navigate('/blog/admin', { replace: true });
        } else {
          navigate('/blog/posts', { replace: true });
        }
      });
  }, [user, navigate]);

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

  if (!user || isCheckingRole) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // This component now only serves as a redirect handler
  // The actual content will be shown in separate routes
  return null;
};

export default Blog;
