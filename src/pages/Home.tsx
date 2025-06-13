
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Camera, BarChart3, Shield } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8 text-blue-600" />,
      title: "WhatsApp Invoice Capture",
      description: "Send invoices via WhatsApp. AI extracts data automatically and updates your books instantly."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Real-time Dashboard", 
      description: "Monitor your business performance with live financial data and automated reporting."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Tax Compliance",
      description: "Stay compliant with Malaysian tax regulations through automated calculations and filing."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20 relative overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-blue-200 rounded-full opacity-20"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-blue-100 rounded-lg rotate-45 opacity-30"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-blue-300 rotate-12 opacity-25"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 border border-slate-200 rounded-full opacity-20"></div>
          
          {/* Subtle lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-200 to-transparent opacity-30"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8">
              <span style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>WE DON'T DO NORMAL</span>
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cloud ERP for Malaysian SMEs
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light tracking-wide leading-relaxed" style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              letterSpacing: '0.02em'
            }}>
              Automate your bookkeeping with AI-powered invoice capture via WhatsApp.<br />
              <span className="text-blue-600 font-medium">From photo to financial records in seconds.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
              >
                View Pricing
              </Link>
              <a
                href="https://demo.ibnzelt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
              >
                Try Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600">Everything you need to manage your business finances</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Transform your bookkeeping today</p>
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center space-x-2"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
