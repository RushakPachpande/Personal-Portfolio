import { Link } from 'react-router-dom'
import { ArrowRight, Cloud, Cpu, Workflow } from 'lucide-react'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const teasers = [
  {
    to: '/work',
    title: 'What I Build',
    description: 'Software products owned from architecture to production.',
    icon: Cpu,
  },
  {
    to: '/infrastructure',
    title: 'Infrastructure & Operations',
    description: 'Cloud, tenants, hosting, and operational initiatives.',
    icon: Cloud,
  },
  {
    to: '/automation',
    title: 'Automation',
    description: 'n8n platforms and enterprise workflow improvements.',
    icon: Workflow,
  },
] as const

export function HomeTeasers() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Platform focus"
          title="I build complete digital platforms"
          description="From infrastructure to production—products, operations, and automation under one ownership model."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {teasers.map((teaser, index) => (
          <Reveal key={teaser.to} delay={index * 0.05}>
            <Link to={teaser.to} className="group block h-full">
              <Card className="glass h-full border-border/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <CardHeader>
                  <teaser.icon className="mb-2 size-5 text-soft-cyan" />
                  <CardTitle className="flex items-center justify-between gap-2 font-display text-xl">
                    {teaser.title}
                    <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground text-pretty">
                  {teaser.description}
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
