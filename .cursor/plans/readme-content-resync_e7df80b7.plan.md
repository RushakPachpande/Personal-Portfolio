---
name: readme-content-resync
overview: Update GITHUB_README.md so its projects, status, stack, and certifications match the current portfolio case studies and resume-keeping the existing capsule/typing/snake visual language and still excluding activity/stats widgets.
todos:
  - id: rewrite-content
    content: Rewrite GITHUB_README.md systems, whoami, stack, practice, certs, and portfolio URL from current portfolio sources
    status: completed
  - id: verify-links
    content: Verify DISHA/LevelUP/rushak.dev link badges and external image endpoints still resolve
    status: completed
isProject: false
---

# Sync GitHub Profile README to Portfolio Content

Single file: [GITHUB_README.md](GITHUB_README.md). Keep the existing visual shell (gradient capsule header/footer, JetBrains typing SVG, terminal `~/whoami`, skillicons, contribution snake). Rewrite content to match the portfolio sources below. No stats/streak/trophy widgets.

## Source of truth

- Profile / voice: [src/content/profile.ts](src/content/profile.ts)
- Featured platforms: [src/content/caseStudies/platforms.ts](src/content/caseStudies/platforms.ts) (`featured: true`)
- Ownership highlights: [src/content/resume.ts](src/content/resume.ts) (`resumeHighlights`, `keyProjects`, `resumeCertifications`)
- Portfolio URL: `https://rushak.dev` (from [public/sitemap.xml](public/sitemap.xml))

## Content decisions (locked)

- **Systems I Build** = all five featured platforms (punchy blocks, not full case-study essays). Drop LCCIA entirely - it is no longer in portfolio content.
- **Portfolio badge** → `https://rushak.dev` (replace the Pages placeholder + TODO comment).
- **No public links** for Navdrishti / BrainPulses / Portfolio Studio in case-study data - omit fake production/staging badges for those; only show real links from `links[]` (DISHA, LevelUP) plus the portfolio site for Personal Portfolio Studio.
- Still exclude github-readme-stats / streak / trophies / star counts.

## Section-by-section changes

1. **Contact row** - Portfolio badge href → `https://rushak.dev`. Keep Email + LinkedIn (inline LinkedIn glyph).

2. **`~/whoami`** - Refresh from current profile/resume:
   - Role line stays Platform & Technology Professional @ NextGenInnov8, Pune
   - Description from `profile.description`
   - `currently:` → shipping DISHA + LevelUP in production; Navdrishti in final validation/rollout
   - Philosophy line from `profile.about.howIThink` (shortened to two lines)

3. **Systems I Build** - Replace Navdrishti+LCCIA with five compact blocks, copy derived from each case study `summary` + 3-4 ownership bullets:

| Project | Status line | Links |
|---|---|---|
| Navdrishti | Final development, validation, and rollout | none (no live URLs in data) |
| BrainPulses | Production - live events + 2.0 architecture path | none |
| DISHA | Production induction platform | student + admin portals from case study |
| LevelUP | Production school assessment platform | student + admin from case study |
| Personal Portfolio Studio | Production CMS portfolio | `https://rushak.dev` |

4. **Stack** - Align to [src/content/technologies.ts](src/content/technologies.ts) / resume expertise:
   - Languages: keep Java, TS, JS, Python, Bash, HTML, CSS
   - Data & Backend: add MongoDB; keep Postgres, Supabase, MySQL, Node, Express
   - Cloud & Infra: keep Azure, Linux, Docker, Nginx, Cloudflare
   - Automation & Delivery: keep GitHub Actions/Git/GitHub/PowerShell + n8n badge
   - Web & Tooling: keep React, Vite, Tailwind, Figma, VS Code

5. **Engineering Practice** - Keep two-column table; refresh **What I Own** from `resumeHighlights` / experience bullets (Azure ~50%, M365 50+ users, self-hosted Supabase & n8n, CI/CD, BrainPulses production care). **How I Work** stays philosophy/AI-as-accelerator framing from `profile.about`.

6. **Certifications** - Expand beyond the old three badges to match `resumeCertifications` groups without dumping every Microsoft Learn module:
   - Software Development: Full Stack Developer (Java Plus); Advanced Java & Web Programming
   - Industry Simulations: HPE + Wells Fargo (keep existing badge style)
   - Anthropic: Claude Code
   - Microsoft Learn: one summary badge (`Azure · Git · GitHub Copilot`) rather than listing 20 modules

7. **Currently** - Rewrite to match active work: production ownership of DISHA/LevelUP/BrainPulses, Navdrishti rollout, deepening cloud/automation ownership. Keep email CTA + waving footer.

8. **Snake / visual chrome** - Leave as-is (dark/light `<picture>`, Platane/snk comment, gradient dividers).

## Out of scope

- Creating a `Platane/snk` workflow (still lives in the profile repo)
- Committing (file remains gitignored as `GITHUB_README.md`)
- Editing the plan file itself
