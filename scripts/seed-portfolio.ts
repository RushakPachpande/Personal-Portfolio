import fs from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { profile, SITE_VERSION } from '../src/content/profile.ts';
import { caseStudies } from '../src/content/caseStudies/index.ts';
import { technologies } from '../src/content/technologies.ts';
import { timeline } from '../src/content/timeline.ts';
import { philosophyPillars } from '../src/content/philosophy.ts';
import {
  coreCompetencies,
  keyProjects,
  professionalExperience,
  resumeCertifications,
  resumeEducation,
  resumeHighlights,
  technicalExpertise,
} from '../src/content/resume.ts';
import { terminalCommands } from '../src/content/terminal.ts';
import { usedInSlugsFromCaseStudies } from '../src/lib/portfolio.ts';
import type { CaseStudy } from '../src/types/portfolio.ts';
import { loadAppEnv } from './load-app-env.ts';

const appEnv = loadAppEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  throw new Error(
    'Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding.'
  );
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const MEDIA_BUCKET = 'portfolio-media';
const uploaded = new Map<string, string>();

function mimeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.pdf') return 'application/pdf';
  return 'application/octet-stream';
}

function isLocalAsset(value: string) {
  return (
    path.isAbsolute(value) || value.startsWith('D:\\') || value.startsWith('/')
  );
}

async function uploadLocal(bucket: string, dest: string, localPath: string) {
  const key = `${bucket}:${dest}`;
  const existing = uploaded.get(key);
  if (existing) return existing;

  const bytes = await fs.readFile(localPath);
  const { error } = await supabase.storage.from(bucket).upload(dest, bytes, {
    upsert: true,
    contentType: mimeFor(localPath),
  });
  if (error) throw new Error(`Upload failed for ${dest}: ${error.message}`);
  uploaded.set(key, dest);
  console.log(`uploaded ${bucket}/${dest}`);
  return dest;
}

async function resolveMedia(value: string | undefined, dest: string) {
  if (!value) return undefined;
  if (!isLocalAsset(value)) return value;
  return uploadLocal(MEDIA_BUCKET, dest, value);
}

async function seedCaseStudies() {
  const rows = [];
  for (const [index, study] of caseStudies.entries()) {
    const logoPath = await resolveMedia(
      study.logo,
      `logos/${study.slug}${path.extname(study.logo ?? '.png')}`
    );
    const coverPath = await resolveMedia(
      study.coverImage,
      `covers/${study.slug}${path.extname(study.coverImage ?? '.png')}`
    );
    const gallery = [];
    for (const [galleryIndex, item] of (study.gallery ?? []).entries()) {
      const src = await resolveMedia(
        item.src,
        `gallery/${study.slug}/${galleryIndex}${path.extname(item.src)}`
      );
      gallery.push({ ...item, src: src ?? item.src });
    }

    const data: CaseStudy = {
      ...study,
      logo: logoPath,
      coverImage: coverPath,
      gallery,
    };

    rows.push({
      slug: study.slug,
      category: study.category,
      featured: Boolean(study.featured),
      status: study.status,
      sort_order: index,
      data,
      updated_at: new Date().toISOString(),
    });
  }

  const { error } = await supabase.from('case_studies').upsert(rows);
  if (error) throw error;
}

async function seedTechnologies() {
  const usage = usedInSlugsFromCaseStudies(caseStudies);
  const rows = [];
  for (const [index, technology] of technologies.entries()) {
    const ext = path.extname(technology.logo) || '.svg';
    const logoPath = await resolveMedia(
      technology.logo,
      `tech/${technology.id}${ext}`
    );
    rows.push({
      id: technology.id,
      name: technology.name,
      category: technology.category,
      logo_path: logoPath ?? `tech/${technology.id}${ext}`,
      description: technology.description,
      used_in_slugs: usage[technology.id] ?? technology.usedInSlugs,
      sort_order: index,
      updated_at: new Date().toISOString(),
    });
  }
  const { error } = await supabase.from('technologies').upsert(rows);
  if (error) throw error;
}

async function seedResume() {
  await supabase.from('resume_sections').delete().neq('item_id', '');
  const rows = [
    ...resumeHighlights.map((item, index) => ({
      section: 'highlights',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
    {
      section: 'competencies',
      item_id: 'all',
      sort_order: 0,
      data: { items: coreCompetencies },
    },
    ...technicalExpertise.map((item, index) => ({
      section: 'expertise',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
    ...professionalExperience.map((item, index) => ({
      section: 'experience',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
    ...keyProjects.map((item, index) => ({
      section: 'projects',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
    ...resumeEducation.map((item, index) => ({
      section: 'education',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
    ...resumeCertifications.map((item, index) => ({
      section: 'certifications',
      item_id: item.id,
      sort_order: index,
      data: item,
    })),
  ];
  const { error } = await supabase.from('resume_sections').insert(rows);
  if (error) throw error;
}

async function maybeCreateAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log(
      'ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user create'
    );
    return;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: 'admin' },
  });

  if (error && !error.message.toLowerCase().includes('already')) {
    throw error;
  }

  if (data.user) {
    await supabase.auth.admin.updateUserById(data.user.id, {
      app_metadata: { role: 'admin' },
    });
    console.log(`admin user ready: ${email}`);
  }
}

async function main() {
  console.log(`Seeding ${appEnv} environment`);
  const { error: profileError } = await supabase.from('site_profile').upsert({
    id: 'main',
    data: profile,
    updated_at: new Date().toISOString(),
  });
  if (profileError) throw profileError;

  const { error: settingsError } = await supabase.from('site_settings').upsert({
    id: 'main',
    site_version: SITE_VERSION,
    updated_at: new Date().toISOString(),
  });
  if (settingsError) throw settingsError;

  await seedCaseStudies();
  await seedTechnologies();

  const timelineRows = timeline.map((item, index) => ({
    id: item.id,
    sort_order: index,
    data: item,
    updated_at: new Date().toISOString(),
  }));
  const { error: timelineError } = await supabase
    .from('timeline_items')
    .upsert(timelineRows);
  if (timelineError) throw timelineError;

  const philosophyRows = philosophyPillars.map((item, index) => ({
    id: item.id,
    sort_order: index,
    data: item,
    updated_at: new Date().toISOString(),
  }));
  const { error: philosophyError } = await supabase
    .from('philosophy_pillars')
    .upsert(philosophyRows);
  if (philosophyError) throw philosophyError;

  await seedResume();

  await supabase.from('terminal_commands').delete().neq('command', '');
  const { error: terminalError } = await supabase
    .from('terminal_commands')
    .insert(
      terminalCommands.map((command, index) => ({
        command: command.name,
        aliases: command.aliases ?? [],
        description: command.description,
        sort_order: index,
        data: {},
      }))
    );
  if (terminalError) throw terminalError;

  await maybeCreateAdmin();
  console.log('Seed complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
