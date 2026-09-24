import { createBrowserRouter } from 'react-router-dom';
import {
  AdminCaseStudiesPage,
  AdminCaseStudyRoute,
  AdminDashboardPage,
  AdminLoginPage,
  AdminMediaPage,
  AdminPhilosophyPage,
  AdminProfilePage,
  AdminResumePage,
  AdminSiteBrandPage,
  AdminSiteCategoriesPage,
  AdminSiteContentPage,
  AdminSiteFlagsPage,
  AdminSiteNavigationPage,
  AdminSiteSeoPage,
  AdminSubmissionsPage,
  AdminTechnologiesPage,
  AdminTerminalPage,
  AdminTimelinePage,
} from '@/app/adminPages';
import { AppShell } from '@/app/AppShell';
import { publicChildRoutes, withSuspense } from '@/app/publicRoutes';
import { getAdminBasePath } from '@/lib/env';
import { AdminGuard } from '@/features/admin/AdminGuard';
import { AdminDataLayout } from '@/features/admin/AdminDataLayout';

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
