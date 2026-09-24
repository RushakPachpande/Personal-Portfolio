import { Navigate, useLocation } from 'react-router-dom';
import { getCategoryByPath } from '@/lib/portfolio';
import { usePortfolio } from '@/hooks/usePortfolio';
import { CategoryWorkPage } from '@/pages/CategoryWorkPage';
import { CaseStudyRoutePage } from '@/pages/CaseStudyRoutePage';

/**
 * Resolves CMS-defined category paths that are not hard-coded in the router
 * (e.g. a new Studio category with path `/consulting`).
 */
export function SiteConfigPathResolver() {
  const location = useLocation();
  const { siteConfig } = usePortfolio();
  const category = getCategoryByPath(siteConfig, location.pathname);

  if (!category) {
    return <Navigate to="/404" replace />;
  }

  const remainder = location.pathname
    .replace(category.path, '')
    .replace(/^\//, '');

  if (!remainder) {
    return <CategoryWorkPage categoryId={category.id} />;
  }

  const slug = remainder.split('/')[0];
  if (!slug || remainder.includes('/')) {
    return <Navigate to="/404" replace />;
  }

  return (
    <CaseStudyRoutePage
      category={category.id}
      listPath={category.path}
      listLabel={category.label}
      slugOverride={slug}
    />
  );
}
