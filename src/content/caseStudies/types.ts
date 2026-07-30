export type CaseStudyCategory = 'platform' | 'infrastructure' | 'automation'

export type CaseStudyDecision = {
  decision: string
  rationale: string
}

export type CaseStudyChallenge = {
  challenge: string
  resolution: string
}

export type CaseStudyStackGroup = {
  group: string
  items: string[]
}

export type CaseStudy = {
  slug: string
  category: CaseStudyCategory
  name: string
  summary: string
  status: string
  featured?: boolean
  logo?: string
  logoAlt?: string
  technologies: string[]
  stack: CaseStudyStackGroup[]
  businessContext: string
  problem: string
  objective: string
  solution: string
  architecture: string
  responsibilities: string[]
  decisions: CaseStudyDecision[]
  challenges: CaseStudyChallenge[]
  outcome: string
  learnings: string[]
  relatedSlugs: string[]
  incomplete?: boolean
  todoNote?: string
}

export const categoryLabels: Record<CaseStudyCategory, string> = {
  platform: 'Platform Engineering',
  infrastructure: 'Infrastructure Engineering',
  automation: 'Automation Engineering',
}

export const categoryPaths: Record<CaseStudyCategory, string> = {
  platform: '/platforms',
  infrastructure: '/infrastructure',
  automation: '/automation',
}
