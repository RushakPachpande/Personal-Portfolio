import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/app/AppShell'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage })),
)
const WorkPage = lazy(() =>
  import('@/pages/WorkPage').then((module) => ({ default: module.WorkPage })),
)
const ProductDetailPage = lazy(() =>
  import('@/pages/ProductDetailPage').then((module) => ({ default: module.ProductDetailPage })),
)
const InfrastructurePage = lazy(() =>
  import('@/pages/InfrastructurePage').then((module) => ({ default: module.InfrastructurePage })),
)
const InitiativeDetailPage = lazy(() =>
  import('@/pages/InitiativeDetailPage').then((module) => ({
    default: module.InitiativeDetailPage,
  })),
)
const AutomationPage = lazy(() =>
  import('@/pages/AutomationPage').then((module) => ({ default: module.AutomationPage })),
)
const PhilosophyPage = lazy(() =>
  import('@/pages/PhilosophyPage').then((module) => ({ default: module.PhilosophyPage })),
)
const ExperiencePage = lazy(() =>
  import('@/pages/ExperiencePage').then((module) => ({ default: module.ExperiencePage })),
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
      { path: 'work', element: withSuspense(<WorkPage />) },
      { path: 'work/:slug', element: withSuspense(<ProductDetailPage />) },
      { path: 'infrastructure', element: withSuspense(<InfrastructurePage />) },
      { path: 'infrastructure/:slug', element: withSuspense(<InitiativeDetailPage />) },
      { path: 'automation', element: withSuspense(<AutomationPage />) },
      { path: 'philosophy', element: withSuspense(<PhilosophyPage />) },
      { path: 'experience', element: withSuspense(<ExperiencePage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: 'projects', element: <Navigate to="/work" replace /> },
      { path: 'projects/:slug', element: <Navigate to="/work" replace /> },
      { path: 'skills', element: <Navigate to="/about" replace /> },
      { path: 'resume', element: <Navigate to="/contact" replace /> },
      { path: '404', element: withSuspense(<NotFoundPage />) },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
])
