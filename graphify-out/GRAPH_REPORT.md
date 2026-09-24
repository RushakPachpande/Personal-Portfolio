# Graph Report - Personal Portfolio  (2026-09-24)

## Corpus Check
- 194 files · ~323,934 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 44 file(s) not represented in the graph (top: .mdc 34, (none) 4, .ttf 2)

## Summary
- 1280 nodes · 2884 edges · 80 communities (68 shown, 12 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 161 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b5fc22c2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- portfolio-admin.ts
- technologies.ts
- terminal.ts
- seed-portfolio.ts
- react-router-dom
- MediaPicker
- publicRoutes.tsx
- package.json
- types/portfolio.ts
- cn
- Supabase Backend for Portfolio Monorepo
- Portfolio UX Polish: Images, Typography, Terminal, Mobile
- compilerOptions
- components.json
- dependencies
- AppShell.tsx
- lib/portfolio.ts
- main
- OverlayCard.tsx
- scripts
- AppShell
- compilerOptions
- devDependencies
- main.tsx
- OverlayCard
- asset-loader.mjs
- react
- Cut-corner overlay cards
- throwIfError
- AdminCaseStudyEditPage
- V3 implementation plan
- shouldShowBootSequence
- uploadPortfolioFile
- 20260827194842_portfolio_schema.sql
- HeroSection.tsx
- Rushak Pachpande Portfolio
- ContactPanel.tsx
- Strip em and en dashes
- usePortfolio
- .oxlintrc.json
- Phased Full CMS + Platform Projects
- tsconfig.json
- vite-env.d.ts
- 20260828200004_resume_files.sql
- Rushak Pachpande Portfolio
- ref_node_module
- philosophy.ts
- public.case_studies
- public.site_settings
- Automation Content Update
- Multi-Resume via Supabase Storage
- What is actually happening
- Vite to Next.js (static export, exact clone)
- dedupe-portfolio-media.ts
- strip-domain-and-agent-trace_f6c94bac.plan.md
- Infrastructure & Operations Content Update
- Repo dead-code cleanup
- vite.config.ts
- Swap theme switch to the new reference
- Which font?
- github-pages-deploy-cleanup_35327ced.plan.md
- Portfolio V2 - Engineering Case Study Updates
- Boot on hard refresh or after 30 minutes
- portfolio-public.ts
- Fix Case Study Card Logos
- GitHub Profile README Revamp
- Sync GitHub Profile README to Portfolio Content
- Smooth circle + knob slide (revised)
- Sun-moon theme switch
- Minimum readable size pass
- 3. Draft public preview (exact look, isolated router)
- Footer.tsx
- Chronological experience timeline

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
- `Phase 3 - Brand & SEO CMS` --references--> `Seo()`  [INFERRED]
  .cursor/plans/phased_full_cms_1f848a8e.plan.md → src/components/layout/Seo.tsx
- `Modals / overlays` --references--> `LogoFrame()`  [INFERRED]
  .cursor/plans/portfolio_ux_polish_83636f45.plan.md → src/components/media/LogoFrame.tsx
- `Responsive behavior` --references--> `TechBanner()`  [INFERRED]
  .cursor/plans/overlay_card_redesign_11d10c87.plan.md → src/components/tech/TechBanner.tsx
- `Skip` --references--> `Button()`  [INFERRED]
  .cursor/plans/boot_pace_and_skip_4661483f.plan.md → src/components/ui/button.tsx

## Import Cycles
- None detected.

## Communities (80 total, 12 thin omitted)

### Community 0 - "portfolio-admin.ts"
Cohesion: 0.19
Nodes (21): fileFromDrop(), formatBytes(), ResumeFileRow(), ResumeFilesPanel(), onUpload(), refresh(), run(), resumeFilesQueryKey (+13 more)

### Community 1 - "technologies.ts"
Cohesion: 0.05
Nodes (55): src_assets_logos_brainpulses, src_assets_logos_disha, src_assets_logos_levelup, src_assets_logos_navdrishti, src_assets_logos_ngi_logo, src_assets_logos_personal_portfolio, src_assets_tech_azure, src_assets_tech_docker (+47 more)

### Community 2 - "terminal.ts"
Cohesion: 0.06
Nodes (42): CommandTerminal, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_medium, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_regular, defaultNavStructure, navItems, navStructure, CommandTerminal(), CommandTerminalProps (+34 more)

### Community 3 - "seed-portfolio.ts"
Cohesion: 0.15
Nodes (17): appEnv, mimeFor(), supabase, uploaded, uploadLocal(), coreCompetencies, keyProjects, professionalExperience (+9 more)

### Community 4 - "react-router-dom"
Cohesion: 0.07
Nodes (39): Behavior to keep, Design direction, Out of scope (on purpose), Reusable module, Studio Preview workbench, Verification, What feels unstructured today, react-router-dom (+31 more)

### Community 5 - "MediaPicker"
Cohesion: 0.19
Nodes (12): Beautiful form-based Studio admin, Design direction, Out of scope, Page-by-page forms, 1. Reusable media picker, joinMediaPath(), MediaPicker(), onUpload() (+4 more)

### Community 6 - "publicRoutes.tsx"
Cohesion: 0.05
Nodes (38): High - navigation waits instead of overlapping, Content model rewrite, Hardening, Information architecture, Out of scope, Phase 1 Portfolio Updates, Scope of change, Truthfulness rules (enforced in content) (+30 more)

### Community 7 - "package.json"
Cohesion: 0.09
Nodes (21): name, private, type, version, autoskills, clsx, @fontsource/jetbrains-mono, @fontsource-variable/inter (+13 more)

### Community 8 - "types/portfolio.ts"
Cohesion: 0.10
Nodes (23): 5. Admin UI, 6. Remove the local copy, CaseStudyCategory, CaseStudyChallenge, CaseStudyDecision, CaseStudyLink, CaseStudyStackGroup, ContactSubmission (+15 more)

### Community 9 - "cn"
Cohesion: 0.06
Nodes (54): Part 4 - Subtle Theme Animations (CSS-only), class-variance-authority, lucide-react, radix-ui, prefetchPublicRoute(), CursorGlow(), DesktopNavDropdown(), DesktopNavLink() (+46 more)

### Community 10 - "Supabase Backend for Portfolio Monorepo"
Cohesion: 0.09
Nodes (22): 10. Risks and mitigations, 1. Supabase project scaffolding, 2. Database schema (Postgres), 3. Storage buckets, 4. Seed all current static data, 5. Frontend data layer, 6. Admin panel (obscured CMS), 7. Dev workflow (+14 more)

### Community 11 - "Portfolio UX Polish: Images, Typography, Terminal, Mobile"
Cohesion: 0.11
Nodes (18): 1. Unified Image / Logo Display, 2. Typography: Nerd Font + Readable Sizes, 3. Command Terminal Banner Fix, 4. Mobile Responsiveness Audit, Add JetBrains Mono Nerd Font, Create shared component, Files Changed (expected), Fixes (+10 more)

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
Cohesion: 0.19
Nodes (8): BootSequence, CursorGlow, BootSequenceProps, KONAMI, useKonami(), restoreScroll(), scrollCache, useScrollRestoration()

### Community 16 - "lib/portfolio.ts"
Cohesion: 0.11
Nodes (30): Priority 1 - Case study cards (biggest visual win), Implementation order, Shared UI, Trim dead code inside live files, TechBanner(), TechBannerProps, CaseStudyCard(), CaseStudyGrid() (+22 more)

### Community 17 - "main"
Cohesion: 0.28
Nodes (9): isLocalAsset(), main(), maybeCreateAdmin(), resolveMedia(), seedCaseStudies(), seedResume(), seedTechnologies(), mapTechnologyNameToId() (+1 more)

### Community 18 - "OverlayCard.tsx"
Cohesion: 0.18
Nodes (12): OverlayCardBanner(), OverlayCardProps, OverlayCardShell(), OverlayCardSize, OverlayCardStat, SurfaceCardProps, CaseStudyCardProps, categoryGradients (+4 more)

### Community 19 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, build:analyze, db:dedupe-media, db:dedupe-media:prod, db:push, db:reset, db:seed (+9 more)

### Community 20 - "AppShell"
Cohesion: 0.36
Nodes (7): High - first paint is gated, AppShell(), AdminDataLayout(), AdminLayout(), signOut(), PortfolioContext, usePublicPortfolioQuery()

### Community 21 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 22 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, autoskills, dotenv, oxlint, prettier, rollup-plugin-visualizer, tailwindcss, @tailwindcss/vite (+8 more)

### Community 23 - "main.tsx"
Cohesion: 0.06
Nodes (37): Behavior, Files, Out of scope, Theme change blur-circle animation, Verify, 5a. Vite build splitting - [`vite.config.ts`](vite.config.ts), 5c. Lazy-load non-critical AppShell weight - [`src/app/AppShell.tsx`](src/app/AppShell.tsx), 5d. Font optimization - [`src/index.css`](src/index.css) (+29 more)

### Community 24 - "OverlayCard"
Cohesion: 0.08
Nodes (25): 1. OverlayCard redesign (fixed size, no blank-gap feel), 2. Supabase storage dedupe (new migration only), 3. Brand SVGs from svglogos.dev, 4. Animations + parallax, 5. Verification, Fixed Cards, Logo Dedupe, Motion, Locked decisions, Lessons from the theme switch (apply here) (+17 more)

### Community 25 - "asset-loader.mjs"
Cohesion: 0.29
Nodes (4): ref_node_fs, ref_node_path, ref_node_url, resolve()

### Community 26 - "react"
Cohesion: 0.06
Nodes (78): Reusable field kit, 2. In-place control guidance, react, @supabase/supabase-js, @tanstack/react-query, adminBase, AdminCaseStudiesPage, AdminCaseStudyEditPage (+70 more)

### Community 27 - "Cut-corner overlay cards"
Cohesion: 0.22
Nodes (8): Call-site mapping (same files, small prop adds), CSS placement, Cut-corner overlay cards, Out of scope, OverlayCard layout, SurfaceCard (chrome only), Verification (this is how the toggle slipped), What we are borrowing

### Community 28 - "throwIfError"
Cohesion: 0.17
Nodes (18): AdminPhilosophyPage(), save(), AdminResumePage(), save(), AdminTerminalPage(), save(), AdminProfilePage(), save() (+10 more)

### Community 29 - "AdminCaseStudyEditPage"
Cohesion: 0.31
Nodes (10): AdminCaseStudyEditPage(), patch(), remove(), save(), upload(), emptyStudy(), caseStudyPayload(), deleteCaseStudy() (+2 more)

### Community 30 - "V3 implementation plan"
Cohesion: 0.12
Nodes (16): 1) Technology branding system, 2) Premium tech badges + technology banner, 3) Interactive architecture visuals, 4) Rich statistics + timeline polish, 5) Rich cards and visual hierarchy upgrades, 6) Gallery + lightbox infrastructure, 7) Cross references + technology library page, 8) Footer upgrade (+8 more)

