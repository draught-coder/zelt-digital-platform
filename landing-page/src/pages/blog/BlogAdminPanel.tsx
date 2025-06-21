
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BlogAdminPanelProps {
  onNewPost: () => void;
  children: React.ReactNode;
}
const BlogAdminPanel: React.FC<BlogAdminPanelProps> = ({ onNewPost, children }) => (
  <section className="py-10 bg-red-600 border-b border-red-700 shadow-md">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-white drop-shadow">Blog Admin Panel</h3>
        <Button onClick={onNewPost} variant="destructive" size="sm" className="bg-red-800 hover:bg-red-700 text-white">
          <Plus className="mr-2" /> New Post
        </Button>
      </div>
      <div className="bg-white/90 rounded-lg shadow p-4">{children}</div>
    </div>
  </section>
);
export default BlogAdminPanel;
