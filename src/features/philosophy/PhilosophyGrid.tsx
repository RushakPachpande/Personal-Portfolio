import { usePortfolio } from '@/hooks/usePortfolio';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { Reveal, SectionHeader } from '@/components/shared/Reveal';
import { cn, responsiveCardGridCompactClassName } from '@/lib/utils';

export function PhilosophyGrid() {
  const { philosophyPillars } = usePortfolio();
  return (
    <section className="mx-auto min-w-0 max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Engineering Philosophy"
          title="How platforms stay trustworthy"
          description="Principles that reinforce engineering ownership-not slogans."
        />
      </Reveal>

      <div className={cn('mt-12', responsiveCardGridCompactClassName)}>
        {philosophyPillars.map((pillar, index) => (
          <Reveal key={pillar.id} delay={index * 0.04} className="min-w-0">
            <OverlayCard
              gradient="philosophy"
              size="standard"
              eyebrow={`Principle 0${index + 1}`}
              title={pillar.title}
              hero={
                <span className="font-mono text-4xl font-medium text-soft-cyan/80 sm:text-5xl">
                  0{index + 1}
                </span>
              }
              body={
                <>
                  <p className="font-medium text-foreground">
                    {pillar.summary}
                  </p>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {pillar.detail}
                  </p>
                </>
              }
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
