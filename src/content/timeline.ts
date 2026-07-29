export type TimelineItem = {
  id: string
  type: 'education' | 'career' | 'achievement' | 'deployment'
  title: string
  organization: string
  period: string
  description: string
  highlights?: string[]
}

export const timeline: TimelineItem[] = [
  {
    id: 'career-nextgen',
    type: 'career',
    title: 'Platform & Technology Professional',
    organization: 'NextGenInnov8, Pune',
    period: 'Apr 2025 — Present',
    description:
      'Technical ownership of production platforms, cloud infrastructure, and internal technology systems—ensuring reliable operations and continuous improvement.',
    highlights: [
      'Primary technical owner — Navdrishti',
      'Azure infrastructure optimization (~50% cost reduction)',
      'Microsoft 365 migration for 50+ users',
      'Self-hosted Supabase and n8n infrastructure',
      'CI/CD for multi-environment deployments',
    ],
  },
  {
    id: 'edu-mca',
    type: 'education',
    title: 'Master of Computer Applications (MCA)',
    organization: "ASM's IBMR, Pune",
    period: '2023 — 2025',
    description: 'CGPA: 7.57',
  },
  {
    id: 'edu-bba',
    type: 'education',
    title: 'Bachelor of Business Administration (Computer Applications)',
    organization: "ASM's CSIT, Pune",
    period: '2019 — 2022',
    description: 'CGPA: 7.58',
  },
  {
    id: 'achieve-navdrishti',
    type: 'achievement',
    title: 'Primary Technical Owner — Navdrishti',
    organization: 'NextGenInnov8',
    period: 'Achievement',
    description:
      'End-to-end ownership of a role-based student placement management platform through architecture, development, CI/CD, and multi-environment deployment.',
  },
  {
    id: 'deploy-m365',
    type: 'deployment',
    title: 'Microsoft 365 Tenant Migration',
    organization: 'Enterprise operations',
    period: 'Major deployment',
    description:
      'Led technical planning and coordination for an organization-wide Microsoft 365 tenant migration involving 50+ users.',
  },
  {
    id: 'deploy-azure',
    type: 'deployment',
    title: 'Azure Infrastructure Optimization',
    organization: 'Cloud platform',
    period: 'Major deployment',
    description:
      'Managed Azure infrastructure hosting production applications and reduced infrastructure costs by nearly 50%.',
  },
  {
    id: 'deploy-n8n',
    type: 'deployment',
    title: 'Self-hosted n8n Production Platform',
    organization: 'Internal platforms',
    period: 'Major deployment',
    description:
      'Introduced and operated the organization’s first n8n automation platform, migrating the production architecture from SQLite to PostgreSQL.',
  },
]
