import React, { useState } from 'react';

interface StickerProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
  interactive?: boolean;
  type?: 'bee' | 'leaf' | 'bird' | 'stamp' | 'badge';
  onClick?: () => void;
}

export const Sticker: React.FC<StickerProps> = ({
  children,
  className = '',
  rotation = 0,
  interactive = true,
  type = 'badge',
  onClick,
}) => {
  const [wobble, setWobble] = useState(false);

  const handleClick = () => {
    if (interactive) {
      setWobble(true);
      setTimeout(() => setWobble(false), 800);
    }
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block transition-transform duration-300 ease-out select-none ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${wobble ? 'animate-bounce' : ''} ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        filter: 'drop-shadow(0 6px 14px rgba(42, 30, 24, 0.16))',
      }}
      data-cursor={type === 'bee' ? 'Buzz' : 'Peek'}
    >
      <div className="rounded-xl border-[5px] border-white bg-white/95 p-1 transition-all">
        {children}
      </div>
    </div>
  );
};
