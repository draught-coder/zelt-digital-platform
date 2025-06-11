
import React, { useState } from 'react';
import { Download, Search, Calendar, FileText, Calculator } from 'lucide-react';

const Info = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('tax-rates');

  const taxRates = [
    { category: "Corporate Tax", rate: "24%", description: "Standard corporate income tax rate" },
    { category: "Small Company", rate: "17%", description: "For companies with paid-up capital ≤ RM2.5M" },
    { category: "Individual Income Tax", rate: "0% - 30%", description: "Progressive rates based on income" },
    { category: "Real Property Gains Tax", rate: "0% - 30%", description: "Based on disposal period and citizenship" },
    { category: "Sales & Service Tax (SST)", rate: "6% / 10%", description: "Sales tax 10%, Service tax 6%" },
    { category: "Stamp Duty", rate: "Varies", description: "Based on document type and value" }
  ];

  const taxReliefs = [
    { category: "Individual Relief", amount: "RM9,000", description: "Basic personal relief for residents" },
    { category: "Spouse Relief", amount: "RM4,000", description: "Relief for spouse without income" },
    { category: "Child Relief", amount: "RM2,000", description: "Per child (maximum RM10,000)" },
    { category: "Parents Relief", amount: "RM1,500", description: "For supporting parents aged 60+" },
    { category: "Medical Expenses", amount: "RM8,000", description: "For serious diseases treatment" },
    { category: "Education Fees", amount: "RM7,000", description: "For self, spouse, or children" },
    { category: "EPF Contribution", amount: "RM4,000", description: "Additional voluntary EPF contribution" },
    { category: "Life Insurance", amount: "RM3,000", description: "Life insurance premiums" }
  ];

  const importantDates = [
    { date: "31 January", event: "Individual Income Tax Filing Deadline", type: "deadline" },
    { date: "31 March", event: "Corporate Tax Filing Deadline", type: "deadline" },
    { date: "30 April", event: "SST Return Filing (Monthly)", type: "recurring" },
    { date: "15th of each month", event: "PCB Payment Due", type: "recurring" },
    { date: "30 June", event: "Corporate Tax Payment (Estimate)", type: "payment" },
    { date: "30 September", event: "Corporate Tax Payment (Balance)", type: "payment" },
    { date: "31 December", event: "RPGT Filing Deadline", type: "deadline" }
  ];

  const complianceChecklist = [
    { task: "Monthly SST Return Filing", frequency: "Monthly", priority: "High" },
    { task: "PCB Payment & Submission", frequency: "Monthly", priority: "High" },
    { task: "Individual Income Tax Filing", frequency: "Annual", priority: "High" },
    { task: "Corporate Tax Filing", frequency: "Annual", priority: "High" },
    { task: "Audit Report Submission", frequency: "Annual", priority: "Medium" },
    { task: "MAICSA Annual Return", frequency: "Annual", priority: "Medium" },
    { task: "Quarterly Management Accounts", frequency: "Quarterly", priority: "Medium" },
    { task: "Annual Financial Statements", frequency: "Annual", priority: "High" }
  ];

  const downloadableResources = [
    {
      title: "Malaysian Tax Rates Guide 2024",
      description: "Complete overview of all tax rates applicable in Malaysia",
      format: "PDF",
      size: "2.5 MB"
    },
    {
      title: "Tax Relief Checklist",
      description: "Comprehensive list of available tax reliefs and claims",
      format: "PDF", 
      size: "1.8 MB"
    },
    {
      title: "Business Compliance Calendar",
      description: "Annual calendar with all important tax deadlines",
      format: "PDF",
      size: "1.2 MB"
    },
    {
      title: "SST Quick Reference Guide",
      description: "Easy reference for Sales and Service Tax calculations",
      format: "PDF",
      size: "1.5 MB"
    }
  ];

  const tabs = [
    { id: 'tax-rates', label: 'Tax Rates', icon: <Calculator className="w-5 h-5" /> },
    { id: 'tax-reliefs', label: 'Tax Reliefs', icon: <FileText className="w-5 h-5" /> },
    { id: 'deadlines', label: 'Important Dates', icon: <Calendar className="w-5 h-5" /> },
    { id: 'compliance', label: 'Compliance', icon: <Search className="w-5 h-5" /> }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'tax-rates':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxRates.map((item, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl border border-blue-500/20">
                <h3 className="text-lg font-semibold text-white mb-2">{item.category}</h3>
                <div className="text-3xl font-bold text-blue-400 mb-3">{item.rate}</div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        );
      case 'tax-reliefs':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {taxReliefs.map((item, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl border border-blue-500/20">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-white">{item.category}</h3>
                  <span className="text-xl font-bold text-green-400">{item.amount}</span>
                </div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        );
      case 'deadlines':
        return (
          <div className="space-y-4">
            {importantDates.map((item, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl border border-blue-500/20 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${
                    item.type === 'deadline' ? 'bg-red-400' : 
                    item.type === 'payment' ? 'bg-yellow-400' : 'bg-blue-400'
                  }`}></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.event}</h3>
                    <p className="text-gray-400 text-sm capitalize">{item.type}</p>
                  </div>
                </div>
                <div className="text-blue-400 font-medium">{item.date}</div>
              </div>
            ))}
          </div>
        );
      case 'compliance':
        return (
          <div className="space-y-4">
            {complianceChecklist.map((item, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl border border-blue-500/20 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.task}</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400 text-sm">{item.frequency}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      item.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {item.priority} Priority
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Tax & Info
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent block">
                Hub
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your comprehensive resource for Malaysian tax information, rates, and compliance requirements
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tax information, rates, deadlines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-blue-500/20 rounded-full text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Downloadable Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {downloadableResources.map((resource, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-xl border border-blue-500/20 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{resource.format}</span>
                      <span>{resource.size}</span>
                    </div>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors duration-200 ml-4">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Need Expert Tax Advice?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Our team of tax experts is ready to help you with personalized guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200">
              Schedule Consultation
            </button>
            <a
              href="https://wa.me/60123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Info;
