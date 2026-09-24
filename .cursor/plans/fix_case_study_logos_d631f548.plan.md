---
name: Fix Case Study Logos
overview: Audit and reassign every case study card logo to a content-appropriate brand mark (product logo for named products; otherwise the primary technology SVG). Update seed content and re-seed Supabase so listing cards stop showing irrelevant or stale webp logos.
todos:
  - id: remap-content-logos
    content: Reassign logo/cover/alt per slug in infrastructure.ts and automation.ts to primary tech or product marks
    status: completed
  - id: reseed-cleanup
    content: Re-seed Supabase and delete stale .webp logo/cover objects for remapped slugs
    status: completed
  - id: verify-grids
    content: Confirm Docker and other listing cards show correct logos in app data
    status: completed
isProject: false
---

# Fix Case Study Card Logos

## Problem

[`CaseStudyCard`](src/features/case-studies/CaseStudyCard.tsx) shows `study.logo ?? study.coverImage`. Seed content incorrectly reuses marks:

- **Docker Production Environment** uses `n8nLogo` with `logoAlt: 'n8n logo'` in [`infrastructure.ts`](src/content/caseStudies/infrastructure.ts) (~line 349)
- Many infrastructure studies use **NGI** or **Navdrishti** logos despite being Azure / Linux / TrueNAS / Sophos topics
- Several automation studies use **n8n** even when the study is SharePoint / Outlook / Microsoft-led
- Browser still resolving `logos/docker-deployment.webp` means DB/storage must be re-seeded after content fix

## Rule (locked)

- **Named product studies** keep their product mark: Navdrishti, BrainPulses.
- **Everything else** uses the **primary technology / label logo** from [`src/assets/tech/`](src/assets/tech/) (svglogos-sourced SVGs already in the library).
- Set both `logo` / `logoAlt` and matching `coverImage` / `coverImageAlt` so cards and detail headers stay consistent.
- Gallery images that currently paste the wrong brand as a placeholder stay as-is unless they are the card hero (out of scope unless they are the only media).

## Per-slug logo map

| Slug | Card logo | Source |
|------|-----------|--------|
| `navdrishti` | Navdrishti | keep `navdrishti.png` |
| `brainpulses` | BrainPulses | keep `brainpulses.png` |
| `microsoft-365-migration` | Microsoft 365 | `microsoft365.svg` |
| `azure-infrastructure` | Azure | `azure.svg` |
| `self-hosted-supabase` | Supabase | `supabase.svg` |
| `docker-deployment` | Docker | `docker.svg` |
| `linux-administration` | Linux | `linux.svg` |
| `truenas-migration` | TrueNAS | `truenas.svg` |
| `sophos-vpn` | Sophos / shield | `shield.svg` |
| `self-hosted-n8n` | n8n | keep `n8n.svg` |
| `sharepoint-automations` | SharePoint | `sharepoint.svg` |
| `it-support-ticket-automation` | Outlook | `outlook.svg` (intake surface) |
| `microsoft-integrations` | Microsoft | `microsoft.svg` |
| `operational-improvements` | Azure | `azure.svg` (ops / cloud leverage) |

## Implementation

1. Update imports + `logo` / `coverImage` / alts in:
   - [`src/content/caseStudies/infrastructure.ts`](src/content/caseStudies/infrastructure.ts)
   - [`src/content/caseStudies/automation.ts`](src/content/caseStudies/automation.ts)
   - Platforms file only if needed (already correct for Navdrishti / BrainPulses)
2. Remove leftover n8n/NGI imports that become unused.
3. Re-run `npm run db:seed` so `case_studies.data.logo` / covers and storage keys become `logos/{slug}.svg` (or correct ext) with upsert.
4. Remove stale storage objects for those slugs that still end in `.webp` (same cleanup pattern used for n8n webp leftovers).
5. Spot-check infrastructure + automation grids: Docker card must show Docker SVG, not n8n; no NGI mark on pure tech studies.

No schema migration: logos live in `case_studies.data` JSON + `portfolio-media` objects.