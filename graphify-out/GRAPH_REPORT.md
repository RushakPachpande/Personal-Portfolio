# Graph Report - Personal Portfolio  (2026-09-24)

## Corpus Check
- 195 files · ~324,276 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 42 file(s) not represented in the graph (top: .mdc 32, (none) 4, .ttf 2)

## Summary
- 1299 nodes · 2905 edges · 118 communities (91 shown, 27 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 161 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1d44e6fa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- technologies.ts
- AdminCaseStudiesPage.tsx
- @tanstack/react-query
- ResumeFilesPanel.tsx
- AdminContentPages.tsx
- AdminSitePages.tsx
- portfolio-admin.ts
- Navbar.tsx
- terminal.ts
- Phased Full CMS + Platform Projects
- publicRoutes.tsx
- cn
- Supabase Backend for Portfolio Monorepo
- site-config.ts
- compilerOptions
- components.json
- package.json
- utils.ts
- caseStudies/index.ts
- infrastructure.ts
- OverlayCard
- Portfolio UX Polish: Images, Typography, Terminal, Mobile
- dependencies
- react
- OverlayCard.tsx
- BootSequence.tsx
- V3 implementation plan
- scripts
- compilerOptions
- Rushak Pachpande Portfolio
- devDependencies
- main
- Seo.tsx
- SwitchField.tsx
- getAdminBasePath
- PreviewWorkbench.tsx
- 3. Draft public preview (exact look, isolated router)
- Studio Preview workbench
- AppShell.tsx
- Rushak Pachpande Portfolio
- HeroSection.tsx
- Footer.tsx
- seed-portfolio.ts
- lib/portfolio.ts
- usePortfolio
- CategoryWorkPage.tsx
- Automation Content Update
- Minimum readable size pass
- 20260827194842_portfolio_schema.sql
- Cut-corner overlay cards
- Multi-Resume via Supabase Storage
- Performance and public-site motion
- supabase.ts
- strip-domain-and-agent-trace_f6c94bac.plan.md
- AdminCaseStudyEditPage
- Infrastructure & Operations Content Update
- platforms.ts
- Phase 1 Portfolio Updates
- vite.config.ts
- Swap theme switch to the new reference
- dedupe-portfolio-media.ts
- Which font?
- Fixed Cards, Logo Dedupe, Motion
- github-pages-deploy-cleanup_35327ced.plan.md
- CaseStudyCard
- Repo dead-code cleanup
- usePrefersReducedMotion
- load-app-env.ts
- Fix Case Study Card Logos
- GitHub Profile README Revamp
- Sync GitHub Profile README to Portfolio Content
- Smooth circle + knob slide (revised)
- Strip em and en dashes
- Sun-moon theme switch
- .oxlintrc.json
- TechLogo.tsx
- tsconfig.json
- AdminInboxPages.tsx
- Boot on hard refresh or after 30 minutes
- Chronological experience timeline
- vite-env.d.ts
- 20260828200004_resume_files.sql
- ref_node_module
- public.case_studies
- public.site_settings
- Theme Toggle + Production Optimization Plan
- theme-view-transition.ts
- AppShell
- Part 5 - Production Modularization and Optimization
- ContactPage.tsx
- Theme change blur-circle animation
- SiteBrandApplier.tsx
- AdminTechnologiesPage
- AdminProfilePage
- Readable boot pace and skip
- ThemeProvider.tsx
- useScrollRestoration.ts
- philosophy.ts
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
1. `cn()` - 108 edges
2. `react` - 65 edges
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
- `Hardening` --references--> `Seo()`  [INFERRED]
  .cursor/plans/phase_1_portfolio_updates_b12c11bb.plan.md → src/components/layout/Seo.tsx
- `Phase 3 - Brand & SEO CMS` --references--> `Seo()`  [INFERRED]
  .cursor/plans/phased_full_cms_1f848a8e.plan.md → src/components/layout/Seo.tsx
- `Modals / overlays` --references--> `LogoFrame()`  [INFERRED]
  .cursor/plans/portfolio_ux_polish_83636f45.plan.md → src/components/media/LogoFrame.tsx
- `Responsive behavior` --references--> `TechBanner()`  [INFERRED]
  .cursor/plans/overlay_card_redesign_11d10c87.plan.md → src/components/tech/TechBanner.tsx

## Import Cycles
- None detected.

## Communities (118 total, 27 thin omitted)

### Community 0 - "technologies.ts"
Cohesion: 0.10
Nodes (19): src_assets_tech_git, src_assets_tech_githubactions, src_assets_tech_javascript, src_assets_tech_microsoft365, src_assets_tech_mongodb, src_assets_tech_openapi, src_assets_tech_postgresql, src_assets_tech_react (+11 more)

### Community 1 - "AdminCaseStudiesPage.tsx"
Cohesion: 0.16
Nodes (23): Reusable field kit, 2. In-place control guidance, react-router-dom, Textarea(), src_features_admin_adminpreviewoverlay_adminpreviewoverlay, AdminSection(), AdminSectionProps, PageHeader() (+15 more)

### Community 2 - "@tanstack/react-query"
Cohesion: 0.24
Nodes (8): react-dom, react-helmet-async, @tanstack/react-query, router, PreviewRoot(), PreviewRootProps, src_index, queryClient

### Community 3 - "ResumeFilesPanel.tsx"
Cohesion: 0.25
Nodes (16): fileFromDrop(), formatBytes(), ResumeFileRow(), ResumeFilesPanel(), onUpload(), refresh(), run(), resumeFilesQueryKey (+8 more)

### Community 4 - "AdminContentPages.tsx"
Cohesion: 0.09
Nodes (31): adminBase, AdminCaseStudiesPage, AdminCaseStudyEditPage, AdminDashboardPage, AdminLoginPage, AdminPhilosophyPage, AdminProfilePage, AdminResumePage (+23 more)

### Community 5 - "AdminSitePages.tsx"
Cohesion: 0.16
Nodes (16): AdminSiteBrandPage, AdminSiteCategoriesPage, AdminSiteContentPage, AdminSiteFlagsPage, AdminSiteNavigationPage, AdminSiteSeoPage, AdminSiteBrandPage(), AdminSiteCategoriesPage() (+8 more)

### Community 6 - "portfolio-admin.ts"
Cohesion: 0.11
Nodes (27): assertPdfFile(), ResumeFileRow, resumeStorageKey(), ArchitectureNode, CaseStudy, CaseStudyCategory, CaseStudyChallenge, CaseStudyDecision (+19 more)

### Community 7 - "Navbar.tsx"
Cohesion: 0.13
Nodes (22): lucide-react, prefetchPublicRoute(), DesktopNavDropdown(), DesktopNavLink(), MobileNavContent(), isNavGroupActive(), isNavLinkActive(), isRouteActive() (+14 more)

### Community 8 - "terminal.ts"
Cohesion: 0.13
Nodes (23): CommandTerminal, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_medium, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_regular, CommandTerminal(), CommandTerminalProps, lineStyles, buildTerminalWelcome(), commandLookup() (+15 more)

### Community 9 - "Phased Full CMS + Platform Projects"
Cohesion: 0.17
Nodes (11): Architecture decision (all phases), Current baseline, Phase 0 - Platform projects in DB (ship first, independent), Phase 1 - Site Content CMS (chrome without structural change), Phase 2 - Structure CMS (nav + categories + areas CRUD), Phase 3 - Brand & SEO CMS, Phase 4 - Terminal & polish (optional depth), Phased Full CMS + Platform Projects (+3 more)

### Community 10 - "publicRoutes.tsx"
Cohesion: 0.12
Nodes (10): High - navigation waits instead of overlapping, AboutPage, HomePage, PhilosophyPage, PreviewPublicChrome(), publicChildRoutes, ResumePage, TechnologyLibraryPage (+2 more)

### Community 11 - "cn"
Cohesion: 0.13
Nodes (28): Reusable module, class-variance-authority, radix-ui, Badge(), badgeVariants, Select(), SelectContent(), SelectGroup() (+20 more)

### Community 12 - "Supabase Backend for Portfolio Monorepo"
Cohesion: 0.09
Nodes (22): 10. Risks and mitigations, 1. Supabase project scaffolding, 2. Database schema (Postgres), 3. Storage buckets, 4. Seed all current static data, 5. Frontend data layer, 6. Admin panel (obscured CMS), 7. Dev workflow (+14 more)

### Community 13 - "site-config.ts"
Cohesion: 0.13
Nodes (18): defaultNavStructure, navStructure, defaultSiteConfig, EngineeringAreaCard, NavGroupItem, NavItem, NavLinkItem, NavRoute (+10 more)

### Community 14 - "compilerOptions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, baseUrl, erasableSyntaxOnly, ignoreDeprecations, jsx, lib (+14 more)

### Community 15 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, private, type, version, autoskills, clsx, @fontsource/jetbrains-mono, @fontsource-variable/inter (+13 more)

### Community 17 - "utils.ts"
Cohesion: 0.12
Nodes (17): LightboxModal(), LightboxModalProps, LogoFrame(), LogoFrameProps, LogoFrameVariant, variantStyles, MediaCarousel(), MediaCarouselProps (+9 more)

### Community 18 - "caseStudies/index.ts"
Cohesion: 0.17
Nodes (13): caseStudies, defaultsByCategory, getCaseStudy(), getRelatedCaseStudies(), ArchitectureNode, CaseStudyCategory, CaseStudyChallenge, CaseStudyDecision (+5 more)

### Community 19 - "infrastructure.ts"
Cohesion: 0.17
Nodes (13): src_assets_tech_docker, src_assets_tech_linux, src_assets_tech_microsoft, src_assets_tech_n8n, src_assets_tech_outlook, src_assets_tech_sharepoint, src_assets_tech_shield, src_assets_tech_supabase (+5 more)

### Community 20 - "OverlayCard"
Cohesion: 0.09
Nodes (23): Locked decisions, Lessons from the theme switch (apply here), 1. `OverlayCard` (new), 2. `SurfaceCard` (new), Component migrations, Design system: two card primitives, Files to create / change, Overlay Card System Redesign (+15 more)

### Community 21 - "Portfolio UX Polish: Images, Typography, Terminal, Mobile"
Cohesion: 0.11
Nodes (18): 1. Unified Image / Logo Display, 2. Typography: Nerd Font + Readable Sizes, 3. Command Terminal Banner Fix, 4. Mobile Responsiveness Audit, Add JetBrains Mono Nerd Font, Create shared component, Files Changed (expected), Fixes (+10 more)

### Community 22 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, class-variance-authority, clsx, @fontsource/jetbrains-mono, @fontsource-variable/inter, @fontsource-variable/space-grotesk, framer-motion, lucide-react (+11 more)

### Community 23 - "react"
Cohesion: 0.16
Nodes (14): react, SurfaceCardProps, ScrollToTopButton(), MagneticButtonProps, variantHoverClasses, Button(), buttonVariants, Input() (+6 more)

### Community 24 - "OverlayCard.tsx"
Cohesion: 0.21
Nodes (10): OverlayCardBanner(), OverlayCardProps, OverlayCardShell(), OverlayCardSize, OverlayCardStat, CaseStudyCardProps, categoryGradients, CardGradientKey (+2 more)

### Community 25 - "BootSequence.tsx"
Cohesion: 0.36
Nodes (8): BootSequence, BootSequenceProps, isBackForward(), isHardReload(), lastLoadAt(), navigationEntry(), prefersReducedMotion(), shouldShowBootSequence()

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

### Community 31 - "main"
Cohesion: 0.28
Nodes (9): isLocalAsset(), main(), maybeCreateAdmin(), mimeFor(), resolveMedia(), seedCaseStudies(), seedResume(), seedTechnologies() (+1 more)

### Community 32 - "Seo.tsx"
Cohesion: 0.21
Nodes (9): ExperiencePage, NotFoundPage, Seo(), SeoProps, usePreviewMode(), absoluteUrl(), buildTitle(), defaultDescription() (+1 more)

### Community 34 - "getAdminBasePath"
Cohesion: 0.13
Nodes (19): Constraints driving the design, Env, base path, SEO, Removing react-router without touching component internals, Routing map (file-based, 1:1 with today), Tooling, Verification before swap, Vite to Next.js (static export, exact clone), AdminGuard() (+11 more)

### Community 35 - "PreviewWorkbench.tsx"
Cohesion: 0.16
Nodes (14): DeviceChrome(), PreviewViewport(), PreviewViewportProps, PreviewWorkbench(), PreviewWorkbenchProps, StudioPreview(), PREVIEW_DEVICES, PreviewDeviceId (+6 more)

### Community 36 - "3. Draft public preview (exact look, isolated router)"
Cohesion: 0.25
Nodes (7): 3. Draft public preview (exact look, isolated router), 4. Theme dropdown + CSS-first micro-motion, Admin media, guidance, preview, and motion, Verification, BootSequence(), Navbar(), PageTransition()

### Community 37 - "Studio Preview workbench"
Cohesion: 0.29
Nodes (6): Behavior to keep, Design direction, Out of scope (on purpose), Studio Preview workbench, Verification, What feels unstructured today

### Community 38 - "AppShell.tsx"
Cohesion: 0.21
Nodes (6): Parity strategy (the important decision), CursorGlow, CursorGlow(), PageRouteSkeleton(), KONAMI, useKonami()

### Community 39 - "Rushak Pachpande Portfolio"
Cohesion: 0.17
Nodes (11): Content, Deployment (GitHub Pages), Local development, One-time setup, Routes, Running a deploy, Rushak Pachpande Portfolio, Scripts (+3 more)

### Community 40 - "HeroSection.tsx"
Cohesion: 0.19
Nodes (11): framer-motion, AnimatedGrid(), GradientBlobs(), AnimatedCounter(), AnimatedCounterProps, easeOut, fadeIn, fadeUp (+3 more)

### Community 41 - "Footer.tsx"
Cohesion: 0.36
Nodes (6): Footer(), flattenNav(), navItems, DevModeContext, DevModeContextValue, useDevMode()

### Community 42 - "seed-portfolio.ts"
Cohesion: 0.15
Nodes (17): appEnv, supabase, uploaded, Profile, SITE_VERSION, coreCompetencies, keyProjects, professionalExperience (+9 more)

### Community 43 - "lib/portfolio.ts"
Cohesion: 0.17
Nodes (17): SiteConfigPathResolver, CaseStudyLink(), categoryOrder, TechnologyLibraryGrid(), categoryLabels, categoryPaths, getCaseStudiesByCategory(), getCaseStudy() (+9 more)

### Community 44 - "usePortfolio"
Cohesion: 0.16
Nodes (23): 3. Make route changes overlap, not wait, Implementation, MagneticButton(), Reveal(), RevealProps, SectionHeader(), SectionHeaderProps, EngineeringAreas() (+15 more)

### Community 45 - "CategoryWorkPage.tsx"
Cohesion: 0.16
Nodes (11): caseStudyLoader(), routeLoaders, AutomationPage, CaseStudyRoutePage, InfrastructurePage, PlatformsPage, CaseStudyRoutePageProps, AutomationPage() (+3 more)

### Community 46 - "Automation Content Update"
Cohesion: 0.18
Nodes (10): 1. Replace `sharepoint-automations`, 2. Add IT Support Ticket Automation, 3. Remove `future-workflow-platform`, Automation Content Update, Concrete content draft, Current state → target, Explicit non-goals, Field mapping (prompt → `AutomationItem`) (+2 more)

### Community 47 - "Minimum readable size pass"
Cohesion: 0.16
Nodes (13): Database, Display, New cards, Newest-first timeline plus LevelUP and DISHA, Priority 2 - Home & category navigation cards, Component-specific checks, Minimum readable size pass, TechBadge() (+5 more)

### Community 48 - "20260827194842_portfolio_schema.sql"
Cohesion: 0.18
Nodes (9): public.case_studies, public.contact_submissions, public.philosophy_pillars, public.resume_sections, public.site_profile, public.site_settings, public.technologies, public.terminal_commands (+1 more)

### Community 49 - "Cut-corner overlay cards"
Cohesion: 0.22
Nodes (8): Call-site mapping (same files, small prop adds), CSS placement, Cut-corner overlay cards, Out of scope, OverlayCard layout, SurfaceCard (chrome only), Verification (this is how the toggle slipped), What we are borrowing

### Community 50 - "Multi-Resume via Supabase Storage"
Cohesion: 0.17
Nodes (11): 1. New migration, 2. Public fetch, 3. Empty-state handling, 4. Admin service functions, 5. Admin UI, 6. Remove the local copy, Current state, Data flow after the change (+3 more)

### Community 51 - "Performance and public-site motion"
Cohesion: 0.18
Nodes (10): 1. Stop blocking the public shell on the full dataset, 2. Shorten boot so it cannot sit in front of content, 4. Cheap GPU / input wins, Entry and scroll, Files (primary), Part 1 - Make it feel fast, Part 2 - Public motion that you can feel, Performance and public-site motion (+2 more)

### Community 52 - "supabase.ts"
Cohesion: 0.33
Nodes (10): mergeSiteConfig(), publicMediaUrl(), publicResumeUrl(), RESUME_BUCKET, supabase, toMediaPath(), fetchPublicPortfolio(), mapResume() (+2 more)

### Community 53 - "strip-domain-and-agent-trace_f6c94bac.plan.md"
Cohesion: 0.20
Nodes (9): Context, [.github/workflows/deploy.yml](.github/workflows/deploy.yml), Order of operations, Phase 1 - Rewrite the four commit messages, Phase 2 - Remove the domain and CNAME machinery, Phase 3 - Documentation, Phase 4 - Verify, then hand off, Postbuild script (+1 more)

### Community 54 - "AdminCaseStudyEditPage"
Cohesion: 0.20
Nodes (13): Beautiful form-based Studio admin, Design direction, Page-by-page forms, AdminCaseStudyEditPage(), patch(), remove(), save(), upload() (+5 more)

### Community 55 - "Infrastructure & Operations Content Update"
Cohesion: 0.22
Nodes (8): 1. TrueNAS (`truenas-migration`), 2. Sophos VPN (`sophos-vpn`), Concrete content draft, Explicit non-goals, Field mapping (prompt → schema), Infrastructure & Operations Content Update, Scope, Verification

### Community 56 - "platforms.ts"
Cohesion: 0.22
Nodes (9): src_assets_logos_brainpulses, src_assets_logos_disha, src_assets_logos_levelup, src_assets_logos_navdrishti, src_assets_logos_ngi_logo, src_assets_logos_personal_portfolio, src_assets_tech_azure, platformCaseStudies (+1 more)

### Community 57 - "Phase 1 Portfolio Updates"
Cohesion: 0.22
Nodes (8): Content model rewrite, Hardening, Information architecture, Out of scope, Phase 1 Portfolio Updates, Scope of change, Truthfulness rules (enforced in content), UI / feature changes

### Community 58 - "vite.config.ts"
Cohesion: 0.22
Nodes (6): [vite.config.ts](vite.config.ts), rollup-plugin-visualizer, @tailwindcss/vite, vite, @vitejs/plugin-react, resolveBasePath()

### Community 59 - "Swap theme switch to the new reference"
Cohesion: 0.22
Nodes (8): Animations and cost, CSS, Focus ring, Markup rewrite, Reduced motion, Sizing decision, Swap theme switch to the new reference, Verification

### Community 60 - "dedupe-portfolio-media.ts"
Cohesion: 0.38
Nodes (6): Site URL and base path, @supabase/supabase-js, basename(), listAll(), main(), supabase

### Community 61 - "Which font?"
Cohesion: 0.22
Nodes (8): Explanation, JetBrains Mono, Ligatures, Nerd Fonts, `Option 1: Download already patched font`, `Option 2: Patch your own font`, TL;DR, Which font?

### Community 62 - "Fixed Cards, Logo Dedupe, Motion"
Cohesion: 0.33
Nodes (5): 1. OverlayCard redesign (fixed size, no blank-gap feel), 2. Supabase storage dedupe (new migration only), 3. Brand SVGs from svglogos.dev, 5. Verification, Fixed Cards, Logo Dedupe, Motion

### Community 63 - "github-pages-deploy-cleanup_35327ced.plan.md"
Cohesion: 0.25
Nodes (7): 1. `.gitignore` hardening, 2. Deployment workflow polish, 3. Supabase cloud flexibility, 4. History scrubbing (cautious, topology-preserving), 5. Remote setup (last step, only after you confirm verification), Current state (verified), Risks

### Community 64 - "CaseStudyCard"
Cohesion: 0.15
Nodes (14): Interaction (CSS, existing Tailwind / tw-animate), Homepage ([HomePage.tsx](src/pages/HomePage.tsx)), Implementation order, Information architecture, Out of scope (this V2 pass), Philosophy & Resume, Portfolio V2 - Engineering Case Study Updates, Shared UI (+6 more)

### Community 65 - "Repo dead-code cleanup"
Cohesion: 0.22
Nodes (7): Check after edits, Delete (no importers), Leave in place, Repo dead-code cleanup, Trim dead code inside live files, ScrollFadeIn(), ScrollFadeProps

### Community 66 - "usePrefersReducedMotion"
Cohesion: 0.25
Nodes (9): 4. Animations + parallax, Out of scope, Install `next-themes`, New files, Part 2 - Theme Provider and Toggle, Part 4 - Subtle Theme Animations (CSS-only), Wire up, ThemeProvider() (+1 more)

### Community 67 - "load-app-env.ts"
Cohesion: 0.22
Nodes (7): dotenv, ref_node_fs, ref_node_path, ref_node_url, resolve(), loadAppEnv(), requestedEnv()

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

### Community 75 - "TechLogo.tsx"
Cohesion: 0.28
Nodes (7): src_assets_tech_github_dark, src_assets_tech_github_light, TechBadgeProps, LOCAL_THEME_LOGOS, resolveThemedLogoSrc(), TechLogo(), TechLogoProps

### Community 76 - "tsconfig.json"
Cohesion: 0.33
Nodes (5): compilerOptions, baseUrl, paths, files, references

### Community 77 - "AdminInboxPages.tsx"
Cohesion: 0.19
Nodes (17): Out of scope, 1. Reusable media picker, AdminMediaPage, AdminSubmissionsPage, isStorageFolder(), joinMediaPath(), MediaPicker(), onUpload() (+9 more)

### Community 78 - "Boot on hard refresh or after 30 minutes"
Cohesion: 0.29
Nodes (6): Boot on hard refresh or after 30 minutes, Code, Storage, Verify, When to play, rememberDocumentLoad()

### Community 79 - "Chronological experience timeline"
Cohesion: 0.50
Nodes (3): Changes, Chronological experience timeline, New order (oldest at top)

### Community 80 - "vite-env.d.ts"
Cohesion: 0.50
Nodes (3): ImportMeta, ImportMetaEnv, *.ttf

### Community 92 - "Theme Toggle + Production Optimization Plan"
Cohesion: 0.29
Nodes (6): Current State, Implementation Order, Part 1 - Theme Token Architecture, Part 3 - Theme-Aware Hardcoded Colors, Part 6 - Verification Checklist, Theme Toggle + Production Optimization Plan

### Community 93 - "theme-view-transition.ts"
Cohesion: 0.48
Nodes (6): animateThemeTransition(), applyHtmlClass(), canAnimate(), injectBaseStyles(), removeAnimStyle(), ViewTransition

### Community 94 - "AppShell"
Cohesion: 0.53
Nodes (5): High - first paint is gated, AppShell(), AdminDataLayout(), PortfolioContext, usePublicPortfolioQuery()

### Community 95 - "Part 5 - Production Modularization and Optimization"
Cohesion: 0.33
Nodes (6): 5a. Vite build splitting - [`vite.config.ts`](vite.config.ts), 5c. Lazy-load non-critical AppShell weight - [`src/app/AppShell.tsx`](src/app/AppShell.tsx), 5d. Font optimization - [`src/index.css`](src/index.css), 5e. Admin page modularity (lower priority, same PR if time permits), 5f. Fix ESM postbuild - [`package.json`](package.json), Part 5 - Production Modularization and Optimization

### Community 96 - "ContactPage.tsx"
Cohesion: 0.33
Nodes (4): 5b. Split portfolio service, ContactPage, ContactPanel(), submitContact()

### Community 97 - "Theme change blur-circle animation"
Cohesion: 0.40
Nodes (4): Behavior, Files, Theme change blur-circle animation, Verify

### Community 98 - "SiteBrandApplier.tsx"
Cohesion: 0.60
Nodes (4): ALLOWED_TOKEN_KEYS, isSafeCssValue(), SiteBrandApplier(), useOptionalPortfolio()

### Community 99 - "AdminTechnologiesPage"
Cohesion: 0.60
Nodes (5): AdminTechnologiesPage(), save(), uploadLogo(), deleteTechnology(), upsertTechnology()

### Community 100 - "AdminProfilePage"
Cohesion: 0.60
Nodes (4): AdminProfilePage(), save(), upsertSiteProfile(), upsertSiteSettings()

### Community 101 - "Readable boot pace and skip"
Cohesion: 0.50
Nodes (3): Pace (~2 seconds), Readable boot pace and skip, Skip

### Community 103 - "useScrollRestoration.ts"
Cohesion: 0.67
Nodes (3): restoreScroll(), scrollCache, useScrollRestoration()

## Knowledge Gaps
- **464 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `$schema` (+459 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 576 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `AdminCaseStudiesPage.tsx`, `@tanstack/react-query`, `ResumeFilesPanel.tsx`, `AdminContentPages.tsx`, `AdminSitePages.tsx`, `Navbar.tsx`, `terminal.ts`, `publicRoutes.tsx`, `cn`, `package.json`, `utils.ts`, `OverlayCard.tsx`, `BootSequence.tsx`, `Seo.tsx`, `SwitchField.tsx`, `getAdminBasePath`, `PreviewWorkbench.tsx`, `AppShell.tsx`, `HeroSection.tsx`, `Footer.tsx`, `usePortfolio`, `Repo dead-code cleanup`, `TechLogo.tsx`, `AdminInboxPages.tsx`, `SiteBrandApplier.tsx`, `ThemeProvider.tsx`, `useScrollRestoration.ts`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `AdminCaseStudiesPage.tsx`, `Navbar.tsx`, `terminal.ts`, `utils.ts`, `OverlayCard`, `react`, `OverlayCard.tsx`, `SwitchField.tsx`, `PreviewWorkbench.tsx`, `3. Draft public preview (exact look, isolated router)`, `AppShell.tsx`, `HeroSection.tsx`, `lib/portfolio.ts`, `usePortfolio`, `Minimum readable size pass`, `AdminCaseStudyEditPage`, `CaseStudyCard`, `TechLogo.tsx`, `AdminInboxPages.tsx`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `usePortfolio()` connect `usePortfolio` to `AdminCaseStudiesPage.tsx`, `AdminContentPages.tsx`, `AdminSitePages.tsx`, `terminal.ts`, `cn`, `utils.ts`, `OverlayCard`, `react`, `OverlayCard.tsx`, `Seo.tsx`, `getAdminBasePath`, `PreviewWorkbench.tsx`, `3. Draft public preview (exact look, isolated router)`, `HeroSection.tsx`, `lib/portfolio.ts`, `CategoryWorkPage.tsx`, `Minimum readable size pass`, `AdminCaseStudyEditPage`, `CaseStudyCard`, `ContactPage.tsx`, `SiteBrandApplier.tsx`, `AdminTechnologiesPage`, `AdminProfilePage`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `usePortfolio()` (e.g. with `3. Draft public preview (exact look, isolated router)` and `What is wrong`) actually correct?**
  _`usePortfolio()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Button()` (e.g. with `Skip` and `Priority 1 - Case study cards (biggest visual win)`) actually correct?**
  _`Button()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _464 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `technologies.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._