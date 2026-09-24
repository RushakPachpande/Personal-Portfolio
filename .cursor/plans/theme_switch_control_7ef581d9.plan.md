---
name: Theme switch control
overview: Replace the theme dropdown with a compact light/dark sun–moon switch (ported from the reference, no styled-components). Call sites and surrounding layout stay as they are; the switch works in headers and mobile sheets because it is not a portal menu.
todos:
  - id: rewrite-toggle
    content: Replace ThemeToggle dropdown with accessible checkbox + reference markup; wire next-themes light/dark
    status: completed
  - id: port-css
    content: Port switch CSS into index.css at header scale; hover/reduced-motion; delete unused theme-menu utilities
    status: completed
  - id: verify-mobile
    content: Check public sheet + Studio header on mobile and desktop; confirm layout call sites unchanged
    status: completed
isProject: false
---

# Sun–moon theme switch

## Why mobile cannot toggle today

[`ThemeToggle.tsx`](src/components/theme/ThemeToggle.tsx) is a Radix **dropdown**. On public mobile the header instance is hidden (`className="hidden sm:inline-flex"` in [`Navbar.tsx`](src/components/layout/Navbar.tsx)); the only control is inside the nav **Sheet**, where a portaled menu often fails to open or to receive taps. Studio’s header always shows the same dropdown, so it fails there too.

A native checkbox switch has no portal, so it works in the header and in the sheet.

## Behavior

- **Remove** Light / Dark / System menu. Two states only: **unchecked = light**, **checked = dark**.
- Drive UI from `resolvedTheme` (so a stored `"system"` value still looks correct until the user toggles).
- `onChange` calls `setTheme(checked ? 'dark' : 'light')`. `enableSystem` in [`ThemeProvider.tsx`](src/components/theme/ThemeProvider.tsx) can stay; it is unused by the control.
- Keep `mounted` so the switch does not flash the wrong side before `next-themes` hydrates; disable until mounted.
- **Do not** change Navbar / AdminLayout / login markup or `className` on `<ThemeToggle />`.

## Implementation (no styled-components)

Do not add `styled-components`. Port the reference into React + a scoped CSS block in [`src/index.css`](src/index.css) (same pattern as `.theme-menu-item`).

Rewrite [`ThemeToggle.tsx`](src/components/theme/ThemeToggle.tsx):

- `<label className={cn('theme-switch', className)}>` wrapping a **visually hidden** checkbox (`sr-only`, not `display: none`) so it stays keyboard- and screen-reader-accessible.
- Markup from the reference: container, clouds, stars SVG, circle / sun / moon / spots.
- `aria-label` / `title`: e.g. “Switch to dark theme” / “Switch to light theme”.
- Honor `prefers-reduced-motion`: in CSS, collapse the bounce timings to ~0.01s (same as existing reduced-motion rules).

Scale to fit the current header (icon button was `size-11`). Set `--toggle-size` to about **10px** so the track is ~56×25px, not the reference’s ~169×75px.

CSS notes:

- Copy the reference rules under `.theme-switch` (em-based, so size follows `--toggle-size`).
- Wrap the `:hover` circle nudge in `@media (hover: hover)` so it does not stick on touch.
- Remove unused `.theme-menu-item` and `@keyframes theme-icon-in` once nothing references them.

## Verify

- Public: `sm+` header switch; mobile sheet switch (open hamburger) flips theme without a menu.
- Studio header on a ~375px viewport: same switch, no dropdown.
- Login page switch still works.
- Reduced motion: no long bounce. No layout jump (dropdown scroll-lock is gone).
