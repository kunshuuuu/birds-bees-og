import React, { useState } from 'react';

interface ImageSlotProps {
  src?: string;
  alt: string;
  className?: string;
  aspect?: string; // e.g. "aspect-4/3", "aspect-16/9"
  priority?: boolean;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  src,
  alt,
  className = '',
  aspect = 'aspect-4/3',
  priority = false,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#F5F0E6] ${aspect} ${className}`}
    >
      {/* Resilient fallback or image */}
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F5F0E6] text-[#6D4B38]/60">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2 opacity-50">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span className="font-ui text-xs uppercase tracking-widest font-medium">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};
