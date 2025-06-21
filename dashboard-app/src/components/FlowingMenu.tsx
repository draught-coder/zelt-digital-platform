
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

interface MenuItem {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items: MenuItem[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const menuItems = itemRefs.current;
    
    // Initial animation
    gsap.fromTo(menuItems, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    // Hover animations
    menuItems.forEach((item, index) => {
      if (item) {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });
  }, []);

  return (
    <div ref={menuRef} className="flex flex-col md:flex-row gap-8 justify-center items-center min-h-[60vh]">
      {items.map((item, index) => (
        <Link
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          to={item.link}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white shadow-2xl transition-all duration-300 hover:shadow-3xl w-full md:w-80 h-64"
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4 text-6xl">
              {item.image}
            </div>
            <h3 className="text-2xl font-bold mb-2">{item.text}</h3>
            <div className="w-12 h-0.5 bg-white/50 group-hover:bg-white transition-colors duration-300" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      ))}
    </div>
  );
};

export default FlowingMenu;
