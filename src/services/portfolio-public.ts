import { z } from 'zod';
import {
  supabase,
  publicMediaUrl,
  publicResumeUrl,
  toMediaPath,
} from '@/lib/supabase';
import type {
  CaseStudy,
  CaseStudyCategory,
  PhilosophyPillar,
  PortfolioData,
  Profile,
  TechnologyCategory,
  TimelineItem,
} from '@/types/portfolio';

const profileSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  role: z.string(),
  resumeTitle: z.string(),
  roles: z.array(z.string()),
  location: z.string(),
  phone: z.string(),
  headline: z.string(),
  description: z.string(),
  email: z.string(),
  resumeUrl: z.string().optional(),
  socials: z.object({
    github: z.string(),
    linkedin: z.string(),
    email: z.string(),
  }),
  focusAreas: z.array(z.string()),
  about: z.object({
    whoIAm: z.string(),
    howIThink: z.string(),
    whatIEnjoy: z.string(),
    approach: z.string(),
  }),
  summaryBullets: z.array(z.string()),
});

export function throwIfError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export function resolveCaseStudy(row: {
  slug: string;
  category: CaseStudyCategory;
  featured: boolean;
  status: string;
  data: unknown;
}): CaseStudy {
  const data = row.data as CaseStudy;
  return {
    ...data,
    slug: row.slug,
    category: row.category,
    featured: row.featured,
    status: row.status,
    logo: data.logo ? publicMediaUrl(data.logo) : undefined,
    coverImage: data.coverImage ? publicMediaUrl(data.coverImage) : undefined,
    gallery: (data.gallery ?? []).map((item) => ({
      ...item,
      src: publicMediaUrl(item.src),
    })),
  };
}

function mapResume(
  rows: {
    section: string;
    item_id: string;
    sort_order: number;
    data: unknown;
  }[]
): PortfolioData['resume'] {
  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);
  const bySection = (section: string) =>
    sorted.filter((row) => row.section === section);

  const competenciesRow = bySection('competencies')[0];
  return {
    highlights: bySection('highlights').map(
      (row) => row.data as PortfolioData['resume']['highlights'][number]
    ),
    coreCompetencies:
      (competenciesRow?.data as { items?: string[] } | undefined)?.items ?? [],
    technicalExpertise: bySection('expertise').map(
      (row) => row.data as PortfolioData['resume']['technicalExpertise'][number]
    ),
    professionalExperience: bySection('experience').map(
      (row) =>
        row.data as PortfolioData['resume']['professionalExperience'][number]
    ),
    keyProjects: bySection('projects').map(
      (row) => row.data as PortfolioData['resume']['keyProjects'][number]
    ),
    education: bySection('education').map(
      (row) => row.data as PortfolioData['resume']['education'][number]
    ),
    certifications: bySection('certifications').map(
      (row) => row.data as PortfolioData['resume']['certifications'][number]
    ),
  };
}

export async function fetchPublicPortfolio(): Promise<PortfolioData> {
  const [
    profileRes,
    settingsRes,
    caseRes,
    techRes,
    timelineRes,
    philosophyRes,
    resumeRes,
    terminalRes,
    resumeFileRes,
  ] = await Promise.all([
    supabase.from('site_profile').select('data').eq('id', 'main').single(),
    supabase
      .from('site_settings')
      .select('site_version')
      .eq('id', 'main')
      .single(),
    supabase
      .from('case_studies')
      .select('slug, category, featured, status, sort_order, data')
      .order('sort_order'),
    supabase.from('technologies').select('*').order('sort_order'),
    supabase.from('timeline_items').select('*').order('sort_order'),
    supabase.from('philosophy_pillars').select('*').order('sort_order'),
    supabase.from('resume_sections').select('*'),
    supabase.from('terminal_commands').select('*').order('sort_order'),
    supabase
      .from('resume_files')
      .select('storage_path')
      .eq('is_active', true)
      .maybeSingle(),
  ]);

  throwIfError(profileRes.error);
  throwIfError(settingsRes.error);
  throwIfError(caseRes.error);
  throwIfError(techRes.error);
  throwIfError(timelineRes.error);
  throwIfError(philosophyRes.error);
  throwIfError(resumeRes.error);
  throwIfError(terminalRes.error);
  throwIfError(resumeFileRes.error);

  if (!profileRes.data || !settingsRes.data) {
    throw new Error('Portfolio profile or settings are missing.');
  }

  const parsed = profileSchema.parse(profileRes.data.data);
  const profile: Profile = {
    ...parsed,
    resumeUrl: resumeFileRes.data
      ? publicResumeUrl(resumeFileRes.data.storage_path)
      : '',
  };

  return {
    profile,
    siteVersion: settingsRes.data.site_version,
    caseStudies: (caseRes.data ?? []).map((row) =>
      resolveCaseStudy({
        ...row,
        category: row.category as CaseStudyCategory,
      })
    ),
    technologies: (techRes.data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category as TechnologyCategory,
      logoPath: row.logo_path,
      logo: publicMediaUrl(row.logo_path),
      description: row.description,
      usedInSlugs: row.used_in_slugs ?? [],
    })),
    timeline: (timelineRes.data ?? []).map((row) => {
      const data = row.data as TimelineItem;
      const logoPath = data.logoPath || data.logo;
      return {
        ...data,
        id: row.id,
        logoPath: logoPath ? toMediaPath(logoPath) : undefined,
        logo: logoPath ? publicMediaUrl(logoPath) : undefined,
      };
    }),
    philosophyPillars: (philosophyRes.data ?? []).map((row) => {
      const data = row.data as PhilosophyPillar;
      return { ...data, id: row.id };
    }),
    resume: mapResume(resumeRes.data ?? []),
    terminalCommands: (terminalRes.data ?? []).map((row) => ({
      name: row.command,
      description: row.description,
      aliases: row.aliases ?? [],
    })),
  };
}

export async function submitContact(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const { error } = await supabase.from('contact_submissions').insert(payload);
  throwIfError(error);
}
