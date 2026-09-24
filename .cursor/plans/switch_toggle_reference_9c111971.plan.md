---
name: Switch toggle reference
overview: Replace the theme switch internals with the new sun/moon + light-rays + clouds + twinkling-stars reference, keeping the current placement, pill-corner clipping, and centering fixes intact.
todos:
  - id: markup
    content: Rewrite ThemeToggle.tsx with the new slider/sun-moon/rays/dots/clouds/stars structure, class-based (no IDs), spans for circles and SVG only for stars; keep controlled checkbox, sr-only, aria-label, disabled-until-mounted; delete ThemeSwitchStars
    status: completed
  - id: css-core
    content: Replace the .theme-switch CSS block with the new reference geometry at 60x34 scaled by calc(25/34) via zoom; preserve pill clip-path, border/outline resets, matching label background, flex-shrink rules; keep current color palette
    status: completed
  - id: anim
    content: Port rotate-center, cloud-move, and star-twinkle; gate clouds to unchecked and stars to checked so only one set loops per theme
    status: completed
  - id: focus
    content: Add an inset focus-visible ring on the slider so it is not removed by clip-path
    status: completed
  - id: cleanup
    content: "Delete the old container/circle-container/sun-moon-container/moon/spot/clouds/stars-container rules and update the prefers-reduced-motion block to the new selectors with animation: none"
    status: completed
  - id: verify
    content: Verify light/dark on public header and Studio login at desktop and 375px, clean corners, keyboard focus, reduced motion; run tsc, oxlint, prettier
    status: completed
isProject: false
---

# Swap theme switch to the new reference

Two files change: [`src/components/theme/ThemeToggle.tsx`](src/components/theme/ThemeToggle.tsx) and the `.theme-switch` block in [`src/index.css`](src/index.css) (lines ~515-745, plus the reduced-motion entries at ~824). No call site changes.

## Sizing decision

The reference is 60x34 (ratio 1.76); the current switch is 56x25 (ratio 2.25). Both cannot be preserved, so the plan keeps the **25px height** so no header row shifts, scaling the reference uniformly:

- `--theme-switch-scale: calc(25 / 34)` -> renders **44x25**

The switch gets narrower but not taller. Every call site is a flex row with `gap-2`, so nothing reflows. If you would rather keep the 56px width and let the height grow to 32px (still fine inside the `h-16` header), that is a single value change to `calc(56 / 60)`.

Scaling stays on the inner slider via `zoom`, the same mechanism already in place, so all reference px values can be copied verbatim instead of being converted to `em`.

## Markup rewrite

The reference uses `#input`, `#moon-dot-1`, `#star-1` and friends. Five switches mount at once (public header, public sheet, Studio header, Studio sheet, login), so **every ID selector must become a class or `:nth-of-type`** - duplicate IDs would make all five instances respond to the first checkbox.

Also simplifying: the reference renders 12 `<svg><circle r=50/></svg>` elements for dots, rays, and clouds. Those are plain circles, so they become `<span>` with `border-radius: 50%` - that drops 60 SVG nodes across the page. Only the 4-point star keeps a real SVG, since its concave path is the distinctive shape.

```tsx
<label className={cn('theme-switch', className)} title={nextLabel}>
  <input type="checkbox" className="theme-switch__checkbox sr-only" ... />
  <span className="theme-switch__slider" aria-hidden>
    <span className="theme-switch__sun-moon">
      {/* 3 rays, 3 moon dots, 3 dark clouds, 3 light clouds */}
    </span>
    <span className="theme-switch__stars">{/* 4 star SVGs */}</span>
  </span>
</label>
```

Kept from the current component: controlled `checked={mounted ? isDark : false}`, `disabled={!mounted}`, `aria-label`, `title`. The reference's `defaultChecked="darkTheme"` is not valid React and is dropped. The checkbox stays `sr-only` rather than the reference's `opacity: 0; width: 0` so it remains keyboard-reachable.

The old `ThemeSwitchStars` 144x55 SVG constant is deleted.

## CSS

Carried over unchanged from the corner and alignment work on `.theme-switch`:

- `border-radius: 999px` + `clip-path: inset(0 round 999px)` + mask, so the ends stay round
- `border: 0 solid transparent` and `outline-color: transparent`, which defeat the Tailwind base `* { @apply border-border outline-ring/50 }` at [`src/index.css`](src/index.css) line 281
- background color on the label matching the slider, so anti-aliased edges never flash white
- no outer white `box-shadow` (that was the source of the corner fringe)
- `flex-shrink: 0` on the label and `flex: 0 0 auto` on the slider, so the Navbar's `inline-flex` cannot squeeze the track

Ported from the reference: `.slider` background swap, `.sun-moon` `translateX(26px)` on check, the three `light-ray` circles at 10% white, moon dots fading in, cloud positions, and the stars group sliding from `translateY(-32px)` to `0`.

Colors stay on the current palette (`#3d7eae` sky, `#1d1f2c` night) rather than the reference's raw `#2196f3` / `black`, since those match the rest of the site.

## Animations and cost

- `rotate-center` on the sun-moon at 0.6s - one-shot, kept as-is
- `cloud-move` on 6 clouds - the reference runs this forever in both themes. Gated to `:not(:checked)` so dark mode runs zero cloud animation
- `star-twinkle` on 4 stars - gated to `:checked` only

That means one set animates per theme instead of both, so at most 6 looping transforms per instance. All are transform-only, so they composite without layout work; no `will-change` is added, which would only pin extra layers across five instances.

## Focus ring

There is currently no visible focus ring - the label sets `outline: none`. The reference's `box-shadow: 0 0 1px` would be clipped away by our `clip-path`. Fix with an **inset** ring on the slider under `.theme-switch:has(.theme-switch__checkbox:focus-visible)` so it survives clipping.

## Reduced motion

The block at [`src/index.css`](src/index.css) line 824 names classes that will no longer exist. Replace with the new selectors and add `animation: none` for clouds, stars, and the rotate.

## Verification

Reuse the dev server already on `:8000`; do not start a second one.

- Light and dark on the public header and the Studio login, desktop and 375px
- Corners clean against the dark header background
- Tab to the switch, Space toggles, focus ring visible
- With reduced motion on, nothing loops
- `npx tsc -b`, `npm run lint`, `npx prettier --write src/index.css src/components/theme/ThemeToggle.tsx`