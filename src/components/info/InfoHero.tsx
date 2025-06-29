
import React from "react";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InfoHeroProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  years: string[];
}
const InfoHero: React.FC<InfoHeroProps> = ({ selectedYear, setSelectedYear, years }) => (
  <section className="relative py-20 shadow-lg overflow-hidden" style={{ minHeight: 380 }}>
    {/* Professional background image + overlay */}
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"
        alt="Modern financial background"
        className="w-full h-full object-cover"
        style={{ objectPosition: 'center' }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/90 via-slate-100/90 to-blue-100/60 backdrop-blur-[1px]"></div>
    </div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 drop-shadow-lg">
          Malaysian Tax
          <span className="bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent block">
            Information Hub
          </span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 font-medium drop-shadow">
          Complete guide to Malaysian tax rates and reliefs for individuals and corporations
        </p>
        {/* Year Selector */}
        <div className="flex items-center justify-center gap-4 bg-white/90 p-6 rounded-2xl shadow-lg max-w-md mx-auto border border-slate-200 backdrop-blur">
          <Calendar className="w-5 h-5 text-blue-700" />
          <span className="text-gray-800 font-medium">Assessment Year:</span>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              {years.map((year) => (
                <SelectItem key={year} value={year} className="hover:bg-gray-100">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </section>
);
export default InfoHero;
