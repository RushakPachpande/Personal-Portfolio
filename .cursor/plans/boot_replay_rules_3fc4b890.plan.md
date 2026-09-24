---
name: Boot replay rules
overview: "Replace the one-shot sessionStorage skip with a small helper: play the boot overlay on a cache-bypassing reload (hard refresh) or when the last document load was more than 30 minutes ago; keep skipping on a normal reload within that window and when reduced motion is on."
todos:
  - id: boot-gate
    content: "Add bootGate helper: 30min stale, hard-reload transferSize heuristic, rememberDocumentLoad"
    status: completed
  - id: wire-boot
    content: Wire AppShell initial booted + BootSequence skip to bootGate; drop sessionStorage boot-complete
    status: completed
isProject: false
---

# Boot on hard refresh or after 30 minutes

Today [`AppShell.tsx`](src/app/AppShell.tsx) starts with `booted` if `sessionStorage['boot-complete'] === '1'`, and [`BootSequence.tsx`](src/components/layout/BootSequence.tsx) never plays again in that tab. That is why a hard refresh still skips.

## When to play

Show boot when **any** of these is true (and reduced motion is **not** on):

- **First visit** - no stored last-load time
- **Stale visit** - last document load was **≥ 30 minutes** ago
- **Hard refresh** - navigation type is `reload` and the document was not served from cache

Skip on a **simple reload** (`reload` from cache) within 30 minutes, and on `back_forward`.

Keep **reduced-motion skip** (no overlay).

Hard refresh is not a dedicated browser API. Use `PerformanceNavigationTiming`: `type === 'reload'` and `transferSize > 0` (cache miss / bypass). Simple reload often has `transferSize === 0`. If a given browser always reports a positive transfer size, every reload would play boot; that is acceptable fallback vs never seeing it.

## Storage

Replace `sessionStorage` `boot-complete` with **`localStorage`** timestamp `portfolio-last-load` (ms). Write it on **every** document load (play or skip) so “30 minutes” means time since last load, not time since last boot.

Do not keep `boot-complete`; both AppShell and BootSequence must use one helper so they cannot disagree.

## Code

Add [`src/lib/bootGate.ts`](src/lib/bootGate.ts):

- `STALE_MS = 30 * 60 * 1000`
- `shouldShowBootSequence()` - reduced-motion check + navigation heuristic + stale/first visit
- `rememberDocumentLoad()` - set `portfolio-last-load` to `Date.now()`

[`AppShell.tsx`](src/app/AppShell.tsx): `useState(() => !shouldShowBootSequence())`. Call `rememberDocumentLoad()` once on mount (after deciding).

[`BootSequence.tsx`](src/components/layout/BootSequence.tsx): if `!shouldShowBootSequence()`, `onComplete()` immediately (same as today). On successful overlay finish, `onComplete()` as now; timestamp already set on load.

No change to boot duration (~800ms), copy, or reduced-motion behavior.

## Verify

- First open (empty localStorage): boot plays
- F5 / normal reload soon after: no boot
- Ctrl+Shift+R: boot plays
- Wait is impractical; set `portfolio-last-load` in DevTools to `Date.now() - 31*60*1000` and reload: boot plays
- `prefers-reduced-motion: reduce`: no boot
