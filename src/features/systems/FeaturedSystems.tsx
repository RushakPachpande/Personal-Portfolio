import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/content/projects'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { cn } from '@/lib/utils'

type FeaturedSystemsProps = {
  projects: Project[]
  showHeader?: boolean
  limit?: number
}

export function FeaturedSystems({
  projects,
  showHeader = true,
  limit,
}: FeaturedSystemsProps) {
  const items = typeof limit === 'number' ? projects.slice(0, limit) : projects

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {showHeader ? (
        <Reveal>
          <SectionHeader
            eyebrow="Featured Systems"
            title="Not projects — owned platforms"
            description="Each system includes mission, business problem, architecture, role, and measurable impact."
          />
        </Reveal>
      ) : null}

      <div className={cn('grid gap-5 md:grid-cols-2', showHeader && 'mt-12')}>
        {items.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <Link to={`/projects/${project.slug}`} className="group block h-full">
              <Card className="glass h-full overflow-hidden border-border/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <div className="relative h-36 overflow-hidden bg-gradient-to-br from-electric-blue/20 via-deep-purple/15 to-soft-cyan/10">
                  <div className="absolute inset-0 opacity-40 transition-transform duration-500 group-hover:scale-110 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
                  <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between">
                    <Badge variant="secondary" className="font-mono text-[10px] tracking-wide uppercase">
                      {project.status}
                    </Badge>
                    <ArrowUpRight className="size-5 text-foreground/80 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-display text-2xl">{project.name}</CardTitle>
                  <CardDescription className="text-pretty">{project.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground">Mission:</span> {project.mission}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>

      {limit ? (
        <div className="mt-10 flex justify-center">
          <MagneticButton to="/projects" variant="outline">
            View all systems
          </MagneticButton>
        </div>
      ) : null}
    </section>
  )
}
