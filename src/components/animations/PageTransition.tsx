import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Trigger transition when route path changes
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
      window.scrollTo(0, 0);
    }, 650);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Tan Transition Curtain */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-50 bg-[#E6C08B] flex items-center justify-center transition-transform duration-500 ease-in-out ${
          animating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <img
            src="/logos/logo-full.png"
            alt="Birds & Bees Cafeto logo"
            className="h-24 sm:h-28 w-auto object-contain drop-shadow-[0_4px_12px_rgba(42,30,24,0.15)]"
          />
        </div>
      </div>
      {children}
    </>
  );
};
