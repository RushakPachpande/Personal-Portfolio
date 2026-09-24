---
name: Theme blur circle
overview: Port the library’s blur-circle View Transition (no npm package) so toggling the existing switch expands a soft circle from the control, while next-themes remains the source of truth.
todos:
  - id: port-helper
    content: "Add src/lib/theme-view-transition.ts: MIT header, blur-circle mask, startViewTransition + flushSync, reduced-motion/no-VT fallback, style cleanup"
    status: completed
  - id: wire-toggle
    content: "ThemeToggle: label ref, run animateThemeTransition around setTheme; ThemeProvider: disableTransitionOnChange true"
    status: completed
  - id: verify-vt
    content: Verify circle-from-switch on header and login; reduced-motion skip; tsc, oxlint, prettier
    status: completed
isProject: false
---

# Theme change blur-circle animation

No new dependency. Port only the **blur-circle** View Transition from [MinhOmega/react-theme-switch-animation](https://github.com/MinhOmega/react-theme-switch-animation) (MIT). Do not vendor QR scan, polygon, GIF, or the library’s own `localStorage` / `html.dark` bookkeeping — [`next-themes`](src/components/theme/ThemeProvider.tsx) already owns `storageKey="portfolio-theme"` and `attribute="class"`.

## Behavior

On toggle, a blurred circle grows from the switch until it covers the viewport, revealing the new theme. Skip the animation and flip instantly when:

- `document.startViewTransition` is missing
- `prefers-reduced-motion: reduce`
- the origin element is gone

Rapid re-clicks: ignore while a transition is in flight (one module-level `inFlight` flag).

Keep duration **subtle**: 600ms, `ease-in-out`, `blurAmount: 2`.

## Files

**Add** [`src/lib/theme-view-transition.ts`](src/lib/theme-view-transition.ts) — small helper, not the 18k full hook.

- File header: MIT attribution (`Copyright (c) 2024 Võ Ngọc Quang Minh`, source repo URL). Required by the license when copying a substantial portion.
- `injectBaseStyles()` once: disable the default VT crossfade on `::view-transition-old/new(root)` (`animation: none; mix-blend-mode: normal`).
- `createBlurCircleMask(blur)` — copy the library’s SVG data-URI (circle + `feGaussianBlur`). The GitHub raw fetch strips the URI; copy it from the real `src/index.ts` on GitHub when implementing.
- `export async function animateThemeTransition(origin: HTMLElement, apply: () => void): Promise<void>`
  - Measure origin center `(x, y)`
  - `maxRadius = hypot` to the four viewport corners
  - Inject a short-lived `<style id="theme-switch-vt">` with the library’s `::view-transition-new(root)` mask + `@keyframes maskScale` (same math as `BLUR_CIRCLE` in the hook)
  - `await document.startViewTransition(() => { flushSync(apply) }).ready`
  - Do **not** toggle `html.dark` yourself — `apply` is `setTheme`
  - Remove the injected style after `duration`
  - On skip/abort, still call `apply()`

Local `Document.startViewTransition` typing (tsconfig `lib` is `DOM` only, no View Transition types).

**Change** [`src/components/theme/ThemeToggle.tsx`](src/components/theme/ThemeToggle.tsx)

- `ref` on the `<label>` (origin for the circle)
- `onChange` becomes: `void animateThemeTransition(label, () => setTheme(checked ? 'dark' : 'light'))`
- Markup, `sr-only` checkbox, and switch visuals stay as they are

**Change** [`src/components/theme/ThemeProvider.tsx`](src/components/theme/ThemeProvider.tsx)

- `disableTransitionOnChange={true}` so `html`’s 200ms color transition in [`src/index.css`](src/index.css) does not smear the View Transition snapshot

No call-site changes (Navbar, AdminLayout, login). All five switches share the helper; each uses its own label as origin.

## Out of scope

- Installing `react-theme-switch-animation`
- Circle-without-blur, QR, polygon, GIF
- Animating the nested Studio preview `ThemeProvider` separately (document-level VT already covers the visible page)

## Verify

Reuse `:8000`. Light↔dark from the public header and Studio login. Confirm the circle starts at the switch. With reduced motion (DevTools), instant flip. Unsupported VT → instant flip. `npx tsc -b`, `npm run lint`, Prettier on the touched files.