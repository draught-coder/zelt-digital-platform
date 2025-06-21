
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AdditionalServices = () => {
  const additionalServices = [
    {
      title: "Tax Planning",
      description: "Strategic tax planning to optimize your business tax obligations",
      appointment: true
    },
    {
      title: "Business Advisory",
      description: "Expert guidance on business strategy and financial decisions",
      appointment: true
    },
    {
      title: "Custom ERP Integration",
      description: "Bespoke integrations with your existing business systems",
      appointment: true
    },
    {
      title: "Payroll Audit",
      description: "Comprehensive payroll review and compliance audit services",
      appointment: true
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
          <p className="text-xl text-gray-600">Professional consultation services</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {additionalServices.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              {service.appointment && (
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
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
  );
};

export default AdditionalServices;
