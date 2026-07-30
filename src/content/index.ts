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
  CaseStudyMediaItem,
  CaseStudyStackGroup,
  ArchitectureNode,
} from './caseStudies'
export { timeline } from './timeline'
export type { TimelineItem } from './timeline'
export { philosophyPillars } from './philosophy'
export type { PhilosophyPillar } from './philosophy'
export { terminalCommands, resolveTerminalInput } from './terminal'
export { technologies, technologyCategories, getTechnologyById, mapTechnologyNameToId } from './technologies'
export type { Technology, TechnologyCategory } from './technologies'
export { engineeringStats } from './stats'
export type { EngineeringStat } from './stats'
