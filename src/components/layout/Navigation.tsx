import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MagneticButton } from '../animations/MagneticButton';
import { MobileMenu } from './MobileMenu';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroActive, setIsHeroActive] = useState(true);

  useEffect(() => {
    const isHomePage = location.pathname === '/' || location.pathname === '';
    
    // Internal pages never have hero -> always translucent white blurred
    if (!isHomePage) {
      setIsHeroActive(false);
    } else {
      // Home page: active if near top of page
      setIsHeroActive(window.scrollY < 50);
    }

    const handleHeroToggle = (e: Event) => {
      const curIsHome = window.location.hash === '#/' || window.location.hash === '' || window.location.pathname === '/';
      if (!curIsHome) {
        setIsHeroActive(false);
        return;
      }
      const customEvent = e as CustomEvent;
      setIsHeroActive(Boolean(customEvent.detail?.isActive));
    };

    window.addEventListener('hero-toggle', handleHeroToggle);
    return () => window.removeEventListener('hero-toggle', handleHeroToggle);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 200 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Events', path: '/events' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          !isHeroActive
            ? 'h-16 bg-[#F3FEFE]/92 backdrop-blur-md border-b border-[#CED9E1]/60 shadow-xs'
            : 'h-20 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Zone 1: Real Brand Logo & Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-hidden"
            data-cursor="Home"
          >
            <img
              src="/logos/logo-icon.png"
              alt="Birds & Bees Cafeto logo"
              className={`transition-all duration-300 object-contain ${
                !isHeroActive ? 'h-9 w-auto' : 'h-11 w-auto brightness-0 invert drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]'
              }`}
            />
            <div className="flex flex-col">
              <span className={`font-display font-medium text-xl md:text-2xl tracking-tight transition-colors leading-tight ${
                isHeroActive ? 'text-[#F3FEFE] group-hover:text-[#E6C08B]' : 'text-[#2A1E18] group-hover:text-[#AB653E]'
              }`}>
                Birds &amp; Bees
              </span>
              <span className={`text-[9px] font-ui uppercase tracking-[0.25em] -mt-0.5 transition-colors font-bold ${
                isHeroActive ? 'text-[#E6C08B]' : 'text-[#AB653E]'
              }`}>
                Cafeto
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-ui text-[13px] tracking-wider uppercase font-medium transition-colors py-1 ${
                    active 
                      ? (isHeroActive ? 'text-[#E6C08B]' : 'text-[#AB653E]') 
                      : (isHeroActive ? 'text-[#F3FEFE] hover:text-[#E6C08B]' : 'text-[#6D4B38] hover:text-[#2A1E18]')
                  }`}
                  data-cursor="Open"
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isHeroActive ? 'bg-[#E6C08B]' : 'bg-[#AB653E]'}`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:inline-block">
              <MagneticButton to="/book" variant="primary" size="sm">
                Book a Table
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-xl border-2 shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none transition-all duration-150 ${
                isHeroActive 
                  ? 'text-[#2A1E18] bg-[#E6C08B] border-[#2A1E18]' 
                  : 'text-[#2A1E18] bg-[#F5F0E6] border-[#2A1E18]'
              }`}
              aria-label="Open mobile menu"
              data-cursor="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="7" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Modal Poster */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
};
