import React, { useState } from 'react';
import { galleryItems, GalleryCategory, GalleryItem } from '../data/gallery';
import { Tape } from '../components/materials/Tape';
import { Sticker } from '../components/materials/Sticker';
import { Bee } from '../components/illustrations/Bee';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories: GalleryCategory[] = ['All', 'Food', 'Ambience', 'Drinks'];

  const filtered = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 sm:px-12 bg-[#F3FEFE]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] block mb-2">
          Visual Memories · Scheme 71, Indore
        </span>
        <h1 className="font-display font-medium text-5xl sm:text-7xl text-[#2A1E18] tracking-tight mb-3">
          A little look around.
        </h1>
        <p className="font-hand text-2xl sm:text-3xl text-[#6D4B38]">
          hover for the story, tap to peek closer.
        </p>

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 max-w-md mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-1.5 px-4 rounded-full font-ui text-xs font-bold uppercase tracking-wider border-2 border-[#2A1E18] transition-all duration-150 ${
                selectedCategory === cat
                  ? 'bg-[#AB653E] text-white shadow-[2.5px_2.5px_0px_#2A1E18]'
                  : 'bg-white text-[#6D4B38] hover:text-[#2A1E18] hover:bg-[#E6C08B] shadow-[1.5px_1.5px_0px_#2A1E18]'
              } active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Editorial Masonry Grid (§10) */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="break-inside-avoid relative bg-[#F5F0E6] p-3 rounded-2xl border border-[#CED9E1] shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1.5"
            style={{
              transform: `rotate(${idx % 2 === 0 ? -1 : 1.5}deg)`,
            }}
            data-cursor="Peek"
          >
            {item.tapeRotation && (
              <Tape rotation={item.tapeRotation} className="-top-3 left-8 z-10" />
            )}

            <div className={`w-full overflow-hidden rounded-xl bg-white ${item.aspect}`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
              />
            </div>

            <div className="pt-3 pb-1 px-1 flex items-baseline justify-between">
              <div>
                <h3 className="font-display font-medium text-lg text-[#2A1E18]">
                  {item.title}
                </h3>
                <span className="font-hand text-base text-[#AB653E]">
                  &ldquo;{item.note}&rdquo;
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-[#2A1E18]/10 px-2 py-0.5 rounded-sm text-[#2A1E18]">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal (§10) */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#2A1E18]/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#F5F0E6] p-4 sm:p-6 rounded-2xl shadow-2xl border-4 border-white select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white text-[#2A1E18] border-2 border-[#2A1E18] shadow-[2.5px_2.5px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none flex items-center justify-center font-bold text-sm hover:bg-[#AB653E] hover:text-white transition-all duration-150"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-white">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl text-[#2A1E18]">
                  {activeItem.title}
                </h2>
                <p className="font-hand text-xl text-[#AB653E]">
                  &ldquo;{activeItem.note}&rdquo;
                </p>
              </div>
              <span className="text-xs font-mono uppercase text-[#6D4B38]">
                {activeItem.category} Archive
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
