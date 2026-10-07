import React, { useState } from 'react';
import { FlipBook } from '../components/book/FlipBook';
import { menuItems, MenuMood } from '../data/menu';
import { MagneticButton } from '../components/animations/MagneticButton';
import { Bee } from '../components/illustrations/Bee';

export const Menu: React.FC = () => {
  const [viewMode, setViewMode] = useState<'book' | 'list'>('book');
  const [selectedMood, setSelectedMood] = useState<MenuMood | 'All'>('All');
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    if (selectedMood === 'All') return true;
    return item.mood === selectedMood;
  });

  const moods: (MenuMood | 'All')[] = ['All', 'Cosy', 'Caffeinated', 'Fresh', 'Sweet'];

  const handleDownloadPdf = () => {
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 3000);
  };

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 sm:px-12 bg-[#F3FEFE]">
      {/* Dev / Sample Menu Notice (§9.5) */}
      <div className="max-w-5xl mx-auto mb-8 p-3 rounded-xl bg-[#E6C08B]/25 border border-[#E6C08B] text-xs font-mono text-[#6D4B38] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#AB653E]">SAMPLE MENU BANNER:</span>
          <span>Sample items shown. Ready for client final price &amp; menu data replacement in `src/data/menu.ts`.</span>
        </div>
        <Bee size={18} />
      </div>

      {/* Page Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] block mb-2">
          100% Pure Vegetarian Garden Kitchen
        </span>
        <h1 className="font-display font-medium text-5xl sm:text-7xl text-[#2A1E18] tracking-tight mb-3">
          Eat something good.
        </h1>
        <p className="font-hand text-2xl sm:text-3xl text-[#6D4B38]">
          cooked with patience, served under the leaves.
        </p>

        {/* View Controls & Mood Filter (§19 P2) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Book vs Plain List Toggle */}
          <div className="flex items-center gap-2 p-1">
            <button
              onClick={() => setViewMode('book')}
              className={`px-4 py-2 rounded-full font-ui text-xs font-bold uppercase tracking-wider border-2 border-[#2A1E18] transition-all duration-150 ${
                viewMode === 'book'
                  ? 'bg-[#2A1E18] text-[#F3FEFE] shadow-[3px_3px_0px_#2A1E18] translate-x-[1px] translate-y-[1px]'
                  : 'bg-white text-[#6D4B38] shadow-[2px_2px_0px_#2A1E18] hover:text-[#2A1E18] hover:bg-[#E6C08B]'
              } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
            >
              📖 Interactive Book
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-full font-ui text-xs font-bold uppercase tracking-wider border-2 border-[#2A1E18] transition-all duration-150 ${
                viewMode === 'list'
                  ? 'bg-[#2A1E18] text-[#F3FEFE] shadow-[3px_3px_0px_#2A1E18] translate-x-[1px] translate-y-[1px]'
                  : 'bg-white text-[#6D4B38] shadow-[2px_2px_0px_#2A1E18] hover:text-[#2A1E18] hover:bg-[#E6C08B]'
              } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
            >
              📋 Plain List View
            </button>
          </div>

          {/* Mood Filter Chips (§19 P2) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-3 py-1.5 rounded-full font-ui text-[11px] font-bold uppercase tracking-wide border-2 border-[#2A1E18] transition-all duration-150 ${
                  selectedMood === mood
                    ? 'bg-[#AB653E] text-white shadow-[2px_2px_0px_#2A1E18]'
                    : 'bg-white text-[#6D4B38] hover:text-[#2A1E18] hover:bg-[#E6C08B] shadow-[1.5px_1.5px_0px_#2A1E18]'
                } active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none`}
              >
                {mood}
              </button>
            ))}
          </div>

          {/* Download PDF Button */}
          <MagneticButton
            type="button"
            onClick={handleDownloadPdf}
            variant="outline"
            size="sm"
          >
            {pdfDownloaded ? '✓ Menu PDF Queued' : 'Download PDF ↗'}
          </MagneticButton>
        </div>
      </div>

      {/* Main View Area */}
      <div className="max-w-6xl mx-auto">
        {viewMode === 'book' ? (
          <FlipBook />
        ) : (
          /* Plain Accessible Categorised List View (§9.6) */
          <div className="bg-[#F5F0E6] paper-texture rounded-2xl p-8 sm:p-12 border border-[#CED9E1] shadow-lg max-w-4xl mx-auto">
            <h2 className="font-display font-medium text-3xl text-[#2A1E18] mb-6 border-b border-[#6D4B38]/20 pb-3">
              Full Garden Menu ({filteredItems.length} items)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="border-b border-[#6D4B38]/10 pb-4">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-ui font-bold text-base text-[#2A1E18]">
                      {item.name}
                    </span>
                    <span className="font-ui font-bold text-base text-[#AB653E] tabular-nums whitespace-nowrap">
                      ₹ {item.price}
                    </span>
                  </div>
                  <p className="font-body text-sm text-[#6D4B38] mb-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-sm bg-[#2F5D3A]/10 text-[#2F5D3A] font-semibold">
                      100% Pure Veg
                    </span>
                    {item.note && (
                      <span className="font-hand text-sm text-[#AB653E]">
                        &ldquo;{item.note}&rdquo;
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
