import React, { useState, useEffect } from 'react';
import { Bee } from '../illustrations/Bee';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    setFlying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setFlying(false), 1000);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Flight animation if clicked */}
      {flying && (
        <div className="absolute bottom-12 right-2 pointer-events-none animate-bounce">
          <Bee size={24} flutter={true} />
        </div>
      )}
      <button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full bg-[#E6C08B] text-[#2A1E18] hover:bg-[#AB653E] hover:text-white flex items-center justify-center border-2 border-[#2A1E18] shadow-[3.5px_3.5px_0px_#2A1E18] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0px_#2A1E18] active:translate-x-[3.5px] active:translate-y-[3.5px] active:shadow-none transition-all duration-150 group focus-visible:ring-2 focus-visible:ring-[#AB653E]"
        aria-label="Scroll back to top"
        data-cursor="Top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:-translate-y-1 transition-transform"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
};
