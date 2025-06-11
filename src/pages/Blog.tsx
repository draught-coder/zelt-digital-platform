
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const Blog = () => {
  const featuredPost = {
    title: "Malaysia Budget 2024: Key Tax Changes for Small Businesses",
    excerpt: "Comprehensive breakdown of the latest tax updates and how they impact your business operations in Malaysia.",
    author: "Ibn Zelt Team",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Tax Updates",
    image: "/placeholder.svg?height=400&width=600"
  };

  const blogPosts = [
    {
      title: "GST vs SST: Complete Guide for Malaysian Businesses",
      excerpt: "Understanding the differences and implications of GST and SST for your business compliance.",
      author: "Ahmad Rahman",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Tax Compliance"
    },
    {
      title: "Digital Transformation in Accounting: Malaysian Perspective",
      excerpt: "How Malaysian businesses are adopting AI and automation in their financial processes.",
      author: "Sarah Lim",
      date: "March 8, 2024",
      readTime: "5 min read",
      category: "Digital Trends"
    },
    {
      title: "WhatsApp for Business: Revolutionizing Invoice Management",
      excerpt: "Learn how WhatsApp integration is changing the game for small business bookkeeping.",
      author: "Ibn Zelt Team",
      date: "March 5, 2024",
      readTime: "4 min read",
      category: "Innovation"
    },
    {
      title: "Tax Relief 2024: Maximize Your Savings",
      excerpt: "Complete guide to tax reliefs available for individuals and businesses in Malaysia.",
      author: "Fatimah Wong",
      date: "March 3, 2024",
      readTime: "7 min read",
      category: "Tax Planning"
    },
    {
      title: "Small Business Compliance Checklist 2024",
      excerpt: "Essential compliance requirements every small business owner should know.",
      author: "Rahman Ali",
      date: "February 28, 2024",
      readTime: "6 min read",
      category: "Compliance"
    },
    {
      title: "AI in Bookkeeping: Myths vs Reality",
      excerpt: "Debunking common misconceptions about AI-powered accounting solutions.",
      author: "Ibn Zelt Team",
      date: "February 25, 2024",
      readTime: "5 min read",
      category: "Technology"
    }
  ];

  const categories = [
    "All Posts", "Tax Updates", "Tax Compliance", "Digital Trends", 
    "Innovation", "Tax Planning", "Compliance", "Technology"
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Tax & Business
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent block">
                Insights
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Stay updated with the latest Malaysian tax regulations, digital trends, and bookkeeping best practices
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Article</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-slate-800 rounded-2xl overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{featuredPost.title}</h3>
                <p className="text-gray-400 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-400 text-sm">
                      <User className="w-4 h-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {featuredPost.date}
                    </div>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  index === 0 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-slate-800 rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200 transform hover:scale-105">
                  <div className="h-48 bg-gradient-to-br from-blue-900 to-slate-800"></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center text-gray-400 text-xs">
                          <User className="w-3 h-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center text-gray-400 text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1">
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest tax updates and business insights delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-slate-800 text-white border border-blue-500/20 focus:border-blue-500 focus:outline-none"
              />
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
