# Birds & Bees Cafeto

Awwwards-grade botanical garden cafe website for **Birds & Bees Cafeto** — a 100% pure-vegetarian garden sanctuary located in Scheme 71, Indore, Madhya Pradesh, India.

> Brand Line: *"Nature lovers, welcome. Come for the food, stay for the vibes."*

---

## 🌿 Overview of Key Features

1. **Preloader (§8.1 Signature ①):** Stroke-drawing gold line-art emblem, tiny looping bee with wing flutter, calligraphic script wordmark write-on, tabular progress percentage, and 5 vertical slats shutter wipe.
2. **Hero (§8.2 Signature ②):** Pinned 3-scene story:
   - *Scene 1 (Paper Collage):* Asymmetric layout with greenhouse photography, bleeding leaf macro, giant *"Birds & Bees"* typography with type inversion over photos, sparkles, dashed loop with bee, and stickers.
   - *Scene 2 (Misty Dawn):* Full-bleed dawn garden with contrast scrim and self-drawing wavy underline.
   - *Scene 3 (Golden Evening):* Twilight garden with *"Come for the food, stay for the vibes."*, live `OpenTicket` badge, and direct reservation CTAs.
3. **Photo Marquee (§8.3):** Edge-to-edge seamless photo strip with zero gaps, uppercase captions, and hover pause.
4. **Statement (§8.3b):** Scroll-scrub editorial ragged text with per-word color progression and a crossing bee.
5. **Intro Collage (§8.4):** Interactive card-shuffling photo stack, washi tape, stamps, and chef's pick doodle.
6. **Signature Plates (§8.5):** Coverflow cards track with washi tape, black pinned labels, right-aligned prices, handwritten notes, and segment progress dots.
7. **Good-Vibes Cards (§8.6) & Pocket Phone Peek (§8.7):** Animated 0 → 100% vegetarian counter, cream cards carousel with side sheet modals, and CSS-drawn phone frame with live mini-render.
8. **Menu-Book Teaser (§8.8) & Interactive Menu Book (§9 Signature ③):**
   - 3D physical hardcover volume with center spine gutter, page thickness, and paper grain.
   - Type E (Editorial) and Type L (List) spreads.
   - Category ribbon bookmarks (`Starters`, `Mains`, `Sips`, `Desserts`).
   - Accessible Plain List view toggle with mood filter chips (*Cosy*, *Caffeinated*, *Fresh*, *Sweet*).
9. **Bee CTA Break (§8.9):** Illustrated sticker bee on a dashed loop (interactive flight wobble on click), handwritten script, rust pill CTA, and postage stamp.
10. **Postcards from the Garden (§8.10) & Testimonials Pinboard (§13):** Tactile cream postcards pinned with black pushpins, star ratings, and interactive cycling.
11. **Reservation Flow (§14):**
    - Sticky live receipt ticket that updates dynamically.
    - 5-step form (Date, Slots, Party, Details, Confirmation).
    - Synchronous capacity checking and duplicate booking prevention.
    - Calendar `.ics` file generation and download.
12. **Staff Reservation Board (`/admin`):** Filter by date/status, details drawer, status transitions, and CSV export.
13. **Contact Page (§15 Signature ⑤):** Flat vector illustrated map card with Scheme 71 landmarks, pulsing pin, and flying postcard form.
14. **Events & Offers (§12):** Perforated ticket stubs, calendar `.ics` download, and digital coupon cards.
15. **About Page (§11):** 5 distinct chapters (Why Birds & Bees, The Living Architecture with interactive hotspots, The 100% Veg Rule with stamp, Vinyl Soundtrack with ambient sound toggle, and 01–05 Field Notes).
16. **Careers / Hire (`/hire` §16):** Expandable job slips and client-side resume validation (PDF/DOC/DOCX ≤ 5MB).
17. **Custom 404 (`not-found` §17):** Lost bee wandering on a dashed path with click loop counter.
18. **Footer (§18 Signature ⑥):**
    - Day / Evening / Night atmospheric scrubber bar with live IST clock (`Asia/Kolkata`).
    - Layered SVG twilight landscape with dynamic sky gradients, mountain silhouettes, tree canopies, and little houses with yellow windows that glow in Evening/Night modes.
    - Giant cursor-reactive *"BIRDS & BEES"* wordmark with gentle wave tilts.
    - Dark footer band with navigation and newsletter subscription.

---

## 🛠 Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Routing:** HashRouter (robust preview iframe support)
- **Styling:** Tailwind CSS + Handcrafted CSS Variables & Tokens
- **Motion:** GSAP + ScrollTrigger, Lenis Smooth Scroll
- **Validation:** Zod v3
- **Icons & Material Realism:** SVG inline components, Washi tape, Die-cut stickers, Eroded rubber stamps, Perforated postage stamps.

---

## 🚀 Setup & Local Development

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run TypeScript check / linter
npm run lint

# Build for production
npm run build
```

---

## 📋 Client Assets Still Required (Appendix C)

- [ ] Hero frame sequence or hero video (`/public/frames/frame_0001.webp...` or `.mp4`)
- [ ] Final logo mark and custom brand fonts (*Betterlett Regular*, *Kalico Swash*)
- [ ] Real cafe photographs (food, drinks, garden seating)
- [ ] Final menu dishes and verified prices in `src/data/menu.ts`
- [ ] Verified Instagram URL in `src/lib/site.ts`
- [ ] Verified WhatsApp phone number in `src/lib/site.ts`
- [ ] Verified phone and email contact info in `src/lib/site.ts`
- [ ] Confirmed operating hours
- [ ] Verified Google Business Profile & review link in `src/lib/site.ts`
- [ ] Confirmed events and live music schedule in `src/data/events.ts`
- [ ] Real booking capacity (tables/seats per slot) in `src/lib/site.ts`
- [ ] Actual menu PDF for download
