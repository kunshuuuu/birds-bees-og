import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bee } from '../components/illustrations/Bee';
import { DashedLoopDoodle } from '../components/illustrations/DoodleDecorations';
import { MagneticButton } from '../components/animations/MagneticButton';

export const NotFound: React.FC = () => {
  const [beeLoops, setBeeLoops] = useState(0);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-12 flex flex-col items-center justify-center text-center bg-[#F5F0E6] paper-texture select-none">
      <div
        onClick={() => setBeeLoops((p) => p + 1)}
        className="relative mb-6 cursor-pointer"
        data-cursor="Buzz"
        title="Click the lost bee!"
      >
        <Bee size={88} variant="sticker" flutter={true} />
        <div className="absolute -top-6 -right-16 pointer-events-none">
          <DashedLoopDoodle color="#AB653E" />
        </div>
      </div>

      <span className="font-mono text-xs uppercase tracking-widest text-[#AB653E] font-bold mb-2">
        Error 404 · Garden Glade
      </span>

      <h1 className="font-display font-medium text-4xl sm:text-6xl text-[#2A1E18] tracking-tight mb-4">
        Looks like the bee took a wrong turn.
      </h1>

      <p className="font-hand text-2xl text-[#6D4B38] max-w-md mb-8">
        There is plenty of fresh nectar and shaded tables back along the garden path.
      </p>

      <div className="flex items-center gap-4">
        <Link to="/">
          <MagneticButton variant="primary" size="md">
            Take Me Home &rarr;
          </MagneticButton>
        </Link>
      </div>

      {beeLoops > 0 && (
        <span className="font-hand text-base text-[#2F5D3A] mt-6">
          bzz! (bee loops: {beeLoops})
        </span>
      )}
    </div>
  );
};
