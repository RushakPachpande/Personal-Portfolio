# Rushak Pachpande Portfolio

Engineering case-study website for Rushak Pachpande — Platform Engineer.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion + React Router
- Supabase (Postgres, Auth, Storage) — no separate Express server

## Local development

```bash
npm install
npx supabase start
cp .env.example .env.dev
```

Copy the API URL, anon key, and service role key from `npx supabase status` into `.env.dev` (optional machine-only overrides go in `.env.local`). Then:

```bash
npm run db:seed
npm run dev
```

Env files are chosen by mode:

| Command | Mode | Files |
|---|---|---|
| `npm run dev` | `dev` | `.env.dev`, then `.env.local` |
| `npm run build` / `npm run preview` | `prod` | `.env.prod` |
| `npm run db:seed` | `dev` | `.env.dev`, then `.env.local` |
| `npm run db:seed:prod` | `prod` | `.env.prod` |

Studio (admin) lives at `VITE_ADMIN_BASE_PATH` (default `/_sys/r7k9`). Sign in with the user created by seed (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) or create one in Supabase Studio (`http://127.0.0.1:54323`) with `app_metadata.role = admin`.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run db:start
npm run db:stop
npm run db:reset
npm run db:seed
npm run db:seed:prod
npm run db:push
```

## Content

Canonical runtime data is in Supabase. `src/content/` remains the seed source for the original static dataset.

Factual source: `docs/resume/`. Do not invent metrics.

## Production

1. Link a Supabase cloud project: `npx supabase link --project-ref <ref>`
2. Push schema: `npm run db:push`
3. Put cloud keys in `.env.prod`, then seed with `npm run db:seed:prod` (service role never in the browser)
4. Set GitHub Actions secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_BASE_PATH`

## Routes

Home, About, Platforms, Infrastructure, Automation, Philosophy, Experience, Resume, Contact.
