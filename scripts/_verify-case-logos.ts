import { createClient } from '@supabase/supabase-js';
import { loadAppEnv } from './load-app-env.ts';

loadAppEnv();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

async function listWebp(prefix: string) {
  const { data, error } = await supabase.storage
    .from('portfolio-media')
    .list(prefix, { limit: 100 });
  if (error) throw error;
  return (data ?? [])
    .filter((f) => f.name.endsWith('.webp') || f.name.endsWith('.png'))
    .map((f) => `${prefix}/${f.name}`);
}

// Remove leftover wrong-format objects when a canonical .svg logo exists for the same slug
const { data: studies, error: studiesError } = await supabase
  .from('case_studies')
  .select('slug, data');
if (studiesError) throw studiesError;

const keep = new Set<string>();
for (const row of studies ?? []) {
  const data = row.data as {
    logo?: string;
    coverImage?: string;
    gallery?: { src?: string }[];
  };
  if (data.logo) keep.add(data.logo);
  if (data.coverImage) keep.add(data.coverImage);
  for (const item of data.gallery ?? []) {
    if (item.src) keep.add(item.src);
  }
}

const candidates = [
  ...(await listWebp('logos')),
  ...(await listWebp('covers')),
];

// Prefer removing .webp when slug also has .svg in keep, and orphan pngs that aren't kept
const remove = candidates.filter((path) => {
  if (keep.has(path)) return false;
  const base = path.replace(/\.(webp|png|svg|jpe?g)$/i, '');
  const hasSvg = keep.has(`${base}.svg`);
  if (path.endsWith('.webp') && hasSvg) return true;
  if (path.endsWith('.webp') && !keep.has(path)) return true;
  // orphan logos/covers not referenced at all
  if (
    (path.startsWith('logos/') || path.startsWith('covers/')) &&
    !keep.has(path)
  ) {
    // keep product pngs that might only be gallery - already filtered by keep
    return path.endsWith('.webp');
  }
  return false;
});

console.log('DB logos sample', {
  docker: studies?.find((s) => s.slug === 'docker-deployment')?.data,
  azure: (studies?.find((s) => s.slug === 'azure-infrastructure')?.data as { logo?: string })
    ?.logo,
  sharepoint: (
    studies?.find((s) => s.slug === 'sharepoint-automations')?.data as {
      logo?: string;
    }
  )?.logo,
});

console.log('removing', remove);
if (remove.length > 0) {
  const { error } = await supabase.storage
    .from('portfolio-media')
    .remove(remove);
  if (error) throw error;
}

for (const row of studies ?? []) {
  const logo = (row.data as { logo?: string; logoAlt?: string }).logo;
  const alt = (row.data as { logoAlt?: string }).logoAlt;
  console.log(`${row.slug} -> ${logo} (${alt})`);
}
