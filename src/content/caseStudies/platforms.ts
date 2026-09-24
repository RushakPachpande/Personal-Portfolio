import navdrishtiLogo from '@/assets/logos/navdrishti.png';
import brainpulsesLogo from '@/assets/logos/brainpulses.png';
import dishaLogo from '@/assets/logos/disha.png';
import levelupLogo from '@/assets/logos/levelup.png';
import personalPortfolioLogo from '@/assets/logos/personal-portfolio.svg';
import n8nLogo from '@/assets/tech/n8n.svg';
import type { CaseStudy } from './types';

export const platformCaseStudies: CaseStudy[] = [
  {
    slug: 'navdrishti',
    category: 'platform',
    name: 'Navdrishti',
    summary:
      'Role-based student placement management platform owned end-to-end.',
    status: 'Final development, validation, and rollout',
    featured: true,
    difficulty: 'Complex',
    timeline: '2025 - Present',
    logo: navdrishtiLogo,
    logoAlt: 'Navdrishti logo',
    coverImage: navdrishtiLogo,
    coverImageAlt: 'Navdrishti platform branding',
    technologyIds: [
      'react',
      'typescript',
      'supabase',
      'postgresql',
      'docker',
      'github-actions',
      'azure',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Docker',
      'GitHub Actions',
      'Azure',
    ],
    stack: [
      { group: 'Frontend', items: ['React', 'TypeScript'] },
      {
        group: 'Backend & Data',
        items: ['Supabase', 'PostgreSQL', 'RBAC', 'RLS'],
      },
      {
        group: 'Infrastructure',
        items: ['Docker', 'Azure', 'Multi-environment deploy'],
      },
      { group: 'Delivery', items: ['GitHub Actions', 'CI/CD'] },
    ],
    businessContext:
      'The organization needed a student placement management platform that could support role-based access, auditability, and reliable environments-without fragile handoffs between design, development, and operations.',
    problem:
      'Building and operating a placement platform requires more than UI features: secure data access, environment separation, deployment discipline, and clear ownership through validation and rollout.',
    objective:
      'Deliver a production-ready placement platform with secure RBAC, scalable data design, CI/CD, and local/staging/production environments ready for rollout.',
    solution:
      'Took primary technical ownership of Navdrishti: designed application architecture, secure RBAC with Row Level Security on PostgreSQL via Supabase, responsive React interfaces, audit logging, CI/CD pipelines, and multi-environment deployment workflows.',
    architecture:
      'React/TypeScript client against a Supabase-backed PostgreSQL data layer with RBAC and RLS. Application environments separated across local, staging, and production. Docker packaging and GitHub Actions drive repeatable releases onto Azure-hosted infrastructure.',
    architectureNodes: [
      {
        id: 'navdrishti-frontend',
        label: 'Frontend',
        detail: 'React + TypeScript role-aware user interface.',
      },
      {
        id: 'navdrishti-data',
        label: 'Backend & Data',
        detail: 'Supabase + PostgreSQL with RBAC and RLS enforcement.',
      },
      {
        id: 'navdrishti-cloud',
        label: 'Cloud Infrastructure',
        detail: 'Dockerized deployments across Azure environments.',
      },
      {
        id: 'navdrishti-delivery',
        label: 'Delivery',
        detail: 'GitHub Actions CI/CD for repeatable releases.',
      },
    ],
    responsibilities: [
      'Architecture',
      'Planning',
      'Development',
      'Deployment',
      'Infrastructure alignment',
      'Documentation',
      'Production readiness',
    ],
    decisions: [
      {
        decision: 'Supabase + PostgreSQL with RBAC/RLS',
        rationale:
          'Needed a secure, role-aware data layer without building auth and authorization from scratch, while keeping a scalable relational model for placement workflows.',
      },
      {
        decision: 'React + TypeScript for the interface',
        rationale:
          'Component-driven UI with type safety supports complex role-based flows and long-term maintainability under active ownership.',
      },
      {
        decision: 'CI/CD and multi-environment deployment',
        rationale:
          'Placement platforms fail when staging and production drift. Explicit environments and automated pipelines reduce release risk during rollout.',
      },
      {
        decision: 'Docker + Azure hosting alignment',
        rationale:
          'Containerized delivery keeps local, staging, and production closer together while fitting the organization’s Azure footprint.',
      },
    ],
    challenges: [
      {
        challenge:
          'Balancing delivery speed with production hardening during final validation and rollout.',
        resolution:
          'Prioritized RBAC/RLS, audit logging, and environment separation early so feature work landed on a foundation that could be operated safely.',
      },
      {
        challenge:
          'Keeping development, staging, and production coherent as the platform matured.',
        resolution:
          'Established CI/CD and deployment workflows that treat environments as first-class parts of the product, not afterthoughts.',
      },
    ],
    outcome:
      'Established end-to-end technical ownership of Navdrishti with CI/CD and environment separation supporting future platform scalability through final development, validation, and rollout.',
    learnings: [
      'Ownership means carrying architecture, access control, and deployability-not only feature tickets.',
      'RBAC and environment discipline are product requirements when the system handles real institutional workflows.',
      'CI/CD is how multi-environment platforms stay honest under change.',
    ],
    gallery: [
      {
        src: navdrishtiLogo,
        caption:
          'Navdrishti platform branding used across production environments.',
        type: 'screenshot',
      },
      {
        src: n8nLogo,
        caption:
          'Related delivery and ops tooling used alongside platform ownership practices.',
        type: 'deployment',
      },
    ],
    relatedSlugs: [
      'brainpulses',
      'disha',
      'levelup',
      'personal-portfolio',
      'self-hosted-supabase',
      'azure-infrastructure',
      'docker-deployment',
    ],
  },
  {
    slug: 'brainpulses',
    category: 'platform',
    name: 'BrainPulses',
    summary:
      'Production quiz platform maintained through live events and evolution toward 2.0.',
    status: 'Production',
    featured: true,
    difficulty: 'Advanced',
    timeline: '2025 - Present',
    logo: brainpulsesLogo,
    logoAlt: 'BrainPulses logo',
    coverImage: brainpulsesLogo,
    coverImageAlt: 'BrainPulses platform branding',
    technologyIds: ['react', 'javascript', 'mongodb', 'azure', 'n8n'],
    technologies: ['React', 'JavaScript', 'MongoDB', 'Azure Storage', 'n8n'],
    stack: [
      { group: 'Frontend', items: ['React', 'JavaScript'] },
      { group: 'Backend & Data', items: ['MongoDB'] },
      { group: 'Cloud', items: ['Azure Storage'] },
      { group: 'Automation', items: ['n8n'] },
    ],
    businessContext:
      'BrainPulses is a live quiz platform used for large-scale events and client-specific experiences. It needed ongoing production care-not a one-time build-and-forget delivery.',
    problem:
      'Production quiz events expose reliability and UX gaps quickly. The platform required continuous fixes, enhancements, customizations, and a clearer path toward a more maintainable next-generation architecture.',
    objective:
      'Keep the production platform reliable for live events while improving UX and defining BrainPulses 2.0 architecture for scalability and maintainability.',
    solution:
      'Maintained and enhanced BrainPulses through production fixes, feature work, UI improvements, and client-specific customizations. Supported large-scale live quiz events and designed a BrainPulses 2.0 prototype architecture.',
    architecture:
      'React front end with JavaScript application logic, MongoDB for application data, Azure Storage for supporting assets, and n8n where workflow automation supports operations. Evolution work focuses on clearer boundaries for a more maintainable 2.0 architecture.',
    architectureNodes: [
      {
        id: 'brainpulses-frontend',
        label: 'Frontend',
        detail: 'React UI optimized for live event interaction.',
      },
      {
        id: 'brainpulses-data',
        label: 'Data Layer',
        detail: 'MongoDB-backed content and quiz event data.',
      },
      {
        id: 'brainpulses-storage',
        label: 'Cloud Assets',
        detail: 'Azure Storage for supporting media and artifacts.',
      },
      {
        id: 'brainpulses-automation',
        label: 'Operational Automation',
        detail: 'n8n workflows supporting platform operations.',
      },
    ],
    responsibilities: [
      'Production support',
      'Feature development',
      'UI improvements',
      'Client customizations',
      'Architecture planning (2.0)',
    ],
    decisions: [
      {
        decision: 'Invest in production maintenance before a full rewrite',
        rationale:
          'Live events cannot wait for a greenfield rebuild. Stability and targeted enhancements protect business continuity while 2.0 architecture is designed.',
      },
      {
        decision: 'Prototype BrainPulses 2.0 architecture separately',
        rationale:
          'Improving scalability and maintainability requires deliberate architecture work without destabilizing the current production path.',
      },
      {
        decision: 'Use n8n where operational workflows help',
        rationale:
          'Automation reduces repetitive operational load around a live platform without forcing every process into the core application.',
      },
    ],
    challenges: [
      {
        challenge:
          'Supporting large-scale live quiz events while continuing feature and UI work.',
        resolution:
          'Treated production reliability as the primary constraint-fixes and customizations were validated against real event pressure.',
      },
      {
        challenge:
          'Improving maintainability without disrupting an active production platform.',
        resolution:
          'Separated near-term production care from BrainPulses 2.0 architecture planning so evolution could proceed without reckless rewrites.',
      },
    ],
    outcome:
      'Sustained production operations for live events while defining a clearer architecture path for BrainPulses 2.0.',
    learnings: [
      'Production ownership is continuous: events reveal what architecture and process must absorb.',
      'Prototype the next architecture while protecting the system that currently earns trust.',
      'Client-specific needs should not permanently fracture a platform-document and contain them.',
    ],
    gallery: [
      {
        src: brainpulsesLogo,
        caption:
          'BrainPulses production platform identity from live event deployments.',
        type: 'screenshot',
      },
      {
        src: n8nLogo,
        caption:
          'n8n operational automation supporting live quiz platform operations.',
        type: 'workflow',
      },
    ],
    relatedSlugs: [
      'navdrishti',
      'disha',
      'levelup',
      'self-hosted-n8n',
      'azure-infrastructure',
    ],
  },
  {
    slug: 'disha',
    category: 'platform',
    name: 'DISHA',
    summary:
      'ASM’s multi-college PGDM induction platform: QR geofenced attendance, timed quizzes, assessments, and live leaderboards.',
    status: 'Production',
    featured: true,
    difficulty: 'Complex',
    timeline: '2025 - Present',
    logo: dishaLogo,
    logoAlt: 'DISHA / ASM logo',
    coverImage: dishaLogo,
    coverImageAlt: 'DISHA induction platform branding',
    technologyIds: [
      'react',
      'typescript',
      'postgresql',
      'docker',
      'azure',
      'github-actions',
      'rest-apis',
      'linux',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'Socket.IO',
      'Docker',
      'Azure',
      'GitHub Actions',
    ],
    stack: [
      { group: 'Frontends', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind'] },
      {
        group: 'API & Data',
        items: ['Express', 'Prisma', 'PostgreSQL', 'Redis', 'Socket.IO'],
      },
      {
        group: 'Product capabilities',
        items: ['QR attendance', 'Geofence', 'Quizzes', 'Leaderboards'],
      },
      {
        group: 'Delivery',
        items: ['Docker', 'Azure Static Web Apps', 'PM2', 'Nginx', 'GitHub Actions'],
      },
    ],
    businessContext:
      'ASM needed a dedicated induction experience for PGDM cohorts-attendance, quizzes, assessments, reflections, and competition-across multiple colleges without bolting onto an unrelated assessment product.',
    problem:
      'Induction programs fail when attendance is manual, quizzes are offline, and leaderboards lag. Multi-college delivery also needs isolation, live updates, and admin tooling that non-engineers can operate during events.',
    objective:
      'Ship a production induction platform with student and admin portals, realtime attendance and ranks, timed assessments, and multi-college program scoping.',
    solution:
      'Built DISHA as a three-app monorepo: Express/Prisma API with Redis and Socket.IO, plus React student and admin SPAs. Delivered QR + camera attendance with GPS geofence, BrainPulse quizzes, Enneagram assessments, daily reflections, mentor views, and hall-display leaderboards.',
    architecture:
      'Student and admin Vite/React clients talk to a Node Express API backed by PostgreSQL (Prisma) and Redis. Socket.IO pushes live attendance and leaderboard updates. Frontends deploy to Azure Static Web Apps; the API runs on a VPS behind Nginx/PM2 with Dockerized Postgres and Redis.',
    architectureNodes: [
      {
        id: 'disha-student',
        label: 'Student portal',
        detail: 'React SPA for registration, attendance, quizzes, and ranks.',
      },
      {
        id: 'disha-admin',
        label: 'Admin portal',
        detail: 'Program ops: sessions, QR present mode, content, and exports.',
      },
      {
        id: 'disha-api',
        label: 'API',
        detail: 'Express + Prisma + Redis with Socket.IO realtime channels.',
      },
      {
        id: 'disha-delivery',
        label: 'Delivery',
        detail: 'Azure SWA frontends + VPS API with Docker data services.',
      },
    ],
    responsibilities: [
      'Product architecture',
      'Full-stack development',
      'Realtime attendance design',
      'Multi-college data model',
      'Admin UX for live events',
      'Deployment and ops runbooks',
    ],
    decisions: [
      {
        decision: 'Separate induction product from LevelUP',
        rationale:
          'Induction workflows (geofence, group competition, reflections) diverge from school assessment flows; a dedicated system stays clearer and safer to operate.',
      },
      {
        decision: 'Server-authoritative quizzes and Socket.IO live updates',
        rationale:
          'Live events need trustworthy timers and immediate occupancy/leaderboard feedback without fragile client polling.',
      },
      {
        decision: 'QR + geofenced attendance',
        rationale:
          'Physical presence for induction sessions requires both a scannable session token and location checks to reduce proxy attendance.',
      },
      {
        decision: 'Azure SWA + VPS API split',
        rationale:
          'Static frontends scale cheaply on Azure while the API retains Socket.IO, Redis, and Postgres control on a managed VPS.',
      },
    ],
    challenges: [
      {
        challenge:
          'Operating live induction days with concurrent attendance, quizzes, and hall displays.',
        resolution:
          'Prioritized projector present mode, Socket.IO occupancy, and admin release controls so staff could run the floor without engineering intervention.',
      },
      {
        challenge: 'Multi-college isolation after DISHA cutover.',
        resolution:
          'Program-scoped colleges/courses/groups with admin boundaries and import paths that keep cohort data separated.',
      },
    ],
    outcome:
      'Production induction platform live for ASM PGDM cohorts with student and admin portals, geofenced attendance, timed quizzes, and live leaderboards.',
    learnings: [
      'Event-day products succeed when admin tooling is as first-class as the student experience.',
      'Realtime channels turn attendance and ranks from reports into live operations.',
      'Separating product domains (induction vs assessment) prevents conflicting requirements from warping architecture.',
    ],
    gallery: [
      {
        src: dishaLogo,
        caption: 'DISHA / ASM branding used across student and admin portals.',
        type: 'screenshot',
      },
    ],
    links: [
      {
        label: 'Student portal',
        url: 'https://pgdminduction.nextgeninnov8.com',
      },
      {
        label: 'Admin portal',
        url: 'https://admin.pgdminduction.nextgeninnov8.com',
      },
    ],
    relatedSlugs: [
      'levelup',
      'brainpulses',
      'personal-portfolio',
      'azure-infrastructure',
      'docker-deployment',
    ],
  },
  {
    slug: 'levelup',
    category: 'platform',
    name: 'LevelUP',
    summary:
      'Zapienz LevelUP-intelligent school assessment platform with timed multi-subject quizzes, AI-assisted grading, and hardened session security.',
    status: 'Production',
    featured: true,
    difficulty: 'Complex',
    timeline: '2025 - Present',
    logo: levelupLogo,
    logoAlt: 'Zapienz LevelUP logo',
    coverImage: levelupLogo,
    coverImageAlt: 'LevelUP assessment platform branding',
    technologyIds: [
      'react',
      'typescript',
      'postgresql',
      'docker',
      'azure',
      'github-actions',
      'rest-apis',
      'linux',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Express',
      'Prisma',
      'PostgreSQL',
      'JWT',
      'TOTP MFA',
      'OpenRouter',
      'Azure',
      'Docker',
    ],
    stack: [
      { group: 'Frontends', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'shadcn'] },
      {
        group: 'API & Data',
        items: ['Express', 'Prisma', 'PostgreSQL', 'Zod', 'ExcelJS'],
      },
      {
        group: 'Security',
        items: ['JWT refresh cookies', 'TOTP MFA', 'Trusted devices', 'Single active session'],
      },
      {
        group: 'Delivery',
        items: ['Azure Static Web Apps', 'nginx', 'pm2', 'Docker Compose', 'GitHub Actions'],
      },
    ],
    businessContext:
      'Schools needed a reliable way to run timed, multi-subject assessments for students (grades configurable) with admin control over banks, windows, scoring review, and Excel reporting.',
    problem:
      'Assessment platforms fail when timers are client-trusted, sessions can be shared, subjective answers lack review, and admins cannot publish/close windows cleanly.',
    objective:
      'Deliver a production assessment stack: student portal by registration ID, admin console with MFA, server-enforced deadlines, objective auto-grade plus AI-assisted subjective review, and exportable reports.',
    solution:
      'Built LevelUP as API + student SPA + admin SPA. Attempts use wall-clock deadlines with a server sweeper; auth enforces one active session with force-login kick and optional TOTP. Question banks support nested types and CSV/XLSX import; subjective answers can route through OpenRouter with human review.',
    architecture:
      'Dual React SPAs against a single Express/Prisma PostgreSQL API. Auth uses HttpOnly refresh cookies, optional TOTP, and trusted devices. Frontends host on Azure Static Web Apps; API on Ubuntu VM (nginx/pm2) with Dockerized Postgres.',
    architectureNodes: [
      {
        id: 'levelup-student',
        label: 'Student portal',
        detail: 'Registration-ID login and forward-only timed subject rounds.',
      },
      {
        id: 'levelup-admin',
        label: 'Admin console',
        detail: 'Banks, assessments, MFA sessions, review, and Excel reports.',
      },
      {
        id: 'levelup-api',
        label: 'API',
        detail: 'Express + Prisma with server-authoritative attempt lifecycle.',
      },
      {
        id: 'levelup-ai',
        label: 'Grading assist',
        detail: 'Objective auto-grade plus optional OpenRouter subjective path.',
      },
    ],
    responsibilities: [
      'Platform architecture',
      'Assessment lifecycle design',
      'Session security',
      'Admin and student UX',
      'Scoring and reporting',
      'Production deployment',
    ],
    decisions: [
      {
        decision: 'Server-authoritative quiz deadlines',
        rationale:
          'Wall-clock enforcement and an in-process sweeper prevent clients from extending attempts by refreshing or leaving the tab.',
      },
      {
        decision: 'Single active session with MFA options',
        rationale:
          'Shared credentials are a real risk in school settings; force-login and TOTP reduce simultaneous abuse without blocking legitimate use.',
      },
      {
        decision: 'Split SPAs, single API',
        rationale:
          'Student and admin audiences diverge sharply; one API keeps scoring and permissions coherent while UIs stay focused.',
      },
      {
        decision: 'AI assist with human review for subjective items',
        rationale:
          'Heuristic/OpenRouter suggestions speed grading without removing admin accountability for final scores.',
      },
    ],
    challenges: [
      {
        challenge:
          'Keeping attempts fair when students reload, leave, or lose connectivity mid-quiz.',
        resolution:
          'Documented leave/reload discard rules before deadline, auto-submit on expiry, and server timers as the source of truth.',
      },
      {
        challenge: 'Admin operational load for banks, windows, and exports.',
        resolution:
          'CSV/XLSX import, streaming Excel export, publish/close windows, and prune tools for attempt hygiene.',
      },
    ],
    outcome:
      'Live school assessment platform at levelup.fureinc.com with admin console, MFA-capable sessions, timed multi-subject assessments, and AI-assisted subjective review.',
    learnings: [
      'Fairness in assessments is an architecture problem, not a UI timer.',
      'Session security belongs in the product model for shared-device environments.',
      'AI grading is valuable when it accelerates review queues rather than replacing judgment.',
    ],
    gallery: [
      {
        src: levelupLogo,
        caption: 'Zapienz LevelUP brand mark used on student and admin portals.',
        type: 'screenshot',
      },
    ],
    links: [
      { label: 'Student portal', url: 'https://levelup.fureinc.com' },
      { label: 'Admin console', url: 'https://admin.levelup.fureinc.com' },
    ],
    relatedSlugs: [
      'disha',
      'brainpulses',
      'personal-portfolio',
      'azure-infrastructure',
      'docker-deployment',
    ],
  },
  {
    slug: 'personal-portfolio',
    category: 'platform',
    name: 'Personal Portfolio Studio',
    summary:
      'One-of-a-kind portfolio platform with a full Studio CMS-projects, logos, tech icons, chrome, nav, brand, and SEO editable without redeploying frontend code.',
    status: 'Production',
    featured: true,
    difficulty: 'Complex',
    timeline: '2025 - Present',
    logo: personalPortfolioLogo,
    logoAlt: 'Personal portfolio mark',
    coverImage: personalPortfolioLogo,
    coverImageAlt: 'Portfolio Studio branding',
    technologyIds: [
      'react',
      'typescript',
      'supabase',
      'postgresql',
      'docker',
      'github-actions',
      'azure',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind',
      'Supabase',
      'PostgreSQL',
      'Zod',
      'TanStack Query',
      'Framer Motion',
    ],
    stack: [
      { group: 'Frontend', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion'] },
      {
        group: 'CMS & Data',
        items: ['Supabase', 'PostgreSQL', 'RLS', 'Storage buckets', 'Zod'],
      },
      {
        group: 'Studio',
        items: ['Admin auth', 'Media library', 'Live preview', 'Site config'],
      },
      { group: 'Delivery', items: ['GitHub Actions', 'Azure', 'Docker'] },
    ],
    businessContext:
      'A personal portfolio should be a production product-not a static brochure. Content, logos, tech icons, and site chrome need to change without waiting on a code deploy every time.',
    problem:
      'Most portfolios hardcode case studies and marketing copy in the repo, so updates require engineering deploys. That blocks iteration and undercuts the claim of owning platforms end-to-end.',
    objective:
      'Build a portfolio that is itself a major platform case study: public site driven by Supabase, Studio CMS for all content and site configuration, and media pipelines for logos and assets.',
    solution:
      'Implemented a Supabase-backed public fetch layer and an authenticated Studio for profile, case studies, technologies, timeline, philosophy, resume PDFs, media, inbox, and site config (chrome, nav, categories, brand, SEO, flags). Featured flags and incomplete states are admin-controlled.',
    architecture:
      'Vite/React public app loads PortfolioData from Supabase (profile, settings.config jsonb, case studies, technologies, etc.) with RLS. Studio uses admin JWT claims for writes and Storage for portfolio-media / portfolio-resume. Seed scripts upload local assets into Storage for reproducible environments.',
    architectureNodes: [
      {
        id: 'portfolio-public',
        label: 'Public site',
        detail: 'React app rendering CMS-driven pages, case studies, and effects.',
      },
      {
        id: 'portfolio-studio',
        label: 'Studio CMS',
        detail: 'Admin UI for entities, media, and site configuration.',
      },
      {
        id: 'portfolio-data',
        label: 'Supabase',
        detail: 'PostgreSQL + RLS + Storage for content and assets.',
      },
      {
        id: 'portfolio-seed',
        label: 'Seed & ops',
        detail: 'TypeScript seed uploads logos and restores known-good defaults.',
      },
    ],
    responsibilities: [
      'Product design',
      'CMS architecture',
      'Public UX and motion',
      'RLS and admin auth',
      'Media pipelines',
      'Deployment',
    ],
    decisions: [
      {
        decision: 'Treat the portfolio as a CMS product',
        rationale:
          'Owning platforms means the portfolio itself should demonstrate no-deploy content operations, not only static storytelling.',
      },
      {
        decision: 'Supabase RLS with admin role in JWT app_metadata',
        rationale:
          'Public read / admin write stays enforceable in the database without a custom API server for content.',
      },
      {
        decision: 'site_settings.config jsonb for white-label chrome',
        rationale:
          'Nav, categories, brand tokens, and marketing copy change often; a single config document keeps Studio simple without dozens of tables.',
      },
      {
        decision: 'Featured flag on each case study',
        rationale:
          'Home spotlight should be editorial-toggle which projects appear without code or redeploys.',
      },
    ],
    challenges: [
      {
        challenge: 'Avoiding a second deploy every time copy or logos change.',
        resolution:
          'Moved entities and site chrome into Supabase; Studio edits publish immediately to the public fetch path.',
      },
      {
        challenge: 'Keeping seed, Storage, and live CMS paths aligned.',
        resolution:
          'Seed uploads assets to canonical Storage paths and merges config defaults so environments stay reproducible.',
      },
    ],
    outcome:
      'A production portfolio platform with Studio CMS ownership-case studies (including DISHA and LevelUP), tech logos, and site configuration editable without frontend redeploys.',
    learnings: [
      'A portfolio is more credible when it is operated like the platforms it describes.',
      'Config-driven chrome is what turns a content CMS into a white-label site.',
      'Editorial controls (featured, incomplete) belong next to the content, not in code.',
    ],
    gallery: [
      {
        src: personalPortfolioLogo,
        caption: 'Portfolio mark used for the Studio CMS case study.',
        type: 'screenshot',
      },
    ],
    links: [],
    relatedSlugs: [
      'disha',
      'levelup',
      'navdrishti',
      'self-hosted-supabase',
      'azure-infrastructure',
    ],
  },
];
