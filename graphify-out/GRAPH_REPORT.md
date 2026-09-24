# Graph Report - Personal Portfolio  (2026-09-24)

## Corpus Check
- 202 files · ~326,036 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 42 file(s) not represented in the graph (top: .mdc 32, (none) 4, .ttf 2)

## Summary
- 1320 nodes · 2964 edges · 104 communities (80 shown, 24 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 164 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b41f258e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- technologies.ts
- AdminContentPages.tsx
- Theme Toggle + Production Optimization Plan
- portfolio-admin.ts
- throwIfError
- PreviewWorkbench.tsx
- types/portfolio.ts
- site-config.ts
- lib/portfolio.ts
- Phased Full CMS + Platform Projects
- publicPages.tsx
- cn
- Supabase Backend for Portfolio Monorepo
- main.tsx
- compilerOptions
- components.json
- package.json
- resume.ts
- Footer.tsx
- Warning-free GitHub Pages deploy
- TechBadge.tsx
- MediaCarousel.tsx
- dependencies
- Studio Preview workbench
- ContactPanel.tsx
- BootSequence.tsx
- V3 implementation plan
- scripts
- compilerOptions
- Rushak Pachpande Portfolio
- devDependencies
- seed-portfolio.ts
- Seo.tsx
- asset-loader.mjs
- getAdminBasePath
- theme-view-transition.ts
- 3. Draft public preview (exact look, isolated router)
- ExperienceTimeline
- AppShell.tsx
- Rushak Pachpande Portfolio
- Reveal.tsx
- TechLogo.tsx
- fetchPublicPortfolio
- Theme change blur-circle animation
- usePortfolio
- CategoryWorkPage.tsx
- Automation Content Update
- CaseStudyPage.tsx
- 20260827194842_portfolio_schema.sql
- Cut-corner overlay cards
- Multi-Resume via Supabase Storage
- Performance and public-site motion
- Viewport visual pass
- strip-domain-and-agent-trace_f6c94bac.plan.md
- AdminCaseStudyEditPage
- Infrastructure & Operations Content Update
- ResumePreview.tsx
- Phase 1 Portfolio Updates
- vite.config.ts
- Swap theme switch to the new reference
- Which font?
- Fixed Cards, Logo Dedupe, Motion
- github-pages-deploy-cleanup_35327ced.plan.md
- Portfolio V2 - Engineering Case Study Updates
- Repo dead-code cleanup
- dedupe-portfolio-media.ts
- Fix Case Study Card Logos
- GitHub Profile README Revamp
- Sync GitHub Profile README to Portfolio Content
- Smooth circle + knob slide (revised)
- Strip em and en dashes
- Sun-moon theme switch
- .oxlintrc.json
- Featured card layout
- tsconfig.json
- AdminInboxPages.tsx
- Boot on hard refresh or after 30 minutes
- Chronological experience timeline
- vite-env.d.ts
- 20260828200004_resume_files.sql
- ref_node_module
- public.case_studies
- public.site_settings
- Readable boot pace and skip
- src_assets_tech_github
- src_components_layout_navitems_navgroupitem
- src_components_layout_navitems_navlinkitem
- src_features_admin_fields_index_adminsection
- src_features_admin_fields_index_field
- src_features_admin_fields_index_imagefield
- src_features_admin_fields_index_moveitem
- src_features_admin_fields_index_pageheader
- src_features_admin_fields_index_pairlistfield
- src_features_admin_fields_index_savebar
- src_features_admin_fields_index_selectfield
- src_features_admin_fields_index_stringlistfield
- src_features_admin_fields_index_switchfield

## God Nodes (most connected - your core abstractions)
1. `cn()` - 106 edges
2. `react` - 66 edges
3. `usePortfolio()` - 60 edges
4. `react-router-dom` - 31 edges
5. `Button()` - 30 edges
6. `throwIfError()` - 28 edges
7. `lucide-react` - 22 edges
8. `OverlayCard()` - 22 edges
9. `Reveal()` - 21 edges
10. `publicMediaUrl()` - 21 edges

## Surprising Connections (you probably didn't know these)
- `Call-site mapping (same files, small prop adds)` --references--> `OverlayCard()`  [INFERRED]
  .cursor/plans/cut-corner_overlay_cards_b1e61c53.plan.md → src/components/cards/OverlayCard.tsx
- `Hardening` --references--> `Seo()`  [INFERRED]
  .cursor/plans/phase_1_portfolio_updates_b12c11bb.plan.md → src/components/layout/Seo.tsx
- `Phase 3 - Brand & SEO CMS` --references--> `Seo()`  [INFERRED]
  .cursor/plans/phased_full_cms_1f848a8e.plan.md → src/components/layout/Seo.tsx
- `Wire up` --references--> `ThemeProvider()`  [INFERRED]
  .cursor/plans/theme_toggle_and_optimization_ac122b34.plan.md → src/components/theme/ThemeProvider.tsx
- `Skip` --references--> `Button()`  [INFERRED]
  .cursor/plans/boot_pace_and_skip_4661483f.plan.md → src/components/ui/button.tsx

## Import Cycles
- None detected.

## Communities (104 total, 24 thin omitted)

### Community 0 - "technologies.ts"
Cohesion: 0.06
Nodes (53): src_assets_logos_brainpulses, src_assets_logos_disha, src_assets_logos_levelup, src_assets_logos_navdrishti, src_assets_logos_ngi_logo, src_assets_logos_personal_portfolio, src_assets_tech_azure, src_assets_tech_docker (+45 more)

### Community 1 - "AdminContentPages.tsx"
Cohesion: 0.07
Nodes (64): Reusable field kit, 2. In-place control guidance, @tanstack/react-query, AdminCaseStudiesPage, AdminCaseStudyEditPage, AdminCaseStudyRoute(), AdminDashboardPage, AdminLoginPage (+56 more)

### Community 2 - "Theme Toggle + Production Optimization Plan"
Cohesion: 0.12
Nodes (16): 5a. Vite build splitting - [`vite.config.ts`](vite.config.ts), 5c. Lazy-load non-critical AppShell weight - [`src/app/AppShell.tsx`](src/app/AppShell.tsx), 5d. Font optimization - [`src/index.css`](src/index.css), 5e. Admin page modularity (lower priority, same PR if time permits), 5f. Fix ESM postbuild - [`package.json`](package.json), Current State, Implementation Order, Install `next-themes` (+8 more)

### Community 3 - "portfolio-admin.ts"
Cohesion: 0.18
Nodes (22): fileFromDrop(), formatBytes(), ResumeFileRow(), ResumeFilesPanel(), onUpload(), refresh(), run(), resumeFilesQueryKey (+14 more)

### Community 4 - "throwIfError"
Cohesion: 0.18
Nodes (19): AdminPhilosophyPage(), save(), AdminResumePage(), save(), AdminTerminalPage(), save(), AdminTimelinePage(), save() (+11 more)

### Community 5 - "PreviewWorkbench.tsx"
Cohesion: 0.16
Nodes (12): PreviewRoutes(), DeviceChrome(), PreviewViewport(), PreviewViewportProps, PreviewWorkbench(), PreviewWorkbenchProps, PREVIEW_DEVICES, PreviewDeviceId (+4 more)

### Community 6 - "types/portfolio.ts"
Cohesion: 0.11
Nodes (24): 5. Admin UI, profileSchema, ArchitectureNode, CaseStudy, CaseStudyChallenge, CaseStudyDecision, CaseStudyLink, CaseStudyStackGroup (+16 more)

### Community 7 - "site-config.ts"
Cohesion: 0.11
Nodes (22): defaultNavStructure, isNavGroupActive(), isNavLinkActive(), isRouteActive(), navItems, navStructure, defaultSiteConfig, EngineeringAreaCard (+14 more)

### Community 8 - "lib/portfolio.ts"
Cohesion: 0.09
Nodes (33): src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_medium, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_regular, CommandTerminal(), CommandTerminalProps, lineStyles, buildTerminalWelcome(), commandLookup(), completeTerminalInput() (+25 more)

### Community 9 - "Phased Full CMS + Platform Projects"
Cohesion: 0.17
Nodes (11): Architecture decision (all phases), Current baseline, Phase 0 - Platform projects in DB (ship first, independent), Phase 1 - Site Content CMS (chrome without structural change), Phase 2 - Structure CMS (nav + categories + areas CRUD), Phase 3 - Brand & SEO CMS, Phase 4 - Terminal & polish (optional depth), Phased Full CMS + Platform Projects (+3 more)

### Community 10 - "publicPages.tsx"
Cohesion: 0.17
Nodes (18): react-router-dom, AboutPage, AutomationCaseStudyPage(), AutomationPage, ContactPage, ExperiencePage, HomePage, InfrastructureCaseStudyPage() (+10 more)

### Community 11 - "cn"
Cohesion: 0.06
Nodes (71): Reusable module, New files, class-variance-authority, lucide-react, radix-ui, react, prefetchPublicRoute(), OverlayCardShell() (+63 more)

### Community 12 - "Supabase Backend for Portfolio Monorepo"
Cohesion: 0.09
Nodes (22): 10. Risks and mitigations, 1. Supabase project scaffolding, 2. Database schema (Postgres), 3. Storage buckets, 4. Seed all current static data, 5. Frontend data layer, 6. Admin panel (obscured CMS), 7. Dev workflow (+14 more)

### Community 13 - "main.tsx"
Cohesion: 0.19
Nodes (11): Out of scope, next-themes, react-dom, react-helmet-async, router, ThemeColorMeta(), ThemeProvider(), PreviewRoot() (+3 more)

### Community 14 - "compilerOptions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, baseUrl, erasableSyntaxOnly, ignoreDeprecations, jsx, lib (+14 more)

### Community 15 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, private, type, version, autoskills, clsx, @fontsource/jetbrains-mono, @fontsource-variable/inter (+13 more)

### Community 17 - "resume.ts"
Cohesion: 0.15
Nodes (12): coreCompetencies, keyProjects, professionalExperience, ResumeCertificationGroup, resumeCertifications, resumeEducation, ResumeExperience, ResumeExpertiseGroup (+4 more)

### Community 18 - "Footer.tsx"
Cohesion: 0.26
Nodes (9): Footer(), flattenNav(), ALLOWED_TOKEN_KEYS, isSafeCssValue(), SiteBrandApplier(), DevModeContext, DevModeContextValue, useDevMode() (+1 more)

### Community 19 - "Warning-free GitHub Pages deploy"
Cohesion: 0.25
Nodes (8): High - navigation waits instead of overlapping, 1. Node 20 action runtime (1 warning), 2. `react/only-export-components` (10 shown, same file has more), 3. Ubuntu notice (1 notice), Check, Warning-free GitHub Pages deploy, PreviewPublicChrome(), withSuspense()

### Community 20 - "TechBadge.tsx"
Cohesion: 0.16
Nodes (12): Component migrations, Files to create / change, Overlay Card System Redesign, Priority 1 - Case study cards (biggest visual win), Priority 2 - Home & category navigation cards, Responsive behavior, Verification, Why the current design feels off (+4 more)

### Community 21 - "MediaCarousel.tsx"
Cohesion: 0.08
Nodes (26): 1. Unified Image / Logo Display, 2. Typography: Nerd Font + Readable Sizes, 3. Command Terminal Banner Fix, 4. Mobile Responsiveness Audit, Add JetBrains Mono Nerd Font, Create shared component, Files Changed (expected), Fixes (+18 more)

### Community 22 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, class-variance-authority, clsx, @fontsource/jetbrains-mono, @fontsource-variable/inter, @fontsource-variable/space-grotesk, framer-motion, lucide-react (+11 more)

### Community 23 - "Studio Preview workbench"
Cohesion: 0.25
Nodes (7): Behavior to keep, Design direction, Out of scope (on purpose), Studio Preview workbench, Verification, What feels unstructured today, mergePortfolioDraft()

### Community 24 - "ContactPanel.tsx"
Cohesion: 0.14
Nodes (17): Locked decisions, Lessons from the theme switch (apply here), 1. `OverlayCard` (new), 2. `SurfaceCard` (new), Design system: two card primitives, Priority 3 - SurfaceCard for content-heavy panels, Medium - continuous work on the main thread, What is wrong (+9 more)

### Community 25 - "BootSequence.tsx"
Cohesion: 0.27
Nodes (11): Code, BootSequence, BootSequence(), BootSequenceProps, isBackForward(), isHardReload(), lastLoadAt(), navigationEntry() (+3 more)

### Community 26 - "V3 implementation plan"
Cohesion: 0.12
Nodes (16): 1) Technology branding system, 2) Premium tech badges + technology banner, 3) Interactive architecture visuals, 4) Rich statistics + timeline polish, 5) Rich cards and visual hierarchy upgrades, 6) Gallery + lightbox infrastructure, 7) Cross references + technology library page, 8) Footer upgrade (+8 more)

