import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import {
  categoryLabels,
  getCaseStudyPath,
  type CaseStudy,
} from '@/content/caseStudies'
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

  return (
    <Reveal delay={index * 0.05} className={className}>
      <Card className="glass flex h-full flex-col overflow-hidden border-border/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
        {study.coverImage || study.logo ? (
          <div className="relative flex h-40 items-center justify-center overflow-hidden bg-linear-to-br from-electric-blue/15 via-deep-purple/10 to-soft-cyan/10">
            <img
              src={study.coverImage ?? study.logo}
              alt={study.coverImageAlt ?? study.logoAlt ?? `${study.name} cover`}
              className="absolute inset-0 h-full w-full object-cover opacity-35"
              loading="lazy"
            />
            {study.logo ? (
              <img
                src={study.logo}
                alt={study.logoAlt ?? `${study.name} logo`}
                className="relative z-10 max-h-16 max-w-[60%] object-contain"
                loading="lazy"
              />
            ) : null}
          </div>
        ) : null}
        <CardHeader className="flex-1">
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
          <CardTitle className="font-display text-2xl">{study.name}</CardTitle>
          <CardDescription className="text-pretty">{study.summary}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TechBanner technologyIds={(study.technologyIds ?? []).slice(0, 6)} />
          <Button asChild className={cn('w-full sm:w-auto')}>
            <Link to={href}>
              View Engineering Case Study
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Reveal>
  )
}
