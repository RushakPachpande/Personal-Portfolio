import {
  categoryLabels,
  getCaseStudyPath,
  type CaseStudy,
} from '@/content/caseStudies'
import { getTechnologyById } from '@/content/technologies'
import { OverlayCard } from '@/components/cards/OverlayCard'
import { Reveal } from '@/components/shared/Reveal'
import { Badge } from '@/components/ui/badge'
import type { CardGradientKey } from '@/lib/cardGradients'
import { cn } from '@/lib/utils'

type CaseStudyCardProps = {
  study: CaseStudy
  index?: number
  className?: string
}

const categoryGradients: Record<CaseStudy['category'], CardGradientKey> = {
  platform: 'platform',
  infrastructure: 'infrastructure',
  automation: 'automation',
}

export function CaseStudyCard({ study, index = 0, className }: CaseStudyCardProps) {
  const href = getCaseStudyPath(study)
  const imageSrc = study.logo ?? study.coverImage
  const imageAlt = study.logoAlt ?? study.coverImageAlt ?? `${study.name} logo`
  const techItems = (study.technologyIds ?? [])
    .slice(0, 6)
    .map((id) => getTechnologyById(id))
    .filter((technology): technology is NonNullable<ReturnType<typeof getTechnologyById>> =>
      Boolean(technology),
    )

  return (
    <Reveal
      delay={index * 0.05}
      className={cn('min-w-0 max-w-full', study.featured && 'featured', className)}
    >
      <OverlayCard
        href={href}
        gradient={categoryGradients[study.category]}
        featured={study.featured}
        eyebrow={categoryLabels[study.category]}
        title={study.name}
        heroImage={imageSrc ? { src: imageSrc, alt: imageAlt } : undefined}
        body={
          <>
            <p className="line-clamp-2 text-sm text-muted-foreground text-pretty">{study.summary}</p>
            <div className="flex flex-wrap items-center gap-2">
              {study.timeline ? (
                <Badge variant="outline" className="font-mono text-xs uppercase">
                  {study.timeline}
                </Badge>
              ) : null}
              <Badge variant="secondary" className="font-mono text-xs uppercase">
                {study.status}
              </Badge>
            </div>
            {techItems.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5">
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
              </div>
            ) : null}
          </>
        }
      />
    </Reveal>
  )
}
