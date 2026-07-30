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
    name: 'TrueNAS Migration & Secure Remote NAS',
    tagline:
      'Secure, centralized NAS via TrueNAS SCALE migration with VPN-based remote access.',
    role: 'Planned and executed the migration from ThinkStation S30 to P500; configured pools, datasets, permissions, and shares; integrated VPN-based remote access; validated the cutover and documented operations.',
    objective:
      'Modernize organizational storage by migrating to TrueNAS SCALE—improving hardware reliability, centralizing file storage, and enabling secure remote access for authorized users.',
    technologies: [
      'TrueNAS SCALE',
      'Linux',
      'Storage Management',
      'SMB',
      'Networking',
      'VPN',
      'RBAC',
    ],
    outcome:
      'Successfully migrated the NAS with minimal disruption while improving performance, scalability, maintainability, and secure remote accessibility.',
  },
  {
    slug: 'sophos-vpn',
    name: 'Sophos VPN & Secure Remote Access Architecture',
    tagline:
      'Sophos Firewall VPN for protected remote access to internal servers and NAS.',
    role: 'Designed the VPN architecture; configured Sophos firewall policies, NAT, and access rules; planned role-based access to internal resources; integrated VPN with servers and NAS; tested connectivity/routing/security and documented operations.',
    objective:
      'Provide secure remote connectivity for employees and administrators via VPN instead of exposing services directly to the internet.',
    technologies: [
      'Sophos Firewall',
      'SSL VPN',
      'IPSec VPN',
      'Networking',
      'Firewall Policies',
      'NAT',
      'Remote Access',
      'Security',
    ],
    outcome:
      'Implemented secure remote access so administrators can reach internal infrastructure while reducing external attack surface and improving operational flexibility.',
  },
]

export function getInitiativeBySlug(slug: string) {
  return initiatives.find((initiative) => initiative.slug === slug)
}
