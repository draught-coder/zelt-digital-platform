
import React from 'react';
import { ExternalLink, Star, ArrowRight } from 'lucide-react';

const Affiliate = () => {
  const partners = [
    {
      name: "TechFlow Solutions",
      category: "Software Development",
      description: "Custom business software and mobile app development for Malaysian SMEs",
      rating: 4.9,
      link: "#"
    },
    {
      name: "Legal Eagle Chambers",
      category: "Legal Services",
      description: "Corporate law, business registration, and compliance services",
      rating: 4.8,
      link: "#"
    },
    {
      name: "Digital Marketing Pro",
      category: "Marketing",
      description: "Complete digital marketing solutions for growing businesses",
      rating: 4.7,
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-blue-50 to-white py-20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Trusted
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent block">
                Partners
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover quality services from our vetted business partners across Malaysia
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Partners</h2>
            <p className="text-xl text-gray-600">Quality services recommended by Ibn Zelt</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200">
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {partner.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{partner.name}</h3>
                <p className="text-gray-600 mb-4">{partner.description}</p>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">{partner.rating}</span>
                </div>
                <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg">
                  <span>Learn More</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Program */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Become a Partner</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our network of trusted service providers and grow your business with qualified referrals
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Apply</h3>
                <p className="text-gray-600">Submit your application with business details</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Review</h3>
                <p className="text-gray-600">We evaluate your services and credentials</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Partner</h3>
                <p className="text-gray-600">Start receiving qualified referrals</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Apply for Partnership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliate;
