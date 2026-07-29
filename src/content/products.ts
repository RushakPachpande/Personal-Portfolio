export type Product = {
  slug: string
  name: string
  tagline: string
  role: string
  status: string
  mission: string
  problem: string
  solution: string
  technology: string[]
  outcome: string
  incomplete?: boolean
  todoNote?: string
}

export const products: Product[] = [
  {
    slug: 'navdrishti',
    name: 'Navdrishti',
    tagline: 'Role-based student placement management platform.',
    role: 'Primary Technical Owner',
    status: 'Final development, validation, and rollout',
    mission:
      'Deliver a production-ready placement platform with secure access control, reliable environments, and a clear path to scale.',
    problem:
      'The organization needed a role-based student placement management platform owned end-to-end—from architecture and development through deployment and operational readiness.',
    solution:
      'Designed application architecture with secure RBAC, a scalable PostgreSQL data model, and a Supabase-backed backend. Built responsive React interfaces, audit logging, CI/CD pipelines, and multi-environment deployment workflows across local, staging, and production.',
    technology: [
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Docker',
      'GitHub Actions',
      'Azure',
    ],
    outcome:
      'Established end-to-end technical ownership of Navdrishti with CI/CD and environment separation supporting future platform scalability.',
  },
  {
    slug: 'brainpulses',
    name: 'BrainPulses',
    tagline: 'Production quiz platform with live-event support.',
    role: 'Production Platform Maintainer',
    status: 'Production',
    mission:
      'Keep a live quiz platform reliable while improving UX and preparing a more maintainable next-generation architecture.',
    problem:
      'A production quiz platform required ongoing fixes, feature work, client-specific customizations, and support for large-scale live events.',
    solution:
      'Maintained and enhanced BrainPulses through production fixes, feature enhancements, UI improvements, and client-specific customizations. Supported large-scale live quiz events and designed the BrainPulses 2.0 prototype architecture for improved scalability and maintainability.',
    technology: ['React', 'JavaScript', 'MongoDB', 'Azure Storage', 'n8n'],
    outcome:
      'Sustained production operations for live events while defining a clearer architecture path for BrainPulses 2.0.',
  },
  {
    slug: 'it-ticket-automation',
    name: 'IT Ticket Automation',
    tagline: 'Operational ticket workflow automation.',
    role: 'TODO',
    status: 'Details forthcoming',
    mission: 'TODO: Define mission from verified project context.',
    problem: 'TODO: Document the business problem from resume/portfolio context.',
    solution: 'TODO: Document the solution approach once source details are available.',
    technology: [],
    outcome: 'TODO: Document verified outcomes.',
    incomplete: true,
    todoNote:
      'Listed in Phase 1 structure; not detailed as a named project in the current resume. Content pending verified source material.',
  },
]

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getCompleteProducts() {
  return products.filter((product) => !product.incomplete)
}
