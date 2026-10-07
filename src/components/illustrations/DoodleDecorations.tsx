import React from 'react';

/**
 * Hand-drawn doodle elements (§6.4)
 * Outline sparkles, dashed loops, curly arrows, tick marks, and wavy underlines.
 */

export const SparklesDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#2A1E18',
}) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    className={`inline-block overflow-visible ${className}`}
  >
    <path
      d="M20 4 C20 14, 26 20, 36 20 C26 20, 20 26, 20 36 C20 26, 14 20, 4 20 C14 20, 20 14, 20 4 Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M36 30 C36 35, 38 37, 43 37 C38 37, 36 39, 36 44 C36 39, 34 37, 29 37 C34 37, 36 35, 36 30 Z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

export const DashedLoopDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#2A1E18',
}) => (
  <svg
    width="160"
    height="60"
    viewBox="0 0 160 60"
    fill="none"
    className={`overflow-visible ${className}`}
  >
    <path
      d="M10 40 C40 45, 70 20, 95 30 C120 40, 130 15, 105 10 C85 6, 80 35, 120 45 C140 50, 155 35, 150 25"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="5 4"
      strokeLinecap="round"
    />
  </svg>
);

export const WavyUnderlineDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#AB653E',
}) => (
  <svg
    width="180"
    height="18"
    viewBox="0 0 180 18"
    fill="none"
    className={`block ${className}`}
  >
    <path
      d="M4 10 Q 24 2, 44 10 T 84 10 T 124 10 T 164 10 T 176 10"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const CircleCheckDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#2A1E18',
}) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    className={`inline-block ${className}`}
  >
    <circle
      cx="22"
      cy="22"
      r="18"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="4 2"
      opacity="0.8"
    />
    <path
      d="M14 22 L20 28 L30 15"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TickMarksDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#2A1E18',
}) => (
  <svg
    width="32"
    height="20"
    viewBox="0 0 32 20"
    fill="none"
    className={`inline-block ${className}`}
  >
    <line x1="6" y1="16" x2="12" y2="4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="14" y1="16" x2="20" y2="4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="22" y1="16" x2="28" y2="4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const CurlyArrowDoodle: React.FC<{ className?: string; color?: string; label?: string }> = ({
  className = '',
  color = '#2A1E18',
  label,
}) => (
  <div className={`inline-flex items-center gap-2 ${className}`}>
    <svg
      width="70"
      height="45"
      viewBox="0 0 70 45"
      fill="none"
      className="overflow-visible"
    >
      <path
        d="M8 8 C25 2, 45 10, 52 26 C55 35, 48 40, 42 35 C38 30, 42 22, 58 28 L64 30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M58 24 L65 30 L56 34"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {label && (
      <span className="font-hand text-xl text-[#2A1E18] -rotate-3 select-none">
        {label}
      </span>
    )}
  </div>
);
