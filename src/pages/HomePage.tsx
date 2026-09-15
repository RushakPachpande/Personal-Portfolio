import { getFeaturedCaseStudies } from '@/lib/portfolio';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Seo } from '@/components/layout/Seo';
import { HeroSection } from '@/features/hero/HeroSection';
import { HomeAbout, ExperienceSnapshot } from '@/features/home/HomeSections';
import { EngineeringAreas } from '@/features/home/EngineeringAreas';
import { EngineeringStats } from '@/features/home/EngineeringStats';
import { CaseStudyCard } from '@/features/case-studies/CaseStudyCard';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Reveal, SectionHeader } from '@/components/shared/Reveal';
import { ScrollFadeIn } from '@/components/effects/Parallax';
import { cn, responsiveCardGridAutoClassName } from '@/lib/utils';

export function HomePage() {
  const { caseStudies, siteConfig, profile } = usePortfolio();
  const featured = getFeaturedCaseStudies(caseStudies).slice(0, 4);
  const chrome = siteConfig.chrome;

  return (
    <>
      <Seo
        title="Home"
        description={
          siteConfig.seo.defaultDescription ??
          profile.description
        }
        path="/"
      />
      <HeroSection />
      <HomeAbout />
      <EngineeringAreas />
      <EngineeringStats />

      <section className="relative mx-auto max-w-6xl min-w-0 overflow-hidden px-4 py-12 sm:px-6">
        <div className="mb-10 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
        <ScrollFadeIn>
          <SectionHeader
            eyebrow={chrome.featured.eyebrow}
            title={chrome.featured.title}
            description={chrome.featured.description}
          />
        </ScrollFadeIn>
        <div className={cn('mt-12', responsiveCardGridAutoClassName)}>
          {featured.map((study, index) => (
            <CaseStudyCard
              key={study.slug}
              study={study}
              index={index}
              wide={index === 0}
              className={index === 0 ? 'featured-card-span' : undefined}
            />
          ))}
        </div>
      </section>

      <ExperienceSnapshot />

      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="glass flex flex-col items-start justify-between gap-6 rounded-2xl p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                {chrome.homeCta.title}
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                {chrome.homeCta.description}
              </p>
            </div>
            <MagneticButton to={chrome.homeCta.buttonTo}>
              {chrome.homeCta.buttonLabel}
            </MagneticButton>
          </div>
        </section>
      </Reveal>
    </>
  );
}
