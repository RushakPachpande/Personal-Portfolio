export type CaseStudyCategory = string;

export type CaseStudyDecision = {
  decision: string;
  rationale: string;
};

export type CaseStudyChallenge = {
  challenge: string;
  resolution: string;
};

export type CaseStudyStackGroup = {
  group: string;
  items: string[];
};

export type CaseStudyMediaItem = {
  src: string;
  caption: string;
  type:
    | 'screenshot'
    | 'architecture'
    | 'workflow'
    | 'infrastructure'
    | 'deployment'
    | 'network';
};

export type ArchitectureNode = {
  id: string;
  label: string;
  detail: string;
};

export type CaseStudyLink = {
  label: string;
  url: string;
};

export type CaseStudy = {
  slug: string;
  category: CaseStudyCategory;
  name: string;
  summary: string;
  status: string;
  featured?: boolean;
  difficulty?: 'Intermediate' | 'Advanced' | 'Complex';
  timeline?: string;
  logo?: string;
  logoAlt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  technologies: string[];
  technologyIds?: string[];
  stack: CaseStudyStackGroup[];
  businessContext: string;
  problem: string;
  objective: string;
  solution: string;
  architecture: string;
  architectureNodes?: ArchitectureNode[];
  responsibilities: string[];
  decisions: CaseStudyDecision[];
  challenges: CaseStudyChallenge[];
  outcome: string;
  learnings: string[];
  gallery?: CaseStudyMediaItem[];
  links?: CaseStudyLink[];
  relatedSlugs: string[];
  incomplete?: boolean;
  todoNote?: string;
};

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  resumeTitle: string;
  roles: string[];
  location: string;
  phone: string;
  headline: string;
  description: string;
  email: string;
  /** Public Storage URL for the active resume PDF, set at fetch time. */
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  focusAreas: string[];
  about: {
    whoIAm: string;
    howIThink: string;
    whatIEnjoy: string;
    approach: string;
  };
  summaryBullets: string[];
};

export type TimelineItem = {
  id: string;
  type: 'education' | 'career' | 'achievement' | 'deployment';
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights?: string[];
  /** When true, appears in the home Experience Snapshot grid. */
  showOnHome?: boolean;
  /** Optional home card title. Defaults to `title`. */
  homeTitle?: string;
  /** Optional home card body. Defaults to `description`. */
  homeDetail?: string;
  /** Storage path for the card logo (set in admin). */
  logoPath?: string;
  /** Resolved public media URL at fetch time. */
  logo?: string;
  logoAlt?: string;
};

export type PhilosophyPillar = {
  id: string;
  title: string;
  summary: string;
  detail: string;
};

export type TechnologyCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'cloud'
  | 'infrastructure'
  | 'automation'
  | 'version-control'
  | 'security'
  | 'enterprise';

export type Technology = {
  id: string;
  name: string;
  category: TechnologyCategory;
  logo: string;
  logoPath: string;
  description: string;
  usedInSlugs: string[];
};

export type ResumeHighlight = {
  id: string;
  label: string;
  detail?: string;
};

export type ResumeExpertiseGroup = {
  id: string;
  title: string;
  items: string[];
};

export type ResumeExperience = {
  id: string;
  organization: string;
  period: string;
  role: string;
  bullets: string[];
};

export type ResumeProject = {
  id: string;
  name: string;
  role: string;
  bullets: string[];
  stack: string[];
  caseStudy?: {
    slug: string;
    category: CaseStudyCategory;
  };
};

export type ResumeEducation = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  detail: string;
};

export type ResumeCertificationGroup = {
  id: string;
  provider: string;
  items: string[];
};

export type ResumeData = {
  highlights: ResumeHighlight[];
  coreCompetencies: string[];
  technicalExpertise: ResumeExpertiseGroup[];
  professionalExperience: ResumeExperience[];
  keyProjects: ResumeProject[];
  education: ResumeEducation[];
  certifications: ResumeCertificationGroup[];
};

export type TerminalCommand = {
  name: string;
  description: string;
  aliases?: string[];
};

export type EngineeringStat = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  description: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type ResumeFile = {
  id: string;
  label: string;
  storagePath: string;
  isActive: boolean;
  sizeBytes: number | null;
  createdAt: string;
  updatedAt: string;
};

import type { SiteConfig } from '@/types/site-config';

export type { SiteConfig } from '@/types/site-config';

export type PortfolioData = {
  profile: Profile;
  siteVersion: string;
  siteConfig: SiteConfig;
  caseStudies: CaseStudy[];
  technologies: Technology[];
  timeline: TimelineItem[];
  philosophyPillars: PhilosophyPillar[];
  resume: ResumeData;
  terminalCommands: TerminalCommand[];
};
