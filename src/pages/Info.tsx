
import React from 'react';
import { Download, FileText, Calculator, Clock } from 'lucide-react';

const Info = () => {
  const taxRates = [
    { category: "Corporate Tax", rate: "24%", description: "Standard corporate income tax rate" },
    { category: "SST (Sales)", rate: "10%", description: "Sales and Service Tax on sales" },
    { category: "SST (Service)", rate: "6%", description: "Sales and Service Tax on services" },
    { category: "Individual Tax", rate: "0-30%", description: "Progressive rates based on income" }
  ];

  const resources = [
    {
      title: "Tax Relief Guide 2024",
      description: "Complete guide to tax reliefs available for Malaysian businesses",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "SST Compliance Checklist",
      description: "Step-by-step checklist for SST registration and compliance",
      icon: <Calculator className="w-6 h-6" />
    },
    {
      title: "Tax Calendar 2024",
      description: "Important tax deadlines and submission dates for the year",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-blue-50 to-white py-20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Tax
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent block">
                Information Hub
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your go-to resource for Malaysian tax rates, deadlines, and compliance information
            </p>
          </div>
        </div>
      </section>

      {/* Tax Rates Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Tax Rates</h2>
            <p className="text-xl text-gray-600">Stay updated with the latest Malaysian tax rates</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {taxRates.map((tax, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tax.category}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-3">{tax.rate}</div>
                <p className="text-gray-600 text-sm">{tax.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Downloadable Resources</h2>
            <p className="text-xl text-gray-600">Free guides and tools to help your business stay compliant</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {resources.map((resource, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200">
                <div className="text-blue-600 mb-4">{resource.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-50 shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Need Professional Guidance?</h2>
          <p className="text-xl text-gray-600 mb-8">Our tax experts are here to help you navigate Malaysian tax regulations</p>
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Schedule Tax Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Info;
