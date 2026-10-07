import { assets } from './assets';

export type GalleryCategory = 'All' | 'Food' | 'Ambience' | 'Drinks' | 'Events';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  aspect: string; // e.g. "aspect-[3/4]", "aspect-[4/5]", "aspect-[16/10]"
  tapeRotation?: number;
  note: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Greenhouse Canopy at Morning',
    category: 'Ambience',
    image: assets.hero.greenhouse,
    aspect: 'aspect-[4/5]',
    tapeRotation: -4,
    note: 'quiet morning light',
  },
  {
    id: 'g2',
    title: 'Garden Pesto Tagliatelle',
    category: 'Food',
    image: assets.dishes.artisanalPasta,
    aspect: 'aspect-[1/1]',
    tapeRotation: 3,
    note: 'hand-rolled spinach pasta',
  },
  {
    id: 'g3',
    title: 'Signature Shakerato Cold Brew',
    category: 'Drinks',
    image: assets.dishes.coldCoffee,
    aspect: 'aspect-[3/4]',
    tapeRotation: -6,
    note: 'shaken over ice',
  },
  {
    id: 'g4',
    title: 'Courtyard Twilight String Lights',
    category: 'Ambience',
    image: assets.hero.courtyard,
    aspect: 'aspect-[16/10]',
    tapeRotation: 2,
    note: 'golden hour glow',
  },
  {
    id: 'g5',
    title: 'Heirloom Tomato Garden Tartine',
    category: 'Food',
    image: assets.dishes.gardenToast,
    aspect: 'aspect-[4/3]',
    tapeRotation: -3,
    note: 'whipped garden ricotta',
  },
  {
    id: 'g6',
    title: 'Ruby Botanical Spritz',
    category: 'Drinks',
    image: assets.dishes.citrusMocktail,
    aspect: 'aspect-[3/4]',
    tapeRotation: 5,
    note: 'zero-proof spritz',
  },
  {
    id: 'g7',
    title: 'Misty Dawn Jasmine Blossoms',
    category: 'Ambience',
    image: assets.hero.dawnMisty,
    aspect: 'aspect-[16/10]',
    tapeRotation: -2,
    note: 'morning dew on buds',
  },
  {
    id: 'g8',
    title: 'Artisanal Herb Creation',
    category: 'Food',
    image: assets.dishes.signature,
    aspect: 'aspect-[4/5]',
    tapeRotation: 4,
    note: 'seasonal garden plate',
  },
];
