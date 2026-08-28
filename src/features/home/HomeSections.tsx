import { Link } from 'react-router-dom';
import { usePortfolio } from '@/hooks/usePortfolio';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { Reveal } from '@/components/shared/Reveal';
import { MagneticButton } from '@/components/shared/MagneticButton';

export function HomeAbout() {
  const { profile } = usePortfolio();
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-soft-cyan uppercase sm:text-sm">
            About
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            I own platforms end-to-end
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty sm:text-lg">
            {profile.about.whoIAm}
          </p>
          <p className="mt-3 text-muted-foreground text-pretty">
            {profile.about.approach}
          </p>
          <div className="mt-6">
            <MagneticButton to="/about" variant="outline" size="default">
              More about how I work
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ExperienceSnapshot() {
  const highlights = [
    {
      title: 'NextGenInnov8',
      detail: 'Platform & Technology Professional · Apr 2025 — Present',
    },
    {
      title: 'Primary Technical Owner — Navdrishti',
      detail: 'End-to-end platform ownership through rollout',
    },
    {
      title: 'Azure cost optimization',
      detail: 'Nearly 50% infrastructure cost reduction',
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-soft-cyan uppercase sm:text-sm">
              Experience Snapshot
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              Recent ownership signals
            </h2>
          </div>
          <Link
            to="/experience"
            className="text-sm text-electric-blue hover:underline"
          >
            Full timeline →
          </Link>
        </div>
      </Reveal>

      <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
        {highlights.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.04} className="min-w-0">
            <OverlayCard
              gradient="experience"
              eyebrow="Experience"
              title={item.title}
              body={
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              }
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
