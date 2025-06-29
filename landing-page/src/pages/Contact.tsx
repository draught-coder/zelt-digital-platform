
import React from 'react';
import { Mail, Phone, MessageCircle, MapPin, Clock, Bot } from 'lucide-react';
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      details: "+60 12-378-3557",
      action: "Chat Now",
      link: "https://wa.me/60123783557",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "ashraf@ibnzelt.com",
      action: "Send Email",
      link: "mailto:ashraf@ibnzelt.com",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "1-700-81-9747",
      action: "Call Now",
      link: "tel:1700819747",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Chatbot",
      details: "Coming Soon",
      action: "Coming Soon",
      link: "#chatbot",
      color: "bg-orange-300 cursor-not-allowed",
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in
              <span className="text-blue-600 block">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ready to transform your bookkeeping? Let's discuss how we can help your business grow
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Reach Us</h2>
            <p className="text-xl text-gray-600">Choose your preferred way to connect</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 text-center">
                <div className="text-gray-700 mb-4 flex justify-center">{method.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-6">{method.details}</p>
                {!method.disabled ? (
                  <a
                    href={method.link}
                    target={method.title === "WhatsApp" ? "_blank" : undefined}
                    rel={method.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                    className={`${method.color} text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-block shadow-lg`}
                    onClick={method.title === "AI Chatbot" ? (e) => {
                      e.preventDefault();
                      alert("Chatbot integration would be implemented here");
                    } : undefined}
                  >
                    {method.action}
                  </a>
                ) : (
                  <button
                    disabled
                    className={`${method.color} text-white px-6 py-3 rounded-lg font-medium inline-block shadow-lg opacity-70`}
                  >
                    {method.action}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-xl text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20 bg-gray-50 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Business Hours</h2>
            </div>
            <div className="grid md:grid-cols-1 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Office Hours</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>Closed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Public Holiday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
              {/* WhatsApp Support box removed */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

