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
const AdminSiteContentPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteContentPage,
  }))
);
const AdminSiteNavigationPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteNavigationPage,
  }))
);
const AdminSiteCategoriesPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteCategoriesPage,
  }))
);
const AdminSiteBrandPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteBrandPage,
  }))
);
const AdminSiteSeoPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteSeoPage,
  }))
);
const AdminSiteFlagsPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteFlagsPage,
  }))
);

function AdminCaseStudyRoute() {
  const { slug } = useParams();
  return <AdminCaseStudyEditPage slug={slug === 'new' ? undefined : slug} />;
}

const adminBase = getAdminBasePath().replace(/^\//, '');

// Matches Vite's `base`, so the app works at "/" and at "/<repo>/" alike.
const routerBasename = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/';

export const router = createBrowserRouter(
  [
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
            {
              path: 'site/content',
              element: withSuspense(<AdminSiteContentPage />),
            },
            {
              path: 'site/navigation',
              element: withSuspense(<AdminSiteNavigationPage />),
            },
            {
              path: 'site/categories',
              element: withSuspense(<AdminSiteCategoriesPage />),
            },
            {
              path: 'site/brand',
              element: withSuspense(<AdminSiteBrandPage />),
            },
            { path: 'site/seo', element: withSuspense(<AdminSiteSeoPage />) },
            {
              path: 'site/flags',
              element: withSuspense(<AdminSiteFlagsPage />),
            },
          ],
        },
      ],
    },
    {
      path: '/',
      element: <AppShell />,
      children: publicChildRoutes,
    },
  ],
  { basename: routerBasename }
);
