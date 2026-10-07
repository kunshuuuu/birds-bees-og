import React from 'react';
import { site } from '../../lib/site';
import { Tape } from '../materials/Tape';
import { Stamp } from '../materials/Stamp';
import { Sticker } from '../materials/Sticker';
import { Bee } from '../illustrations/Bee';

export const MapCard: React.FC = () => {
  return (
    <div
      className="relative w-full max-w-lg bg-[#F5F0E6] paper-texture p-4 sm:p-6 rounded-2xl border-4 border-white shadow-2xl rotate-[-1deg] select-none"
      style={{
        boxShadow: '0 20px 40px -10px rgba(42, 30, 24, 0.25)',
      }}
    >
      <Tape rotation={-5} className="-top-3 left-10" />
      <Tape rotation={4} className="-top-3 right-10" />

      {/* Vector Illustrated Garden Map (§15.1) */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#E8EFE9] border border-[#CED9E1]">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Green parks */}
          <rect x="20" y="30" width="120" height="90" rx="16" fill="#8DB580" fillOpacity="0.4" />
          <rect x="240" y="160" width="130" height="110" rx="20" fill="#8DB580" fillOpacity="0.35" />

          {/* Blue pond */}
          <path
            d="M50 190 C80 180, 110 200, 100 240 C90 270, 40 260, 30 230 C20 200, 40 195, 50 190 Z"
            fill="#86B3C3"
            fillOpacity="0.6"
          />

          {/* White roads */}
          <path d="M-10 140 H 410" stroke="white" strokeWidth="18" strokeLinecap="round" />
          <path d="M180 -10 V 310" stroke="white" strokeWidth="16" strokeLinecap="round" />
          <path d="M70 140 C140 140, 220 200, 290 290" stroke="white" strokeWidth="12" />

          {/* Road labels */}
          <text x="70" y="135" fill="#6D4B38" fontSize="8" fontFamily="sans-serif" fontWeight="bold">
            PHOOTI KOTHI CIR
          </text>
          <text x="186" y="60" fill="#6D4B38" fontSize="8" fontFamily="sans-serif" fontWeight="bold">
            SCHEME 71
          </text>
          <text x="245" y="150" fill="#6D4B38" fontSize="8" fontFamily="sans-serif">
            near Brand Factory
          </text>

          {/* Small houses */}
          <rect x="40" y="50" width="18" height="14" fill="#6D4B38" fillOpacity="0.3" rx="2" />
          <rect x="75" y="65" width="22" height="16" fill="#6D4B38" fillOpacity="0.3" rx="2" />
          <rect x="260" y="190" width="20" height="15" fill="#6D4B38" fillOpacity="0.3" rx="2" />

          {/* Tree dots */}
          <circle cx="50" cy="100" r="6" fill="#2F5D3A" fillOpacity="0.5" />
          <circle cx="90" cy="45" r="7" fill="#2F5D3A" fillOpacity="0.6" />
          <circle cx="280" cy="230" r="8" fill="#2F5D3A" fillOpacity="0.5" />
          <circle cx="320" cy="190" r="6" fill="#2F5D3A" fillOpacity="0.6" />

          {/* Primary Cafe Pin (Pulsing) */}
          <g transform="translate(180, 140)">
            <circle cx="0" cy="0" r="14" fill="#AB653E" fillOpacity="0.25" className="animate-ping" />
            <circle cx="0" cy="0" r="7" fill="#AB653E" />
            <circle cx="0" cy="0" r="3" fill="#F3FEFE" />
          </g>
        </svg>

        {/* Cafe Pill Marker on Pin */}
        <a
          href={site.links.maps}
          target="_blank"
          rel="noreferrer"
          className="absolute top-[40%] left-[34%] bg-[#2A1E18] text-[#F3FEFE] px-3 py-1.5 rounded-full border-2 border-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none flex items-center gap-1.5 hover:bg-[#AB653E] transition-all"
          data-cursor="Map"
        >
          <span className="font-ui text-[10px] font-bold uppercase tracking-wider">
            Birds &amp; Bees Cafeto ↗
          </span>
        </a>

        {/* Hummingbird and Bee Sticker on corner */}
        <div className="absolute top-3 left-3 z-10">
          <Sticker rotation={-8} type="bee">
            <Bee size={18} />
          </Sticker>
        </div>

        <div className="absolute bottom-3 right-3 z-10">
          <Stamp variant="leaf" size={75} rotation={-6} />
        </div>
      </div>

      {/* Caption Notice */}
      <div className="mt-3 flex items-center justify-between font-ui text-[11px] text-[#6D4B38]">
        <span className="italic">
          Illustration — not to scale. Tap pin for live directions.
        </span>
        <span className="font-bold uppercase text-[#2F5D3A]">
          Scheme 71, Indore
        </span>
      </div>
    </div>
  );
};
