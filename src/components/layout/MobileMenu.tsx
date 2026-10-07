import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bee } from '../illustrations/Bee';
import { SparklesDoodle } from '../illustrations/DoodleDecorations';
import { MagneticButton } from '../animations/MagneticButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; path: string }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#F5F0E6] flex flex-col justify-between p-8 overflow-y-auto animate-in fade-in duration-300"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link to="/" onClick={onClose} className="flex items-center gap-2.5 focus:outline-hidden">
          <img
            src="/logos/logo-icon.png"
            alt="Birds & Bees Cafeto logo"
            className="h-10 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-display font-medium text-2xl text-[#2A1E18] leading-tight">
              Birds &amp; Bees
            </span>
            <span className="text-[9px] font-ui uppercase tracking-[0.25em] font-bold text-[#AB653E]">
              Cafeto
            </span>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="p-2.5 rounded-xl bg-white text-[#2A1E18] border-2 border-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none transition-all duration-150"
          aria-label="Close menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Center Links (Editorial Poster) */}
      <nav className="my-8 flex flex-col gap-5">
        {links.map((link, idx) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={onClose}
            className="group flex items-baseline justify-between font-display text-4xl text-[#2A1E18] hover:text-[#AB653E] transition-colors py-1 border-b border-[#6D4B38]/10"
          >
            <span>{link.label}</span>
            <span className="font-hand text-lg text-[#6D4B38]/50 group-hover:text-[#AB653E]">
              0{idx + 1}
            </span>
          </Link>
        ))}
      </nav>

      {/* Bottom Actions & Botanical Note */}
      <div className="flex flex-col gap-5 pt-4">
        <div className="flex items-center justify-between">
          <p className="font-hand text-2xl text-[#6D4B38]">
            see you in the garden...
          </p>
          <Bee size={32} flutter={true} />
        </div>
        <MagneticButton to="/book" onClick={onClose} variant="primary" size="lg" fullWidth>
          Reserve a Table
        </MagneticButton>
      </div>
    </div>
  );
};
