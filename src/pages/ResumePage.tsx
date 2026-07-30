import { Download, FileText } from 'lucide-react'
import { profile } from '@/content/profile'
import { Seo } from '@/components/layout/Seo'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ResumePage() {
  return (
    <>
      <Seo
        title="Resume"
        description="Resume preview and download for Rushak Pachpande, Platform Engineer."
        path="/resume"
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Resume"
            title="A concise signal of platform ownership"
            description="Preview the professional summary, then download the full PDF."
          />
        </Reveal>

        <Reveal>
          <Card className="glass mx-auto mt-12 max-w-3xl border-border/80">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="font-display text-3xl">{profile.name}</CardTitle>
                <p className="mt-2 text-muted-foreground">{profile.resumeTitle}</p>
                <p className="mt-1 font-mono text-xs text-soft-cyan">{profile.location}</p>
              </div>
              <FileText className="size-8 text-electric-blue" />
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <p className="text-muted-foreground text-pretty">{profile.description}</p>
              <div>
                <h3 className="font-display text-lg font-semibold">Focus</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {profile.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-muted-foreground"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Summary</h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                  {profile.summaryBullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-soft-cyan">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <MagneticButton href={profile.resumeUrl} className="self-start">
                Download Resume
                <Download data-icon="inline-end" />
              </MagneticButton>
            </CardContent>
          </Card>
        </Reveal>
      </section>
    </>
  )
}
