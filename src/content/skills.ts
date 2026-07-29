export type SkillCategory = {
  id: string
  name: string
  summary: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    summary: 'Product UI with clarity, performance, and maintainable component systems.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
  {
    id: 'backend',
    name: 'Backend',
    summary: 'APIs and service boundaries that stay operable in production.',
    skills: ['Node.js', 'REST APIs', 'Auth flows', 'Supabase', 'Webhooks'],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    summary: 'Azure-oriented environments with identity, networking, and deployability.',
    skills: ['Azure', 'Resource design', 'IAM', 'Storage', 'Compute'],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    summary: 'Servers, storage, and platforms that teams can actually run.',
    skills: ['Linux', 'TrueNAS', 'Docker hosts', 'Environment separation'],
  },
  {
    id: 'networking',
    name: 'Networking',
    summary: 'Connectivity designed for security and day-to-day usability.',
    skills: ['VPN', 'Sophos', 'DNS', 'Segmentation basics'],
  },
  {
    id: 'automation',
    name: 'Automation',
    summary: 'Workflow systems that remove repetitive operational work.',
    skills: ['n8n', 'Scripting', 'Integrations', 'Ops playbooks'],
  },
  {
    id: 'security',
    name: 'Security',
    summary: 'Practical defaults: least privilege, access control, and safer delivery.',
    skills: ['IAM', 'VPN hardening', 'Secrets hygiene', 'Access reviews'],
  },
  {
    id: 'databases',
    name: 'Databases',
    summary: 'Data layers that support products without becoming a mystery box.',
    skills: ['PostgreSQL', 'Supabase', 'Backups awareness', 'Schema clarity'],
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    summary: 'Tenant operations, migrations, and identity-aware collaboration platforms.',
    skills: ['Exchange Online', 'Entra ID', 'Tenant config', 'PowerShell'],
  },
  {
    id: 'devops',
    name: 'DevOps',
    summary: 'Repeatable packaging, deployment, and operational readiness.',
    skills: ['Docker', 'CI-friendly builds', 'Release discipline', 'Observability basics'],
  },
]
