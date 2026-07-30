import { timeline } from '@/content/timeline'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const typeLabel = {
  education: 'Education',
  career: 'Career',
  deployment: 'Deployment',
  achievement: 'Achievement',
} as const

export function ExperienceTimeline() {
  const initiativePoints = ['Navdrishti', 'BrainPulses', 'Azure', 'M365', 'TrueNAS', 'Docker', 'n8n']

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Experience Timeline"
          title="Career, education, and major deployments"
          description="An interactive vertical timeline of career, education, and major deployments from verified experience."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mx-auto mt-8 max-w-3xl">
          <p className="font-mono text-[11px] tracking-wide text-soft-cyan uppercase">
            Linked initiatives
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {initiativePoints.map((point, index) => (
              <div key={point} className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-secondary/35 px-2.5 py-1 text-xs text-muted-foreground">
                  {point}
                </span>
                {index < initiativePoints.length - 1 ? (
                  <span className="h-px w-4 bg-border/80" aria-hidden />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <ol className="relative mx-auto mt-14 max-w-3xl">
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-2.75 w-px bg-linear-to-b from-electric-blue via-deep-purple to-soft-cyan opacity-50"
        />
        {timeline.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <li className="relative mb-10 pl-12 last:mb-0">
              <span
                className={cn(
                  'absolute top-1.5 left-0 size-5.5 rounded-full border-2 border-background',
                  'bg-linear-to-br from-electric-blue to-soft-cyan shadow-[0_0_20px_rgba(59,130,246,0.35)]',
                )}
              />
              <div className="glass rounded-2xl border-border/80 p-5 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{typeLabel[item.type]}</Badge>
                  <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-soft-cyan">{item.organization}</p>
                <p className="mt-3 text-sm text-muted-foreground text-pretty">{item.description}</p>
                {item.highlights ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
