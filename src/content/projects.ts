export type ProjectStatus = 'Production' | 'Active' | 'Completed' | 'Internal'

export type Project = {
  slug: string
  name: string
  tagline: string
  featured: boolean
  status: ProjectStatus
  mission: string
  businessProblem: string
  architecture: string
  role: string
  technologies: string[]
  challenges: string[]
  impact: string
  category: string
}

export const projects: Project[] = [
  {
    slug: 'navdrishti',
    name: 'Navdrishti',
    tagline: 'A full-stack platform delivered from concept to production.',
    featured: true,
    status: 'Production',
    mission: 'Ship a reliable product platform with clear ownership from UI to deployment.',
    businessProblem:
      'The team needed a production-ready application that could be operated, monitored, and iterated without fragile handoffs.',
    architecture:
      'React front end, API/services layer, managed data store, containerized deployment with environment isolation and repeatable release paths.',
    role: 'Platform owner — architecture, implementation, deployment, and operational readiness.',
    technologies: ['React', 'TypeScript', 'Supabase', 'Docker', 'Azure'],
    challenges: [
      'Balancing delivery speed with production hardening',
      'Defining clear service boundaries early',
      'Establishing deploy and rollback confidence',
    ],
    impact: 'Delivered a maintainable production system with a clear path for iteration and ownership.',
    category: 'Product Platform',
  },
  {
    slug: 'brainpulses',
    name: 'BrainPulses',
    tagline: 'Product systems thinking applied to a full application lifecycle.',
    featured: true,
    status: 'Active',
    mission: 'Design and ship a coherent product experience backed by solid engineering foundations.',
    businessProblem:
      'Ideas needed to become a stable application with auth, data, and deployment — not a prototype that dies in staging.',
    architecture:
      'Component-driven React UI, backend services, authentication, and cloud-hosted runtime with CI-friendly packaging.',
    role: 'Full-stack systems developer and deployment owner.',
    technologies: ['React', 'TypeScript', 'Node', 'Supabase', 'Docker'],
    challenges: [
      'Turning ambiguous requirements into durable architecture',
      'Keeping UX polish while protecting system reliability',
    ],
    impact: 'Established a product baseline that can scale features without rewriting core systems.',
    category: 'Product Platform',
  },
  {
    slug: 'office365-migration',
    name: 'Office 365 Migration',
    tagline: 'Enterprise tenant migration with continuity as the primary KPI.',
    featured: true,
    status: 'Completed',
    mission: 'Move workloads to Microsoft 365 with minimal disruption and verified identity/access continuity.',
    businessProblem:
      'Legacy collaboration and mail systems needed modernization without breaking day-to-day operations.',
    architecture:
      'Tenant configuration, identity alignment, mailbox/workload cutover planning, validation checklists, and rollback contingencies.',
    role: 'Migration lead — planning, execution, validation, and stakeholder communication.',
    technologies: ['Microsoft 365', 'Entra ID', 'Exchange Online', 'PowerShell'],
    challenges: [
      'Coordinating cutover windows across stakeholders',
      'Preserving permissions and identity mappings',
      'Validating services under real user load',
    ],
    impact: 'Completed a structured migration with operational continuity and a cleaner identity baseline.',
    category: 'Microsoft 365',
  },
  {
    slug: 'azure-infrastructure',
    name: 'Azure Infrastructure',
    tagline: 'Cloud foundations designed for deployability and ownership.',
    featured: true,
    status: 'Production',
    mission: 'Stand up Azure environments that support production apps with clear networking, identity, and resource boundaries.',
    businessProblem:
      'Applications needed a durable cloud home — not ad-hoc resources that become unmaintainable.',
    architecture:
      'Resource grouping, networking, identity, storage, compute, and environment separation for staging/production.',
    role: 'Cloud & infrastructure engineer.',
    technologies: ['Azure', 'Networking', 'IAM', 'Docker', 'Linux'],
    challenges: [
      'Designing least-privilege access from day one',
      'Making environments reproducible',
      'Balancing cost with reliability',
    ],
    impact: 'Created a cloud baseline teams can deploy into with confidence.',
    category: 'Cloud',
  },
  {
    slug: 'it-ticket-automation',
    name: 'IT Ticket Automation',
    tagline: 'Workflow automation that removes repetitive operational load.',
    featured: true,
    status: 'Production',
    mission: 'Automate high-volume IT ticket patterns so humans focus on exceptions and strategy.',
    businessProblem:
      'Manual ticket handling created delay, inconsistency, and wasted engineering time.',
    architecture:
      'n8n workflows connected to ticketing and Microsoft 365 services with clear triggers, guards, and audit-friendly steps.',
    role: 'Automation engineer — design, integration, and operational ownership.',
    technologies: ['n8n', 'Microsoft 365', 'APIs', 'Webhooks'],
    challenges: [
      'Encoding tribal process knowledge into reliable flows',
      'Handling edge cases without false automation',
      'Observability for failed runs',
    ],
    impact: 'Reduced repetitive ticket load and improved response consistency.',
    category: 'Automation',
  },
  {
    slug: 'docker-deployment',
    name: 'Docker Deployment',
    tagline: 'Repeatable containerized delivery for production workloads.',
    featured: true,
    status: 'Production',
    mission: 'Package and ship applications with predictable environments across machines and clouds.',
    businessProblem:
      'Environment drift and manual installs made deployments slow and risky.',
    architecture:
      'Dockerized services, compose/orchestration patterns, environment config separation, and health-check based rollouts.',
    role: 'Deployment owner and platform engineer.',
    technologies: ['Docker', 'Linux', 'CI/CD', 'Azure'],
    challenges: [
      'Secrets and config hygiene',
      'Image size and startup reliability',
      'Parity between local and production',
    ],
    impact: 'Made releases repeatable and reduced “works on my machine” failure modes.',
    category: 'DevOps',
  },
  {
    slug: 'truenas-migration',
    name: 'TrueNAS Migration',
    tagline: 'Storage migration executed with integrity and operational clarity.',
    featured: false,
    status: 'Completed',
    mission: 'Migrate storage workloads to TrueNAS with verified data integrity and clear access patterns.',
    businessProblem:
      'Existing storage was limiting reliability, management, or expansion.',
    architecture:
      'Dataset planning, transfer strategy, permission mapping, validation, and cutover with rollback awareness.',
    role: 'Infrastructure engineer leading migration execution.',
    technologies: ['TrueNAS', 'Linux', 'Networking', 'Storage'],
    challenges: [
      'Minimizing downtime during transfer',
      'Validating integrity at scale',
      'Rebuilding access models cleanly',
    ],
    impact: 'Established a more operable storage foundation with validated migration outcomes.',
    category: 'Infrastructure',
  },
  {
    slug: 'sophos-vpn',
    name: 'Sophos VPN',
    tagline: 'Secure remote access designed for real operational use.',
    featured: true,
    status: 'Production',
    mission: 'Deliver reliable VPN access with sensible security defaults and supportable configuration.',
    businessProblem:
      'Teams needed secure remote connectivity without fragile, undocumented tunnel setups.',
    architecture:
      'Sophos VPN configuration, identity-aware access patterns, network segmentation alignment, and client onboarding docs.',
    role: 'Networking & security configuration owner.',
    technologies: ['Sophos', 'VPN', 'Networking', 'Security'],
    challenges: [
      'Balancing usability with security',
      'Documenting onboarding for non-experts',
      'Troubleshooting across client environments',
    ],
    impact: 'Enabled secure remote work with a supportable and documented access path.',
    category: 'Networking',
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}
