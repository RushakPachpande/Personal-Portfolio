export type AutomationItem = {
  id: string
  title: string
  summary: string
  details: string
  technologies: string[]
  incomplete?: boolean
  todoNote?: string
}

export const automationItems: AutomationItem[] = [
  {
    id: 'self-hosted-n8n',
    title: 'Self-hosted n8n platform',
    summary:
      'Introduced and operated the organization’s first production n8n automation platform.',
    details:
      'Designed, self-hosted, migrated, and maintained the production n8n platform—initially on SQLite, then redesigned with PostgreSQL for long-term reliability. Deployed a secure Docker-based production environment with monitoring, backups, upgrades, and workflow troubleshooting.',
    technologies: ['n8n', 'PostgreSQL', 'Docker', 'Linux', 'VPS'],
  },
  {
    id: 'microsoft-integrations',
    title: 'Microsoft & enterprise SaaS operations',
    summary:
      'Administered Microsoft 365 and related SaaS platforms that keep day-to-day operations running.',
    details:
      'Administered Microsoft 365, Google Workspace, Zoho, DNS, domains, and SaaS platforms supporting organizational operations—connecting identity, collaboration, and operational tooling.',
    technologies: ['Microsoft 365', 'Google Workspace', 'Zoho People', 'Zoho Bigin', 'DNS'],
  },
  {
    id: 'operational-improvements',
    title: 'Operational improvements',
    summary:
      'Research and implement automation and platform changes that improve reliability and efficiency.',
    details:
      'Researched and implemented technical solutions improving platform reliability, automation, operational efficiency, and infrastructure scalability—using structured root-cause analysis before production changes.',
    technologies: ['n8n', 'Zapier', 'CI/CD', 'Azure'],
  },
  {
    id: 'sharepoint-automations',
    title: 'SharePoint automations',
    summary: 'Details forthcoming.',
    details: 'TODO: Document SharePoint automation work from verified source material.',
    technologies: [],
    incomplete: true,
    todoNote: 'Listed in Phase 1; not explicitly detailed in the current resume.',
  },
  {
    id: 'future-workflow-platform',
    title: 'Future workflow platform',
    summary: 'Details forthcoming.',
    details:
      'TODO: Document the intended future workflow platform direction once product scope is confirmed.',
    technologies: [],
    incomplete: true,
    todoNote: 'Forward-looking Phase 1 item; not a completed resume achievement.',
  },
]
