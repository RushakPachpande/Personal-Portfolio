import { skillCategories } from '@/content/skills'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CapabilityMatrix() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Capability Matrix"
          title="Skills without the skill bars"
          description="A premium matrix of categories that map to real platform ownership — not percentage theater."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.03}>
            <Card className="glass h-full border-border/80 transition-transform duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-display text-xl">{category.name}</CardTitle>
                <CardDescription className="text-pretty">{category.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-border bg-secondary/40 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