### Community 31 - "shouldShowBootSequence"
Cohesion: 0.24
Nodes (11): Pace (~2 seconds), Readable boot pace and skip, Skip, Code, isBackForward(), isHardReload(), lastLoadAt(), navigationEntry() (+3 more)

### Community 32 - "uploadPortfolioFile"
Cohesion: 0.26
Nodes (12): Current state, AdminTechnologiesPage(), save(), uploadLogo(), AdminTimelinePage(), save(), uploadTimelineLogo(), deleteTechnology() (+4 more)

### Community 33 - "20260827194842_portfolio_schema.sql"
Cohesion: 0.18
Nodes (9): public.case_studies, public.contact_submissions, public.philosophy_pillars, public.resume_sections, public.site_profile, public.site_settings, public.technologies, public.terminal_commands (+1 more)

### Community 34 - "HeroSection.tsx"
Cohesion: 0.19
Nodes (11): framer-motion, AnimatedGrid(), GradientBlobs(), AnimatedCounter(), AnimatedCounterProps, easeOut, fadeIn, fadeUp (+3 more)

### Community 35 - "Rushak Pachpande Portfolio"
Cohesion: 0.12
Nodes (15): Folder structure, Implementation phases, Information architecture, Key UX features, Out of scope for v1 (architecture only), Phase 1 - Foundation, Phase 2 - Content + core pages, Phase 3 - Motion + terminal + eggs (+7 more)