### Community 27 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, build:analyze, db:dedupe-media, db:dedupe-media:prod, db:push, db:reset, db:seed (+9 more)

### Community 28 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 29 - "Rushak Pachpande Portfolio"
Cohesion: 0.12
Nodes (15): Folder structure, Implementation phases, Information architecture, Key UX features, Out of scope for v1 (architecture only), Phase 1 - Foundation, Phase 2 - Content + core pages, Phase 3 - Motion + terminal + eggs (+7 more)

### Community 30 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, autoskills, dotenv, oxlint, prettier, rollup-plugin-visualizer, tailwindcss, @tailwindcss/vite (+8 more)

### Community 31 - "seed-portfolio.ts"
Cohesion: 0.16
Nodes (18): appEnv, isLocalAsset(), main(), maybeCreateAdmin(), mimeFor(), resolveMedia(), seedCaseStudies(), seedResume() (+10 more)

### Community 32 - "Seo.tsx"
Cohesion: 0.19
Nodes (8): Seo(), SeoProps, usePreviewMode(), absoluteUrl(), buildTitle(), defaultDescription(), PageMeta, siteOrigin()

### Community 33 - "asset-loader.mjs"
Cohesion: 0.29
Nodes (4): ref_node_fs, ref_node_path, ref_node_url, resolve()

