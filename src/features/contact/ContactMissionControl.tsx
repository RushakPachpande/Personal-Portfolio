import { useState, type FormEvent } from 'react'
import { Mail, RadioTower, Send } from 'lucide-react'
import { profile } from '@/content/profile'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ContactMissionControl() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '')
    const email = String(form.get('email') ?? '')
    const message = String(form.get('message') ?? '')
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Mission Control"
          title="Open a channel"
          description="Professional contact surface designed like an operations console — ready for a future backend without changing the UI."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Card className="glass h-full border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-2xl">
                <RadioTower className="size-5 text-soft-cyan" />
                Channel status
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground">Operator:</span> {profile.name}
              </p>
              <p>
                <span className="text-foreground">Status:</span> {profile.currentStatus}
              </p>
              <p>
                <span className="text-foreground">Location:</span> {profile.location}
              </p>
              <a
                href={profile.socials.email}
                className="inline-flex items-center gap-2 text-electric-blue hover:underline"
              >
                <Mail className="size-4" />
                {profile.email}
              </a>
              <div className="mt-2 flex flex-wrap gap-2">
                <MagneticButton href={profile.socials.linkedin} variant="outline" size="default">
                  LinkedIn
                </MagneticButton>
                <MagneticButton href={profile.socials.github} variant="outline" size="default">
                  GitHub
                </MagneticButton>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.06}>
          <Card className="glass border-border/80">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Transmit message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@company.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the platform you need owned."
                  />
                </div>
                <Button type="submit" size="lg" className="self-start">
                  Send transmission
                  <Send data-icon="inline-end" />
                </Button>
                {status === 'sent' ? (
                  <p className="font-mono text-xs text-soft-cyan">
                    Mailto handoff initiated. Backend slot reserved for Supabase later.
                  </p>
                ) : null}
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
