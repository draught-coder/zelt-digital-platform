
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface BlogPostEditorProps {
  form: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing: boolean;
  loading: boolean;
}
const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  form,
  onChange,
  onSave,
  onCancel,
  isEditing,
  loading,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border relative">
    <button
      aria-label="Close editor"
      onClick={onCancel}
      className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
    >
      <X />
    </button>
    <div className="grid gap-4">
      <Input
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Title"
        className="font-bold text-lg"
      />
      <Input
        name="category"
        value={form.category}
        onChange={onChange}
        placeholder="Category"
      />
      <Input
        name="date"
        value={form.date}
        onChange={onChange}
        placeholder="Date (YYYY-MM-DD)"
      />
      <Input
        name="read_time"
        value={form.read_time}
        onChange={onChange}
        placeholder="Read Time (e.g., 5 min read)"
      />
      <Textarea
        name="excerpt"
        value={form.excerpt}
        onChange={onChange}
        placeholder="Excerpt"
      />
      <Textarea
        name="content"
        value={form.content}
        onChange={onChange}
        placeholder="Content"
      />
      <div className="flex gap-2 mt-2">
        <Button onClick={onSave} disabled={loading}>
          {isEditing ? "Update Post" : "Create Post"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  </div>
);
export default BlogPostEditor;
