import { computeEngineeringStats } from '@/lib/portfolio';
import { usePortfolio } from '@/hooks/usePortfolio';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { Reveal, SectionHeader } from '@/components/shared/Reveal';
import { cn, responsiveCardGridCompactClassName } from '@/lib/utils';

export function EngineeringStats() {
  const { caseStudies, technologies } = usePortfolio();
  const engineeringStats = computeEngineeringStats(caseStudies, technologies);
  return (
    <section className="mx-auto max-w-6xl min-w-0 px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Engineering Metrics"
          title="Signals from shipped work"
          description="Metrics grounded in verified initiatives and case-study scope."
        />
      </Reveal>

      <div
        className={cn(
          'mt-12 lg:grid-cols-3',
          responsiveCardGridCompactClassName
        )}
      >
        {engineeringStats.map((stat, index) => (
          <Reveal key={stat.id} delay={index * 0.04} className="min-w-0">
            <OverlayCard
              gradient="stat"
              size="compact"
              eyebrow="Metric"
              title={stat.label}
              hero={
                <p className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix ?? ''}
                  />
                </p>
              }
              body={
                <p className="text-sm text-muted-foreground text-pretty">
                  {stat.description}
                </p>
              }
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
