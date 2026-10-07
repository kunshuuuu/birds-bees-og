import React, { useState } from 'react';
import { reviews, ReviewItem } from '../data/reviews';
import { PostageStamp } from '../components/materials/PostageStamp';
import { Stamp } from '../components/materials/Stamp';
import { site } from '../lib/site';

export const Testimonials: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 sm:px-12 bg-[#F3FEFE]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] block mb-2">
          Guestbook &amp; Notes
        </span>
        <h1 className="font-display font-medium text-5xl sm:text-7xl text-[#2A1E18] tracking-tight mb-3">
          Kind words, pinned up.
        </h1>
        <p className="font-hand text-2xl sm:text-3xl text-[#6D4B38]">
          from afternoons spent lingering under the canopy.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-xs font-mono uppercase text-[#6D4B38] bg-[#E6C08B]/30 px-3 py-1 rounded-full border border-[#E6C08B]">
            Google Rating: Coming Soon (Client Verified)
          </span>
          {site.links.googleReview ? (
            <a
              href={site.links.googleReview}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-ui font-bold uppercase text-[#AB653E] hover:underline"
            >
              Leave us a note ↗
            </a>
          ) : (
            <span className="text-xs font-ui text-[#6D4B38]/50 italic">
              Review link coming soon
            </span>
          )}
        </div>
      </div>

      {/* Tactile Pinboard Grid (§13) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            onClick={() => setSelectedReview(rev)}
            className="relative bg-[#F5F0E6] paper-texture rounded-2xl p-6 sm:p-8 border-2 border-[#CED9E1] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer select-none"
            style={{
              transform: `rotate(${rev.rotation}deg)`,
            }}
            data-cursor="Peek"
          >
            {/* Black Pushpin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#2A1E18] shadow-md border-2 border-white pointer-events-none" />

            {/* Coral Placeholder Marker */}
            {rev.isPlaceholder && (
              <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-wider text-[#E58F78] border border-[#E58F78]/50 px-1 rounded-xs">
                SAMPLE GUEST NOTE
              </span>
            )}

            {/* Postage Stamp */}
            <div className="absolute top-3 right-3 scale-75 origin-top-right">
              <PostageStamp label="NOTE" value="INDORE" />
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-1 text-[#AB653E] mt-6 mb-4">
              {Array.from({ length: rev.stars }).map((_, i) => (
                <span key={i} className="text-base">★</span>
              ))}
            </div>

            <p className="font-body text-base text-[#2A1E18] italic leading-relaxed mb-6">
              &ldquo;{rev.text}&rdquo;
            </p>

            <div className="flex items-center justify-between border-t border-[#6D4B38]/15 pt-3">
              <div>
                <p className="font-ui font-bold text-sm text-[#2A1E18]">{rev.name}</p>
                <p className="font-ui text-xs text-[#6D4B38]/70">{rev.date}</p>
              </div>
              <Stamp variant="leaf" size={65} rotation={-4} />
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Review Modal */}
      {selectedReview && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="relative max-w-md w-full bg-[#F5F0E6] paper-texture p-8 rounded-2xl border-4 border-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white text-[#2A1E18] border-2 border-[#2A1E18] shadow-[2px_2px_0px_#2A1E18] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center font-bold text-xs hover:bg-[#AB653E] hover:text-white"
              aria-label="Close review dialog"
            >
              ✕
            </button>
            <div className="flex items-center gap-1 text-[#AB653E] text-lg mb-3">
              {Array.from({ length: selectedReview.stars }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="font-body text-lg text-[#2A1E18] italic leading-relaxed mb-6">
              &ldquo;{selectedReview.text}&rdquo;
            </p>
            <div className="border-t border-[#6D4B38]/20 pt-3">
              <p className="font-display font-medium text-lg text-[#2A1E18]">{selectedReview.name}</p>
              <p className="font-ui text-xs text-[#6D4B38]">{selectedReview.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
