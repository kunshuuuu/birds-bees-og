import React, { useState, useEffect } from 'react';
import { MapCard } from '../components/contact/MapCard';
import { ContactPostcards } from '../components/contact/ContactPostcards';
import { site } from '../lib/site';
import { OpenTicket } from '../components/ui/OpenTicket';
import { SparklesDoodle } from '../components/illustrations/DoodleDecorations';
import { MagneticButton } from '../components/animations/MagneticButton';

export const Contact: React.FC = () => {
  const [istTime, setIstTime] = useState('');

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
        setIstTime('19:00 IST');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 sm:px-12 bg-[#86B3C3] text-[#2A1E18]">
      {/* Header with Sunburst Doodle */}
      <div className="max-w-6xl mx-auto text-center mb-16 relative">
        <div className="inline-flex items-center gap-2">
          <SparklesDoodle color="#2A1E18" />
          <h1 className="font-display font-medium text-5xl sm:text-7xl text-[#2A1E18] tracking-tight">
            Come find us.
          </h1>
          <SparklesDoodle color="#2A1E18" />
        </div>
        <p className="font-hand text-2xl sm:text-3xl text-[#2A1E18] mt-2">
          under the leaves in Scheme 71, Indore.
        </p>
      </div>

      {/* Main Dual Grid: Illustrated Map Card & Pinned Postcards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start justify-items-center mb-20">
        <MapCard />
        <ContactPostcards />
      </div>

      {/* Info Row: Local Time, Visit Hours & Direct Channels (§15.3) */}
      <div className="max-w-6xl mx-auto bg-[#F5F0E6] paper-texture rounded-2xl p-6 sm:p-10 border border-[#CED9E1] shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1: Local Time & Open Status */}
        <div className="flex flex-col">
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] mb-2">
            Local Time &amp; Status
          </span>
          <div className="flex items-center gap-2 font-mono text-xl text-[#2A1E18] font-bold mb-3">
            <span>{istTime}</span>
            <span className="text-xs font-ui bg-[#E6C08B] px-2 py-0.5 rounded-full text-[#2A1E18]">
              Asia/Kolkata
            </span>
          </div>
          <OpenTicket variant="full" />
        </div>

        {/* Col 2: Visiting Hours */}
        <div className="flex flex-col">
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] mb-2">
            Garden Hours
          </span>
          <div className="space-y-1 font-ui text-sm text-[#2A1E18]">
            <div className="flex justify-between border-b border-[#6D4B38]/15 pb-1">
              <span>Mon – Thu</span>
              <span className="font-semibold">11:30 – 23:00</span>
            </div>
            <div className="flex justify-between border-b border-[#6D4B38]/15 pb-1">
              <span>Fri – Sun</span>
              <span className="font-semibold">11:00 – 23:30</span>
            </div>
          </div>
          <span className="font-hand text-base text-[#2F5D3A] mt-2">
            Walk-ins welcome, reservations held for 30m.
          </span>
        </div>

        {/* Col 3: Direct Connect */}
        <div className="flex flex-col">
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] mb-2">
            Say Hello
          </span>
          <p className="font-body text-xs text-[#6D4B38] mb-3">
            {site.address.line1}, {site.address.line2}, {site.address.city}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <MagneticButton
              href={site.links.maps}
              target="_blank"
              variant="dark"
              size="sm"
            >
              Directions ↗
            </MagneticButton>
            <button
              disabled
              title="Coming soon"
              className="px-4 py-2 rounded-full border-2 border-[#2A1E18]/40 shadow-[1.5px_1.5px_0px_#2A1E18]/30 text-[#6D4B38]/60 font-ui text-xs font-bold uppercase cursor-not-allowed bg-stone-100"
            >
              WhatsApp (Soon)
            </button>
            <button
              disabled
              title="Coming soon"
              className="px-4 py-2 rounded-full border-2 border-[#2A1E18]/40 shadow-[1.5px_1.5px_0px_#2A1E18]/30 text-[#6D4B38]/60 font-ui text-xs font-bold uppercase cursor-not-allowed bg-stone-100"
            >
              Call (Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
