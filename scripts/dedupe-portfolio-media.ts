/**
 * Removes orphan / duplicate logo objects from portfolio-media via the Storage API.
 * Keeps paths referenced by technologies.logo_path and case_studies.data.logo,
 * plus any canonical tech/{id}.* and logos/{slug}.* that match those refs.
 *
 * Run after db:push of the dedupe migration (and ideally after db:seed):
 *   npx tsx --tsconfig tsconfig.app.json scripts/dedupe-portfolio-media.ts --env=dev
 */
import { createClient } from '@supabase/supabase-js';
import { loadAppEnv } from './load-app-env.ts';

loadAppEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  throw new Error(
    'Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before deduping.'
  );
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const MEDIA_BUCKET = 'portfolio-media';

function basename(path: string | null | undefined) {
  if (!path) return '';
  return path
    .replace(
      /^https?:\/\/[^/]+\/storage\/v1\/object\/public\/portfolio-media\//,
      ''
    )
    .replace(/[?#].*$/, '');
}

async function listAll(prefix: string): Promise<string[]> {
  const names: string[] = [];
  const queue = [prefix];

  while (queue.length > 0) {
    const current = queue.shift() ?? '';
    const { data, error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .list(current, { limit: 1000 });
    if (error) throw error;
    for (const item of data ?? []) {
      const full = current ? `${current}/${item.name}` : item.name;
      const isFolder = item.id == null;
      if (isFolder) {
        queue.push(full);
      } else {
        names.push(full);
      }
    }
  }

  return names;
}

async function main() {
  const [
    { data: technologies, error: techError },
    { data: studies, error: studyError },
  ] = await Promise.all([
    supabase.from('technologies').select('logo_path'),
    supabase.from('case_studies').select('data'),
  ]);

  if (techError) throw techError;
  if (studyError) throw studyError;

  const keep = new Set<string>();
  for (const row of technologies ?? []) {
    const path = basename(row.logo_path as string | null);
    if (path) keep.add(path);
  }
  for (const row of studies ?? []) {
    const data = row.data as { logo?: string } | null;
    const path = basename(data?.logo);
    if (path) keep.add(path);
  }

  const candidates = [
    ...(await listAll('tech')),
    ...(await listAll('logos')),
    ...(await listAll('uploads')),
  ].filter(
    (name) =>
      /^tech\/[^/]+$/.test(name) ||
      /^logos\/[^/]+$/.test(name) ||
      /^uploads\/.+\/logo-/.test(name)
  );

  const remove = candidates.filter((name) => !keep.has(name));
  if (remove.length === 0) {
    console.log('No orphan logo objects to remove.');
    return;
  }

  console.log(`Removing ${remove.length} orphan logo object(s)…`);
  for (let i = 0; i < remove.length; i += 50) {
    const chunk = remove.slice(i, i + 50);
    const { error } = await supabase.storage.from(MEDIA_BUCKET).remove(chunk);
    if (error) throw error;
    for (const name of chunk) console.log(`removed ${name}`);
  }
  console.log('Dedupe complete.');
}

await main();
