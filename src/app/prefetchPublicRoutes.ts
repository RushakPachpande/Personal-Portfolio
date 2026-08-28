const routeLoaders: Record<string, () => Promise<unknown>> = {
  '/': () => import('@/pages/HomePage'),
  '/about': () => import('@/pages/AboutPage'),
  '/platforms': () => import('@/pages/PlatformsPage'),
  '/infrastructure': () => import('@/pages/InfrastructurePage'),
  '/automation': () => import('@/pages/AutomationPage'),
  '/technology-library': () => import('@/pages/TechnologyLibraryPage'),
  '/philosophy': () => import('@/pages/PhilosophyPage'),
  '/experience': () => import('@/pages/ExperiencePage'),
  '/resume': () => import('@/pages/ResumePage'),
  '/contact': () => import('@/pages/ContactPage'),
};

const caseStudyLoader = () => import('@/pages/CaseStudyRoutePage');

export function prefetchPublicRoute(path: string) {
  const exact = routeLoaders[path];
  if (exact) {
    void exact();
    return;
  }

  if (
    path.startsWith('/platforms/') ||
    path.startsWith('/infrastructure/') ||
    path.startsWith('/automation/')
  ) {
    void caseStudyLoader();
  }
}
