import React from 'react';
import { Hero } from '../components/hero/Hero';
import { Marquee } from '../components/home/Marquee';
import { Statement } from '../components/home/Statement';
import { IntroCollage } from '../components/home/IntroCollage';
import { SignaturePlates } from '../components/home/SignaturePlates';
import { GoodVibesCards } from '../components/home/GoodVibesCards';
import { MenuTeaser } from '../components/home/MenuTeaser';
import { BeeCtaBreak } from '../components/home/BeeCtaBreak';
import { PostcardsTeaser } from '../components/home/PostcardsTeaser';
import { ReservationBand } from '../components/home/ReservationBand';
import { FindUsStrip } from '../components/home/FindUsStrip';
import { Footer } from '../components/layout/Footer';

export const Home: React.FC<{ isReady?: boolean }> = ({ isReady = true }) => {
  return (
    <main className="w-full">
      {/* 8.2 Hero: Pinned 3 Scenes */}
      <Hero isReady={isReady} />

      {/* 8.3 Photo Marquee: Edge to Edge */}
      <Marquee />

      {/* 8.3b Statement: Color-Scrub Editorial Prose */}
      <Statement />

      {/* 8.4 Intro Collage: Nature Lovers, Welcome */}
      <IntroCollage />

      {/* 8.5 Signature Plates: Pinned Coverflow Scroller */}
      <SignaturePlates />

      {/* 8.6 & 8.7 Good-Vibes 100% Counter + Cards + Pocket Phone Peek */}
      <GoodVibesCards />

      {/* 8.8 Menu-Book Teaser: Hardcover 3D Spread */}
      <MenuTeaser />

      {/* 8.9 Bee CTA Break: Quiet Breathing Section */}
      <BeeCtaBreak />

      {/* 8.10 Postcards from the Garden: Draggable / Cyclable Testimonials */}
      <PostcardsTeaser />

      {/* 8.11 Reservation Band: Dark Coffee-Bean Quick Reserve */}
      <ReservationBand />

      {/* 8.12 Find-Us Strip: Live Ticket & Location Details */}
      <FindUsStrip />

      {/* 18 Footer: Day/Evening/Night Scrubber + Landscape + Wordmark */}
      <Footer />
    </main>
  );
};
