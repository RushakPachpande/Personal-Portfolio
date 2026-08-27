import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate, useParams } from 'react-router-dom'
import { AppShell } from '@/app/AppShell'
import { getAdminBasePath } from '@/lib/env'
import { AdminGuard } from '@/features/admin/AdminGuard'
import { AdminDataLayout } from '@/features/admin/AdminDataLayout'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage })),
)
const PlatformsPage = lazy(() =>
  import('@/pages/PlatformsPage').then((module) => ({ default: module.PlatformsPage })),
)
const InfrastructurePage = lazy(() =>
  import('@/pages/InfrastructurePage').then((module) => ({ default: module.InfrastructurePage })),
)
const AutomationPage = lazy(() =>
  import('@/pages/AutomationPage').then((module) => ({ default: module.AutomationPage })),
)
const TechnologyLibraryPage = lazy(() =>
  import('@/pages/TechnologyLibraryPage').then((module) => ({
    default: module.TechnologyLibraryPage,
  })),
)
const CaseStudyRoutePage = lazy(() =>
  import('@/pages/CaseStudyRoutePage').then((module) => ({ default: module.CaseStudyRoutePage })),
)
const PhilosophyPage = lazy(() =>
  import('@/pages/PhilosophyPage').then((module) => ({ default: module.PhilosophyPage })),
)
const ExperiencePage = lazy(() =>
  import('@/pages/ExperiencePage').then((module) => ({ default: module.ExperiencePage })),
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
const AdminLoginPage = lazy(() =>
  import('@/pages/admin/AdminLoginPage').then((module) => ({ default: module.AdminLoginPage })),
)
const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((module) => ({ default: module.AdminDashboardPage })),
)
const AdminProfilePage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((module) => ({ default: module.AdminProfilePage })),
)
const AdminCaseStudiesPage = lazy(() =>
  import('@/pages/admin/AdminCaseStudiesPage').then((module) => ({ default: module.AdminCaseStudiesPage })),
)
const AdminCaseStudyEditPage = lazy(() =>
  import('@/pages/admin/AdminCaseStudiesPage').then((module) => ({ default: module.AdminCaseStudyEditPage })),
)
const AdminTechnologiesPage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({ default: module.AdminTechnologiesPage })),
)
const AdminTimelinePage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({ default: module.AdminTimelinePage })),
)
const AdminPhilosophyPage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({ default: module.AdminPhilosophyPage })),
)
const AdminResumePage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({ default: module.AdminResumePage })),
)
const AdminTerminalPage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({ default: module.AdminTerminalPage })),
)
const AdminSubmissionsPage = lazy(() =>
  import('@/pages/admin/AdminInboxPages').then((module) => ({ default: module.AdminSubmissionsPage })),
)
const AdminMediaPage = lazy(() =>
  import('@/pages/admin/AdminInboxPages').then((module) => ({ default: module.AdminMediaPage })),
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

function PlatformCaseStudyPage() {
  return (
    <CaseStudyRoutePage
      category="platform"
      listPath="/platforms"
      listLabel="Platforms"
    />
  )
}

function InfrastructureCaseStudyPage() {
  return (
    <CaseStudyRoutePage
      category="infrastructure"
      listPath="/infrastructure"
      listLabel="Infrastructure"
    />
  )
}

function AutomationCaseStudyPage() {
  return (
    <CaseStudyRoutePage
      category="automation"
      listPath="/automation"
      listLabel="Automation"
    />
  )
}

function WorkSlugRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/platforms/${slug}` : '/platforms'} replace />
}

function AdminCaseStudyRoute() {
  const { slug } = useParams()
  return <AdminCaseStudyEditPage slug={slug === 'new' ? undefined : slug} />
}

const adminBase = getAdminBasePath().replace(/^\//, '')

export const router = createBrowserRouter([
  {
    path: adminBase,
    children: [
      { path: 'login', element: withSuspense(<AdminLoginPage />) },
      {
        element: (
          <AdminGuard>
            <AdminDataLayout />
          </AdminGuard>
        ),
        children: [
          { index: true, element: withSuspense(<AdminDashboardPage />) },
          { path: 'profile', element: withSuspense(<AdminProfilePage />) },
          { path: 'case-studies', element: withSuspense(<AdminCaseStudiesPage />) },
          { path: 'case-studies/:slug', element: withSuspense(<AdminCaseStudyRoute />) },
          { path: 'technologies', element: withSuspense(<AdminTechnologiesPage />) },
          { path: 'timeline', element: withSuspense(<AdminTimelinePage />) },
          { path: 'philosophy', element: withSuspense(<AdminPhilosophyPage />) },
          { path: 'resume', element: withSuspense(<AdminResumePage />) },
          { path: 'terminal', element: withSuspense(<AdminTerminalPage />) },
          { path: 'submissions', element: withSuspense(<AdminSubmissionsPage />) },
          { path: 'media', element: withSuspense(<AdminMediaPage />) },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: 'platforms', element: withSuspense(<PlatformsPage />) },
      {
        path: 'platforms/:slug',
        element: withSuspense(<PlatformCaseStudyPage />),
      },
      { path: 'infrastructure', element: withSuspense(<InfrastructurePage />) },
      {
        path: 'infrastructure/:slug',
        element: withSuspense(<InfrastructureCaseStudyPage />),
      },
      { path: 'automation', element: withSuspense(<AutomationPage />) },
      { path: 'technology-library', element: withSuspense(<TechnologyLibraryPage />) },
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
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
])
