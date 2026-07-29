import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getProjectBySlug } from '@/content/projects'
import { Seo } from '@/components/layout/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/shared/Reveal'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold">System not found</h1>
        <p className="mt-3 text-muted-foreground">That project slug does not exist in the catalog.</p>
        <Button asChild className="mt-8">
          <Link to="/projects">Back to systems</Link>
        </Button>
      </div>
    )
  }

  const sections = [
    { title: 'Mission', body: project.mission },
    { title: 'Business Problem', body: project.businessProblem },
    { title: 'Architecture', body: project.architecture },
    { title: 'Role', body: project.role },
    { title: 'Impact', body: project.impact },
  ]

  return (
    <>
      <Seo title={project.name} description={project.tagline} path={`/projects/${project.slug}`} />
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/projects">
            <ArrowLeft data-icon="inline-start" />
            All systems
          </Link>
        </Button>

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="relative h-48 bg-gradient-to-br from-electric-blue/25 via-deep-purple/20 to-soft-cyan/15 sm:h-64">
              <div className="absolute inset-0 transition-transform duration-700 hover:scale-105 [background-image:radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.16),transparent_40%)]" />
            </div>
            <div className="glass border-0 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{project.status}</Badge>
                <Badge variant="secondary">{project.category}</Badge>
              </div>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {project.name}
              </h1>
              <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{project.tagline}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 0.04}>
              <Card className="glass h-full border-border/80">
                <CardHeader>
                  <CardTitle className="font-display text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-pretty">{section.body}</CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Card className="glass mt-4 border-border/80">
            <CardHeader>
              <CardTitle className="font-display text-xl">Technologies</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </CardContent>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="glass mt-4 border-border/80">
            <CardHeader>
              <CardTitle className="font-display text-xl">Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 text-muted-foreground">
                {project.challenges.map((challenge) => (
                  <li key={challenge} className="flex gap-2">
                    <span className="text-soft-cyan">▹</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>
      </article>
    </>
  )
}
