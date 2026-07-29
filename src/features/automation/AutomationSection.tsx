import { automationItems } from '@/content/automation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'

export function AutomationSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Automation"
          title="Workflows that remove operational toil"
          description="Self-hosted automation platforms and enterprise integrations that improve reliability and day-to-day operations."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {automationItems.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <Card className="glass h-full border-border/80 transition-transform duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  {item.incomplete ? (
                    <Badge variant="secondary">TODO</Badge>
                  ) : (
                    <Badge variant="secondary">Automation</Badge>
                  )}
                </div>
                <CardTitle className="font-display text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
                <p className="text-foreground">{item.summary}</p>
                {item.incomplete ? (
                  <p className="font-mono text-xs text-amber-300/90">
                    Details forthcoming — {item.todoNote}
                  </p>
                ) : (
                  <>
                    <p className="text-pretty">{item.details}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
