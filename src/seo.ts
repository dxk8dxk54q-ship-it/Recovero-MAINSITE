export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  area?: string;
  robots?: string;
};

export const SITE_URL = 'https://recovero247.co.uk';

export const SEO_CONFIG: Record<string, SeoConfig> = {
  '/': {
    title: 'Recovero | 24/7 Fast Vehicle Recovery & Breakdown Assistance',
    description: 'Stranded? Recovero provides rapid 24/7 vehicle recovery and breakdown assistance across Portsmouth, Havant and Hampshire. Call for availability and a clear recovery quote.',
    path: '/',
    area: 'Hampshire',
  },
  '/breakdown-recovery': {
    title: 'Breakdown Recovery Portsmouth | 24/7 Roadside Help | Recovero247',
    description: 'Need breakdown recovery in Portsmouth? Recovero247 provides 24/7 roadside and non-runner recovery across Portsmouth and nearby areas.',
    path: '/breakdown-recovery',
    area: 'Portsmouth',
  },
  '/accident-recovery': {
    title: 'Accident Recovery Portsmouth | 24/7 Emergency Help | Recovero247',
    description: 'Fast accident recovery in Portsmouth. Recovero247 arranges 24/7 vehicle recovery for accident-damaged cars, vans and motorcycles. Call for a clear quote.',
    path: '/accident-recovery',
    area: 'Portsmouth',
  },
  '/vehicle-transport': {
    title: 'Vehicle Transport Portsmouth | Safe & Reliable Car Moves | Recovero247',
    description: 'Vehicle transport in Portsmouth and across the UK. Recovero247 arranges safe transport for classic, luxury and everyday cars. Call for a quote.',
    path: '/vehicle-transport',
    area: 'Portsmouth',
  },
  '/portsmouth-recovery': {
    title: 'Vehicle Recovery Portsmouth | 24/7 Breakdown Help | Recovero247',
    description: 'Need vehicle recovery in Portsmouth? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Portsmouth and nearby areas.',
    path: '/portsmouth-recovery',
    area: 'Portsmouth',
  },
  '/havant-recovery': {
    title: 'Vehicle Recovery Havant | 24/7 Breakdown Help | Recovero247',
    description: 'Need vehicle recovery in Havant? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Havant and nearby areas.',
    path: '/havant-recovery',
    area: 'Havant',
  },
  '/fareham-recovery': {
    title: 'Vehicle Recovery Fareham | 24/7 Breakdown Help | Recovero247',
    description: 'Need vehicle recovery in Fareham? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Fareham and nearby areas.',
    path: '/fareham-recovery',
    area: 'Fareham',
  },
  '/gosport-recovery': {
    title: 'Vehicle Recovery Gosport | 24/7 Breakdown Help | Recovero247',
    description: 'Need vehicle recovery in Gosport? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Gosport and nearby areas.',
    path: '/gosport-recovery',
    area: 'Gosport',
  },
  '/waterlooville-recovery': {
    title: 'Vehicle Recovery Waterlooville | 24/7 Breakdown Help | Recovero247',
    description: 'Need vehicle recovery in Waterlooville? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Waterlooville and nearby areas.',
    path: '/waterlooville-recovery',
    area: 'Waterlooville',
  },
  '/petersfield-recovery': {
    title: 'Vehicle Recovery Petersfield | 24/7 Breakdown Help | Recovero247',
    description: 'Need vehicle recovery in Petersfield? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Petersfield and nearby areas.',
    path: '/petersfield-recovery',
    area: 'Petersfield',
  },
  '/winchester-recovery': {
    title: 'Vehicle Recovery Winchester | 24/7 Breakdown Help | Recovero247',
    description: 'Need vehicle recovery in Winchester? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Winchester and nearby areas.',
    path: '/winchester-recovery',
    area: 'Winchester',
  },
  '/andover-recovery': {
    title: 'Vehicle Recovery Andover | 24/7 Breakdown Help | Recovero247',
    description: 'Need vehicle recovery in Andover? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Andover and nearby areas.',
    path: '/andover-recovery',
    area: 'Andover',
  },
  '/hayling-island-recovery': {
    title: 'Vehicle Recovery Hayling Island | 24/7 Breakdown Help | Recovero247',
    description: 'Need vehicle recovery in Hayling Island? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Hayling Island and nearby areas.',
    path: '/hayling-island-recovery',
    area: 'Hayling Island',
  },
  '/recovery-partners': {
    title: 'Join Recovero Recovery Network | Extra Recovery Jobs',
    description: 'Join Recovero’s recovery partner network and receive suitable vehicle recovery, non-runner, transport and garage movement jobs in your area. Free to join.',
    path: '/recovery-partners',
    robots: 'index,follow',
  },
};

export const NOT_FOUND_SEO: SeoConfig = {
  title: 'Page Not Found | Recovero247',
  description: 'The page you requested could not be found. Return to Recovero247 for vehicle recovery and transport services.',
  path: '/',
  robots: 'noindex,follow',
};

export function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

export function getSeoForPath(pathname: string): SeoConfig {
  return SEO_CONFIG[normalizePath(pathname)] || NOT_FOUND_SEO;
}

export function isKnownRoute(pathname: string) {
  return Boolean(SEO_CONFIG[normalizePath(pathname)]);
}

export function canonicalUrl(pathname: string) {
  const normalized = normalizePath(pathname);
  return normalized === '/' ? SITE_URL + '/' : SITE_URL + normalized;
}

export function buildStructuredData(pathname: string) {
  const seo = getSeoForPath(pathname);
  const canonical = canonicalUrl(seo.path === '/' && !isKnownRoute(pathname) ? '/' : pathname);
  const area = seo.area || 'Hampshire';

  const graph: any[] = [
    {
      '@type': 'Organization',
      '@id': SITE_URL + '/#organization',
      name: 'Recovero24/7',
      url: SITE_URL + '/',
      telephone: '+447366302341',
      description: 'Vehicle recovery and transport arranged across Portsmouth and Hampshire.',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Hampshire',
      },
    },
    {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#website',
      url: SITE_URL + '/',
      name: 'Recovero24/7',
      publisher: { '@id': SITE_URL + '/#organization' },
    },
  ];

  if (isKnownRoute(pathname) && normalizePath(pathname) !== '/recovery-partners') {
    graph.push({
      '@type': 'Service',
      '@id': canonical + '#service',
      name: seo.title.split('|')[0].trim(),
      url: canonical,
      description: seo.description,
      provider: { '@id': SITE_URL + '/#organization' },
      areaServed: {
        '@type': area === 'Hampshire' ? 'AdministrativeArea' : 'City',
        name: area,
      },
      serviceType: 'Vehicle recovery and transport',
    });
  }

  if (normalizePath(pathname) !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': canonical + '#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL + '/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: seo.title.split('|')[0].trim(),
          item: canonical,
        },
      ],
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
