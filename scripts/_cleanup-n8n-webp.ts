import { createClient } from '@supabase/supabase-js';
import { loadAppEnv } from './load-app-env.ts';

loadAppEnv();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

const { data: logos } = await supabase.storage
  .from('portfolio-media')
  .list('logos', { limit: 100 });
const { data: covers } = await supabase.storage
  .from('portfolio-media')
  .list('covers', { limit: 100 });

const remove = [
  ...(logos ?? [])
    .filter((f) => f.name.endsWith('.webp'))
    .map((f) => `logos/${f.name}`),
  ...(covers ?? [])
    .filter((f) => f.name.endsWith('.webp'))
    .map((f) => `covers/${f.name}`),
];

console.log('webp leftovers', remove);
if (remove.length > 0) {
  const { error } = await supabase.storage
    .from('portfolio-media')
    .remove(remove);
  if (error) throw error;
  console.log('removed');
}

const { data: cs } = await supabase
  .from('case_studies')
  .select('slug, data')
  .ilike('slug', '%n8n%');
console.log(
  'n8n studies',
  cs?.map((c) => ({
    slug: c.slug,
    logo: (c.data as { logo?: string })?.logo,
  }))
);

const { data: tech } = await supabase
  .from('technologies')
  .select('id, logo_path')
  .eq('id', 'n8n')
  .maybeSingle();
console.log('tech n8n', tech);
