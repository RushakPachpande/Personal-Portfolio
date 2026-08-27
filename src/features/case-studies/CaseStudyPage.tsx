import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download } from 'lucide-react'
import {
  categoryLabels,
  categoryPaths,
  getRelatedCaseStudies,
  type CaseStudy,
} from '@/content/caseStudies'
import { profile } from '@/content/profile'
import { Seo } from '@/components/layout/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/shared/Reveal'
import { RelatedCaseStudies } from './CaseStudyGrid'
import { TechBanner } from '@/components/tech/TechBanner'
import { ArchitectureFlow } from './ArchitectureFlow'
import { LogoFrame } from '@/components/media/LogoFrame'
import { MediaCarousel } from '@/components/media/MediaCarousel'
import { getTechnologyById } from '@/content/technologies'
import { cn } from '@/lib/utils'

const TOC = [
  { id: 'business-context', label: 'Business Context' },
  { id: 'problem', label: 'Problem Statement' },
  { id: 'objective', label: 'Objective' },
  { id: 'solution', label: 'Solution Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'responsibilities', label: 'My Responsibilities' },
  { id: 'decisions', label: 'Engineering Decisions' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'stack', label: 'Technology Stack' },
  { id: 'gallery', label: 'Engineering Gallery' },
  { id: 'cross-references', label: 'Cross References' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'learnings', label: 'Key Learnings' },
] as const

type CaseStudyPageProps = {
  study: CaseStudy
}

export function CaseStudyPage({ study }: CaseStudyPageProps) {
  const [activeId, setActiveId] = useState<string>(TOC[0].id)
  const related = getRelatedCaseStudies(study).slice(0, 4)
  const backPath = categoryPaths[study.category]

  useEffect(() => {
    const nodes = TOC.map((item) => document.getElementById(item.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    )
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [study.slug])

  return (
    <>
      <Seo title={study.name} description={study.summary} path={`${backPath}/${study.slug}`} />
      <article className="mx-auto min-w-0 max-w-6xl px-4 py-12 sm:px-6">
        <Button asChild variant="ghost" className="mb-8">
          <Link to={backPath}>
            <ArrowLeft data-icon="inline-start" />
            Back to {categoryLabels[study.category]}
          </Link>
        </Button>

        <Reveal>
          <header className="glass rounded-2xl border-border/80 p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {study.logo ? (
                <LogoFrame
                  src={study.logo}
                  alt={study.logoAlt ?? `${study.name} logo`}
                  variant="header"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{categoryLabels[study.category]}</Badge>
                  <Badge variant="secondary">{study.status}</Badge>
                </div>
                <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  {study.name}
                </h1>
                <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{study.summary}</p>
                <div className="mt-5 space-y-2">
                  <TechBanner technologyIds={study.technologyIds ?? []} />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="font-mono text-xs uppercase">
                      {study.difficulty ?? 'Advanced'}
                    </Badge>
                    {study.timeline ? (
                      <Badge variant="outline" className="font-mono text-xs uppercase">
                        {study.timeline}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </header>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav
            aria-label="Case study sections"
            className="hidden lg:block"
          >
            <div className="sticky top-24 space-y-1">
              <p className="mb-3 font-mono text-xs tracking-[0.2em] text-soft-cyan uppercase sm:text-sm">
                On this page
              </p>
              {TOC.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    'block rounded-md px-3 py-2 text-sm transition-colors',
                    activeId === item.id
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex flex-col gap-6">
            <Section id="business-context" title="Business Context">
              {study.businessContext}
            </Section>
            <Section id="problem" title="Problem Statement">
              {study.problem}
            </Section>
            <Section id="objective" title="Objective">
              {study.objective}
            </Section>
            <Section id="solution" title="Solution Overview">
              {study.solution}
            </Section>
            <Section id="architecture" title="Architecture">
              {study.architecture}
            </Section>
            <Reveal>
              <section className="scroll-mt-28">
                <ArchitectureFlow nodes={study.architectureNodes ?? []} />
              </section>
            </Reveal>

            <Reveal>
              <section id="responsibilities" className="scroll-mt-28">
                <Card className="glass border-border/80">
                  <CardHeader>
                    <CardTitle className="font-display text-xl">My Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-wrap gap-2">
                      {study.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-border bg-secondary/30 px-3 py-1.5 text-sm text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </Reveal>

            <Reveal>
              <section id="decisions" className="scroll-mt-28">
                <Card className="glass border-border/80">
                  <CardHeader>
                    <CardTitle className="font-display text-xl">Engineering Decisions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {study.decisions.map((item) => (
                      <div key={item.decision} className="rounded-xl border border-border/80 p-4">
                        <p className="font-medium text-foreground">{item.decision}</p>
                        <p className="mt-2 text-sm text-muted-foreground text-pretty">
                          {item.rationale}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>
            </Reveal>

            <Reveal>
              <section id="challenges" className="scroll-mt-28">
                <Card className="glass border-border/80">
                  <CardHeader>
                    <CardTitle className="font-display text-xl">Challenges</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {study.challenges.map((item) => (
                      <div key={item.challenge} className="rounded-xl border border-border/80 p-4">
                        <p className="font-medium text-foreground">{item.challenge}</p>
                        <p className="mt-2 text-sm text-muted-foreground text-pretty">
                          <span className="text-soft-cyan">Resolution: </span>
                          {item.resolution}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>
            </Reveal>

            <Reveal>
              <section id="stack" className="scroll-mt-28">
                <Card className="glass border-border/80">
                  <CardHeader>
                    <CardTitle className="font-display text-xl">Technology Stack</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    {study.stack.map((group) => (
                      <div key={group.group}>
                        <p className="font-mono text-xs tracking-wide text-soft-cyan uppercase sm:text-sm">
                          {group.group}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="rounded-md border border-border px-2 py-1 font-mono text-xs text-muted-foreground sm:text-sm"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>
            </Reveal>

            <Reveal>
              <section id="gallery" className="scroll-mt-28">
                <Card className="glass border-border/80">
                  <CardHeader>
                    <CardTitle className="font-display text-xl">Engineering Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {study.gallery && study.gallery.length > 0 ? (
                      <MediaCarousel items={study.gallery} />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Gallery assets will appear here as screenshots, diagrams, and workflow visuals are added.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </section>
            </Reveal>

            <Reveal>
              <section id="cross-references" className="scroll-mt-28">
                <Card className="glass border-border/80">
                  <CardHeader>
                    <CardTitle className="font-display text-xl">Used Technologies</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {(study.technologyIds ?? []).map((technologyId) => {
                      const technology = getTechnologyById(technologyId)
                      if (!technology) return null
                      return (
                        <span
                          key={technology.id}
                          className="inline-flex items-center gap-2 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
                        >
                          <img
                            src={technology.logo}
                            alt={`${technology.name} logo`}
                            className="size-3.5 rounded-sm object-contain"
                          />
                          {technology.name}
                        </span>
                      )
                    })}
                  </CardContent>
                </Card>
              </section>
            </Reveal>

            <Section id="outcome" title="Outcome">
              {study.outcome}
            </Section>

            <Reveal>
              <section id="learnings" className="scroll-mt-28">
                <Card className="glass border-border/80">
                  <CardHeader>
                    <CardTitle className="font-display text-xl">Key Learnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2 text-muted-foreground">
                      {study.learnings.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-soft-cyan">▹</span>
                          <span className="text-pretty">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </Reveal>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild variant="outline">
                <a href={profile.resumeUrl}>
                  Download Resume
                  <Download data-icon="inline-end" />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/contact">Discuss this work</Link>
              </Button>
            </div>

            <RelatedCaseStudies studies={related} />
          </div>
        </div>
      </article>
    </>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: string
}) {
  return (
    <Reveal>
      <section id={id} className="scroll-mt-28">
        <Card className="glass border-border/80">
          <CardHeader>
            <CardTitle className="font-display text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-pretty">{children}</CardContent>
        </Card>
      </section>
    </Reveal>
  )
}