### Community 36 - "ContactPanel.tsx"
Cohesion: 0.15
Nodes (17): Interaction (CSS, existing Tailwind / tw-animate), Implementation, MagneticButton(), Reveal(), RevealProps, SectionHeader(), SectionHeaderProps, Badge() (+9 more)

### Community 37 - "Strip em and en dashes"
Cohesion: 0.33
Nodes (5): Check, File pass, New migration, Strip em and en dashes, Where the dashes actually are

### Community 38 - "usePortfolio"
Cohesion: 0.23
Nodes (13): 3. Make route changes overlap, not wait, ScrollFadeIn(), ScrollFadeProps, HeroSection(), EngineeringAreas(), gradientIcons, ExperienceSnapshot(), HomeAbout() (+5 more)

### Community 39 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 40 - "Phased Full CMS + Platform Projects"
Cohesion: 0.17
Nodes (11): Architecture decision (all phases), Current baseline, Phase 0 - Platform projects in DB (ship first, independent), Phase 1 - Site Content CMS (chrome without structural change), Phase 2 - Structure CMS (nav + categories + areas CRUD), Phase 3 - Brand & SEO CMS, Phase 4 - Terminal & polish (optional depth), Phased Full CMS + Platform Projects (+3 more)

### Community 41 - "tsconfig.json"
Cohesion: 0.33
Nodes (5): compilerOptions, baseUrl, paths, files, references

