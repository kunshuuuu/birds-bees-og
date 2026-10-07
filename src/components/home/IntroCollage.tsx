import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';
import { Tape } from '../materials/Tape';
import { Stamp } from '../materials/Stamp';
import { Sticker } from '../materials/Sticker';
import { CurlyArrowDoodle, WavyUnderlineDoodle } from '../illustrations/DoodleDecorations';
import { MagneticButton } from '../animations/MagneticButton';
import { Bee } from '../illustrations/Bee';

export const IntroCollage: React.FC = () => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const photoStack = [
    { src: assets.hero.greenhouse, caption: 'Greenhouse canopy, morning light' },
    { src: assets.dishes.signature, caption: 'Handcrafted seasonal vegetarian creation' },
    { src: assets.dishes.coldCoffee, caption: 'Signature iced cold brew on travertine' },
  ];

  const handleNextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % photoStack.length);
  };

  const handlePrevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + photoStack.length) % photoStack.length);
  };

  return (
    <section className="relative w-full py-24 md:py-36 px-6 sm:px-12 bg-[#F5F0E6] paper-texture overflow-hidden border-t border-[#CED9E1]/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column (Editorial Headline & Story) */}
        <div className="lg:col-span-6 flex flex-col items-start">
          {/* Oval stamp tag with real brand mark */}
          <div className="mb-4 flex items-center gap-3">
            <img
              src="/logos/logo-icon.png"
              alt="Birds & Bees Cafeto logo icon"
              className="w-7 h-7 object-contain"
            />
            <span className="inline-block px-3 py-1 rounded-full border border-[#2F5D3A] font-ui text-xs font-bold tracking-widest text-[#2F5D3A] uppercase bg-[#2F5D3A]/5 -rotate-2">
              PURE VEGETARIAN · 100%
            </span>
          </div>

          <h2 className="font-display font-medium text-4xl sm:text-6xl text-[#2A1E18] tracking-tight leading-[1.08] mb-6">
            Nature lovers, <br />
            <span className="relative inline-block text-[#AB653E]">
              welcome.
              <WavyUnderlineDoodle color="#AB653E" className="w-full mt-1" />
            </span>
          </h2>

          <p className="font-body text-lg sm:text-xl text-[#6D4B38] leading-relaxed mb-6 max-w-xl">
            Birds &amp; Bees is a garden that happens to serve very good vegetarian food. Order something cold and green. Pull your chair a little closer to the leaves. Nobody&apos;s rushing you — the bees certainly aren&apos;t.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <MagneticButton to="/about" variant="dark" size="md">
              Our Story &rarr;
            </MagneticButton>
            <MagneticButton to="/book" variant="primary" size="md">
              Book a Table
            </MagneticButton>
          </div>

          {/* Chef's Pick teaser with curly arrow doodle */}
          <div className="pt-6 border-t border-[#6D4B38]/15 w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CurlyArrowDoodle label="start here" color="#AB653E" />
              <p className="font-ui text-xs text-[#6D4B38]/80 uppercase tracking-wider font-semibold">
                Today&apos;s special brew &amp; seasonal plates
              </p>
            </div>
            <Bee size={24} flutter={true} />
          </div>
        </div>

        {/* Right Column (Layered Interactive Photo Stack) */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
          {/* Background tilted card 2 */}
          <div
            className="absolute w-[72%] sm:w-[68%] aspect-[4/5] rounded-2xl bg-white p-3 shadow-lg rotate-6 transition-transform duration-500 pointer-events-none"
            style={{ transform: 'rotate(6deg) translateY(12px)' }}
          >
            <img
              src={photoStack[(photoIndex + 1) % photoStack.length].src}
              alt="Layered cafe detail"
              className="w-full h-full object-cover rounded-xl opacity-75"
            />
          </div>

          {/* Active Front Card with Washi Tape and Stamp */}
          <div
            onClick={handleNextPhoto}
            className="relative w-[78%] sm:w-[74%] aspect-[4/5] rounded-2xl bg-white p-3 shadow-2xl rotate-[-2deg] cursor-pointer hover:rotate-0 transition-transform duration-300 group z-10"
            data-cursor="Flip"
            title="Click to shuffle photos"
          >
            <Tape rotation={-6} className="-top-3 left-12" />
            <img
              src={photoStack[photoIndex].src}
              alt={photoStack[photoIndex].caption}
              className="w-full h-full object-cover rounded-xl"
            />

            {/* Stamp on photo corner */}
            <div className="absolute -bottom-4 -right-4 z-20">
              <Stamp variant="leaf" rotation={8} size={95} />
            </div>

            {/* Floating caption tag */}
            <div className="absolute bottom-6 left-6 right-16 bg-[#2A1E18]/80 backdrop-blur-xs px-3 py-1.5 rounded-lg text-white">
              <span className="font-ui text-xs tracking-wide">
                {photoStack[photoIndex].caption}
              </span>
            </div>
          </div>

          {/* Shuffling Prev / Next Floating Controls */}
          <div className="absolute bottom-2 left-6 z-20 flex items-center gap-2">
            <button
              onClick={handlePrevPhoto}
              className="w-10 h-10 rounded-full bg-white border-2 border-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none flex items-center justify-center text-[#2A1E18] hover:bg-[#E6C08B] transition-all duration-150 font-bold"
              aria-label="Previous photo in stack"
              data-cursor="Prev"
            >
              &larr;
            </button>
            <button
              onClick={handleNextPhoto}
              className="w-10 h-10 rounded-full bg-white border-2 border-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none flex items-center justify-center text-[#2A1E18] hover:bg-[#E6C08B] transition-all duration-150 font-bold"
              aria-label="Next photo in stack"
              data-cursor="Next"
            >
              &rarr;
            </button>
            <span className="font-hand text-sm text-[#6D4B38] ml-2">
              tap to shuffle
            </span>
          </div>

          {/* Decorative Die-Cut Robin & Leaf Stickers */}
          <div className="absolute -top-4 right-8 z-30">
            <Sticker rotation={12} type="leaf">
              <span className="font-hand text-sm text-[#2F5D3A] px-1 font-bold">
                🍃 garden fresh
              </span>
            </Sticker>
          </div>
        </div>
      </div>
    </section>
  );
};
