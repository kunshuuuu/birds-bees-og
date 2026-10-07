import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { bookingRepo } from '../../services/bookingRepo.local';
import { BookingInput, SlotAvailability, BookingResult } from '../../services/types';
import { bookingSchema } from '../../lib/validation';
import { site } from '../../lib/site';
import { downloadIcs } from '../../lib/ics';
import { Ticket } from './Ticket';
import { Stamp } from '../materials/Stamp';
import { MagneticButton } from '../animations/MagneticButton';
import { Bee } from '../illustrations/Bee';

const DRAFT_KEY = 'bb_booking_draft';

export const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Initialize draft from localStorage or query params
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingInput>(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    const initialDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const initialGuests = parseInt(searchParams.get('guests') || '2', 10);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, date: initialDate, guests: initialGuests };
      } catch {
        // fallback
      }
    }
    return {
      date: initialDate,
      time: '19:00',
      guests: initialGuests,
      seating: 'Garden',
      occasion: 'Just because',
      name: '',
      phone: '',
      email: '',
      notes: '',
      honeypot: '',
    };
  });

  const [availability, setAvailability] = useState<SlotAvailability[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-save draft to localStorage (§14)
  useEffect(() => {
    if (!result?.success) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    }
  }, [formData, result]);

  // Fetch slot availability whenever date changes
  useEffect(() => {
    let active = true;
    const fetchSlots = async () => {
      setLoadingSlots(true);
      const slots = await bookingRepo.getAvailability(formData.date);
      if (active) {
        setAvailability(slots);
        setLoadingSlots(false);
      }
    };
    fetchSlots();
    return () => {
      active = false;
    };
  }, [formData.date]);

  const handleNext = () => {
    setErrorMessage(null);
    if (step === 1 && !formData.date) {
      setErrorMessage('Please select a reservation date.');
      return;
    }
    if (step === 2 && !formData.time) {
      setErrorMessage('Please select an available time slot.');
      return;
    }
    setStep((prev) => Math.min(5, prev + 1));
  };

  const handleBack = () => {
    setErrorMessage(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate with Zod (§14)
    const validation = bookingSchema.safeParse(formData);
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);
    const res = await bookingRepo.create(formData);
    setIsSubmitting(false);

    if (res.success) {
      setResult(res);
      setStep(5);
      localStorage.removeItem(DRAFT_KEY);
    } else {
      setErrorMessage(res.error || 'Failed to complete reservation. Please try again.');
    }
  };

  const occasions = [
    'Just because',
    'Birthday Celebration',
    'Date Evening',
    'Catch-up with Friends',
    'Work Meeting',
    'Family Dinner',
  ];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Sticky Live Receipt Ticket (§14) */}
      <div className="lg:col-span-5 lg:sticky lg:top-28 flex justify-center">
        <Ticket
          data={formData}
          confirmed={result?.success}
          bookingId={result?.bookingId}
        />
      </div>

      {/* Right Column: 5-Step Form Process */}
      <div className="lg:col-span-7 bg-[#F5F0E6] paper-texture rounded-2xl p-6 sm:p-10 border border-[#CED9E1] shadow-xl">
        {/* Step Progress Tracker */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#6D4B38]/20">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center font-ui text-xs font-bold ${
                  step === s
                    ? 'bg-[#AB653E] text-white'
                    : step > s
                    ? 'bg-[#2F5D3A] text-white'
                    : 'bg-[#CED9E1] text-[#6D4B38]'
                }`}
              >
                {step > s ? '✓' : s}
              </span>
              <span className="hidden sm:inline font-ui text-[11px] font-semibold text-[#6D4B38]">
                {s === 1 && 'Date'}
                {s === 2 && 'Time'}
                {s === 3 && 'Party'}
                {s === 4 && 'Details'}
                {s === 5 && 'Done'}
              </span>
            </div>
          ))}
        </div>

        {/* Friendly Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-3 bg-red-100 border border-red-300 text-red-800 rounded-xl text-xs font-ui font-medium flex items-center justify-between">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="font-bold ml-2">✕</button>
          </div>
        )}

        {/* ── STEP 1: WHEN? (Date) ── */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#AB653E]">Step 1 of 5</span>
              <h2 className="font-display text-3xl text-[#2A1E18]">When are you visiting?</h2>
              <p className="font-body text-sm text-[#6D4B38]">Select your preferred garden evening or afternoon.</p>
            </div>

            <div className="mt-4">
              <label htmlFor="booking-date" className="block font-ui text-xs font-bold uppercase text-[#2A1E18] mb-2">
                Reservation Date
              </label>
              <input
                id="booking-date"
                type="date"
                value={formData.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#CED9E1] text-[#2A1E18] font-ui text-sm focus:border-[#AB653E] focus:outline-hidden"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <MagneticButton
                type="button"
                onClick={handleNext}
                variant="primary"
                size="md"
              >
                Choose Time &rarr;
              </MagneticButton>
            </div>
          </div>
        )}

        {/* ── STEP 2: WHAT TIME? (Slots) ── */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#AB653E]">Step 2 of 5</span>
              <h2 className="font-display text-3xl text-[#2A1E18]">What time works best?</h2>
              <p className="font-body text-sm text-[#6D4B38]">Slots are held for 30 minutes from arrival.</p>
            </div>

            {loadingSlots ? (
              <p className="font-mono text-xs text-[#6D4B38]">Checking garden table availability...</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {availability.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setFormData({ ...formData, time: slot.time })}
                    className={`py-3 px-2 rounded-xl text-center border-2 border-[#2A1E18] font-ui text-xs font-bold transition-all duration-150 ${
                      formData.time === slot.time
                        ? 'bg-[#2A1E18] text-[#F3FEFE] shadow-[3px_3px_0px_#2A1E18] translate-x-[1px] translate-y-[1px]'
                        : slot.available
                        ? 'bg-white text-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none'
                        : 'bg-black/5 text-black/30 border-black/20 cursor-not-allowed'
                    }`}
                  >
                    <span>{slot.time}</span>
                    <span className="block text-[9px] font-mono mt-0.5 opacity-75">
                      {slot.available ? `${slot.remainingCapacity} seats` : 'Full'}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <MagneticButton
                type="button"
                onClick={handleBack}
                variant="outline"
                size="sm"
              >
                &larr; Back
              </MagneticButton>
              <MagneticButton
                type="button"
                onClick={handleNext}
                variant="primary"
                size="md"
              >
                Select Party &rarr;
              </MagneticButton>
            </div>
          </div>
        )}

        {/* ── STEP 3: HOW MANY? (Party Size & Seating) ── */}
        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#AB653E]">Step 3 of 5</span>
              <h2 className="font-display text-3xl text-[#2A1E18]">How many guests?</h2>
              <p className="font-body text-sm text-[#6D4B38]">We accommodate parties up to 12 guests online.</p>
            </div>

            {/* Stepper */}
            <div>
              <label className="block font-ui text-xs font-bold uppercase text-[#2A1E18] mb-2">Number of Guests</label>
              <div className="flex items-center justify-between bg-white border-2 border-[#2A1E18] rounded-xl px-4 py-2.5 max-w-xs shadow-[2.5px_2.5px_0px_#2A1E18]">
                <button
                  type="button"
                  onClick={() => setFormData((d) => ({ ...d, guests: Math.max(1, d.guests - 1) }))}
                  className="w-8 h-8 rounded-lg bg-[#E6C08B] text-[#2A1E18] font-bold border-2 border-[#2A1E18] shadow-[2px_2px_0px_#2A1E18] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center"
                  aria-label="Decrease guests"
                >
                  &minus;
                </button>
                <span className="font-ui font-bold text-lg text-[#AB653E]">
                  {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData((d) => ({ ...d, guests: Math.min(site.booking.maxPartySize, d.guests + 1) }))}
                  className="w-8 h-8 rounded-lg bg-[#E6C08B] text-[#2A1E18] font-bold border-2 border-[#2A1E18] shadow-[2px_2px_0px_#2A1E18] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center"
                  aria-label="Increase guests"
                >
                  &#43;
                </button>
              </div>
            </div>

            {/* Seating Choice */}
            <div>
              <label className="block font-ui text-xs font-bold uppercase text-[#2A1E18] mb-2">Seating Area</label>
              <div className="grid grid-cols-2 gap-4">
                {(['Garden', 'Indoor'] as const).map((seat) => (
                  <button
                    key={seat}
                    type="button"
                    onClick={() => setFormData({ ...formData, seating: seat })}
                    className={`p-4 rounded-xl text-left border-2 border-[#2A1E18] font-ui transition-all duration-150 ${
                      formData.seating === seat
                        ? 'bg-[#2F5D3A] text-white shadow-[3.5px_3.5px_0px_#2A1E18]'
                        : 'bg-white text-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_#2A1E18] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none'
                    }`}
                  >
                    <span className="font-bold text-sm block">{seat} Canopy</span>
                    <span className="text-xs opacity-80 block mt-1">
                      {seat === 'Garden' ? 'Monstera shade & festoon lights' : 'Cool bistro atmosphere'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label htmlFor="booking-occasion" className="block font-ui text-xs font-bold uppercase text-[#2A1E18] mb-2">Occasion</label>
              <select
                id="booking-occasion"
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#CED9E1] font-ui text-sm text-[#2A1E18] focus:border-[#AB653E] focus:outline-hidden"
              >
                {occasions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex justify-between">
              <MagneticButton
                type="button"
                onClick={handleBack}
                variant="outline"
                size="sm"
              >
                &larr; Back
              </MagneticButton>
              <MagneticButton
                type="button"
                onClick={handleNext}
                variant="primary"
                size="md"
              >
                Guest Info &rarr;
              </MagneticButton>
            </div>
          </div>
        )}

        {/* ── STEP 4: WHO'S COMING? (Contact Details) ── */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#AB653E]">Step 4 of 5</span>
              <h2 className="font-display text-3xl text-[#2A1E18]">Who is coming?</h2>
              <p className="font-body text-sm text-[#6D4B38]">We use this to identify your party upon arrival.</p>
            </div>

            {/* Honeypot field (hidden) */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label htmlFor="guest-name" className="block font-ui text-xs font-bold uppercase text-[#2A1E18] mb-1">Full Name</label>
              <input
                id="guest-name"
                type="text"
                required
                placeholder="Krishna Choudhari"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CED9E1] font-ui text-sm text-[#2A1E18] focus:border-[#AB653E] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="guest-phone" className="block font-ui text-xs font-bold uppercase text-[#2A1E18] mb-1">Phone Number (10 digits)</label>
                <input
                  id="guest-phone"
                  type="tel"
                  required
                  placeholder="+91 98260 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CED9E1] font-ui text-sm text-[#2A1E18] focus:border-[#AB653E] focus:outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="guest-email" className="block font-ui text-xs font-bold uppercase text-[#2A1E18] mb-1">Email Address</label>
                <input
                  id="guest-email"
                  type="email"
                  required
                  placeholder="krishna@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CED9E1] font-ui text-sm text-[#2A1E18] focus:border-[#AB653E] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label htmlFor="guest-notes" className="block font-ui text-xs font-bold uppercase text-[#2A1E18] mb-1">Special Notes / Dietary Wishes</label>
              <textarea
                id="guest-notes"
                rows={3}
                placeholder="Quiet corner table, birthday setup, allergic to nuts..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CED9E1] font-ui text-sm text-[#2A1E18] focus:border-[#AB653E] focus:outline-hidden"
              />
            </div>

            <div className="mt-4 flex justify-between items-center">
              <MagneticButton
                type="button"
                onClick={handleBack}
                variant="outline"
                size="sm"
              >
                &larr; Back
              </MagneticButton>

              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="lg"
              >
                {isSubmitting ? 'Submitting Reservation...' : 'Confirm Reservation ✓'}
              </MagneticButton>
            </div>
          </form>
        )}

        {/* ── STEP 5: YOU'RE IN! (Confirmation) ── */}
        {step === 5 && result?.success && (
          <div className="flex flex-col items-center text-center gap-6 py-6 animate-in fade-in">
            <Stamp variant="leaf" text="BOOKED" subtext="BIRDS & BEES CAFETO" size={120} rotation={-8} />

            <h2 className="font-display font-medium text-4xl text-[#2A1E18]">
              You&apos;re in! We&apos;ll save you a spot.
            </h2>

            <p className="font-body text-base text-[#6D4B38] max-w-md">
              {site.BACKEND_MODE === 'demo'
                ? 'Booking saved in demo mode — no email was sent.'
                : 'A confirmation note has been dispatched to your email.'}
            </p>

            <div className="p-4 bg-white/70 rounded-xl border border-[#CED9E1] font-mono text-xs text-[#2A1E18] w-full max-w-sm">
              <div className="flex justify-between pb-1 border-b border-[#6D4B38]/10">
                <span>RESERVATION ID:</span>
                <span className="font-bold text-[#AB653E]">{result.bookingId}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>DATE &amp; TIME:</span>
                <span>{formData.date} at {formData.time} IST</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <MagneticButton
                type="button"
                onClick={() =>
                  downloadIcs({
                    title: `Birds & Bees Cafeto Reservation (${formData.seating})`,
                    description: `Table for ${formData.guests} guests. Occasion: ${formData.occasion}. Reservation ID: ${result.bookingId}`,
                    location: `${site.address.line1}, ${site.address.city}, Indore`,
                    startDate: formData.date,
                    startTime: formData.time,
                  })
                }
                variant="dark"
                size="md"
              >
                📅 Add to Calendar (.ics)
              </MagneticButton>

              <MagneticButton
                type="button"
                onClick={() => {
                  setResult(null);
                  setStep(1);
                }}
                variant="outline"
                size="md"
              >
                Make Another Booking
              </MagneticButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