### Community 34 - "getAdminBasePath"
Cohesion: 0.13
Nodes (19): Constraints driving the design, Env, base path, SEO, Removing react-router without touching component internals, Routing map (file-based, 1:1 with today), Tooling, Verification before swap, Vite to Next.js (static export, exact clone), @supabase/supabase-js (+11 more)

### Community 35 - "theme-view-transition.ts"
Cohesion: 0.48
Nodes (6): animateThemeTransition(), applyHtmlClass(), canAnimate(), injectBaseStyles(), removeAnimStyle(), ViewTransition

### Community 36 - "3. Draft public preview (exact look, isolated router)"
Cohesion: 0.29
Nodes (4): 3. Draft public preview (exact look, isolated router), Admin media, guidance, preview, and motion, Verification, ContactPanel()

### Community 37 - "ExperienceTimeline"
Cohesion: 0.25
Nodes (7): Database, Display, New cards, Newest-first timeline plus LevelUP and DISHA, Component-specific checks, MediaCarousel(), ExperienceTimeline()

### Community 38 - "AppShell.tsx"
Cohesion: 0.15
Nodes (14): High - first paint is gated, Parity strategy (the important decision), AppShell(), CommandTerminal, CursorGlow, PageRouteSkeleton(), AdminDataLayout(), KONAMI (+6 more)

