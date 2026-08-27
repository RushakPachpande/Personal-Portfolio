import { profile } from '@/content/profile'
import { Seo } from '@/components/layout/Seo'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, responsiveCardGridCompactClassName } from '@/lib/utils'

const sections = [
  { title: 'Who I am', body: profile.about.whoIAm },
  { title: 'How I think', body: profile.about.howIThink },
  { title: 'What I enjoy building', body: profile.about.whatIEnjoy },
  { title: 'My engineering approach', body: profile.about.approach },
] as const

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Platform engineer focused on ownership—building complete digital platforms from infrastructure to production."
        path="/about"
      />
      <section className="mx-auto min-w-0 max-w-6xl px-4 pt-12 pb-20 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="About"
            title="Ownership over tickets"
            description="Not a biography—how I work across products, infrastructure, and automation."
          />
        </Reveal>

        <div className={cn('mt-12', responsiveCardGridCompactClassName)}>
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 0.05} className="min-w-0">
              <Card className="glass h-full min-w-0 border-border/80">
                <CardHeader>
                  <CardTitle className="font-display text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-pretty">{section.body}</CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <ul className="glass mt-8 flex flex-col gap-3 rounded-2xl p-6 text-sm text-muted-foreground">
            {profile.summaryBullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="text-soft-cyan">▹</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  )
}
