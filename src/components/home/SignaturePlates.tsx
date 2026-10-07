import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';
import { Tape } from '../materials/Tape';
import { WavyUnderlineDoodle, CurlyArrowDoodle } from '../illustrations/DoodleDecorations';
import { MagneticButton } from '../animations/MagneticButton';
import { Bee } from '../illustrations/Bee';

export interface SignaturePlateItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tag: string;
  note: string;
  isChefPick?: boolean;
}

export const SignaturePlates: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const plates: SignaturePlateItem[] = [
    {
      id: '1',
      name: 'Garden Pesto Tagliatelle',
      description: 'Handcrafted spinach pasta, cold-pressed basil olive oil, toasted pine nuts, and edible violas.',
      price: '₹ 420',
      image: assets.dishes.artisanalPasta,
      tag: 'Chef Signature',
      note: 'try it with cold brew',
      isChefPick: true,
    },
    {
      id: '2',
      name: 'Heirloom Tomato Tartine',
      description: 'Whipped garden herb ricotta, charred heirloom tomatoes, and aged balsamic on rustic sourdough.',
      price: '₹ 360',
      image: assets.dishes.gardenToast,
      tag: '100% Pure Veg',
      note: 'shareable (barely)',
    },
    {
      id: '3',
      name: 'Signature Shakerato Cold Brew',
      description: 'Triple-filtered single origin brew shaken vigorously with raw Madagascar vanilla and citrus zest.',
      price: '₹ 280',
      image: assets.dishes.coldCoffee,
      tag: 'Iced Signature',
      note: 'best at golden hour',
      isChefPick: true,
    },
    {
      id: '4',
      name: 'Botanical Herb Crisps & Dip',
      description: 'Charred zucchini blossoms, whipped feta, spiced honey drizzle, and garden-fresh microgreens.',
      price: '₹ 340',
      image: assets.dishes.signature,
      tag: 'Garden Starter',
      note: 'ask for extra crunch',
    },
    {
      id: '5',
      name: 'Ruby Citrus Garden Spritz',
      description: 'Sparkling blood orange reduction, fresh rosemary sprig, elderflower water, and crushed pink peppercorn.',
      price: '₹ 260',
      image: assets.dishes.citrusMocktail,
      tag: 'Zero-Proof',
      note: 'fresh from the bar',
    },
  ];

  return (
    <section className="relative w-full py-24 md:py-36 bg-[#F3FEFE] overflow-hidden border-t border-[#CED9E1]/60">
      {/* Header Row */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E6C08B]/40 text-[#6D4B38] font-ui text-[11px] font-bold uppercase tracking-widest">
              New Season
            </span>
            <CurlyArrowDoodle label="start here" color="#AB653E" />
          </div>

          <h2 className="font-display font-medium text-4xl sm:text-6xl text-[#2A1E18] tracking-tight">
            <span className="relative inline-block border-2 border-[#AB653E]/40 px-2 rounded-2xl">
              Signature
            </span>{' '}
            Plates
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex flex-col">
            <span className="font-script text-2xl text-[#2F5D3A]">
              100% vegetarian. Zero apologies.
            </span>
            <WavyUnderlineDoodle color="#2F5D3A" className="w-48 -mt-1" />
          </div>
          <MagneticButton to="/menu" variant="outline" size="sm">
            See the full menu &rarr;
          </MagneticButton>
        </div>
      </div>

      {/* Interactive Horizontal Cards Track */}
      <div className="w-full overflow-x-auto pb-8 pt-4 px-6 sm:px-12 scrollbar-none snap-x snap-mandatory">
        <div className="flex items-center gap-8 md:gap-12 min-w-max">
          {plates.map((plate, index) => {
            const isCenter = index === activeIndex;
            return (
              <div
                key={plate.id}
                onClick={() => setActiveIndex(index)}
                className={`snap-center relative w-[290px] sm:w-[350px] md:w-[380px] bg-[#F5F0E6] rounded-2xl p-4 shadow-lg border border-[#CED9E1]/80 cursor-pointer transition-all duration-400 select-none ${
                  isCenter
                    ? 'scale-105 shadow-2xl ring-2 ring-[#AB653E]/50 -translate-y-2'
                    : 'opacity-85 hover:opacity-100 hover:scale-100'
                }`}
                style={{
                  transform: isCenter
                    ? 'translateY(-8px) rotate(0deg)'
                    : `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
                }}
                data-cursor="Book"
              >
                {/* Washi Tape Corners */}
                <Tape rotation={-5} className="-top-3 left-8" />
                {plate.isChefPick && <Tape rotation={6} color="pale-sky" className="-top-3 right-8" />}

                {/* Photo container */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-white">
                  <img
                    src={plate.image}
                    alt={plate.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Black tag label pinned on photo corner */}
                  <span className="absolute bottom-3 left-3 bg-[#2A1E18]/90 text-white font-ui text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-sm shadow-xs">
                    {plate.tag}
                  </span>
                  {plate.isChefPick && (
                    <span className="absolute top-3 right-3 bg-[#E6C08B] text-[#2A1E18] font-ui text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full shadow-xs">
                      ★ Chef&apos;s Pick
                    </span>
                  )}
                </div>

                {/* Card Content & Handwritten Notes */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-2 border-b border-[#6D4B38]/15 pb-2">
                    <h3 className="font-display font-medium text-xl sm:text-2xl text-[#2A1E18]">
                      {plate.name}
                    </h3>
                    <span className="font-ui font-bold text-lg text-[#AB653E] tabular-nums whitespace-nowrap">
                      {plate.price}
                    </span>
                  </div>

                  <p className="font-body text-sm text-[#6D4B38] leading-relaxed">
                    {plate.description}
                  </p>

                  <div className="mt-2 flex items-center justify-between pt-1">
                    <span className="font-hand text-lg text-[#2F5D3A] italic">
                      &ldquo;{plate.note}&rdquo;
                    </span>
                    <Bee size={18} flutter={isCenter} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Dots / Segment Indicators */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {plates.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-8 bg-[#AB653E]' : 'w-2 bg-[#CED9E1] hover:bg-[#6D4B38]'
              }`}
              aria-label={`View signature plate ${i + 1}`}
            />
          ))}
        </div>
        <span className="font-hand text-lg text-[#6D4B38]">
          slide or tap to discover &rarr;
        </span>
      </div>
    </section>
  );
};
