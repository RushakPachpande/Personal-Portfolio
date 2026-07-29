import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getInitiativeBySlug } from '@/content/initiatives'
import { Seo } from '@/components/layout/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/shared/Reveal'

export function InitiativeDetailPage() {
  const { slug } = useParams()
  const initiative = slug ? getInitiativeBySlug(slug) : undefined

  if (!initiative) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Initiative not found</h1>
        <p className="mt-3 text-muted-foreground">That infrastructure item does not exist.</p>
        <Button asChild className="mt-8">
          <Link to="/infrastructure">Back to Infrastructure</Link>
        </Button>
      </div>
    )
  }

  const sections = [
    { title: 'Objective', body: initiative.objective },
    { title: 'My Role', body: initiative.role },
    { title: 'Outcome', body: initiative.outcome },
  ]

  return (
    <>
      <Seo
        title={initiative.name}
        description={initiative.tagline}
        path={`/infrastructure/${initiative.slug}`}
      />
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/infrastructure">
            <ArrowLeft data-icon="inline-start" />
            All initiatives
          </Link>
        </Button>

        <Reveal>
          <div className="glass rounded-2xl border-border/80 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{initiative.incomplete ? 'TODO' : 'Initiative'}</Badge>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {initiative.name}
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{initiative.tagline}</p>
            {initiative.incomplete ? (
              <p className="mt-4 font-mono text-sm text-amber-300/90">
                Details forthcoming — {initiative.todoNote}
              </p>
            ) : null}
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

        {!initiative.incomplete && initiative.technologies.length > 0 ? (
          <Reveal>
            <Card className="glass mt-4 border-border/80">
              <CardHeader>
                <CardTitle className="font-display text-xl">Technologies</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {initiative.technologies.map((tech) => (
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
        ) : null}
      </article>
    </>
  )
}
