import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import {
  categoryLabels,
  getCaseStudyPath,
  type CaseStudy,
} from '@/content/caseStudies'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/shared/Reveal'
import { TechBanner } from '@/components/tech/TechBanner'
import { cn } from '@/lib/utils'

type CaseStudyCardProps = {
  study: CaseStudy
  index?: number
  className?: string
}

export function CaseStudyCard({ study, index = 0, className }: CaseStudyCardProps) {
  const href = getCaseStudyPath(study)
  const imageSrc = study.logo ?? study.coverImage
  const imageAlt = study.logoAlt ?? study.coverImageAlt ?? `${study.name} logo`

  return (
    <Reveal delay={index * 0.05} className={cn('min-w-0 max-w-full', className)}>
      <Card className="glass flex h-full min-w-0 max-w-full flex-col overflow-hidden border-border/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 motion-reduce:transform-none">
        {imageSrc ? (
          <AspectRatio ratio={16 / 9} className="bg-muted/30">
            <div className="flex size-full items-center justify-center p-4 sm:p-6">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          </AspectRatio>
        ) : null}
        <CardHeader className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-mono text-[10px] tracking-wide uppercase">
              {study.status}
            </Badge>
            <Badge variant="outline" className="font-mono text-[10px] tracking-wide uppercase">
              {study.difficulty ?? 'Advanced'}
            </Badge>
            <span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              {categoryLabels[study.category]}
            </span>
            {study.timeline ? (
              <span className="font-mono text-[10px] tracking-wide text-soft-cyan uppercase">
                {study.timeline}
              </span>
            ) : null}
          </div>
          <CardTitle className="font-display text-xl break-words sm:text-2xl">{study.name}</CardTitle>
          <CardDescription className="text-pretty break-words">{study.summary}</CardDescription>
        </CardHeader>
        <CardContent className="flex min-w-0 flex-col gap-4">
          <TechBanner technologyIds={(study.technologyIds ?? []).slice(0, 6)} />
          <Button asChild className="h-auto w-full whitespace-normal py-2.5 sm:w-auto">
            <Link to={href}>
              <span className="sm:hidden">View case study</span>
              <span className="hidden sm:inline">View Engineering Case Study</span>
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Reveal>
  )
}
