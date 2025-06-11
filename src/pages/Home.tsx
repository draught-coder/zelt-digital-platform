
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Shield, Clock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Automation",
      description: "Let artificial intelligence handle your bookkeeping while you focus on growing your business."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "WhatsApp Invoice Capture",
      description: "Simply send your invoices via WhatsApp and watch our AI process them instantly."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Real-Time Reporting",
      description: "Access your financial reports anytime, anywhere with our cloud-based dashboard."
    }
  ];

  const pricingTiers = [
    {
      name: "Basic Cloud ERP",
      price: "50",
      originalPrice: "150",
      features: ["Basic bookkeeping", "Monthly reports", "Email support", "Up to 50 transactions"]
    },
    {
      name: "Advanced Cloud ERP",
      price: "500",
      features: ["Everything in Basic", "WhatsApp invoice capture", "Real-time dashboard", "Unlimited transactions", "Priority support"]
    },
    {
      name: "Enterprise Cloud ERP", 
      price: "1500",
      features: ["Everything in Advanced", "Dedicated account manager", "Custom integrations", "Advanced analytics", "24/7 phone support"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              WE DON'T DO
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent block">
                NORMAL
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Revolutionary AI-powered bookkeeping that transforms how Malaysian businesses manage their finances
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Start Your Digital Transformation</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-blue-500 text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg"
              >
                WhatsApp Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Ibn Zelt?</h2>
            <p className="text-xl text-gray-600">Experience the future of bookkeeping with our cutting-edge technology</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cloud ERP Pricing</h2>
            <p className="text-xl text-gray-600">Choose the perfect plan for your business needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 ${index === 1 ? 'border-2 border-blue-500 scale-105' : ''} relative`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">RM{tier.price}</span>
                  <span className="text-gray-600">/month</span>
                  {tier.originalPrice && (
                    <div className="text-gray-500 line-through text-lg">RM{tier.originalPrice}/month</div>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`w-full py-3 rounded-full font-medium transition-all duration-200 block text-center shadow-lg ${
                    index === 1
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800'
                      : 'border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8">Join hundreds of Malaysian businesses already using our AI-powered solutions</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Schedule Free Consultation
            </Link>
            <Link
              to="/info"
              className="border border-blue-500 text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg"
            >
              Download Tax Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
