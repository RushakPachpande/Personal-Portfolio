import reactLogo from '@/assets/tech/react.svg'
import typescriptLogo from '@/assets/tech/typescript.svg'
import javascriptLogo from '@/assets/tech/javascript.svg'
import supabaseLogo from '@/assets/tech/supabase.svg'
import postgresqlLogo from '@/assets/tech/postgresql.svg'
import mongodbLogo from '@/assets/tech/mongodb.svg'
import azureLogo from '@/assets/tech/azure.svg'
import microsoft365Logo from '@/assets/tech/microsoft365.svg'
import microsoftLogo from '@/assets/tech/microsoft.svg'
import dockerLogo from '@/assets/tech/docker.svg'
import linuxLogo from '@/assets/tech/linux.svg'
import truenasLogo from '@/assets/tech/truenas.svg'
import shieldLogo from '@/assets/tech/shield.svg'
import n8nLogo from '@/assets/tech/n8n.svg'
import sharepointLogo from '@/assets/tech/sharepoint.svg'
import outlookLogo from '@/assets/tech/outlook.svg'
import gitLogo from '@/assets/tech/git.svg'
import githubLogo from '@/assets/tech/github.svg'
import githubActionsLogo from '@/assets/tech/githubactions.svg'
import openapiLogo from '@/assets/tech/openapi.svg'
import { rawCaseStudies } from '@/content/caseStudies/raw'

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
  usedInSlugs: string[]
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

const technologyDefinitions: Omit<Technology, 'usedInSlugs'>[] = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    logo: reactLogo,
    description: 'Component-driven UI layer for interactive product experiences.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    logo: typescriptLogo,
    description: 'Type safety for maintainable frontend and integration logic.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    logo: javascriptLogo,
    description: 'Runtime logic for application behavior and workflow scripting.',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'database',
    logo: supabaseLogo,
    description: 'PostgreSQL platform layer for auth, data, and storage.',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    logo: postgresqlLogo,
    description: 'Relational database foundation for production-grade systems.',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    logo: mongodbLogo,
    description: 'Document store used for dynamic application data patterns.',
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'cloud',
    logo: azureLogo,
    description: 'Cloud platform for production hosting and infrastructure operations.',
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'enterprise',
    logo: microsoft365Logo,
    description: 'Enterprise collaboration and tenant operations ecosystem.',
  },
  {
    id: 'entra-id',
    name: 'Entra ID',
    category: 'security',
    logo: microsoftLogo,
    description: 'Identity layer for tenant alignment and access governance.',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'infrastructure',
    logo: dockerLogo,
    description: 'Containerized runtime for repeatable builds and deployments.',
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'infrastructure',
    logo: linuxLogo,
    description: 'Host operating system for self-hosted production services.',
  },
  {
    id: 'truenas',
    name: 'TrueNAS',
    category: 'infrastructure',
    logo: truenasLogo,
    description: 'Storage platform for centralized datasets and secure NAS access.',
  },
  {
    id: 'sophos',
    name: 'Sophos Firewall',
    category: 'security',
    logo: shieldLogo,
    description: 'Firewall and VPN gateway for secure remote infrastructure access.',
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'automation',
    logo: n8nLogo,
    description: 'Workflow orchestration engine for business process automation.',
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    category: 'automation',
    logo: sharepointLogo,
    description: 'Structured storage and process layer for enterprise workflows.',
  },
  {
    id: 'outlook',
    name: 'Outlook',
    category: 'automation',
    logo: outlookLogo,
    description: 'Operational intake channel integrated into automation pipelines.',
  },
  {
    id: 'microsoft-graph',
    name: 'Microsoft Graph',
    category: 'automation',
    logo: microsoftLogo,
    description: 'API surface for integrating Microsoft services in workflows.',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'version-control',
    logo: gitLogo,
    description: 'Version control backbone for disciplined engineering changes.',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'version-control',
    logo: githubLogo,
    description: 'Code collaboration and automation platform for CI/CD flows.',
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'version-control',
    logo: githubActionsLogo,
    description: 'Pipeline engine for automated build and deployment workflows.',
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'backend',
    logo: openapiLogo,
    description: 'Integration contract between systems, workflows, and services.',
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    category: 'backend',
    logo: openapiLogo,
    description: 'Event-driven trigger mechanism for automation and orchestration.',
  },
]

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
}

export function mapTechnologyNameToId(name: string) {
  const normalized = name.toLowerCase().trim()
  return technologyAliases[normalized]
}

function buildUsedInMap() {
  const map: Record<string, string[]> = {}
  for (const study of rawCaseStudies) {
    const ids =
      study.technologyIds ??
      study.technologies
        .map((technology) => mapTechnologyNameToId(technology))
        .filter((id): id is string => Boolean(id))
    for (const id of ids) {
      if (!map[id]) map[id] = []
      if (!map[id].includes(study.slug)) map[id].push(study.slug)
    }
  }
  return map
}

const usedInMap = buildUsedInMap()

export const technologies: Technology[] = technologyDefinitions.map((technology) => ({
  ...technology,
  usedInSlugs: usedInMap[technology.id] ?? [],
}))

export function getTechnologyById(id: string) {
  return technologies.find((technology) => technology.id === id)
}
