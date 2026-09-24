import { getCaseStudiesByCategory, getCategoryMeta } from '@/lib/portfolio';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Seo } from '@/components/layout/Seo';
import { CaseStudyGrid } from '@/features/case-studies/CaseStudyGrid';

type CategoryWorkPageProps = {
  categoryId: string;
};

export function CategoryWorkPage({ categoryId }: CategoryWorkPageProps) {
  const { caseStudies, siteConfig } = usePortfolio();
  const meta = getCategoryMeta(siteConfig, categoryId);
  if (!meta) {
    return (
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 py-16 text-muted-foreground">
        Category not found.
      </div>
    );
  }

  return (
    <>
      <Seo
        title={meta.seoTitle}
        description={meta.seoDescription}
        path={meta.path}
      />
      <div className="pt-8 pb-12">
        <CaseStudyGrid
          studies={getCaseStudiesByCategory(caseStudies, categoryId)}
          eyebrow={meta.gridEyebrow}
          title={meta.gridTitle}
          description={meta.gridDescription}
        />
      </div>
    </>
  );
}

export function PlatformsPage() {
  return <CategoryWorkPage categoryId="platform" />;
}

export function InfrastructurePage() {
  return <CategoryWorkPage categoryId="infrastructure" />;
}

export function AutomationPage() {
  return <CategoryWorkPage categoryId="automation" />;
}
