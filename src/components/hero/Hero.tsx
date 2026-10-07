import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FrameSequence, FrameSequenceHandle } from './FrameSequence';
import { HERO } from '../../config/hero';
import { assets } from '../../data/assets';
import { SparklesDoodle, DashedLoopDoodle, WavyUnderlineDoodle, CircleCheckDoodle, TickMarksDoodle } from '../illustrations/DoodleDecorations';
import { Stamp } from '../materials/Stamp';
import { Tape } from '../materials/Tape';
import { Sticker } from '../materials/Sticker';
import { Bee } from '../illustrations/Bee';
import { MagneticButton } from '../animations/MagneticButton';
import { OpenTicket } from '../ui/OpenTicket';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC<{ isReady?: boolean }> = ({ isReady = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameSequenceRef = useRef<FrameSequenceHandle>(null);
  const [activeScene, setActiveScene] = useState(1);

  // Parallax ref elements
  const titleRef = useRef<HTMLDivElement>(null);
  const photoARef = useRef<HTMLDivElement>(null);
  const photoBRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animation once preloader clears
  useEffect(() => {
    if (!isReady || !titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out' }
    );
  }, [isReady]);

  // Refresh ScrollTrigger when ready and after DOM paints
  useEffect(() => {
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 600);
    const timer3 = setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isReady]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 300vh Pinning Timeline (§8.2)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3}`, // 300vh scroll pinning
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            // Drive canvas directly outside React render cycle
            frameSequenceRef.current?.setProgress(p);

            // Only update activeScene state when crossing boundaries
            const nextScene = p < 0.35 ? 1 : p < 0.7 ? 2 : 3;
            setActiveScene((prev) => (prev !== nextScene ? nextScene : prev));
          },
          onToggle: (self) => {
            window.dispatchEvent(new CustomEvent('hero-toggle', { detail: { isActive: self.isActive } }));
          },
          onLeave: () => {
            window.dispatchEvent(new CustomEvent('hero-toggle', { detail: { isActive: false } }));
          },
          onEnterBack: () => {
            window.dispatchEvent(new CustomEvent('hero-toggle', { detail: { isActive: true } }));
          },
        },
      });

      // Scene 1 Parallax Shifts
      if (titleRef.current) {
        tl.to(
          titleRef.current,
          {
            y: -50,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          0.25
        );
      }

      if (photoARef.current) {
        tl.to(
          photoARef.current,
          {
            scale: 1.15,
            y: -40,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          0.25
        );
      }

      if (photoBRef.current) {
        tl.to(
          photoBRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          0.25
        );
      }

      // Scene 2 Content Entrance & Exit
      tl.fromTo(
        '.hero-scene-2-text',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' },
        0.35
      );

      tl.to(
        '.hero-scene-2-text',
        { y: -50, opacity: 0, duration: 0.25, ease: 'power2.in' },
        0.65
      );

      // Scene 3 Content Entrance
      tl.fromTo(
        '.hero-scene-3-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        0.72
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const jumpToScene = (sceneNum: number) => {
    if (!containerRef.current) return;
    const targetP = sceneNum === 1 ? 0 : sceneNum === 2 ? 0.45 : 0.85;
    const totalScroll = window.innerHeight * 3.0; // 300vh
    const rect = containerRef.current.getBoundingClientRect();
    const currentScroll = window.scrollY;
    const containerTop = currentScroll + rect.top;
    window.scrollTo({
      top: containerTop + targetP * totalScroll,
      behavior: 'smooth',
    });
  };

  const isFramesMode = HERO.mode === 'frames';

  return (
    <div
      id="hero-section"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#2A1E18] select-none"
    >
      {/* ──────────────────────────────────────────────────────────── */}
      {/* FrameSequence 1920x1080 Canvas Engine (Garden -> Dawn -> Evening) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <FrameSequence
        ref={frameSequenceRef}
        activeScene={activeScene}
        className="z-0"
      />

      {/* ──────────────────────────────────────────────────────────── */}
      {/* SCENE 1: Typographic Overlay (0 - 35%)                       */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-500 pointer-events-none ${
          activeScene === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Soft contrast scrim layer */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isFramesMode
              ? 'bg-gradient-to-t from-[#2A1E18]/80 via-[#2A1E18]/25 to-[#2A1E18]/40'
              : 'bg-[#F5F0E6]/88 paper-texture'
          }`}
        />

        {/* Top-Right Doodles: Tick marks & Sparkles */}
        <div className="absolute top-24 right-12 hidden lg:flex items-center gap-4 pointer-events-auto">
          <TickMarksDoodle color={isFramesMode ? '#E6C08B' : '#6D4B38'} />
          <SparklesDoodle color={isFramesMode ? '#E6C08B' : '#AB653E'} />
        </div>

        {/* Photo B (Only in placeholder mode so frames mode stays clear & cinematic) */}
        {!isFramesMode && (
          <div
            ref={photoBRef}
            className="absolute -left-6 bottom-12 w-64 md:w-80 h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-[-3deg] hidden sm:block z-0 pointer-events-auto"
          >
            <Tape rotation={-8} className="-top-3 left-10" />
            <img
              src={assets.hero.dawnMisty}
              alt="Garden foliage close-up at Birds & Bees Cafeto"
              className="w-full h-full object-cover scale-105"
            />
          </div>
        )}

        {/* Photo A (Only in placeholder mode) */}
        {!isFramesMode && (
          <div
            ref={photoARef}
            className="absolute right-4 md:right-12 top-20 md:top-24 w-[75vw] sm:w-[48vw] md:w-[42vw] h-[55vh] md:h-[68vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-[1.5deg] z-10 pointer-events-auto bg-white"
          >
            <Tape rotation={6} className="-top-3 right-12" />
            <img
              src={assets.hero.greenhouse}
              alt="Greenhouse cafe dining room with glass roof and plants"
              className="w-full h-full object-cover"
            />

            {/* Stamp placed on photo corner */}
            <div className="absolute -bottom-3 -right-2 z-20">
              <Stamp variant="coral" rotation={-14} size={105} />
            </div>

            {/* Circle Check Doodle on photo */}
            <div className="absolute top-6 left-6 z-20 hidden md:block">
              <CircleCheckDoodle color="#F3FEFE" />
            </div>
          </div>
        )}

        {/* Giant Main Display Typography: "Birds" / "& Bees" */}
        <div
          ref={titleRef}
          className="absolute left-6 md:left-14 top-28 md:top-36 z-20 max-w-[85vw] pointer-events-none"
        >
          <div className="relative -left-4 -top-4 w-12 h-12">
            <SparklesDoodle color={isFramesMode ? '#E6C08B' : '#AB653E'} />
          </div>

          <h1
            className={`font-display font-semibold tracking-tight text-[clamp(4.2rem,14vw,14rem)] leading-[0.88] ${
              isFramesMode ? 'text-[#F3FEFE] drop-shadow-md' : 'text-[#2A1E18]'
            }`}
          >
            <span className="block transform hover:-translate-y-1 transition-transform pointer-events-auto">
              Birds
            </span>
            <span
              className={`block pl-[4vw] md:pl-[8vw] italic font-normal pointer-events-auto ${
                isFramesMode ? 'text-[#E6C08B]' : 'text-[#2A1E18]'
              }`}
            >
              &amp; Bees
            </span>
          </h1>

          {/* Dashed Loop Doodle with Looping Tiny Bee */}
          <div className="relative -mt-4 ml-8 md:ml-24 pointer-events-auto">
            <DashedLoopDoodle color={isFramesMode ? '#E6C08B' : '#AB653E'} />
            <div className="absolute top-2 left-20">
              <Bee size={22} flutter={true} />
            </div>
          </div>

          {/* Handwritten Annotation Sticker Tag */}
          <div className="mt-4 flex items-center gap-3 pointer-events-auto">
            <Sticker rotation={-3} type="leaf">
              <span className="font-hand text-lg md:text-xl font-bold text-[#2F5D3A] px-2 py-0.5">
                pure veg · scheme 71, indore
              </span>
            </Sticker>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* SCENE 2: Misty Dawn Full-Bleed Garden (35 - 70%)              */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 z-20 transition-opacity duration-500 pointer-events-none ${
          activeScene === 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Contrast Scrim for WCAG AA Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1E18]/85 via-[#2A1E18]/45 to-transparent pointer-events-none" />

        {/* Content Overlay */}
        <div className="hero-scene-2-text relative z-10 max-w-6xl mx-auto h-full px-8 flex flex-col justify-end pb-28 md:pb-36 pointer-events-auto">
          <div className="max-w-3xl">
            {/* Tag above title */}
            <span className="font-hand text-2xl text-[#E6C08B] block mb-2 -rotate-1">
              pure veg · est. in the garden
            </span>

            <h2 className="font-display font-medium text-5xl sm:text-7xl md:text-8xl text-[#F3FEFE] tracking-tight leading-[0.92] mb-4">
              Birds &amp; Bees
            </h2>

            <div className="relative inline-block">
              <p className="font-ui font-bold text-2xl sm:text-4xl text-[#E6C08B] tracking-wide">
                Nature lovers, welcome.
              </p>
              <WavyUnderlineDoodle color="#E6C08B" className="w-full mt-1" />
            </div>

            <p className="font-body text-lg md:text-xl text-[#CED9E1] mt-6 max-w-xl leading-relaxed">
              Indore&apos;s 100% pure vegetarian sanctuary. Come for the handcrafted food, slow coffees, and tranquil greenery.
            </p>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* SCENE 3: Golden Evening Twilight & Direct CTAs (70 - 100%)    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 z-30 transition-opacity duration-500 pointer-events-none ${
          activeScene === 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Warm golden-hour contrast scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1E18]/90 via-[#2A1E18]/50 to-[#2A1E18]/30 pointer-events-none" />

        {/* Content */}
        <div className="hero-scene-3-content relative z-10 max-w-6xl mx-auto h-full px-8 flex flex-col justify-center pointer-events-auto">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#F3FEFE] leading-[1.05] tracking-tight mb-4">
              Come for the food, <br />
              <span className="italic font-script text-[#E6C08B] font-normal text-5xl sm:text-7xl md:text-8xl">
                stay for the vibes.
              </span>
            </h2>

            <p className="font-body text-lg sm:text-xl text-[#CED9E1] mb-8 max-w-lg leading-relaxed">
              Tables fill fast during golden evenings. Reserve your garden corner or explore our handcrafted menu spreads.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <MagneticButton to="/book" variant="primary" size="lg">
                Book a Table
              </MagneticButton>
              <MagneticButton to="/menu" variant="outline" size="lg">
                See the Menu
              </MagneticButton>
            </div>

            {/* Live OpenTicket & Location info */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/15">
              <OpenTicket variant="full" />
              <span className="text-xs font-ui text-[#CED9E1]/80">
                Phooti Kothi Cir, Scheme 71, Indore
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* Pagination Dots (Bottom Center) & Scene Jump Controls        */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-[#2A1E18]/85 backdrop-blur-md px-4 py-2 rounded-full border-2 border-[#2A1E18] shadow-[3px_3px_0px_#2A1E18]">
        {[1, 2, 3].map((scene) => (
          <button
            key={scene}
            onClick={() => jumpToScene(scene)}
            className={`w-3.5 h-3.5 rounded-full border border-[#2A1E18] transition-all duration-300 ${
              activeScene === scene
                ? 'bg-[#E6C08B] scale-125 shadow-[1.5px_1.5px_0px_#2A1E18]'
                : 'bg-white/50 hover:bg-white shadow-[1px_1px_0px_#2A1E18]'
            } active:translate-x-[1px] active:translate-y-[1px]`}
            aria-label={`Jump to Hero Scene ${scene}`}
            title={`Scene 0${scene}`}
          />
        ))}
        <span className="text-[10px] font-mono text-white/80 ml-2 uppercase tracking-wider hidden sm:inline">
          SCENE 0{activeScene}
        </span>
      </div>
    </div>
  );
};
