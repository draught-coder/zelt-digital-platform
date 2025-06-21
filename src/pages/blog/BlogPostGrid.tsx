import React from "react";
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BlogPostGridProps {
  posts: any[];
  isLoading: boolean;
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({ posts, isLoading }) => {
  const navigate = useNavigate();

  const handleReadMore = (postId: number) => {
    navigate(`/blog/posts/${postId}`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Loading articles...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post: any) => (
                <article key={post.id} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date ? new Date(post.date).toLocaleDateString() : ""}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.read_time}</span>
                    </div>
                  </div>
                  <h2 
                    className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => handleReadMore(post.id)}
                  >
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{post.excerpt}</p>
                  <button 
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    onClick={() => handleReadMore(post.id)}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPostGrid;
