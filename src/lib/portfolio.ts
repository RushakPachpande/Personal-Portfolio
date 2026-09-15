import type {
  CaseStudy,
  CaseStudyCategory,
  EngineeringStat,
  Technology,
  TimelineItem,
} from '@/types/portfolio';
import type { SiteCategoryConfig, SiteConfig } from '@/types/site-config';
import { defaultSiteConfig } from '@/content/siteConfig';

/** Fallback labels when site config is unavailable. */
export const categoryLabels: Record<string, string> = Object.fromEntries(
  defaultSiteConfig.categories.map((category) => [category.id, category.label])
);

export const categoryPaths: Record<string, string> = Object.fromEntries(
  defaultSiteConfig.categories.map((category) => [category.id, category.path])
);

export const technologyCategories: Record<Technology['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  cloud: 'Cloud',
  infrastructure: 'Infrastructure',
  automation: 'Automation',
  'version-control': 'Version Control',
  security: 'Security',
  enterprise: 'Enterprise',
};

const technologyAliases: Record<string, string> = {
  typescript: 'typescript',
  javascript: 'javascript',
  react: 'react',
  supabase: 'supabase',
  postgresql: 'postgresql',
  'postgresql (initial)': 'postgresql',
  mongodb: 'mongodb',
  azure: 'azure',
  'microsoft azure': 'azure',
  'azure storage': 'azure',
  'microsoft 365': 'microsoft-365',
  'exchange online': 'microsoft-365',
  'entra id': 'entra-id',
  docker: 'docker',
  linux: 'linux',
  'linux (ubuntu)': 'linux',
  truenas: 'truenas',
  'truenas scale': 'truenas',
  'sophos firewall': 'sophos',
  'ssl vpn': 'sophos',
  'ipsec vpn': 'sophos',
  n8n: 'n8n',
  sharepoint: 'sharepoint',
  outlook: 'outlook',
  'microsoft outlook': 'outlook',
  'microsoft graph': 'microsoft-graph',
  git: 'git',
  github: 'github',
  'github actions': 'github-actions',
  'rest apis': 'rest-apis',
  webhooks: 'webhooks',
  vite: 'react',
  express: 'rest-apis',
  prisma: 'postgresql',
  redis: 'postgresql',
  'socket.io': 'webhooks',
  tailwind: 'react',
  node: 'rest-apis',
  'node.js': 'rest-apis',
};

export function mapTechnologyNameToId(name: string) {
  return technologyAliases[name.toLowerCase().trim()];
}

export function getCategoryMeta(
  siteConfig: SiteConfig | undefined,
  categoryId: string
): SiteCategoryConfig | undefined {
  const categories = siteConfig?.categories ?? defaultSiteConfig.categories;
  return categories.find((category) => category.id === categoryId);
}

export function getCategoryByPath(
  siteConfig: SiteConfig | undefined,
  pathname: string
): SiteCategoryConfig | undefined {
  const categories = siteConfig?.categories ?? defaultSiteConfig.categories;
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return categories.find(
    (category) =>
      category.path === normalized ||
      normalized.startsWith(`${category.path}/`)
  );
}

export function getCaseStudy(caseStudies: CaseStudy[], slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudiesByCategory(
  caseStudies: CaseStudy[],
  category: CaseStudyCategory | string
) {
  return caseStudies.filter((study) => study.category === category);
}

export function getFeaturedCaseStudies(caseStudies: CaseStudy[]) {
  return caseStudies.filter((study) => study.featured && !study.incomplete);
}

/** Home Experience Snapshot cards — admin-flagged timeline rows, in sort order. */
export function getHomeExperienceSnapshot(timeline: TimelineItem[]) {
  return timeline.filter((item) => item.showOnHome);
}

export function getRelatedCaseStudies(
  caseStudies: CaseStudy[],
  study: CaseStudy
) {
  return study.relatedSlugs
    .map((slug) => getCaseStudy(caseStudies, slug))
    .filter((related): related is CaseStudy => Boolean(related));
}

export function getCaseStudyPath(
  study: Pick<CaseStudy, 'category' | 'slug'>,
  siteConfig?: SiteConfig
) {
  const path =
    getCategoryMeta(siteConfig, study.category)?.path ??
    categoryPaths[study.category] ??
    '/platforms';
  return `${path}/${study.slug}`;
}

export function getTechnologyById(technologies: Technology[], id: string) {
  return technologies.find((technology) => technology.id === id);
}

export function usedInSlugsFromCaseStudies(caseStudies: CaseStudy[]) {
  const map: Record<string, string[]> = {};
  for (const study of caseStudies) {
    const ids =
      study.technologyIds ??
      study.technologies
        .map((technology) => mapTechnologyNameToId(technology))
        .filter((id): id is string => Boolean(id));
    for (const id of ids) {
      if (!map[id]) map[id] = [];
      if (!map[id].includes(study.slug)) map[id].push(study.slug);
    }
  }
  return map;
}

export function computeEngineeringStats(
  caseStudies: CaseStudy[],
  technologies: Technology[],
  siteConfig: SiteConfig = defaultSiteConfig
): EngineeringStat[] {
  const statuses = siteConfig.stats.productionStatuses;
  const productionSystems = caseStudies.filter((study) =>
    statuses.includes(study.status)
  ).length;

  const automationWorkflows = caseStudies.filter(
    (study) => study.category === 'automation'
  ).length;
  const infrastructureProjects = caseStudies.filter(
    (study) => study.category === 'infrastructure'
  ).length;
  const platformsDelivered = caseStudies.filter(
    (study) => study.category === 'platform'
  ).length;
  const enterpriseTechnologies = technologies.filter((technology) =>
    ['cloud', 'enterprise', 'infrastructure', 'security'].includes(
      technology.category
    )
  ).length;
  const yearsLearning =
    new Date().getFullYear() - siteConfig.stats.baselineYear + 1;

  const valueBySource: Record<string, number> = {
    production: productionSystems,
    automation: automationWorkflows,
    infrastructure: infrastructureProjects,
    platforms: platformsDelivered,
    'enterprise-tech': enterpriseTechnologies,
    years: yearsLearning,
  };

  return siteConfig.stats.items.map((item) => ({
    id: item.id,
    label: item.label,
    value: valueBySource[item.source] ?? 0,
    suffix: item.suffix,
    description: item.description,
  }));
}
