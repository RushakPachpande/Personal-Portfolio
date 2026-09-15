import {
  getCaseStudyPath,
  getCategoryMeta,
  getTechnologyById,
} from '@/lib/portfolio';
import type { CaseStudy } from '@/types/portfolio';
import { usePortfolio } from '@/hooks/usePortfolio';
import {
  OverlayCard,
  type OverlayCardStat,
} from '@/components/cards/OverlayCard';
import { Reveal } from '@/components/shared/Reveal';
import type { CardGradientKey } from '@/lib/cardGradients';
import { cn } from '@/lib/utils';

type CaseStudyCardProps = {
  study: CaseStudy;
  index?: number;
  /** Horizontal banner-left layout; intended for full-row showcase slots. */
  wide?: boolean;
  className?: string;
};

const categoryGradients: Record<string, CardGradientKey> = {
  platform: 'platform',
  infrastructure: 'infrastructure',
  automation: 'automation',
};

function getCaseStudyStats(
  study: CaseStudy,
  techCount: number
): OverlayCardStat[] {
  const stats: OverlayCardStat[] = [];
  if (study.timeline) {
    stats.push({ value: study.timeline, label: 'Timeline' });
  }
  stats.push({ value: study.status, label: 'Status' });
  if (techCount > 0) {
    stats.push({
      value: String(techCount),
      label: techCount === 1 ? 'Technology' : 'Technologies',
    });
  }
  return stats;
}

export function CaseStudyCard({
  study,
  index = 0,
  wide = false,
  className,
}: CaseStudyCardProps) {
  const { technologies, siteConfig } = usePortfolio();
  const href = getCaseStudyPath(study, siteConfig);
  const categoryMeta = getCategoryMeta(siteConfig, study.category);
  const imageSrc = study.logo ?? study.coverImage;
  const imageAlt = study.logoAlt ?? study.coverImageAlt ?? `${study.name} logo`;
  const techIds = study.technologyIds ?? [];
  const maxTechChips = 6;
  const resolvableTechItems = techIds
    .map((id) => getTechnologyById(technologies, id))
    .filter((technology): technology is NonNullable<typeof technology> =>
      Boolean(technology)
    );
  const techItems = resolvableTechItems.slice(0, maxTechChips);
  const overflowCount = resolvableTechItems.length - techItems.length;

  return (
    <Reveal
      delay={index * 0.05}
      className={cn('min-w-0 max-w-full', className)}
    >
      <OverlayCard
        href={href}
        gradient={categoryGradients[study.category] ?? 'platform'}
        featured={study.featured}
        wide={wide}
        size={wide ? 'featured' : 'standard'}
        eyebrow={categoryMeta?.label ?? study.category}
        title={study.name}
        heroImage={imageSrc ? { src: imageSrc, alt: imageAlt } : undefined}
        stats={getCaseStudyStats(study, techIds.length)}
        body={
          <>
            <p className="text-sm text-muted-foreground text-pretty">
              {study.summary}
            </p>
            {techItems.length > 0 ? (
              <div className="flex h-7 shrink-0 flex-wrap items-center gap-1.5 overflow-hidden">
                {techItems.map((technology) => (
                  <img
                    key={technology.id}
                    src={technology.logo}
                    alt={`${technology.name} logo`}
                    title={technology.name}
                    className="size-6 rounded-sm object-contain opacity-90 transition-opacity group-hover/card:opacity-100 sm:size-7"
                    loading="lazy"
                  />
                ))}
                {overflowCount > 0 ? (
                  <span
                    title={`${overflowCount} more`}
                    className="inline-flex size-6 items-center justify-center rounded-sm border border-border font-mono text-[0.625rem] font-semibold text-muted-foreground sm:size-7"
                  >
                    +{overflowCount}
                  </span>
                ) : null}
              </div>
            ) : (
              <div className="h-7 shrink-0" aria-hidden="true" />
            )}
          </>
        }
      />
    </Reveal>
  );
}
