
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
const BlogHero: React.FC<BlogHeroProps> = ({ searchTerm, setSearchTerm }) => (
  <section className="bg-white py-20 shadow-lg">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Latest
          <span className="text-blue-600 block">Insights</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Stay updated with tax regulations, bookkeeping tips, and digital transformation insights
        </p>
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
);

export default BlogHero;
