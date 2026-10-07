export interface JobRole {
  id: string;
  num: string;
  title: string;
  type: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const jobs: JobRole[] = [
  {
    id: 'barista',
    num: '01',
    title: 'Head Artisan Barista',
    type: 'Full-time',
    location: 'Scheme 71, Indore',
    description: 'Lead our specialty coffee bar: single origin manual brews, signature cold shakeratos, and plant milk steam consistency.',
    responsibilities: [
      'Calibrate espresso extractions and slow-drip towers daily.',
      'Train junior bar staff on specialty pouring and latte art.',
      'Maintain pristine equipment hygiene and inventory controls.',
    ],
    requirements: [
      '1+ years experience with specialty coffee and manual brewing.',
      'Deep passion for sensory notes and patient hospitality.',
    ],
  },
  {
    id: 'pastry-cook',
    num: '02',
    title: 'Vegetarian Pastry & Bread Baker',
    type: 'Full-time / Part-time',
    location: 'Scheme 71, Indore',
    description: 'Craft fresh daily sourdough loaves, brioche buns, frangipane tarts, and burnt Basque cheesecakes.',
    responsibilities: [
      'Early morning dough kneading, proofing, and baking.',
      'Prepare delicate dessert garnishes and botanical glazes.',
      'Uphold strict pure vegetarian culinary standards.',
    ],
    requirements: [
      'Baking experience in boutique bakery or high-volume cafe.',
      'Keen eye for artisanal presentation and texture.',
    ],
  },
  {
    id: 'floor-host',
    num: '03',
    title: 'Garden Floor Host & Captain',
    type: 'Full-time',
    location: 'Scheme 71, Indore',
    description: 'The warm face of our garden sanctuary. Welcoming guests, seating reservations, and orchestrating afternoon flow.',
    responsibilities: [
      'Manage table turn-arounds and reservation ticket flow.',
      'Describe menu creations with knowledge and warmth.',
      'Ensure every guest feels unhurried and cared for.',
    ],
    requirements: [
      'Warm conversational communication in Hindi and English.',
      'Hospitality mindset: attentive, kind, and calm under pressure.',
    ],
  },
];
