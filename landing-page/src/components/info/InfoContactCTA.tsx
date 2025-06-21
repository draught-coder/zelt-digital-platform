
import React from "react";
const InfoContactCTA: React.FC = () => (
  <section className="py-20 bg-white shadow-inner relative overflow-hidden">
    {/* Minimal Accent Background */}
    <div className="absolute inset-0">
      <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-100 rounded-full opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-teal-100 rounded-full opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-emerald-200 rounded-full opacity-10"></div>
    </div>
    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Need Professional Tax Guidance?</h2>
      <p className="text-xl text-gray-600 mb-8">Our certified tax experts can help you optimize your tax strategy</p>
      <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
        Schedule Tax Consultation
      </button>
    </div>
  </section>
);
export default InfoContactCTA;
