# Graph Report - Personal Portfolio  (2026-09-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 917 nodes · 2416 edges · 53 communities (44 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c5c3fcde`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- portfolio-admin.ts
- technologies.ts
- terminal.ts
- seed-portfolio.ts
- react-router-dom
- usePortfolio
- publicRoutes.tsx
- package.json
- Seo.tsx
- cn
- react
- types/portfolio.ts
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
- @tanstack/react-query
- Footer.tsx
- fields/index.ts
- CaseStudyCard.tsx
- MediaCarousel.tsx
- AdminContentPages.tsx
- AdminCaseStudiesPage.tsx
- radix-ui
- BootSequence.tsx
- AdminDashboardPage.tsx
- 20260827194842_portfolio_schema.sql
- HeroSection.tsx
- CategoryWorkPage.tsx
- ResumePreview.tsx
- motion.ts
- theme-view-transition.ts
- .oxlintrc.json
- TechBanner.tsx
- tsconfig.json
- vite-env.d.ts
- 20260828200004_resume_files.sql
- StringListField
- ref_node_module
- AdminLayout
- public.case_studies
- public.site_settings

## God Nodes (most connected - your core abstractions)
1. `cn()` - 109 edges
2. `react` - 64 edges
3. `usePortfolio()` - 58 edges
4. `react-router-dom` - 29 edges
5. `throwIfError()` - 28 edges
6. `Button()` - 27 edges
7. `lucide-react` - 22 edges
8. `compilerOptions` - 21 edges
9. `publicMediaUrl()` - 20 edges
10. `uploadPortfolioFile()` - 20 edges

## Surprising Connections (you probably didn't know these)
- `usePublicPortfolioQuery()` --indirect_call--> `fetchPublicPortfolio()`  [INFERRED]
  src/hooks/usePortfolio.ts → src/services/portfolio-public.ts
- `OverlayCardShell()` --calls--> `cn()`  [EXTRACTED]
  src/components/cards/OverlayCard.tsx → src/lib/utils.ts
- `seedTechnologies()` --calls--> `usedInSlugsFromCaseStudies()`  [EXTRACTED]
  scripts/seed-portfolio.ts → src/lib/portfolio.ts
- `SectionBlock()` --calls--> `cn()`  [EXTRACTED]
  src/features/resume/ResumePreview.tsx → src/lib/utils.ts
