import { lazy } from 'react';
import { useParams } from 'react-router-dom';

export const AdminLoginPage = lazy(() =>
  import('@/pages/admin/AdminLoginPage').then((module) => ({
    default: module.AdminLoginPage,
  }))
);
export const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((module) => ({
    default: module.AdminDashboardPage,
  }))
);
export const AdminProfilePage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((module) => ({
    default: module.AdminProfilePage,
  }))
);
export const AdminCaseStudiesPage = lazy(() =>
  import('@/pages/admin/AdminCaseStudiesPage').then((module) => ({
    default: module.AdminCaseStudiesPage,
  }))
);
export const AdminCaseStudyEditPage = lazy(() =>
  import('@/pages/admin/AdminCaseStudiesPage').then((module) => ({
    default: module.AdminCaseStudyEditPage,
  }))
);
export const AdminTechnologiesPage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({
    default: module.AdminTechnologiesPage,
  }))
);
export const AdminTimelinePage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({
    default: module.AdminTimelinePage,
  }))
);
export const AdminPhilosophyPage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({
    default: module.AdminPhilosophyPage,
  }))
);
export const AdminResumePage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({
    default: module.AdminResumePage,
  }))
);
export const AdminTerminalPage = lazy(() =>
  import('@/pages/admin/AdminContentPages').then((module) => ({
    default: module.AdminTerminalPage,
  }))
);
export const AdminSubmissionsPage = lazy(() =>
  import('@/pages/admin/AdminInboxPages').then((module) => ({
    default: module.AdminSubmissionsPage,
  }))
);
export const AdminMediaPage = lazy(() =>
  import('@/pages/admin/AdminInboxPages').then((module) => ({
    default: module.AdminMediaPage,
  }))
);
export const AdminSiteContentPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteContentPage,
  }))
);
export const AdminSiteNavigationPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteNavigationPage,
  }))
);
export const AdminSiteCategoriesPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteCategoriesPage,
  }))
);
export const AdminSiteBrandPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteBrandPage,
  }))
);
export const AdminSiteSeoPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteSeoPage,
  }))
);
export const AdminSiteFlagsPage = lazy(() =>
  import('@/pages/admin/AdminSitePages').then((module) => ({
    default: module.AdminSiteFlagsPage,
  }))
);

export function AdminCaseStudyRoute() {
  const { slug } = useParams();
  return <AdminCaseStudyEditPage slug={slug === 'new' ? undefined : slug} />;
}
