import { ArrowRight, Cloud, Cpu, Workflow } from 'lucide-react';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { Reveal, SectionHeader } from '@/components/shared/Reveal';
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
    <section className="mx-auto max-w-6xl min-w-0 px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Engineering Areas"
          title="Three pillars of ownership"
          description="Platform, infrastructure, and automation—connected by the same end-to-end ownership model."
        />
      </Reveal>

      <div className={cn('mt-12', responsiveCardGridThreeClassName)}>
        {areas.map((area, index) => (
          <Reveal key={area.to} delay={index * 0.05} className="min-w-0">
            <OverlayCard
              href={area.to}
              gradient={area.gradient}
              eyebrow="Engineering area"
              title={area.title}
              hero={
                <area.icon
                  className="size-14 text-soft-cyan/90 sm:size-16"
                  strokeWidth={1.25}
                />
              }
              body={
                <>
                  <p className="line-clamp-2 text-sm text-muted-foreground text-pretty">
                    {area.description}
                  </p>
                  <p className="font-mono text-xs text-soft-cyan sm:text-sm">
                    {area.examples}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-electric-blue sm:text-sm">
                    Explore
                    <ArrowRight className="size-3.5" />
                  </span>
                </>
              }
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
