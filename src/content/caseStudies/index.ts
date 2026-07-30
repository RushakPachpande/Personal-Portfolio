import { automationCaseStudies } from './automation'
import { infrastructureCaseStudies } from './infrastructure'
import { platformCaseStudies } from './platforms'
import type { CaseStudy, CaseStudyCategory } from './types'

export type {
  CaseStudy,
  CaseStudyCategory,
  CaseStudyChallenge,
  CaseStudyDecision,
  CaseStudyStackGroup,
} from './types'
export { categoryLabels, categoryPaths } from './types'

export const caseStudies: CaseStudy[] = [
  ...platformCaseStudies,
  ...infrastructureCaseStudies,
  ...automationCaseStudies,
]

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
