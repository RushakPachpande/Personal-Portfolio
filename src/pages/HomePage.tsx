import { getCompleteProducts } from '@/content/products'
import { initiatives } from '@/content/initiatives'
import { Seo } from '@/components/layout/Seo'
import { HeroSection } from '@/features/hero/HeroSection'
import { HomeTeasers } from '@/features/home/HomeTeasers'
import { ProductGrid } from '@/features/work/ProductGrid'
import { InitiativeGrid } from '@/features/infrastructure/InitiativeGrid'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { Reveal } from '@/components/shared/Reveal'

export function HomePage() {
  return (
    <>
      <Seo
        title="Home"
        description="Platform engineer building complete digital platforms—from infrastructure to production."
        path="/"
      />
      <HeroSection />
      <HomeTeasers />
      <ProductGrid products={getCompleteProducts()} limit={2} />
      <InitiativeGrid initiatives={initiatives.filter((item) => !item.incomplete)} limit={3} />
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="glass flex flex-col items-start justify-between gap-6 rounded-2xl p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Need someone who owns the whole platform?
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                From architecture and automation to deployment and operations—let’s talk.
              </p>
            </div>
            <MagneticButton to="/contact">Get in touch</MagneticButton>
          </div>
        </section>
      </Reveal>
    </>
  )
}
