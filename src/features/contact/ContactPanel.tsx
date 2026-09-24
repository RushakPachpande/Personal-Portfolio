import { useState, type FormEvent } from 'react';
import { Download, ExternalLink, Mail, Send } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { usePreviewMode } from '@/hooks/usePreviewMode';
import { submitContact } from '@/services/portfolio-public';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { SurfaceCard } from '@/components/cards/SurfaceCard';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Reveal, SectionHeader } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ContactPanel() {
  const { profile, siteConfig } = usePortfolio();
  const chrome = siteConfig.chrome.contact;
  const isPreview = usePreviewMode();
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPreview) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const message = String(formData.get('message') ?? '');
    setStatus('idle');
    setErrorMessage('');
    try {
      await submitContact({ name, email, message });
      setStatus('sent');
      form.reset();
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to send message.'
      );
    }
  };

  return (
    <section className="mx-auto min-w-0 max-w-6xl xl:max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <SectionHeader
          eyebrow={chrome.eyebrow}
          title={chrome.title}
          description={chrome.description}
        />
      </Reveal>

      <div className="mt-12 grid min-w-0 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <OverlayCard
            gradient="contact"
            size="panel"
            disableTilt
            eyebrow="Contact"
            title="Channels"
            hero={
              <Mail
                className="size-12 text-soft-cyan/90 sm:size-14"
                strokeWidth={1.25}
              />
            }
            body={
              <div className="flex flex-col gap-4 text-sm">
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
                  {profile.resumeUrl ? (
                    <MagneticButton
                      href={profile.resumeUrl}
                      variant="outline"
                      size="default"
                    >
                      Download Resume
                      <Download data-icon="inline-end" />
                    </MagneticButton>
                  ) : null}
                </div>
                <p className="text-muted-foreground">{profile.location}</p>
              </div>
            }
          />
        </Reveal>

        <Reveal delay={0.06}>
          <SurfaceCard title="Send a message" gradient="contact">
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
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
              <Button
                type="submit"
                size="lg"
                className="self-start"
                disabled={isPreview}
                title={
                  isPreview
                    ? 'Contact submit is disabled in draft preview.'
                    : 'Send this message to the studio inbox.'
                }
              >
                Send message
                <Send data-icon="inline-end" />
              </Button>
              {isPreview ? (
                <p className="font-mono text-xs text-muted-foreground">
                  Preview only - submissions are disabled.
                </p>
              ) : null}
              {status === 'sent' ? (
                <p className="font-mono text-xs text-soft-cyan">
                  Message received. I’ll get back to you soon.
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="font-mono text-xs text-destructive">
                  {errorMessage}
                </p>
              ) : null}
            </form>
          </SurfaceCard>
        </Reveal>
      </div>
    </section>
  );
}
