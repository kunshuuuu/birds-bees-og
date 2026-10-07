import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../lib/site';
import { Bee } from '../illustrations/Bee';
import { MagneticButton } from '../animations/MagneticButton';

export const Footer: React.FC = () => {
  const [timeMode, setTimeMode] = useState<'day' | 'evening' | 'night'>('evening');
  const [istTime, setIstTime] = useState('');
  const [email, setEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Live IST Clock (Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-IN', {
          timeZone: site.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setIstTime(timeStr);
      } catch {
        setIstTime('18:45 IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine initial time of day from IST
  useEffect(() => {
    try {
      const now = new Date();
      const hourStr = new Intl.DateTimeFormat('en-US', {
        timeZone: site.timezone,
        hour: 'numeric',
        hour12: false,
      }).format(now);
      const hour = parseInt(hourStr, 10);
      if (hour >= 6 && hour < 16) {
        setTimeMode('day');
      } else if (hour >= 16 && hour < 19) {
        setTimeMode('evening');
      } else {
        setTimeMode('night');
      }
    } catch {
      setTimeMode('evening');
    }
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setNewsletterSubscribed(true);
    // In demo mode (§3)
    localStorage.setItem('bb_newsletter', email);
  };

  const wordmarkLetters = 'BIRDS & BEES'.split('');

  // Sky themes for landscape scene
  const skyThemes = {
    day: 'from-[#86B3C3] via-[#CED9E1] to-[#F5F0E6]',
    evening: 'from-[#6D4B38] via-[#AB653E]/80 to-[#E6C08B]',
    night: 'from-[#1A120E] via-[#2A1E18] to-[#3B2C24]',
  };

  const sunMoonColors = {
    day: '#F3FEFE',
    evening: '#E6C08B',
    night: '#CED9E1',
  };

  return (
    <footer className="relative w-full bg-[#2A1E18] text-[#F3FEFE] overflow-hidden select-none">
      {/* 18.1 Day / Evening / Night Scrubber Bar (Video A) */}
      <div className="w-full bg-[#1A120E] border-b border-white/10 px-6 sm:px-12 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-ui">
        {/* Scrubber controls */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#E6C08B] uppercase tracking-wider text-[11px]">
            Atmosphere:
          </span>
          <div className="flex items-center gap-1.5 p-1 rounded-full">
            {(['day', 'evening', 'night'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTimeMode(mode)}
                className={`px-3 py-1 rounded-full uppercase font-bold text-[10px] tracking-widest border-2 border-[#2A1E18] transition-all duration-150 ${
                  timeMode === mode
                    ? 'bg-[#E6C08B] text-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18]'
                    : 'bg-white/10 text-[#CED9E1] hover:text-white hover:bg-white/20 shadow-[1.5px_1.5px_0px_#2A1E18]'
                } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Live IST Local Time Tag (Video C) */}
        <div className="flex items-center gap-3 font-mono text-[#CED9E1]/80">
          <span className="inline-block w-2 h-2 rounded-full bg-[#8DB580] animate-pulse" />
          <span>India Local Time ({site.timezone}):</span>
          <span className="font-bold text-[#E6C08B] tabular-nums">{istTime}</span>
        </div>
      </div>

      {/* 18.2 Layered Sunset / Twilight Landscape Scene (Video C) */}
      <div className={`relative w-full h-[260px] sm:h-[340px] md:h-[400px] bg-gradient-to-b ${skyThemes[timeMode]} overflow-hidden transition-all duration-700`}>
        {/* Stars (Night only) */}
        {timeMode === 'night' && (
          <div className="absolute inset-0 opacity-60">
            <span className="absolute top-8 left-16 text-white text-xs animate-ping">✦</span>
            <span className="absolute top-14 left-1/3 text-white text-xs">✦</span>
            <span className="absolute top-10 right-28 text-white text-xs animate-pulse">✦</span>
            <span className="absolute top-24 right-1/4 text-white text-[10px]">✦</span>
          </div>
        )}

        {/* Sun or Moon Disc in mountain notch */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full shadow-2xl transition-all duration-700"
          style={{
            bottom: timeMode === 'day' ? '120px' : timeMode === 'evening' ? '60px' : '90px',
            backgroundColor: sunMoonColors[timeMode],
            boxShadow: `0 0 60px ${sunMoonColors[timeMode]}`,
          }}
        />

        {/* Mountain Silhouette Layer 1 (Back, Purple-Brown) */}
        <svg viewBox="0 0 1440 260" className="absolute bottom-0 w-full h-auto text-[#4A3226]/80 fill-current preserve-3d" preserveAspectRatio="none">
          <path d="M0 160 Q 240 80, 480 140 T 960 90 T 1440 150 L 1440 260 L 0 260 Z" />
        </svg>

        {/* Mountain Silhouette Layer 2 (Mid, Darker) */}
        <svg viewBox="0 0 1440 220" className="absolute bottom-0 w-full h-auto text-[#352319] fill-current" preserveAspectRatio="none">
          <path d="M0 180 Q 360 90, 720 160 T 1440 130 L 1440 220 L 0 220 Z" />
        </svg>

        {/* Tree Silhouettes & Little Houses with Yellow Glowing Windows (Video C) */}
        <div className="absolute bottom-4 left-0 right-0 px-8 flex items-end justify-between pointer-events-none opacity-90">
          {/* Trees cluster left */}
          <div className="flex items-end gap-2 text-[#2A1E18]">
            <span className="text-3xl">🌲</span>
            <span className="text-4xl">🌳</span>
            <span className="text-2xl">🌲</span>
          </div>

          {/* Little houses with glowing yellow windows */}
          <div className="flex items-end gap-6">
            <div className="relative text-3xl">
              🏠
              <span className={`absolute top-3 left-2.5 w-1.5 h-1.5 rounded-xs transition-opacity duration-500 ${timeMode === 'day' ? 'bg-amber-100 opacity-30' : 'bg-yellow-300 opacity-100 shadow-[0_0_8px_yellow]'}`} />
            </div>
            <div className="relative text-2xl">
              🏡
              <span className={`absolute top-2.5 left-2 w-1.5 h-1.5 rounded-xs transition-opacity duration-500 ${timeMode === 'day' ? 'bg-amber-100 opacity-30' : 'bg-yellow-300 opacity-100 shadow-[0_0_8px_yellow]'}`} />
            </div>
          </div>

          {/* Trees cluster right */}
          <div className="flex items-end gap-2 text-[#2A1E18]">
            <span className="text-2xl">🌲</span>
            <span className="text-4xl">🌳</span>
            <span className="text-3xl">🌲</span>
          </div>
        </div>

        {/* Floating Flock of Birds */}
        <div className="absolute top-12 left-1/4 flex gap-3 text-white/70 text-xs animate-[pulse_3s_ease-in-out_infinite]">
          <span>~</span>
          <span className="-translate-y-2">~</span>
          <span>~</span>
        </div>

        {/* Looping tiny bee drifting across mountain line */}
        <div className="absolute bottom-16 right-1/3">
          <Bee size={20} flutter={true} />
        </div>
      </div>

      {/* 18.3 Giant Reactive Wordmark "BIRDS & BEES" (Video B + C) */}
      <div className="w-full bg-[#2A1E18] pt-12 pb-8 px-4 text-center border-b border-white/10">
        <span className="font-script text-2xl sm:text-3xl text-[#E6C08B] block mb-2">
          See you in the garden.
        </span>

        <h2 className="font-display font-bold text-[clamp(2.8rem,9vw,9rem)] tracking-tight text-[#F3FEFE] leading-none flex justify-center flex-wrap">
          {wordmarkLetters.map((char, index) => (
            <span
              key={index}
              className="inline-block transition-transform duration-300 hover:-translate-y-3 hover:scale-110 hover:text-[#E6C08B] cursor-default mx-[1px]"
              style={{
                transform: `rotate(${Math.sin(index) * 2}deg)`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
      </div>

      {/* 18.4 Dark Footer Band: Navigation, Newsletter & Business Details */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Col 1: Brand & Address */}
        <div className="flex flex-col">
          <Link to="/" className="inline-block mb-4 group focus:outline-hidden">
            <img
              src="/logos/logo-full.png"
              alt="Birds & Bees Cafeto logo"
              className="h-16 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform"
            />
          </Link>
          <p className="font-ui text-xs font-bold uppercase tracking-wider text-[#CED9E1]/80 mb-2">
            100% Pure Vegetarian Garden Cafe
          </p>
          <p className="font-body text-sm text-[#CED9E1] leading-relaxed mb-4">
            {site.address.line1}, {site.address.line2}, {site.address.area}, {site.address.city}, MP {site.address.postalCode}
          </p>
          <a
            href={site.links.maps}
            target="_blank"
            rel="noreferrer"
            className="font-ui text-xs text-[#E6C08B] hover:underline"
          >
            Open in Google Maps ↗
          </a>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="flex flex-col">
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#E6C08B] mb-4">
            Garden Paths
          </span>
          <nav className="flex flex-col gap-2.5 font-ui text-sm text-[#CED9E1]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/menu" className="hover:text-white transition-colors">Menu Spreads</Link>
            <Link to="/gallery" className="hover:text-white transition-colors">Visual Gallery</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Our Garden</Link>
            <Link to="/events" className="hover:text-white transition-colors">Events &amp; Music</Link>
            <Link to="/testimonials" className="hover:text-white transition-colors">Postcard Notes</Link>
            <Link to="/book" className="hover:text-white transition-colors">Reserve a Table</Link>
            <Link to="/hire" className="hover:text-white transition-colors">Work With Us</Link>
          </nav>
        </div>

        {/* Col 3: Hours & Contact */}
        <div className="flex flex-col">
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#E6C08B] mb-4">
            Opening Hours
          </span>
          <div className="flex flex-col gap-2 font-ui text-sm text-[#CED9E1] mb-6">
            <div className="flex justify-between border-b border-white/10 pb-1">
              <span>Mon – Thu</span>
              <span className="font-semibold text-white">11:30 – 23:00</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-1">
              <span>Fri – Sun</span>
              <span className="font-semibold text-white">11:00 – 23:30</span>
            </div>
            <span className="font-hand text-base text-[#8DB580]">
              Kitchen closes 30 mins before closing
            </span>
          </div>
        </div>

        {/* Col 4: Newsletter Subscriber */}
        <div className="flex flex-col">
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#E6C08B] mb-4">
            Garden Notes
          </span>
          <p className="font-body text-sm text-[#CED9E1] mb-4 leading-relaxed">
            Receive seasonal menu updates and acoustic music evening schedules.
          </p>

          {newsletterSubscribed ? (
            <div className="p-3 bg-[#2F5D3A]/30 border border-[#2F5D3A] rounded-xl text-xs text-[#8DB580]">
              ✓ You are on the garden dispatch. We will write softly.
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your.email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-hidden focus:border-[#E6C08B]"
              />
              <MagneticButton
                type="submit"
                variant="primary"
                size="md"
                fullWidth
              >
                Subscribe
              </MagneticButton>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Sub-Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-ui text-[#CED9E1]/70">
        <p>
          &copy; {new Date().getFullYear()} Birds &amp; Bees Cafeto. All rights reserved. 100% Pure Vegetarian Garden Sanctuary.
        </p>
        <p className="font-hand text-base text-[#E6C08B]">
          Signed by {site.credit}
        </p>
      </div>
    </footer>
  );
};
