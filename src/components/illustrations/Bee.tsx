import React from 'react';

interface BeeProps {
  className?: string;
  size?: number; // size in px
  variant?: 'tiny' | 'sticker';
  flutter?: boolean;
}

export const Bee: React.FC<BeeProps> = ({
  className = '',
  size = 28,
  variant = 'tiny',
  flutter = false,
}) => {
  if (variant === 'tiny') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className={`inline-block overflow-visible ${flutter ? 'animate-pulse' : ''} ${className}`}
      >
        {/* Little bee wings */}
        <ellipse
          cx="13"
          cy="11"
          rx="5"
          ry="7"
          transform="rotate(-20 13 11)"
          fill="#CED9E1"
          fillOpacity="0.8"
          stroke="#2A1E18"
          strokeWidth="1"
        />
        <ellipse
          cx="19"
          cy="11"
          rx="5"
          ry="7"
          transform="rotate(20 19 11)"
          fill="#CED9E1"
          fillOpacity="0.8"
          stroke="#2A1E18"
          strokeWidth="1"
        />
        {/* Bee body */}
        <ellipse cx="16" cy="18" rx="7" ry="10" transform="rotate(90 16 18)" fill="#E6C08B" stroke="#2A1E18" strokeWidth="1.2" />
        {/* Stripes */}
        <line x1="14" y1="12" x2="14" y2="24" stroke="#2A1E18" strokeWidth="1.6" />
        <line x1="18" y1="12" x2="18" y2="24" stroke="#2A1E18" strokeWidth="1.6" />
        {/* Stinger */}
        <path d="M26 18 L29 18" stroke="#2A1E18" strokeWidth="1.5" strokeLinecap="round" />
        {/* Antennae */}
        <path d="M7 16 Q5 13 4 14" stroke="#2A1E18" strokeWidth="1" strokeLinecap="round" />
        <path d="M7 20 Q5 23 4 22" stroke="#2A1E18" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }

  // Sticker large detailed bee
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        width={size}
        height={size * 0.9}
        viewBox="0 0 160 140"
        fill="none"
        className="overflow-visible"
        style={{ filter: 'drop-shadow(0 6px 12px rgba(42, 30, 24, 0.18))' }}
      >
        {/* Translucent detailed wings with veins */}
        <g opacity="0.85">
          <path
            d="M75 55 C65 15, 30 10, 20 30 C15 50, 45 70, 75 60 Z"
            fill="#EAF2F6"
            stroke="#2A1E18"
            strokeWidth="2"
          />
          <path d="M35 32 C48 38, 60 50, 70 56" stroke="#2A1E18" strokeWidth="1" opacity="0.6" />
          <path
            d="M85 55 C95 15, 130 10, 140 30 C145 50, 115 70, 85 60 Z"
            fill="#EAF2F6"
            stroke="#2A1E18"
            strokeWidth="2"
          />
          <path d="M125 32 C112 38, 100 50, 90 56" stroke="#2A1E18" strokeWidth="1" opacity="0.6" />
        </g>
        {/* Fuzzy abdomen & thorax */}
        <ellipse cx="80" cy="80" rx="26" ry="34" transform="rotate(90 80 80)" fill="#E6C08B" stroke="#2A1E18" strokeWidth="3" />
        {/* Black velvety stripes */}
        <path d="M68 56 Q70 80 68 104" stroke="#2A1E18" strokeWidth="7" strokeLinecap="round" />
        <path d="M80 54 Q82 80 80 106" stroke="#2A1E18" strokeWidth="8" strokeLinecap="round" />
        <path d="M92 56 Q94 80 92 104" stroke="#2A1E18" strokeWidth="7" strokeLinecap="round" />
        {/* Head */}
        <circle cx="44" cy="80" r="14" fill="#2A1E18" />
        <circle cx="40" cy="74" r="3.5" fill="#E6C08B" />
        {/* Stinger */}
        <polygon points="116,77 126,80 116,83" fill="#2A1E18" />
        {/* Antennae */}
        <path d="M38 72 C32 60, 24 62, 22 58" stroke="#2A1E18" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M38 88 C32 100, 24 98, 22 102" stroke="#2A1E18" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};
