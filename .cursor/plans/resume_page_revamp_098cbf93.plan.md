---
name: Resume page revamp
overview: "Rebuild the public resume page as a left-aligned professional document: one masthead, one download action, and type-led sections. Keep every portfolio field and the existing color tokens. Drop the stacked card chrome that stretches the page."
todos:
  - id: rewrite-preview
    content: Rebuild ResumePreview as a masthead plus type-led sections, same portfolio data
    status: completed
  - id: page-shell
    content: Adjust ResumePage section width/padding to the document column
    status: completed
  - id: verify-viewports
    content: Check resume route at phone, tablet, and desktop, including download and case-study links
    status: completed
isProject: false
---

# Resume page visual revamp

## What is wrong

[`src/features/resume/ResumePreview.tsx`](src/features/resume/ResumePreview.tsx) renders the resume as a marketing landing: centered all-caps eyebrow, slogan headline, sticky identity card, then the same [`SurfaceCard`](src/components/cards/SurfaceCard.tsx) / [`OverlayCard`](src/components/cards/OverlayCard.tsx) pattern for every section. Result is a ~7300px wall. Experience sits under skill cards. Download PDF appears twice. The page has no `h1` (`SectionHeader` is an `h2`).

Content stays. Data still comes from `usePortfolio()` (`profile` + `resume`). No copy rewrite, no new fonts, no new palette.

## Design

Subject: live resume for a platform engineer. Reader: a hiring manager who scans, then downloads the PDF.

Spend the one bold move on the masthead. Everything else is type, spacing, and one timeline rule. Stay on existing tokens (`font-display`, `text-foreground`, `text-muted-foreground`, `text-soft-cyan`, `border-border`, `bg-background`). No cream/terracotta, no acid accent, no new card kit.

```
Name                         [Download PDF]
Title
Location   Phone   Email   LinkedIn   GitHub
────────────────────────────────────────────
Summary
  prose + bullets

Experience                          ← vertical rule, period beside role
  Organization
  Role
  • bullet

Projects
  Name / role          View case study
  • bullets
  stack badges

Competencies          (wrap)
Expertise             (label + comma list, two columns from md)

Education             Certifications
────────────────────────────────────────────
View experience    Get in touch
```

Alignment is left. Line length stays under ~75 characters (`max-w-3xl` on prose). Page column is `max-w-4xl`, not the current `max-w-6xl` two-column card grid.

Section order for scan: summary, experience, projects, skills, education and certifications. Highlights sit as a compact definition list under the summary (label + detail), not as stat cards.

## Implementation

Edit only:

- [`src/features/resume/ResumePreview.tsx`](src/features/resume/ResumePreview.tsx) — replace layout. Keep `CaseStudyLink`, portfolio fields, and the hardcoded summary paragraph plus `profile.summaryBullets`.
- [`src/pages/ResumePage.tsx`](src/pages/ResumePage.tsx) — section padding only if the new column needs it. SEO block stays.

Structure inside `ResumePreview`:

- Masthead: `h1` = `profile.name`, subtitle = `profile.resumeTitle`, roles as `Badge`. Contact is real links (`tel:`, mailto, LinkedIn, GitHub) with visible text and Lucide icons. One primary [`MagneticButton`](src/components/shared/MagneticButton.tsx) for `profile.resumeUrl` (`Download PDF`). Full width on small screens, auto width from `sm`. Min height 44px.
- `Separator` between major sections. Section titles are `h2`, entries are `h3`. No eyebrow, no icon boxes, no `SectionHeader`.
- Summary: plain paragraph and a `ul`. Markers use `marker:text-muted-foreground`, not cyan `▹`.
- Highlights: `dl` grid, one column on mobile, two from `sm`.
- Experience: `ol` with a left border. Period sits beside the role on `sm+` and wraps under the role on narrow screens. Bullets are a real list.
- Projects: same list pattern. Stack stays `Badge`. Case study link unchanged.
- Competencies: `Badge` `variant="outline"` wrap.
- Expertise: two-column from `md`. Group title plus items as text, not a card per group.
- Education and certifications: two columns from `md`. Long Microsoft Learn list stays a wrapping list, no `md:col-span-2` hack.
- Footer: text links to `/experience` and `/contact` only. Second PDF button goes away.
- Motion: one `Reveal` on the masthead. Drop per-section fade-up. `prefers-reduced-motion` already short-circuits `Reveal`.

Do not change admin resume editing, PDF upload, or shared `SectionHeader` / `SurfaceCard`.

## Checks

- 375 / 768 / 1280: no horizontal scroll, contact wraps, download stays tappable, timeline readable.
- Keyboard: tab through contact, download, case-study links. Focus ring visible.
- Heading order: one `h1`, then `h2`, then `h3`.
- Empty `resumeUrl`: hide the download button, page still reads.
- Dark mode: semantic tokens only, no raw hex and no manual `dark:` color overrides.
