import { Cpu, Cloud, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { Reveal, SectionHeader } from '@/components/shared/Reveal';
import { ScrollFadeIn } from '@/components/effects/Parallax';
import { cn, responsiveCardGridThreeClassName } from '@/lib/utils';

const gradientIcons: Record<string, LucideIcon> = {
  platform: Cpu,
  infrastructure: Cloud,
  automation: Workflow,
};

export function EngineeringAreas() {
  const { siteConfig } = usePortfolio();
  const section = siteConfig.chrome.engineeringAreasSection;
  const areas = siteConfig.engineeringAreas;

  return (
    <section className="relative mx-auto max-w-6xl xl:max-w-7xl min-w-0 overflow-hidden px-4 py-16 sm:px-6">
      <ScrollFadeIn>
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
      </ScrollFadeIn>

      <div className={cn('mt-12', responsiveCardGridThreeClassName)}>
        {areas.map((area, index) => {
          const Icon = gradientIcons[area.gradient] ?? Cpu;
          return (
            <Reveal key={area.id} delay={index * 0.05} className="min-w-0">
              <OverlayCard
                href={area.href}
                gradient={area.gradient}
                size="standard"
                eyebrow="Engineering area"
                title={area.title}
                hero={
                  <Icon
                    className="size-12 text-soft-cyan/90 sm:size-14"
                    strokeWidth={1.25}
                  />
                }
                body={
                  <>
                    <p className="text-sm text-muted-foreground text-pretty">
                      {area.description}
                    </p>
                    <p className="font-mono text-xs text-soft-cyan sm:text-sm">
                      {area.examples}
                    </p>
                  </>
                }
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
