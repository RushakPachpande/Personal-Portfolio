---
name: Strip em en dashes
overview: Replace every em dash (U+2014) and en dash (U+2013) in repo text with an ASCII hyphen, then add one new migration that does the same replacement in stored portfolio copy. Old migration files stay untouched.
todos:
  - id: sweep-files
    content: Replace U+2014 and U+2013 with ASCII hyphen across repo text, skipping node_modules, dist, graphify-out, historical migrations, and the dash rule file
    status: completed
  - id: new-migration
    content: Add replace_em_en_dashes_in_content migration for stored prose columns only
    status: completed
  - id: verify
    content: Re-scan for remaining dashes and run graphify update
    status: completed
isProject: false
---

# Strip em and en dashes

Character swap only: `—` (U+2014) and `–` (U+2013) become `-` (U+002D). Surrounding spaces stay, so `2019 — 2022` becomes `2019 - 2022` and `systems—ensuring` becomes `systems-ensuring`. Same rule in files and SQL so seed text and stored rows match.

## Where the dashes actually are

- [`supabase/seed.sql`](supabase/seed.sql) is only `select 1;`. Real seed copy is TypeScript under [`src/content/`](src/content/) upserted by [`scripts/seed-portfolio.ts`](scripts/seed-portfolio.ts).
- Existing files in [`supabase/migrations/`](supabase/migrations/) have no em/en dashes. Do not edit them ([immutable migrations](.cursor/rules/immutable-migrations.mdc)).
- [`supabase/config.toml`](supabase/config.toml) has two comment dashes. Include it in the file pass.
- Heaviest product copy: [`src/content/caseStudies/`](src/content/caseStudies/), [`src/content/timeline.ts`](src/content/timeline.ts), [`src/content/terminal.ts`](src/content/terminal.ts), [`src/content/resume.ts`](src/content/resume.ts), plus UI strings, [`README.md`](README.md), [`GITHUB_README.md`](GITHUB_README.md), [`.cursor/rules/`](.cursor/rules/), [`.cursor/plans/`](.cursor/plans/), and vendored [`.agents/skills/`](.agents/skills/).

## File pass

One scan of the repo. Replace both characters in text files (ts, tsx, js, jsx, mjs, sql, md, mdc, json, css, html, yml, yaml, toml, txt, py, svg).

Skip:

- `node_modules`, `dist`, `.git`, binary assets
- [`graphify-out/`](graphify-out/) (regenerate after the edit; `graph.json` stores `\u2014`)
- [`.cursor/rules/no-em-en-dashes.mdc`](.cursor/rules/no-em-en-dashes.mdc) so that rule can still show the forbidden characters
- historical migration SQL

## New migration

Create with `npx supabase migration new replace_em_en_dashes_in_content`. Update only rows that contain U+2014 or U+2013. Use `replace(..., chr(8212), '-')` and `chr(8211)`. For `jsonb`, replace on `::text` and cast back. Set `updated_at = now()` only on changed rows.

Prose columns:

- `site_profile.data`
- `site_settings.config`
- `case_studies.status`, `case_studies.data`
- `technologies.name`, `technologies.description`
- `timeline_items.data`
- `philosophy_pillars.data`
- `resume_sections.data`
- `terminal_commands.description`, `terminal_commands.data`
- `resume_files.label`

Leave keys and paths alone (`slug`, `id`, `command`, `logo_path`, `storage_path`, `used_in_slugs`). Leave `contact_submissions` alone (visitor text).

Do not run `npm run db:push` or `db:seed:prod`. On a fresh `db:reset`, seed inserts already-clean TypeScript and this migration is a no-op.

## Check

- Search the repo again for `—`, `–`, `\u2014`, and `\u2013`. Remaining hits should be only the dash rule file (and `graphify-out` until update).
- Run `graphify update .` so the generated graph drops escaped dashes from edited sources.
- No TypeScript behavior change beyond string text. Skip `tsc` unless a string edit lands inside a template that no longer parses (it should not).
