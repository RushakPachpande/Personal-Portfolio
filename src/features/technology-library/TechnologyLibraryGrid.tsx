import { Link } from 'react-router-dom'
import { getCaseStudy, getCaseStudyPath } from '@/content/caseStudies'
import { technologies, technologyCategories, type TechnologyCategory } from '@/content/technologies'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { TechBadge } from '@/components/tech/TechBadge'
import { Badge } from '@/components/ui/badge'
import { cn, responsiveCardGridCompactClassName } from '@/lib/utils'

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
]

export function TechnologyLibraryGrid() {
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
          const items = technologies.filter((technology) => technology.category === category)
          if (items.length === 0) return null

          return (
            <div key={category}>
              <h2 className="font-display text-2xl font-semibold">{technologyCategories[category]}</h2>
              <div className={cn('mt-4', responsiveCardGridCompactClassName, 'lg:grid-cols-3')}>
                {items.map((technology, index) => {
                  const slugs = technology.usedInSlugs
                  return (
                    <Reveal key={technology.id} delay={index * 0.02} className="min-w-0">
                      <article className="glass min-w-0 rounded-2xl border-border/80 p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <TechBadge technology={technology} />
                          <Badge variant="outline" className="font-mono text-xs uppercase">
                            {technologyCategories[technology.category]}
                          </Badge>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground text-pretty">
                          {technology.description}
                        </p>
                        <div className="mt-3">
                          <p className="font-mono text-xs tracking-wide text-soft-cyan uppercase sm:text-sm">
                            Used in
                          </p>
                          {slugs.length === 0 ? (
                            <p className="mt-2 text-xs text-muted-foreground">No linked case studies yet.</p>
                          ) : (
                            <ul className="mt-2 flex flex-wrap gap-2">
                              {slugs.slice(0, 4).map((slug) => {
                                const study = getCaseStudy(slug)
                                if (!study) return null
                                return (
                                  <li key={`${technology.id}-${slug}`}>
                                    <Link
                                      to={getCaseStudyPath(study)}
                                      className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                                    >
                                      {study.name}
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
