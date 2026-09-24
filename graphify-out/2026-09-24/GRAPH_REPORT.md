# Graph Report - Personal Portfolio  (2026-09-24)

## Corpus Check
- 190 files · ~322,658 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 44 file(s) not represented in the graph (top: .mdc 34, (none) 4, .ttf 2)

## Summary
- 1267 nodes · 2871 edges · 86 communities (76 shown, 10 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 159 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b9053e90`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- portfolio-admin.ts
- technologies.ts
- terminal.ts
- seed-portfolio.ts
- react-router-dom
- utils.ts
- publicRoutes.tsx
- package.json
- types/portfolio.ts
- react
- Supabase Backend for Portfolio Monorepo
- LogoFrame.tsx
- compilerOptions
- components.json
- dependencies
- AppShell.tsx
- lib/portfolio.ts
- AdminSitePages.tsx
- OverlayCard.tsx
- scripts
- supabase.ts
- compilerOptions
- devDependencies
- Theme Toggle + Production Optimization Plan
- ContactPanel.tsx
- AdminCaseStudiesPage.tsx
- fields/index.ts
- Cut-corner overlay cards
- AdminTimelinePage
- AdminCaseStudyEditPage
- V3 implementation plan
- shouldShowBootSequence
- throwIfError
- 20260827194842_portfolio_schema.sql
- motion.ts
- Rushak Pachpande Portfolio
- Reveal
- cn
- resume.ts
- .oxlintrc.json
- Phased Full CMS + Platform Projects
- tsconfig.json
- vite-env.d.ts
- 20260828200004_resume_files.sql
- Rushak Pachpande Portfolio
- ref_node_module
- AppShell
- public.case_studies
- public.site_settings
- Automation Content Update
- Multi-Resume via Supabase Storage
- Performance and public-site motion
- Vite to Next.js (static export, exact clone)
- load-app-env.ts
- strip-domain-and-agent-trace_f6c94bac.plan.md
- Infrastructure & Operations Content Update
- Overlay Card System Redesign
- input.tsx
- Repo dead-code cleanup
- vite.config.ts
- Swap theme switch to the new reference
- Which font?
- github-pages-deploy-cleanup_35327ced.plan.md
- Portfolio V2 — Engineering Case Study Updates
- Boot on hard refresh or after 30 minutes
- dedupe-portfolio-media.ts
- Fix Case Study Card Logos
- GitHub Profile README Revamp
- Sync GitHub Profile README to Portfolio Content
- Smooth circle + knob slide (revised)
- Sun–moon theme switch
- SaveBar
- usePortfolio
- AdminContentPages.tsx
- philosophy.ts
- 3. Draft public preview (exact look, isolated router)
- Footer.tsx
- Fixed Cards, Logo Dedupe, Motion
- AdminTechnologiesPage
- Chronological experience timeline
- useScrollRestoration.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 106 edges
2. `react` - 64 edges
3. `usePortfolio()` - 60 edges
4. `Button()` - 30 edges
5. `react-router-dom` - 29 edges
6. `throwIfError()` - 28 edges
7. `lucide-react` - 22 edges
8. `OverlayCard()` - 22 edges
9. `Reveal()` - 21 edges
10. `publicMediaUrl()` - 21 edges

## Surprising Connections (you probably didn't know these)
- `Call-site mapping (same files, small prop adds)` --references--> `OverlayCard()`  [INFERRED]
  .cursor/plans/cut-corner_overlay_cards_b1e61c53.plan.md → src/components/cards/OverlayCard.tsx
- `1. `OverlayCard` (new)` --references--> `OverlayCard()`  [INFERRED]
  .cursor/plans/overlay_card_redesign_11d10c87.plan.md → src/components/cards/OverlayCard.tsx
- `2. `SurfaceCard` (new)` --references--> `SurfaceCard()`  [INFERRED]
  .cursor/plans/overlay_card_redesign_11d10c87.plan.md → src/components/cards/SurfaceCard.tsx
- `Phase 3 — Brand & SEO CMS` --references--> `Seo()`  [INFERRED]
  .cursor/plans/phased_full_cms_1f848a8e.plan.md → src/components/layout/Seo.tsx
- `Modals / overlays` --references--> `LogoFrame()`  [INFERRED]
  .cursor/plans/portfolio_ux_polish_83636f45.plan.md → src/components/media/LogoFrame.tsx

## Import Cycles
- None detected.

## Communities (86 total, 10 thin omitted)

### Community 0 - "portfolio-admin.ts"
Cohesion: 0.17
Nodes (22): fileFromDrop(), formatBytes(), ResumeFileRow(), ResumeFilesPanel(), onUpload(), refresh(), run(), resumeFilesQueryKey (+14 more)

### Community 1 - "technologies.ts"
Cohesion: 0.05
Nodes (55): src_assets_logos_brainpulses, src_assets_logos_disha, src_assets_logos_levelup, src_assets_logos_navdrishti, src_assets_logos_ngi_logo, src_assets_logos_personal_portfolio, src_assets_tech_azure, src_assets_tech_docker (+47 more)

### Community 2 - "terminal.ts"
Cohesion: 0.06
Nodes (46): CommandTerminal, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_medium, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_regular, DesktopNavDropdown(), defaultNavStructure, isNavGroupActive(), isNavLinkActive(), isRouteActive() (+38 more)

### Community 3 - "seed-portfolio.ts"
Cohesion: 0.22
Nodes (15): appEnv, isLocalAsset(), main(), maybeCreateAdmin(), mimeFor(), resolveMedia(), seedCaseStudies(), seedResume() (+7 more)

### Community 4 - "react-router-dom"
Cohesion: 0.06
Nodes (45): Behavior to keep, Design direction, Out of scope (on purpose), Reusable module, Studio Preview workbench, Verification, What feels unstructured today, class-variance-authority (+37 more)

### Community 5 - "utils.ts"
Cohesion: 0.16
Nodes (15): framer-motion, AnimatedGrid(), GradientBlobs(), ScrollFadeIn(), ScrollFadeProps, AnimatedCounter(), AnimatedCounterProps, RevealProps (+7 more)

### Community 6 - "publicRoutes.tsx"
Cohesion: 0.05
Nodes (40): High — navigation waits instead of overlapping, Content model rewrite, Hardening, Information architecture, Out of scope, Phase 1 Portfolio Updates, Scope of change, Truthfulness rules (enforced in content) (+32 more)

### Community 7 - "package.json"
Cohesion: 0.09
Nodes (21): name, private, type, version, autoskills, clsx, @fontsource/jetbrains-mono, @fontsource-variable/inter (+13 more)

### Community 8 - "types/portfolio.ts"
Cohesion: 0.11
Nodes (28): 5b. Split portfolio service, mergeSiteConfig(), fetchPublicPortfolio(), mapResume(), profileSchema, resolveCaseStudy(), submitContact(), CaseStudy (+20 more)

### Community 9 - "react"
Cohesion: 0.05
Nodes (51): Behavior, Files, Out of scope, Theme change blur-circle animation, Verify, Install `next-themes`, New files, Part 2 — Theme Provider and Toggle (+43 more)

### Community 10 - "Supabase Backend for Portfolio Monorepo"
Cohesion: 0.09
Nodes (22): 10. Risks and mitigations, 1. Supabase project scaffolding, 2. Database schema (Postgres), 3. Storage buckets, 4. Seed all current static data, 5. Frontend data layer, 6. Admin panel (obscured CMS), 7. Dev workflow (+14 more)

### Community 11 - "LogoFrame.tsx"
Cohesion: 0.09
Nodes (21): 1. Unified Image / Logo Display, 2. Typography: Nerd Font + Readable Sizes, 3. Command Terminal Banner Fix, 4. Mobile Responsiveness Audit, Add JetBrains Mono Nerd Font, Create shared component, Files Changed (expected), Fixes (+13 more)

### Community 12 - "compilerOptions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, baseUrl, erasableSyntaxOnly, ignoreDeprecations, jsx, lib (+14 more)

### Community 13 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 14 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, class-variance-authority, clsx, @fontsource/jetbrains-mono, @fontsource-variable/inter, @fontsource-variable/space-grotesk, framer-motion, lucide-react (+11 more)

### Community 15 - "AppShell.tsx"
Cohesion: 0.22
Nodes (6): Parity strategy (the important decision), BootSequence, CursorGlow, PageRouteSkeleton(), KONAMI, useKonami()

### Community 16 - "lib/portfolio.ts"
Cohesion: 0.14
Nodes (24): Implementation order, Shared UI, SiteConfigPathResolver, CaseStudyCard(), CaseStudyPage(), CaseStudyPageProps, TOC, CaseStudyLink() (+16 more)

### Community 17 - "AdminSitePages.tsx"
Cohesion: 0.16
Nodes (17): adminBase, AdminSiteBrandPage, AdminSiteCategoriesPage, AdminSiteContentPage, AdminSiteFlagsPage, AdminSiteNavigationPage, AdminSiteSeoPage, AdminSiteBrandPage() (+9 more)

### Community 18 - "OverlayCard.tsx"
Cohesion: 0.18
Nodes (12): OverlayCardBanner(), OverlayCardProps, OverlayCardShell(), OverlayCardSize, OverlayCardStat, SurfaceCardProps, CaseStudyCardProps, categoryGradients (+4 more)

### Community 19 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, build:analyze, db:dedupe-media, db:dedupe-media:prod, db:push, db:reset, db:seed (+9 more)

### Community 20 - "supabase.ts"
Cohesion: 0.34
Nodes (10): AdminLoginPage, AdminGuard(), isAdminSession(), getAdminBasePath(), getSupabaseAnonKey(), getSupabaseUrl(), required(), supabase (+2 more)

### Community 21 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 22 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, autoskills, dotenv, oxlint, prettier, rollup-plugin-visualizer, tailwindcss, @tailwindcss/vite (+8 more)

### Community 23 - "Theme Toggle + Production Optimization Plan"
Cohesion: 0.14
Nodes (13): 5a. Vite build splitting — [`vite.config.ts`](vite.config.ts), 5c. Lazy-load non-critical AppShell weight — [`src/app/AppShell.tsx`](src/app/AppShell.tsx), 5d. Font optimization — [`src/index.css`](src/index.css), 5e. Admin page modularity (lower priority, same PR if time permits), 5f. Fix ESM postbuild — [`package.json`](package.json), Current State, Implementation Order, Part 1 — Theme Token Architecture (+5 more)

### Community 24 - "ContactPanel.tsx"
Cohesion: 0.12
Nodes (19): Locked decisions, Lessons from the theme switch (apply here), Component migrations, Priority 1 — Case study cards (biggest visual win), Priority 3 — SurfaceCard for content-heavy panels, Interaction (CSS, existing Tailwind / tw-animate), Checks, Design (+11 more)

### Community 25 - "AdminCaseStudiesPage.tsx"
Cohesion: 0.16
Nodes (14): AdminCaseStudiesPage, AdminCaseStudyEditPage, AdminDashboardPage, AdminProfilePage, Textarea(), src_features_admin_adminpreviewoverlay_adminpreviewoverlay, AdminSection(), AdminSectionProps (+6 more)

### Community 26 - "fields/index.ts"
Cohesion: 0.23
Nodes (18): 1. Reusable media picker, @tanstack/react-query, AdminMediaPage, AdminSubmissionsPage, ImageField(), isImageFileName(), isStorageFolder(), joinMediaPath() (+10 more)

### Community 27 - "Cut-corner overlay cards"
Cohesion: 0.22
Nodes (8): Call-site mapping (same files, small prop adds), CSS placement, Cut-corner overlay cards, Out of scope, OverlayCard layout, SurfaceCard (chrome only), Verification (this is how the toggle slipped), What we are borrowing

### Community 28 - "AdminTimelinePage"
Cohesion: 0.25
Nodes (11): AdminResumePage(), save(), AdminTerminalPage(), save(), AdminTimelinePage(), save(), uploadTimelineLogo(), deleteTimelineItem() (+3 more)

### Community 29 - "AdminCaseStudyEditPage"
Cohesion: 0.36
Nodes (9): AdminCaseStudyEditPage(), patch(), remove(), save(), upload(), emptyStudy(), deleteCaseStudy(), refreshTechnologyUsage() (+1 more)

### Community 30 - "V3 implementation plan"
Cohesion: 0.12
Nodes (16): 1) Technology branding system, 2) Premium tech badges + technology banner, 3) Interactive architecture visuals, 4) Rich statistics + timeline polish, 5) Rich cards and visual hierarchy upgrades, 6) Gallery + lightbox infrastructure, 7) Cross references + technology library page, 8) Footer upgrade (+8 more)

### Community 31 - "shouldShowBootSequence"
Cohesion: 0.24
Nodes (11): Pace (~2 seconds), Readable boot pace and skip, Skip, Code, isBackForward(), isHardReload(), lastLoadAt(), navigationEntry() (+3 more)

### Community 32 - "throwIfError"
Cohesion: 0.22
Nodes (13): AdminPhilosophyPage(), save(), AdminProfilePage(), save(), AdminSubmissionsPage(), deleteContactSubmission(), deleteMediaFile(), deletePhilosophyPillar() (+5 more)

### Community 33 - "20260827194842_portfolio_schema.sql"
Cohesion: 0.18
Nodes (9): public.case_studies, public.contact_submissions, public.philosophy_pillars, public.resume_sections, public.site_profile, public.site_settings, public.technologies, public.terminal_commands (+1 more)

### Community 34 - "motion.ts"
Cohesion: 0.18
Nodes (9): 4. Theme dropdown + CSS-first micro-motion, Admin media, guidance, preview, and motion, Verification, PageTransition(), easeOut, fadeIn, pageTransition, scaleIn (+1 more)

### Community 35 - "Rushak Pachpande Portfolio"
Cohesion: 0.12
Nodes (15): Folder structure, Implementation phases, Information architecture, Key UX features, Out of scope for v1 (architecture only), Phase 1 — Foundation, Phase 2 — Content + core pages, Phase 3 — Motion + terminal + eggs (+7 more)

### Community 36 - "Reveal"
Cohesion: 0.17
Nodes (13): What is actually happening, Why motion “isn’t there”, Component-specific checks, Minimum readable size pass, MediaCarousel(), Reveal(), Badge(), badgeVariants (+5 more)

### Community 37 - "cn"
Cohesion: 0.18
Nodes (11): Medium — continuous work on the main thread, CursorGlow(), Switch(), ArchitectureFlow(), ArchitectureFlowProps, CaseStudyGrid(), CaseStudyGridProps, RelatedCaseStudies() (+3 more)

### Community 38 - "resume.ts"
Cohesion: 0.15
Nodes (12): coreCompetencies, keyProjects, professionalExperience, ResumeCertificationGroup, resumeCertifications, resumeEducation, ResumeExperience, ResumeExpertiseGroup (+4 more)

### Community 39 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 40 - "Phased Full CMS + Platform Projects"
Cohesion: 0.17
Nodes (11): Architecture decision (all phases), Current baseline, Phase 0 — Platform projects in DB (ship first, independent), Phase 1 — Site Content CMS (chrome without structural change), Phase 2 — Structure CMS (nav + categories + areas CRUD), Phase 3 — Brand & SEO CMS, Phase 4 — Terminal & polish (optional depth), Phased Full CMS + Platform Projects (+3 more)

### Community 41 - "tsconfig.json"
Cohesion: 0.33
Nodes (5): compilerOptions, baseUrl, paths, files, references

### Community 42 - "vite-env.d.ts"
Cohesion: 0.50
Nodes (3): ImportMeta, ImportMetaEnv, *.ttf

### Community 44 - "Rushak Pachpande Portfolio"
Cohesion: 0.17
Nodes (11): Content, Deployment (GitHub Pages), Local development, One-time setup, Routes, Running a deploy, Rushak Pachpande Portfolio, Scripts (+3 more)

### Community 47 - "AppShell"
Cohesion: 0.36
Nodes (7): High — first paint is gated, AppShell(), AdminDataLayout(), AdminLayout(), signOut(), PortfolioContext, usePublicPortfolioQuery()

### Community 53 - "Automation Content Update"
Cohesion: 0.18
Nodes (10): 1. Replace `sharepoint-automations`, 2. Add IT Support Ticket Automation, 3. Remove `future-workflow-platform`, Automation Content Update, Concrete content draft, Current state → target, Explicit non-goals, Field mapping (prompt → `AutomationItem`) (+2 more)

### Community 54 - "Multi-Resume via Supabase Storage"
Cohesion: 0.17
Nodes (11): 1. New migration, 2. Public fetch, 3. Empty-state handling, 4. Admin service functions, 5. Admin UI, 6. Remove the local copy, Current state, Data flow after the change (+3 more)

### Community 55 - "Performance and public-site motion"
Cohesion: 0.18
Nodes (10): 1. Stop blocking the public shell on the full dataset, 2. Shorten boot so it cannot sit in front of content, 4. Cheap GPU / input wins, Entry and scroll, Files (primary), Part 1 — Make it feel fast, Part 2 — Public motion that you can feel, Performance and public-site motion (+2 more)

### Community 56 - "Vite to Next.js (static export, exact clone)"
Cohesion: 0.25
Nodes (7): Constraints driving the design, Env, base path, SEO, Removing react-router without touching component internals, Routing map (file-based, 1:1 with today), Tooling, Verification before swap, Vite to Next.js (static export, exact clone)

### Community 57 - "load-app-env.ts"
Cohesion: 0.22
Nodes (7): dotenv, ref_node_fs, ref_node_path, ref_node_url, resolve(), loadAppEnv(), requestedEnv()

### Community 58 - "strip-domain-and-agent-trace_f6c94bac.plan.md"
Cohesion: 0.20
Nodes (9): Context, [.github/workflows/deploy.yml](.github/workflows/deploy.yml), Order of operations, Phase 1 — Rewrite the four commit messages, Phase 2 — Remove the domain and CNAME machinery, Phase 3 — Documentation, Phase 4 — Verify, then hand off, Postbuild script (+1 more)

### Community 59 - "Infrastructure & Operations Content Update"
Cohesion: 0.22
Nodes (8): 1. TrueNAS (`truenas-migration`), 2. Sophos VPN (`sophos-vpn`), Concrete content draft, Explicit non-goals, Field mapping (prompt → schema), Infrastructure & Operations Content Update, Scope, Verification

### Community 60 - "Overlay Card System Redesign"
Cohesion: 0.22
Nodes (8): 1. `OverlayCard` (new), 2. `SurfaceCard` (new), Design system: two card primitives, Files to create / change, Overlay Card System Redesign, Responsive behavior, Verification, Why the current design feels off

### Community 61 - "input.tsx"
Cohesion: 0.29
Nodes (7): Input(), Field(), FieldProps, ImageFieldProps, PairFieldConfig, PairListFieldProps, StringListFieldProps

### Community 62 - "Repo dead-code cleanup"
Cohesion: 0.22
Nodes (7): Check after edits, Delete (no importers), Leave in place, Repo dead-code cleanup, Trim dead code inside live files, Profile, SITE_VERSION

### Community 63 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): [vite.config.ts](vite.config.ts), rollup-plugin-visualizer, @tailwindcss/vite, vite, @vitejs/plugin-react, resolveBasePath()

### Community 64 - "Swap theme switch to the new reference"
Cohesion: 0.22
Nodes (8): Animations and cost, CSS, Focus ring, Markup rewrite, Reduced motion, Sizing decision, Swap theme switch to the new reference, Verification

### Community 65 - "Which font?"
Cohesion: 0.22
Nodes (8): Explanation, JetBrains Mono, Ligatures, Nerd Fonts, `Option 1: Download already patched font`, `Option 2: Patch your own font`, TL;DR, Which font?

### Community 66 - "github-pages-deploy-cleanup_35327ced.plan.md"
Cohesion: 0.25
Nodes (7): 1. `.gitignore` hardening, 2. Deployment workflow polish, 3. Supabase cloud flexibility, 4. History scrubbing (cautious, topology-preserving), 5. Remote setup (last step, only after you confirm verification), Current state (verified), Risks

### Community 67 - "Portfolio V2 — Engineering Case Study Updates"
Cohesion: 0.25
Nodes (7): Homepage ([HomePage.tsx](src/pages/HomePage.tsx)), Information architecture, Out of scope (this V2 pass), Philosophy & Resume, Portfolio V2 — Engineering Case Study Updates, Terminal / SEO, Unified content model

### Community 68 - "Boot on hard refresh or after 30 minutes"
Cohesion: 0.40
Nodes (4): Boot on hard refresh or after 30 minutes, Storage, Verify, When to play

### Community 69 - "dedupe-portfolio-media.ts"
Cohesion: 0.38
Nodes (6): Site URL and base path, @supabase/supabase-js, basename(), listAll(), main(), supabase

### Community 70 - "Fix Case Study Card Logos"
Cohesion: 0.33
Nodes (5): Fix Case Study Card Logos, Implementation, Per-slug logo map, Problem, Rule (locked)

### Community 71 - "GitHub Profile README Revamp"
Cohesion: 0.33
Nodes (5): Design language pulled from the portfolio, External services used, GitHub Profile README Revamp, Notes, Structure

### Community 72 - "Sync GitHub Profile README to Portfolio Content"
Cohesion: 0.33
Nodes (5): Content decisions (locked), Out of scope, Section-by-section changes, Source of truth, Sync GitHub Profile README to Portfolio Content

### Community 73 - "Smooth circle + knob slide (revised)"
Cohesion: 0.33
Nodes (5): Files, Knob drift (left ↔ right), Page reveal, Smooth circle + knob slide (revised), Verify

### Community 74 - "Sun–moon theme switch"
Cohesion: 0.33
Nodes (5): Behavior, Implementation (no styled-components), Sun–moon theme switch, Verify, Why mobile cannot toggle today

### Community 75 - "SaveBar"
Cohesion: 0.15
Nodes (14): Beautiful form-based Studio admin, Design direction, Out of scope, Page-by-page forms, Reusable field kit, 2. In-place control guidance, PairListField(), SaveBar() (+6 more)

### Community 76 - "usePortfolio"
Cohesion: 0.16
Nodes (15): Priority 2 — Home & category navigation cards, 3. Make route changes overlap, not wait, TechBadge(), TechBadgeProps, TechBanner(), TechBannerProps, ExperienceSnapshot(), HomeAbout() (+7 more)

### Community 77 - "AdminContentPages.tsx"
Cohesion: 0.20
Nodes (9): AdminPhilosophyPage, AdminResumePage, AdminTechnologiesPage, AdminTerminalPage, AdminTimelinePage, moveItem(), ReorderButtons(), resumeTabs (+1 more)

### Community 79 - "3. Draft public preview (exact look, isolated router)"
Cohesion: 0.28
Nodes (8): 3. Draft public preview (exact look, isolated router), BootSequence(), MobileNavContent(), Navbar(), ALLOWED_TOKEN_KEYS, isSafeCssValue(), SiteBrandApplier(), useOptionalPortfolio()

### Community 80 - "Footer.tsx"
Cohesion: 0.36
Nodes (6): Footer(), flattenNav(), navItems, DevModeContext, DevModeContextValue, useDevMode()

### Community 81 - "Fixed Cards, Logo Dedupe, Motion"
Cohesion: 0.29
Nodes (6): 1. OverlayCard redesign (fixed size, no blank-gap feel), 2. Supabase storage dedupe (new migration only), 3. Brand SVGs from svglogos.dev, 4. Animations + parallax, 5. Verification, Fixed Cards, Logo Dedupe, Motion

### Community 82 - "AdminTechnologiesPage"
Cohesion: 0.38
Nodes (7): toMediaPath(), AdminTechnologiesPage(), save(), uploadLogo(), caseStudyPayload(), deleteTechnology(), upsertTechnology()

### Community 83 - "Chronological experience timeline"
Cohesion: 0.50
Nodes (3): Changes, Chronological experience timeline, New order (oldest at top)

### Community 84 - "useScrollRestoration.ts"
Cohesion: 0.67
Nodes (3): restoreScroll(), scrollCache, useScrollRestoration()

## Knowledge Gaps
- **455 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `$schema` (+450 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 553 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `portfolio-admin.ts`, `terminal.ts`, `react-router-dom`, `utils.ts`, `publicRoutes.tsx`, `package.json`, `AppShell.tsx`, `lib/portfolio.ts`, `AdminSitePages.tsx`, `OverlayCard.tsx`, `supabase.ts`, `ContactPanel.tsx`, `AdminCaseStudiesPage.tsx`, `fields/index.ts`, `motion.ts`, `Reveal`, `cn`, `input.tsx`, `usePortfolio`, `AdminContentPages.tsx`, `3. Draft public preview (exact look, isolated router)`, `Footer.tsx`, `useScrollRestoration.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `terminal.ts`, `Reveal`, `utils.ts`, `publicRoutes.tsx`, `react-router-dom`, `react`, `LogoFrame.tsx`, `usePortfolio`, `SaveBar`, `3. Draft public preview (exact look, isolated router)`, `lib/portfolio.ts`, `OverlayCard.tsx`, `AdminCaseStudyEditPage`, `ContactPanel.tsx`, `AdminCaseStudiesPage.tsx`, `fields/index.ts`, `input.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `usePortfolio()` connect `usePortfolio` to `throwIfError`, `terminal.ts`, `react-router-dom`, `utils.ts`, `publicRoutes.tsx`, `Reveal`, `AdminContentPages.tsx`, `3. Draft public preview (exact look, isolated router)`, `lib/portfolio.ts`, `AdminSitePages.tsx`, `OverlayCard.tsx`, `AdminTechnologiesPage`, `ContactPanel.tsx`, `AdminCaseStudiesPage.tsx`, `fields/index.ts`, `AdminTimelinePage`, `AdminCaseStudyEditPage`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `usePortfolio()` (e.g. with `3. Draft public preview (exact look, isolated router)` and `What is wrong`) actually correct?**
  _`usePortfolio()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Button()` (e.g. with `Skip` and `Priority 1 — Case study cards (biggest visual win)`) actually correct?**
  _`Button()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _455 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `technologies.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05201266395296246 - nodes in this community are weakly interconnected._