### Community 39 - "Rushak Pachpande Portfolio"
Cohesion: 0.15
Nodes (12): Content, Deployment (GitHub Pages), Local development, One-time setup, Routes, Running a deploy, Rushak Pachpande Portfolio, Scripts (+4 more)

### Community 40 - "Reveal.tsx"
Cohesion: 0.22
Nodes (10): framer-motion, RevealProps, SectionHeaderProps, HeroSection(), easeOut, fadeIn, fadeUp, pageTransition (+2 more)

### Community 41 - "TechLogo.tsx"
Cohesion: 0.33
Nodes (5): src_assets_tech_github_dark, src_assets_tech_github_light, LOCAL_THEME_LOGOS, resolveThemedLogoSrc(), TechLogoProps

### Community 42 - "fetchPublicPortfolio"
Cohesion: 0.20
Nodes (12): 5b. Split portfolio service, mergeSiteConfig(), toMediaPath(), AdminTechnologiesPage(), save(), uploadLogo(), caseStudyPayload(), deleteTechnology() (+4 more)

### Community 43 - "Theme change blur-circle animation"
Cohesion: 0.40
Nodes (4): Behavior, Files, Theme change blur-circle animation, Verify

### Community 44 - "usePortfolio"
Cohesion: 0.16
Nodes (19): 3. Make route changes overlap, not wait, ScrollFadeIn(), ScrollFadeProps, AnimatedCounter(), AnimatedCounterProps, SectionHeader(), EngineeringAreas(), gradientIcons (+11 more)

