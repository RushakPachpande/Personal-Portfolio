---
name: Studio Preview Workbench
overview: "Replace the unstructured preview overlay with a reusable Studio Preview workbench: a device-lab chrome, a real viewport (scroll inside the frame), and a three-zone toolbar-without changing how admin pages pass draft data."
todos:
  - id: preview-module
    content: Extract src/features/admin/preview/ (StudioPreview, PreviewRoot, workbench, toolbar, viewport, routes) and re-export AdminPreviewOverlay
    status: completed
  - id: preview-chrome
    content: Add ToggleGroup; three-zone toolbar; device/browser bezels; in-frame scroll + fit-to-width scale
    status: completed
  - id: preview-labels
    content: Pass section labels from admin SaveBar preview call sites
    status: completed
  - id: preview-verify
    content: Typecheck and browser-verify device modes, scroll, close, and Profile path select on :8000
    status: completed
isProject: false
---

# Studio Preview workbench

The isolated React root stays (required so preview does not nest routers). What changes is the **product**: a dedicated, reusable preview module that looks like a device lab, not a pile of buttons over a scaled page.

## What feels unstructured today

[`AdminPreviewOverlay.tsx`](src/features/admin/AdminPreviewOverlay.tsx) puts status copy, page chips, device chips, and close in one wrapping row. The frame then **scales the entire document height**, so Desktop is a long mini-page rather than a browser window. That is why Mobile / Tablet / Desktop feel like labels, not modes.

## Design direction

Engineering **device lab**, matching Studio: glass bar, JetBrains Mono path, electric-blue active state, dark grid well behind the frame.

```
+------------------------------------------------------------------+
| DRAFT  Profile preview        [ 390 ] [ 768 ] [ 1280 ]    path X |
| not live until save            Mobile  Tablet  Desktop           |
+------------------------------------------------------------------+
|  grid well                                                       |
|                                                                  |
|           +--------------------------------------+               |
|           |  o o o   rushak.dev/platforms/slug   |  desktop      |
|           |--------------------------------------|  chrome       |
|           |                                      |               |
|           |     public site (scrolls inside)     |               |
|           |                                      |               |
|           +--------------------------------------+               |
|           1280 x viewport · fit 72%                              |
+------------------------------------------------------------------+
```

Mobile/tablet get a rounded bezel (subtle notch on phone). Desktop gets a fake browser chrome with the public path. Dimensions + scale sit under the frame, not in the button row.

## Reusable module

Replace the single file with `src/features/admin/preview/`:

- [`StudioPreview.tsx`](src/features/admin/preview/StudioPreview.tsx) - public API (`open`, `onClose`, `draft`, `initialPath`, `extraPaths`, optional `label`). Same props as today so Profile / case study / content pages stay thin.
- [`PreviewRoot.tsx`](src/features/admin/preview/PreviewRoot.tsx) - `createRoot` on `document.body` + Query/Helmet/Theme providers + `MemoryRouter` (current isolation, just extracted).
- [`PreviewWorkbench.tsx`](src/features/admin/preview/PreviewWorkbench.tsx) - full-screen shell: toolbar + well + frame.
- [`PreviewToolbar.tsx`](src/features/admin/preview/PreviewToolbar.tsx) - three zones, never a mixed wrap:
  - **Start:** `Badge` “Draft” + `label` (e.g. Profile) + one-line “Not live until you save.”
  - **Center:** viewport `ToggleGroup` (add shadcn ToggleGroup) with Smartphone / Tablet / Monitor icons and the pixel width under each. This is the primary control.
  - **End:** page `Select` (only if `extraPaths` exist) + Close. Current path as mono text, not another button pile.
- [`PreviewViewport.tsx`](src/features/admin/preview/PreviewViewport.tsx) - device/browser chrome + **fixed viewport height** (fills the well). The public tree scrolls **inside** the frame. Auto `transform: scale` only to fit width (`fit`); GPU-only. Show “Fit · 72%” under the bezel.
- [`previewRoutes.tsx`](src/features/admin/preview/previewRoutes.tsx) - `useRoutes(PreviewPublicChrome + publicChildRoutes)` moved out of the overlay file.

Keep [`AdminPreviewOverlay.tsx`](src/features/admin/AdminPreviewOverlay.tsx) as a one-line re-export of `StudioPreview` so existing imports in [`AdminDashboardPage.tsx`](src/pages/admin/AdminDashboardPage.tsx), [`AdminCaseStudiesPage.tsx`](src/pages/admin/AdminCaseStudiesPage.tsx), and [`AdminContentPages.tsx`](src/pages/admin/AdminContentPages.tsx) keep working. Pass `label` at those call sites (“Profile”, “Case study”, “Technologies”, …).

## Behavior to keep

- Draft merge via [`mergePortfolioDraft`](src/lib/mergePortfolioDraft.ts) and nested `PortfolioContext`.
- `PreviewModeContext`: skip SEO, disable contact submit.
- Links stay inside the preview router; Studio URL does not change.
- Escape and Close unmount the isolated root.
- No iframe, no new animation libraries, no schema/env changes.

## Out of scope (on purpose)

- Side-by-side live vs draft (extra product; this pass is structure and look).
- Preview-only theme that does not touch `html` (public Navbar already has the theme menu inside the frame).
- Device rotation.

## Verification

- `npx tsc -b`; oxlint on the new folder.
- Browser on existing `:8000`: open Preview from Profile and a case study; switch Mobile / Tablet / Desktop; confirm internal scroll, bezel/chrome, page Select on Profile (`/`, About, Contact); Escape closes; Studio route unchanged.
