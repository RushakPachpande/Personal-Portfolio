import { Link } from 'react-router-dom'
import type { CaseStudy } from '@/types/portfolio'
import { CaseStudyCard } from './CaseStudyCard'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { cn, responsiveCardGridClassName } from '@/lib/utils'

type CaseStudyGridProps = {
  studies: CaseStudy[]
  eyebrow?: string
  title?: string
  description?: string
  showHeader?: boolean
  className?: string
}

export function CaseStudyGrid({
  studies,
  eyebrow = 'Engineering Case Studies',
  title,
  description,
  showHeader = true,
  className,
}: CaseStudyGridProps) {
  return (
    <section className={cn('mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6', className)}>
      {showHeader && title ? (
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </Reveal>
      ) : null}

      <div className={cn(responsiveCardGridClassName, showHeader && title && 'mt-12')}>
        {studies.map((study, index) => (
          <CaseStudyCard key={study.slug} study={study} index={index} />
        ))}
      </div>

      {studies.length === 0 ? (
        <p className="mt-8 text-center text-muted-foreground">No case studies in this category yet.</p>
      ) : null}
    </section>
  )
}

export function RelatedCaseStudies({ studies }: { studies: CaseStudy[] }) {
  if (studies.length === 0) return null

  return (
    <section className="mt-16 min-w-0">
      <h2 className="font-display text-2xl font-semibold">Related Case Studies</h2>
      <div className={cn('mt-6', responsiveCardGridClassName)}>
        {studies.map((study, index) => (
          <CaseStudyCard key={study.slug} study={study} index={index} />
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Prefer a full catalog? Browse{' '}
        <Link to="/platforms" className="text-electric-blue hover:underline">
          Platforms
        </Link>
        ,{' '}
        <Link to="/infrastructure" className="text-electric-blue hover:underline">
          Infrastructure
        </Link>
        , or{' '}
        <Link to="/automation" className="text-electric-blue hover:underline">
          Automation
        </Link>
        .
      </p>
    </section>
  )
}