### Community 45 - "CategoryWorkPage.tsx"
Cohesion: 0.15
Nodes (15): Trim dead code inside live files, caseStudyLoader(), routeLoaders, CaseStudyRoutePage, getCategoryByPath(), getCategoryMeta(), AdminCaseStudiesPage(), CaseStudyRoutePage() (+7 more)

### Community 46 - "Automation Content Update"
Cohesion: 0.18
Nodes (10): 1. Replace `sharepoint-automations`, 2. Add IT Support Ticket Automation, 3. Remove `future-workflow-platform`, Automation Content Update, Concrete content draft, Current state → target, Explicit non-goals, Field mapping (prompt → `AutomationItem`) (+2 more)

### Community 47 - "CaseStudyPage.tsx"
Cohesion: 0.11
Nodes (24): 4. Theme dropdown + CSS-first micro-motion, What is actually happening, Why motion “isn’t there”, Minimum readable size pass, Implementation order, Shared UI, OverlayCardStat, PageTransition() (+16 more)

### Community 48 - "20260827194842_portfolio_schema.sql"
Cohesion: 0.18
Nodes (9): public.case_studies, public.contact_submissions, public.philosophy_pillars, public.resume_sections, public.site_profile, public.site_settings, public.technologies, public.terminal_commands (+1 more)

### Community 49 - "Cut-corner overlay cards"
Cohesion: 0.22
Nodes (8): Call-site mapping (same files, small prop adds), CSS placement, Cut-corner overlay cards, Out of scope, OverlayCard layout, SurfaceCard (chrome only), Verification (this is how the toggle slipped), What we are borrowing

### Community 50 - "Multi-Resume via Supabase Storage"
Cohesion: 0.18
Nodes (10): 1. New migration, 2. Public fetch, 3. Empty-state handling, 4. Admin service functions, 6. Remove the local copy, Current state, Data flow after the change, Multi-Resume via Supabase Storage (+2 more)

### Community 51 - "Performance and public-site motion"
Cohesion: 0.18
Nodes (10): 1. Stop blocking the public shell on the full dataset, 2. Shorten boot so it cannot sit in front of content, 4. Cheap GPU / input wins, Entry and scroll, Files (primary), Part 1 - Make it feel fast, Part 2 - Public motion that you can feel, Performance and public-site motion (+2 more)

### Community 52 - "Viewport visual pass"
Cohesion: 0.40
Nodes (4): After fixes, Likely fixes (apply only if the screenshot shows the bug), Test matrix, Viewport visual pass

### Community 53 - "strip-domain-and-agent-trace_f6c94bac.plan.md"
Cohesion: 0.20
Nodes (9): Context, [.github/workflows/deploy.yml](.github/workflows/deploy.yml), Order of operations, Phase 1 - Rewrite the four commit messages, Phase 2 - Remove the domain and CNAME machinery, Phase 3 - Documentation, Phase 4 - Verify, then hand off, Postbuild script (+1 more)

