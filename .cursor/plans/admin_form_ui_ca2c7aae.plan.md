---
name: Admin Form UI
overview: Replace every JSON textarea in Studio with labeled forms, image previews, and list editors that match the public site’s dark engineering look—so content can be edited without touching JSON.
todos:
  - id: admin-field-kit
    content: Build shared Studio field components (lists, image upload, sections, save bar) and add Select/Switch if needed
    status: completed
  - id: admin-chrome
    content: Restyle AdminLayout, login, and dashboard as a matching engineering console
    status: completed
  - id: admin-content-forms
    content: Replace JSON on profile, case studies, technologies, timeline, philosophy, resume, and terminal with labeled forms
    status: completed
  - id: admin-media-inbox
    content: Polish submissions cards and a real media gallery; remove JsonEditor
    status: completed
isProject: false
---

# Beautiful form-based Studio admin

JSON editors were a first-pass shortcut. They go away. Studio keeps the same routes and save APIs; only the editing UI changes.

## Design direction

Match the live portfolio, not a generic CMS: dark glass surfaces, Space Grotesk headings, JetBrains Mono labels, electric-blue / soft-cyan accents. Studio should feel like an engineering console for this site.

Shared chrome upgrades in [`src/features/admin/AdminLayout.tsx`](src/features/admin/AdminLayout.tsx):
- Sticky sidebar with icons (lucide, already in the project)
- Page title + short helper text (“What this page edits”)
- Sticky save bar: Save / Discard / last-saved status
- Login in [`src/pages/admin/AdminLoginPage.tsx`](src/pages/admin/AdminLoginPage.tsx) gets the same visual language (boot-style frame, not a bare card)

Add two shadcn primitives if missing: **Select** and **Switch** (project already has Input, Textarea, Label, Button, Card, Badge, Separator, Dropdown).

## Reusable field kit

New folder [`src/features/admin/fields/`](src/features/admin/fields/):

| Component | Use |
|---|---|
| `Field` | Label + hint + control |
| `StringListField` | Chip list with add/remove (roles, focus areas, learnings, tech names) |
| `PairListField` | Repeatable cards (decision/rationale, challenge/resolution, architecture nodes) |
| `ImageField` | Preview + file upload + alt text (logo, cover, tech icon, gallery item) |
| `SelectField` / `SwitchField` | Category, difficulty, featured, incomplete |
| `AdminSection` | Glass card grouping related fields |
| `SaveBar` | Sticky actions |

Delete [`src/features/admin/JsonEditor.tsx`](src/features/admin/JsonEditor.tsx) after all consumers are gone.

## Page-by-page forms

**Dashboard** — count tiles become overlay-style metric cards with links into each section (same energy as homepage stats).

**Profile** — named inputs: identity (name, short name, role, resume title, location, phone, email), headline/description, social URLs, site version, plus chip lists for roles and focus areas, and four textareas for about copy.

**Case studies list** — cards with logo thumbnail, category badge, status, featured flag; not a raw list.

**Case study editor** (the important one) — tabbed form so the 20+ fields are navigable:
1. Basics — name, slug, category, status, difficulty, timeline, featured/incomplete switches, summary
2. Story — business context, problem, objective, solution, outcome, todo note
3. Architecture — architecture prose + repeatable nodes (id/label/detail)
4. Stack — technology multi-select from the library (writes `technologyIds` + names), stack groups as repeatable group/items
5. Decisions & challenges — pair lists; responsibilities/learnings as chips
6. Media — logo/cover ImageFields; gallery items with type select, caption, upload, reorder/remove
7. Related — checkbox list of other case studies

Keep existing `upsertCaseStudy` / upload helpers in [`src/services/portfolio.ts`](src/services/portfolio.ts).

**Technologies** — grid of cards: logo preview, name, id, category select, description, used-in read-only chips. Add / delete from the UI, not JSON.

**Timeline / Philosophy** — stacked editable cards with Add item, remove, and up/down reorder.

**Resume** — tabs: Highlights, Competencies, Expertise groups, Experience, Projects, Education, Certifications. Each item is a card with the real fields (bullets as a string list, project case-study slug/category as selects).

**Terminal** — table: command, aliases (chips), description. Add/remove rows. Execution logic stays in code; this only edits the catalog.

**Submissions** — readable message cards (name, email as mailto, timestamp, body, delete). Already close; polish only.

**Media** — true gallery: folder-aware thumbnails, copy path, delete, drag-drop upload. Fix listing so folders (`logos/`, `tech/`, `gallery/`) can be opened instead of a broken root-only list.

## Out of scope

- No JSON fallback
- No schema/API changes unless a form needs a small helper (e.g. better `listMediaFiles` recursion)
- Public site pages stay as they are
