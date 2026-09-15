import type { SiteConfig } from '@/types/site-config';
import { defaultNavStructure } from '@/components/layout/navItems';

export const defaultSiteConfig: SiteConfig = {
  chrome: {
    hero: {
      eyebrow: 'Platform Engineer · Cloud · Automation · Full Stack Systems',
      ctaLabel: 'Explore My Work',
      ctaTo: '/platforms',
    },
    homeAbout: {
      eyebrow: 'About',
      title: 'I own platforms end-to-end',
      ctaLabel: 'More about how I work',
    },
    engineeringAreasSection: {
      eyebrow: 'Engineering Areas',
      title: 'Three pillars of ownership',
      description:
        'Platform, infrastructure, and automation—connected by the same end-to-end ownership model.',
    },
    featured: {
      eyebrow: 'Featured Case Studies',
      title: 'How the work was owned',
      description:
        'Not project cards—engineering narratives covering context, decisions, challenges, and outcomes.',
    },
    experienceSnapshot: {
      eyebrow: 'Experience Snapshot',
      title: 'Recent ownership signals',
      ctaLabel: 'Full timeline →',
    },
    homeCta: {
      title: 'Need someone who owns engineering outcomes?',
      description:
        'From problem framing and architecture to production operations—let’s talk.',
      buttonLabel: 'Get in touch',
      buttonTo: '/contact',
    },
    about: {
      eyebrow: 'About',
      title: 'Ownership over tickets',
      description:
        'Not a biography—how I work across products, infrastructure, and automation.',
      sectionTitles: {
        whoIAm: 'Who I am',
        howIThink: 'How I think',
        whatIEnjoy: 'What I enjoy building',
        approach: 'My engineering approach',
      },
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let’s talk platforms',
      description:
        'Simple, professional channels—email, LinkedIn, GitHub, and resume.',
    },
    footer: {
      tagline:
        'Platform engineer owning systems from architecture to production.',
      principles: [
        'Own outcomes',
        'Build for production',
        'Automate repetitive work',
      ],
      focus:
        'Platform architecture, cloud optimization, enterprise automations, and production operations.',
      stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
    },
    bootSteps: [
      'Initializing Platform...',
      'Loading Infrastructure...',
      'Loading Projects...',
      'Connecting Services...',
      'System Ready.',
    ],
  },
  engineeringAreas: [
    {
      id: 'platforms',
      href: '/platforms',
      title: 'Platform Engineering',
      description:
        'Software products, full-stack delivery, and production deployments.',
      examples: 'Navdrishti · BrainPulses · DISHA · LevelUP',
      gradient: 'platform',
    },
    {
      id: 'infrastructure',
      href: '/infrastructure',
      title: 'Infrastructure Engineering',
      description:
        'Azure, Microsoft 365, Docker, Linux, networking, storage, and VPN.',
      examples: 'Cloud · Tenants · Hosting',
      gradient: 'infrastructure',
    },
    {
      id: 'automation',
      href: '/automation',
      title: 'Automation Engineering',
      description: 'n8n, SharePoint, Outlook, and business workflow automation.',
      examples: 'Workflows · Integrations',
      gradient: 'automation',
    },
  ],
  stats: {
    baselineYear: 2019,
    productionStatuses: [
      'Production',
      'Completed',
      'Implemented',
      'Ongoing',
      'Final development, validation, and rollout',
      'Live',
    ],
    items: [
      {
        id: 'production-systems',
        label: 'Production Systems',
        description:
          'Platforms and initiatives actively used or delivered for real operations.',
        source: 'production',
      },
      {
        id: 'automation-workflows',
        label: 'Automation Workflows',
        description:
          'Business automation initiatives implemented across n8n and Microsoft flows.',
        source: 'automation',
      },
      {
        id: 'infrastructure-projects',
        label: 'Infrastructure Projects',
        description:
          'Cloud, hosting, networking, storage, and remote-access engineering initiatives.',
        source: 'infrastructure',
      },
      {
        id: 'platforms-delivered',
        label: 'Platforms Delivered',
        description:
          'Product platforms built and maintained with end-to-end ownership.',
        source: 'platforms',
      },
      {
        id: 'enterprise-technologies',
        label: 'Enterprise Technologies',
        description:
          'Cloud, security, and enterprise systems used in shipped initiatives.',
        source: 'enterprise-tech',
      },
      {
        id: 'years-learning',
        label: 'Years Learning',
        description:
          'Continuous hands-on learning journey from foundational study to production ownership.',
        suffix: '+',
        source: 'years',
      },
    ],
  },
  nav: defaultNavStructure,
  categories: [
    {
      id: 'platform',
      label: 'Platform Engineering',
      path: '/platforms',
      seoTitle: 'Platforms',
      seoDescription:
        'Engineering case studies for software platforms including Navdrishti, BrainPulses, DISHA, and LevelUP.',
      gridEyebrow: 'Platform Engineering',
      gridTitle: 'Software platforms',
      gridDescription:
        'Products owned from architecture and development through deployment and production care.',
    },
    {
      id: 'infrastructure',
      label: 'Infrastructure Engineering',
      path: '/infrastructure',
      seoTitle: 'Infrastructure',
      seoDescription:
        'Cloud, hosting, networking, storage, and remote-access engineering case studies.',
      gridEyebrow: 'Infrastructure Engineering',
      gridTitle: 'Infrastructure systems',
      gridDescription:
        'Environments, tenants, and hosting owned through design, hardening, and operations.',
    },
    {
      id: 'automation',
      label: 'Automation Engineering',
      path: '/automation',
      seoTitle: 'Automation',
      seoDescription:
        'Workflow automation and integration case studies across n8n and Microsoft ecosystems.',
      gridEyebrow: 'Automation Engineering',
      gridTitle: 'Automation systems',
      gridDescription:
        'Business workflows automated end-to-end with reliable integrations and ownership.',
    },
  ],
  brand: {
    tokens: {},
  },
  seo: {},
  featureFlags: {
    showBoot: true,
    showTerminal: true,
  },
  terminal: {
    welcomeLines: [
      'Welcome to the engineering terminal.',
      'Type `help` to list available commands.',
    ],
  },
};

