import { Cloud, Cpu, Workflow } from 'lucide-react';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { Reveal, SectionHeader } from '@/components/shared/Reveal';
import { ScrollFadeIn } from '@/components/effects/Parallax';
import { cn, responsiveCardGridThreeClassName } from '@/lib/utils';

const areas = [
  {
    to: '/platforms',
    title: 'Platform Engineering',
    description:
      'Software products, full-stack delivery, and production deployments.',
    examples: 'Navdrishti · BrainPulses',
    icon: Cpu,
    gradient: 'platform' as const,
  },
  {
    to: '/infrastructure',
    title: 'Infrastructure Engineering',
    description:
      'Azure, Microsoft 365, Docker, Linux, networking, storage, and VPN.',
    examples: 'Cloud · Tenants · Hosting',
    icon: Cloud,
    gradient: 'infrastructure' as const,
  },
  {
    to: '/automation',
    title: 'Automation Engineering',
    description: 'n8n, SharePoint, Outlook, and business workflow automation.',
    examples: 'Workflows · Integrations',
    icon: Workflow,
    gradient: 'automation' as const,
  },
] as const;

export function EngineeringAreas() {
  return (
    <section className="relative mx-auto max-w-6xl min-w-0 overflow-hidden px-4 py-16 sm:px-6">
      <ScrollFadeIn>
        <SectionHeader
          eyebrow="Engineering Areas"
          title="Three pillars of ownership"
          description="Platform, infrastructure, and automation—connected by the same end-to-end ownership model."
        />
      </ScrollFadeIn>

      <div className={cn('mt-12', responsiveCardGridThreeClassName)}>
        {areas.map((area, index) => (
          <Reveal key={area.to} delay={index * 0.05} className="min-w-0">
            <OverlayCard
              href={area.to}
              gradient={area.gradient}
              size="standard"
              eyebrow="Engineering area"
              title={area.title}
              hero={
                <area.icon
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
        ))}
      </div>
    </section>
  );
}