### Community 54 - "AdminCaseStudyEditPage"
Cohesion: 0.20
Nodes (13): Beautiful form-based Studio admin, Design direction, Out of scope, Page-by-page forms, AdminCaseStudyEditPage(), patch(), remove(), save() (+5 more)

### Community 55 - "Infrastructure & Operations Content Update"
Cohesion: 0.22
Nodes (8): 1. TrueNAS (`truenas-migration`), 2. Sophos VPN (`sophos-vpn`), Concrete content draft, Explicit non-goals, Field mapping (prompt → schema), Infrastructure & Operations Content Update, Scope, Verification

### Community 56 - "ResumePreview.tsx"
Cohesion: 0.18
Nodes (9): Interaction (CSS, existing Tailwind / tw-animate), Checks, Design, Implementation, Resume page visual revamp, MagneticButton(), MagneticButtonProps, variantHoverClasses (+1 more)

### Community 57 - "Phase 1 Portfolio Updates"
Cohesion: 0.22
Nodes (8): Content model rewrite, Hardening, Information architecture, Out of scope, Phase 1 Portfolio Updates, Scope of change, Truthfulness rules (enforced in content), UI / feature changes

### Community 58 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): [vite.config.ts](vite.config.ts), rollup-plugin-visualizer, @tailwindcss/vite, vite, @vitejs/plugin-react, resolveBasePath()

### Community 59 - "Swap theme switch to the new reference"
Cohesion: 0.22
Nodes (8): Animations and cost, CSS, Focus ring, Markup rewrite, Reduced motion, Sizing decision, Swap theme switch to the new reference, Verification

### Community 61 - "Which font?"
Cohesion: 0.22
Nodes (8): Explanation, JetBrains Mono, Ligatures, Nerd Fonts, `Option 1: Download already patched font`, `Option 2: Patch your own font`, TL;DR, Which font?

### Community 62 - "Fixed Cards, Logo Dedupe, Motion"
Cohesion: 0.29
Nodes (6): 1. OverlayCard redesign (fixed size, no blank-gap feel), 2. Supabase storage dedupe (new migration only), 3. Brand SVGs from svglogos.dev, 4. Animations + parallax, 5. Verification, Fixed Cards, Logo Dedupe, Motion

### Community 63 - "github-pages-deploy-cleanup_35327ced.plan.md"
Cohesion: 0.25
Nodes (7): 1. `.gitignore` hardening, 2. Deployment workflow polish, 3. Supabase cloud flexibility, 4. History scrubbing (cautious, topology-preserving), 5. Remote setup (last step, only after you confirm verification), Current state (verified), Risks

### Community 64 - "Portfolio V2 - Engineering Case Study Updates"
Cohesion: 0.25
Nodes (7): Homepage ([HomePage.tsx](src/pages/HomePage.tsx)), Information architecture, Out of scope (this V2 pass), Philosophy & Resume, Portfolio V2 - Engineering Case Study Updates, Terminal / SEO, Unified content model

### Community 65 - "Repo dead-code cleanup"
Cohesion: 0.40
Nodes (4): Check after edits, Delete (no importers), Leave in place, Repo dead-code cleanup

### Community 67 - "dedupe-portfolio-media.ts"
Cohesion: 0.33
Nodes (7): dotenv, basename(), listAll(), main(), supabase, loadAppEnv(), requestedEnv()

### Community 68 - "Fix Case Study Card Logos"
Cohesion: 0.33
Nodes (5): Fix Case Study Card Logos, Implementation, Per-slug logo map, Problem, Rule (locked)

### Community 69 - "GitHub Profile README Revamp"
Cohesion: 0.33
Nodes (5): Design language pulled from the portfolio, External services used, GitHub Profile README Revamp, Notes, Structure

### Community 70 - "Sync GitHub Profile README to Portfolio Content"
Cohesion: 0.33
Nodes (5): Content decisions (locked), Out of scope, Section-by-section changes, Source of truth, Sync GitHub Profile README to Portfolio Content

