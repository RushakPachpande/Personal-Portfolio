import { philosophyPillars } from '@/content/philosophy'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PhilosophyGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Engineering Philosophy"
          title="How platforms stay trustworthy"
          description="Principles that reinforce engineering ownership—not slogans."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {philosophyPillars.map((pillar, index) => (
          <Reveal key={pillar.id} delay={index * 0.04}>
            <Card className="glass h-full border-border/80 transition-transform duration-300 hover:-translate-y-1">
              <CardHeader>
                <p className="font-mono text-xs tracking-[0.18em] text-soft-cyan uppercase">
                  0{index + 1}
                </p>
                <CardTitle className="font-display text-2xl">{pillar.title}</CardTitle>
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
