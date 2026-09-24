import { Link } from 'react-router-dom';
import {
  getCaseStudy,
  getCaseStudyPath,
  technologyCategories,
} from '@/lib/portfolio';
import type { TechnologyCategory } from '@/types/portfolio';
import { usePortfolio } from '@/hooks/usePortfolio';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { Reveal, SectionHeader } from '@/components/shared/Reveal';
import { TechLogo } from '@/components/tech/TechLogo';
import { cn, responsiveCardGridCompactClassName } from '@/lib/utils';

const categoryOrder: TechnologyCategory[] = [
  'frontend',
  'backend',
  'database',
  'cloud',
  'infrastructure',
  'automation',
  'version-control',
  'security',
  'enterprise',
];

export function TechnologyLibraryGrid() {
  const { technologies, caseStudies } = usePortfolio();
  return (
    <section className="mx-auto min-w-0 max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Technology Library"
          title="Tools used in real engineering outcomes"
          description="Official technology branding, usage context, and linked case studies."
        />
      </Reveal>

      <div className="mt-12 space-y-10">
        {categoryOrder.map((category) => {
          const items = technologies.filter(
            (technology) => technology.category === category
          );
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="font-display text-2xl font-semibold">
                {technologyCategories[category]}
              </h2>
              <div
                className={cn(
                  'mt-4',
                  responsiveCardGridCompactClassName,
                  'lg:grid-cols-3'
                )}
              >
                {items.map((technology, index) => {
                  const slugs = technology.usedInSlugs;
                  return (
                    <Reveal
                      key={technology.id}
                      delay={index * 0.02}
                      className="min-w-0"
                    >
                      <OverlayCard
                        gradient="technology"
                        size="compact"
                        eyebrow={technologyCategories[technology.category]}
                        title={technology.name}
                        hero={
                          <TechLogo
                            technologyId={technology.id}
                            logo={technology.logo}
                            logoDark={technology.logoDark}
                            name={technology.name}
                            className="max-h-[85%] max-w-[85%]"
                          />
                        }
                        body={
                          <>
                            <p className="text-sm text-muted-foreground text-pretty">
                              {technology.description}
                            </p>
                            <div className="min-h-0 overflow-hidden">
                              <p className="font-mono text-[0.65rem] tracking-wide text-soft-cyan uppercase">
                                Used in
                              </p>
                              {slugs.length === 0 ? (
                                <p className="mt-1 text-xs text-muted-foreground">
                                  No linked case studies yet.
                                </p>
                              ) : (
                                <ul className="mt-1 flex flex-wrap gap-1.5 overflow-hidden">
                                  {slugs.slice(0, 3).map((slug) => {
                                    const study = getCaseStudy(
                                      caseStudies,
                                      slug
                                    );
                                    if (!study) return null;
                                    return (
                                      <li key={`${technology.id}-${slug}`}>
                                        <Link
                                          to={getCaseStudyPath(study)}
                                          className="rounded-md border border-border px-1.5 py-0.5 text-[0.65rem] text-muted-foreground hover:text-foreground"
                                          onClick={(event) =>
                                            event.stopPropagation()
                                          }
                                        >
                                          {study.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </div>
                          </>
                        }
                      />
                    </Reveal>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
