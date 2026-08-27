/// <reference types="vite/client" />

declare module '*.ttf' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_ADMIN_BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
