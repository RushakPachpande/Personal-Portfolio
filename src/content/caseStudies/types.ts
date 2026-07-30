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

export type CaseStudyMediaItem = {
  src: string
  caption: string
  type: 'screenshot' | 'architecture' | 'workflow' | 'infrastructure' | 'deployment' | 'network'
}

export type ArchitectureNode = {
  id: string
  label: string
  detail: string
}

export type CaseStudy = {
  slug: string
  category: CaseStudyCategory
  name: string
  summary: string
  status: string
  featured?: boolean
  difficulty?: 'Intermediate' | 'Advanced' | 'Complex'
  timeline?: string
  logo?: string
  logoAlt?: string
  coverImage?: string
  coverImageAlt?: string
  technologies: string[]
  technologyIds?: string[]
  stack: CaseStudyStackGroup[]
  businessContext: string
  problem: string
  objective: string
  solution: string
  architecture: string
  architectureNodes?: ArchitectureNode[]
  responsibilities: string[]
  decisions: CaseStudyDecision[]
  challenges: CaseStudyChallenge[]
  outcome: string
  learnings: string[]
  gallery?: CaseStudyMediaItem[]
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
