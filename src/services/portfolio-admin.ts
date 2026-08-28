import {
  supabase,
  publicMediaUrl,
  publicResumeUrl,
  MEDIA_BUCKET,
  RESUME_BUCKET,
  toMediaPath,
} from '@/lib/supabase';
import { usedInSlugsFromCaseStudies } from '@/lib/portfolio';
import { resolveCaseStudy, throwIfError } from '@/services/portfolio-public';
import type {
  CaseStudy,
  CaseStudyCategory,
  ContactSubmission,
  PhilosophyPillar,
  Profile,
  ResumeData,
  ResumeFile,
  Technology,
  TerminalCommand,
  TimelineItem,
} from '@/types/portfolio';

export async function upsertSiteProfile(data: Profile) {
  const { resumeUrl: _resumeUrl, ...stored } = data;
  const { error } = await supabase.from('site_profile').upsert({
    id: 'main',
    data: stored,
    updated_at: new Date().toISOString(),
  });
  throwIfError(error);
}

export async function upsertSiteSettings(siteVersion: string) {
  const { error } = await supabase.from('site_settings').upsert({
    id: 'main',
    site_version: siteVersion,
    updated_at: new Date().toISOString(),
  });
  throwIfError(error);
}

function caseStudyPayload(study: CaseStudy, sortOrder: number) {
  const { slug, category, featured, status, ...rest } = study;
  const data = {
    ...rest,
    slug,
    category,
    featured,
    status,
    logo: rest.logo ? toMediaPath(rest.logo) : rest.logo,
    coverImage: rest.coverImage
      ? toMediaPath(rest.coverImage)
      : rest.coverImage,
    gallery: (rest.gallery ?? []).map((item) => ({
      ...item,
      src: toMediaPath(item.src),
    })),
  };
  return {
    slug,
    category,
    featured: Boolean(featured),
    status,
    sort_order: sortOrder,
    data,
    updated_at: new Date().toISOString(),
  };
}

export async function upsertCaseStudy(study: CaseStudy, sortOrder: number) {
  const { error } = await supabase
    .from('case_studies')
    .upsert(caseStudyPayload(study, sortOrder));
  throwIfError(error);
}

export async function deleteCaseStudy(slug: string) {
  const { error } = await supabase
    .from('case_studies')
    .delete()
    .eq('slug', slug);
  throwIfError(error);
}

export async function upsertTechnology(
  technology: Technology,
  sortOrder: number
) {
  const { error } = await supabase.from('technologies').upsert({
    id: technology.id,
    name: technology.name,
    category: technology.category,
    logo_path: toMediaPath(technology.logoPath || technology.logo),
    description: technology.description,
    used_in_slugs: technology.usedInSlugs,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  });
  throwIfError(error);
}

export async function deleteTechnology(id: string) {
  const { error } = await supabase.from('technologies').delete().eq('id', id);
  throwIfError(error);
}

export async function refreshTechnologyUsage() {
  const { data, error } = await supabase
    .from('case_studies')
    .select('slug, category, featured, status, data');
  throwIfError(error);
  const studies = (data ?? []).map((row) =>
    resolveCaseStudy({ ...row, category: row.category as CaseStudyCategory })
  );
  const usage = usedInSlugsFromCaseStudies(studies);
  const { data: techs, error: techError } = await supabase
    .from('technologies')
    .select('id');
  throwIfError(techError);
  await Promise.all(
    (techs ?? []).map((tech) =>
      supabase
        .from('technologies')
        .update({ used_in_slugs: usage[tech.id] ?? [] })
        .eq('id', tech.id)
    )
  );
}

export async function upsertTimelineItem(
  item: TimelineItem,
  sortOrder: number
) {
  const { error } = await supabase.from('timeline_items').upsert({
    id: item.id,
    sort_order: sortOrder,
    data: item,
    updated_at: new Date().toISOString(),
  });
  throwIfError(error);
}

export async function deleteTimelineItem(id: string) {
  const { error } = await supabase.from('timeline_items').delete().eq('id', id);
  throwIfError(error);
}

export async function upsertPhilosophyPillar(
  pillar: PhilosophyPillar,
  sortOrder: number
) {
  const { error } = await supabase.from('philosophy_pillars').upsert({
    id: pillar.id,
    sort_order: sortOrder,
    data: pillar,
    updated_at: new Date().toISOString(),
  });
  throwIfError(error);
}

export async function deletePhilosophyPillar(id: string) {
  const { error } = await supabase
    .from('philosophy_pillars')
    .delete()
    .eq('id', id);
  throwIfError(error);
}

export async function replaceResumeData(resume: ResumeData) {
  const { error: deleteError } = await supabase
    .from('resume_sections')
    .delete()
    .neq('item_id', '');
  throwIfError(deleteError);

  const rows: {
    section: string;
    item_id: string;
    sort_order: number;
    data: unknown;
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
  ];

  const { error } = await supabase.from('resume_sections').insert(rows);
  throwIfError(error);
}

