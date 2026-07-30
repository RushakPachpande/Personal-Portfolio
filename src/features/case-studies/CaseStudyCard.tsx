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
        {study.logo ? (
          <div className="relative flex h-32 items-center justify-center bg-linear-to-br from-electric-blue/15 via-deep-purple/10 to-soft-cyan/10">
            <img
              src={study.logo}
              alt={study.logoAlt ?? `${study.name} logo`}
              className="max-h-16 max-w-[60%] object-contain"
              loading="lazy"
            />
          </div>
        ) : null}
        <CardHeader className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-mono text-[10px] tracking-wide uppercase">
              {study.status}
            </Badge>
            <span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              {categoryLabels[study.category]}
            </span>
          </div>
          <CardTitle className="font-display text-2xl">{study.name}</CardTitle>
          <CardDescription className="text-pretty">{study.summary}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {study.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
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
