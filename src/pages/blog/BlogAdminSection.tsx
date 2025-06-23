import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../dashboard-app/src/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import BlogAdminPanel from "./BlogAdminPanel";
import BlogPostList from "./BlogPostList";
import BlogPostEditor from "./BlogPostEditor";
import { useAuth } from "@/hooks/useAuth";

interface BlogAdminSectionProps {
  isAdmin: boolean;
}

const defaultForm = { title: '', excerpt: '', content: '', category: '', date: '', read_time: '' };

const BlogAdminSection: React.FC<BlogAdminSectionProps> = ({ isAdmin }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [editPost, setEditPost] = useState<any>(null);
  const [form, setForm] = useState(defaultForm);
  const { user, userRole } = useAuth();

  const queryClient = useQueryClient();

  // Debug logging
  console.log('BlogAdminSection render:', { isAdmin, user: user?.email, userRole });

  // fetch blog posts
  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ['blog_posts'],
    queryFn: async () => {
      console.log('Fetching blog posts...');
      console.log('Current user:', user?.email);
      console.log('Current user role:', userRole);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      
      console.log('Blog posts query result:', { data, error });
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
      return data;
    },
  });

  console.log('Blog posts data:', blogPosts);
  console.log('Blog posts loading:', isLoading);
  console.log('Blog posts error:', error);

  // Blog post mutations
  const createMutation = useMutation({
    mutationFn: async (post: any) => {
      const { error } = await supabase.from('blog_posts').insert([post]);
      if (error) {
        console.error('Error creating blog post:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Blog post created" });
      queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
      setShowEditor(false);
      setForm(defaultForm);
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (post: any) => {
      const { error } = await supabase.from('blog_posts').update(post).eq('id', post.id);
      if (error) {
        console.error('Error updating blog post:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Blog post updated" });
      queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
      setShowEditor(false);
      setEditPost(null);
      setForm(defaultForm);
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId: number) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', postId);
      if (error) {
        console.error('Error deleting blog post:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Blog post deleted" });
      queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  });

  // Form and editor logic
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
      setForm(defaultForm);
    }
  };

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

  if (!isAdmin) return null;

  return (
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
  );
};
export default BlogAdminSection;
