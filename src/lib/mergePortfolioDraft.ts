import type {
  CaseStudy,
  PhilosophyPillar,
  PortfolioData,
  Profile,
  ResumeData,
  Technology,
  TerminalCommand,
  TimelineItem,
} from '@/types/portfolio';

export type PortfolioDraft =
  | { kind: 'profile'; profile: Profile; siteVersion?: string }
  | { kind: 'caseStudy'; study: CaseStudy }
  | { kind: 'technologies'; technologies: Technology[] }
  | { kind: 'timeline'; timeline: TimelineItem[] }
  | { kind: 'philosophy'; philosophyPillars: PhilosophyPillar[] }
  | { kind: 'resume'; resume: ResumeData }
  | { kind: 'terminal'; terminalCommands: TerminalCommand[] };

export function mergePortfolioDraft(
  base: PortfolioData,
  draft: PortfolioDraft
): PortfolioData {
  switch (draft.kind) {
    case 'profile':
      return {
        ...base,
        profile: draft.profile,
        siteVersion: draft.siteVersion ?? base.siteVersion,
      };
    case 'caseStudy': {
      const exists = base.caseStudies.some(
        (study) => study.slug === draft.study.slug
      );
      return {
        ...base,
        caseStudies: exists
          ? base.caseStudies.map((study) =>
              study.slug === draft.study.slug ? draft.study : study
            )
          : [...base.caseStudies, draft.study],
      };
    }
    case 'technologies':
      return { ...base, technologies: draft.technologies };
    case 'timeline':
      return { ...base, timeline: draft.timeline };
    case 'philosophy':
      return { ...base, philosophyPillars: draft.philosophyPillars };
    case 'resume':
      return { ...base, resume: draft.resume };
    case 'terminal':
      return { ...base, terminalCommands: draft.terminalCommands };
  }
}
