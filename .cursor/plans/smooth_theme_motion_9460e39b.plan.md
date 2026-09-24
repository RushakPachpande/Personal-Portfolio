---
name: Smooth theme motion
overview: Revert the radial-gradient + named-knob View Transition (it regressed the reveal). Use a clip-path circle for a steady page wipe, and slide the switch ball with CSS after the wipe so zoom does not break capture.
todos:
  - id: smooth-vt
    content: Revert VT names and radial-gradient mask; clip-path circle on ::view-transition-new(root) only; animation none on group/old
    status: completed
  - id: knob-slide
    content: Keep rotate-center removed; apply html.dark inside VT, setTheme after transition.finished so translateX 0↔26px actually plays
    status: completed
  - id: verify-motion
    content: Verify even circle with no mid freeze, visible knob drift both ways; reduced-motion skip; tsc, oxlint, prettier
    status: completed
isProject: false
---

# Smooth circle + knob slide (revised)

The previous pass (radial-gradient `mask-size` + `view-transition-name` on the origin and knob) is **reverted in approach**, not doubled down on. That combo is what felt worse: the slider uses `zoom`, so named pairs capture at the wrong size/position, and scaling a gradient mask still hitches.

Keep what was already correct: **no `theme-switch-rotate-center`**. Those keyframes are `translateX(26px)` on every frame, so they skip the 0.4s transform transition.

## Page reveal

In [`src/lib/theme-view-transition.ts`](src/lib/theme-view-transition.ts):

- Remove `viewTransitionName` on origin/knob and all `::view-transition-*(theme-switch-*)` rules.
- Remove `softCircleMask()` / `mask-size` keyframes.
- After `animation: none` on group/old/new, animate **only** new with **clip-path** (GPU clip, interpolates evenly, no SVG blur, no mask-size):

```css
::view-transition-new(root) {
  animation: theme-switch-circle 500ms linear both;
}
@keyframes theme-switch-circle {
  from { clip-path: circle(0px at Xpx Ypx); }
  to   { clip-path: circle(Rpx at Xpx Ypx); }
}
```

`R` = hypot to the farthest viewport corner. Linear so it does not stall mid-way or crawl at the end.

## Knob drift (left ↔ right)

Do **not** name the knob. `zoom` on `.theme-switch__slider` makes that capture glitchy.

Instead, split theme apply:

1. Inside `startViewTransition`: `flushSync(() => { document.documentElement.classList.toggle('dark', nextDark) })` only - **do not** `setTheme` yet, so React still renders the knob on the old side in both snapshots (no flick inside the bitmaps).
2. `await transition.finished`, then `setTheme('dark' | 'light')`. The live checkbox updates and `.theme-switch__sun-moon` `transition: transform 0.4s` runs `translateX(0) ↔ translateX(26px)` in both directions.

Pass `nextDark` into the helper (ThemeToggle already knows `checked`). After `setTheme`, next-themes remains source of truth for storage.

Reduced motion / no VT: call `classList.toggle` + `setTheme` immediately (no split).

## Files

- [`src/lib/theme-view-transition.ts`](src/lib/theme-view-transition.ts) - clip-path reveal; new `apply` timing; drop names
- [`src/components/theme/ThemeToggle.tsx`](src/components/theme/ThemeToggle.tsx) - pass next theme into the helper; keep markup
- [`src/index.css`](src/index.css) - leave rotate-center deleted; keep `transform` transition

No new packages. No call-site changes.

## Verify

Reuse `:8000`. Header toggle: circle expands at constant speed; after it finishes, the ball slides. Both directions. Reduced motion: instant page + instant knob. `npx tsc -b`, oxlint, Prettier.
