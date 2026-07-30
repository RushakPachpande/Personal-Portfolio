import type { CaseStudy } from './types'

export const infrastructureCaseStudies: CaseStudy[] = [
  {
    slug: 'microsoft-365-migration',
    category: 'infrastructure',
    name: 'Microsoft 365 Tenant Migration',
    summary: 'Organization-wide Microsoft 365 tenant migration for 50+ users.',
    status: 'Completed',
    featured: true,
    technologies: ['Microsoft 365', 'Entra ID', 'Exchange Online', 'Tenant operations'],
    stack: [
      { group: 'Enterprise Platforms', items: ['Microsoft 365', 'Exchange Online'] },
      { group: 'Identity', items: ['Entra ID / identity alignment'] },
      { group: 'Operations', items: ['Tenant migration', 'Vendor coordination', 'Post-migration support'] },
    ],
    businessContext:
      'The organization needed to move collaboration and mail workloads onto a coherent Microsoft 365 tenant without breaking day-to-day operations for a growing user base.',
    problem:
      'Tenant migration is high-risk operational work: identity, mailboxes, access continuity, vendor coordination, and post-cutover support all have to stay aligned for 50+ users.',
    objective:
      'Plan and coordinate an organization-wide Microsoft 365 tenant migration with vendor coordination, migration activities, and post-migration support.',
    solution:
      'Led technical planning and coordination across migration activities, vendor engagement, and post-migration support so users landed on a stable tenant baseline.',
    architecture:
      'Migration centered on Microsoft 365 tenant configuration, identity alignment, mailbox/workload cutover planning, validation under real usage, and operational follow-through after cutover.',
    responsibilities: [
      'Planning',
      'Technical coordination',
      'Vendor coordination',
      'Migration execution support',
      'Post-migration support',
    ],
    decisions: [
      {
        decision: 'Treat migration as a coordinated program, not a one-click cutover',
        rationale:
          'Identity and mailbox continuity fail when planning, vendor work, and validation are improvised under time pressure.',
      },
      {
        decision: 'Invest in post-migration support',
        rationale:
          'Tenant moves are not finished at cutover—user and service issues surface after people actually work in the new environment.',
      },
    ],
    challenges: [
      {
        challenge: 'Coordinating cutover windows and stakeholders across 50+ users.',
        resolution:
          'Used structured planning and vendor coordination to keep migration activities sequenced and supportable.',
      },
      {
        challenge: 'Preserving operational continuity during and after migration.',
        resolution:
          'Paired migration activities with post-migration support rather than treating cutover as the finish line.',
      },
    ],
    outcome:
      'Led migration involving 50+ users, including planning, coordination, execution support, and post-migration follow-through.',
    learnings: [
      'Enterprise migrations succeed on coordination quality as much as tooling.',
      'Identity and mailbox continuity are the real success criteria users feel.',
      'Post-migration support is part of the engineering outcome.',
    ],
    relatedSlugs: ['azure-infrastructure', 'sharepoint-automations', 'microsoft-integrations'],
  },
  {
    slug: 'azure-infrastructure',
    category: 'infrastructure',
    name: 'Azure Infrastructure',
    summary: 'Production Azure hosting with nearly 50% infrastructure cost reduction.',
    status: 'Production',
    featured: true,
    technologies: ['Microsoft Azure', 'Virtual Machines', 'DNS', 'Linux'],
    stack: [
      { group: 'Cloud', items: ['Microsoft Azure', 'Virtual Machines'] },
      { group: 'Networking', items: ['DNS', 'Domain management'] },
      { group: 'Compute OS', items: ['Linux'] },
    ],
    businessContext:
      'Production applications needed a durable Azure home—not ad-hoc resources that become expensive and hard to operate.',
    problem:
      'Cloud spend and operational clarity drift when production workloads are hosted without ongoing optimization and ownership.',
    objective:
      'Manage Microsoft Azure infrastructure hosting production applications while optimizing cloud resources for cost and reliability.',
    solution:
      'Owned Azure infrastructure for production applications and optimized cloud resources, reducing infrastructure costs by nearly 50% while keeping workloads operable.',
    architecture:
      'Azure-hosted compute and supporting networking/DNS for production applications, with Linux-based hosts where required and ongoing resource optimization as part of ownership.',
    responsibilities: [
      'Cloud infrastructure ownership',
      'Cost optimization',
      'Production hosting',
      'Operational reliability',
    ],
    decisions: [
      {
        decision: 'Optimize existing Azure footprint rather than only scaling up',
        rationale:
          'Reliability and cost are both ownership outcomes—unused or oversized resources quietly tax the business.',
      },
      {
        decision: 'Keep production hosting under explicit technical ownership',
        rationale:
          'Applications fail in production when infrastructure is nobody’s product.',
      },
    ],
    challenges: [
      {
        challenge: 'Reducing cost without undermining production reliability.',
        resolution:
          'Optimized cloud resources with production hosting responsibilities still owned end-to-end—not cut blindly.',
      },
    ],
    outcome:
      'Optimized cloud resources and reduced Azure infrastructure costs by nearly 50%.',
    learnings: [
      'Cost optimization is an engineering discipline when you own production.',
      'Cloud platforms need the same ownership mindset as application code.',
    ],
    relatedSlugs: ['navdrishti', 'docker-deployment', 'linux-administration', 'self-hosted-supabase'],
  },
  {
    slug: 'self-hosted-supabase',
    category: 'infrastructure',
    name: 'Self-Hosted Supabase',
    summary: 'Self-hosted Supabase on Linux VPS for development, staging, and future production.',
    status: 'Production foundation',
    technologies: ['Supabase', 'PostgreSQL', 'Docker', 'Linux', 'VPS'],
    stack: [
      { group: 'Data Platform', items: ['Supabase', 'PostgreSQL', 'Authentication', 'Storage'] },
      { group: 'Infrastructure', items: ['Docker', 'Linux', 'VPS', 'Backups'] },
    ],
    businessContext:
      'Platform work needed a controlled data/auth/storage foundation across environments—not only a managed black box with no operational learning path.',
    problem:
      'Teams building products need PostgreSQL, auth, and storage that can be deployed, backed up, updated, and secured across development and staging with a path to production.',
    objective:
      'Design and deploy a self-hosted Supabase platform on a Linux VPS supporting development, staging, and future production environments.',
    solution:
      'Designed and deployed self-hosted Supabase with PostgreSQL, authentication, storage, Docker deployment, backups, updates, and secure infrastructure management.',
    architecture:
      'Dockerized Supabase stack on Linux VPS: PostgreSQL as the system of record, Supabase services for auth and storage, with backup/update practices treated as part of the platform.',
    responsibilities: [
      'Infrastructure design',
      'Database platform setup',
      'Docker deployment',
      'Backups and updates',
      'Secure operations',
    ],
    decisions: [
      {
        decision: 'Self-host Supabase on a Linux VPS',
        rationale:
          'Gave the organization environment control, operational visibility, and a foundation aligned with other self-hosted platforms.',
      },
      {
        decision: 'Docker-based deployment',
        rationale:
          'Packaging the stack as containers made updates and environment parity more repeatable than ad-hoc installs.',
      },
    ],
    challenges: [
      {
        challenge: 'Operating a full data platform securely with backups and updates.',
        resolution:
          'Included backups, updates, and secure infrastructure management in the deployment design—not as deferred chores.',
      },
    ],
    outcome:
      'Configured PostgreSQL, authentication, storage, Docker deployment, backups, updates, and secure infrastructure management for ongoing platform work.',
    learnings: [
      'Data platforms are infrastructure products—they need ownership beyond “it installed.”',
      'Backups and updates are architecture decisions, not ops trivia.',
    ],
    relatedSlugs: ['navdrishti', 'docker-deployment', 'self-hosted-n8n', 'linux-administration'],
  },
  {
    slug: 'docker-deployment',
    category: 'infrastructure',
    name: 'Docker Production Environment',
    summary: 'Containerized delivery for self-hosted production platforms.',
    status: 'Production',
    technologies: ['Docker', 'Linux', 'VPS', 'CI/CD'],
    stack: [
      { group: 'Containers', items: ['Docker'] },
      { group: 'Hosts', items: ['Linux', 'VPS'] },
      { group: 'Delivery', items: ['CI/CD', 'Multi-environment releases'] },
    ],
    businessContext:
      'Self-hosted platforms (Supabase, n8n, application releases) needed predictable packaging across machines and environments.',
    problem:
      'Environment drift and manual installs make deployments slow and risky when multiple production services share operational ownership.',
    objective:
      'Package and operate production services with Docker-based deployments for reliable self-hosted platforms.',
    solution:
      'Used Docker as the deployment foundation for self-hosted Supabase and n8n production environments, alongside CI/CD for multi-environment application releases.',
    architecture:
      'Containerized services on Linux VPS hosts, with configuration separated from images and release discipline supported by CI/CD where application environments require it.',
    responsibilities: [
      'Deployment ownership',
      'Container packaging',
      'Environment alignment',
      'Release support',
    ],
    decisions: [
      {
        decision: 'Standardize on Docker for self-hosted production services',
        rationale:
          'A common packaging model reduces “works on my machine” failure modes across Supabase, n8n, and related platforms.',
      },
      {
        decision: 'Pair containers with CI/CD for application environments',
        rationale:
          'Containers alone are not a release process—pipelines make multi-environment delivery repeatable.',
      },
    ],
    challenges: [
      {
        challenge: 'Keeping local, staging, and production behavior close enough to trust.',
        resolution:
          'Used Docker packaging and CI-friendly release paths so environments shared a clearer deploy model.',
      },
    ],
    outcome:
      'Established Docker as the deployment foundation for self-hosted production platforms and multi-environment application releases.',
    learnings: [
      'Deployment is part of the product architecture.',
      'Containers earn their keep when paired with ownership of updates, config, and releases.',
    ],
    relatedSlugs: ['self-hosted-supabase', 'self-hosted-n8n', 'navdrishti', 'linux-administration'],
  },
  {
    slug: 'linux-administration',
    category: 'infrastructure',
    name: 'Linux Administration',
    summary: 'Day-to-day ownership of Linux VPS and production hosts.',
    status: 'Ongoing',
    technologies: ['Linux (Ubuntu)', 'VPS', 'Docker', 'Backups'],
    stack: [
      { group: 'Systems', items: ['Linux (Ubuntu)', 'VPS'] },
      { group: 'Runtime', items: ['Docker'] },
      { group: 'Operations', items: ['Backups', 'Updates', 'Secure management'] },
    ],
    businessContext:
      'Self-hosted platforms only stay trustworthy if the underlying Linux hosts are owned—patched, backed up, and operated deliberately.',
    problem:
      'Without host ownership, Docker platforms and production services accumulate silent risk around updates, access, and recovery.',
    objective:
      'Operate Linux servers supporting self-hosted platforms, backups, updates, and secure infrastructure management.',
    solution:
      'Maintained Linux-based production and staging hosts used for self-hosted Supabase, n8n, and related platform services.',
    architecture:
      'Ubuntu Linux VPS hosts running containerized platform services, with backups and secure administrative practices as standing operational requirements.',
    responsibilities: [
      'Host administration',
      'Backups',
      'Updates',
      'Secure access',
      'Production support',
    ],
    decisions: [
      {
        decision: 'Treat Linux hosts as first-class production systems',
        rationale:
          'Application reliability collapses when the host layer is informal or unowned.',
      },
    ],
    challenges: [
      {
        challenge: 'Keeping multiple self-hosted services healthy on shared operational practices.',
        resolution:
          'Applied consistent host-level ownership—backups, updates, and secure management—across the platforms those hosts run.',
      },
    ],
    outcome:
      'Maintained Linux-based production and staging hosts used for self-hosted Supabase, n8n, and related platform services.',
    learnings: [
      'Infrastructure ownership includes the boring work that prevents outages.',
      'Host discipline is what makes self-hosting a strategy instead of a liability.',
    ],
    relatedSlugs: ['docker-deployment', 'self-hosted-supabase', 'self-hosted-n8n'],
  },
  {
    slug: 'truenas-migration',
    category: 'infrastructure',
    name: 'TrueNAS Migration & Secure Remote NAS',
    summary: 'TrueNAS SCALE migration with VPN-based secure remote access.',
    status: 'Completed',
    technologies: ['TrueNAS SCALE', 'Linux', 'SMB', 'Networking', 'VPN', 'RBAC'],
    stack: [
      { group: 'Storage', items: ['TrueNAS SCALE', 'Pools', 'Datasets', 'SMB shares'] },
      { group: 'Access', items: ['VPN', 'RBAC', 'Permissions'] },
      { group: 'Operations', items: ['Migration cutover', 'Documentation'] },
    ],
    businessContext:
      'Organizational storage needed modernization for reliability and centralized file access, including secure remote access for authorized users.',
    problem:
      'Legacy NAS hardware and access patterns limited reliability, maintainability, and secure remote use.',
    objective:
      'Modernize organizational storage by migrating to TrueNAS SCALE—improving hardware reliability, centralizing file storage, and enabling secure remote access for authorized users.',
    solution:
      'Planned and executed migration from ThinkStation S30 to P500; configured pools, datasets, permissions, and shares; integrated VPN-based remote access; validated cutover and documented operations.',
    architecture:
      'TrueNAS SCALE as the storage platform with structured pools/datasets, permissioned SMB shares, and remote access gated through VPN rather than direct public exposure.',
    responsibilities: [
      'Migration planning',
      'Storage configuration',
      'Permissions and shares',
      'VPN integration',
      'Cutover validation',
      'Documentation',
    ],
    decisions: [
      {
        decision: 'Migrate to TrueNAS SCALE on updated hardware',
        rationale:
          'Centralized, maintainable storage with clearer operational controls than continuing on aging ThinkStation S30 hosting.',
      },
      {
        decision: 'Require VPN for remote NAS access',
        rationale:
          'Remote file access should not mean exposing storage services directly to the internet.',
      },
    ],
    challenges: [
      {
        challenge: 'Migrating storage with minimal disruption while rebuilding access cleanly.',
        resolution:
          'Planned cutover with validation and documentation so performance, scalability, and remote accessibility improved together.',
      },
    ],
    outcome:
      'Successfully migrated the NAS with minimal disruption while improving performance, scalability, maintainability, and secure remote accessibility.',
    learnings: [
      'Storage migrations are trust migrations—permissions and remote access matter as much as capacity.',
      'Documentation turns a successful cutover into an operable platform.',
    ],
    relatedSlugs: ['sophos-vpn', 'linux-administration'],
  },
  {
    slug: 'sophos-vpn',
    category: 'infrastructure',
    name: 'Sophos VPN & Secure Remote Access',
    summary: 'Sophos Firewall VPN for protected remote access to internal servers and NAS.',
    status: 'Production',
    technologies: ['Sophos Firewall', 'SSL VPN', 'IPSec VPN', 'NAT', 'Firewall Policies'],
    stack: [
      { group: 'Security Gateway', items: ['Sophos Firewall', 'Firewall policies', 'NAT'] },
      { group: 'Remote Access', items: ['SSL VPN', 'IPSec VPN'] },
      { group: 'Internal Targets', items: ['Servers', 'NAS', 'Role-based access'] },
    ],
    businessContext:
      'Employees and administrators needed remote reachability to internal servers and NAS without exposing services directly to the internet.',
    problem:
      'Direct exposure of internal services increases attack surface. Remote work needs a supportable VPN architecture with clear policies and tested routing.',
    objective:
      'Provide secure remote connectivity for employees and administrators via VPN instead of exposing services directly to the internet.',
    solution:
      'Designed VPN architecture; configured Sophos firewall policies, NAT, and access rules; planned role-based access to internal resources; integrated VPN with servers and NAS; tested connectivity/routing/security and documented operations.',
    architecture:
      'Sophos Firewall as the remote access edge, with VPN termination, NAT and firewall policies controlling which identities/roles can reach internal servers and NAS.',
    responsibilities: [
      'Architecture',
      'Firewall and VPN configuration',
      'Access policy design',
      'Integration testing',
      'Documentation',
    ],
    decisions: [
      {
        decision: 'VPN-first remote access instead of public service exposure',
        rationale:
          'Reduces external attack surface while preserving operational flexibility for administrators and authorized users.',
      },
      {
        decision: 'Role-based access to internal resources',
        rationale:
          'Remote connectivity without authorization boundaries recreates the same risk inside the tunnel.',
      },
    ],
    challenges: [
      {
        challenge: 'Balancing usability of remote access with security controls.',
        resolution:
          'Combined policy design, NAT/firewall rules, and connectivity testing with operational documentation for supportable use.',
      },
    ],
    outcome:
      'Implemented secure remote access so administrators can reach internal infrastructure while reducing external attack surface and improving operational flexibility.',
    learnings: [
      'Remote access is an architecture choice with security consequences.',
      'VPN success is measured in tested policies and operable documentation, not only a working tunnel.',
    ],
    relatedSlugs: ['truenas-migration', 'linux-administration'],
  },
]