export async function replaceTerminalCommands(commands: TerminalCommand[]) {
  const { error: deleteError } = await supabase
    .from('terminal_commands')
    .delete()
    .neq('command', '');
  throwIfError(deleteError);
  const { error } = await supabase.from('terminal_commands').insert(
    commands.map((command, index) => ({
      command: command.name,
      aliases: command.aliases ?? [],
      description: command.description,
      sort_order: index,
      data: {},
    }))
  );
  throwIfError(error);
}

export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  throwIfError(error);
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    createdAt: row.created_at,
  }));
}

export async function deleteContactSubmission(id: string) {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);
  throwIfError(error);
}

export async function uploadPortfolioFile(
  bucket: typeof MEDIA_BUCKET | typeof RESUME_BUCKET,
  path: string,
  file: File
) {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
    contentType: file.type || undefined,
  });
  throwIfError(error);
  if (bucket === RESUME_BUCKET) return publicResumeUrl(path);
  return publicMediaUrl(path);
}

export async function listMediaFiles(prefix = '') {
  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .list(prefix, {
      limit: 100,
      sortBy: { column: 'name', order: 'asc' },
    });
  throwIfError(error);
  return data ?? [];
}

export async function deleteMediaFile(path: string) {
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  throwIfError(error);
}

type ResumeFileRow = {
  id: string;
  label: string;
  storage_path: string;
  is_active: boolean;
  size_bytes: number | null;
  created_at: string;
  updated_at: string;
};

function mapResumeFile(row: ResumeFileRow): ResumeFile {
  return {
    id: row.id,
    label: row.label,
    storagePath: row.storage_path,
    isActive: row.is_active,
    sizeBytes: row.size_bytes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function resumeStorageKey(label: string, fileName: string) {
  const source = label.trim() || fileName.replace(/\.pdf$/i, '');
  const slug =
    source
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'resume';
  return `${Date.now()}-${slug}.pdf`;
}

function assertPdfFile(file: File) {
  const isPdf =
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) throw new Error('Upload a PDF file.');
}

export async function listResumeFiles(): Promise<ResumeFile[]> {
  const { data, error } = await supabase
    .from('resume_files')
    .select(
      'id, label, storage_path, is_active, size_bytes, created_at, updated_at'
    )
    .order('created_at', { ascending: false });
  throwIfError(error);
  return (data ?? []).map(mapResumeFile);
}

async function insertResumeFileRow(
  label: string,
  storagePath: string,
  sizeBytes: number,
  isActive: boolean
) {
  const { data, error } = await supabase
    .from('resume_files')
    .insert({
      label,
      storage_path: storagePath,
      is_active: isActive,
      size_bytes: sizeBytes,
    })
    .select(
      'id, label, storage_path, is_active, size_bytes, created_at, updated_at'
    )
    .single();
  if (error) {
    await supabase.storage.from(RESUME_BUCKET).remove([storagePath]);
    throwIfError(error);
  }
  return mapResumeFile(data as ResumeFileRow);
}

export async function uploadResumeFile(label: string, file: File) {
  assertPdfFile(file);
  const storagePath = resumeStorageKey(label, file.name);
  const { error: uploadError } = await supabase.storage
    .from(RESUME_BUCKET)
    .upload(storagePath, file, {
      upsert: false,
      contentType: 'application/pdf',
    });
  throwIfError(uploadError);
  const existing = await listResumeFiles();
  const trimmed = label.trim() || file.name.replace(/\.pdf$/i, '');
  return insertResumeFileRow(
    trimmed,
    storagePath,
    file.size,
    existing.length === 0
  );
}

export async function setActiveResumeFile(id: string) {
  const { error } = await supabase.rpc('set_active_resume', { target: id });
  throwIfError(error);
}

export async function renameResumeFile(id: string, label: string) {
  const trimmed = label.trim();
  if (!trimmed) throw new Error('Label is required.');
  const { error } = await supabase
    .from('resume_files')
    .update({ label: trimmed, updated_at: new Date().toISOString() })
    .eq('id', id);
  throwIfError(error);
}

export async function deleteResumeFile(id: string) {
  const files = await listResumeFiles();
  const target = files.find((file) => file.id === id);
  if (!target) throw new Error('Resume not found.');
  if (target.isActive && files.length > 1) {
    throw new Error('Set another resume as active before deleting this one.');
  }
  const { error: storageError } = await supabase.storage
    .from(RESUME_BUCKET)
    .remove([target.storagePath]);
  throwIfError(storageError);
  const { error } = await supabase.from('resume_files').delete().eq('id', id);
  throwIfError(error);
}

export { MEDIA_BUCKET, RESUME_BUCKET };
