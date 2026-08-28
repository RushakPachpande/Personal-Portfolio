import { lazy } from 'react';
import { createBrowserRouter, useParams } from 'react-router-dom';
import { AppShell } from '@/app/AppShell';
import { publicChildRoutes, withSuspense } from '@/app/publicRoutes';
import { getAdminBasePath } from '@/lib/env';
import { AdminGuard } from '@/features/admin/AdminGuard';
import { AdminDataLayout } from '@/features/admin/AdminDataLayout';

const AdminLoginPage = lazy(() =>
  import('@/pages/admin/AdminLoginPage').then((module) => ({
    default: module.AdminLoginPage,
  }))
);
const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((module) => ({
    default: module.AdminDashboardPage,
  }))
);
const AdminProfilePage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((module) => ({
    default: module.AdminProfilePage,
  }))
);
const AdminCaseStudiesPage = lazy(() =>
  import('@/pages/admin/AdminCaseStudiesPage').then((module) => ({
    default: module.AdminCaseStudiesPage,
  }))
);
const AdminCaseStudyEditPage = lazy(() =>
  import('@/pages/admin/AdminCaseStudiesPage').then((module) => ({
    default: module.AdminCaseStudyEditPage,
  }))
);
const AdminTechnologiesPage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({
    default: module.AdminTechnologiesPage,
  }))
);
const AdminTimelinePage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({
    default: module.AdminTimelinePage,
  }))
);
const AdminPhilosophyPage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({
    default: module.AdminPhilosophyPage,
  }))
);
const AdminResumePage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({
    default: module.AdminResumePage,
  }))
);
const AdminTerminalPage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({
    default: module.AdminTerminalPage,
  }))
);
const AdminSubmissionsPage = lazy(() =>
  import('@/pages/admin/AdminInboxPages').then((module) => ({
    default: module.AdminSubmissionsPage,
  }))
);
const AdminMediaPage = lazy(() =>
  import('@/pages/admin/AdminInboxPages').then((module) => ({
    default: module.AdminMediaPage,
  }))
);

function AdminCaseStudyRoute() {
  const { slug } = useParams();
  return <AdminCaseStudyEditPage slug={slug === 'new' ? undefined : slug} />;
}

const adminBase = getAdminBasePath().replace(/^\//, '');

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
          {
            path: 'case-studies',
            element: withSuspense(<AdminCaseStudiesPage />),
          },
          {
            path: 'case-studies/:slug',
            element: withSuspense(<AdminCaseStudyRoute />),
          },
          {
            path: 'technologies',
            element: withSuspense(<AdminTechnologiesPage />),
          },
          { path: 'timeline', element: withSuspense(<AdminTimelinePage />) },
          {
            path: 'philosophy',
            element: withSuspense(<AdminPhilosophyPage />),
          },
          { path: 'resume', element: withSuspense(<AdminResumePage />) },
          { path: 'terminal', element: withSuspense(<AdminTerminalPage />) },
          {
            path: 'submissions',
            element: withSuspense(<AdminSubmissionsPage />),
          },
          { path: 'media', element: withSuspense(<AdminMediaPage />) },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <AppShell />,
    children: publicChildRoutes,
  },
]);
