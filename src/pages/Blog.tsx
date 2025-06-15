
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, ArrowRight, Search, Plus, Edit, Trash2, X } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const Blog = () => {
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

  // Fetch session and subscribe to auth updates
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Helper: Check if user is admin
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setIsAdmin(data?.role === "admin"));
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
    // Minimal validation
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
        <section className="py-10 bg-gray-50 border-b">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-900">Blog Admin Panel</h3>
              <Button onClick={() => openEditor()} variant="default" size="sm">
                <Plus className="mr-2" /> New Post
              </Button>
            </div>

            {showEditor && (
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border relative">
                <button
                  aria-label="Close editor"
                  onClick={() => { setShowEditor(false); setEditPost(null); }}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                >
                  <X />
                </button>
                <div className="grid gap-4">
                  <Input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="font-bold text-lg"
                  />
                  <Input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Category"
                  />
                  <Input
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    placeholder="Date (YYYY-MM-DD)"
                  />
                  <Input
                    name="read_time"
                    value={form.read_time}
                    onChange={handleChange}
                    placeholder="Read Time (e.g., 5 min read)"
                  />
                  <Textarea
                    name="excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    placeholder="Excerpt"
                  />
                  <Textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Content"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button onClick={submitPost} disabled={createMutation.isPending || updateMutation.isPending}>
                      {editPost ? "Update Post" : "Create Post"}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => { setShowEditor(false); setEditPost(null); }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Blog List */}
            <div className="grid gap-4">
              {blogPosts && blogPosts.length > 0 ? blogPosts.map((post: any) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow border flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{post.title}</h4>
                    <div className="text-sm text-gray-500">{post.category} | {post.date}</div>
                  </div>
                  <div className="flex space-x-2 mt-3 md:mt-0">
                    <Button size="sm" variant="outline" onClick={() => openEditor(post)}>
                      <Edit /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (window.confirm(`Delete "${post.title}"?`)) {
                          deleteMutation.mutate(post.id);
                        }
                      }}
                    >
                      <Trash2 /> Delete
                    </Button>
                  </div>
                </div>
              )) : (
                <div className="p-6 text-center text-gray-500">No blog posts yet.</div>
              )}
            </div>
          </div>
        </section>
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
      <section className="py-20 bg-white shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">Get the latest tax updates and bookkeeping tips delivered to your inbox</p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
