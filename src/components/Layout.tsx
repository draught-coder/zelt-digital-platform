
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  // Only apply the alternate background if not on the Home page
  const notHome = location.pathname !== '/';

  return (
    <div className={notHome ? "min-h-screen bg-futuristic-alt relative" : "min-h-screen bg-white"}>
      <Header />
      <main className="pt-20 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
