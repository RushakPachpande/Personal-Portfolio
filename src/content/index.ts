export { profile, SITE_VERSION } from './profile'
export {
  caseStudies,
  getCaseStudy,
  getCaseStudiesByCategory,
  getFeaturedCaseStudies,
  getRelatedCaseStudies,
  getCaseStudyPath,
  categoryLabels,
  categoryPaths,
} from './caseStudies'
export type {
  CaseStudy,
  CaseStudyCategory,
  CaseStudyChallenge,
  CaseStudyDecision,
  CaseStudyStackGroup,
} from './caseStudies'
export { timeline } from './timeline'
export type { TimelineItem } from './timeline'
export { philosophyPillars } from './philosophy'
export type { PhilosophyPillar } from './philosophy'
export { terminalCommands, resolveTerminalInput } from './terminal'
