
import React from 'react';
import { ArrowRight } from 'lucide-react';

const WhatsAppFeature = () => {
  const whatsappFeatures = [
    "Photograph and send invoices via WhatsApp",
    "AI extracts data and categorizes expenses automatically",
    "Real-time processing with instant confirmation",
    "Supports PDF, JPG, PNG formats",
    "Automatic vendor and customer recognition",
    "Smart duplicate detection"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">WhatsApp Invoice Capture</h2>
            <p className="text-xl text-gray-600">Send photos, get automated bookkeeping</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
              <ul className="space-y-4">
                {whatsappFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="https://wa.me/60123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2 shadow-lg"
                >
                  <span>Try WhatsApp Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Send us your invoice:</h4>
              <div className="bg-green-500 text-white p-4 rounded-lg mb-4 shadow-md">
                <p className="text-sm">"Hi Ibn Zelt! Here's my invoice 📄"</p>
                <div className="mt-2 bg-white/20 p-2 rounded text-xs">
                  📎 invoice_12345.pdf
                </div>
              </div>
              <div className="text-gray-600 text-sm">
                ✅ Processed automatically<br/>
                ✅ Data extracted and categorized<br/>
                ✅ Added to your books instantly
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppFeature;
