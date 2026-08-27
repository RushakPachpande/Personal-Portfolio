import { z } from 'zod'
import { supabase, publicMediaUrl, publicResumeUrl, MEDIA_BUCKET, RESUME_BUCKET, toMediaPath } from '@/lib/supabase'
import { usedInSlugsFromCaseStudies } from '@/lib/portfolio'
import type {
  CaseStudy,
  CaseStudyCategory,
  ContactSubmission,
  PhilosophyPillar,
  PortfolioData,
  Profile,
  ResumeData,
  Technology,
  TechnologyCategory,
  TerminalCommand,
  TimelineItem,
} from '@/types/portfolio'

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
  resumeUrl: z.string(),
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
})

function throwIfError(error: { message: string } | null) {
  if (error) throw new Error(error.message)
}

function resolveCaseStudy(
  row: {
    slug: string
    category: CaseStudyCategory
    featured: boolean
    status: string
    data: unknown
  },
): CaseStudy {
  const data = row.data as CaseStudy
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
  }
}

function mapResume(rows: { section: string; item_id: string; sort_order: number; data: unknown }[]): ResumeData {
  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order)
  const bySection = (section: string) => sorted.filter((row) => row.section === section)

  const competenciesRow = bySection('competencies')[0]
  return {
    highlights: bySection('highlights').map((row) => row.data as ResumeData['highlights'][number]),
    coreCompetencies: (competenciesRow?.data as { items?: string[] } | undefined)?.items ?? [],
    technicalExpertise: bySection('expertise').map(
      (row) => row.data as ResumeData['technicalExpertise'][number],
    ),
    professionalExperience: bySection('experience').map(
      (row) => row.data as ResumeData['professionalExperience'][number],
    ),
    keyProjects: bySection('projects').map((row) => row.data as ResumeData['keyProjects'][number]),
    education: bySection('education').map((row) => row.data as ResumeData['education'][number]),
    certifications: bySection('certifications').map(
      (row) => row.data as ResumeData['certifications'][number],
    ),
  }
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
  ] = await Promise.all([
    supabase.from('site_profile').select('data').eq('id', 'main').single(),
    supabase.from('site_settings').select('site_version').eq('id', 'main').single(),
    supabase.from('case_studies').select('slug, category, featured, status, sort_order, data').order('sort_order'),
    supabase.from('technologies').select('*').order('sort_order'),
    supabase.from('timeline_items').select('*').order('sort_order'),
    supabase.from('philosophy_pillars').select('*').order('sort_order'),
    supabase.from('resume_sections').select('*'),
    supabase.from('terminal_commands').select('*').order('sort_order'),
  ])

  throwIfError(profileRes.error)
  throwIfError(settingsRes.error)
  throwIfError(caseRes.error)
  throwIfError(techRes.error)
  throwIfError(timelineRes.error)
  throwIfError(philosophyRes.error)
  throwIfError(resumeRes.error)
  throwIfError(terminalRes.error)

  if (!profileRes.data || !settingsRes.data) {
    throw new Error('Portfolio profile or settings are missing.')
  }

  const profile = profileSchema.parse(profileRes.data.data)
  profile.resumeUrl = publicResumeUrl(profile.resumeUrl.replace(/^\/+/, '') || 'resume.pdf')

  return {
    profile,
    siteVersion: settingsRes.data.site_version,
    caseStudies: (caseRes.data ?? []).map((row) =>
      resolveCaseStudy({
        ...row,
        category: row.category as CaseStudyCategory,
      }),
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
      const data = row.data as TimelineItem
      return { ...data, id: row.id }
    }),
    philosophyPillars: (philosophyRes.data ?? []).map((row) => {
      const data = row.data as PhilosophyPillar
      return { ...data, id: row.id }
    }),
    resume: mapResume(resumeRes.data ?? []),
    terminalCommands: (terminalRes.data ?? []).map((row) => ({
      name: row.command,
      description: row.description,
      aliases: row.aliases ?? [],
    })),
  }
}

export async function upsertSiteProfile(data: Profile) {
  const { error } = await supabase.from('site_profile').upsert({
    id: 'main',
    data,
    updated_at: new Date().toISOString(),
  })
  throwIfError(error)
}

export async function upsertSiteSettings(siteVersion: string) {
  const { error } = await supabase.from('site_settings').upsert({
    id: 'main',
    site_version: siteVersion,
    updated_at: new Date().toISOString(),
  })
  throwIfError(error)
}

function caseStudyPayload(study: CaseStudy, sortOrder: number) {
  const { slug, category, featured, status, ...rest } = study
  const data = {
    ...rest,
    slug,
    category,
    featured,
    status,
    logo: rest.logo ? toMediaPath(rest.logo) : rest.logo,
    coverImage: rest.coverImage ? toMediaPath(rest.coverImage) : rest.coverImage,
    gallery: (rest.gallery ?? []).map((item) => ({
      ...item,
      src: toMediaPath(item.src),
    })),
  }
  return {
    slug,
    category,
    featured: Boolean(featured),
    status,
    sort_order: sortOrder,
    data,
    updated_at: new Date().toISOString(),
  }
}

