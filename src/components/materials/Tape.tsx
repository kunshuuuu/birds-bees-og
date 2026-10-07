import React from 'react';

interface TapeProps {
  className?: string;
  rotation?: number; // degrees, e.g. -5 to 5
  color?: 'tan' | 'pale-sky';
  width?: string;
}

/**
 * Washi Tape component (§6.3)
 * Realistic semi-translucent washi tape with jagged cut ends and fibrous texture.
 */
export const Tape: React.FC<TapeProps> = ({
  className = '',
  rotation = -4,
  color = 'tan',
  width = 'w-24',
}) => {
  const bgClass = color === 'tan' ? 'bg-[#E6C08B]/85' : 'bg-[#CED9E1]/85';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 h-7 ${width} ${bgClass} shadow-xs backdrop-blur-[1px] ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 12%, 98% 85%, 100% 100%, 3% 100%, 0% 88%)',
        backgroundImage: 'radial-gradient(rgba(42, 30, 24, 0.08) 1px, transparent 0)',
        backgroundSize: '4px 4px',
      }}
    />
  );
};
