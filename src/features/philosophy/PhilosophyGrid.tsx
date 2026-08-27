import { philosophyPillars } from '@/content/philosophy'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, responsiveCardGridCompactClassName } from '@/lib/utils'

export function PhilosophyGrid() {
  return (
    <section className="mx-auto min-w-0 max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Engineering Philosophy"
          title="How platforms stay trustworthy"
          description="Principles that reinforce engineering ownership—not slogans."
        />
      </Reveal>

      <div className={cn('mt-12', responsiveCardGridCompactClassName)}>
        {philosophyPillars.map((pillar, index) => (
          <Reveal key={pillar.id} delay={index * 0.04} className="min-w-0">
            <Card className="glass h-full min-w-0 border-border/80 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none">
              <CardHeader>
                <p className="font-mono text-xs tracking-[0.18em] text-soft-cyan uppercase sm:text-sm">
                  0{index + 1}
                </p>
                <CardTitle className="font-display text-xl break-words sm:text-2xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-muted-foreground">
                <p className="text-foreground">{pillar.summary}</p>
                <p className="text-sm text-pretty">{pillar.detail}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