export async function upsertCaseStudy(study: CaseStudy, sortOrder: number) {
  const { error } = await supabase.from('case_studies').upsert(caseStudyPayload(study, sortOrder))
  throwIfError(error)
}

export async function deleteCaseStudy(slug: string) {
  const { error } = await supabase.from('case_studies').delete().eq('slug', slug)
  throwIfError(error)
}

export async function upsertTechnology(technology: Technology, sortOrder: number) {
  const { error } = await supabase.from('technologies').upsert({
    id: technology.id,
    name: technology.name,
    category: technology.category,
      logo_path: toMediaPath(technology.logoPath || technology.logo),
    description: technology.description,
    used_in_slugs: technology.usedInSlugs,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  })
  throwIfError(error)
}

export async function deleteTechnology(id: string) {
  const { error } = await supabase.from('technologies').delete().eq('id', id)
  throwIfError(error)
}

export async function refreshTechnologyUsage() {
  const { data, error } = await supabase
    .from('case_studies')
    .select('slug, category, featured, status, data')
  throwIfError(error)
  const studies = (data ?? []).map((row) =>
    resolveCaseStudy({ ...row, category: row.category as CaseStudyCategory }),
  )
  const usage = usedInSlugsFromCaseStudies(studies)
  const { data: techs, error: techError } = await supabase.from('technologies').select('id')
  throwIfError(techError)
  await Promise.all(
    (techs ?? []).map((tech) =>
      supabase.from('technologies').update({ used_in_slugs: usage[tech.id] ?? [] }).eq('id', tech.id),
    ),
  )
}

export async function upsertTimelineItem(item: TimelineItem, sortOrder: number) {
  const { error } = await supabase.from('timeline_items').upsert({
    id: item.id,
    sort_order: sortOrder,
    data: item,
    updated_at: new Date().toISOString(),
  })
  throwIfError(error)
}

export async function deleteTimelineItem(id: string) {
  const { error } = await supabase.from('timeline_items').delete().eq('id', id)
  throwIfError(error)
}

export async function upsertPhilosophyPillar(pillar: PhilosophyPillar, sortOrder: number) {
  const { error } = await supabase.from('philosophy_pillars').upsert({
    id: pillar.id,
    sort_order: sortOrder,
    data: pillar,
    updated_at: new Date().toISOString(),
  })
  throwIfError(error)
}

export async function deletePhilosophyPillar(id: string) {
  const { error } = await supabase.from('philosophy_pillars').delete().eq('id', id)
  throwIfError(error)
}

export async function replaceResumeData(resume: ResumeData) {
  const { error: deleteError } = await supabase.from('resume_sections').delete().neq('item_id', '')
  throwIfError(deleteError)

  const rows: {
    section: string
    item_id: string
    sort_order: number
    data: unknown
  }[] = [
    ...resume.highlights.map((item, index) => ({
      section: 'highlights',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
    {
      section: 'competencies',
      item_id: 'all',
      sort_order: 0,
      data: { items: resume.coreCompetencies },
    },
    ...resume.technicalExpertise.map((item, index) => ({
      section: 'expertise',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
    ...resume.professionalExperience.map((item, index) => ({
      section: 'experience',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
    ...resume.keyProjects.map((item, index) => ({
      section: 'projects',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
    ...resume.education.map((item, index) => ({
      section: 'education',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
    ...resume.certifications.map((item, index) => ({
      section: 'certifications',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
  ]

  const { error } = await supabase.from('resume_sections').insert(rows)
  throwIfError(error)
}

export async function replaceTerminalCommands(commands: TerminalCommand[]) {
  const { error: deleteError } = await supabase.from('terminal_commands').delete().neq('command', '')
  throwIfError(deleteError)
  const { error } = await supabase.from('terminal_commands').insert(
    commands.map((command, index) => ({
      command: command.name,
      aliases: command.aliases ?? [],
      description: command.description,
      sort_order: index,
      data: {},
    })),
  )
  throwIfError(error)
}

export async function submitContact(payload: { name: string; email: string; message: string }) {
  const { error } = await supabase.from('contact_submissions').insert(payload)
  throwIfError(error)
}

export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  throwIfError(error)
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    createdAt: row.created_at,
  }))
}

export async function deleteContactSubmission(id: string) {
  const { error } = await supabase.from('contact_submissions').delete().eq('id', id)
  throwIfError(error)
}

export async function uploadPortfolioFile(bucket: typeof MEDIA_BUCKET | typeof RESUME_BUCKET, path: string, file: File) {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
    contentType: file.type || undefined,
  })
  throwIfError(error)
  if (bucket === RESUME_BUCKET) return publicResumeUrl(path)
  return publicMediaUrl(path)
}

export async function listMediaFiles(prefix = '') {
  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list(prefix, {
    limit: 100,
    sortBy: { column: 'name', order: 'asc' },
  })
  throwIfError(error)
  return data ?? []
}

export async function deleteMediaFile(path: string) {
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path])
  throwIfError(error)
}

export { MEDIA_BUCKET, RESUME_BUCKET }
