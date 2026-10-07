import React from 'react';
import { BookingForm } from '../components/booking/BookingForm';
import { Bee } from '../components/illustrations/Bee';

export const Book: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-32 px-6 sm:px-12 bg-[#F3FEFE]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] block mb-2">
          Pure Vegetarian Garden Cafe · Scheme 71, Indore
        </span>
        <h1 className="font-display font-medium text-5xl sm:text-7xl text-[#2A1E18] tracking-tight mb-3">
          Save yourself a table.
        </h1>
        <p className="font-hand text-2xl sm:text-3xl text-[#6D4B38]">
          garden tables go first on golden evenings.
        </p>
      </div>

      {/* 5-Step Booking Flow */}
      <BookingForm />
    </div>
  );
};
