import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BlogAdminPanelProps {
  onNewPost: () => void;
  children: React.ReactNode;
}
const BlogAdminPanel: React.FC<BlogAdminPanelProps> = ({ onNewPost, children }) => (
  <section className="py-10 bg-slate-100 border-b border-slate-200 shadow-md dark:bg-slate-800 dark:border-slate-700">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-white drop-shadow">Blog Admin Panel</h3>
        <Button onClick={onNewPost} variant="default" size="sm">
          <Plus className="mr-2" /> New Post
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow p-4 dark:bg-slate-900">{children}</div>
    </div>
  </section>
);
export default BlogAdminPanel;
