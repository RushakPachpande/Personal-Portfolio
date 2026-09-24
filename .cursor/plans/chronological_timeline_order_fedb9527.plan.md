---
name: Chronological timeline order
overview: "Reorder the experience timeline from oldest to newest so it reads as one line: education, then the NextGen role, then Navdrishti, the Microsoft 365 migration, and the remaining deployments."
todos:
  - id: reorder-source
    content: Reorder timeline array in src/content/timeline.ts to oldest-first
    status: completed
  - id: sort-migration
    content: Add migration that sets timeline_items.sort_order to the same order and apply it locally
    status: completed
isProject: false
---

# Chronological experience timeline

Current top-to-bottom order in [`src/content/timeline.ts`](src/content/timeline.ts) jumps in time: NextGen (Apr 2025-Present), then MCA (2023-2025), then BBA (2019-2022), then undated work cards. `/experience` renders that array order via `timeline_items.sort_order` ([`src/services/portfolio-public.ts`](src/services/portfolio-public.ts)). Layout stays a single left spine in [`src/features/timeline/ExperienceTimeline.tsx`](src/features/timeline/ExperienceTimeline.tsx). Copy, types, and the Linked initiatives chip row stay.

## New order (oldest at top)

Start dates, then the sequence you named:

1. `edu-bba` - BBA, 2019-2022
2. `edu-mca` - MCA, 2023-2025
3. `career-nextgen` - NextGenInnov8, Apr 2025-Present
4. `achieve-navdrishti`
5. `deploy-m365` - Microsoft 365 migration
6. `deploy-azure`
7. `deploy-n8n`

Azure then n8n keeps their current relative order. All four work cards are 2025 and have no finer dates in the content. Period labels stay (`Achievement`, `Major deployment`).

Home Experience Snapshot only shows rows with `showOnHome`. Those three stay NextGen, Navdrishti, Azure.

## Changes

- Reorder the `timeline` array in [`src/content/timeline.ts`](src/content/timeline.ts) so the next seed uses the same indexes (`scripts/seed-portfolio.ts` writes `sort_order: index`).
- New migration only (do not edit [`supabase/migrations/20260827194842_portfolio_schema.sql`](supabase/migrations/20260827194842_portfolio_schema.sql)): `npx supabase migration new reorder_timeline_chronological`, then `UPDATE` `sort_order` by those ids. Apply locally with `npx supabase migration up` so the page you are viewing changes. Do not `db:push` to remote unless you ask.
