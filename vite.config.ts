import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function isProdMode(mode: string) {
  return mode === 'prod' || mode === 'production';
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  if (
    isProdMode(mode) &&
    (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY)
  ) {
    throw new Error(
      'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY for production build'
    );
  }

  return {
    envDir: process.cwd(),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8000,
      host: true,
    },
  };
});
