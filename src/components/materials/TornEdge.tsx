import React from 'react';

interface TornEdgeProps {
  fillColor?: string; // background color of the top or bottom section
  position?: 'top' | 'bottom';
  className?: string;
}

export const TornEdge: React.FC<TornEdgeProps> = ({
  fillColor = '#F5F0E6',
  position = 'bottom',
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full overflow-hidden leading-none z-10 ${className} ${
        position === 'top' ? 'rotate-180 -mt-1' : '-mb-1'
      }`}
    >
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="w-full h-5 md:h-7 block"
        style={{ fill: fillColor }}
      >
        <path d="M0,0 L0,14 Q30,6 60,16 T120,8 T180,18 T240,6 T300,16 T360,7 T420,18 T480,9 T540,16 T600,6 T660,19 T720,8 T780,17 T840,6 T900,18 T960,8 T1020,16 T1080,7 T1140,19 T1200,8 L1200,0 Z" />
      </svg>
    </div>
  );
};