### Community 42 - "vite-env.d.ts"
Cohesion: 0.50
Nodes (3): ImportMeta, ImportMetaEnv, *.ttf

### Community 44 - "Rushak Pachpande Portfolio"
Cohesion: 0.15
Nodes (12): Content, Deployment (GitHub Pages), Local development, One-time setup, Routes, Running a deploy, Rushak Pachpande Portfolio, Scripts (+4 more)

### Community 53 - "Automation Content Update"
Cohesion: 0.18
Nodes (10): 1. Replace `sharepoint-automations`, 2. Add IT Support Ticket Automation, 3. Remove `future-workflow-platform`, Automation Content Update, Concrete content draft, Current state → target, Explicit non-goals, Field mapping (prompt → `AutomationItem`) (+2 more)

### Community 54 - "Multi-Resume via Supabase Storage"
Cohesion: 0.22
Nodes (8): 1. New migration, 2. Public fetch, 3. Empty-state handling, 4. Admin service functions, Data flow after the change, Multi-Resume via Supabase Storage, Note, Verification

### Community 55 - "What is actually happening"
Cohesion: 0.15
Nodes (12): 1. Stop blocking the public shell on the full dataset, 2. Shorten boot so it cannot sit in front of content, 4. Cheap GPU / input wins, Entry and scroll, Files (primary), Part 1 - Make it feel fast, Part 2 - Public motion that you can feel, Performance and public-site motion (+4 more)

### Community 56 - "Vite to Next.js (static export, exact clone)"
Cohesion: 0.18
Nodes (9): Constraints driving the design, Env, base path, SEO, Parity strategy (the important decision), Removing react-router without touching component internals, Routing map (file-based, 1:1 with today), Tooling, Verification before swap, Vite to Next.js (static export, exact clone) (+1 more)

### Community 57 - "dedupe-portfolio-media.ts"
Cohesion: 0.33
Nodes (7): dotenv, basename(), listAll(), main(), supabase, loadAppEnv(), requestedEnv()

### Community 58 - "strip-domain-and-agent-trace_f6c94bac.plan.md"
Cohesion: 0.20
Nodes (9): Context, [.github/workflows/deploy.yml](.github/workflows/deploy.yml), Order of operations, Phase 1 - Rewrite the four commit messages, Phase 2 - Remove the domain and CNAME machinery, Phase 3 - Documentation, Phase 4 - Verify, then hand off, Postbuild script (+1 more)

### Community 59 - "Infrastructure & Operations Content Update"
Cohesion: 0.22
Nodes (8): 1. TrueNAS (`truenas-migration`), 2. Sophos VPN (`sophos-vpn`), Concrete content draft, Explicit non-goals, Field mapping (prompt → schema), Infrastructure & Operations Content Update, Scope, Verification

