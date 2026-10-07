import React, { useState } from 'react';
import { assets } from '../../data/assets';
import { TickMarksDoodle } from '../illustrations/DoodleDecorations';

export const Marquee: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const tiles = [
    ...assets.marquee,
    ...assets.marquee, // duplicated for seamless loop
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#2A1E18] py-4 select-none border-y border-[#6D4B38]/30">
      <div
        className={`flex items-center gap-0 whitespace-nowrap transition-all duration-300 ${
          isPaused ? '[animation-play-state:paused]' : ''
        }`}
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center animate-[marquee_38s_linear_infinite]">
          {tiles.map((item, idx) => (
            <div
              key={idx}
              className="relative inline-flex items-center shrink-0 w-[260px] sm:w-[320px] md:w-[380px] h-[190px] sm:h-[230px] md:h-[260px] overflow-hidden group cursor-pointer"
              data-cursor="Peek"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              {/* Dark gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1E18]/85 via-black/20 to-transparent" />

              {/* Caption and label */}
              <div className="absolute bottom-4 left-5 right-5 flex flex-col justify-end">
                <span className="font-ui text-xs md:text-sm font-bold tracking-[0.2em] text-[#F3FEFE] uppercase">
                  {item.title}
                </span>
                <span className="font-hand text-base md:text-lg text-[#E6C08B]">
                  {item.caption}
                </span>
              </div>

              {/* Tick marks divider between tiles */}
              <div className="absolute top-4 right-4 opacity-50">
                <TickMarksDoodle color="#F3FEFE" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
