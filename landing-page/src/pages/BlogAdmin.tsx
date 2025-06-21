
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import BlogAdminSection from "./blog/BlogAdminSection";

const BlogAdmin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const navigate = useNavigate();

  // Check authentication and admin role
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
        
        // Redirect non-admin users to blog posts
        if (!isUserAdmin) {
          navigate('/blog/posts', { replace: true });
        }
      });
  }, [user, navigate]);

  if (!user || isCheckingRole) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* DEBUG BAR: show admin/user info */}
      <div className="fixed top-0 left-0 z-50 bg-black text-white text-xs px-4 py-1 opacity-80">
        USER: {user?.email || user?.id} | ADMIN: {String(isAdmin)}
      </div>
      <div className="pt-16">
        <BlogAdminSection isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default BlogAdmin;
