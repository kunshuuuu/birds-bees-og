import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bee } from '../illustrations/Bee';
import { DashedLoopDoodle } from '../illustrations/DoodleDecorations';
import { PostageStamp } from '../materials/PostageStamp';
import { Tape } from '../materials/Tape';
import { MagneticButton } from '../animations/MagneticButton';

export const BeeCtaBreak: React.FC = () => {
  const [beeLoops, setBeeLoops] = useState(0);

  const handleBeeClick = () => {
    setBeeLoops((prev) => prev + 1);
  };

  return (
    <section className="relative w-full py-24 md:py-36 bg-[#F5F0E6] paper-texture overflow-hidden border-t border-[#CED9E1]/50">
      {/* Faint botanical line drawings at the edges */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden md:block">
        <svg width="220" height="320" viewBox="0 0 100 150" fill="none" stroke="#2A1E18">
          <path d="M50 140 C50 80, 20 60, 10 30 C30 50, 45 70, 50 140 Z" strokeWidth="1.5" />
          <path d="M50 140 C50 80, 80 60, 90 30 C70 50, 55 70, 50 140 Z" strokeWidth="1.5" />
          <path d="M50 80 C40 40, 25 30, 20 10 C35 25, 45 40, 50 80 Z" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Center-Left: Big Illustrated Bee & Headline */}
        <div className="flex flex-col items-start max-w-xl">
          <div
            onClick={handleBeeClick}
            className={`relative mb-6 cursor-pointer select-none transition-transform duration-700 ${
              beeLoops % 2 !== 0 ? 'rotate-12 scale-110' : 'hover:scale-105'
            }`}
            data-cursor="Buzz"
            title="Click me for a loop!"
          >
            <Bee size={130} variant="sticker" flutter={true} />
            <div className="absolute -top-4 -right-16 pointer-events-none">
              <DashedLoopDoodle color="#AB653E" />
            </div>
          </div>

          <h3 className="font-display font-medium text-3xl sm:text-5xl text-[#2A1E18] tracking-tight leading-tight mb-4">
            Hungry? Grab a table <br />
            <span className="italic font-script text-[#AB653E] text-4xl sm:text-6xl">
              before the bees do.
            </span>
          </h3>

          <p className="font-body text-lg text-[#6D4B38] mb-8 leading-relaxed">
            Garden tables catch the afternoon breeze and evening festoon lighting. Reserve ahead — no waiting in line.
          </p>

          <MagneticButton to="/book" variant="primary" size="lg">
            Book a Table
          </MagneticButton>
        </div>

        {/* Right: Postage Stamp & Taped Paper Label */}
        <div className="relative flex flex-col items-center">
          <Tape rotation={-8} className="-top-4 right-10 z-20" />
          <PostageStamp rotation={3} label="GARDEN CAFETO" value="SCHEME 71" />

          {/* Taped paper label */}
          <div className="mt-4 bg-[#E6C08B]/30 px-4 py-2 rounded-md border border-[#E6C08B] rotate-[-2deg] shadow-xs">
            <span className="font-hand text-xl text-[#2A1E18] font-bold">
              fresh from the garden ✨
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
