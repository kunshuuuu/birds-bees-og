import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WavyUnderlineDoodle } from '../illustrations/DoodleDecorations';
import { Bee } from '../illustrations/Bee';

gsap.registerPlugin(ScrollTrigger);

export const Statement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const text = "Some places feed you. Some places make you stay. We figured — why not both?";

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Color scrub per word from --pale-sky to --coffee-bean
      gsap.fromTo(
        wordsRef.current,
        { color: '#CED9E1' },
        {
          color: '#6D4B38',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = text.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 px-6 sm:px-12 bg-[#F3FEFE] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Subtle bee gliding across */}
        <div className="mb-6 opacity-75">
          <Bee size={32} flutter={true} />
        </div>

        <p className="font-display font-medium text-3xl sm:text-5xl md:text-6xl text-[#6D4B38] leading-[1.25] tracking-tight max-w-4xl">
          {words.map((word, idx) => (
            <span
              key={idx}
              ref={(el) => {
                if (el) wordsRef.current[idx] = el;
              }}
              className="inline-block mx-1.5 transition-colors duration-150"
            >
              {word === 'both?' ? (
                <span className="relative inline-block text-[#AB653E]">
                  {word}
                  <WavyUnderlineDoodle color="#AB653E" className="w-full mt-2" />
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </p>

        <span className="font-hand text-2xl text-[#2F5D3A] mt-10 -rotate-2">
          come sit in the shade.
        </span>
      </div>
    </section>
  );
};
