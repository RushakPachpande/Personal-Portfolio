---
name: Warning-free deploy
overview: Clear the 11 deploy warnings and the Ubuntu notice by bumping GitHub Actions to Node 24 majors, pinning the runner to Ubuntu 24.04, and moving router components out of the file that exports the router.
todos:
  - id: bump-actions
    content: Bump deploy.yml actions to Node 24 majors and pin ubuntu-24.04; keep Node 22 for the app build
    status: completed
  - id: split-router
    content: Move admin lazy pages and AdminCaseStudyRoute into adminPages.tsx so router.tsx only exports router
    status: completed
  - id: verify-lint
    content: Run oxlint and tsc; confirm publicRoutes stays clean
    status: completed
isProject: false
---

# Warning-free GitHub Pages deploy

Deploy already succeeded. These annotations do not mean the live site is broken. They are version and lint hygiene.

## 1. Node 20 action runtime (1 warning)

GitHub no longer runs JavaScript actions on Node 20. Current tags still declare Node 20, so the runner forces them onto Node 24 and warns. App build stays on Node 22 (`node-version: 22` in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). That line is the site build, not the action runtime.

Bump only the actions in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

- `actions/checkout@v4` to `@v7` (Node 24 since v5; v7 is current). This workflow is `workflow_dispatch` only, so the v7 fork-PR checkout block does not apply. `ref` input stays.
- `actions/setup-node@v4` to `@v7`. Keep `node-version: 22` and `cache: npm`. No `packageManager` field in [`package.json`](package.json), so the v5 auto-cache change does not alter this job.
- `actions/configure-pages@v5` to `@v6`. `outputs.base_path` is unchanged (still used as `PAGES_BASE_PATH`).
- `actions/upload-pages-artifact@v3` to `@v5`. The log names `actions/upload-artifact@v4` because v3 calls it. v5 calls `upload-artifact` v7 (Node 24). v4+ skips dotfiles; this `dist` has no required dotfiles (`404.html` is not hidden).
- `actions/deploy-pages@v4` to `@v5` (Node 24).

GitHub-hosted runners already run these Node 24 actions. No self-hosted runner change.

## 2. `react/only-export-components` (10 shown, same file has more)

[`src/app/router.tsx`](src/app/router.tsx) defines PascalCase pages (`lazy(...)` from line 9 through `AdminCaseStudyRoute` at line 100) and also exports `router`. [`.oxlintrc.json`](.oxlintrc.json) warns on that mix. `allowConstantExport` does not cover `createBrowserRouter(...)`. GitHub showed the first 10 component lines; the rest of that file matches the same rule.

[`src/app/publicRoutes.tsx`](src/app/publicRoutes.tsx) also has local `lazy` pages, but it exports the component `PreviewPublicChrome`, so oxlint did not flag it. Leave that file alone unless `npm run lint` reports it after the router move.

Fix: new [`src/app/adminPages.tsx`](src/app/adminPages.tsx) that only exports those lazy pages and `AdminCaseStudyRoute`. [`src/app/router.tsx`](src/app/router.tsx) imports them and only exports `router`. Route paths and `withSuspense` wrappers stay as they are. [`src/main.tsx`](src/main.tsx) import of `router` stays.

Do not disable the oxlint rule.

## 3. Ubuntu notice (1 notice)

`runs-on: ubuntu-latest` will move to Ubuntu 26 starting 19 Oct 2026. Pin `ubuntu-24.04` so the next deploy keeps today's image and the notice goes away. Do not jump to Ubuntu 26 in this change.

## Check

- `npm run lint` clean
- `npx tsc -b` clean
- Re-run the Deploy workflow (`workflow_dispatch`). Annotations should be empty.
