import React from 'react';

interface PostageStampProps {
  className?: string;
  rotation?: number;
  label?: string;
  value?: string;
}

export const PostageStamp: React.FC<PostageStampProps> = ({
  className = '',
  rotation = 4,
  label = 'BIRDS & BEES',
  value = 'INDORE',
}) => {
  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        filter: 'drop-shadow(0 4px 8px rgba(42, 30, 24, 0.12))',
      }}
    >
      {/* Postage Stamp body with scalloped/perforated borders */}
      <div className="relative w-28 h-36 bg-[#F5F0E6] p-2 border-2 border-dashed border-[#AB653E]/40 flex flex-col items-center justify-between">
        {/* Top stamp text */}
        <div className="w-full text-center">
          <span className="text-[9px] uppercase tracking-widest font-ui font-semibold text-[#6D4B38]/70">
            {label}
          </span>
        </div>

        {/* Center illustration: botanical flower / bee */}
        <div className="w-16 h-16 rounded-full bg-[#E6C08B]/20 flex items-center justify-center p-2 border border-[#E6C08B]/40">
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-[#AB653E]" fill="none" stroke="currentColor">
            <path
              d="M20 8 C14 8, 12 16, 20 22 C28 16, 26 8, 20 8 Z"
              fill="#AB653E"
              opacity="0.2"
              strokeWidth="1.5"
            />
            <path
              d="M8 20 C8 14, 16 12, 22 20 C16 28, 8 26, 8 20 Z"
              fill="#AB653E"
              opacity="0.2"
              strokeWidth="1.5"
            />
            <circle cx="20" cy="20" r="3.5" fill="#6D4B38" />
          </svg>
        </div>

        {/* Bottom value */}
        <div className="w-full flex items-center justify-between text-[8px] font-mono font-medium text-[#6D4B38]/80 px-1 border-t border-[#AB653E]/20 pt-1">
          <span>{value}</span>
          <span>100% VEG</span>
        </div>

        {/* Wavy postmark lines overlapping the stamp */}
        <div className="absolute -top-3 -right-6 pointer-events-none opacity-60">
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="#2A1E18">
            <path d="M0 10 Q15 0 30 10 T60 10" strokeWidth="1" />
            <path d="M0 18 Q15 8 30 18 T60 18" strokeWidth="1" />
            <path d="M0 26 Q15 16 30 26 T60 26" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
};
