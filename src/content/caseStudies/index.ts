import { automationCaseStudies } from './automation'
import { infrastructureCaseStudies } from './infrastructure'
import { platformCaseStudies } from './platforms'
import type { CaseStudy, CaseStudyCategory } from './types'
import { mapTechnologyNameToId } from '@/content/technologies'

export type {
  CaseStudy,
  CaseStudyCategory,
  CaseStudyChallenge,
  CaseStudyDecision,
  CaseStudyMediaItem,
  CaseStudyStackGroup,
  ArchitectureNode,
} from './types'
export { categoryLabels, categoryPaths } from './types'

const defaultsByCategory: Record<CaseStudyCategory, Pick<CaseStudy, 'difficulty' | 'timeline'>> = {
  platform: { difficulty: 'Advanced', timeline: '2025 — Present' },
  infrastructure: { difficulty: 'Complex', timeline: '2025 — Present' },
  automation: { difficulty: 'Advanced', timeline: '2025 — Present' },
}

function enrichCaseStudy(study: CaseStudy): CaseStudy {
  const technologyIds =
    study.technologyIds ??
    study.technologies
      .map((technology) => mapTechnologyNameToId(technology))
      .filter((id): id is string => Boolean(id))

  return {
    ...defaultsByCategory[study.category],
    ...study,
    technologyIds,
    gallery: study.gallery ?? [],
    architectureNodes: study.architectureNodes ?? [],
  }
}

export const caseStudies: CaseStudy[] = [
  ...platformCaseStudies,
  ...infrastructureCaseStudies,
  ...automationCaseStudies,
].map(enrichCaseStudy)

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}

export function getCaseStudiesByCategory(category: CaseStudyCategory) {
  return caseStudies.filter((study) => study.category === category)
}

export function getFeaturedCaseStudies() {
  return caseStudies.filter((study) => study.featured && !study.incomplete)
}

export function getRelatedCaseStudies(study: CaseStudy) {
  return study.relatedSlugs
    .map((slug) => getCaseStudy(slug))
    .filter((related): related is CaseStudy => Boolean(related))
}

export function getCaseStudyPath(study: CaseStudy) {
  const base =
    study.category === 'platform'
      ? '/platforms'
      : study.category === 'infrastructure'
        ? '/infrastructure'
        : '/automation'
  return `${base}/${study.slug}`
}
