
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface BlogPostListProps {
  posts: any[];
  onEdit: (post: any) => void;
  onDelete: (postId: number) => void;
}
const BlogPostList: React.FC<BlogPostListProps> = ({ posts, onEdit, onDelete }) => (
  <div className="grid gap-4">
    {posts.length > 0 ? posts.map((post) => (
      <div key={post.id} className="bg-white p-6 rounded-lg shadow border flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h4 className="text-lg font-bold text-gray-900">{post.title}</h4>
          <div className="text-sm text-gray-500">{post.category} | {post.date}</div>
        </div>
        <div className="flex space-x-2 mt-3 md:mt-0">
          <Button size="sm" variant="outline" onClick={() => onEdit(post)}>
            <Edit /> Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(post.id)}>
            <Trash2 /> Delete
          </Button>
        </div>
      </div>
    )) : (
      <div className="p-6 text-center text-gray-500">No blog posts yet.</div>
    )}
  </div>
);
export default BlogPostList;
