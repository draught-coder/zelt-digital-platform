import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "../../dashboard-app/src/integrations/supabase/client";
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog_post', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', parseInt(id || '0'))
        .single();
      
      if (error) {
        console.error('Error fetching blog post:', error);
        throw error;
      }
      return data;
    },
    enabled: !!id && !isNaN(parseInt(id)),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/blog/posts')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog/posts')}
            className="text-white hover:bg-white/20 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
          
          <div className="flex items-center space-x-4 text-sm mb-4">
            <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date ? new Date(post.date).toLocaleDateString() : ""}</span>
            </div>
            {post.read_time && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.read_time}</span>
              </div>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          {(post as any).author && (
            <div className="flex items-center space-x-2 text-white/80">
              <User className="w-4 h-4" />
              <span>By {(post as any).author}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        {(post as any).image_url && (
          <div className="mb-8">
            <img 
              src={(post as any).image_url} 
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          {post.excerpt && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-lg text-gray-700 italic">{post.excerpt}</p>
            </div>
          )}
          
          <div className="text-gray-800 leading-relaxed">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="text-gray-600">Content coming soon...</p>
            )}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => navigate('/blog/posts')}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail; 