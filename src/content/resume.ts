export type ResumeHighlight = {
  id: string;
  label: string;
  detail?: string;
};

export type ResumeExpertiseGroup = {
  id: string;
  title: string;
  items: string[];
};

export type ResumeExperience = {
  id: string;
  organization: string;
  period: string;
  role: string;
  bullets: string[];
};

export type ResumeProject = {
  id: string;
  name: string;
  role: string;
  bullets: string[];
  stack: string[];
  caseStudy?: {
    slug: string;
    category: 'platform' | 'infrastructure' | 'automation';
  };
};

export type ResumeEducation = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  detail: string;
};

export type ResumeCertificationGroup = {
  id: string;
  provider: string;
  items: string[];
};

export const resumeHighlights: ResumeHighlight[] = [
  { id: 'navdrishti', label: 'Primary Technical Owner - Navdrishti' },
  { id: 'azure', label: 'Azure cost optimization', detail: '~50% reduction' },
  { id: 'm365', label: 'Microsoft 365 migration', detail: '50+ users' },
  {
    id: 'infra',
    label: 'Self-hosted production infrastructure',
    detail: 'Supabase & n8n',
  },
  { id: 'cicd', label: 'CI/CD for multi-environment deployments' },
  { id: 'captive', label: 'Secure Wi-Fi captive portal' },
  { id: 'aa', label: 'Automation Anywhere deployment recovery' },
  { id: 'nas', label: 'Secure remote NAS architecture' },
];

export const coreCompetencies: string[] = [
  'Platform Engineering',
  'Cloud & Infrastructure Management',
  'Solution Architecture & Technical Problem Solving',
  'Production Systems Ownership',
  'Application Engineering & Systems Integration',
  'Process Automation & Workflow Optimization',
];

export const technicalExpertise: ResumeExpertiseGroup[] = [
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    items: [
      'Microsoft Azure',
      'Linux (Ubuntu)',
      'Virtual Machines',
      'TrueNAS',
      'DNS & Domain Management',
      'Basic Networking',
    ],
  },
  {
    id: 'application',
    title: 'Application Engineering',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend & Databases',
    items: ['PostgreSQL', 'Supabase', 'MongoDB', 'MySQL'],
  },
  {
    id: 'devops',
    title: 'DevOps & Automation',
    items: ['Git', 'GitHub', 'Docker', 'CI/CD', 'n8n', 'Zapier'],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Platforms',
    items: [
      'Microsoft 365',
      'Google Workspace',
      'Zoho People',
      'Zoho Bigin',
      'WIX',
    ],
  },
  {
    id: 'ai',
    title: 'AI-Assisted Engineering',
    items: [
      'ChatGPT',
      'OpenAI Codex',
      'Claude Code',
      'GitHub Copilot',
      'Cursor',
      'Windsurf',
      'Gemini',
      'Prompt Engineering',
      'AI-assisted Development Workflows',
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    items: ['Java', 'Python (Basic)'],
  },
];

export const professionalExperience: ResumeExperience[] = [
  {
    id: 'nextgen',
    organization: 'NextGenInnov8, Pune',
    period: 'Apr 2025 - Present',
    role: 'Platform & Technology Professional',
    bullets: [
      'Took technical ownership of production platforms, cloud infrastructure, and internal technology systems, ensuring reliable operations and continuous improvements.',
      'Designed, developed, and deployed Navdrishti, a role-based student placement management platform, establishing CI/CD pipelines and managing development, staging, and production environments.',
      'Designed secure backend architectures using Supabase (PostgreSQL) with Role-Based Access Control (RBAC), Row Level Security (RLS), and scalable database structures.',
      'Managed Microsoft Azure infrastructure hosting production applications while optimizing cloud resources and reducing infrastructure costs by nearly 50%.',
      'Designed, self-hosted, migrated, and maintained the organization’s production n8n automation platform, evolving its architecture from SQLite to PostgreSQL for long-term production reliability.',
      'Maintained and enhanced the BrainPulses platform through production fixes, feature enhancements, UI improvements, and client-specific customizations.',
      'Led technical planning and coordination for an organization-wide Microsoft 365 tenant migration involving 50+ users, vendor coordination, migration activities, and post-migration support.',
      'Administered Microsoft 365, Google Workspace, Zoho, DNS, domains, and SaaS platforms supporting day-to-day organizational operations.',
      'Researched and implemented technical solutions improving platform reliability, automation, operational efficiency, and infrastructure scalability.',
      'Applied structured root-cause analysis and evaluated multiple solution approaches before implementing production changes.',
    ],
  },
];

