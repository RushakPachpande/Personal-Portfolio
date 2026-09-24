---
name: Boot pace and skip
overview: Slow the boot overlay to about two seconds so each line is readable without feeling like a wait, and add a small Skip control (plus Escape) that ends the overlay immediately for this load.
todos:
  - id: boot-pace
    content: Retune BootSequence STEP/HOLD/EXIT (~2s) and progress bar duration
    status: completed
  - id: boot-skip
    content: Add Skip button + Escape to finish overlay immediately this load
    status: completed
isProject: false
---

# Readable boot pace and skip

Current timings in [`BootSequence.tsx`](src/components/layout/BootSequence.tsx) are `STEP_MS = 120`, `HOLD_MS = 150`, `EXIT_MS = 200` (~0.8s). That is too fast to read. The original ~3s overlay felt like a wait.

## Pace (~2 seconds)

Keep the five existing lines. Change constants only:

- `STEP_MS = 300` - each line stays long enough to parse
- `HOLD_MS = 400` - “System Ready.” can land
- `EXIT_MS = 250` - fade out without stretching the wait

Timeline: four step advances (1.2s) + hold (0.4s) + fade (0.25s) ≈ **1.85s**. Match the progress bar transition to `STEP_MS / 1000` (0.3s) so the bar does not finish before the copy.

Reduced-motion skip is unchanged (`shouldShowBootSequence` / `useReducedMotion`).

## Skip

On the overlay (not in the glass card), a **minimal** control: top-right, `Button` `variant="ghost"` `size="sm"`, label **Skip**, `font-mono` to match the boot UI. `aria-label="Skip boot sequence"`.

**Escape** does the same (power users). Shared `finish()`:

- clear the interval
- `setVisible(false)`
- `onComplete()` after `EXIT_MS` so the fade can run; if reduced motion, `onComplete()` immediately

Skip only ends **this** play. It does not change [`bootGate`](src/lib/bootGate.ts) (hard refresh / 30 minutes still apply next time).

No other files unless Skip needs the existing [`Button`](src/components/ui/button.tsx) import in BootSequence.
