import React from 'react';
import { site } from '../../lib/site';
import { OpenTicket } from '../ui/OpenTicket';
import { MagneticButton } from '../animations/MagneticButton';

export const FindUsStrip: React.FC = () => {
  return (
    <section className="relative w-full py-12 px-6 sm:px-12 bg-[#F5F0E6] paper-texture border-b border-[#CED9E1]/70">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Address Block */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-ui text-[11px] font-bold uppercase tracking-[0.2em] text-[#AB653E] mb-1">
            Visit the Garden Cafe
          </span>
          <p className="font-display font-medium text-xl text-[#2A1E18]">
            {site.address.line1}, {site.address.area}
          </p>
          <p className="font-body text-sm text-[#6D4B38]">
            {site.address.line2}, {site.address.city}
          </p>
        </div>

        {/* Centre: Live Open/Closed Ticket */}
        <div className="flex items-center gap-4">
          <OpenTicket variant="full" />
        </div>

        {/* Right: Directions & Contact Links */}
        <div className="flex items-center gap-4">
          <MagneticButton
            href={site.links.maps}
            target="_blank"
            variant="dark"
            size="sm"
          >
            Get Directions ↗
          </MagneticButton>
          <MagneticButton
            to="/contact"
            variant="outline"
            size="sm"
          >
            Contact Info
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
