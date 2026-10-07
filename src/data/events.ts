export interface EventItem {
  id: string;
  title: string;
  category: 'Live Music' | 'Brunches' | 'Special Evenings' | 'Offers';
  dateStr: string; // YYYY-MM-DD
  displayDay: string;
  displayMonth: string;
  time: string;
  description: string;
  isOffer?: boolean;
  couponCode?: string;
  isSample: boolean;
}

export const events: EventItem[] = [
  {
    id: 'e1',
    title: 'Acoustic Guitar in the Greenhouse',
    category: 'Live Music',
    dateStr: '2026-11-06',
    displayDay: '06',
    displayMonth: 'NOV',
    time: '19:30 IST',
    description: 'Unhurried folk melodies, candlelight, and warm pistachio tarts under the canopy.',
    isSample: true,
  },
  {
    id: 'e2',
    title: 'Golden Hour Garden Brunch',
    category: 'Brunches',
    dateStr: '2026-11-08',
    displayDay: '08',
    displayMonth: 'NOV',
    time: '11:30 IST',
    description: 'Freshly baked sourdough baskets, whipped herb ricotta, and sparkling citrus tonics.',
    isSample: true,
  },
  {
    id: 'e3',
    title: 'Indore Nature Lovers Meetup',
    category: 'Special Evenings',
    dateStr: '2026-11-15',
    displayDay: '15',
    displayMonth: 'NOV',
    time: '18:00 IST',
    description: 'Casual botanical conversations, tea tasting, and seed paper bookmark crafts.',
    isSample: true,
  },
  {
    id: 'e4',
    title: 'First Visit Garden Welcome Offer',
    category: 'Offers',
    dateStr: '2026-12-31',
    displayDay: '★',
    displayMonth: 'OFFER',
    time: 'All Day',
    description: 'Show this digital coupon to receive a complimentary cold brew shakerato with any main.',
    isOffer: true,
    couponCode: 'GARDENBEE26',
    isSample: true,
  },
];
