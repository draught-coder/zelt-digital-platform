
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FlowingMenu from '@/components/FlowingMenu';

const Index = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const menuItems = [
    {
      link: "/auth?type=bookkeeper",
      text: "Bookkeeper Login",
      image: "📊"
    },
    {
      link: "/auth?type=client",
      text: "Client Login",
      image: "👤"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Financial Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional bookkeeping and financial management platform for Malaysian businesses
          </p>
        </div>
        
        <FlowingMenu items={menuItems} />
        
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Secure • Professional • Compliant with Malaysian Tax Requirements
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
