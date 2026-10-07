import React, { useState } from 'react';
import { menuItems, MenuCategory, MenuMood } from '../../data/menu';
import { Tape } from '../materials/Tape';
import { Stamp } from '../materials/Stamp';
import { Sticker } from '../materials/Sticker';
import { PostageStamp } from '../materials/PostageStamp';
import { Bee } from '../illustrations/Bee';
import { assets } from '../../data/assets';
import { MagneticButton } from '../animations/MagneticButton';

interface FlipBookProps {
  onCategorySelect?: (cat: MenuCategory) => void;
}

export const FlipBook: React.FC<FlipBookProps> = () => {
  const [currentSpread, setCurrentSpread] = useState(0); // 0 to 5
  const totalSpreads = 6;

  const goToPrev = () => setCurrentSpread((prev) => Math.max(0, prev - 1));
  const goToNext = () => setCurrentSpread((prev) => Math.min(totalSpreads - 1, prev + 1));

  const bookmarks: { category: MenuCategory; targetSpread: number }[] = [
    { category: 'Sips', targetSpread: 1 },
    { category: 'Starters', targetSpread: 2 },
    { category: 'Mains', targetSpread: 3 },
    { category: 'Desserts', targetSpread: 4 },
  ];

  const starters = menuItems.filter((i) => i.category === 'Starters');
  const mains = menuItems.filter((i) => i.category === 'Mains');
  const sips = menuItems.filter((i) => i.category === 'Sips');
  const desserts = menuItems.filter((i) => i.category === 'Desserts');

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Ribbon Bookmark Tabs sticking out of book's top edge (§9.1) */}
      <div className="flex items-center gap-3 mb-2 z-20">
        {bookmarks.map((bm) => {
          const isActive = currentSpread === bm.targetSpread;
          return (
            <button
              key={bm.category}
              onClick={() => setCurrentSpread(bm.targetSpread)}
              className={`px-4 py-1.5 rounded-t-lg font-ui text-xs font-bold uppercase tracking-wider transition-all duration-150 border-t-2 border-x-2 border-[#2A1E18] shadow-[2px_0px_0px_#2A1E18] ${
                isActive
                  ? 'bg-[#AB653E] text-[#F3FEFE] -translate-y-1'
                  : 'bg-[#E6C08B] text-[#2A1E18] hover:bg-[#D8AE74] hover:-translate-y-0.5'
              }`}
            >
              {bm.category}
            </button>
          );
        })}
      </div>

      {/* 3D Physical Hardcover Volume */}
      <div
        className="relative w-full max-w-5xl bg-[#6D4B38] p-3 sm:p-5 md:p-6 rounded-2xl shadow-2xl border-4 border-[#2A1E18] transition-all duration-500 select-none"
        style={{
          boxShadow: '0 30px 60px -15px rgba(42, 30, 24, 0.45)',
        }}
      >
        {/* Book Spine Center Gutter */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-[#2A1E18]/50 z-20 pointer-events-none rounded-full shadow-inner" />

        {/* Visible Page Thickness Layers on Edges */}
        <div className="absolute -right-2 top-4 bottom-4 w-2 bg-[#F5F0E6]/70 border-r border-[#2A1E18]/30 rounded-r-xs hidden sm:block" />
        <div className="absolute -left-2 top-4 bottom-4 w-2 bg-[#F5F0E6]/70 border-l border-[#2A1E18]/30 rounded-l-xs hidden sm:block" />

        {/* ── SPREAD 0: Hardcover Exterior ── */}
        {currentSpread === 0 && (
          <div className="min-h-[460px] sm:min-h-[540px] bg-[#2A1E18] text-[#F3FEFE] rounded-xl p-8 sm:p-14 flex flex-col items-center justify-center text-center border border-[#E6C08B]/30 relative">
            <Tape rotation={-3} className="-top-4 left-1/3" />
            <div className="relative mb-2">
              <img
                src="/logos/logo-wood.png"
                alt="Birds & Bees Cafeto seal"
                className="w-44 sm:w-56 h-auto object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.8)]"
              />
            </div>
            <h2 className="font-display font-medium text-4xl sm:text-6xl text-[#E6C08B] tracking-tight mt-4">
              Birds &amp; Bees
            </h2>
            <span className="font-ui text-xs font-bold tracking-[0.4em] uppercase text-[#CED9E1]/80 mt-2">
              CAFETO · INDORE · PURE VEGETARIAN
            </span>
            <p className="font-hand text-2xl text-[#E6C08B] mt-6">
              open the volume to explore &rarr;
            </p>
            <div className="mt-6">
              <MagneticButton
                onClick={goToNext}
                variant="primary"
                size="md"
              >
                Open Cover &rarr;
              </MagneticButton>
            </div>
          </div>
        )}

        {/* ── SPREAD 1: Type E (Editorial) — Cold Coffee & Sips ── */}
        {currentSpread === 1 && (
          <div className="min-h-[460px] sm:min-h-[540px] grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F0E6] paper-texture p-6 sm:p-10 rounded-xl border border-[#CED9E1]">
            {/* Left Page */}
            <div className="flex flex-col text-left border-b md:border-b-0 md:border-r border-[#6D4B38]/15 pb-6 md:pb-0 md:pr-6 relative">
              <Tape rotation={-6} className="-top-4 left-8" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl text-[#2A1E18]">Cold Coffee</span>
                <span className="font-mono text-xs text-[#6D4B38]/60">Spread 01</span>
              </div>
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-white relative">
                <img src={assets.dishes.coldCoffee} alt="Cold coffee spread" className="w-full h-full object-cover" />
                <div className="absolute -bottom-3 -right-2 z-10">
                  <Stamp variant="coral" size={85} rotation={-10} />
                </div>
              </div>
              <p className="font-body text-sm text-[#6D4B38] leading-relaxed mb-4">
                Slow-dripped over single origin beans for 14 hours. Served crisp, pure, and balanced with natural floral aromatics.
              </p>
              <div className="mt-auto flex items-center justify-between text-xs font-mono text-[#6D4B38]">
                <span>100% PURE BREW</span>
                <span>SCHEME 71</span>
              </div>
            </div>

            {/* Right Page */}
            <div className="flex flex-col text-left md:pl-6 relative">
              <Tape rotation={4} className="-top-4 right-8" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl text-[#2A1E18]">Garden Sips</span>
                <PostageStamp label="SIPS" value="INDORE" rotation={-3} className="scale-75 origin-top-right" />
              </div>
              <div className="flex flex-col gap-4 mt-2">
                {sips.map((item) => (
                  <div key={item.id} className="flex items-baseline justify-between border-b border-[#6D4B38]/15 pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-ui font-semibold text-sm text-[#2A1E18]">{item.name}</span>
                        {item.chefPick && <span className="text-[10px] text-[#AB653E]">★ Pick</span>}
                      </div>
                      <span className="font-body text-xs text-[#6D4B38]">{item.description}</span>
                    </div>
                    <span className="font-ui font-bold text-sm text-[#AB653E] tabular-nums whitespace-nowrap">
                      ₹ {item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="font-hand text-lg text-[#2F5D3A]">
                  &ldquo;try the shakerato at golden hour&rdquo;
                </span>
                <Bee size={20} />
              </div>
            </div>
          </div>
        )}

        {/* ── SPREAD 2: Type L (List) — Starters ── */}
        {currentSpread === 2 && (
          <div className="min-h-[460px] sm:min-h-[540px] grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F0E6] paper-texture p-6 sm:p-10 rounded-xl border border-[#CED9E1]">
            {/* Left Page */}
            <div className="flex flex-col text-left border-b md:border-b-0 md:border-r border-[#6D4B38]/15 pb-6 md:pb-0 md:pr-6 relative">
              <Tape rotation={-3} className="-top-4 left-6" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl text-[#2A1E18]">Starters</span>
                <span className="font-mono text-xs text-[#6D4B38]/60">Spread 02</span>
              </div>
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-white relative">
                <img src={assets.dishes.gardenToast} alt="Garden starter toast" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 bg-[#E6C08B]/20 rounded-xl border border-[#E6C08B]/50 mt-auto">
                <span className="font-ui text-xs font-bold uppercase text-[#6D4B38] block mb-1">
                  Kitchen Field Note
                </span>
                <p className="font-hand text-lg text-[#2A1E18]">
                  All dough and ricotta are prepared fresh in our kitchen each morning.
                </p>
              </div>
            </div>

            {/* Right Page */}
            <div className="flex flex-col text-left md:pl-6 relative">
              <span className="font-ui text-xs font-bold uppercase tracking-widest text-[#2F5D3A] mb-4">
                Pure Vegetarian Starters
              </span>
              <div className="flex flex-col gap-4">
                {starters.map((item) => (
                  <div key={item.id} className="flex items-baseline justify-between border-b border-[#6D4B38]/15 pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-ui font-semibold text-sm text-[#2A1E18]">{item.name}</span>
                        {item.chefPick && <span className="text-[10px] text-[#AB653E]">★ Chef Pick</span>}
                      </div>
                      <span className="font-body text-xs text-[#6D4B38]">{item.description}</span>
                    </div>
                    <span className="font-ui font-bold text-sm text-[#AB653E] tabular-nums whitespace-nowrap">
                      ₹ {item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between">
                <Stamp variant="leaf" size={75} rotation={6} />
                <span className="font-hand text-lg text-[#AB653E]">start here &rarr;</span>
              </div>
            </div>
          </div>
        )}

        {/* ── SPREAD 3: Type L (List) — Mains ── */}
        {currentSpread === 3 && (
          <div className="min-h-[460px] sm:min-h-[540px] grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F0E6] paper-texture p-6 sm:p-10 rounded-xl border border-[#CED9E1]">
            <div className="flex flex-col text-left border-b md:border-b-0 md:border-r border-[#6D4B38]/15 pb-6 md:pb-0 md:pr-6 relative">
              <Tape rotation={-5} className="-top-4 left-6" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl text-[#2A1E18]">Garden Mains</span>
                <span className="font-mono text-xs text-[#6D4B38]/60">Spread 03</span>
              </div>
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-white relative">
                <img src={assets.dishes.artisanalPasta} alt="Artisanal pasta main" className="w-full h-full object-cover" />
              </div>
              <p className="font-body text-sm text-[#6D4B38] leading-relaxed mt-auto">
                Cooked with patience. Handcrafted ribbons, slow-simmered reductions, and vegetables picked with care.
              </p>
            </div>

            <div className="flex flex-col text-left md:pl-6 relative">
              <span className="font-ui text-xs font-bold uppercase tracking-widest text-[#2F5D3A] mb-4">
                Main Courses · 100% Pure Veg
              </span>
              <div className="flex flex-col gap-4">
                {mains.map((item) => (
                  <div key={item.id} className="flex items-baseline justify-between border-b border-[#6D4B38]/15 pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-ui font-semibold text-sm text-[#2A1E18]">{item.name}</span>
                        {item.chefPick && <span className="text-[10px] text-[#AB653E]">★ Chef Pick</span>}
                      </div>
                      <span className="font-body text-xs text-[#6D4B38]">{item.description}</span>
                    </div>
                    <span className="font-ui font-bold text-sm text-[#AB653E] tabular-nums whitespace-nowrap">
                      ₹ {item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between">
                <span className="font-hand text-lg text-[#2A1E18]">
                  &ldquo;pairs wonderfully with sparkling spritz&rdquo;
                </span>
                <Bee size={20} />
              </div>
            </div>
          </div>
        )}

        {/* ── SPREAD 4: Type E (Editorial) — Desserts ── */}
        {currentSpread === 4 && (
          <div className="min-h-[460px] sm:min-h-[540px] grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F0E6] paper-texture p-6 sm:p-10 rounded-xl border border-[#CED9E1]">
            <div className="flex flex-col text-left border-b md:border-b-0 md:border-r border-[#6D4B38]/15 pb-6 md:pb-0 md:pr-6 relative">
              <Tape rotation={-2} className="-top-4 left-6" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl text-[#2A1E18]">Desserts</span>
                <span className="font-mono text-xs text-[#6D4B38]/60">Spread 04</span>
              </div>
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-white relative">
                <img src={assets.dishes.signature} alt="Garden dessert" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <Sticker rotation={8} type="leaf">
                    <span className="font-hand text-xs text-[#2F5D3A] font-bold">sweet finish</span>
                  </Sticker>
                </div>
              </div>
              <p className="font-body text-sm text-[#6D4B38] leading-relaxed mt-auto">
                Made with stoneground pistachios, single-origin chocolate, and fragrant floral essences.
              </p>
            </div>

            <div className="flex flex-col text-left md:pl-6 relative">
              <span className="font-ui text-xs font-bold uppercase tracking-widest text-[#2F5D3A] mb-4">
                Signature Confections
              </span>
              <div className="flex flex-col gap-4">
                {desserts.map((item) => (
                  <div key={item.id} className="flex items-baseline justify-between border-b border-[#6D4B38]/15 pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-ui font-semibold text-sm text-[#2A1E18]">{item.name}</span>
                        {item.chefPick && <span className="text-[10px] text-[#AB653E]">★ Pick</span>}
                      </div>
                      <span className="font-body text-xs text-[#6D4B38]">{item.description}</span>
                    </div>
                    <span className="font-ui font-bold text-sm text-[#AB653E] tabular-nums whitespace-nowrap">
                      ₹ {item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between">
                <Stamp variant="coral" size={80} rotation={-6} />
                <span className="font-hand text-lg text-[#AB653E]">sweet endings &rarr;</span>
              </div>
            </div>
          </div>
        )}

        {/* ── SPREAD 5: Back Cover ── */}
        {currentSpread === 5 && (
          <div className="min-h-[460px] sm:min-h-[540px] bg-[#2A1E18] text-[#F3FEFE] rounded-xl p-8 sm:p-14 flex flex-col items-center justify-center text-center border border-[#E6C08B]/30 relative">
            <img
              src="/logos/logo-wood.png"
              alt="Birds & Bees Cafeto seal"
              className="w-40 sm:w-48 h-auto object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.8)]"
            />
            <h3 className="font-script text-4xl sm:text-5xl text-[#E6C08B] mt-6">
              See you in the garden.
            </h3>
            <p className="font-body text-lg text-[#CED9E1] max-w-md mt-4 leading-relaxed">
              Every table is shaded. Every plate is 100% vegetarian. We look forward to welcoming you.
            </p>
            <div className="mt-6">
              <MagneticButton
                onClick={() => setCurrentSpread(1)}
                variant="primary"
                size="md"
              >
                Reopen to Beginning &rarr;
              </MagneticButton>
            </div>
          </div>
        )}
      </div>

      {/* Book Navigation Controls & Counter (§9.1) */}
      <div className="flex items-center justify-between w-full max-w-5xl mt-6 px-4">
        <button
          onClick={goToPrev}
          disabled={currentSpread === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-ui text-xs font-bold uppercase tracking-wider border-2 border-[#2A1E18] transition-all duration-150 ${
            currentSpread === 0
              ? 'opacity-40 cursor-not-allowed bg-stone-200 text-[#6D4B38]'
              : 'bg-white shadow-[3px_3px_0px_#2A1E18] text-[#2A1E18] hover:bg-[#E6C08B] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_#2A1E18] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'
          }`}
          data-cursor="Flip"
        >
          &larr; Previous Page
        </button>

        <span className="font-hand text-xl text-[#6D4B38]">
          Spread {currentSpread + 1} of {totalSpreads}
        </span>

        <button
          onClick={goToNext}
          disabled={currentSpread === totalSpreads - 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-ui text-xs font-bold uppercase tracking-wider border-2 border-[#2A1E18] transition-all duration-150 ${
            currentSpread === totalSpreads - 1
              ? 'opacity-40 cursor-not-allowed bg-stone-200 text-[#6D4B38]'
              : 'bg-white shadow-[3px_3px_0px_#2A1E18] text-[#2A1E18] hover:bg-[#E6C08B] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_#2A1E18] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'
          }`}
          data-cursor="Flip"
        >
          Next Page &rarr;
        </button>
      </div>
    </div>
  );
};
