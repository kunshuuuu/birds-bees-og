import React, { useEffect, useState, useRef } from 'react';
import { Bee } from '../illustrations/Bee';
import { assets } from '../../data/assets';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [slatsExited, setSlatsExited] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    // Check if repeat visit or reduced motion (§8.1)
    const hasVisited = sessionStorage.getItem('bb_visited');
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maxDuration = isReduced || hasVisited ? 700 : 2500;

    let startTime = performance.now();
    let assetsLoaded = false;

    // 1. Check real asset readiness: fonts and critical hero photography
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = assets.hero.greenhouse;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }),
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = assets.hero.dawnMisty;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }),
    ]).then(() => {
      assetsLoaded = true;
    });

    const finishPreloader = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      setProgress(100);

      // Trigger 5 vertical shutter exit wipe (§8.1)
      setTimeout(() => {
        setExiting(true);
        sessionStorage.setItem('bb_visited', 'true');

        setTimeout(() => {
          setSlatsExited(true);
          onComplete();
        }, 650);
      }, 180);
    };

    const updateFrame = (now: number) => {
      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / maxDuration);

      // If assets loaded early, ramp smoothly to 100%
      let targetProgress = Math.round(timeRatio * 100);
      if (assetsLoaded && elapsed > 1200) {
        targetProgress = Math.max(targetProgress, Math.min(100, Math.round((elapsed / 1600) * 100)));
      }

      const clamped = Math.min(100, targetProgress);
      setProgress(clamped);

      if (clamped < 100 && !completedRef.current) {
        animFrameRef.current = requestAnimationFrame(updateFrame);
      } else {
        finishPreloader();
      }
    };

    animFrameRef.current = requestAnimationFrame(updateFrame);

    // Fast-skip on any user click or keypress (§8.1)
    const handleSkip = () => {
      if (!completedRef.current) {
        finishPreloader();
      }
    };

    window.addEventListener('keydown', handleSkip, { once: true });
    window.addEventListener('click', handleSkip, { once: true });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, [onComplete]);

  if (slatsExited) return null;

  // Flight path calculations for tiny bee entering and landing on "Bees"
  const beeX = -120 + progress * 2.2;
  const beeY = Math.sin(progress * 0.12) * 24 + (progress > 60 && progress < 85 ? -35 : 0);
  const beeLanded = progress >= 88;

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Birds & Bees Cafeto"
      className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center overflow-hidden cursor-pointer"
      title="Click or press any key to skip"
    >
      {/* 5 Vertical Shutter Slats (Video A Signature Exit Wipe) */}
      <div className="absolute inset-0 flex pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 h-full bg-[#2A1E18] transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] border-r border-[#3B2C24]/40 last:border-none"
            style={{
              transform: exiting ? 'translateY(-100%)' : 'translateY(0%)',
              transitionDelay: `${i * 60}ms`,
            }}
          />
        ))}
      </div>

      {/* Illustrated corner coffee beans texture (Video C) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          exiting ? 'opacity-0' : 'opacity-15'
        }`}
      >
        <div className="absolute top-8 left-8 text-3xl rotate-12 select-none">☕</div>
        <div className="absolute top-12 right-12 text-2xl -rotate-15 select-none">☕</div>
        <div className="absolute bottom-12 left-10 text-2xl rotate-45 select-none">☕</div>
        <div className="absolute bottom-8 right-8 text-3xl -rotate-45 select-none">☕</div>
      </div>

      {/* Center Preloader Signature Choreography */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center gap-6 px-6 text-center select-none transition-all duration-400 ${
          exiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Real Authentic Wood Stamp Logo */}
        <div className="relative flex items-center justify-center">
          <div className="relative">
            <img
              src="/logos/logo-wood.png"
              alt="Birds & Bees Cafeto logo"
              className="w-44 sm:w-52 h-auto object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out"
            />
          </div>

          {/* Dashed Looping Flight Arc with Tiny Bee */}
          <div
            className="absolute top-1/2 left-1/2 pointer-events-none transition-transform duration-75"
            style={{
              transform: `translate(${beeLanded ? 56 : beeX}px, ${beeLanded ? -8 : beeY}px)`,
            }}
          >
            <Bee size={24} flutter={!beeLanded} />
          </div>
        </div>

        {/* Wordmark & Subtitle */}
        <div className="flex flex-col items-center mt-1">
          <span
            className="font-ui text-[11px] font-bold text-[#E6C08B] uppercase tracking-[0.3em] transition-[letter-spacing,opacity] duration-500"
            style={{
              opacity: progress > 20 ? 1 : progress / 20,
            }}
          >
            100% PURE VEGETARIAN · SCHEME 71, INDORE
          </span>
        </div>

        {/* 2px Progress Bar & Tabular Percentage */}
        <div className="w-60 flex flex-col items-center gap-2 mt-1">
          <div className="w-full h-[2px] bg-[#6D4B38]/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E6C08B] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-[10px] font-mono tracking-wider text-[#CED9E1]/80">
            <span>BREWING THE GARDEN...</span>
            <span className="tabular-nums font-semibold text-[#E6C08B]">{progress}%</span>
          </div>
        </div>

        {/* Quiet skip hint */}
        <span className="text-[10px] font-hand text-[#CED9E1]/50 tracking-wider -mt-3">
          click anywhere to skip &rarr;
        </span>
      </div>
    </div>
  );
};
