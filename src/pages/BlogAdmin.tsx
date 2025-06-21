import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogAdminSection from "./blog/BlogAdminSection";
import { useAuth } from '@/hooks/useAuth';

const BlogAdmin = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/auth?returnTo=/blog/admin', { replace: true });
    return null;
  }

  if (userRole !== 'bookkeeper') {
    // If logged in but not a bookkeeper, redirect to the main blog page
    navigate('/blog/posts', { replace: true });
    return null;
  }

  // If we reach here, user is a bookkeeper
  return (
    <div className="min-h-screen bg-white">
      {/* DEBUG BAR: show admin/user info */}
      <div className="fixed top-0 left-0 z-50 bg-black text-white text-xs px-4 py-1 opacity-80">
        USER: {user?.email || user?.id} | ADMIN: {String(userRole === 'bookkeeper')}
      </div>
      <div className="pt-16">
        <BlogAdminSection isAdmin={true} />
      </div>
    </div>
  );
};

export default BlogAdmin;
