
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6 text-blue-400" />,
      title: "Phone",
      details: "+60 12-345 6789",
      description: "Mon-Fri, 9AM-6PM MYT",
      action: "tel:+60123456789"
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-400" />,
      title: "Email",
      details: "hello@ibnzelt.com",
      description: "We'll respond within 24 hours",
      action: "mailto:hello@ibnzelt.com"
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-400" />,
      title: "Office",
      details: "Kuala Lumpur, Malaysia",
      description: "By appointment only",
      action: null
    }
  ];

  const serviceOptions = [
    "Basic Cloud ERP (RM50/month)",
    "Advanced Cloud ERP (RM500/month)",
    "Enterprise Cloud ERP (RM1500/month)",
    "Tax Compliance Consultation",
    "Business Setup Advisory",
    "Custom Integration Development",
    "Staff Training Program",
    "Partnership Opportunity",
    "Other"
  ];

  const faqs = [
    {
      question: "How quickly can I get started with Cloud ERP?",
      answer: "Most clients are up and running within 24-48 hours of signup. Our team handles the setup and provides comprehensive onboarding."
    },
    {
      question: "Is WhatsApp invoice capture really automated?",
      answer: "Yes! Simply send your invoices via WhatsApp and our AI automatically extracts, categorizes, and processes the data into your books."
    },
    {
      question: "Do you support businesses outside Malaysia?",
      answer: "We specialize in Malaysian tax regulations and compliance. For international businesses, we can discuss custom solutions during consultation."
    },
    {
      question: "What makes Ibn Zelt different from traditional bookkeepers?",
      answer: "We combine AI automation with human expertise, offering real-time processing, WhatsApp integration, and digital-first solutions that traditional firms can't match."
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Absolutely! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply from the next billing cycle."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Let's Transform
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent block">
                Your Business
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ready to experience the future of bookkeeping? Get in touch and let's discuss how we can revolutionize your financial management.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Get In Touch</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-slate-800 p-8 rounded-2xl border border-blue-500/20 text-center hover:border-blue-500/40 transition-all duration-200">
                  <div className="mb-4 flex justify-center">{method.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                  {method.action ? (
                    <a 
                      href={method.action}
                      className="text-blue-400 hover:text-blue-300 font-medium text-lg block mb-2"
                    >
                      {method.details}
                    </a>
                  ) : (
                    <p className="text-blue-400 font-medium text-lg mb-2">{method.details}</p>
                  )}
                  <p className="text-gray-400 text-sm">{method.description}</p>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="text-center">
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Start Conversation on WhatsApp</span>
                <Send className="w-5 h-5" />
              </a>
              <p className="text-gray-400 text-sm mt-4">
                Fastest way to get answers! We typically respond within minutes during business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Schedule Your Free Consultation</h2>
              <p className="text-gray-400">Tell us about your business needs and we'll create a customized solution for you.</p>
            </div>

            {isSubmitted ? (
              <div className="bg-green-500/20 border border-green-500 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-300">Thank you for your interest. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl border border-blue-500/20">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-white font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="+60 12-345 6789"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-white font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="service" className="block text-white font-medium mb-2">Service of Interest *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Tell us about your business needs, current challenges, or any specific questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-xl border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Clock className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Business Hours</h2>
            <div className="bg-slate-800 p-6 rounded-xl border border-blue-500/20">
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="text-blue-400">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-blue-400">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                All times are in Malaysia Time (MYT). For urgent matters outside business hours, contact us via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
