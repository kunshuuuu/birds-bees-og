import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { assets } from '../../data/assets';
import { MagneticButton } from '../animations/MagneticButton';
import { site } from '../../lib/site';

export const ReservationBand: React.FC = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleCheckTimes = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/book?date=${date}&guests=${guests}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-28 md:py-36 bg-[#6D4B38] text-[#F3FEFE] overflow-hidden">
      {/* Background with dark coffee bean photo overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-luminosity pointer-events-none">
        <img
          src={assets.hero.courtyard}
          alt="Atmospheric cafe ambiance"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Edge Round Up-Arrow Button (Video C) */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-[#E6C08B] text-[#2A1E18] hover:bg-[#AB653E] hover:text-white flex items-center justify-center border-2 border-[#2A1E18] shadow-[3.5px_3.5px_0px_#2A1E18] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0px_#2A1E18] active:translate-x-[3.5px] active:translate-y-[3.5px] active:shadow-none transition-all duration-150"
        aria-label="Scroll to top of the garden page"
        data-cursor="Top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading and Story */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#E6C08B] block mb-3">
            Pure Vegetarian · Garden Hospitality
          </span>
          <h2 className="font-display font-medium text-4xl sm:text-6xl text-[#F3FEFE] tracking-tight leading-[1.08] mb-6">
            Save yourself <br />
            <span className="italic font-script text-[#E6C08B] font-normal text-5xl sm:text-7xl">
              a table.
            </span>
          </h2>

          <p className="font-body text-lg text-[#CED9E1] leading-relaxed mb-8 max-w-lg">
            Garden tables go first on golden evenings. Tell us when, and we will hold your spot amidst the greenery and string lights.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <MagneticButton to="/book" variant="primary" size="lg">
              Book a Table
            </MagneticButton>
            <Link
              to="/book"
              className="font-ui text-xs font-bold uppercase tracking-wider text-[#E6C08B] hover:underline"
            >
              Learn about group bookings &rarr;
            </Link>
          </div>
        </div>

        {/* Right Column: Quick Reservation Module (Video C) */}
        <div className="lg:col-span-6 bg-[#2A1E18]/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
            <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#E6C08B]">
              Quick Reservation
            </span>
            <span className="font-mono text-xs text-[#CED9E1]/70">
              Takes ~30 seconds
            </span>
          </div>

          <form onSubmit={handleCheckTimes} className="flex flex-col gap-6">
            {/* Date Selection */}
            <div>
              <label htmlFor="res-date" className="block font-ui text-xs uppercase tracking-wider text-[#CED9E1] mb-2 font-semibold">
                Date
              </label>
              <input
                id="res-date"
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-[#F3FEFE] font-ui focus:outline-hidden focus:border-[#E6C08B]"
              />
            </div>

            {/* Guests Stepper */}
            <div>
              <label className="block font-ui text-xs uppercase tracking-wider text-[#CED9E1] mb-2 font-semibold">
                Party Size (Guests)
              </label>
              <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-9 h-9 rounded-lg bg-[#E6C08B] text-[#2A1E18] font-bold flex items-center justify-center border-2 border-[#2A1E18] shadow-[2px_2px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  aria-label="Decrease party size"
                >
                  &minus;
                </button>
                <span className="font-ui font-bold text-xl tabular-nums text-[#E6C08B]">
                  {guests} {guests === 1 ? 'Guest' : 'Guests'}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(site.booking.maxPartySize, g + 1))}
                  className="w-9 h-9 rounded-lg bg-[#E6C08B] text-[#2A1E18] font-bold flex items-center justify-center border-2 border-[#2A1E18] shadow-[2px_2px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  aria-label="Increase party size"
                >
                  &#43;
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <MagneticButton
                type="submit"
                variant="primary"
                size="md"
                fullWidth
              >
                Check Times &rarr;
              </MagneticButton>
              <MagneticButton
                href={site.links.maps}
                target="_blank"
                variant="outline"
                size="md"
              >
                Directions ↗
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
