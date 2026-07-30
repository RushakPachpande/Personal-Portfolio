import navdrishtiLogo from '@/assets/logos/navdrishti.png'
import brainpulsesLogo from '@/assets/logos/brainpulses.png'
import type { CaseStudy } from './types'

export const platformCaseStudies: CaseStudy[] = [
  {
    slug: 'navdrishti',
    category: 'platform',
    name: 'Navdrishti',
    summary: 'Role-based student placement management platform owned end-to-end.',
    status: 'Final development, validation, and rollout',
    featured: true,
    logo: navdrishtiLogo,
    logoAlt: 'Navdrishti logo',
    technologies: [
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Docker',
      'GitHub Actions',
      'Azure',
    ],
    stack: [
      { group: 'Frontend', items: ['React', 'TypeScript'] },
      { group: 'Backend & Data', items: ['Supabase', 'PostgreSQL', 'RBAC', 'RLS'] },
      { group: 'Infrastructure', items: ['Docker', 'Azure', 'Multi-environment deploy'] },
      { group: 'Delivery', items: ['GitHub Actions', 'CI/CD'] },
    ],
    businessContext:
      'The organization needed a student placement management platform that could support role-based access, auditability, and reliable environments—without fragile handoffs between design, development, and operations.',
    problem:
      'Building and operating a placement platform requires more than UI features: secure data access, environment separation, deployment discipline, and clear ownership through validation and rollout.',
    objective:
      'Deliver a production-ready placement platform with secure RBAC, scalable data design, CI/CD, and local/staging/production environments ready for rollout.',
    solution:
      'Took primary technical ownership of Navdrishti: designed application architecture, secure RBAC with Row Level Security on PostgreSQL via Supabase, responsive React interfaces, audit logging, CI/CD pipelines, and multi-environment deployment workflows.',
    architecture:
      'React/TypeScript client against a Supabase-backed PostgreSQL data layer with RBAC and RLS. Application environments separated across local, staging, and production. Docker packaging and GitHub Actions drive repeatable releases onto Azure-hosted infrastructure.',
    responsibilities: [
      'Architecture',
      'Planning',
      'Development',
      'Deployment',
      'Infrastructure alignment',
      'Documentation',
      'Production readiness',
    ],
    decisions: [
      {
        decision: 'Supabase + PostgreSQL with RBAC/RLS',
        rationale:
          'Needed a secure, role-aware data layer without building auth and authorization from scratch, while keeping a scalable relational model for placement workflows.',
      },
      {
        decision: 'React + TypeScript for the interface',
        rationale:
          'Component-driven UI with type safety supports complex role-based flows and long-term maintainability under active ownership.',
      },
      {
        decision: 'CI/CD and multi-environment deployment',
        rationale:
          'Placement platforms fail when staging and production drift. Explicit environments and automated pipelines reduce release risk during rollout.',
      },
      {
        decision: 'Docker + Azure hosting alignment',
        rationale:
          'Containerized delivery keeps local, staging, and production closer together while fitting the organization’s Azure footprint.',
      },
    ],
    challenges: [
      {
        challenge: 'Balancing delivery speed with production hardening during final validation and rollout.',
        resolution:
          'Prioritized RBAC/RLS, audit logging, and environment separation early so feature work landed on a foundation that could be operated safely.',
      },
      {
        challenge: 'Keeping development, staging, and production coherent as the platform matured.',
        resolution:
          'Established CI/CD and deployment workflows that treat environments as first-class parts of the product, not afterthoughts.',
      },
    ],
    outcome:
      'Established end-to-end technical ownership of Navdrishti with CI/CD and environment separation supporting future platform scalability through final development, validation, and rollout.',
    learnings: [
      'Ownership means carrying architecture, access control, and deployability—not only feature tickets.',
      'RBAC and environment discipline are product requirements when the system handles real institutional workflows.',
      'CI/CD is how multi-environment platforms stay honest under change.',
    ],
    relatedSlugs: ['brainpulses', 'self-hosted-supabase', 'azure-infrastructure', 'docker-deployment'],
  },
  {
    slug: 'brainpulses',
    category: 'platform',
    name: 'BrainPulses',
    summary: 'Production quiz platform maintained through live events and evolution toward 2.0.',
    status: 'Production',
    featured: true,
    logo: brainpulsesLogo,
    logoAlt: 'BrainPulses logo',
    technologies: ['React', 'JavaScript', 'MongoDB', 'Azure Storage', 'n8n'],
    stack: [
      { group: 'Frontend', items: ['React', 'JavaScript'] },
      { group: 'Backend & Data', items: ['MongoDB'] },
      { group: 'Cloud', items: ['Azure Storage'] },
      { group: 'Automation', items: ['n8n'] },
    ],
    businessContext:
      'BrainPulses is a live quiz platform used for large-scale events and client-specific experiences. It needed ongoing production care—not a one-time build-and-forget delivery.',
    problem:
      'Production quiz events expose reliability and UX gaps quickly. The platform required continuous fixes, enhancements, customizations, and a clearer path toward a more maintainable next-generation architecture.',
    objective:
      'Keep the production platform reliable for live events while improving UX and defining BrainPulses 2.0 architecture for scalability and maintainability.',
    solution:
      'Maintained and enhanced BrainPulses through production fixes, feature work, UI improvements, and client-specific customizations. Supported large-scale live quiz events and designed a BrainPulses 2.0 prototype architecture.',
    architecture:
      'React front end with JavaScript application logic, MongoDB for application data, Azure Storage for supporting assets, and n8n where workflow automation supports operations. Evolution work focuses on clearer boundaries for a more maintainable 2.0 architecture.',
    responsibilities: [
      'Production support',
      'Feature development',
      'UI improvements',
      'Client customizations',
      'Architecture planning (2.0)',
    ],
    decisions: [
      {
        decision: 'Invest in production maintenance before a full rewrite',
        rationale:
          'Live events cannot wait for a greenfield rebuild. Stability and targeted enhancements protect business continuity while 2.0 architecture is designed.',
      },
      {
        decision: 'Prototype BrainPulses 2.0 architecture separately',
        rationale:
          'Improving scalability and maintainability requires deliberate architecture work without destabilizing the current production path.',
      },
      {
        decision: 'Use n8n where operational workflows help',
        rationale:
          'Automation reduces repetitive operational load around a live platform without forcing every process into the core application.',
      },
    ],
    challenges: [
      {
        challenge: 'Supporting large-scale live quiz events while continuing feature and UI work.',
        resolution:
          'Treated production reliability as the primary constraint—fixes and customizations were validated against real event pressure.',
      },
      {
        challenge: 'Improving maintainability without disrupting an active production platform.',
        resolution:
          'Separated near-term production care from BrainPulses 2.0 architecture planning so evolution could proceed without reckless rewrites.',
      },
    ],
    outcome:
      'Sustained production operations for live events while defining a clearer architecture path for BrainPulses 2.0.',
    learnings: [
      'Production ownership is continuous: events reveal what architecture and process must absorb.',
      'Prototype the next architecture while protecting the system that currently earns trust.',
      'Client-specific needs should not permanently fracture a platform—document and contain them.',
    ],
    relatedSlugs: ['navdrishti', 'self-hosted-n8n', 'azure-infrastructure'],
  },
]
