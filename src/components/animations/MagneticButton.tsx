import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'outline' | 'dark' | 'leaf' | 'light' | 'tan';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
  cursorText?: string;
}

/**
 * Universal Button Design System
 * - Bold black border (#2A1E18) defining clear tactile shape
 * - Distinct bottom-right offset graphic shadow
 * - Tactile hover interaction: subtle translation toward the shadow (pressed effect)
 * - Accessible keyboard focus, touch targets, and semantic links/buttons
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  to,
  href,
  target,
  rel,
  variant = 'primary',
  className = '',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  ariaLabel,
  cursorText = 'Book',
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (disabled || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = elementRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.12;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.12;
    setOffset({ x, y });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-ui font-bold uppercase tracking-[0.14em] select-none text-center ' +
    'border-2 border-[#2A1E18] transition-all duration-150 ease-out ' +
    'focus-visible:ring-2 focus-visible:ring-[#AB653E] focus-visible:ring-offset-2 focus-visible:outline-hidden ';

  const sizeStyles = {
    sm: 'text-[11px] px-4 py-2 rounded-full min-h-[38px] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none',
    md: 'text-[13px] px-6 py-2.5 rounded-full min-h-[46px] shadow-[3.5px_3.5px_0px_#2A1E18] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0px_#2A1E18] active:translate-x-[3.5px] active:translate-y-[3.5px] active:shadow-none',
    lg: 'text-[14px] px-8 py-3.5 rounded-full min-h-[52px] shadow-[4px_4px_0px_#2A1E18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1.5px_1.5px_0px_#2A1E18] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
  };

  const variantStyles = {
    primary: 'bg-[#AB653E] text-[#F3FEFE] hover:bg-[#965431]',
    outline: 'bg-[#F5F0E6] text-[#2A1E18] hover:bg-[#E6C08B]',
    dark: 'bg-[#2A1E18] text-[#F3FEFE] hover:bg-[#3B2C24]',
    leaf: 'bg-[#2F5D3A] text-[#F3FEFE] hover:bg-[#23462B]',
    light: 'bg-[#F3FEFE] text-[#2A1E18] hover:bg-[#E6C08B]',
    tan: 'bg-[#E6C08B] text-[#2A1E18] hover:bg-[#D8AE74]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer';

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${disabledStyle} ${className}`;

  const magneticStyle = {
    transform: disabled
      ? 'none'
      : offset.x || offset.y
      ? `translate(${offset.x}px, ${offset.y}px)`
      : undefined,
  };

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 w-full">
      {children}
    </span>
  );

  if (to && !disabled) {
    return (
      <Link
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        to={to}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={combinedClasses}
        style={magneticStyle}
        aria-label={ariaLabel}
        data-cursor={cursorText}
      >
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={combinedClasses}
        style={magneticStyle}
        aria-label={ariaLabel}
        data-cursor={cursorText}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={combinedClasses}
      style={magneticStyle}
      aria-label={ariaLabel}
      data-cursor={cursorText}
    >
      {content}
    </button>
  );
};
