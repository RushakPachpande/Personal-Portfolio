# Graph Report - Personal Portfolio  (2026-09-24)

## Corpus Check
- 196 files · ~324,877 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 42 file(s) not represented in the graph (top: .mdc 32, (none) 4, .ttf 2)

## Summary
- 1304 nodes · 2909 edges · 109 communities (85 shown, 24 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 161 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9685fae4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- technologies.ts
- AdminCaseStudiesPage.tsx
- main.tsx
- ResumeFilesPanel.tsx
- AdminContentPages.tsx
- AdminSitePages.tsx
- portfolio-admin.ts
- cn
- CommandTerminal.tsx
- Phased Full CMS + Platform Projects
- publicRoutes.tsx
- react-router-dom
- Supabase Backend for Portfolio Monorepo
- site-config.ts
- compilerOptions
- components.json
- package.json
- utils.ts
- lucide-react
- terminal.ts
- Overlay Card System Redesign
- Portfolio UX Polish: Images, Typography, Terminal, Mobile
- dependencies
- react
- OverlayCard.tsx
- shouldShowBootSequence
- V3 implementation plan
- scripts
- compilerOptions
- Rushak Pachpande Portfolio
- devDependencies
- seed-portfolio.ts
- Seo.tsx
- prefetchPublicRoutes.ts
- router.tsx
- BootSequence.tsx
- motion.ts
- Newest-first timeline plus LevelUP and DISHA
- AppShell.tsx
- Rushak Pachpande Portfolio
- HeroSection.tsx
- Footer.tsx
- resume.ts
- lib/portfolio.ts
- usePortfolio
- CategoryWorkPage.tsx
- Automation Content Update
- CaseStudyCard.tsx
- 20260827194842_portfolio_schema.sql
- Cut-corner overlay cards
- Multi-Resume via Supabase Storage
- Performance and public-site motion
- Viewport visual pass
- strip-domain-and-agent-trace_f6c94bac.plan.md
- AdminCaseStudyEditPage
- Infrastructure & Operations Content Update
- Resume page visual revamp
- Phase 1 Portfolio Updates
- vite.config.ts
- Swap theme switch to the new reference
- dedupe-portfolio-media.ts
- Which font?
- Fixed Cards, Logo Dedupe, Motion
- github-pages-deploy-cleanup_35327ced.plan.md
- Portfolio V2 - Engineering Case Study Updates
- Repo dead-code cleanup
- SiteConfigPathResolver.tsx
- load-app-env.ts
- Fix Case Study Card Logos
- GitHub Profile README Revamp
- Sync GitHub Profile README to Portfolio Content
- Smooth circle + knob slide (revised)
- Strip em and en dashes
- Sun-moon theme switch
- .oxlintrc.json
- DesktopNavDropdown
- tsconfig.json
- fields/index.ts
- Boot on hard refresh or after 30 minutes
- Chronological experience timeline
- vite-env.d.ts
- 20260828200004_resume_files.sql
- ref_node_module
- public.case_studies
- public.site_settings
- ContactPage.tsx
- SiteBrandApplier.tsx
- Readable boot pace and skip
- useScrollRestoration.ts
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
- `1. `OverlayCard` (new)` --references--> `OverlayCard()`  [INFERRED]
  .cursor/plans/overlay_card_redesign_11d10c87.plan.md → src/components/cards/OverlayCard.tsx
- `2. `SurfaceCard` (new)` --references--> `SurfaceCard()`  [INFERRED]
  .cursor/plans/overlay_card_redesign_11d10c87.plan.md → src/components/cards/SurfaceCard.tsx
- `Hardening` --references--> `Seo()`  [INFERRED]
  .cursor/plans/phase_1_portfolio_updates_b12c11bb.plan.md → src/components/layout/Seo.tsx
- `Phase 3 - Brand & SEO CMS` --references--> `Seo()`  [INFERRED]
  .cursor/plans/phased_full_cms_1f848a8e.plan.md → src/components/layout/Seo.tsx

## Import Cycles
- None detected.

## Communities (109 total, 24 thin omitted)

### Community 0 - "technologies.ts"
Cohesion: 0.06
Nodes (53): src_assets_logos_brainpulses, src_assets_logos_disha, src_assets_logos_levelup, src_assets_logos_navdrishti, src_assets_logos_ngi_logo, src_assets_logos_personal_portfolio, src_assets_tech_azure, src_assets_tech_docker (+45 more)

### Community 1 - "AdminCaseStudiesPage.tsx"
Cohesion: 0.11
Nodes (27): Reusable field kit, 2. In-place control guidance, 5. Admin UI, @tanstack/react-query, src_features_admin_adminpreviewoverlay_adminpreviewoverlay, AdminSection(), AdminSectionProps, PageHeader() (+19 more)

### Community 2 - "main.tsx"
Cohesion: 0.06
Nodes (38): Behavior, Files, Out of scope, Theme change blur-circle animation, Verify, 5a. Vite build splitting - [`vite.config.ts`](vite.config.ts), 5c. Lazy-load non-critical AppShell weight - [`src/app/AppShell.tsx`](src/app/AppShell.tsx), 5d. Font optimization - [`src/index.css`](src/index.css) (+30 more)

### Community 3 - "ResumeFilesPanel.tsx"
Cohesion: 0.20
Nodes (19): fileFromDrop(), formatBytes(), ResumeFileRow(), ResumeFilesPanel(), onUpload(), refresh(), run(), resumeFilesQueryKey (+11 more)

### Community 4 - "AdminContentPages.tsx"
Cohesion: 0.17
Nodes (22): AdminPhilosophyPage(), save(), AdminResumePage(), save(), AdminTechnologiesPage(), save(), uploadLogo(), AdminTerminalPage() (+14 more)

### Community 5 - "AdminSitePages.tsx"
Cohesion: 0.15
Nodes (16): Textarea(), PairFieldConfig, PairListField(), PairListFieldProps, moveItem(), ReorderButtons(), AdminSiteBrandPage(), AdminSiteCategoriesPage() (+8 more)

### Community 6 - "portfolio-admin.ts"
Cohesion: 0.11
Nodes (33): mergeSiteConfig(), publicResumeUrl(), RESUME_BUCKET, supabase, toMediaPath(), assertPdfFile(), ResumeFileRow, resumeStorageKey() (+25 more)

### Community 7 - "cn"
Cohesion: 0.15
Nodes (21): DesktopNavLink(), MobileNavContent(), Navbar(), ThemeToggle(), Button(), buttonVariants, Sheet(), SheetContent() (+13 more)

### Community 8 - "CommandTerminal.tsx"
Cohesion: 0.19
Nodes (12): CommandTerminal, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_medium, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_regular, CommandTerminal(), CommandTerminalProps, lineStyles, buildTerminalWelcome(), completeTerminalInput() (+4 more)

### Community 9 - "Phased Full CMS + Platform Projects"
Cohesion: 0.17
Nodes (11): Architecture decision (all phases), Current baseline, Phase 0 - Platform projects in DB (ship first, independent), Phase 1 - Site Content CMS (chrome without structural change), Phase 2 - Structure CMS (nav + categories + areas CRUD), Phase 3 - Brand & SEO CMS, Phase 4 - Terminal & polish (optional depth), Phased Full CMS + Platform Projects (+3 more)

### Community 10 - "publicRoutes.tsx"
Cohesion: 0.14
Nodes (8): High - navigation waits instead of overlapping, AboutPage, CaseStudyRoutePage, HomePage, PreviewPublicChrome(), ResumePage, TechnologyLibraryPage, withSuspense()

### Community 11 - "react-router-dom"
Cohesion: 0.07
Nodes (39): Behavior to keep, Design direction, Out of scope (on purpose), Reusable module, Studio Preview workbench, Verification, What feels unstructured today, react-router-dom (+31 more)

### Community 12 - "Supabase Backend for Portfolio Monorepo"
Cohesion: 0.09
Nodes (22): 10. Risks and mitigations, 1. Supabase project scaffolding, 2. Database schema (Postgres), 3. Storage buckets, 4. Seed all current static data, 5. Frontend data layer, 6. Admin panel (obscured CMS), 7. Dev workflow (+14 more)

### Community 13 - "site-config.ts"
Cohesion: 0.15
Nodes (16): defaultNavStructure, navStructure, EngineeringAreaCard, NavGroupItem, NavItem, NavLinkItem, NavRoute, SiteBrandConfig (+8 more)

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
Cohesion: 0.17
Nodes (11): ArchitectureFlow(), ArchitectureFlowProps, CaseStudyGrid(), CaseStudyGridProps, RelatedCaseStudies(), CaseStudyPageProps, TOC, getRelatedCaseStudies() (+3 more)

### Community 18 - "lucide-react"
Cohesion: 0.23
Nodes (9): lucide-react, LightboxModal(), LightboxModalProps, LogoFrame(), LogoFrameProps, LogoFrameVariant, variantStyles, MediaCarouselProps (+1 more)

### Community 19 - "terminal.ts"
Cohesion: 0.23
Nodes (12): commandLookup(), executeTerminalCommand(), formatCertifications(), formatNavStructure(), out(), resolveTerminalInput(), TerminalCommand, terminalCommands (+4 more)

### Community 20 - "Overlay Card System Redesign"
Cohesion: 0.22
Nodes (8): 1. `OverlayCard` (new), 2. `SurfaceCard` (new), Design system: two card primitives, Files to create / change, Overlay Card System Redesign, Responsive behavior, Verification, Why the current design feels off

### Community 21 - "Portfolio UX Polish: Images, Typography, Terminal, Mobile"
Cohesion: 0.11
Nodes (18): 1. Unified Image / Logo Display, 2. Typography: Nerd Font + Readable Sizes, 3. Command Terminal Banner Fix, 4. Mobile Responsiveness Audit, Add JetBrains Mono Nerd Font, Create shared component, Files Changed (expected), Fixes (+10 more)

### Community 22 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, class-variance-authority, clsx, @fontsource/jetbrains-mono, @fontsource-variable/inter, @fontsource-variable/space-grotesk, framer-motion, lucide-react (+11 more)

### Community 23 - "react"
Cohesion: 0.14
Nodes (17): Interaction (CSS, existing Tailwind / tw-animate), Implementation, class-variance-authority, radix-ui, react, MagneticButton(), MagneticButtonProps, variantHoverClasses (+9 more)

### Community 24 - "OverlayCard.tsx"
Cohesion: 0.14
Nodes (15): 4. Animations + parallax, Locked decisions, Lessons from the theme switch (apply here), OverlayCardBanner(), OverlayCardProps, OverlayCardShell(), OverlayCardSize, SurfaceCard() (+7 more)

### Community 25 - "shouldShowBootSequence"
Cohesion: 0.42
Nodes (8): Code, isBackForward(), isHardReload(), lastLoadAt(), navigationEntry(), prefersReducedMotion(), rememberDocumentLoad(), shouldShowBootSequence()

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
Cohesion: 0.20
Nodes (15): appEnv, isLocalAsset(), main(), maybeCreateAdmin(), mimeFor(), resolveMedia(), seedCaseStudies(), seedResume() (+7 more)

### Community 32 - "Seo.tsx"
Cohesion: 0.23
Nodes (10): NotFoundPage, Seo(), SeoProps, PreviewModeContext, usePreviewMode(), absoluteUrl(), buildTitle(), defaultDescription() (+2 more)

### Community 33 - "prefetchPublicRoutes.ts"
Cohesion: 0.22
Nodes (5): caseStudyLoader(), prefetchPublicRoute(), routeLoaders, ExperiencePage, PhilosophyPage

### Community 34 - "router.tsx"
Cohesion: 0.06
Nodes (38): Constraints driving the design, Env, base path, SEO, Removing react-router without touching component internals, Routing map (file-based, 1:1 with today), Tooling, Verification before swap, Vite to Next.js (static export, exact clone), adminBase (+30 more)

### Community 35 - "BootSequence.tsx"
Cohesion: 0.33
Nodes (5): 3. Draft public preview (exact look, isolated router), BootSequence, BootSequence(), BootSequenceProps, defaultSiteConfig

### Community 36 - "motion.ts"
Cohesion: 0.18
Nodes (9): 4. Theme dropdown + CSS-first micro-motion, Admin media, guidance, preview, and motion, Verification, PageTransition(), easeOut, fadeIn, pageTransition, scaleIn (+1 more)

### Community 37 - "Newest-first timeline plus LevelUP and DISHA"
Cohesion: 0.33
Nodes (5): Database, Display, New cards, Newest-first timeline plus LevelUP and DISHA, getHomeExperienceSnapshot()

### Community 38 - "AppShell.tsx"
Cohesion: 0.20
Nodes (10): High - first paint is gated, Parity strategy (the important decision), AppShell(), CursorGlow, PageRouteSkeleton(), AdminDataLayout(), KONAMI, useKonami() (+2 more)

### Community 39 - "Rushak Pachpande Portfolio"
Cohesion: 0.17
Nodes (11): Content, Deployment (GitHub Pages), Local development, One-time setup, Routes, Running a deploy, Rushak Pachpande Portfolio, Scripts (+3 more)

### Community 40 - "HeroSection.tsx"
Cohesion: 0.16
Nodes (11): Medium - continuous work on the main thread, What is actually happening, Why motion “isn’t there”, framer-motion, AnimatedGrid(), GradientBlobs(), CursorGlow(), AnimatedCounter() (+3 more)

### Community 41 - "Footer.tsx"
Cohesion: 0.36
Nodes (6): Footer(), flattenNav(), navItems, DevModeContext, DevModeContextValue, useDevMode()

### Community 42 - "resume.ts"
Cohesion: 0.15
Nodes (12): coreCompetencies, keyProjects, professionalExperience, ResumeCertificationGroup, resumeCertifications, resumeEducation, ResumeExperience, ResumeExpertiseGroup (+4 more)

### Community 43 - "lib/portfolio.ts"
Cohesion: 0.25
Nodes (8): categoryLabels, categoryPaths, mapTechnologyNameToId(), technologyAliases, technologyCategories, usedInSlugsFromCaseStudies(), EngineeringStat, SiteCategoryConfig

### Community 44 - "usePortfolio"
Cohesion: 0.16
Nodes (21): 3. Make route changes overlap, not wait, What is wrong, OverlayCard(), ScrollFadeIn(), ScrollFadeProps, Reveal(), RevealProps, SectionHeader() (+13 more)

### Community 45 - "CategoryWorkPage.tsx"
Cohesion: 0.21
Nodes (9): AutomationPage, InfrastructurePage, PlatformsPage, getCaseStudiesByCategory(), AutomationPage(), CategoryWorkPage(), CategoryWorkPageProps, InfrastructurePage() (+1 more)

### Community 46 - "Automation Content Update"
Cohesion: 0.18
Nodes (10): 1. Replace `sharepoint-automations`, 2. Add IT Support Ticket Automation, 3. Remove `future-workflow-platform`, Automation Content Update, Concrete content draft, Current state → target, Explicit non-goals, Field mapping (prompt → `AutomationItem`) (+2 more)

### Community 47 - "CaseStudyCard.tsx"
Cohesion: 0.08
Nodes (35): Component migrations, Priority 1 - Case study cards (biggest visual win), Priority 2 - Home & category navigation cards, Priority 3 - SurfaceCard for content-heavy panels, Component-specific checks, Minimum readable size pass, Implementation order, Shared UI (+27 more)

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
Cohesion: 0.18
Nodes (14): Beautiful form-based Studio admin, Design direction, Out of scope, Page-by-page forms, AdminCaseStudyEditPage(), patch(), remove(), save() (+6 more)

### Community 55 - "Infrastructure & Operations Content Update"
Cohesion: 0.22
Nodes (8): 1. TrueNAS (`truenas-migration`), 2. Sophos VPN (`sophos-vpn`), Concrete content draft, Explicit non-goals, Field mapping (prompt → schema), Infrastructure & Operations Content Update, Scope, Verification

### Community 56 - "Resume page visual revamp"
Cohesion: 0.50
Nodes (3): Checks, Design, Resume page visual revamp

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

### Community 64 - "Portfolio V2 - Engineering Case Study Updates"
Cohesion: 0.25
Nodes (7): Homepage ([HomePage.tsx](src/pages/HomePage.tsx)), Information architecture, Out of scope (this V2 pass), Philosophy & Resume, Portfolio V2 - Engineering Case Study Updates, Terminal / SEO, Unified content model

### Community 65 - "Repo dead-code cleanup"
Cohesion: 0.22
Nodes (7): Check after edits, Delete (no importers), Leave in place, Repo dead-code cleanup, Trim dead code inside live files, Profile, SITE_VERSION

### Community 66 - "SiteConfigPathResolver.tsx"
Cohesion: 0.67
Nodes (3): SiteConfigPathResolver, getCategoryByPath(), SiteConfigPathResolver()

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

### Community 75 - "DesktopNavDropdown"
Cohesion: 0.67
Nodes (4): DesktopNavDropdown(), isNavGroupActive(), isNavLinkActive(), isRouteActive()

### Community 76 - "tsconfig.json"
Cohesion: 0.33
Nodes (5): compilerOptions, baseUrl, paths, files, references

### Community 77 - "fields/index.ts"
Cohesion: 0.22
Nodes (18): 1. Reusable media picker, Input(), ImageField(), ImageFieldProps, isImageFileName(), isStorageFolder(), joinMediaPath(), MediaPicker() (+10 more)

### Community 78 - "Boot on hard refresh or after 30 minutes"
Cohesion: 0.40
Nodes (4): Boot on hard refresh or after 30 minutes, Storage, Verify, When to play

### Community 79 - "Chronological experience timeline"
Cohesion: 0.50
Nodes (3): Changes, Chronological experience timeline, New order (oldest at top)

### Community 80 - "vite-env.d.ts"
Cohesion: 0.50
Nodes (3): ImportMeta, ImportMetaEnv, *.ttf

### Community 96 - "ContactPage.tsx"
Cohesion: 0.33
Nodes (4): 5b. Split portfolio service, ContactPage, ContactPanel(), submitContact()

### Community 98 - "SiteBrandApplier.tsx"
Cohesion: 0.67
Nodes (3): ALLOWED_TOKEN_KEYS, isSafeCssValue(), SiteBrandApplier()

### Community 101 - "Readable boot pace and skip"
Cohesion: 0.50
Nodes (3): Pace (~2 seconds), Readable boot pace and skip, Skip

### Community 103 - "useScrollRestoration.ts"
Cohesion: 0.67
Nodes (3): restoreScroll(), scrollCache, useScrollRestoration()

## Knowledge Gaps
- **467 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `$schema` (+462 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 580 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `AdminCaseStudiesPage.tsx`, `main.tsx`, `ResumeFilesPanel.tsx`, `AdminContentPages.tsx`, `AdminSitePages.tsx`, `cn`, `CommandTerminal.tsx`, `publicRoutes.tsx`, `react-router-dom`, `package.json`, `utils.ts`, `lucide-react`, `OverlayCard.tsx`, `Seo.tsx`, `router.tsx`, `BootSequence.tsx`, `motion.ts`, `AppShell.tsx`, `HeroSection.tsx`, `Footer.tsx`, `usePortfolio`, `CaseStudyCard.tsx`, `fields/index.ts`, `SiteBrandApplier.tsx`, `useScrollRestoration.ts`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `AdminCaseStudiesPage.tsx`, `AdminSitePages.tsx`, `HeroSection.tsx`, `CommandTerminal.tsx`, `DesktopNavDropdown`, `usePortfolio`, `fields/index.ts`, `react-router-dom`, `CaseStudyCard.tsx`, `utils.ts`, `lucide-react`, `AdminCaseStudyEditPage`, `react`, `OverlayCard.tsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `usePortfolio()` connect `usePortfolio` to `Seo.tsx`, `ContactPage.tsx`, `AdminCaseStudiesPage.tsx`, `BootSequence.tsx`, `router.tsx`, `AdminContentPages.tsx`, `AdminSitePages.tsx`, `cn`, `CommandTerminal.tsx`, `HeroSection.tsx`, `SiteConfigPathResolver.tsx`, `react-router-dom`, `CategoryWorkPage.tsx`, `CaseStudyCard.tsx`, `utils.ts`, `AdminCaseStudyEditPage`, `react`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `usePortfolio()` (e.g. with `3. Draft public preview (exact look, isolated router)` and `What is wrong`) actually correct?**
  _`usePortfolio()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Button()` (e.g. with `Skip` and `Priority 1 - Case study cards (biggest visual win)`) actually correct?**
  _`Button()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _467 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `technologies.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055288461538461536 - nodes in this community are weakly interconnected._