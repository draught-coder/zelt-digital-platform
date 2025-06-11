
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';

const PricingTiers = () => {
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
      originalPrice: "1000",
      discount: "50% OFF",
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
      originalPrice: "3000",
      discount: "50% OFF",
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

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div key={index} className={`relative bg-white rounded-lg border shadow-lg hover:shadow-xl transition-all duration-200 ${
              tier.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
            } overflow-hidden`}>
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm font-medium">
                  <Star className="w-4 h-4 inline mr-1" />
                  Most Popular
                </div>
              )}
              {tier.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  {tier.discount}
                </div>
              )}
              
              <div className={`p-8 ${tier.popular ? 'pt-16' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-blue-600">RM{tier.price}</span>
                  <span className="text-gray-600">/month</span>
                  {tier.originalPrice && (
                    <div className="text-gray-500 line-through text-xl">RM{tier.originalPrice}/month</div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
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
                  className={`w-full py-4 rounded-lg font-medium transition-all duration-200 block text-center shadow-lg ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
