
import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: "Malaysian Tax Updates 2024: What Business Owners Need to Know",
      excerpt: "Stay compliant with the latest tax regulations and changes affecting Malaysian businesses this year.",
      date: "2024-06-10",
      readTime: "5 min read",
      category: "Tax Updates"
    },
    {
      title: "Digital Bookkeeping Best Practices for SMEs",
      excerpt: "Transform your business with proven digital bookkeeping strategies that save time and reduce errors.",
      date: "2024-06-08",
      readTime: "7 min read",
      category: "Best Practices"
    },
    {
      title: "How AI is Revolutionizing Accounting in Malaysia",
      excerpt: "Discover how artificial intelligence is changing the landscape of accounting and financial management.",
      date: "2024-06-05",
      readTime: "6 min read",
      category: "Technology"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-blue-50 to-white py-20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Latest
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent block">
                Insights
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay updated with the latest tax regulations, bookkeeping tips, and digital transformation insights
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{post.excerpt}</p>
                  <button className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-white shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">Get the latest tax updates and bookkeeping tips delivered to your inbox</p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
