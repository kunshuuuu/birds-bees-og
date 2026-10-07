import React, { useState } from 'react';

interface StampProps {
  text?: string;
  subtext?: string;
  variant?: 'coral' | 'leaf' | 'blue';
  rotation?: number;
  size?: number; // px diameter
  className?: string;
  pressable?: boolean;
}

export const Stamp: React.FC<StampProps> = ({
  text = '100% PURE VEG',
  subtext = 'BIRDS & BEES CAFETO',
  variant = 'coral',
  rotation = -12,
  size = 110,
  className = '',
  pressable = true,
}) => {
  const [pressed, setPressed] = useState(false);

  const colors = {
    coral: {
      border: 'border-[#E58F78]',
      text: 'text-[#E58F78]',
      bg: 'rgba(229, 143, 120, 0.04)',
      stroke: '#E58F78',
    },
    leaf: {
      border: 'border-[#2F5D3A]',
      text: 'text-[#2F5D3A]',
      bg: 'rgba(47, 93, 58, 0.04)',
      stroke: '#2F5D3A',
    },
    blue: {
      border: 'border-[#3B4F8F]',
      text: 'text-[#3B4F8F]',
      bg: 'rgba(59, 79, 143, 0.04)',
      stroke: '#3B4F8F',
    },
  };

  const selected = colors[variant];

  const handlePress = () => {
    if (!pressable) return;
    setPressed(true);
    setTimeout(() => setPressed(false), 600);
  };

  return (
    <div
      onClick={handlePress}
      className={`relative inline-flex items-center justify-center select-none ${
        pressable ? 'cursor-pointer hover:scale-105 active:scale-90 transition-transform' : ''
      } ${pressed ? 'scale-95 brightness-95' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
      title="100% Pure Vegetarian Garden Cafe Stamp"
      data-cursor="Press"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(42, 30, 24, 0.08))' }}
      >
        {/* Outer dashed stamped border */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={selected.stroke}
          strokeWidth="2.5"
          strokeDasharray="4 2"
          opacity="0.85"
        />
        {/* Inner thin border */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={selected.stroke}
          strokeWidth="1.2"
          opacity="0.75"
        />

        {/* Circular text along curved path */}
        <path
          id={`curve-${variant}-${size}`}
          d="M 18,50 A 32,32 0 1,1 82,50 A 32,32 0 1,1 18,50"
          fill="none"
        />
        <text
          fill={selected.stroke}
          fontSize="7.5"
          fontWeight="bold"
          letterSpacing="1.8"
          opacity="0.9"
        >
          <textPath href={`#curve-${variant}-${size}`} startOffset="50%" textAnchor="middle">
            {subtext}
          </textPath>
        </text>

        {/* Center label */}
        <g transform="translate(50, 50)">
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fill={selected.stroke}
            fontSize="10"
            fontWeight="800"
            letterSpacing="0.8"
          >
            {text}
          </text>
          <text
            y="11"
            textAnchor="middle"
            fill={selected.stroke}
            fontSize="6"
            letterSpacing="0.5"
            opacity="0.8"
          >
            ★ SCHEME 71 ★
          </text>
        </g>
      </svg>
    </div>
  );
};
