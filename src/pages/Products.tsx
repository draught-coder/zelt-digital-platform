
import React from 'react';
import { Link } from 'react-router-dom';
import ProductsHero from '../components/products/ProductsHero';
import PricingTiers from '../components/products/PricingTiers';
import WhatsAppFeature from '../components/products/WhatsAppFeature';
import AdditionalServices from '../components/products/AdditionalServices';

const Products = () => {
  return (
    <div className="min-h-screen bg-white">
      <ProductsHero />
      <PricingTiers />
      <WhatsAppFeature />
      <AdditionalServices />

      {/* CTA Section */}
      <section className="py-20 bg-white shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Bookkeeping?</h2>
          <p className="text-xl text-gray-600 mb-8">Experience automated financial management</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg"
            >
              Schedule Demo
            </Link>
            <a
              href="https://wa.me/60123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 shadow-lg"
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
