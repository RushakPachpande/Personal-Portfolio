# Rushak Pachpande Portfolio

Premium Mission Control–inspired portfolio for Rushak Pachpande — Platform Engineer.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion + React Router
- Lucide icons

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Content

Editable typed content lives in `src/content/`:

- `profile.ts` — identity, CTAs, overview metrics
- `projects.ts` — featured systems
- `skills.ts` — capability matrix
- `timeline.ts` — experience timeline
- `philosophy.ts` — engineering pillars
- `terminal.ts` — command list

Replace `public/resume.pdf` with the real resume file.

## Architecture notes

- Multi-route SPA with lazy-loaded pages
- Boot sequence runs once per browser session
- Command terminal (navbar icon) supports navigation commands
- Konami code unlocks Developer Mode
- Contact form uses `mailto:` today; UI is ready for a future Supabase backend
