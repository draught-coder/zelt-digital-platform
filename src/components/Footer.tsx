
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 py-12 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/lovable-uploads/80b8ec3f-f556-457c-bae2-4c103dc37f8d.png"
                alt="Ibn Zelt Logo"
                className="w-12 h-12 object-contain"
                style={{ minWidth: 40, minHeight: 40 }}
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Ibn Zelt</h1>
                <p className="text-sm text-blue-600">WE DON'T DO NORMAL</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Revolutionizing bookkeeping in Malaysia with AI-powered digital solutions. 
              Experience the future of financial management today.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-lg"
              >
                WhatsApp Us
              </a>
              <a
                href="mailto:hello@ibnzelt.com"
                className="border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-md"
              >
                Email Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">Cloud ERP Plans</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">Tax Updates</Link></li>
              <li><Link to="/info" className="text-gray-600 hover:text-blue-600 transition-colors">Tax Rates</Link></li>
              <li><Link to="/affiliate" className="text-gray-600 hover:text-blue-600 transition-colors">Partners</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Services</h3>
            <ul className="space-y-2 text-gray-600">
              <li>AI-Powered Bookkeeping</li>
              <li>WhatsApp Invoice Capture</li>
              <li>Cloud ERP Solutions</li>
              <li>Tax Compliance</li>
              <li>Financial Reporting</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2024 Ibn Zelt Digital Bookkeeping. All rights reserved. | Made in Malaysia 🇲🇾</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
