import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from 'react-router-dom';
import BlogAdminPanel from "./blog/BlogAdminPanel";
import BlogPostList from "./blog/BlogPostList";
import BlogPostEditor from "./blog/BlogPostEditor";
import NewsletterSignup from "./blog/NewsletterSignup";

const Blog = () => {
  // HOOKS MUST RUN FIRST!
  const [searchTerm, setSearchTerm] = useState('');
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editPost, setEditPost] = useState<any>(null);

  // Blog Post Form State
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    date: '',
    read_time: '',
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch session and subscribe to auth updates
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log("Current user id (from auth):", session.user.id); // <-- This log will show up!
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log("Current user id (from auth):", session.user.id); // <-- This log will show up!
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
    console.log("Current user id (from auth):", user.id); // <-- This log will show up right before admin check.
    supabase
      .from("user_roles")
      .select("role, user_id")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        console.log("Fetched user_roles:", data, "error:", error);
        // If any of the roles is 'admin', set as admin
        const isUserAdmin = Array.isArray(data) && data.some((row) => row.role === "admin");
        setIsAdmin(isUserAdmin);
      });
  }, [user]);

  // Fetch blog posts from Supabase
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

  // Blog post mutations
  const createMutation = useMutation({
    mutationFn: async (post: any) => {
      const { error } = await supabase.from('blog_posts').insert([post]);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Blog post created" });
      queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
      setShowEditor(false);
      setForm({ title: '', excerpt: '', content: '', category: '', date: '', read_time: '' });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (post: any) => {
      const { error } = await supabase.from('blog_posts').update(post).eq('id', post.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Blog post updated" });
      queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
      setShowEditor(false);
      setEditPost(null);
      setForm({ title: '', excerpt: '', content: '', category: '', date: '', read_time: '' });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId: number) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Blog post deleted" });
      queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  });

  // Search/filter posts
  const filteredPosts = blogPosts?.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Generic change handler for post form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Open editor for new or editing an existing post
  const openEditor = (post: any = null) => {
    setShowEditor(true);
    setEditPost(post);
    if (post) {
      setForm({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        category: post.category || '',
        date: post.date || '',
        read_time: post.read_time || '',
      });
    } else {
      setForm({ title: '', excerpt: '', content: '', category: '', date: '', read_time: '' });
    }
  };

  // Save new or updated post
  const submitPost = () => {
    if (!form.title) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    if (editPost) {
      updateMutation.mutate({ ...form, id: editPost.id });
    } else {
      createMutation.mutate(form);
    }
  };

  // === Only NOW, after all hooks, check auth for render ===
  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Latest
              <span className="text-blue-600 block">
                Insights
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay updated with tax regulations, bookkeeping tips, and digital transformation insights
            </p>
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Panel */}
      {isAdmin && (
        <BlogAdminPanel onNewPost={() => openEditor()}>
          {showEditor && (
            <BlogPostEditor
              form={form}
              onChange={handleChange}
              onSave={submitPost}
              onCancel={() => { setShowEditor(false); setEditPost(null); }}
              isEditing={!!editPost}
              loading={createMutation.isPending || updateMutation.isPending}
            />
          )}
          <BlogPostList
            posts={blogPosts || []}
            onEdit={openEditor}
            onDelete={(id) => {
              const post = blogPosts?.find((p: any) => p.id === id);
              if (post && window.confirm(`Delete "${post.title}"?`)) {
                deleteMutation.mutate(id);
              }
            }}
          />
        </BlogAdminPanel>
      )}

      {/* Blog Posts for everyone */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">Loading articles...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No articles found matching your search.</p>
              </div>
            ) : (
              <div className="grid gap-8">
                {filteredPosts.map((post: any) => (
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-6">{post.excerpt}</p>
                    <button className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium" disabled>
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

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  );
};

export default Blog;
