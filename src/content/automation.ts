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
    title: 'Microsoft 365 & SharePoint Workflow Automation',
    summary:
      'Designed M365/SharePoint workflows that cut repetitive admin work and standardize internal IT processes.',
    details:
      'Designed workflow architecture integrating Outlook with SharePoint for automated data collection and ticket logging; standardized processes and centralized tracking for operational visibility; documented flows for future enhancements—establishing a foundation for centralized automation with better consistency, traceability, and scalability.',
    technologies: [
      'Microsoft 365',
      'SharePoint',
      'Outlook',
      'REST APIs',
      'Automation',
      'Power Platform Concepts',
      'n8n',
    ],
  },
  {
    id: 'it-support-ticket-automation',
    title: 'IT Support Ticket Automation',
    summary:
      'Automated IT support workflow that turns requests into structured, trackable tickets with minimal manual work.',
    details:
      'Designed the end-to-end workflow with Outlook email triggers, SharePoint ticket storage, automatic ticket generation, and acknowledgement emails; structured lifecycle logging and planned extensibility for approvals and notifications—creating a scalable framework that reduces manual IT admin and supports future service desk enhancements.',
    technologies: [
      'n8n',
      'Microsoft Outlook',
      'SharePoint',
      'REST APIs',
      'JavaScript',
      'Webhooks',
    ],
  },
]
