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

| Command                             | Mode   | Files                         |
| ----------------------------------- | ------ | ----------------------------- |
| `npm run dev`                       | `dev`  | `.env.dev`, then `.env.local` |
| `npm run build` / `npm run preview` | `prod` | `.env.prod`                   |
| `npm run db:seed`                   | `dev`  | `.env.dev`, then `.env.local` |
| `npm run db:seed:prod`              | `prod` | `.env.prod`                   |

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

## Supabase cloud project

1. Link the cloud project: `npx supabase link --project-ref <ref>`
2. Push schema: `npm run db:push`
3. Put cloud keys in `.env.prod`, then seed with `npm run db:seed:prod`

The service role key is used only by the local seed script. It never reaches the browser bundle and is never set in CI.

## Deployment (GitHub Pages)

The site is a static Vite build published to GitHub Pages. Deploys are **manual only** — nothing ships automatically on push.

### One-time setup

1. Add the remote and push every branch:

   ```bash
   git remote add origin https://github.com/<owner>/<repo>.git
   git push -u origin --all
   git push origin --tags
   ```

   `push --all` sends every local branch and keeps new branches easy to publish later with `git push -u origin <branch>`.

2. **Settings → Pages → Source**: select **GitHub Actions** (not "Deploy from a branch").
3. **Settings → Environments → `github-pages` → Environment secrets**: add

   | Secret                   | Value                                     |
   | ------------------------ | ----------------------------------------- |
   | `VITE_SUPABASE_URL`      | Cloud project URL                         |
   | `VITE_SUPABASE_ANON_KEY` | Cloud anon (publishable) key              |
   | `VITE_ADMIN_BASE_PATH`   | Studio path, e.g. `/_sys/r7k9` (optional) |

   The build reads these from the environment. Local `.env.*` files are never uploaded and are not used by CI.

4. **Settings → Secrets and variables → Actions → Variables**: add `PAGES_SITE_URL` with the public origin of the site, e.g. `https://<username>.github.io` or `https://rushak.dev`.

### Site URL and the `base` path

The build sets no Vite `base`, so assets resolve from the domain root. That is correct for a user site (`https://<username>.github.io/`) or a custom domain, but **not** for a project page like `https://<username>.github.io/repo-name/`, which would serve a blank page. Name the repo `<username>.github.io`, or use a custom domain.

`PAGES_SITE_URL` drives two things in `postbuild` ([scripts/finalize-pages-build.mjs](scripts/finalize-pages-build.mjs)):

- canonical URLs in `dist/sitemap.xml` and `dist/robots.txt`
- `dist/CNAME`, written **only** when the host is not a `github.io` domain

That conditional matters: GitHub Pages applies any `CNAME` in the artifact as the repo's custom domain, so shipping one before DNS exists would redirect the live site to an unreachable domain.

### Moving to a custom domain later

1. Point DNS at GitHub: four `A` records for the apex at `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
2. Change the `PAGES_SITE_URL` variable to `https://rushak.dev`.
3. Run the deploy workflow — the build now emits `dist/CNAME`.
4. **Settings → Pages → Custom domain**: enter `rushak.dev`, then enable **Enforce HTTPS** once the certificate is issued.

No code changes are needed.

### Running a deploy

1. Push the commits you want available: `git push origin main`
2. Repo → **Actions** → **Deploy to GitHub Pages** → **Run workflow**
3. Set **ref** to what you want live, then run it:

   | ref             | Deploys                      |
   | --------------- | ---------------------------- |
   | `main`          | Latest commit on `main`      |
   | `feature/xyz`   | Latest commit on that branch |
   | `v1.0.0`        | The commit tagged `v1.0.0`   |
   | full commit SHA | That exact commit            |

Inspect a candidate commit first with `git show <SHA> --stat`.

The workflow checks out the ref, runs lint and `npm run build`, writes `dist/404.html` as an SPA fallback so deep links survive a refresh, and publishes `dist/`.

### Troubleshooting

- **Workflow missing under Actions** — `.github/workflows/deploy.yml` must exist on the default branch on GitHub.
- **Pages permission errors** — Settings → Pages → Source must be **GitHub Actions**.
- **Build fails on missing Supabase config** — the environment secrets above are not set on the `github-pages` environment.
- **Routes 404 on refresh** — confirm the SPA fallback step ran, then redeploy.
- **Blank page** — the site is being served from a subpath (`/repo-name/`). See [Site URL and the `base` path](#site-url-and-the-base-path).
- **Site redirects to an unreachable domain** — a stale custom domain is set under Settings → Pages. Clear it, and check `PAGES_SITE_URL`.
- **Stale content** — hard-refresh (`Ctrl+Shift+R`).

## Routes

Home, About, Platforms, Infrastructure, Automation, Philosophy, Experience, Resume, Contact.
