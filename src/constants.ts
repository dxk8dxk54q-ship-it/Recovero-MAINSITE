export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Breakdown', href: '/breakdown-recovery' },
  { name: 'Accident', href: '/accident-recovery' },
  { name: 'Transport', href: '/vehicle-transport' },
  { 
    name: 'Areas We Cover', 
    href: '/#locations',
    subLinks: [
      { name: 'Portsmouth', href: '/portsmouth-recovery' },
      { name: 'Havant', href: '/havant-recovery' },
      { name: 'Fareham', href: '/fareham-recovery' },
      { name: 'Gosport', href: '/gosport-recovery' },
      { name: 'Waterlooville', href: '/waterlooville-recovery' },
      { name: 'Petersfield', href: '/petersfield-recovery' },
      { name: 'Winchester', href: '/winchester-recovery' },
      { name: 'Andover', href: '/andover-recovery' },
      { name: 'Hayling Island', href: '/hayling-island-recovery' },
    ]
  },
  { name: 'Terms', href: '/#terms' },
];

export const SERVICES = [
  {
    title: 'Vehicle Transport',
    image: 'https://images.unsplash.com/photo-1600706432502-77a0e2e3277e?q=80&w=800&auto=format&fit=crop',
    description: 'Rapid-response vehicles for safe transport of luxury, classic, and everyday cars.',
    href: '/vehicle-transport'
  },
  {
    title: 'Breakdown Assistance',
    image: 'https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/roadside-issues.jpg?raw=true',
    description: 'Our network of vetted specialists provides the fastest roadside recovery for all breakdowns.',
    href: '/breakdown-recovery'
  },
  {
    title: 'Accident Recovery',
    image: 'https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/accident-recovery.jpg?raw=true',
    description: 'Immediate dispatch of recovery specialists for vehicles involved in accidents.',
    href: '/accident-recovery'
  },
];

export const FAQS = [
  {
    question: 'How quickly can you get to me?',
    answer: 'We dispatch the nearest specialist in our network immediately to ensure the fastest possible response time.',
  },
  {
    question: 'Do you cover Havant and nearby areas?',
    answer: 'Yes, we cover Havant and surrounding areas including Waterlooville, Bedhampton, Leigh Park and nearby locations.',
  },
  {
    question: 'Can you recover non-runners?',
    answer: 'Yes, we handle non-runners, breakdowns, and vehicles that won’t start.',
  },
  {
    question: 'Do you cover vans and motorcycles?',
    answer: 'Yes, we cover cars, vans, and motorcycles in most cases.',
  },
  {
    question: 'Can I get a price before recovery is arranged?',
    answer: 'Yes, you’ll be given the price before any recovery is confirmed.',
  },
  {
    question: 'Are you available 24/7?',
    answer: 'Yes, Recovero operates 24 hours a day, including nights and weekends.',
  },
];

export const LOCATIONS = [
  'PORTSMOUTH',
  'HAVANT',
  'FAREHAM',
  'GOSPORT',
  'WATERLOOVILLE',
  'PETERSFIELD',
  'WINCHESTER',
  'ANDOVER',
  'HAYLING ISLAND',
  'FAREHAM',
  'PORTSMOUTH',
];