### Community 71 - "Smooth circle + knob slide (revised)"
Cohesion: 0.33
Nodes (5): Files, Knob drift (left ↔ right), Page reveal, Smooth circle + knob slide (revised), Verify

### Community 72 - "Strip em and en dashes"
Cohesion: 0.33
Nodes (5): Check, File pass, New migration, Strip em and en dashes, Where the dashes actually are

### Community 73 - "Sun-moon theme switch"
Cohesion: 0.33
Nodes (5): Behavior, Implementation (no styled-components), Sun-moon theme switch, Verify, Why mobile cannot toggle today

### Community 74 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 75 - "Featured card layout"
Cohesion: 0.33
Nodes (5): Check, DISHA in the wide slot, Featured card layout, Highlight content, Layout

### Community 76 - "tsconfig.json"
Cohesion: 0.33
Nodes (5): compilerOptions, baseUrl, paths, files, references

### Community 77 - "AdminInboxPages.tsx"
Cohesion: 0.31
Nodes (12): 1. Reusable media picker, isImageFileName(), isStorageFolder(), joinMediaPath(), MediaPicker(), onUpload(), publicMediaUrl(), AdminMediaPage() (+4 more)

### Community 78 - "Boot on hard refresh or after 30 minutes"
Cohesion: 0.40
Nodes (4): Boot on hard refresh or after 30 minutes, Storage, Verify, When to play

### Community 79 - "Chronological experience timeline"
Cohesion: 0.50
Nodes (3): Changes, Chronological experience timeline, New order (oldest at top)

### Community 80 - "vite-env.d.ts"
Cohesion: 0.50
Nodes (3): ImportMeta, ImportMetaEnv, *.ttf

### Community 101 - "Readable boot pace and skip"
Cohesion: 0.50
Nodes (3): Pace (~2 seconds), Readable boot pace and skip, Skip

## Knowledge Gaps
- **475 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `$schema` (+470 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 585 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `cn` to `AdminContentPages.tsx`, `portfolio-admin.ts`, `PreviewWorkbench.tsx`, `lib/portfolio.ts`, `publicPages.tsx`, `main.tsx`, `package.json`, `Footer.tsx`, `MediaCarousel.tsx`, `ContactPanel.tsx`, `BootSequence.tsx`, `getAdminBasePath`, `AppShell.tsx`, `Reveal.tsx`, `TechLogo.tsx`, `usePortfolio`, `CaseStudyPage.tsx`, `ResumePreview.tsx`, `AdminInboxPages.tsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `AdminContentPages.tsx`, `PreviewWorkbench.tsx`, `ExperienceTimeline`, `Reveal.tsx`, `TechLogo.tsx`, `lib/portfolio.ts`, `usePortfolio`, `AdminInboxPages.tsx`, `CaseStudyPage.tsx`, `TechBadge.tsx`, `MediaCarousel.tsx`, `AdminCaseStudyEditPage`, `ContactPanel.tsx`, `ResumePreview.tsx`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `usePortfolio()` connect `usePortfolio` to `Seo.tsx`, `AdminContentPages.tsx`, `getAdminBasePath`, `3. Draft public preview (exact look, isolated router)`, `PreviewWorkbench.tsx`, `ExperienceTimeline`, `throwIfError`, `lib/portfolio.ts`, `Reveal.tsx`, `fetchPublicPortfolio`, `CategoryWorkPage.tsx`, `CaseStudyPage.tsx`, `Footer.tsx`, `TechBadge.tsx`, `AdminCaseStudyEditPage`, `ContactPanel.tsx`, `ResumePreview.tsx`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `usePortfolio()` (e.g. with `3. Draft public preview (exact look, isolated router)` and `What is wrong`) actually correct?**
  _`usePortfolio()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Button()` (e.g. with `Skip` and `Priority 1 - Case study cards (biggest visual win)`) actually correct?**
  _`Button()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _475 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `technologies.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055288461538461536 - nodes in this community are weakly interconnected._