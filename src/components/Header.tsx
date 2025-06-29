import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userRole, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog/posts' },
    { name: 'Info Hub', path: '/info' },
    { name: 'Partners', path: '/affiliate' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getDashboardButtonText = () => {
    if (!userRole) return 'Dashboard';
    return userRole === 'bookkeeper' ? 'Bookkeeper Dashboard' : 'Client Dashboard';
  };

  // Optionally, show a loading spinner or skeleton while loading
  if (loading) {
    console.log('[Header] loading...');
    return <div className="h-16 flex items-center justify-center">Loading...</div>;
  }

  console.log('[Header] render', { user, userRole, loading });

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/lovable-uploads/80b8ec3f-f556-457c-bae2-4c103dc37f8d.png"
              alt="Ibn Zelt Logo"
              className="w-12 h-12 object-contain"
              style={{ minWidth: 40, minHeight: 40 }}
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Ibn Zelt</h1>
              <p className="text-xs text-blue-600 -mt-1">Digital Bookkeeping</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/products"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Digital Journey
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:block ml-4">
            {user ? (
              <div className="flex gap-2">
                <Link
                  to="/dashboard"
                  className="text-blue-600 font-semibold border border-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition"
                >
                  {getDashboardButtonText()}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 font-semibold border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-blue-600 font-semibold border border-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition"
              >
                Exclusive
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/products"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium text-center shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Digital Journey
              </Link>
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/dashboard"
                    className="text-blue-600 font-semibold border border-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getDashboardButtonText()}
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-gray-700 font-semibold border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="text-blue-600 font-semibold border border-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Exclusive
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
