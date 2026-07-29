import { MapPin, Radar, Sparkles } from 'lucide-react'
import { profile } from '@/content/profile'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const metrics = [
  { label: 'Experience', value: profile.overview.experience, suffix: ' yrs' },
  { label: 'Projects', value: profile.overview.projects, suffix: '+' },
  { label: 'Deployments', value: profile.overview.deployments, suffix: '+' },
  { label: 'Cloud Platforms', value: profile.overview.cloudPlatforms, suffix: '' },
  { label: 'Automation Workflows', value: profile.overview.automationWorkflows, suffix: '+' },
] as const

export function SystemOverview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="System Overview"
          title="Platform status at a glance"
          description="A dashboard view of ownership across infrastructure, automation, cloud, and production systems."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.04}>
            <Card className="glass border-border/80 transition-transform duration-300 hover:-translate-y-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-4xl font-semibold tracking-tight">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}

        <Reveal delay={0.24}>
          <Card className="glass border-border/80 transition-transform duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="size-4 text-soft-cyan" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-xl font-semibold">{profile.location}</p>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Reveal>
          <Card className="glass h-full border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Radar className="size-4 text-electric-blue" />
                Current Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{profile.currentMission}</CardContent>
          </Card>
        </Reveal>
        <Reveal delay={0.06}>
          <Card className="glass h-full border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="size-4 text-deep-purple" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{profile.currentStatus}</CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
