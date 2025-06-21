
import React from 'react';
import { Link } from 'react-router-dom';

const ProductsHero = () => {
  return (
    <section className="bg-white py-20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Cloud ERP
            <span className="text-blue-600 block">
              Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan to automate your bookkeeping with AI-powered invoice processing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://demo.ibnzelt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Try Demo
            </a>
            <Link
              to="/contact"
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;
