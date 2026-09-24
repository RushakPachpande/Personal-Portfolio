import { lazy } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { DevModeContext } from '@/hooks/useDevMode';

export const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage }))
);
export const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage }))
);
export const PlatformsPage = lazy(() =>
  import('@/pages/PlatformsPage').then((module) => ({
    default: module.PlatformsPage,
  }))
);
export const InfrastructurePage = lazy(() =>
  import('@/pages/InfrastructurePage').then((module) => ({
    default: module.InfrastructurePage,
  }))
);
export const AutomationPage = lazy(() =>
  import('@/pages/AutomationPage').then((module) => ({
    default: module.AutomationPage,
  }))
);
export const TechnologyLibraryPage = lazy(() =>
  import('@/pages/TechnologyLibraryPage').then((module) => ({
    default: module.TechnologyLibraryPage,
  }))
);
export const CaseStudyRoutePage = lazy(() =>
  import('@/pages/CaseStudyRoutePage').then((module) => ({
    default: module.CaseStudyRoutePage,
  }))
);
export const SiteConfigPathResolver = lazy(() =>
  import('@/pages/SiteConfigPathResolver').then((module) => ({
    default: module.SiteConfigPathResolver,
  }))
);
export const PhilosophyPage = lazy(() =>
  import('@/pages/PhilosophyPage').then((module) => ({
    default: module.PhilosophyPage,
  }))
);
export const ExperiencePage = lazy(() =>
  import('@/pages/ExperiencePage').then((module) => ({
    default: module.ExperiencePage,
  }))
);
export const ResumePage = lazy(() =>
  import('@/pages/ResumePage').then((module) => ({ default: module.ResumePage }))
);
export const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((module) => ({
    default: module.ContactPage,
  }))
);
export const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  }))
);

export function PlatformCaseStudyPage() {
  return (
    <CaseStudyRoutePage
      category="platform"
      listPath="/platforms"
      listLabel="Platforms"
    />
  );
}

export function InfrastructureCaseStudyPage() {
  return (
    <CaseStudyRoutePage
      category="infrastructure"
      listPath="/infrastructure"
      listLabel="Infrastructure"
    />
  );
}

export function AutomationCaseStudyPage() {
  return (
    <CaseStudyRoutePage
      category="automation"
      listPath="/automation"
      listLabel="Automation"
    />
  );
}

export function WorkSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/platforms/${slug}` : '/platforms'} replace />;
}

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
