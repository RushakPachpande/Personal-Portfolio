import type {
  CaseStudy,
  CaseStudyCategory,
  EngineeringStat,
  Technology,
} from '@/types/portfolio';

export const categoryLabels: Record<CaseStudyCategory, string> = {
  platform: 'Platform Engineering',
  infrastructure: 'Infrastructure Engineering',
  automation: 'Automation Engineering',
};

export const categoryPaths: Record<CaseStudyCategory, string> = {
  platform: '/platforms',
  infrastructure: '/infrastructure',
  automation: '/automation',
};

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
};

export function mapTechnologyNameToId(name: string) {
  return technologyAliases[name.toLowerCase().trim()];
}

export function getCaseStudy(caseStudies: CaseStudy[], slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudiesByCategory(
  caseStudies: CaseStudy[],
  category: CaseStudyCategory
) {
  return caseStudies.filter((study) => study.category === category);
}

export function getFeaturedCaseStudies(caseStudies: CaseStudy[]) {
  return caseStudies.filter((study) => study.featured && !study.incomplete);
}

export function getRelatedCaseStudies(
  caseStudies: CaseStudy[],
  study: CaseStudy
) {
  return study.relatedSlugs
    .map((slug) => getCaseStudy(caseStudies, slug))
    .filter((related): related is CaseStudy => Boolean(related));
}

export function getCaseStudyPath(study: Pick<CaseStudy, 'category' | 'slug'>) {
  return `${categoryPaths[study.category]}/${study.slug}`;
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
  technologies: Technology[]
): EngineeringStat[] {
  const productionSystems = caseStudies.filter((study) =>
    [
      'Production',
      'Completed',
      'Implemented',
      'Ongoing',
      'Final development, validation, and rollout',
    ].includes(study.status)
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
  const yearsLearning = new Date().getFullYear() - 2019 + 1;

  return [
    {
      id: 'production-systems',
      label: 'Production Systems',
      value: productionSystems,
      description:
        'Platforms and initiatives actively used or delivered for real operations.',
    },
    {
      id: 'automation-workflows',
      label: 'Automation Workflows',
      value: automationWorkflows,
      description:
        'Business automation initiatives implemented across n8n and Microsoft flows.',
    },
    {
      id: 'infrastructure-projects',
      label: 'Infrastructure Projects',
      value: infrastructureProjects,
      description:
        'Cloud, hosting, networking, storage, and remote-access engineering initiatives.',
    },
    {
      id: 'platforms-delivered',
      label: 'Platforms Delivered',
      value: platformsDelivered,
      description:
        'Product platforms built and maintained with end-to-end ownership.',
    },
    {
      id: 'enterprise-technologies',
      label: 'Enterprise Technologies',
      value: enterpriseTechnologies,
      description:
        'Cloud, security, and enterprise systems used in shipped initiatives.',
    },
    {
      id: 'years-learning',
      label: 'Years Learning',
      value: yearsLearning,
      suffix: '+',
      description:
        'Continuous hands-on learning journey from foundational study to production ownership.',
    },
  ];
}
