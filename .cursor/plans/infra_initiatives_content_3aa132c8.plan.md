---
name: Infra Initiatives Content
overview: Replace the two incomplete Infrastructure & Operations placeholder entries (TrueNAS and Sophos VPN) with verified production content from the prompt, mapped into the existing `Initiative` schema—no layout or UI redesign.
todos:
  - id: update-truenas
    content: Replace truenas-migration TODO fields with verified TrueNAS content; clear incomplete flags
    status: completed
  - id: update-sophos
    content: Replace sophos-vpn TODO fields with verified Sophos VPN content; clear incomplete flags
    status: completed
  - id: verify-pages
    content: Confirm grid + detail pages render both initiatives as complete case studies
    status: completed
isProject: false
---

# Infrastructure & Operations Content Update

## Scope

Content-only fill for the two TODO initiatives already wired in the app. **No page redesign, no layout/CSS changes, no new routes.**

Primary file: [`src/content/initiatives.ts`](src/content/initiatives.ts)

Existing placeholders to complete:

- `truenas-migration` (currently `incomplete: true`)
- `sophos-vpn` (currently `incomplete: true`)

Consumers already work once `incomplete` is cleared: [`InitiativeGrid`](src/features/infrastructure/InitiativeGrid.tsx), [`InitiativeDetailPage`](src/pages/InitiativeDetailPage.tsx), home teaser filter (`!item.incomplete`), terminal `infrastructure` command.

## Field mapping (prompt → schema)

Existing type (keep as-is):

```ts
{ slug, name, tagline, role, objective, technologies, outcome, incomplete?, todoNote? }
```

| Prompt field | Target field | Approach |
|---|---|---|
| Title | `name` | Use prompt titles verbatim |
| Short Description | `tagline` | One concise sentence (match sibling length/tone) |
| Objective | `objective` | Use prompt objective, lightly tightened if needed |
| My Role (bullets) | `role` | Convert bullets → short prose paragraph (case study, not resume list); detail page already labels this card “My Role” |
| Technologies | `technologies` | Use the listed stacks as string arrays |
| Outcome | `outcome` | Use prompt outcome as-is (factual, no invented metrics) |
| Category | — | **Omit** (not in schema; showing it would require UI changes) |

Also: remove `incomplete` and `todoNote` from both entries so badges show `Initiative` and home can include them if sliced.

Keep existing slugs (`truenas-migration`, `sophos-vpn`) so links stay stable.

## Concrete content draft

### 1. TrueNAS (`truenas-migration`)

- **name:** `TrueNAS Migration & Secure Remote NAS`
- **tagline:** Secure, centralized NAS via TrueNAS SCALE migration with VPN-based remote access.
- **role:** Planned and executed the migration from ThinkStation S30 to P500; configured pools, datasets, permissions, and shares; integrated VPN-based remote access; validated the cutover and documented operations.
- **objective:** Modernize organizational storage by migrating to TrueNAS SCALE—improving hardware reliability, centralizing file storage, and enabling secure remote access for authorized users.
- **technologies:** `TrueNAS SCALE`, `Linux`, `Storage Management`, `SMB`, `Networking`, `VPN`, `RBAC`
- **outcome:** Successfully migrated the NAS with minimal disruption while improving performance, scalability, maintainability, and secure remote accessibility.

### 2. Sophos VPN (`sophos-vpn`)

- **name:** `Sophos VPN & Secure Remote Access Architecture`
- **tagline:** Sophos Firewall VPN for protected remote access to internal servers and NAS.
- **role:** Designed the VPN architecture; configured Sophos firewall policies, NAT, and access rules; planned role-based access to internal resources; integrated VPN with servers and NAS; tested connectivity/routing/security and documented operations.
- **objective:** Provide secure remote connectivity for employees and administrators via VPN instead of exposing services directly to the internet.
- **technologies:** `Sophos Firewall`, `SSL VPN`, `IPSec VPN`, `Networking`, `Firewall Policies`, `NAT`, `Remote Access`, `Security`
- **outcome:** Implemented secure remote access so administrators can reach internal infrastructure while reducing external attack surface and improving operational flexibility.

## Explicit non-goals

- No changes to [`InitiativeDetailPage`](src/pages/InitiativeDetailPage.tsx), [`InitiativeGrid`](src/features/infrastructure/InitiativeGrid.tsx), or routing
- No reordering of the initiatives list (home still shows first 3 complete items: M365, Azure, Supabase)
- No sitemap / SEO / page copy updates unless needed for consistency after content lands
- Do not invent metrics beyond what the prompt states

## Verification

- Grid cards for both show `Initiative` (not `TODO`) with role + outcome
- Detail pages `/infrastructure/truenas-migration` and `/infrastructure/sophos-vpn` render Objective / My Role / Outcome / Technologies without “Details forthcoming”
- Tone matches completed siblings (factual, concise, ownership-focused)
- Typecheck/lint clean on the content file only