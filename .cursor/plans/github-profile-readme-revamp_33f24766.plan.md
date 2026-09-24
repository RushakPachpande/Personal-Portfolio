---
name: github-profile-readme-revamp
overview: Rewrite GITHUB_README.md as a portfolio-matched GitHub profile README, reusing the portfolio's gradient palette, display/mono typography, terminal motif and "Building Systems, Not Just Software." voice, with zero activity/star statistics.
todos:
  - id: rewrite
    content: Rewrite GITHUB_README.md with the portfolio-matched header, terminal whoami block, project sections, skill-icons stack, snake, and footer
    status: completed
  - id: verify
    content: Verify every external image URL returns 200 and render-check the markdown
    status: completed
isProject: false
---

# GitHub Profile README Revamp

Single file changed: [GITHUB_README.md](GITHUB_README.md). Full rewrite, reusing the factual content that still earns its place (Navdrishti, LCCIA, n8n/Azure work, certifications, AI-assisted approach) and dropping filler.

## Design language pulled from the portfolio

Taken from [src/index.css](src/index.css) and [src/features/hero/HeroSection.tsx](src/features/hero/HeroSection.tsx):

- Palette: electric blue `#2563EB` → soft cyan `#0891B2` → deep purple `#6D28D9`, on slate `#0F172A`
- Type: Space Grotesk (display), JetBrains Mono (terminal/kicker), Inter (body)
- Motifs: uppercase mono kicker with wide letter-spacing (`Platform Engineer · Cloud · Automation · Full Stack Systems`), the hero line `Building Systems, Not Just Software.`, and the command terminal from [src/components/terminal/CommandTerminal.tsx](src/components/terminal/CommandTerminal.tsx)

## Structure

1. Header — `capsule-render` banner (`type=waving`, `color=gradient` `0:2563eb,50:0891b2,100:6d28d9`, Space Grotesk-ish heavy weight, `animation=fadeIn`) carrying the name plus the "Building Systems, Not Just Software." subtitle.
2. Kicker — `readme-typing-svg` in JetBrains Mono, color `2563EB`, cycling the hero's focus areas.
3. Contact row — flat-square shields for Email, LinkedIn, Portfolio (placeholder Pages link, marked with an HTML comment `<!-- TODO: replace with live Pages URL -->`).
4. `~/whoami` — a fenced mono block styled like the portfolio terminal (`$ whoami` → role, focus, currently, stack) instead of a stats card. This is the visual replacement for the stat widgets.
5. Systems I Build — Navdrishti and LCCIA as compact blocks with a one-line problem statement, bulleted engineering detail, and live/staging link badges.
6. Stack — `skill-icons` (`skillicons.dev`) rows grouped by domain (Languages, Data, Cloud & Infra, Automation, Web, Tooling), which reads far cleaner than the current flat shields wall.
7. Engineering Practice — merges today's Experience and "How I Use AI" into two tight columns of ownership statements.
8. Certifications — existing three badges, restyled flat-square to match.
9. Contribution Snake — `Platane/snk` upgraded to a `<picture>` element with dark/light variants so it renders correctly in both GitHub themes.
10. Footer — `capsule-render` `type=waving&section=footer` reversed gradient with a short call to action.

Gradient `capsule-render` `type=rect&height=2` strips act as section dividers to echo the portfolio's separator rules.

## External services used

All zero-config image endpoints, no stats/activity data:

- `capsule-render.vercel.app` — header, footer, dividers (already in use)
- `readme-typing-svg.demolab.com` — animated kicker (migrating off the deprecated `herokuapp.com` host the current file uses)
- `skillicons.dev` — stack icons
- `img.shields.io` — contact and certification badges
- `Platane/snk` — contribution snake

Explicitly excluded: `github-readme-stats`, streak stats, trophies, profile-view counters, star/fork counts.

## Notes

- The snake image only populates once the `Platane/snk` action runs in the profile repo; I'll add a short HTML comment in the README recording the required workflow rather than creating a workflow file here, since this repo is not the profile repo.
- No commits will be made; the file is left dirty for you to review.