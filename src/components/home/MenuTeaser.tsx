import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';
import { Tape } from '../materials/Tape';
import { Stamp } from '../materials/Stamp';
import { Sticker } from '../materials/Sticker';
import { Bee } from '../illustrations/Bee';
import { MagneticButton } from '../animations/MagneticButton';

export const MenuTeaser: React.FC = () => {
  const [currentSpread, setCurrentSpread] = useState(0);

  const spreads = [
    {
      leftTitle: 'Iced Brews & Cold Sips',
      leftImage: assets.dishes.coldCoffee,
      leftItems: [
        { name: 'Signature Shakerato', price: '₹ 280', desc: 'Madagascar vanilla & cold drip' },
        { name: 'Citrus Tonic Cold Brew', price: '₹ 290', desc: 'Yuzu spritz with fresh rosemary' },
      ],
      rightTitle: 'Garden Mocktails',
      rightImage: assets.dishes.citrusMocktail,
      rightItems: [
        { name: 'Ruby Garden Spritz', price: '₹ 260', desc: 'Blood orange & elderflower' },
        { name: 'Cucumber Mint Fizz', price: '₹ 240', desc: 'Crisp garden botanicals' },
      ],
    },
    {
      leftTitle: 'Artisanal Starters',
      leftImage: assets.dishes.gardenToast,
      leftItems: [
        { name: 'Heirloom Tomato Tartine', price: '₹ 360', desc: 'Charred garden tomatoes' },
        { name: 'Truffle Herb Croquettes', price: '₹ 380', desc: 'Golden crust, velvet herbs' },
      ],
      rightTitle: 'Signature Mains',
      rightImage: assets.dishes.artisanalPasta,
      rightItems: [
        { name: 'Garden Pesto Tagliatelle', price: '₹ 420', desc: 'Handcrafted spinach ribbons' },
        { name: 'Smoked Ricotta Risotto', price: '₹ 460', desc: 'Acquerello rice, lemon thyme' },
      ],
    },
  ];

  const spread = spreads[currentSpread];

  return (
    <section className="relative w-full py-28 md:py-36 bg-[#86B3C3] text-[#2A1E18] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col items-center text-center">
        {/* Section Heading */}
        <div className="mb-10">
          <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#2A1E18]/80 block mb-2">
            Signature Hardcover Volume
          </span>
          <h2 className="font-display font-medium text-4xl sm:text-6xl text-[#2A1E18] tracking-tight">
            Turn the pages.
          </h2>
          <p className="font-hand text-2xl text-[#2A1E18] mt-2">
            we kept the coffee stains out.
          </p>
        </div>

        {/* 3D Hardcover Book Spread Teaser */}
        <div
          className="relative w-full max-w-4xl bg-[#6D4B38] p-3 sm:p-5 rounded-2xl shadow-2xl border-4 border-[#2A1E18] select-none"
          style={{
            boxShadow: '0 25px 50px -12px rgba(42, 30, 24, 0.35)',
          }}
        >
          {/* Book Spine Center Gutter */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-[#2A1E18]/40 z-20 pointer-events-none rounded-full" />

          {/* Book Pages Spread */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F5F0E6] paper-texture p-6 sm:p-8 rounded-xl border border-[#CED9E1]/80 shadow-inner">
            {/* Left Page */}
            <div className="flex flex-col text-left border-b md:border-b-0 md:border-r border-[#6D4B38]/15 pb-6 md:pb-0 md:pr-6 relative">
              <Tape rotation={-4} className="-top-4 left-6" />

              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-semibold text-2xl text-[#2A1E18]">
                  {spread.leftTitle}
                </span>
                <span className="font-mono text-xs text-[#6D4B38]/60">p. 0{currentSpread * 2 + 1}</span>
              </div>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-white shadow-xs">
                <img
                  src={spread.leftImage}
                  alt={spread.leftTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2">
                  <Sticker rotation={-8} type="bee">
                    <Bee size={18} />
                  </Sticker>
                </div>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-3 mt-auto">
                {spread.leftItems.map((item, idx) => (
                  <div key={idx} className="flex items-baseline justify-between border-b border-[#6D4B38]/10 pb-1.5">
                    <div>
                      <p className="font-ui font-semibold text-sm text-[#2A1E18]">{item.name}</p>
                      <p className="font-body text-xs text-[#6D4B38]">{item.desc}</p>
                    </div>
                    <span className="font-ui font-bold text-sm text-[#AB653E] tabular-nums">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Page */}
            <div className="flex flex-col text-left md:pl-6 relative">
              <Tape rotation={5} className="-top-4 right-6" />

              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-semibold text-2xl text-[#2A1E18]">
                  {spread.rightTitle}
                </span>
                <span className="font-mono text-xs text-[#6D4B38]/60">p. 0{currentSpread * 2 + 2}</span>
              </div>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-white shadow-xs">
                <img
                  src={spread.rightImage}
                  alt={spread.rightTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-2 -left-2 z-10">
                  <Stamp variant="blue" rotation={-12} size={85} />
                </div>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-3 mt-auto">
                {spread.rightItems.map((item, idx) => (
                  <div key={idx} className="flex items-baseline justify-between border-b border-[#6D4B38]/10 pb-1.5">
                    <div>
                      <p className="font-ui font-semibold text-sm text-[#2A1E18]">{item.name}</p>
                      <p className="font-body text-xs text-[#6D4B38]">{item.desc}</p>
                    </div>
                    <span className="font-ui font-bold text-sm text-[#AB653E] tabular-nums">{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Corner Peel Interactive Hint */}
              <button
                onClick={() => setCurrentSpread((prev) => (prev === 0 ? 1 : 0))}
                className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#E6C08B] text-[#2A1E18] text-xs font-hand font-bold border-2 border-[#2A1E18] shadow-[2px_2px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-1 group"
              >
                <span>flip spread</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* CTA to Open Full Interactive Menu */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-5">
          <MagneticButton to="/menu" variant="primary" size="lg">
            Open the full menu &rarr;
          </MagneticButton>
          <span className="font-hand text-xl text-[#2A1E18]">
            Ask us about today&apos;s special brew
          </span>
        </div>
      </div>
    </section>
  );
};