### Community 62 - "Repo dead-code cleanup"
Cohesion: 0.25
Nodes (6): Check after edits, Delete (no importers), Leave in place, Repo dead-code cleanup, Profile, SITE_VERSION

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

### Community 67 - "Portfolio V2 - Engineering Case Study Updates"
Cohesion: 0.25
Nodes (7): Homepage ([HomePage.tsx](src/pages/HomePage.tsx)), Information architecture, Out of scope (this V2 pass), Philosophy & Resume, Portfolio V2 - Engineering Case Study Updates, Terminal / SEO, Unified content model

### Community 68 - "Boot on hard refresh or after 30 minutes"
Cohesion: 0.40
Nodes (4): Boot on hard refresh or after 30 minutes, Storage, Verify, When to play

### Community 69 - "portfolio-public.ts"
Cohesion: 0.36
Nodes (9): 5b. Split portfolio service, mergeSiteConfig(), publicMediaUrl(), toMediaPath(), fetchPublicPortfolio(), mapResume(), profileSchema, resolveCaseStudy() (+1 more)

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

### Community 74 - "Sun-moon theme switch"
Cohesion: 0.33
Nodes (5): Behavior, Implementation (no styled-components), Sun-moon theme switch, Verify, Why mobile cannot toggle today

### Community 78 - "Minimum readable size pass"
Cohesion: 0.15
Nodes (13): Database, Display, New cards, Newest-first timeline plus LevelUP and DISHA, Priority 2 - Home & category navigation cards, Component-specific checks, Minimum readable size pass, MediaCarousel() (+5 more)

### Community 79 - "3. Draft public preview (exact look, isolated router)"
Cohesion: 0.25
Nodes (7): 3. Draft public preview (exact look, isolated router), 4. Theme dropdown + CSS-first micro-motion, Admin media, guidance, preview, and motion, Verification, BootSequence(), Navbar(), PageTransition()

### Community 80 - "Footer.tsx"
Cohesion: 0.26
Nodes (9): Footer(), flattenNav(), ALLOWED_TOKEN_KEYS, isSafeCssValue(), SiteBrandApplier(), DevModeContext, DevModeContextValue, useDevMode() (+1 more)

### Community 83 - "Chronological experience timeline"
Cohesion: 0.50
Nodes (3): Changes, Chronological experience timeline, New order (oldest at top)

## Knowledge Gaps
- **462 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `$schema` (+457 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 562 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** - run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `portfolio-admin.ts`, `HeroSection.tsx`, `terminal.ts`, `ContactPanel.tsx`, `react-router-dom`, `publicRoutes.tsx`, `package.json`, `usePortfolio`, `cn`, `AppShell.tsx`, `Footer.tsx`, `lib/portfolio.ts`, `OverlayCard.tsx`, `main.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `HeroSection.tsx`, `terminal.ts`, `ContactPanel.tsx`, `react-router-dom`, `MediaPicker`, `usePortfolio`, `Minimum readable size pass`, `3. Draft public preview (exact look, isolated router)`, `lib/portfolio.ts`, `OverlayCard.tsx`, `OverlayCard`, `react`, `AdminCaseStudyEditPage`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `usePortfolio()` connect `usePortfolio` to `uploadPortfolioFile`, `terminal.ts`, `HeroSection.tsx`, `react-router-dom`, `ContactPanel.tsx`, `publicRoutes.tsx`, `Minimum readable size pass`, `3. Draft public preview (exact look, isolated router)`, `lib/portfolio.ts`, `Footer.tsx`, `OverlayCard.tsx`, `OverlayCard`, `react`, `throwIfError`, `AdminCaseStudyEditPage`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `usePortfolio()` (e.g. with `3. Draft public preview (exact look, isolated router)` and `What is wrong`) actually correct?**
  _`usePortfolio()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Button()` (e.g. with `Skip` and `Priority 1 - Case study cards (biggest visual win)`) actually correct?**
  _`Button()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _462 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `technologies.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.052917232021709636 - nodes in this community are weakly interconnected._