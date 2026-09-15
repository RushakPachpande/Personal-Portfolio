import { Link, useParams } from 'react-router-dom';
import { getCaseStudy, getCategoryMeta } from '@/lib/portfolio';
import { usePortfolio } from '@/hooks/usePortfolio';
import { CaseStudyPage } from '@/features/case-studies/CaseStudyPage';
import { Button } from '@/components/ui/button';

type CaseStudyRoutePageProps = {
  category: string;
  listPath?: string;
  listLabel?: string;
  /** When set, overrides the `:slug` route param (used by CMS path resolver). */
  slugOverride?: string;
};

export function CaseStudyRoutePage({
  category,
  listPath,
  listLabel,
  slugOverride,
}: CaseStudyRoutePageProps) {
  const { slug: paramSlug } = useParams();
  const slug = slugOverride ?? paramSlug;
  const { caseStudies, siteConfig } = usePortfolio();
  const meta = getCategoryMeta(siteConfig, category);
  const resolvedListPath = listPath ?? meta?.path ?? '/platforms';
  const resolvedListLabel = listLabel ?? meta?.label ?? 'Work';
  const study = slug ? getCaseStudy(caseStudies, slug) : undefined;

  if (!study || study.category !== category) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold">
          Case study not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          That engineering case study does not exist in this category.
        </p>
        <Button asChild className="mt-8">
          <Link to={resolvedListPath}>Back to {resolvedListLabel}</Link>
        </Button>
      </div>
    );
  }

  return <CaseStudyPage study={study} />;
}
