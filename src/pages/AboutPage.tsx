import { profile } from '@/content/profile'
import { Seo } from '@/components/layout/Seo'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SystemOverview } from '@/features/overview/SystemOverview'

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Rushak Pachpande — platform engineer who owns complete systems across cloud, automation, and production delivery."
        path="/about"
      />
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="About"
            title="Systems thinker. Platform owner."
            description="The story behind the dashboard — how ownership, infrastructure, and product delivery come together."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {profile.about.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.05}>
              <Card className="glass h-full border-border/80">
                <CardHeader>
                  <CardTitle className="font-mono text-xs tracking-[0.18em] text-soft-cyan uppercase">
                    Signal 0{index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-pretty">{paragraph}</CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
      <SystemOverview />
    </>
  )
}
