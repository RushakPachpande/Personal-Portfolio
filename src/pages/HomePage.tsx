import { getFeaturedProjects } from '@/content/projects'
import { Seo } from '@/components/layout/Seo'
import { HeroSection } from '@/features/hero/HeroSection'
import { SystemOverview } from '@/features/overview/SystemOverview'
import { FeaturedSystems } from '@/features/systems/FeaturedSystems'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { Reveal } from '@/components/shared/Reveal'

export function HomePage() {
  return (
    <>
      <Seo
        title="Home"
        description="Platform engineer owning cloud, automation, infrastructure, and full-stack systems from idea to production."
        path="/"
      />
      <HeroSection />
      <SystemOverview />
      <FeaturedSystems projects={getFeaturedProjects()} limit={4} />
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="glass flex flex-col items-start justify-between gap-6 rounded-2xl p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Need someone who owns the whole platform?
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                From architecture and automation to deployment and operations — let’s talk.
              </p>
            </div>
            <MagneticButton to="/contact">Open Mission Control</MagneticButton>
          </div>
        </section>
      </Reveal>
    </>
  )
}
