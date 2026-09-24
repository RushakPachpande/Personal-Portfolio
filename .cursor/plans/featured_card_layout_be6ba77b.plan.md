---
name: Featured card layout
overview: Make the home featured row fill the section width, show the full highlight copy instead of clipping it, and put DISHA in the wide slot.
todos:
  - id: fill-row
    content: Switch the home featured grid to explicit 1/2/3 columns so three cards fill the section width
    status: completed
  - id: wide-card
    content: Let the wide overlay card grow and show wrapped stats plus a longer summary
    status: completed
  - id: disha-slot
    content: Pin the disha case study as the home wide highlight
    status: completed
  - id: verify
    content: Check 375, 1024, 1440, and 1920 on the home featured row, then type-check
    status: completed
isProject: false
---

# Featured card layout

The home featured block in [HomePage.tsx](src/pages/HomePage.tsx) uses `responsiveCardGridAutoClassName` from [utils.ts](src/lib/utils.ts): `repeat(auto-fill, minmax(18rem, 1fr))`. At the current desktop width that track is about 295px and fits four columns. Only three cards follow the full-width highlight, so one column stays empty (DOM: cards at x=339, 652, 965 while the highlight starts at x=25 and is 1232px wide).

The wide card (`.overlay-card--wide` in [index.css](src/index.css)) is locked to 18rem. Stats use `white-space: nowrap` and ellipsis, and the summary is clamped to two lines inside a 4.5rem body. That is why "Final development, validation..." and the DISHA/LevelUP summaries are cut while the right side of the card stays empty. The logo plate is capped at 9rem inside a 38% banner, so the banner itself is mostly void.

## Layout

On the home featured grid only, stop using auto-fill. Use an explicit grid:

- 1 column below 768px
- 2 columns from 768px
- 3 equal columns from 1024px, each `minmax(0, 1fr)` so the three cards share the full section width
- the highlight wrapper keeps `featured-card-span` / `col-span-full`

Leave `responsiveCardGridAutoClassName` for other callers. Category grids that should keep auto-fill stay as they are.

## Highlight content

Scope changes to `.overlay-card--wide` so standard cards on About, experience, and category pages keep their fixed heights.

- Let the wide card height follow its content (`height: auto; max-height: none`) from 768px up.
- Stats values wrap (`white-space: normal`) instead of a single ellipsis line. Three stats stay in one row on the wide card because the row is full width.
- Summary uses up to four lines on the wide card, then the tech logos sit under it with no overlap.
- Banner stays a left column, but the logo plate grows with that column (`min(100%, 12rem)`) so the mark is not a small tile in a large empty panel.

## DISHA in the wide slot

`wide={index === 0}` follows featured sort order, which currently leads with Navdrishti. On the home page, move the study whose slug is `disha` to the front of the four featured cards before render. Navdrishti stays in the row under it. Do not change the `featured` flag in content or the database.

## Check

At `http://localhost:8000` (do not start a second dev server): home featured row at 1024, 1440, and 1920. DISHA is the wide card, its status and summary are readable, and BrainPulses, Navdrishti, and LevelUP stretch across the same width as the highlight. Spot-check 375px so the stack is still one column. `npx tsc -b`. No commit.