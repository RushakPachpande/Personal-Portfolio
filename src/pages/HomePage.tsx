import { getFeaturedCaseStudies } from '@/content/caseStudies'
import { Seo } from '@/components/layout/Seo'
import { HeroSection } from '@/features/hero/HeroSection'
import { HomeAbout, ExperienceSnapshot } from '@/features/home/HomeSections'
import { EngineeringAreas } from '@/features/home/EngineeringAreas'
import { EngineeringStats } from '@/features/home/EngineeringStats'
import { CaseStudyCard } from '@/features/case-studies/CaseStudyCard'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { Reveal, SectionHeader } from '@/components/shared/Reveal'

export function HomePage() {
  const featured = getFeaturedCaseStudies().slice(0, 4)

  return (
    <>
      <Seo
        title="Home"
        description="Platform engineer who owns business problems through architecture, implementation, deployment, and continuous improvement."
        path="/"
      />
      <HeroSection />
      <HomeAbout />
      <EngineeringAreas />
      <EngineeringStats />

      <section className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6">
        <div className="mb-10 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
        <Reveal>
          <SectionHeader
            eyebrow="Featured Case Studies"
            title="How the work was owned"
            description="Not project cards—engineering narratives covering context, decisions, challenges, and outcomes."
          />
        </Reveal>
        <div className="mt-12 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 [&>*]:min-w-0 [&>.featured]:md:col-span-2">
          {featured.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>
      </section>

      <ExperienceSnapshot />

      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="glass flex flex-col items-start justify-between gap-6 rounded-2xl p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Need someone who owns engineering outcomes?
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                From problem framing and architecture to production operations—let’s talk.
              </p>
            </div>
            <MagneticButton to="/contact">Get in touch</MagneticButton>
          </div>
        </section>
      </Reveal>
    </>
  )
}
