
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BlogAdminPanelProps {
  onNewPost: () => void;
  children: React.ReactNode;
}
const BlogAdminPanel: React.FC<BlogAdminPanelProps> = ({ onNewPost, children }) => (
  <section className="py-10 bg-gray-50 border-b">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-900">Blog Admin Panel</h3>
        <Button onClick={onNewPost} variant="default" size="sm">
          <Plus className="mr-2" /> New Post
        </Button>
      </div>
      {children}
    </div>
  </section>
);
export default BlogAdminPanel;
