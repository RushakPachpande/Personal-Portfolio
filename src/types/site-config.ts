export type NavRoute = {
  to: string;
  label: string;
};

export type NavLinkItem = NavRoute & {
  type: 'link';
};

export type NavGroupItem = {
  type: 'group';
  label: string;
  items: NavRoute[];
};

export type NavItem = NavLinkItem | NavGroupItem;

export type SiteChrome = {
  hero: {
    eyebrow: string;
    ctaLabel: string;
    ctaTo: string;
  };
  homeAbout: {
    eyebrow: string;
    title: string;
    ctaLabel: string;
  };
  engineeringAreasSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  featured: {
    eyebrow: string;
    title: string;
    description: string;
  };
  experienceSnapshot: {
    eyebrow: string;
    title: string;
    ctaLabel: string;
  };
  homeCta: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonTo: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    sectionTitles: {
      whoIAm: string;
      howIThink: string;
      whatIEnjoy: string;
      approach: string;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
  };
  footer: {
    tagline: string;
    principles: string[];
    focus: string;
    stack: string[];
  };
  bootSteps: string[];
};

export type EngineeringAreaCard = {
  id: string;
  href: string;
  title: string;
  description: string;
  examples: string;
  gradient: 'platform' | 'infrastructure' | 'automation';
};

export type StatSource =
  | 'production'
  | 'automation'
  | 'infrastructure'
  | 'platforms'
  | 'enterprise-tech'
  | 'years';

export type SiteStatDefinition = {
  id: string;
  label: string;
  description: string;
  suffix?: string;
  source: StatSource;
};

export type SiteStatsConfig = {
  baselineYear: number;
  productionStatuses: string[];
  items: SiteStatDefinition[];
};

export type SiteCategoryConfig = {
  id: string;
  label: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  gridEyebrow: string;
  gridTitle: string;
  gridDescription: string;
};

export type SiteBrandConfig = {
  faviconPath?: string;
  logoPath?: string;
  tokens: Record<string, string>;
};

export type SiteSeoConfig = {
  defaultDescription?: string;
  ogImagePath?: string;
};

export type SiteFeatureFlags = {
  showBoot: boolean;
  showTerminal: boolean;
};

export type SiteTerminalConfig = {
  welcomeLines: string[];
};

export type SiteConfig = {
  chrome: SiteChrome;
  engineeringAreas: EngineeringAreaCard[];
  stats: SiteStatsConfig;
  nav: NavItem[];
  categories: SiteCategoryConfig[];
  brand: SiteBrandConfig;
  seo: SiteSeoConfig;
  featureFlags: SiteFeatureFlags;
  terminal: SiteTerminalConfig;
};
