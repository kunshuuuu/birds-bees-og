import React, { useState } from 'react';
import { events, EventItem } from '../data/events';
import { downloadIcs } from '../lib/ics';
import { site } from '../lib/site';
import { MagneticButton } from '../components/animations/MagneticButton';

export const Events: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Live Music' | 'Brunches' | 'Offers'>('All');

  const filtered = events.filter((e) => {
    if (filter === 'All') return true;
    return e.category === filter;
  });

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 sm:px-12 bg-[#F3FEFE]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] block mb-2">
          Gatherings &amp; Offers · Scheme 71, Indore
        </span>
        <h1 className="font-display font-medium text-5xl sm:text-7xl text-[#2A1E18] tracking-tight mb-3">
          Evenings worth planning.
        </h1>
        <p className="font-hand text-2xl sm:text-3xl text-[#6D4B38]">
          acoustic guitars, golden hour brunches, and special sips.
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 max-w-md mx-auto">
          {(['All', 'Live Music', 'Brunches', 'Offers'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`py-1.5 px-4 rounded-full font-ui text-xs font-bold uppercase tracking-wider border-2 border-[#2A1E18] transition-all duration-150 ${
                filter === cat
                  ? 'bg-[#AB653E] text-white shadow-[2.5px_2.5px_0px_#2A1E18]'
                  : 'bg-white text-[#6D4B38] hover:text-[#2A1E18] hover:bg-[#E6C08B] shadow-[1.5px_1.5px_0px_#2A1E18]'
              } active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Stub Cards Grid (§12) */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`relative bg-[#F5F0E6] paper-texture rounded-2xl p-6 sm:p-8 border-2 border-[#CED9E1] shadow-lg flex flex-col justify-between ${
              item.isOffer ? 'border-dashed border-[#AB653E]' : ''
            }`}
          >
            {/* Perforated Side Notches */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#F3FEFE] border-r-2 border-[#CED9E1]" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#F3FEFE] border-l-2 border-[#CED9E1]" />

            <div>
              {/* Header row with Date Stub */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="bg-[#2A1E18] text-[#F3FEFE] rounded-xl px-4 py-2 text-center min-w-[70px]">
                  <span className="font-display text-2xl font-bold block leading-none">
                    {item.displayDay}
                  </span>
                  <span className="font-ui text-[10px] uppercase font-bold tracking-widest text-[#E6C08B]">
                    {item.displayMonth}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full bg-[#AB653E]/10 text-[#AB653E] font-bold">
                    {item.category}
                  </span>
                  <span className="block text-xs font-mono text-[#6D4B38] mt-1">
                    {item.time}
                  </span>
                </div>
              </div>

              <h2 className="font-display font-medium text-2xl text-[#2A1E18] mb-2">
                {item.title}
              </h2>
              <p className="font-body text-sm text-[#6D4B38] leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            {/* Actions: Add to Calendar or Coupon */}
            <div className="pt-4 border-t border-[#6D4B38]/15 flex items-center justify-between">
              {item.isOffer ? (
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-[#E6C08B] px-2 py-1 rounded-sm text-[#2A1E18] border-2 border-[#2A1E18] shadow-[1.5px_1.5px_0px_#2A1E18]">
                    CODE: {item.couponCode}
                  </span>
                  <span className="font-hand text-sm text-[#2F5D3A]">
                    show at counter
                  </span>
                </div>
              ) : (
                <button
                  onClick={() =>
                    downloadIcs({
                      title: item.title,
                      description: item.description,
                      location: `${site.address.line1}, ${site.address.city}`,
                      startDate: item.dateStr,
                      startTime: '19:00',
                    })
                  }
                  className="px-3 py-1.5 rounded-full font-ui text-xs font-bold uppercase text-[#2A1E18] bg-white border-2 border-[#2A1E18] shadow-[2px_2px_0px_#2A1E18] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2A1E18] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-1.5"
                >
                  📅 Add to Calendar (.ics)
                </button>
              )}

              <MagneticButton
                to="/book"
                variant="dark"
                size="sm"
              >
                Reserve Table &rarr;
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
