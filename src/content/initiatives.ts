export type Initiative = {
  slug: string
  name: string
  tagline: string
  role: string
  objective: string
  technologies: string[]
  outcome: string
  incomplete?: boolean
  todoNote?: string
}

export const initiatives: Initiative[] = [
  {
    slug: 'microsoft-365-migration',
    name: 'Microsoft 365 Tenant Migration',
    tagline: 'Organization-wide tenant migration for 50+ users.',
    role: 'Technical planning and coordination lead',
    objective:
      'Plan and coordinate an organization-wide Microsoft 365 tenant migration with vendor coordination, migration activities, and post-migration support.',
    technologies: ['Microsoft 365', 'Entra ID / identity', 'Exchange Online', 'Tenant operations'],
    outcome:
      'Led migration involving 50+ users, including planning, coordination, execution support, and post-migration follow-through.',
  },
  {
    slug: 'azure-infrastructure',
    name: 'Azure Infrastructure',
    tagline: 'Production hosting with measurable cost optimization.',
    role: 'Cloud infrastructure owner',
    objective:
      'Manage Microsoft Azure infrastructure hosting production applications while optimizing cloud resources for cost and reliability.',
    technologies: ['Microsoft Azure', 'Virtual Machines', 'DNS & domains', 'Linux'],
    outcome:
      'Optimized cloud resources and reduced Azure infrastructure costs by nearly 50%.',
  },
  {
    slug: 'self-hosted-supabase',
    name: 'Self-Hosted Supabase',
    tagline: 'Self-hosted data platform for multi-environment use.',
    role: 'Infrastructure & Database Engineer',
    objective:
      'Design and deploy a self-hosted Supabase platform on a Linux VPS supporting development, staging, and future production environments.',
    technologies: ['Supabase', 'PostgreSQL', 'Docker', 'Linux', 'VPS'],
    outcome:
      'Configured PostgreSQL, authentication, storage, Docker deployment, backups, updates, and secure infrastructure management for ongoing platform work.',
  },
  {
    slug: 'docker-deployment',
    name: 'Docker Deployment',
    tagline: 'Containerized delivery for self-hosted production platforms.',
    role: 'Platform & infrastructure engineer',
    objective:
      'Package and operate production services with Docker-based deployments for reliable self-hosted platforms.',
    technologies: ['Docker', 'Linux', 'VPS', 'CI/CD'],
    outcome:
      'Used Docker as the deployment foundation for self-hosted Supabase and n8n production environments, alongside CI/CD for multi-environment application releases.',
  },
  {
    slug: 'linux-administration',
    name: 'Linux Administration',
    tagline: 'Day-to-day ownership of Linux VPS and production hosts.',
    role: 'Infrastructure administrator',
    objective:
      'Operate Linux servers supporting self-hosted platforms, backups, updates, and secure infrastructure management.',
    technologies: ['Linux (Ubuntu)', 'VPS', 'Docker', 'Backups'],
    outcome:
      'Maintained Linux-based production and staging hosts used for self-hosted Supabase, n8n, and related platform services.',
  },
  {
    slug: 'truenas-migration',
    name: 'TrueNAS / Secure Remote NAS',
    tagline: 'Secure remote NAS architecture.',
    role: 'TODO',
    objective: 'TODO: Document objective from verified initiative notes.',
    technologies: ['TrueNAS'],
    outcome: 'TODO: Document verified outcome.',
    incomplete: true,
    todoNote:
      'Resume lists Secure Remote NAS Architecture and TrueNAS expertise; detailed migration narrative pending source material.',
  },
  {
    slug: 'sophos-vpn',
    name: 'Sophos VPN Architecture',
    tagline: 'Secure remote access architecture.',
    role: 'TODO',
    objective: 'TODO: Document objective from verified initiative notes.',
    technologies: [],
    outcome: 'TODO: Document verified outcome.',
    incomplete: true,
    todoNote:
      'Listed in Phase 1 structure; not detailed in the current resume. Content pending verified source material.',
  },
]

export function getInitiativeBySlug(slug: string) {
  return initiatives.find((initiative) => initiative.slug === slug)
}
