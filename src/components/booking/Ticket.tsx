import React from 'react';
import { BookingInput } from '../../services/types';
import { Bee } from '../illustrations/Bee';
import { Stamp } from '../materials/Stamp';

interface TicketProps {
  data: Partial<BookingInput>;
  confirmed?: boolean;
  bookingId?: string;
}

export const Ticket: React.FC<TicketProps> = ({ data, confirmed = false, bookingId }) => {
  return (
    <div
      className="relative w-full max-w-sm bg-[#F5F0E6] paper-texture rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#CED9E1] select-none text-left"
      style={{
        boxShadow: '0 20px 40px -10px rgba(42, 30, 24, 0.25)',
      }}
    >
      {/* Top punched hole */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#F3FEFE] border-2 border-[#CED9E1] shadow-inner" />

      {/* Header */}
      <div className="flex flex-col items-center text-center border-b-2 border-dashed border-[#6D4B38]/20 pb-4 mb-4">
        <img
          src="/logos/logo-text.png"
          alt="Birds & Bees Cafeto"
          className="h-7 w-auto object-contain mb-1.5"
        />
        <span className="font-ui text-[9px] font-bold tracking-[0.25em] uppercase text-[#6D4B38]">
          TABLE RESERVATION TICKET
        </span>
      </div>

      {/* Live Fields Summary */}
      <div className="flex flex-col gap-3 font-ui text-xs text-[#2A1E18]">
        <div className="flex justify-between items-baseline border-b border-[#6D4B38]/10 pb-1">
          <span className="text-[#6D4B38]/70 uppercase font-semibold">Date:</span>
          <span className="font-bold text-sm text-[#AB653E]">
            {data.date || 'Selecting date...'}
          </span>
        </div>

        <div className="flex justify-between items-baseline border-b border-[#6D4B38]/10 pb-1">
          <span className="text-[#6D4B38]/70 uppercase font-semibold">Time:</span>
          <span className="font-bold text-sm text-[#2A1E18]">
            {data.time ? `${data.time} IST` : 'Choosing slot...'}
          </span>
        </div>

        <div className="flex justify-between items-baseline border-b border-[#6D4B38]/10 pb-1">
          <span className="text-[#6D4B38]/70 uppercase font-semibold">Party Size:</span>
          <span className="font-bold text-sm text-[#2A1E18]">
            {data.guests ? `${data.guests} Guests` : '—'}
          </span>
        </div>

        <div className="flex justify-between items-baseline border-b border-[#6D4B38]/10 pb-1">
          <span className="text-[#6D4B38]/70 uppercase font-semibold">Seating:</span>
          <span className="font-bold text-sm text-[#2F5D3A]">
            {data.seating ? `${data.seating} Canopy` : '—'}
          </span>
        </div>

        <div className="flex justify-between items-baseline border-b border-[#6D4B38]/10 pb-1">
          <span className="text-[#6D4B38]/70 uppercase font-semibold">Occasion:</span>
          <span className="font-bold text-sm text-[#2A1E18]">
            {data.occasion || 'Just because'}
          </span>
        </div>

        {data.name && (
          <div className="flex justify-between items-baseline border-b border-[#6D4B38]/10 pb-1">
            <span className="text-[#6D4B38]/70 uppercase font-semibold">Guest:</span>
            <span className="font-bold text-sm text-[#2A1E18]">{data.name}</span>
          </div>
        )}
      </div>

      {/* Perforated Separator Line */}
      <div className="relative my-6 border-b-2 border-dashed border-[#6D4B38]/30">
        <div className="absolute -left-9 -top-3 w-6 h-6 rounded-full bg-[#F3FEFE] border-r-2 border-[#CED9E1]" />
        <div className="absolute -right-9 -top-3 w-6 h-6 rounded-full bg-[#F3FEFE] border-l-2 border-[#CED9E1]" />
      </div>

      {/* Booking Status / ID */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono text-[#6D4B38]/70 block">
            {confirmed ? 'TICKET ID' : 'STATUS'}
          </span>
          <span className="font-mono font-bold text-sm text-[#AB653E]">
            {confirmed ? bookingId : 'IN PROGRESS'}
          </span>
        </div>

        {confirmed ? (
          <Stamp variant="leaf" text="BOOKED" size={70} rotation={-10} />
        ) : (
          <Bee size={24} flutter={true} />
        )}
      </div>
    </div>
  );
};
