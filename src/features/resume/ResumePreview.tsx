import { Download, FileText } from 'lucide-react'
import { profile } from '@/content/profile'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ResumePreview() {
  return (
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
              <p className="mt-2 text-muted-foreground">{profile.role}</p>
              <p className="mt-1 font-mono text-xs text-soft-cyan">{profile.location}</p>
            </div>
            <FileText className="size-8 text-electric-blue" />
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <p className="text-muted-foreground text-pretty">{profile.description}</p>
            <div>
              <h3 className="font-display text-lg font-semibold">Core strengths</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {profile.messages.map((message) => (
                  <li
                    key={message}
                    className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-muted-foreground"
                  >
                    {message}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">Focus stack</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Azure · Docker · React · Supabase · Microsoft 365 · n8n · Linux · Networking
              </p>
            </div>
            <MagneticButton href={profile.resumeUrl} className="self-start">
              Download Resume
              <Download data-icon="inline-end" />
            </MagneticButton>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  )
}
