import { Link } from 'react-router-dom';
import { getHomeExperienceSnapshot } from '@/lib/portfolio';
import { publicMediaUrl } from '@/lib/supabase';
import { usePortfolio } from '@/hooks/usePortfolio';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { Reveal } from '@/components/shared/Reveal';
import { MagneticButton } from '@/components/shared/MagneticButton';

export function HomeAbout() {
  const { profile, siteConfig } = usePortfolio();
  const chrome = siteConfig.chrome.homeAbout;
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-soft-cyan uppercase sm:text-sm">
            {chrome.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {chrome.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty sm:text-lg">
            {profile.about.whoIAm}
          </p>
          <p className="mt-3 text-muted-foreground text-pretty">
            {profile.about.approach}
          </p>
          <div className="mt-6">
            <MagneticButton to="/about" variant="outline" size="default">
              {chrome.ctaLabel}
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ExperienceSnapshot() {
  const { timeline, siteConfig } = usePortfolio();
  const highlights = getHomeExperienceSnapshot(timeline);
  const chrome = siteConfig.chrome.experienceSnapshot;

  if (highlights.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-soft-cyan uppercase sm:text-sm">
              {chrome.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              {chrome.title}
            </h2>
          </div>
          <Link
            to="/experience"
            className="text-sm text-electric-blue hover:underline"
          >
            {chrome.ctaLabel}
          </Link>
        </div>
      </Reveal>

      <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
        {highlights.map((item, index) => {
          const title = item.homeTitle?.trim() || item.title;
          const detail = item.homeDetail?.trim() || item.description;
          const logoSrc = item.logo
            ? item.logo
            : item.logoPath
              ? publicMediaUrl(item.logoPath)
              : undefined;
          return (
            <Reveal key={item.id} delay={index * 0.04} className="min-w-0">
              <OverlayCard
                gradient="experience"
                size="compact"
                eyebrow="Experience"
                title={title}
                heroImage={
                  logoSrc
                    ? {
                        src: logoSrc,
                        alt: item.logoAlt ?? `${title} logo`,
                      }
                    : undefined
                }
                body={<p className="text-sm text-muted-foreground">{detail}</p>}
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
