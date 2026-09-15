import { lazy, Suspense, type ReactNode } from 'react';
import {
  Navigate,
  Outlet,
  useLocation,
  useParams,
  type RouteObject,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { PageRouteSkeleton } from '@/components/layout/PageRouteSkeleton';
import { DevModeContext } from '@/hooks/useDevMode';

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage }))
);
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage }))
);
const PlatformsPage = lazy(() =>
  import('@/pages/PlatformsPage').then((module) => ({
    default: module.PlatformsPage,
  }))
);
const InfrastructurePage = lazy(() =>
  import('@/pages/InfrastructurePage').then((module) => ({
    default: module.InfrastructurePage,
  }))
);
const AutomationPage = lazy(() =>
  import('@/pages/AutomationPage').then((module) => ({
    default: module.AutomationPage,
  }))
);
const TechnologyLibraryPage = lazy(() =>
  import('@/pages/TechnologyLibraryPage').then((module) => ({
    default: module.TechnologyLibraryPage,
  }))
);
const CaseStudyRoutePage = lazy(() =>
  import('@/pages/CaseStudyRoutePage').then((module) => ({
    default: module.CaseStudyRoutePage,
  }))
);
const SiteConfigPathResolver = lazy(() =>
  import('@/pages/SiteConfigPathResolver').then((module) => ({
    default: module.SiteConfigPathResolver,
  }))
);
const PhilosophyPage = lazy(() =>
  import('@/pages/PhilosophyPage').then((module) => ({
    default: module.PhilosophyPage,
  }))
);
const ExperiencePage = lazy(() =>
  import('@/pages/ExperiencePage').then((module) => ({
    default: module.ExperiencePage,
  }))
);
const ResumePage = lazy(() =>
  import('@/pages/ResumePage').then((module) => ({
    default: module.ResumePage,
  }))
);
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((module) => ({
    default: module.ContactPage,
  }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  }))
);

export function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageRouteSkeleton />}>{element}</Suspense>;
}

function PlatformCaseStudyPage() {
  return (
    <CaseStudyRoutePage
      category="platform"
      listPath="/platforms"
      listLabel="Platforms"
    />
  );
}

function InfrastructureCaseStudyPage() {
  return (
    <CaseStudyRoutePage
      category="infrastructure"
      listPath="/infrastructure"
      listLabel="Infrastructure"
    />
  );
}

function AutomationCaseStudyPage() {
  return (
    <CaseStudyRoutePage
      category="automation"
      listPath="/automation"
      listLabel="Automation"
    />
  );
}

function WorkSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/platforms/${slug}` : '/platforms'} replace />;
}

export const publicChildRoutes: RouteObject[] = [
  { index: true, element: withSuspense(<HomePage />) },
  { path: 'about', element: withSuspense(<AboutPage />) },
  { path: 'platforms', element: withSuspense(<PlatformsPage />) },
  {
    path: 'platforms/:slug',
    element: withSuspense(<PlatformCaseStudyPage />),
  },
  {
    path: 'infrastructure',
    element: withSuspense(<InfrastructurePage />),
  },
  {
    path: 'infrastructure/:slug',
    element: withSuspense(<InfrastructureCaseStudyPage />),
  },
  { path: 'automation', element: withSuspense(<AutomationPage />) },
  {
    path: 'technology-library',
    element: withSuspense(<TechnologyLibraryPage />),
  },
  {
    path: 'automation/:slug',
    element: withSuspense(<AutomationCaseStudyPage />),
  },
  { path: 'philosophy', element: withSuspense(<PhilosophyPage />) },
  { path: 'experience', element: withSuspense(<ExperiencePage />) },
  { path: 'resume', element: withSuspense(<ResumePage />) },
  { path: 'contact', element: withSuspense(<ContactPage />) },
  { path: 'work', element: <Navigate to="/platforms" replace /> },
  { path: 'work/:slug', element: <WorkSlugRedirect /> },
  { path: 'projects', element: <Navigate to="/platforms" replace /> },
  { path: 'projects/:slug', element: <WorkSlugRedirect /> },
  { path: 'skills', element: <Navigate to="/about" replace /> },
  { path: '404', element: withSuspense(<NotFoundPage />) },
  { path: '*', element: withSuspense(<SiteConfigPathResolver />) },
];

export function PreviewPublicChrome() {
  const location = useLocation();

  return (
    <DevModeContext.Provider value={{ unlocked: false }}>
      <Navbar onOpenTerminal={() => undefined} />
      <main className="grid min-h-[70vh] min-w-0 overflow-x-clip">
        <AnimatePresence>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </DevModeContext.Provider>
  );
}
