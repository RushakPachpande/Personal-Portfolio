import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/app/AppShell'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage })),
)
const ExperiencePage = lazy(() =>
  import('@/pages/ExperiencePage').then((module) => ({ default: module.ExperiencePage })),
)
const ProjectsPage = lazy(() =>
  import('@/pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })),
)
const ProjectDetailPage = lazy(() =>
  import('@/pages/ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage })),
)
const SkillsPage = lazy(() =>
  import('@/pages/SkillsPage').then((module) => ({ default: module.SkillsPage })),
)
const PhilosophyPage = lazy(() =>
  import('@/pages/PhilosophyPage').then((module) => ({ default: module.PhilosophyPage })),
)
const ResumePage = lazy(() =>
  import('@/pages/ResumePage').then((module) => ({ default: module.ResumePage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((module) => ({ default: module.ContactPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
)

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center font-mono text-sm text-muted-foreground">
      Loading systems...
    </div>
  )
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: 'experience', element: withSuspense(<ExperiencePage />) },
      { path: 'projects', element: withSuspense(<ProjectsPage />) },
      { path: 'projects/:slug', element: withSuspense(<ProjectDetailPage />) },
      { path: 'skills', element: withSuspense(<SkillsPage />) },
      { path: 'philosophy', element: withSuspense(<PhilosophyPage />) },
      { path: 'resume', element: withSuspense(<ResumePage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: '404', element: withSuspense(<NotFoundPage />) },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
])
