import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Initiative } from '@/content/initiatives'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { cn } from '@/lib/utils'

type InitiativeGridProps = {
  initiatives: Initiative[]
  showHeader?: boolean
  limit?: number
}

export function InitiativeGrid({
  initiatives,
  showHeader = true,
  limit,
}: InitiativeGridProps) {
  const items = typeof limit === 'number' ? initiatives.slice(0, limit) : initiatives

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {showHeader ? (
        <Reveal>
          <SectionHeader
            eyebrow="Infrastructure & Operations"
            title="Engineering initiatives"
            description="Not product cards—platform work across cloud, tenants, hosting, and operations."
          />
        </Reveal>
      ) : null}

      <div className={cn('grid gap-5 md:grid-cols-2', showHeader && 'mt-12')}>
        {items.map((initiative, index) => (
          <Reveal key={initiative.slug} delay={index * 0.04}>
            <Link to={`/infrastructure/${initiative.slug}`} className="group block h-full">
              <Card className="glass h-full border-border/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge variant="secondary">
                      {initiative.incomplete ? 'TODO' : 'Initiative'}
                    </Badge>
                    <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <CardTitle className="font-display text-2xl">{initiative.name}</CardTitle>
                  <CardDescription className="text-pretty">{initiative.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <p>
                    <span className="text-foreground">Role:</span> {initiative.role}
                  </p>
                  {initiative.incomplete ? (
                    <p className="font-mono text-xs text-amber-300/90">
                      Details forthcoming — {initiative.todoNote}
                    </p>
                  ) : (
                    <p className="text-pretty">{initiative.outcome}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>

      {limit ? (
        <div className="mt-10 flex justify-center">
          <MagneticButton to="/infrastructure" variant="outline">
            View all initiatives
          </MagneticButton>
        </div>
      ) : null}
    </section>
  )
}
