import path from 'node:path';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

function isProdMode(mode: string) {
  return mode === 'prod' || mode === 'production';
}

// GitHub Pages serves user sites at "/" and project sites at "/<repo>/".
// The deploy workflow passes the correct value; local builds default to root.
function resolveBasePath() {
  const raw = process.env.PAGES_BASE_PATH?.trim();
  if (!raw || raw === '/') return '/';
  return `/${raw.replace(/^\/+|\/+$/g, '')}/`;
}

function vendorChunk(id: string) {
  if (!id.includes('node_modules')) return;
  if (
    /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(
      id
    )
  ) {
    return 'vendor-react';
  }
  if (id.includes('@tanstack/react-query')) return 'vendor-query';
  if (id.includes('framer-motion')) return 'vendor-motion';
  if (id.includes('@supabase/supabase-js')) return 'vendor-supabase';
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

  const analyze = process.env.npm_lifecycle_event === 'build:analyze';
  const plugins: PluginOption[] = [react(), tailwindcss()];
  if (analyze) {
    plugins.push(
      visualizer({
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
        open: false,
      })
    );
  }

  return {
    base: resolveBasePath(),
    envDir: process.cwd(),
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8000,
      host: true,
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: vendorChunk,
        },
      },
    },
  };
});
