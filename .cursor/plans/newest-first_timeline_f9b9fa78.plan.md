---
name: Newest-first timeline
overview: Show the experience timeline newest-first, and add LevelUP and DISHA as 2025 platform cards at the top. Home snapshot order stays NextGen, Navdrishti, Azure.
todos:
  - id: reverse-render
    content: Reverse timeline render in ExperienceTimeline so newest is on top
    status: completed
  - id: add-cards
    content: Append LevelUP and DISHA achievement items to src/content/timeline.ts
    status: completed
  - id: insert-migration
    content: Add and apply a local migration that inserts the two timeline rows at sort_order 7 and 8
    status: completed
isProject: false
---

# Newest-first timeline plus LevelUP and DISHA

`/experience` currently lists oldest at the top because [`timeline_items.sort_order`](supabase/migrations/20260924121632_reorder_timeline_chronological.sql) is ascending and [`ExperienceTimeline`](src/features/timeline/ExperienceTimeline.tsx) renders that array as-is. Home Experience Snapshot uses the same order via `getHomeExperienceSnapshot` in [`src/lib/portfolio.ts`](src/lib/portfolio.ts). Do not flip `sort_order`, or the home cards become Azure, Navdrishti, NextGen.

## Display

In [`src/features/timeline/ExperienceTimeline.tsx`](src/features/timeline/ExperienceTimeline.tsx), render a reversed copy of `timeline`. Source and database stay oldest-first so the next seed (`sort_order: index` in [`scripts/seed-portfolio.ts`](scripts/seed-portfolio.ts)) still matches.

Top to bottom on `/experience`:

1. LevelUP
2. DISHA
3. Self-hosted n8n
4. Azure optimization
5. Microsoft 365 migration
6. Navdrishti
7. NextGenInnov8 (Apr 2025-Present)
8. MCA (2023-2025)
9. BBA (2019-2022)

LevelUP sits above DISHA because both case studies are only dated `2025 - Present` and you named LevelUP first. The 2025 work under them is the previous story reversed. Linked initiatives chips stay as they are.

## New cards

Append two `achievement` items at the end of [`src/content/timeline.ts`](src/content/timeline.ts) (newest in the ascending source). Copy stays short and matches the case studies in [`src/content/caseStudies/platforms.ts`](src/content/caseStudies/platforms.ts). Logos already exist: `src/assets/logos/levelup.png`, `src/assets/logos/disha.png`. Do not set `showOnHome`.

- `achieve-levelup`: title LevelUP, organization Zapienz, period `2025 - Present`, description from the LevelUP summary (timed multi-subject quizzes, AI-assisted grading, session security).
- `achieve-disha`: title DISHA, organization ASM, period `2025 - Present`, description from the DISHA summary (PGDM induction: QR geofenced attendance, timed quizzes, assessments, live leaderboards).

## Database

Do not edit `20260924121632_reorder_timeline_chronological.sql`. New migration via `npx supabase migration new add_levelup_disha_timeline`: insert those two `timeline_items` rows with `sort_order` 7 (DISHA) and 8 (LevelUP), `data` shaped like the existing timeline jsonb. Apply with `npx supabase migration up`. Do not `db:push`.
