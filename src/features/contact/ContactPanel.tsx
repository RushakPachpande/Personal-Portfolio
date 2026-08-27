import { useState, type FormEvent } from 'react'
import { Download, ExternalLink, Mail, Send } from 'lucide-react'
import { profile } from '@/content/profile'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ContactPanel() {
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
    <section className="mx-auto min-w-0 max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow="Contact"
          title="Let’s talk platforms"
          description="Simple, professional channels—email, LinkedIn, GitHub, and resume."
        />
      </Reveal>

      <div className="mt-12 grid min-w-0 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Card className="glass h-full border-border/80">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Channels</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm">
              <a
                href={profile.socials.email}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4 text-electric-blue" />
                {profile.email}
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="size-4 text-electric-blue" />
                linkedin.com/in/rushak-pachpande
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="size-4 text-electric-blue" />
                github.com/RushakPachpande
              </a>
              <div className="pt-2">
                <MagneticButton href={profile.resumeUrl} variant="outline" size="default">
                  Download Resume
                  <Download data-icon="inline-end" />
                </MagneticButton>
              </div>
              <p className="text-muted-foreground">{profile.location}</p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.06}>
          <Card className="glass border-border/80">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Send a message</CardTitle>
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
                  Send message
                  <Send data-icon="inline-end" />
                </Button>
                {status === 'sent' ? (
                  <p className="font-mono text-xs text-soft-cyan">
                    Opening your email client…
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