export const keyProjects: ResumeProject[] = [
  {
    id: 'navdrishti',
    name: 'Navdrishti',
    role: 'Primary Technical Owner',
    caseStudy: { slug: 'navdrishti', category: 'platform' },
    bullets: [
      'Leading end-to-end technical ownership of a role-based student placement management platform currently in the final development, validation, and rollout phase.',
      'Designed application architecture, secure RBAC, scalable PostgreSQL database, and backend using Supabase.',
      'Built responsive React interfaces, audit logging, CI/CD pipelines, and multi-environment deployment workflows.',
      'Managed local, staging, and production environments supporting future platform scalability.',
    ],
    stack: [
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Docker',
      'GitHub Actions',
      'Azure',
    ],
  },
  {
    id: 'brainpulses',
    name: 'BrainPulses',
    role: 'Production Platform Maintainer',
    caseStudy: { slug: 'brainpulses', category: 'platform' },
    bullets: [
      'Maintained production quiz platform through feature enhancements, UI improvements, production fixes, and client-specific customizations.',
      'Supported large-scale live quiz events and designed the BrainPulses 2.0 prototype architecture for improved scalability and maintainability.',
    ],
    stack: ['React', 'JavaScript', 'MongoDB', 'Azure Storage', 'n8n'],
  },
  {
    id: 'supabase',
    name: 'Self-Hosted Supabase',
    role: 'Infrastructure & Database Engineer',
    caseStudy: { slug: 'self-hosted-supabase', category: 'infrastructure' },
    bullets: [
      'Designed and deployed a self-hosted Supabase platform on a Linux VPS supporting development, staging, and future production environments.',
      'Configured PostgreSQL, authentication, storage, Docker deployment, backups, updates, and secure infrastructure management.',
    ],
    stack: ['Supabase', 'PostgreSQL', 'Docker', 'Linux', 'VPS'],
  },
  {
    id: 'n8n',
    name: 'Self-Hosted n8n',
    role: 'Platform Administrator & Automation Engineer',
    caseStudy: { slug: 'self-hosted-n8n', category: 'automation' },
    bullets: [
      'Introduced and self-hosted the organization’s first n8n automation platform, initially using SQLite before redesigning the production deployment with PostgreSQL.',
      'Deployed and maintained a secure Docker-based production environment with monitoring, backups, upgrades, and workflow troubleshooting.',
    ],
    stack: ['n8n', 'PostgreSQL', 'Docker', 'Linux', 'VPS'],
  },
];

export const resumeEducation: ResumeEducation[] = [
  {
    id: 'mca',
    degree: 'Master of Computer Applications (MCA)',
    institution: "ASM's IBMR, Pune",
    period: '2023 - 2025',
    detail: 'CGPA: 7.57',
  },
  {
    id: 'bba',
    degree: 'Bachelor of Business Administration (Computer Applications)',
    institution: "ASM's CSIT, Pune",
    period: '2019 - 2022',
    detail: 'CGPA: 7.58',
  },
];

export const resumeCertifications: ResumeCertificationGroup[] = [
  {
    id: 'microsoft-learn',
    provider: 'Microsoft Learn',
    items: [
      // Cloud fundamentals
      'Describe Cloud Computing',
      'Describe Cloud Services',
      'Describe Core Components of Azure',
      'Benefits of Using Cloud',
      'Introduction to Cloud Infrastructure',
      // Azure
      'Azure architecture and services',
      'Azure compute services',
      'Azure identity, access, and security',
      'Azure management and governance',
      'Azure networking services',
      'Azure storage services',
      'Features and tools in Azure',
      'Monitoring tools in Azure',
      'Tools for managing and deploying Azure resources',
      'Cost management in Azure',
      // Git & GitHub
      'Introduction to Git',
      'Introduction to GitHub',
      'Introduction to GitHub Copilot',
      'Manage repository changes on GitHub',
      'Repository Migration with best practices',
    ],
  },
  {
    id: 'anthropic',
    provider: 'Anthropic',
    items: ['Claude Code'],
  },
  {
    id: 'software',
    provider: 'Software Development',
    items: [
      'Full Stack Developer (Java Plus) - Seed Infotech & NSDC',
      'Advanced Java & Web Programming - Anudip Foundation',
    ],
  },
  {
    id: 'simulations',
    provider: 'Industry Simulations',
    items: [
      'Software Engineering Job Simulation - Hewlett Packard Enterprise (Forage)',
      'Software Engineering Job Simulation - Wells Fargo (Forage)',
    ],
  },
];