- `SelectLabel()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/select.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (53 total, 9 thin omitted)

### Community 0 - "portfolio-admin.ts"
Cohesion: 0.06
Nodes (73): AdminMediaPage, AdminSubmissionsPage, mergeSiteConfig(), isImageFileName(), isStorageFolder(), joinMediaPath(), MediaPicker(), onUpload() (+65 more)

### Community 1 - "technologies.ts"
Cohesion: 0.05
Nodes (56): src_assets_logos_brainpulses, src_assets_logos_disha, src_assets_logos_levelup, src_assets_logos_navdrishti, src_assets_logos_ngi_logo, src_assets_logos_personal_portfolio, src_assets_tech_azure, src_assets_tech_docker (+48 more)

### Community 2 - "terminal.ts"
Cohesion: 0.06
Nodes (46): CommandTerminal, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_medium, src_assets_fonts_jetbrains_mono_nerd_jetbrainsmononerdfont_regular, DesktopNavDropdown(), defaultNavStructure, isNavGroupActive(), isNavLinkActive(), isRouteActive() (+38 more)

### Community 3 - "seed-portfolio.ts"
Cohesion: 0.06
Nodes (42): dotenv, ref_node_fs, ref_node_path, ref_node_url, @supabase/supabase-js, resolve(), basename(), listAll() (+34 more)

### Community 4 - "react-router-dom"
Cohesion: 0.10
Nodes (29): react-router-dom, Select(), SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton() (+21 more)

### Community 5 - "usePortfolio"
Cohesion: 0.14
Nodes (25): OverlayCard(), ScrollFadeIn(), ScrollFadeProps, Reveal(), RevealProps, SectionHeader(), SectionHeaderProps, EngineeringAreas() (+17 more)

### Community 6 - "publicRoutes.tsx"
Cohesion: 0.09
Nodes (17): caseStudyLoader(), prefetchPublicRoute(), routeLoaders, AboutPage, AutomationPage, ExperiencePage, HomePage, InfrastructurePage (+9 more)

### Community 7 - "package.json"
Cohesion: 0.07
Nodes (25): name, private, type, version, autoskills, clsx, @fontsource/jetbrains-mono, @fontsource-variable/inter (+17 more)

### Community 8 - "Seo.tsx"
Cohesion: 0.12
Nodes (15): ContactPage, NotFoundPage, PhilosophyPage, ResumePage, Seo(), SeoProps, ContactPanel(), PreviewModeContext (+7 more)

### Community 9 - "cn"
Cohesion: 0.19
Nodes (16): CursorGlow(), DesktopNavLink(), ThemeToggle(), Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader() (+8 more)

### Community 10 - "react"
Cohesion: 0.18
Nodes (14): lucide-react, react, MagneticButton(), MagneticButtonProps, variantHoverClasses, Button(), buttonVariants, Input() (+6 more)

### Community 11 - "types/portfolio.ts"
Cohesion: 0.11
Nodes (21): ArchitectureFlow(), ArchitectureFlowProps, PortfolioDraft, ArchitectureNode, CaseStudyChallenge, CaseStudyDecision, CaseStudyLink, CaseStudyStackGroup (+13 more)

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
Cohesion: 0.16
Nodes (12): AppShell(), CursorGlow, PageRouteSkeleton(), AdminDataLayout(), KONAMI, useKonami(), PortfolioContext, usePublicPortfolioQuery() (+4 more)

### Community 16 - "lib/portfolio.ts"
Cohesion: 0.18
Nodes (15): CaseStudyRoutePage, MediaCarousel(), TechBanner(), CaseStudyPage(), CaseStudyPageProps, TOC, categoryLabels, categoryPaths (+7 more)

### Community 17 - "AdminSitePages.tsx"
Cohesion: 0.16
Nodes (16): AdminSiteBrandPage, AdminSiteCategoriesPage, AdminSiteContentPage, AdminSiteFlagsPage, AdminSiteNavigationPage, AdminSiteSeoPage, AdminSiteBrandPage(), AdminSiteCategoriesPage() (+8 more)

### Community 18 - "OverlayCard.tsx"
Cohesion: 0.18
Nodes (12): OverlayCardBanner(), OverlayCardProps, OverlayCardShell(), OverlayCardSize, SurfaceCard(), SurfaceCardProps, ScrollToTopButton(), usePrefersReducedMotion() (+4 more)

### Community 19 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, build:analyze, db:dedupe-media, db:dedupe-media:prod, db:push, db:reset, db:seed (+9 more)

### Community 20 - "supabase.ts"
Cohesion: 0.25
Nodes (13): AdminLoginPage, AdminGuard(), isAdminSession(), getAdminBasePath(), getSupabaseAnonKey(), getSupabaseUrl(), required(), RESUME_BUCKET (+5 more)

### Community 21 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 22 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, autoskills, dotenv, oxlint, prettier, rollup-plugin-visualizer, tailwindcss, @tailwindcss/vite (+8 more)

### Community 23 - "@tanstack/react-query"
Cohesion: 0.20
Nodes (11): next-themes, react-dom, react-helmet-async, @tanstack/react-query, router, ThemeColorMeta(), ThemeProvider(), PreviewRoot() (+3 more)

### Community 24 - "Footer.tsx"
Cohesion: 0.19
Nodes (12): Footer(), MobileNavContent(), Navbar(), flattenNav(), navItems, ALLOWED_TOKEN_KEYS, isSafeCssValue(), SiteBrandApplier() (+4 more)

### Community 25 - "fields/index.ts"
Cohesion: 0.22
Nodes (9): Field(), FieldProps, ImageField(), ImageFieldProps, PairListField(), moveItem(), SwitchField(), SwitchFieldProps (+1 more)

### Community 26 - "CaseStudyCard.tsx"
Cohesion: 0.23
Nodes (11): OverlayCardStat, CaseStudyCard(), CaseStudyCardProps, categoryGradients, getCaseStudyStats(), CaseStudyGridProps, RelatedCaseStudies(), getCaseStudyPath() (+3 more)

### Community 27 - "MediaCarousel.tsx"
Cohesion: 0.23
Nodes (9): LightboxModal(), LightboxModalProps, LogoFrame(), LogoFrameProps, LogoFrameVariant, variantStyles, MediaCarouselProps, AspectRatio() (+1 more)

### Community 28 - "AdminContentPages.tsx"
Cohesion: 0.24
Nodes (9): adminBase, AdminPhilosophyPage, AdminResumePage, AdminTechnologiesPage, AdminTerminalPage, AdminTimelinePage, technologyCategories, resumeTabs (+1 more)

### Community 29 - "AdminCaseStudiesPage.tsx"
Cohesion: 0.18
Nodes (10): AdminCaseStudiesPage, AdminCaseStudyEditPage, AdminSection(), AdminSectionProps, PageHeader(), PageHeaderProps, emptyStudy(), TabId (+2 more)

### Community 30 - "radix-ui"
Cohesion: 0.27
Nodes (8): class-variance-authority, radix-ui, Switch(), ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 31 - "BootSequence.tsx"
Cohesion: 0.33
Nodes (9): BootSequence, BootSequence(), BootSequenceProps, isBackForward(), isHardReload(), lastLoadAt(), navigationEntry(), prefersReducedMotion() (+1 more)

### Community 32 - "AdminDashboardPage.tsx"
Cohesion: 0.25
Nodes (9): AdminDashboardPage, AdminProfilePage, src_features_admin_adminpreviewoverlay_adminpreviewoverlay, SaveBar(), portfolioQueryKey, AdminProfilePage(), save(), upsertSiteProfile() (+1 more)

### Community 33 - "20260827194842_portfolio_schema.sql"
Cohesion: 0.18
Nodes (9): public.case_studies, public.contact_submissions, public.philosophy_pillars, public.resume_sections, public.site_profile, public.site_settings, public.technologies, public.terminal_commands (+1 more)

### Community 34 - "HeroSection.tsx"
Cohesion: 0.27
Nodes (7): framer-motion, AnimatedGrid(), GradientBlobs(), AnimatedCounter(), AnimatedCounterProps, HeroSection(), fadeUp

### Community 35 - "CategoryWorkPage.tsx"
Cohesion: 0.31
Nodes (7): SiteConfigPathResolver, CaseStudyGrid(), getCaseStudiesByCategory(), getCategoryByPath(), CategoryWorkPage(), CategoryWorkPageProps, SiteConfigPathResolver()

### Community 36 - "ResumePreview.tsx"
Cohesion: 0.31
Nodes (6): Badge(), badgeVariants, Separator(), CaseStudyLink(), ResumePreview(), SectionBlock()

### Community 37 - "motion.ts"
Cohesion: 0.29
Nodes (6): PageTransition(), easeOut, fadeIn, pageTransition, scaleIn, staggerContainer

### Community 38 - "theme-view-transition.ts"
Cohesion: 0.48
Nodes (6): animateThemeTransition(), applyHtmlClass(), canAnimate(), injectBaseStyles(), removeAnimStyle(), ViewTransition

### Community 39 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 40 - "TechBanner.tsx"
Cohesion: 0.40
Nodes (4): TechBadge(), TechBadgeProps, TechBannerProps, Technology

### Community 41 - "tsconfig.json"
Cohesion: 0.33
Nodes (5): compilerOptions, baseUrl, paths, files, references

### Community 42 - "vite-env.d.ts"
Cohesion: 0.50
Nodes (3): ImportMeta, ImportMetaEnv, *.ttf

### Community 44 - "StringListField"
Cohesion: 1.00
Nodes (3): StringListField(), addValue(), onKeyDown()

## Knowledge Gaps
- **253 isolated node(s):** `ResumeFileRow`, `CaseStudyLink`, `Technology`, `TechnologyCategory`, `MagneticButtonProps` (+248 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 318 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `portfolio-admin.ts`, `terminal.ts`, `react-router-dom`, `usePortfolio`, `publicRoutes.tsx`, `package.json`, `Seo.tsx`, `cn`, `types/portfolio.ts`, `AppShell.tsx`, `lib/portfolio.ts`, `AdminSitePages.tsx`, `OverlayCard.tsx`, `supabase.ts`, `@tanstack/react-query`, `Footer.tsx`, `fields/index.ts`, `MediaCarousel.tsx`, `AdminContentPages.tsx`, `AdminCaseStudiesPage.tsx`, `radix-ui`, `BootSequence.tsx`, `AdminDashboardPage.tsx`, `HeroSection.tsx`, `ResumePreview.tsx`, `motion.ts`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `portfolio-admin.ts`, `terminal.ts`, `react-router-dom`, `usePortfolio`, `react`, `types/portfolio.ts`, `lib/portfolio.ts`, `OverlayCard.tsx`, `Footer.tsx`, `fields/index.ts`, `CaseStudyCard.tsx`, `MediaCarousel.tsx`, `AdminCaseStudiesPage.tsx`, `radix-ui`, `AdminDashboardPage.tsx`, `HeroSection.tsx`, `CategoryWorkPage.tsx`, `ResumePreview.tsx`, `TechBanner.tsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `react-router-dom` connect `react-router-dom` to `terminal.ts`, `usePortfolio`, `publicRoutes.tsx`, `package.json`, `Seo.tsx`, `cn`, `react`, `AppShell.tsx`, `lib/portfolio.ts`, `OverlayCard.tsx`, `supabase.ts`, `@tanstack/react-query`, `Footer.tsx`, `CaseStudyCard.tsx`, `AdminContentPages.tsx`, `AdminCaseStudiesPage.tsx`, `AdminDashboardPage.tsx`, `CategoryWorkPage.tsx`, `ResumePreview.tsx`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `ResumeFileRow`, `CaseStudyLink`, `Technology` to the rest of the system?**
  _253 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `portfolio-admin.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06426484907497566 - nodes in this community are weakly interconnected._
- **Should `technologies.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.050921861281826165 - nodes in this community are weakly interconnected._
- **Should `terminal.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06108597285067873 - nodes in this community are weakly interconnected._