import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Camera, BarChart3, Shield } from 'lucide-react';
import useParallax from '../hooks/useParallax';

const Home = () => {
  useParallax(); // Attach parallax scroll effect

  const features = [
    {
      icon: <Camera className="w-8 h-8 text-blue-600" />,
      title: "WhatsApp Invoice Capture",
      description: "Send invoices via WhatsApp. AI extracts data automatically and updates your books instantly."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Real-time Dashboard", 
      description: "Monitor your business performance with live financial data and automated reporting."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Tax Compliance",
      description: "Stay compliant with Malaysian tax regulations through automated calculations and filing."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20 relative overflow-hidden">
        {/* Parallax Background Layers */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Gradient layer (slowest) */}
          <div
            data-parallax-depth="1"
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-black"
            style={{ zIndex: 1 }}
          />
          {/* Animated Grid Pattern */}
          <div
            data-parallax-depth="2"
            className="absolute inset-0 opacity-20"
            style={{
              zIndex: 2,
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(rgba(147, 51, 234, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px, 60px 60px, 120px 120px, 120px 120px'
            }}
          ></div>
          {/* Glowing Circles and Shapes (different depths) */}
          <div
            data-parallax-depth="4"
            className="absolute top-20 left-10 w-40 h-40 border-2 border-blue-400 rounded-full opacity-30 animate-pulse shadow-lg shadow-blue-500/50"
            style={{ zIndex: 3 }}
          />
          <div
            data-parallax-depth="6"
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg rotate-45 opacity-40 animate-spin shadow-2xl"
            style={{ animationDuration: '20s', zIndex: 4 }}
          />
          <div
            data-parallax-depth="5"
            className="absolute bottom-20 left-1/4 w-20 h-20 border-4 border-purple-400 rotate-12 opacity-35 animate-bounce shadow-lg shadow-purple-500/30"
            style={{ zIndex: 5 }}
          />
          <div
            data-parallax-depth="3"
            className="absolute top-1/3 right-1/3 w-32 h-32 border-2 border-cyan-300 rounded-full opacity-25 animate-pulse shadow-xl shadow-cyan-400/40"
            style={{ zIndex: 6 }}
          />
          {/* Light beams */}
          <div
            data-parallax-depth="2"
            className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-40 animate-pulse"
            style={{ zIndex: 7 }}
          />
          <div
            data-parallax-depth="3"
            className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-30 animate-pulse"
            style={{ animationDelay: '1s', zIndex: 8 }}
          />
          <div
            data-parallax-depth="4"
            className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-35 animate-pulse"
            style={{ animationDelay: '2s', zIndex: 9 }}
          />
          {/* Subtle noise overlay (static, doesn't move) */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              zIndex: 10,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-8 tracking-tighter leading-none drop-shadow-2xl">
              <span style={{ 
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: '900',
                textShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
                letterSpacing: '-0.02em'
              }}>
                WE DON'T DO NORMAL
              </span>
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Cloud ERP for Malaysian SMEs
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light tracking-wide leading-relaxed drop-shadow-md" style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              letterSpacing: '0.02em'
            }}>
              Automate your bookkeeping with AI-powered invoice capture via WhatsApp.<br />
              <span className="text-blue-300 font-medium">From photo to financial records in seconds.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                View Pricing
              </Link>
              <a
                href="https://demo.ibnzelt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-blue-400 text-blue-300 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-400/10 transition-all duration-300 shadow-lg backdrop-blur-sm"
              >
                Try Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600">Everything you need to manage your business finances</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Transform your bookkeeping today</p>
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center space-x-2"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
