import React, { useState } from 'react';
import { assets } from '../data/assets';
import { Stamp } from '../components/materials/Stamp';
import { Sticker } from '../components/materials/Sticker';
import { Tape } from '../components/materials/Tape';
import { Bee } from '../components/illustrations/Bee';
import { CurlyArrowDoodle, WavyUnderlineDoodle } from '../components/illustrations/DoodleDecorations';
import { MagneticButton } from '../components/animations/MagneticButton';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const [ambientAudio, setAmbientAudio] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-32 bg-[#F3FEFE] text-[#2A1E18]">
      {/* ── CHAPTER 1: WHY BIRDS & BEES (§11) ── */}
      <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/logos/logo-icon.png"
            alt="Birds & Bees Cafeto"
            className="w-7 h-7 object-contain"
          />
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E]">
            Chapter 01 · The Genesis
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="font-display font-medium text-4xl sm:text-6xl text-[#2A1E18] tracking-tight leading-[1.1] mb-6">
              &ldquo;We wanted a place that felt like the good part of the weekend — on a Tuesday.&rdquo;
            </h1>
            <p className="font-body text-lg text-[#6D4B38] leading-relaxed max-w-xl mb-4">
              Birds, bees, and an abundance of living greenery. A sanctuary conceived around a simple truth: where you eat fundamentally changes how the food tastes.
            </p>
            <p className="font-body text-lg text-[#6D4B38] leading-relaxed max-w-xl">
              We did not want another sterile glass box with fluorescent bulbs and rush timers. We wanted leaves brushing your shoulder, gentle sunlight through canopy blinds, and acoustic strings drifting in the air.
            </p>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 bg-white">
              <Tape rotation={-5} className="-top-3 left-12" />
              <img
                src={assets.hero.greenhouse}
                alt="Greenhouse garden atmosphere"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 z-10">
                <Sticker rotation={8} type="leaf">
                  <span className="font-hand text-sm text-[#2F5D3A] font-bold">garden sanctuary</span>
                </Sticker>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 2: THE GARDEN (Illustrated Strip with Hotspots) ── */}
      <section className="py-24 bg-[#F5F0E6] paper-texture border-y border-[#CED9E1]/70 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-8">
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] block mb-2">
            Chapter 02 · The Layout
          </span>
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-[#2A1E18]">
            The Living Architecture.
          </h2>
          <p className="font-body text-base text-[#6D4B38] mt-2 max-w-lg">
            Start with a shady corner, add leaves in every direction, and hang strings of warm lights. Tap the garden hotspots below to discover our spaces.
          </p>
        </div>

        {/* Hotspots Interactive Strip */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative aspect-[16/7] rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-[#2A1E18]">
            <img
              src={assets.hero.courtyard}
              alt="Garden courtyard wide map view"
              className="w-full h-full object-cover opacity-70"
            />

            {/* Hotspot 1: Monstera Corner */}
            <button
              onClick={() => setActiveHotspot('Monstera Shaded Nook: Private table tucked behind mature philodendron leaves.')}
              className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-[#E6C08B] border-2 border-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center font-bold text-xs text-[#2A1E18]"
              title="Monstera Shaded Nook"
            >
              1
            </button>

            {/* Hotspot 2: Golden Hour Bistro Central */}
            <button
              onClick={() => setActiveHotspot('Golden Hour Central Lawn: Best afternoon light, festoon string lights directly overhead.')}
              className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-[#E6C08B] border-2 border-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center font-bold text-xs text-[#2A1E18]"
              title="Golden Hour Central Lawn"
            >
              2
            </button>

            {/* Hotspot 3: Glasshouse Porch */}
            <button
              onClick={() => setActiveHotspot('Glasshouse Porch: Filtered sunlight with breezy bistro chairs, perfect for slow coffees.')}
              className="absolute bottom-1/4 right-1/4 w-8 h-8 rounded-full bg-[#E6C08B] border-2 border-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center font-bold text-xs text-[#2A1E18]"
              title="Glasshouse Porch"
            >
              3
            </button>

            {/* Active Hotspot Banner */}
            {activeHotspot && (
              <div className="absolute bottom-4 left-4 right-4 bg-[#2A1E18]/90 text-white p-3 rounded-xl backdrop-blur-xs flex items-center justify-between font-ui text-xs animate-in fade-in border-2 border-[#2A1E18] shadow-[3px_3px_0px_#2A1E18]">
                <span>📍 {activeHotspot}</span>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="w-6 h-6 rounded-full bg-white text-[#2A1E18] border-2 border-[#2A1E18] shadow-[1.5px_1.5px_0px_#2A1E18] font-bold text-xs flex items-center justify-center hover:bg-[#AB653E] hover:text-white transition-all ml-2"
                  aria-label="Close hotspot info"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CHAPTER 3: FOOD — "THE RULE" (Full-Bleed Coffee Bean Section) ── */}
      <section className="py-24 bg-[#6D4B38] text-[#F3FEFE] px-6 sm:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#E6C08B] block mb-3">
              Chapter 03 · The Rule
            </span>
            <h2 className="font-display font-medium text-4xl sm:text-6xl text-[#F3FEFE] tracking-tight leading-tight mb-6">
              The Rule: 100% Pure Vegetarian.
            </h2>
            <p className="font-body text-lg text-[#CED9E1] leading-relaxed mb-4">
              No fine print, no &ldquo;veg-friendly&rdquo; asterisk. Everything on the menu is vegetarian, prepared from scratch, and cooked like it truly matters.
            </p>
            <p className="font-body text-base text-[#CED9E1]/80 leading-relaxed">
              From fresh stoneground ricotta to hand-rolled spinach tagliatelle, we celebrate plants with the same culinary ambition that Michelin-starred dining reserves for degustations.
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="p-6 rounded-3xl bg-[#2A1E18]/60 border-2 border-[#E6C08B]/40 shadow-2xl flex flex-col items-center justify-center text-center">
              <img
                src="/logos/logo-wood.png"
                alt="Birds & Bees Cafeto seal"
                className="w-48 sm:w-56 h-auto object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]"
              />
              <span className="font-ui text-[11px] font-bold tracking-[0.25em] uppercase text-[#E6C08B] mt-4">
                AUTHENTIC GARDEN SANCTUARY
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 4: MUSIC & SOUNDTRACK ── */}
      <section className="py-24 bg-[#F5F0E6] paper-texture border-b border-[#CED9E1]/70 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-[#CED9E1]">
          <div>
            <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] block mb-2">
              Chapter 04 · Soundscape
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#2A1E18] mb-3">
              The soundtrack is part of the menu.
            </h2>
            <p className="font-body text-base text-[#6D4B38] leading-relaxed max-w-md">
              Low enough for quiet secrets, good enough to stop and ask &ldquo;what song is this?&rdquo;
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <MagneticButton
              type="button"
              onClick={() => setAmbientAudio(!ambientAudio)}
              variant={ambientAudio ? 'leaf' : 'dark'}
              size="md"
            >
              <span>{ambientAudio ? '🔊 Garden Ambiance ON' : '🔈 Ambient Garden Sounds (OFF)'}</span>
            </MagneticButton>
            <span className="font-hand text-sm text-[#6D4B38]">
              {ambientAudio ? 'gentle breeze & soft acoustic chords' : 'tap to toggle demo audio'}
            </span>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 5: VALUES (Numbered Field-Notes 01–05) ── */}
      <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto">
        <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] block mb-2">
          Chapter 05 · Field Notes
        </span>
        <h2 className="font-display font-medium text-4xl sm:text-5xl text-[#2A1E18] mb-12">
          Five principles we stand by.
        </h2>

        <div className="space-y-6">
          {[
            { num: '01', title: 'Green, always.', desc: 'Living plants over artificial decor. We plant and tend what surrounds you.' },
            { num: '02', title: 'Food first.', desc: 'Atmosphere draws you in, but culinary depth is why you return.' },
            { num: '03', title: 'Slow is fine.', desc: 'Nobody rushes your table. The bees certainly do not.' },
            { num: '04', title: 'Everyone is welcome at the table.', desc: 'Solo bookworms, family brunches, and late evening laughter.' },
            { num: '05', title: 'Leave it better than you found it.', desc: 'Mindful composting, pure vegetarian sourcing, and minimal plastic waste.' },
          ].map((val) => (
            <div
              key={val.num}
              className="p-6 rounded-2xl bg-[#F5F0E6] paper-texture border border-[#CED9E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-6">
                <span className="font-display text-3xl font-bold text-[#AB653E]">
                  {val.num}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-xl text-[#2A1E18]">
                    {val.title}
                  </h3>
                  <p className="font-body text-sm text-[#6D4B38] mt-0.5">
                    {val.desc}
                  </p>
                </div>
              </div>
              <Bee size={18} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <MagneticButton to="/book" variant="primary" size="lg">
            Come see for yourself &rarr;
          </MagneticButton>
        </div>
      </section>
    </div>
  );
};
