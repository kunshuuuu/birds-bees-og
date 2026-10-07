import React, { useEffect, useState } from 'react';
import { Bee } from '../illustrations/Bee';

export const Cursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isCoarse, setIsCoarse] = useState(true);

  useEffect(() => {
    // Check coarse pointer or reduced motion
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsCoarse(coarse || reducedMotion);

    if (coarse || reducedMotion) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId: number;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      setVisible(true);

      const target = (e.target as HTMLElement)?.closest('[data-cursor], button, a, input, textarea');
      if (target) {
        setIsPointer(true);
        const cursorData = target.getAttribute('data-cursor');
        setLabel(cursorData);
      } else {
        setIsPointer(false);
        setLabel(null);
      }
    };

    const handlePointerLeave = () => {
      setVisible(false);
    };

    const lerp = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setRingPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(lerp);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.body.addEventListener('pointerleave', handlePointerLeave);
    animationFrameId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.body.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isCoarse || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Lagging outer ring */}
      <div
        className={`absolute rounded-full border border-[#AB653E]/60 flex items-center justify-center transition-[width,height,background-color] duration-200 -translate-x-1/2 -translate-y-1/2 ${
          label
            ? 'w-16 h-16 bg-[#2A1E18]/90 text-[#F3FEFE] border-transparent shadow-lg'
            : isPointer
            ? 'w-12 h-12 bg-[#AB653E]/15 border-[#AB653E]'
            : 'w-8 h-8'
        }`}
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
        }}
      >
        {label && (
          <span className="font-ui text-[10px] tracking-wider uppercase font-semibold text-center leading-none px-1">
            {label}
          </span>
        )}
      </div>

      {/* Center dot */}
      <div
        className="absolute w-2 h-2 rounded-full bg-[#AB653E] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />

      {/* Tiny companion bee following gently (§19 P1) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 pointer-events-none opacity-85"
        style={{
          left: `${ringPos.x + 22}px`,
          top: `${ringPos.y - 20}px`,
        }}
      >
        <Bee size={16} flutter={isPointer} />
      </div>
    </div>
  );
};
