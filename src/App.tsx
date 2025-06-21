import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import BlogPosts from "./pages/BlogPosts";
import BlogPostDetail from "./pages/BlogPostDetail";
import BlogAdmin from "./pages/BlogAdmin";
import Info from "./pages/Info";
import Affiliate from "./pages/Affiliate";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendered');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={
              <AuthProvider>
                <Dashboard />
              </AuthProvider>
            } />
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/posts" element={<Layout><BlogPosts /></Layout>} />
            <Route path="/blog/posts/:id" element={<Layout><BlogPostDetail /></Layout>} />
            <Route path="/blog/admin" element={<AuthProvider><Layout><BlogAdmin /></Layout></AuthProvider>} />
            <Route path="/info" element={<Layout><Info /></Layout>} />
            <Route path="/affiliate" element={<Layout><Affiliate /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
