import { automationCaseStudies } from './automation'
import { infrastructureCaseStudies } from './infrastructure'
import { platformCaseStudies } from './platforms'
import type { CaseStudy } from './types'

/** Unenriched case-study source arrays — safe for technology usage mapping. */
export const rawCaseStudies: CaseStudy[] = [
  ...platformCaseStudies,
  ...infrastructureCaseStudies,
  ...automationCaseStudies,
]
