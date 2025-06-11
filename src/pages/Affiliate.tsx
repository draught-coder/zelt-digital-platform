
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, ArrowRight, Users, Award, TrendingUp } from 'lucide-react';

const Affiliate = () => {
  const partnerProducts = [
    {
      name: "CloudPOS Malaysia",
      category: "Point of Sale System",
      description: "Complete POS solution for retail and F&B businesses with inventory management and sales analytics.",
      rating: 4.8,
      reviews: 2450,
      logo: "/placeholder.svg?height=80&width=80",
      features: ["Real-time inventory", "Multi-location support", "Customer loyalty program", "Financial reporting integration"]
    },
    {
      name: "PayNet Solutions",
      category: "Payment Gateway",
      description: "Secure payment processing for Malaysian businesses with instant settlement and fraud protection.",
      rating: 4.9,
      reviews: 1890,
      logo: "/placeholder.svg?height=80&width=80",
      features: ["Multiple payment methods", "Instant settlement", "Fraud protection", "Mobile-optimized checkout"]
    },
    {
      name: "BizLegal Pro",
      category: "Legal Services",
      description: "Comprehensive legal documentation and compliance services for Malaysian businesses.",
      rating: 4.7,
      reviews: 980,
      logo: "/placeholder.svg?height=80&width=80",
      features: ["Document templates", "Legal consultation", "Compliance monitoring", "Contract management"]
    },
    {
      name: "InventoryMax",
      category: "Inventory Management",
      description: "Advanced inventory management system with predictive analytics and automated reordering.",
      rating: 4.6,
      reviews: 1250,
      logo: "/placeholder.svg?height=80&width=80",
      features: ["Predictive analytics", "Automated reordering", "Barcode scanning", "Multi-warehouse support"]
    },
    {
      name: "DigitalMarket MY",
      category: "E-commerce Platform",
      description: "Complete e-commerce solution designed for Malaysian businesses with local payment integration.",
      rating: 4.8,
      reviews: 2100,
      logo: "/placeholder.svg?height=80&width=80",
      features: ["Local payment gateways", "SEO optimization", "Mobile app", "Multi-language support"]
    },
    {
      name: "HR ProSuite",
      category: "Human Resources",
      description: "Comprehensive HR management system with payroll, leave management, and performance tracking.",
      rating: 4.5,
      reviews: 890,
      logo: "/placeholder.svg?height=80&width=80",
      features: ["Payroll automation", "Leave management", "Performance tracking", "Employee self-service"]
    }
  ];

  const successStories = [
    {
      client: "Kedai Runcit Bahagia",
      industry: "Retail",
      challenge: "Needed integrated POS and accounting solution",
      solution: "CloudPOS + Ibn Zelt bookkeeping integration",
      result: "40% reduction in manual data entry and real-time financial visibility"
    },
    {
      client: "Restaurant Nasi Lemak",
      industry: "F&B",
      challenge: "Manual inventory tracking and payment processing issues",
      solution: "InventoryMax + PayNet Solutions integration",
      result: "25% cost savings on inventory and 99.9% payment success rate"
    },
    {
      client: "Fashion Boutique Online",
      industry: "E-commerce",
      challenge: "Scaling online business with proper financial management",
      solution: "DigitalMarket MY + Ibn Zelt Cloud ERP",
      result: "300% increase in online sales with automated financial reporting"
    }
  ];

  const partnershipBenefits = [
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Exclusive Partner Network",
      description: "Join our curated network of trusted Malaysian business solution providers"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
      title: "Revenue Sharing",
      description: "Earn competitive commissions on successful referrals and ongoing partnerships"
    },
    {
      icon: <Award className="w-8 h-8 text-blue-400" />,
      title: "Co-Marketing Opportunities",
      description: "Collaborate on marketing campaigns and thought leadership content"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Partner
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent block">
                Showcase
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover trusted business solutions from our partner network, carefully selected to complement your digital transformation journey
            </p>
          </div>
        </div>
      </section>

      {/* Partner Products Grid */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Partner Solutions</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {partnerProducts.map((product, index) => (
                <div key={index} className="bg-slate-800 rounded-2xl border border-blue-500/20 overflow-hidden hover:border-blue-500/40 transition-all duration-200 transform hover:scale-105">
                  <div className="p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <img 
                        src={product.logo} 
                        alt={product.name}
                        className="w-16 h-16 rounded-lg bg-slate-700"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                        <p className="text-blue-400 text-sm mb-2">{product.category}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-400 text-sm">{product.rating} ({product.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{product.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-white font-medium mb-3">Key Features:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {product.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-gray-400 text-sm flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                        <span>Learn More</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <Link
                        to="/contact"
                        className="flex-1 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white py-3 rounded-full font-medium transition-colors duration-200 text-center"
                      >
                        Get Integration
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-2xl border border-blue-500/20">
                  <h3 className="text-lg font-bold text-white mb-2">{story.client}</h3>
                  <p className="text-blue-400 text-sm mb-4">{story.industry}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium text-sm">Challenge:</h4>
                      <p className="text-gray-400 text-sm">{story.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium text-sm">Solution:</h4>
                      <p className="text-gray-400 text-sm">{story.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-green-400 font-medium text-sm">Result:</h4>
                      <p className="text-gray-300 text-sm">{story.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Program */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Become a Partner</h2>
              <p className="text-xl text-gray-300">Join our exclusive partner network and grow together</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {partnershipBenefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Apply for Partnership</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Refer & Earn</h2>
            <p className="text-xl text-gray-300 mb-8">
              Know a business that could benefit from our partner solutions? Refer them and earn rewards!
            </p>
            
            <div className="bg-slate-800 p-8 rounded-2xl border border-blue-500/20 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">1</div>
                  <h4 className="text-white font-medium mb-2">Refer a Business</h4>
                  <p className="text-gray-400 text-sm">Share partner solutions with businesses you know</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">2</div>
                  <h4 className="text-white font-medium mb-2">They Subscribe</h4>
                  <p className="text-gray-400 text-sm">When they sign up for any partner service</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">3</div>
                  <h4 className="text-white font-medium mb-2">You Earn</h4>
                  <p className="text-gray-400 text-sm">Receive referral rewards for successful matches</p>
                </div>
              </div>
            </div>
            
            <a
              href="https://wa.me/60123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200"
            >
              Start Referring via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliate;
