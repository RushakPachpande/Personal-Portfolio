import { usePortfolio } from '@/hooks/usePortfolio';
import { Seo } from '@/components/layout/Seo';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { Reveal, SectionHeader } from '@/components/shared/Reveal';
import { cn, responsiveCardGridCompactClassName } from '@/lib/utils';

export function AboutPage() {
  const { profile } = usePortfolio();
  const sections = [
    { title: 'Who I am', body: profile.about.whoIAm },
    { title: 'How I think', body: profile.about.howIThink },
    { title: 'What I enjoy building', body: profile.about.whatIEnjoy },
    { title: 'My engineering approach', body: profile.about.approach },
  ] as const;
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
            <Reveal
              key={section.title}
              delay={index * 0.05}
              className="min-w-0"
            >
              <OverlayCard
                gradient="about"
                size="standard"
                eyebrow="About"
                title={section.title}
                hero={
                  <span className="font-display text-4xl font-semibold text-foreground/20 sm:text-5xl">
                    0{index + 1}
                  </span>
                }
                body={
                  <p className="text-sm text-muted-foreground text-pretty">
                    {section.body}
                  </p>
                }
              />
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
  );
}