export function mergeSiteConfig(partial: unknown): SiteConfig {
  const incoming =
    partial && typeof partial === 'object'
      ? (partial as Partial<SiteConfig>)
      : {};
  return {
    chrome: {
      ...defaultSiteConfig.chrome,
      ...(incoming.chrome ?? {}),
      hero: {
        ...defaultSiteConfig.chrome.hero,
        ...(incoming.chrome?.hero ?? {}),
      },
      homeAbout: {
        ...defaultSiteConfig.chrome.homeAbout,
        ...(incoming.chrome?.homeAbout ?? {}),
      },
      engineeringAreasSection: {
        ...defaultSiteConfig.chrome.engineeringAreasSection,
        ...(incoming.chrome?.engineeringAreasSection ?? {}),
      },
      featured: {
        ...defaultSiteConfig.chrome.featured,
        ...(incoming.chrome?.featured ?? {}),
      },
      experienceSnapshot: {
        ...defaultSiteConfig.chrome.experienceSnapshot,
        ...(incoming.chrome?.experienceSnapshot ?? {}),
      },
      homeCta: {
        ...defaultSiteConfig.chrome.homeCta,
        ...(incoming.chrome?.homeCta ?? {}),
      },
      about: {
        ...defaultSiteConfig.chrome.about,
        ...(incoming.chrome?.about ?? {}),
        sectionTitles: {
          ...defaultSiteConfig.chrome.about.sectionTitles,
          ...(incoming.chrome?.about?.sectionTitles ?? {}),
        },
      },
      contact: {
        ...defaultSiteConfig.chrome.contact,
        ...(incoming.chrome?.contact ?? {}),
      },
      footer: {
        ...defaultSiteConfig.chrome.footer,
        ...(incoming.chrome?.footer ?? {}),
        principles:
          incoming.chrome?.footer?.principles ??
          defaultSiteConfig.chrome.footer.principles,
        stack:
          incoming.chrome?.footer?.stack ??
          defaultSiteConfig.chrome.footer.stack,
      },
      bootSteps:
        incoming.chrome?.bootSteps ?? defaultSiteConfig.chrome.bootSteps,
    },
    engineeringAreas:
      incoming.engineeringAreas ?? defaultSiteConfig.engineeringAreas,
    stats: {
      ...defaultSiteConfig.stats,
      ...(incoming.stats ?? {}),
      productionStatuses:
        incoming.stats?.productionStatuses ??
        defaultSiteConfig.stats.productionStatuses,
      items: incoming.stats?.items ?? defaultSiteConfig.stats.items,
    },
    nav: incoming.nav ?? defaultSiteConfig.nav,
    categories: incoming.categories ?? defaultSiteConfig.categories,
    brand: {
      ...defaultSiteConfig.brand,
      ...(incoming.brand ?? {}),
      tokens: {
        ...defaultSiteConfig.brand.tokens,
        ...(incoming.brand?.tokens ?? {}),
      },
    },
    seo: {
      ...defaultSiteConfig.seo,
      ...(incoming.seo ?? {}),
    },
    featureFlags: {
      ...defaultSiteConfig.featureFlags,
      ...(incoming.featureFlags ?? {}),
    },
    terminal: {
      ...defaultSiteConfig.terminal,
      ...(incoming.terminal ?? {}),
      welcomeLines:
        incoming.terminal?.welcomeLines ??
        defaultSiteConfig.terminal.welcomeLines,
    },
  };
}
