import n8nLogo from '@/assets/tech/n8n.svg';
import sharepointLogo from '@/assets/tech/sharepoint.svg';
import outlookLogo from '@/assets/tech/outlook.svg';
import microsoftLogo from '@/assets/tech/microsoft.svg';
import azureLogo from '@/assets/tech/azure.svg';
import type { CaseStudy } from './types';

export const automationCaseStudies: CaseStudy[] = [
  {
    slug: 'self-hosted-n8n',
    category: 'automation',
    name: 'Self-hosted n8n Platform',
    summary:
      'Organization’s first production n8n platform—SQLite to PostgreSQL evolution.',
    status: 'Production',
    featured: true,
    difficulty: 'Complex',
    timeline: '2025 — Present',
    logo: n8nLogo,
    logoAlt: 'n8n logo',
    coverImage: n8nLogo,
    coverImageAlt: 'n8n automation platform branding',
    technologyIds: ['n8n', 'postgresql', 'docker', 'linux'],
    technologies: ['n8n', 'PostgreSQL', 'Docker', 'Linux', 'VPS'],
    stack: [
      { group: 'Automation', items: ['n8n'] },
      { group: 'Data', items: ['PostgreSQL', 'SQLite (initial)'] },
      {
        group: 'Infrastructure',
        items: ['Docker', 'Linux', 'VPS', 'Backups', 'Monitoring'],
      },
    ],
    businessContext:
      'The organization needed a durable internal automation platform—not ad-hoc scripts—so operational workflows could be owned, monitored, and improved over time.',
    problem:
      'Without a production-grade automation host, workflow automation stays fragile: hard to back up, hard to upgrade, and hard to trust for business processes.',
    objective:
      'Introduce and operate a self-hosted n8n automation platform suitable for long-term production reliability.',
    solution:
      'Designed, self-hosted, migrated, and maintained the production n8n platform—initially on SQLite, then redesigned with PostgreSQL. Deployed a secure Docker-based production environment with monitoring, backups, upgrades, and workflow troubleshooting.',
    architecture:
      'Dockerized n8n on Linux VPS. Initial SQLite-backed deployment was migrated to PostgreSQL for production durability, with backups, upgrades, monitoring, and operational troubleshooting as standing practices.',
    architectureNodes: [
      {
        id: 'n8n-triggers',
        label: 'Workflow Triggers',
        detail: 'Event and schedule-driven automation entry points.',
      },
      {
        id: 'n8n-engine',
        label: 'Automation Engine',
        detail: 'n8n runtime orchestrating business workflows.',
      },
      {
        id: 'n8n-data',
        label: 'State & Data',
        detail: 'PostgreSQL-backed durable execution metadata.',
      },
      {
        id: 'n8n-infra',
        label: 'Infrastructure',
        detail: 'Dockerized Linux VPS with backups and monitoring.',
      },
    ],
    responsibilities: [
      'Platform introduction',
      'Architecture evolution',
      'Docker deployment',
      'Production administration',
      'Backups and upgrades',
      'Workflow troubleshooting',
    ],
    decisions: [
      {
        decision: 'Self-host n8n as an internal platform',
        rationale:
          'Gave the organization a first-class automation runtime under its own operational control.',
      },
      {
        decision: 'Migrate production from SQLite to PostgreSQL',
        rationale:
          'SQLite was acceptable to start; PostgreSQL better matched long-term production reliability expectations.',
      },
      {
        decision: 'Docker-based secure production deployment',
        rationale:
          'Containers made monitoring, backups, and upgrades more operable than a one-off install.',
      },
    ],
    challenges: [
      {
        challenge:
          'Evolving an early automation deployment into a trustworthy production platform.',
        resolution:
          'Redesigned the production architecture around PostgreSQL and operational practices (backups, upgrades, monitoring) instead of freezing the first working setup.',
      },
    ],
    outcome:
      'Established and operated the organization’s first production n8n automation platform with a more durable PostgreSQL-backed architecture.',
    learnings: [
      'Automation platforms deserve the same production discipline as product backends.',
      'Starting simple is fine—shipping the migration plan is what makes it production.',
    ],
    gallery: [
      {
        src: n8nLogo,
        caption:
          'n8n production platform used for enterprise workflow automation.',
        type: 'workflow',
      },
    ],
    relatedSlugs: [
      'it-support-ticket-automation',
      'sharepoint-automations',
      'docker-deployment',
      'self-hosted-supabase',
    ],
  },
  {
    slug: 'sharepoint-automations',
    category: 'automation',
    name: 'Microsoft 365 & SharePoint Workflow Automation',
    summary:
      'Outlook–SharePoint workflows that standardize internal IT processes.',
    status: 'Implemented',
    difficulty: 'Advanced',
    timeline: '2025',
    logo: sharepointLogo,
    logoAlt: 'Microsoft SharePoint logo',
    coverImage: sharepointLogo,
    coverImageAlt: 'SharePoint workflow automation',
    technologyIds: [
      'microsoft-365',
      'sharepoint',
      'outlook',
      'rest-apis',
      'n8n',
    ],
    technologies: [
      'Microsoft 365',
      'SharePoint',
      'Outlook',
      'REST APIs',
      'n8n',
      'Power Platform Concepts',
    ],
    stack: [
      {
        group: 'Microsoft 365',
        items: ['SharePoint', 'Outlook', 'Microsoft 365'],
      },
      {
        group: 'Integration',
        items: ['REST APIs', 'n8n', 'Power Platform concepts'],
      },
    ],
    businessContext:
      'Internal IT and admin work depended on repetitive collection and tracking patterns that benefited from standardized, visible workflows inside Microsoft 365.',
    problem:
      'Manual admin processes create inconsistency and weak traceability when requests and operational data live in inboxes instead of structured systems.',
    objective:
      'Design M365/SharePoint workflows that reduce repetitive admin work and standardize internal IT processes.',
    solution:
      'Designed workflow architecture integrating Outlook with SharePoint for automated data collection and ticket logging; standardized processes and centralized tracking; documented flows for future enhancements.',
    architecture:
      'Outlook as an intake surface, SharePoint as structured storage/tracking, with automation orchestration (including n8n and Microsoft platform concepts) connecting collection, logging, and operational visibility.',
    architectureNodes: [
      {
        id: 'sp-intake',
        label: 'Outlook Intake',
        detail: 'Email-first operational requests enter standardized flows.',
      },
      {
        id: 'sp-orchestration',
        label: 'Automation Layer',
        detail:
          'n8n and Microsoft workflow concepts connect collection to tracking.',
      },
      {
        id: 'sp-record',
        label: 'SharePoint Record',
        detail:
          'Structured storage for tickets, logs, and operational visibility.',
      },
    ],
    responsibilities: [
      'Workflow architecture',
      'Integration design',
      'Process standardization',
      'Documentation',
    ],
    decisions: [
      {
        decision:
          'Use SharePoint as the system of record for tracked operational data',
        rationale:
          'Centralized tracking beats mailbox archaeology for visibility and consistency.',
      },
      {
        decision: 'Integrate Outlook intake with automated logging',
        rationale:
          'People already communicate by email—automation should meet that reality without losing structure.',
      },
    ],
    challenges: [
      {
        challenge:
          'Encoding tribal process knowledge into reliable, documented flows.',
        resolution:
          'Standardized processes and documented flows so automation could be extended without depending on one person’s memory.',
      },
    ],
    outcome:
      'Established a foundation for centralized automation with better consistency, traceability, and scalability across internal IT processes.',
    learnings: [
      'Business automation wins when it respects existing channels and still creates structure.',
      'Documentation is what turns a working flow into an owned platform capability.',
    ],
    gallery: [
      {
        src: n8nLogo,
        caption:
          'Automation orchestration connecting Outlook intake to SharePoint tracking.',
        type: 'workflow',
      },
    ],
    relatedSlugs: [
      'it-support-ticket-automation',
      'self-hosted-n8n',
      'microsoft-365-migration',
      'microsoft-integrations',
    ],
  },
  {
    slug: 'it-support-ticket-automation',
    category: 'automation',
    name: 'IT Support Ticket Automation',
    summary:
      'Outlook-triggered tickets logged in SharePoint with acknowledgements via n8n.',
    status: 'Implemented',
    difficulty: 'Advanced',
    timeline: '2025',
    logo: outlookLogo,
    logoAlt: 'Microsoft Outlook logo',
    coverImage: outlookLogo,
    coverImageAlt: 'IT ticket automation via Outlook intake',
    technologyIds: [
      'n8n',
      'outlook',
      'sharepoint',
      'rest-apis',
      'javascript',
      'webhooks',
    ],
    technologies: [
      'n8n',
      'Microsoft Outlook',
      'SharePoint',
      'REST APIs',
      'JavaScript',
      'Webhooks',
    ],
    stack: [
      { group: 'Automation', items: ['n8n', 'Webhooks', 'JavaScript'] },
      { group: 'Microsoft 365', items: ['Outlook', 'SharePoint'] },
      { group: 'Integration', items: ['REST APIs'] },
    ],
    businessContext:
      'IT support requests arrived through everyday channels and needed to become structured, trackable work—not lost email threads.',
    problem:
      'Manual ticket handling creates delay, inconsistency, and weak lifecycle visibility when intake is email-first.',
    objective:
      'Automate IT support workflow so requests become structured, trackable tickets with minimal manual administration.',
    solution:
      'Designed the end-to-end workflow with Outlook email triggers, SharePoint ticket storage, automatic ticket generation, and acknowledgement emails; structured lifecycle logging and planned extensibility for approvals and notifications.',
    architecture:
      'Outlook triggers feed an n8n workflow that creates/updates SharePoint-backed tickets and sends acknowledgement emails, with REST/webhook integration points for extensibility.',
    architectureNodes: [
      {
        id: 'ticket-intake',
        label: 'Intake',
        detail: 'Outlook emails capture incoming support requests.',
      },
      {
        id: 'ticket-orchestration',
        label: 'Workflow Orchestration',
        detail:
          'n8n transforms intake into structured ticket lifecycle actions.',
      },
      {
        id: 'ticket-system',
        label: 'System of Record',
        detail: 'SharePoint stores request state and tracking metadata.',
      },
      {
        id: 'ticket-notifications',
        label: 'Requester Feedback',
        detail: 'Automated acknowledgements close the loop with requesters.',
      },
    ],
    responsibilities: [
      'Workflow design',
      'Integration',
      'Automation implementation',
      'Lifecycle logging design',
      'Extensibility planning',
    ],
    decisions: [
      {
        decision: 'n8n as the orchestration layer',
        rationale:
          'Fits the self-hosted automation platform already owned by the organization and keeps ticket logic inspectable.',
      },
      {
        decision: 'SharePoint for ticket storage',
        rationale:
          'Keeps tickets in an enterprise system users and admins already operate inside Microsoft 365.',
      },
      {
        decision: 'Acknowledgement emails as part of the happy path',
        rationale:
          'Automation should close the loop with requesters, not only create back-office records.',
      },
    ],
    challenges: [
      {
        challenge:
          'Turning unstructured email intake into reliable structured tickets.',
        resolution:
          'Defined triggers, storage, generation, and acknowledgement as an explicit lifecycle instead of a single brittle script.',
      },
    ],
    outcome:
      'Created a scalable framework that reduces manual IT admin and supports future service desk enhancements.',
    learnings: [
      'Service desk automation is lifecycle design, not only message parsing.',
      'Extensibility should be planned when the first reliable path works—not bolted on after chaos returns.',
    ],
    gallery: [
      {
        src: n8nLogo,
        caption:
          'Workflow orchestration layer for Outlook-to-SharePoint ticket lifecycle automation.',
        type: 'workflow',
      },
    ],
    relatedSlugs: [
      'sharepoint-automations',
      'self-hosted-n8n',
      'microsoft-integrations',
    ],
  },
  {
    slug: 'microsoft-integrations',
    category: 'automation',
    name: 'Microsoft & Enterprise SaaS Operations',
    summary:
      'Day-to-day ownership of Microsoft 365 and related SaaS platforms.',
    status: 'Ongoing',
    difficulty: 'Intermediate',
    timeline: '2025 — Present',
    logo: microsoftLogo,
    logoAlt: 'Microsoft logo',
    coverImage: microsoftLogo,
    coverImageAlt: 'Enterprise SaaS operations context',
    technologyIds: ['microsoft-365'],
    technologies: [
      'Microsoft 365',
      'Google Workspace',
      'Zoho People',
      'Zoho Bigin',
      'DNS',
    ],
    stack: [
      { group: 'Collaboration', items: ['Microsoft 365', 'Google Workspace'] },
      { group: 'Business Apps', items: ['Zoho People', 'Zoho Bigin'] },
      { group: 'Foundations', items: ['DNS', 'Domains'] },
    ],
    businessContext:
      'Organizational operations depend on multiple SaaS platforms staying configured, connected, and administrable day to day.',
    problem:
      'Without ownership of identity, collaboration, HR/CRM tooling, and DNS/domains, automation and infrastructure work sits on unstable operational ground.',
    objective:
      'Administer Microsoft 365 and related SaaS platforms that keep day-to-day organizational operations running.',
    solution:
      'Administered Microsoft 365, Google Workspace, Zoho, DNS, domains, and SaaS platforms supporting organizational operations—connecting identity, collaboration, and operational tooling.',
    architecture:
      'Operational layer spanning Microsoft 365 and adjacent SaaS (Google Workspace, Zoho), with DNS/domain administration as the routing and identity-adjacent foundation those services rely on.',
    architectureNodes: [
      {
        id: 'saas-collab',
        label: 'Collaboration Suites',
        detail: 'Microsoft 365 and Google Workspace administration.',
      },
      {
        id: 'saas-apps',
        label: 'Business Apps',
        detail: 'Zoho People and Zoho Bigin operational tooling.',
      },
      {
        id: 'saas-dns',
        label: 'DNS & Domains',
        detail: 'Routing and identity-adjacent foundations for SaaS platforms.',
      },
    ],
    responsibilities: [
      'Platform administration',
      'SaaS operations',
      'DNS and domain management',
      'Cross-tool operational support',
    ],
    decisions: [
      {
        decision: 'Treat SaaS administration as platform ownership',
        rationale:
          'Automation and product work fail when collaboration and identity systems are unowned.',
      },
    ],
    challenges: [
      {
        challenge:
          'Keeping multiple SaaS platforms coherent for real organizational workflows.',
        resolution:
          'Owned configuration and day-to-day administration across the tools that production teams actually use.',
      },
    ],
    outcome:
      'Sustained operational continuity across Microsoft 365 and related SaaS platforms that underpin automation and infrastructure initiatives.',
    learnings: [
      'Enterprise SaaS is infrastructure by another name.',
      'Automation quality is capped by how well the surrounding platforms are administered.',
    ],
    gallery: [
      {
        src: n8nLogo,
        caption:
          'Enterprise SaaS operations that keep automation and infrastructure work grounded.',
        type: 'infrastructure',
      },
    ],
    relatedSlugs: [
      'microsoft-365-migration',
      'sharepoint-automations',
      'it-support-ticket-automation',
      'operational-improvements',
    ],
  },
  {
    slug: 'operational-improvements',
    category: 'automation',
    name: 'Operational Improvements',
    summary:
      'Research-driven automation and platform changes that improve reliability and efficiency.',
    status: 'Ongoing',
    difficulty: 'Advanced',
    timeline: '2025 — Present',
    logo: azureLogo,
    logoAlt: 'Microsoft Azure logo',
    coverImage: azureLogo,
    coverImageAlt: 'Operational improvement initiatives',
    technologyIds: ['n8n', 'azure', 'github-actions'],
    technologies: ['n8n', 'Zapier', 'CI/CD', 'Azure'],
    stack: [
      { group: 'Automation', items: ['n8n', 'Zapier'] },
      { group: 'Delivery', items: ['CI/CD'] },
      { group: 'Cloud', items: ['Azure'] },
    ],
    businessContext:
      'Platform reliability and operational efficiency improve when changes are researched, compared, and implemented deliberately—not reacted to under outage pressure alone.',
    problem:
      'Organizations accumulate friction when operational improvements are ad hoc and root causes are never examined before the next workaround.',
    objective:
      'Research and implement automation and platform changes that improve reliability, efficiency, and infrastructure scalability.',
    solution:
      'Researched and implemented technical solutions improving platform reliability, automation, operational efficiency, and infrastructure scalability—using structured root-cause analysis before production changes.',
    architecture:
      'Cross-cutting improvement work spanning automation tooling (n8n/Zapier), delivery discipline (CI/CD), and Azure-hosted platforms—applied where analysis showed durable leverage.',
    architectureNodes: [
      {
        id: 'ops-analysis',
        label: 'Root-Cause Analysis',
        detail: 'Structured evaluation before production changes.',
      },
      {
        id: 'ops-automation',
        label: 'Automation Changes',
        detail: 'n8n and workflow improvements that remove recurrence.',
      },
      {
        id: 'ops-platform',
        label: 'Platform & Cloud',
        detail: 'CI/CD and Azure changes that improve reliability at scale.',
      },
    ],
    responsibilities: [
      'Root-cause analysis',
      'Solution evaluation',
      'Implementation',
      'Production change ownership',
    ],
    decisions: [
      {
        decision: 'Evaluate multiple approaches before production changes',
        rationale:
          'Operational “fixes” that skip analysis often recreate the same incident under a new name.',
      },
    ],
    challenges: [
      {
        challenge: 'Improving systems without introducing reckless change.',
        resolution:
          'Used structured analysis and deliberate implementation so automation and platform changes earned their place in production.',
      },
    ],
    outcome:
      'Continuous operational improvements across automation and platform reliability grounded in analysis rather than guesswork.',
    learnings: [
      'Root-cause analysis is an engineering acceleration tool, not bureaucracy.',
      'The best automation removes recurrence, not only symptoms.',
    ],
    gallery: [
      {
        src: n8nLogo,
        caption:
          'Automation-led operational improvements grounded in root-cause analysis.',
        type: 'workflow',
      },
    ],
    relatedSlugs: [
      'self-hosted-n8n',
      'azure-infrastructure',
      'docker-deployment',
    ],
  },
];
