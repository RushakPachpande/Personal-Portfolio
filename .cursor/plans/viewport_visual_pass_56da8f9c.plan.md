---
name: Viewport visual pass
overview: Audit the public portfolio at the listed viewport widths in light and dark, then fix only confirmed layout problems so the existing design stays intact and reads cleanly from 320px through 1920px.
todos:
  - id: audit-viewports
    content: Screenshot public routes at 320, 374, 375, 430, 767, 768, 1023, 1024, 1440, and 1920, plus menu, terminal, and lightbox, in light and dark
    status: completed
  - id: fix-confirmed
    content: "Fix only confirmed issues: tablet card columns, architecture grid, wrapping text, nav fit, and wide-screen shell if needed"
    status: completed
  - id: reverify
    content: Re-test affected widths and themes, then type-check
    status: completed
isProject: false
---

# Viewport visual pass

Keep the current visual system (Space Grotesk, Inter, glass cards, `max-w-6xl` sections). This is a layout repair, not a redesign. Admin studio stays out of scope.

## Test matrix

Reuse the running Vite server at `http://localhost:8000`. Do not start a second dev server.

Widths: **320, 374, 375, 430, 767, 768, 1023, 1024, 1440, 1920**.

Public routes: `/`, `/about`, `/platforms`, one case study, `/infrastructure`, `/automation`, `/technology-library`, `/philosophy`, `/experience`, `/resume`, `/contact`, `/404`.

Also open the mobile menu, command terminal, and a case-study lightbox. Spot-check light and dark on home, a case study, and contact at 375, 768, and 1440.

Fail a viewport when any of these show up: horizontal page scroll, overlapping or clipped text, nav that does not fit, touch targets under 44px, cards crushed into unreadable columns, images that do not scale, sticky header covering content.

## Likely fixes (apply only if the screenshot shows the bug)

- **Three-up grids start too early.** [EngineeringAreas.tsx](src/features/home/EngineeringAreas.tsx) and [HomeSections.tsx](src/features/home/HomeSections.tsx) use `md:grid-cols-3` (768px). Overlay cards have fixed heights in [index.css](src/index.css) (`.overlay-card--compact` / `--standard`). At 768-1023px that yields ~220px cards and clipped titles. Move the third column to `lg` (1024px): 1 column below 768, 2 columns from 768, 3 from 1024. Same check for [TechnologyLibraryGrid.tsx](src/features/technology-library/TechnologyLibraryGrid.tsx), which already waits until `lg`.
- **Architecture diagram inserts a line as a grid cell.** In [ArchitectureFlow.tsx](src/features/case-studies/ArchitectureFlow.tsx), each connector is `hidden` until `lg:flex`, then it occupies a cell in `lg:grid-cols-3`. At laptop width the row becomes node, line, node instead of three nodes. Draw connectors outside the grid (or drop them) so nodes stay one cell each.
- **Long contact strings.** Channel links in [ContactPanel.tsx](src/features/contact/ContactPanel.tsx) are `inline-flex` with no wrap. Email and profile URLs can spill past the card at 320-374px. Add `min-w-0` and wrapping on those links.
- **Hero type at 320px.** [HeroSection.tsx](src/features/hero/HeroSection.tsx) uses `text-4xl` plus `tracking-[0.22em]` on the eyebrow. If the name or eyebrow overflows, drop tracking below `sm` and let the headline wrap with `text-balance`. Do not shrink body copy below 16px.
- **Desktop nav at 1024px.** [Navbar.tsx](src/components/layout/Navbar.tsx) switches from the sheet to the inline nav at `lg`. If brand + Work + Profile + Contact + theme + terminal overflow or collide, keep the sheet until the row fits (likely `xl`), and keep theme and terminal inside the sheet below that.
- **Wide screens.** Content is capped at `max-w-6xl` (~1152px). At 1440 and 1920 that is a centered column, which is correct for reading. Widen the shell (for example `xl:max-w-7xl`) only if screenshots show cards stranded in empty side space. Leave hero and about copy on `max-w-2xl` / `max-w-3xl`.

Do not add custom breakpoints for 374, 430, 1440, or 1920 unless a bug exists only inside one of those bands. Tailwind `sm` 640, `md` 768, `lg` 1024, `xl` 1280 already cover the table.

## After fixes

Re-screenshot every width that changed, in both themes where the fix touches color or logos. Run `npx tsc -b` on touched files. No commit.