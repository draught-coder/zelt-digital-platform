
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, Zap, Shield, Clock, Users, Phone, Mail } from 'lucide-react';

const Products = () => {
  const pricingTiers = [
    {
      name: "Basic Cloud ERP",
      price: "50",
      originalPrice: "150",
      discount: "67% OFF",
      description: "Perfect for small businesses starting their digital journey",
      features: [
        "Basic bookkeeping automation",
        "Monthly financial reports",
        "Email support",
        "Up to 50 transactions/month",
        "Cloud storage (5GB)",
        "Mobile app access"
      ],
      limitations: ["Limited integrations", "Standard templates only"]
    },
    {
      name: "Advanced Cloud ERP",
      price: "500",
      description: "Ideal for growing businesses with moderate transaction volumes",
      popular: true,
      features: [
        "Everything in Basic plan",
        "WhatsApp invoice capture",
        "Real-time dashboard",
        "Unlimited transactions",
        "Priority email support",
        "Custom report builder",
        "Multi-currency support",
        "Bank integration",
        "Cloud storage (50GB)"
      ],
      limitations: []
    },
    {
      name: "Enterprise Cloud ERP",
      price: "1500",
      description: "Complete solution for established businesses with complex needs",
      features: [
        "Everything in Advanced plan",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics & AI insights",
        "24/7 phone support",
        "White-label reports",
        "Multi-branch management",
        "API access",
        "Unlimited cloud storage",
        "Compliance automation"
      ],
      limitations: []
    }
  ];

  const additionalServices = [
    {
      title: "Tax Compliance Consultation",
      description: "Expert guidance on Malaysian tax regulations and compliance requirements",
      appointment: true
    },
    {
      title: "Business Setup Advisory",
      description: "Complete assistance with business registration and initial setup in Malaysia",
      appointment: true
    },
    {
      title: "Custom Integration Development",
      description: "Bespoke integrations with your existing business systems",
      appointment: true
    },
    {
      title: "Staff Training Program",
      description: "Comprehensive training for your team on digital bookkeeping best practices",
      appointment: true
    }
  ];

  const whatsappFeatures = [
    "Simply photograph and send invoices via WhatsApp",
    "AI automatically extracts data and categorizes expenses",
    "Real-time processing with instant confirmation",
    "Supports multiple formats: PDF, JPG, PNG",
    "Automatic vendor and customer recognition",
    "Smart duplicate detection"
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Cloud ERP
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent block">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Choose the perfect plan to revolutionize your bookkeeping with AI-powered automation
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`relative bg-slate-800 rounded-2xl border ${
                tier.popular ? 'border-blue-500 scale-105' : 'border-blue-500/20'
              } overflow-hidden`}>
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-2 text-sm font-medium">
                    <Star className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                )}
                {tier.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {tier.discount}
                  </div>
                )}
                
                <div className={`p-8 ${tier.popular ? 'pt-16' : ''}`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-400 mb-6">{tier.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-blue-400">RM{tier.price}</span>
                    <span className="text-gray-400">/month</span>
                    {tier.originalPrice && (
                      <div className="text-gray-500 line-through text-xl">RM{tier.originalPrice}/month</div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                    {tier.limitations.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="flex items-start space-x-3 text-gray-500">
                        <span className="w-5 h-5 text-center mt-0.5 flex-shrink-0">×</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`w-full py-4 rounded-full font-medium transition-all duration-200 block text-center ${
                      tier.popular
                        ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800'
                        : 'border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    Get Started Today
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Feature Highlight */}
      <section className="py-20 bg-gradient-to-br from-green-900/20 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">WhatsApp Invoice Capture</h2>
              <p className="text-xl text-gray-400">Revolutionary feature that changes everything</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
                <ul className="space-y-4">
                  {whatsappFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="https://wa.me/60123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 inline-flex items-center space-x-2"
                  >
                    <span>Try WhatsApp Demo</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="bg-slate-800 p-8 rounded-2xl border border-green-500/20">
                <h4 className="text-lg font-semibold text-white mb-4">Send us your invoice like this:</h4>
                <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
                  <p className="text-sm">"Hi Ibn Zelt! Here's my latest invoice 📄"</p>
                  <div className="mt-2 bg-white/20 p-2 rounded text-xs">
                    📎 invoice_12345.pdf
                  </div>
                </div>
                <div className="text-gray-400 text-sm">
                  ✅ Processed automatically<br/>
                  ✅ Data extracted and categorized<br/>
                  ✅ Added to your books instantly
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Additional Services</h2>
            <p className="text-xl text-gray-400">Expert consultation services requiring appointment booking</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-2xl border border-blue-500/20">
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                {service.appointment && (
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Bookkeeping?</h2>
          <p className="text-xl text-gray-400 mb-8">Join the digital revolution and experience the future of financial management</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
            >
              Schedule Free Demo
            </Link>
            <a
              href="https://wa.me/60123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200"
            >
              WhatsApp Questions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
