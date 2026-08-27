function required(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getSupabaseUrl() {
  return required('VITE_SUPABASE_URL', import.meta.env.VITE_SUPABASE_URL);
}

export function getSupabaseAnonKey() {
  return required(
    'VITE_SUPABASE_ANON_KEY',
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
}

export function getAdminBasePath() {
  const raw = import.meta.env.VITE_ADMIN_BASE_PATH || '/_sys/r7k9';
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`;
  return withSlash.replace(/\/+$/, '') || '/_sys/r7k9';
}
