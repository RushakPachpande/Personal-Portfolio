export type TechnologyCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'cloud'
  | 'infrastructure'
  | 'automation'
  | 'version-control'
  | 'security'
  | 'enterprise'

export type Technology = {
  id: string
  name: string
  category: TechnologyCategory
  logo: string
  description: string
}

export const technologyCategories: Record<TechnologyCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  cloud: 'Cloud',
  infrastructure: 'Infrastructure',
  automation: 'Automation',
  'version-control': 'Version Control',
  security: 'Security',
  enterprise: 'Enterprise',
}

export const technologies: Technology[] = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    logo: 'https://cdn.simpleicons.org/react/61DAFB',
    description: 'Component-driven UI layer for interactive product experiences.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    logo: 'https://cdn.simpleicons.org/typescript/3178C6',
    description: 'Type safety for maintainable frontend and integration logic.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    logo: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    description: 'Runtime logic for application behavior and workflow scripting.',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'database',
    logo: 'https://cdn.simpleicons.org/supabase/3ECF8E',
    description: 'PostgreSQL platform layer for auth, data, and storage.',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    logo: 'https://cdn.simpleicons.org/postgresql/4169E1',
    description: 'Relational database foundation for production-grade systems.',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    logo: 'https://cdn.simpleicons.org/mongodb/47A248',
    description: 'Document store used for dynamic application data patterns.',
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'cloud',
    logo: 'https://cdn.simpleicons.org/microsoftazure/0078D4',
    description: 'Cloud platform for production hosting and infrastructure operations.',
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'enterprise',
    logo: 'https://cdn.simpleicons.org/microsoftoffice/D83B01',
    description: 'Enterprise collaboration and tenant operations ecosystem.',
  },
  {
    id: 'entra-id',
    name: 'Entra ID',
    category: 'security',
    logo: 'https://cdn.simpleicons.org/microsoft/5E5E5E',
    description: 'Identity layer for tenant alignment and access governance.',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'infrastructure',
    logo: 'https://cdn.simpleicons.org/docker/2496ED',
    description: 'Containerized runtime for repeatable builds and deployments.',
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'infrastructure',
    logo: 'https://cdn.simpleicons.org/linux/FCC624',
    description: 'Host operating system for self-hosted production services.',
  },
  {
    id: 'truenas',
    name: 'TrueNAS',
    category: 'infrastructure',
    logo: 'https://cdn.simpleicons.org/truenas/0095D5',
    description: 'Storage platform for centralized datasets and secure NAS access.',
  },
  {
    id: 'sophos',
    name: 'Sophos Firewall',
    category: 'security',
    logo: 'https://cdn.simpleicons.org/shield/0F6CBD',
    description: 'Firewall and VPN gateway for secure remote infrastructure access.',
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'automation',
    logo: 'https://cdn.simpleicons.org/n8n/EA4B71',
    description: 'Workflow orchestration engine for business process automation.',
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    category: 'automation',
    logo: 'https://cdn.simpleicons.org/microsoftsharepoint/0078D4',
    description: 'Structured storage and process layer for enterprise workflows.',
  },
  {
    id: 'outlook',
    name: 'Outlook',
    category: 'automation',
    logo: 'https://cdn.simpleicons.org/microsoftoutlook/0078D4',
    description: 'Operational intake channel integrated into automation pipelines.',
  },
  {
    id: 'microsoft-graph',
    name: 'Microsoft Graph',
    category: 'automation',
    logo: 'https://cdn.simpleicons.org/microsoft/5E5E5E',
    description: 'API surface for integrating Microsoft services in workflows.',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'version-control',
    logo: 'https://cdn.simpleicons.org/git/F05032',
    description: 'Version control backbone for disciplined engineering changes.',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'version-control',
    logo: 'https://cdn.simpleicons.org/github/FFFFFF',
    description: 'Code collaboration and automation platform for CI/CD flows.',
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'version-control',
    logo: 'https://cdn.simpleicons.org/githubactions/2088FF',
    description: 'Pipeline engine for automated build and deployment workflows.',
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'backend',
    logo: 'https://cdn.simpleicons.org/openapiinitiative/6BA539',
    description: 'Integration contract between systems, workflows, and services.',
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    category: 'backend',
    logo: 'https://cdn.simpleicons.org/socket/FFFFFF',
    description: 'Event-driven trigger mechanism for automation and orchestration.',
  },
]

const technologyAliases: Record<string, string> = {
  'typescript': 'typescript',
  'javascript': 'javascript',
  'react': 'react',
  'supabase': 'supabase',
  'postgresql': 'postgresql',
  'postgresql (initial)': 'postgresql',
  'mongodb': 'mongodb',
  'azure': 'azure',
  'microsoft azure': 'azure',
  'azure storage': 'azure',
  'microsoft 365': 'microsoft-365',
  'exchange online': 'microsoft-365',
  'entra id': 'entra-id',
  'docker': 'docker',
  'linux': 'linux',
  'linux (ubuntu)': 'linux',
  'truenas': 'truenas',
  'truenas scale': 'truenas',
  'sophos firewall': 'sophos',
  'ssl vpn': 'sophos',
  'ipsec vpn': 'sophos',
  'n8n': 'n8n',
  'sharepoint': 'sharepoint',
  'outlook': 'outlook',
  'microsoft outlook': 'outlook',
  'microsoft graph': 'microsoft-graph',
  'git': 'git',
  'github': 'github',
  'github actions': 'github-actions',
  'rest apis': 'rest-apis',
  'webhooks': 'webhooks',
}

export function mapTechnologyNameToId(name: string) {
  const normalized = name.toLowerCase().trim()
  return technologyAliases[normalized]
}

export function getTechnologyById(id: string) {
  return technologies.find((technology) => technology.id === id)
}
