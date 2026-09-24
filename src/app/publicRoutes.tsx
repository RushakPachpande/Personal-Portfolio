import { Suspense, type ReactNode } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { PageRouteSkeleton } from '@/components/layout/PageRouteSkeleton';
import {
  AboutPage,
  AutomationCaseStudyPage,
  AutomationPage,
  ContactPage,
  ExperiencePage,
  HomePage,
  InfrastructureCaseStudyPage,
  InfrastructurePage,
  NotFoundPage,
  PhilosophyPage,
  PlatformCaseStudyPage,
  PlatformsPage,
  ResumePage,
  SiteConfigPathResolver,
  TechnologyLibraryPage,
  WorkSlugRedirect,
} from '@/app/publicPages';

export function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageRouteSkeleton />}>{element}</Suspense>;
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
