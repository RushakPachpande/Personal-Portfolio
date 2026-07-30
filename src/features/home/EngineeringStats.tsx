import { engineeringStats } from '@/content/stats'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'

export function EngineeringStats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Engineering Metrics"
          title="Signals from shipped work"
          description="Metrics grounded in verified initiatives and case-study scope."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {engineeringStats.map((stat, index) => (
          <Reveal key={stat.id} delay={index * 0.04}>
            <article className="glass rounded-2xl border-border/80 p-5">
              <p className="font-display text-4xl font-semibold tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix ?? ''} />
              </p>
              <p className="mt-2 font-medium text-foreground">{stat.label}</p>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{stat.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
