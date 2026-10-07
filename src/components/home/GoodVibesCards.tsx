import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';
import { TornEdge } from '../materials/TornEdge';
import { TickMarksDoodle } from '../illustrations/DoodleDecorations';
import { MagneticButton } from '../animations/MagneticButton';
import { Bee } from '../illustrations/Bee';

interface VibeCard {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
}

export const GoodVibesCards: React.FC = () => {
  const [count, setCount] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [modalCard, setModalCard] = useState<VibeCard | null>(null);

  const cards: VibeCard[] = [
    {
      id: 'seating',
      title: 'Garden seating',
      shortDesc: 'Green all around, shade where you need it.',
      fullDesc: 'Bistro wrought-iron tables nestled under leafy canopies of monstera, fiddle-leaf figs, and fragrant jasmine. Filtered daylight by afternoon, fairy lights by night.',
      image: assets.hero.greenhouse,
    },
    {
      id: 'coffee',
      title: 'Slow coffee',
      shortDesc: 'Cold, hot and everything between. Sip at your own speed.',
      fullDesc: 'Single-origin beans freshly ground for each cup. Precision cold drip extraction, silky flat whites, and artisanal tonics designed for unhurried conversations.',
      image: assets.dishes.coldCoffee,
    },
    {
      id: 'mocktails',
      title: 'Mocktail hour',
      shortDesc: 'Citrus, mint and a little fizz.',
      fullDesc: 'House-made botanical syrups, cold-pressed fruit reductions, and fresh garden herbs blended into elevated zero-proof concoctions.',
      image: assets.dishes.citrusMocktail,
    },
    {
      id: 'music',
      title: 'Music & company',
      shortDesc: 'Good songs, louder laughter.',
      fullDesc: 'A thoughtfully curated vinyl-style soundtrack that sits comfortably in the air — low enough for quiet secrets, lively enough to keep you smiling.',
      image: assets.hero.courtyard,
    },
  ];

  // 0 -> 100% count-up (§8.6)
  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const stepTime = 16;
    const increment = 100 / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        setCount(100);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveCard((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section className="relative w-full bg-[#86B3C3] text-[#2A1E18] overflow-hidden pt-8 pb-32">
      {/* Torn Paper Divider from previous section */}
      <TornEdge fillColor="#F3FEFE" position="top" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 100% Counter + Pocket Phone Peek */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex flex-col mb-8">
              <span className="font-display font-medium text-7xl sm:text-9xl text-[#2A1E18] tracking-tight tabular-nums leading-none">
                {count}%
              </span>
              <p className="font-ui font-bold text-sm sm:text-base text-[#2A1E18] tracking-widest uppercase mt-3">
                vegetarian. every plate, every sip.
              </p>
              <div className="mt-2">
                <TickMarksDoodle color="#2A1E18" />
              </div>
            </div>

            {/* 8.7 Pocket Phone Peek: Live Mini-Render */}
            <div className="relative w-64 sm:w-72 bg-[#2A1E18] p-3 rounded-[32px] shadow-2xl border-4 border-white rotate-[-2deg] hover:rotate-0 transition-transform duration-300 hidden md:block">
              {/* Speaker / Camera pill notch */}
              <div className="w-16 h-3 bg-white/30 rounded-full mx-auto mb-2" />

              {/* Mini phone screen */}
              <div className="bg-[#F5F0E6] rounded-[24px] p-3 flex flex-col gap-2 overflow-hidden text-left">
                <div className="flex items-center justify-between pb-1 border-b border-[#6D4B38]/20">
                  <span className="font-script text-base text-[#2A1E18]">
                    Birds &amp; Bees
                  </span>
                  <span className="text-[8px] font-mono font-bold text-[#2F5D3A] bg-[#2F5D3A]/10 px-1 rounded-sm">
                    100% VEG
                  </span>
                </div>
                <img
                  src={assets.dishes.signature}
                  alt="Mini dish preview"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <p className="font-display text-xs font-semibold text-[#2A1E18]">
                  Handcrafted Garden Bites
                </p>
                <Link to="/book" className="w-full">
                  <button className="w-full py-2 rounded-full bg-[#AB653E] text-white text-[10px] font-ui font-bold uppercase tracking-wider border-2 border-[#2A1E18] shadow-[2px_2px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150">
                    Book Instant &rarr;
                  </button>
                </Link>
              </div>

              {/* Side text for Pocket Phone Peek */}
              <div className="mt-3 text-center">
                <span className="font-hand text-lg text-white">
                  the garden fits in your pocket.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Cream Cards Carousel */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="font-hand text-2xl text-[#2A1E18]">
                come stay a while &rarr;
              </span>

              {/* Prev / Next 44px Circular Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full bg-white text-[#2A1E18] hover:bg-[#E6C08B] flex items-center justify-center border-2 border-[#2A1E18] shadow-[3px_3px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_#2A1E18] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 font-bold"
                  aria-label="Previous vibe card"
                  data-cursor="Prev"
                >
                  &larr;
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-white text-[#2A1E18] hover:bg-[#E6C08B] flex items-center justify-center border-2 border-[#2A1E18] shadow-[3px_3px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_#2A1E18] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 font-bold"
                  aria-label="Next vibe card"
                  data-cursor="Next"
                >
                  &rarr;
                </button>
              </div>
            </div>

            {/* Cards Slider / Carousel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cards.map((card, idx) => {
                const isActive = idx === activeCard;
                return (
                  <div
                    key={card.id}
                    className={`bg-[#F5F0E6] rounded-2xl overflow-hidden shadow-lg border border-[#2A1E18]/15 flex flex-col justify-between p-4 transition-all duration-300 ${
                      isActive ? 'ring-2 ring-[#2A1E18] scale-[1.02]' : 'opacity-85'
                    }`}
                  >
                    <div>
                      <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-white">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <h3 className="font-display font-medium text-2xl text-[#2A1E18] mb-1">
                        {card.title}
                      </h3>
                      <p className="font-body text-sm text-[#6D4B38] mb-4">
                        {card.shortDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => setModalCard(card)}
                      className="inline-flex items-center justify-center self-start px-4 py-2 rounded-full bg-[#2F5D3A] text-[#F3FEFE] font-ui text-xs font-bold tracking-wider uppercase border-2 border-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none hover:bg-[#23462B] transition-all duration-150"
                      data-cursor="Peek"
                    >
                      Read more &rarr;
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Side Sheet Modal for "Read More" */}
      {modalCard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#2A1E18]/60 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in"
        >
          <div className="relative w-full max-w-lg bg-[#F5F0E6] paper-texture rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#CED9E1]">
            <button
              onClick={() => setModalCard(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border-2 border-[#2A1E18] shadow-[2px_2px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center text-[#2A1E18] font-bold text-xs hover:text-[#AB653E] transition-all duration-150"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-white">
              <img
                src={modalCard.image}
                alt={modalCard.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-display font-medium text-3xl text-[#2A1E18] mb-2">
              {modalCard.title}
            </h3>
            <p className="font-body text-base text-[#6D4B38] leading-relaxed mb-6">
              {modalCard.fullDesc}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#6D4B38]/20">
              <MagneticButton to="/book" onClick={() => setModalCard(null)} variant="primary" size="sm">
                Book a Table
              </MagneticButton>
              <Bee size={24} flutter={true} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
