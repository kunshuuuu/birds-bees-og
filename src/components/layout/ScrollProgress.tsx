import React, { useEffect, useState } from 'react';
import { Bee } from '../illustrations/Bee';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const current = Math.min(1, Math.max(0, window.scrollY / totalHeight));
      setProgress(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[2.5px] bg-transparent"
    >
      {/* 2px cinnamon progress line */}
      <div
        className="h-full bg-[#AB653E] transition-[width] duration-75 ease-out relative"
        style={{ width: `${progress * 100}%` }}
      >
        {/* Tiny bee riding along progress (desktop) */}
        <div className="hidden md:block absolute -right-3 -top-3 transform translate-y-[2px]">
          <Bee size={18} flutter={true} />
        </div>
      </div>
    </div>
  );
};
