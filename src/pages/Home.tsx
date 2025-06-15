import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, BarChart3, Shield } from 'lucide-react';
import useParallax from '../hooks/useParallax';

const Home = () => {
  useParallax(); // Attach parallax scroll effect

  const features = [
    {
      icon: <Camera className="w-8 h-8 text-blue-400" />,
      title: "WhatsApp Invoice Capture",
      description: "Send invoices via WhatsApp. AI extracts data automatically and updates your books instantly."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
      title: "Real-time Dashboard", 
      description: "Monitor your business performance with live financial data and automated reporting."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      title: "Tax Compliance",
      description: "Stay compliant with Malaysian tax regulations through automated calculations and filing."
    }
  ];

  return (
    // Layered unified background using blue-purple-slate gradient and a neon grid.
    <div className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(120deg, #111d2b 0%, #223963 30%, #2952a3 55%, #5f3ba4 90%, #22113b 100%)',
      }}
    >
      {/* Parallax and decorative backgrounds */}
      <div className="fixed top-0 left-0 h-screen w-full -z-10 pointer-events-none select-none">
        {/* Gradient overlay */}
        <div
          data-parallax-depth="1"
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(120deg, #1e293b 0%, #2563eb 65%, #8b5cf6 100%)',
            opacity: 0.4,
            zIndex: 1,
          }}
        />
        {/* --- IMPROVED Neon Futuristic Grid (SVG) Overlay --- */}
        <div
          data-parallax-depth="2"
          className="absolute inset-0"
          style={{
            zIndex: 20, // set high to make visible
            opacity: 0.55, // higher opacity
            pointerEvents: 'none',
            mixBlendMode: 'lighten', // FIXED: changed from 'lighter' to 'lighten' for TypeScript
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="none"
            style={{
              width: '100vw',
              height: '100vh',
              minWidth: '100%',
              minHeight: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              display: 'block',
              filter: 'drop-shadow(0 0 60px #7afcff) drop-shadow(0 0 120px #8b5cf6)', // heavy glows!
              pointerEvents: 'none'
            }}
          >
            {/* Vertical neon lines */}
            {[...Array(22)].map((_, i) => (
              <line
                key={`v${i}`}
                x1={(i * 96).toString()}
                y1="0"
                x2={(i * 96).toString()}
                y2="1080"
                stroke="#54d3fc"
                strokeWidth="2.5"
                opacity={i % 4 === 0 ? 0.7 : 0.33}
                style={{
                  filter: 'drop-shadow(0 0 24px #54d3fc)'
                }}
              />
            ))}
            {/* Horizontal neon lines */}
            {[...Array(13)].map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={(i * 88).toString()}
                x2="1920"
                y2={(i * 88).toString()}
                stroke="#bb9aff"
                strokeWidth="2.5"
                opacity={i % 3 === 0 ? 0.5 : 0.22}
                style={{
                  filter: 'drop-shadow(0 0 18px #bb9aff)'
                }}
              />
            ))}
            {/* Central Neon Glow */}
            <ellipse
              cx="960"
              cy="540"
              rx="720"
              ry="220"
              fill="none"
              stroke="#82f3ff"
              strokeWidth="7"
              opacity="0.19"
              style={{
                filter: 'drop-shadow(0 0 96px #82f3ff)'
              }}
            />
            {/* Edge glow */}
            <rect
              x="0"
              y="0"
              width="1920"
              height="1080"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="32"
              opacity="0.29"
              rx="40"
              style={{
                filter: 'drop-shadow(0 0 82px #c7b3ff)'
              }}
            />
          </svg>
        </div>
        {/* Parallax grid pattern from before (keep) */}
        <div
          data-parallax-depth="3"
          className="absolute inset-0"
          style={{
            zIndex: 3,
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147,51,234,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px, 160px 160px',
            opacity: 0.13,
          }}
        />
        {/* Light beams */}
        <div
          data-parallax-depth="2"
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-15 animate-pulse"
          style={{ zIndex: 4 }}
        />
        <div
          data-parallax-depth="3"
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-7 animate-pulse"
          style={{ animationDelay: '1s', zIndex: 5 }}
        />
        <div
          data-parallax-depth="4"
          className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-10 animate-pulse"
          style={{ animationDelay: '2s', zIndex: 6 }}
        />
        {/* Subtle noise overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 10,
            opacity: 0.08,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>
      {/* Main page content */}
      <section className="pt-20 pb-20 relative z-10">
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-300 mb-8 tracking-tighter leading-none drop-shadow-2xl">
              <span style={{ 
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: '900',
                textShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.23)',
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
              <span className="text-blue-200 font-medium">From photo to financial records in seconds.</span>
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
                className="border-2 border-blue-400 text-blue-100 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-400/10 transition-all duration-300 shadow-lg backdrop-blur-sm"
              >
                Try Demo
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow">Key Features</h2>
            <p className="text-xl text-blue-100">Everything you need to manage your business finances</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 p-8 rounded-lg shadow-xl border border-white/20 hover:shadow-2xl hover:scale-105 transition-transform text-white backdrop-blur-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">Transform your bookkeeping today</p>
          <Link
            to="/contact"
            className="bg-blue-700/90 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-500 transition-colors shadow-lg inline-flex items-center space-x-2"
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
