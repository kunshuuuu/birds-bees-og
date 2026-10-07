export interface ReviewItem {
  id: string;
  name: string;
  text: string;
  stars: number;
  date: string;
  rotation: number;
  source: 'google' | 'guestbook';
  isPlaceholder: boolean;
}

export const reviews: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Ananya Sharma',
    text: 'A pure vegetarian haven that does not compromise on aesthetics or culinary craft. The iced coffee and spinach tagliatelle are out of this world.',
    stars: 5,
    date: 'February 2026',
    rotation: -2,
    source: 'google',
    isPlaceholder: true,
  },
  {
    id: 'r2',
    name: 'Vikramaditya Rao',
    text: 'Sat here reading for three hours with a cold brew shakerato. No rushing, just gentle breeze, leafy shade, and warm people.',
    stars: 5,
    date: 'January 2026',
    rotation: 1.5,
    source: 'guestbook',
    isPlaceholder: true,
  },
  {
    id: 'r3',
    name: 'Neha & Siddharth',
    text: 'We hosted a birthday brunch under the greenhouse glass roof. The presentation of the dishes and the zero-proof spritzes left everyone in awe.',
    stars: 5,
    date: 'March 2026',
    rotation: -1,
    source: 'google',
    isPlaceholder: true,
  },
  {
    id: 'r4',
    name: 'Karan Mehra',
    text: 'Best garden cafe in Indore by far. Wrought-iron tables, festoon fairy lights, and 100% vegetarian culinary creativity.',
    stars: 5,
    date: 'Recent Guest',
    rotation: 2.5,
    source: 'guestbook',
    isPlaceholder: true,
  },
  {
    id: 'r5',
    name: 'Meera Deshmukh',
    text: 'The burrata tartine and the cold brew tonic made my entire weekend. Thank you for building something with so much heart.',
    stars: 5,
    date: 'Recent Guest',
    rotation: -2.5,
    source: 'google',
    isPlaceholder: true,
  },
];
