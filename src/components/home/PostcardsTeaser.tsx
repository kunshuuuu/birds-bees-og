import React, { useState } from 'react';
import { PostageStamp } from '../materials/PostageStamp';
import { Stamp } from '../materials/Stamp';
import { CurlyArrowDoodle } from '../illustrations/DoodleDecorations';
import { MagneticButton } from '../animations/MagneticButton';

export interface GuestReview {
  id: string;
  author: string;
  text: string;
  stars: number;
  date: string;
  source: 'google' | 'guestbook';
  isPlaceholder: boolean;
}

export const PostcardsTeaser: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);

  const reviews: GuestReview[] = [
    {
      id: '1',
      author: 'Ananya S.',
      text: 'The cold brew and pesto tagliatelle in the greenhouse courtyard was the most peaceful Sunday afternoon I have had all month.',
      stars: 5,
      date: 'Recent Guest',
      source: 'guestbook',
      isPlaceholder: true,
    },
    {
      id: '2',
      author: 'Rohan M.',
      text: 'Indore has plenty of cafes, but none with this much real greenery, soulful music, and truly elevated pure-veg cooking.',
      stars: 5,
      date: 'Recent Guest',
      source: 'guestbook',
      isPlaceholder: true,
    },
    {
      id: '3',
      author: 'Priya K.',
      text: 'The evening festoon lighting and zero-proof spritzes are magic. Come around sunset, grab a table by the monstera leaves.',
      stars: 5,
      date: 'Recent Guest',
      source: 'guestbook',
      isPlaceholder: true,
    },
  ];

  const handleCycle = () => {
    setActiveCard((prev) => (prev + 1) % reviews.length);
  };

  const current = reviews[activeCard];

  return (
    <section className="relative w-full py-24 md:py-36 bg-[#F3FEFE] overflow-hidden border-t border-[#CED9E1]/50">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Headline */}
        <div className="flex flex-col items-start max-w-md">
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#6D4B38]/70 block mb-2">
            Notes from the Tables
          </span>
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-[#2A1E18] tracking-tight mb-4">
            Postcards from the garden.
          </h2>
          <p className="font-body text-lg text-[#6D4B38] mb-6 leading-relaxed">
            Words from people who sat down for a quick coffee and stayed much longer than planned.
          </p>

          <div className="flex items-center gap-3">
            <CurlyArrowDoodle label="Say hi →" color="#AB653E" />
            <MagneticButton
              to="/testimonials"
              variant="outline"
              size="sm"
            >
              Read more notes &rarr;
            </MagneticButton>
          </div>
        </div>

        {/* Right: Stacked Postcards Pinned with Pushpin */}
        <div className="relative w-full max-w-md select-none">
          {/* Black Pushpin */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-5 h-5 rounded-full bg-[#2A1E18] shadow-md border-2 border-white pointer-events-none" />

          {/* Background Card 2 */}
          <div
            className="absolute inset-0 bg-[#F5F0E6] paper-texture rounded-2xl border border-[#CED9E1] shadow-md rotate-3 transition-transform duration-300 pointer-events-none"
            style={{ transform: 'rotate(4deg) translateY(6px)' }}
          />

          {/* Active Top Postcard */}
          <div
            onClick={handleCycle}
            className="relative bg-[#F5F0E6] paper-texture rounded-2xl p-6 sm:p-8 border border-[#CED9E1] shadow-2xl rotate-[-2deg] cursor-pointer hover:rotate-0 transition-transform duration-300 z-10"
            data-cursor="Flip"
            title="Click to cycle next postcard"
          >
            {/* Coral Placeholder Tag Banner if placeholder */}
            {current.isPlaceholder && (
              <span className="absolute top-3 left-4 text-[9px] font-mono font-bold uppercase tracking-wider text-[#E58F78] border border-[#E58F78]/50 px-1.5 py-0.5 rounded-xs bg-[#E58F78]/5">
                SAMPLE GUEST NOTE
              </span>
            )}

            {/* Postage Stamp Top-Right */}
            <div className="absolute top-4 right-4">
              <PostageStamp rotation={2} label="GUEST NOTE" value="INDORE" />
            </div>

            {/* Stars Row */}
            <div className="flex items-center gap-1 mt-6 mb-4 text-[#AB653E]">
              {Array.from({ length: current.stars }).map((_, i) => (
                <span key={i} className="text-lg">★</span>
              ))}
            </div>

            {/* Note text */}
            <p className="font-body text-base sm:text-lg text-[#2A1E18] italic leading-relaxed mb-6">
              &ldquo;{current.text}&rdquo;
            </p>

            {/* Author and Stamp */}
            <div className="flex items-center justify-between border-t border-[#6D4B38]/15 pt-4">
              <div>
                <p className="font-ui font-bold text-sm text-[#2A1E18]">{current.author}</p>
                <p className="font-ui text-xs text-[#6D4B38]/70">{current.date}</p>
              </div>
              <Stamp variant="leaf" size={75} rotation={-6} />
            </div>

            {/* Helper label */}
            <span className="block text-center font-hand text-xs text-[#6D4B38]/70 mt-4">
              tap postcard to shuffle
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
