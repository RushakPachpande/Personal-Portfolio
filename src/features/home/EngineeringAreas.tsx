import { Link } from 'react-router-dom'
import { ArrowRight, Cloud, Cpu, Workflow } from 'lucide-react'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, responsiveCardGridThreeClassName } from '@/lib/utils'

const areas = [
  {
    to: '/platforms',
    title: 'Platform Engineering',
    description: 'Software products, full-stack delivery, and production deployments.',
    examples: 'Navdrishti · BrainPulses',
    icon: Cpu,
  },
  {
    to: '/infrastructure',
    title: 'Infrastructure Engineering',
    description: 'Azure, Microsoft 365, Docker, Linux, networking, storage, and VPN.',
    examples: 'Cloud · Tenants · Hosting',
    icon: Cloud,
  },
  {
    to: '/automation',
    title: 'Automation Engineering',
    description: 'n8n, SharePoint, Outlook, and business workflow automation.',
    examples: 'Workflows · Integrations',
    icon: Workflow,
  },
] as const

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
            <Link to={area.to} className="group block h-full min-w-0">
              <Card className="glass h-full min-w-0 border-border/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 motion-reduce:transform-none">
                <CardHeader>
                  <area.icon className="mb-2 size-5 text-soft-cyan" />
                  <CardTitle className="flex items-center justify-between gap-2 font-display text-xl">
                    {area.title}
                    <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <p className="text-pretty">{area.description}</p>
                  <p className="font-mono text-xs text-soft-cyan sm:text-sm">{area.examples}</p>
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
