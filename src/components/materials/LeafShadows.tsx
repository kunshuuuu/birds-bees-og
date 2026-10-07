import React, { useEffect, useState } from 'react';

/**
 * LeafShadows component (§6.3)
 * Dappled sunlight leaf silhouettes gently drifting across background surfaces.
 * Respects prefers-reduced-motion.
 */
export const LeafShadows: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 16;
      const y = (clientY / window.innerHeight - 0.5) * 16;
      setOffset({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.08] mix-blend-multiply transition-transform duration-700 ease-out"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      <svg
        className="w-full h-full object-cover scale-110"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="leaf-blur">
          <feGaussianBlur stdDeviation="38" />
        </filter>
        <g filter="url(#leaf-blur)" fill="#2A1E18">
          {/* Top-right branch canopy */}
          <path d="M1200 -50 C1100 100, 950 180, 850 240 C900 140, 1050 80, 1300 -80 Z" />
          <path d="M1350 40 C1220 180, 1100 280, 980 340 C1080 260, 1200 180, 1420 80 Z" />
          <path d="M1400 200 C1280 320, 1150 420, 1020 480 C1120 410, 1250 320, 1460 220 Z" />

          {/* Left drift leaves */}
          <path d="M-80 300 C60 380, 180 440, 260 520 C180 480, 60 420, -100 360 Z" />
          <path d="M-50 550 C120 620, 240 700, 310 820 C200 750, 80 660, -90 600 Z" />

          {/* Dappled light circles */}
          <circle cx="1100" cy="220" r="140" opacity="0.6" />
          <circle cx="920" cy="360" r="100" opacity="0.5" />
          <circle cx="180" cy="460" r="110" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};
