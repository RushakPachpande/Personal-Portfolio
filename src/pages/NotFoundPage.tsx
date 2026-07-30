import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { MagneticButton } from '@/components/shared/MagneticButton'

export function NotFoundPage() {
  return (
    <>
      <Seo title="404" description="Page not found." path="/404" />
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <p className="font-mono text-xs tracking-[0.25em] text-soft-cyan uppercase">Error 404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">Route not found</h1>
        <p className="mt-4 text-muted-foreground">
          This page does not exist. Return home or browse what I built.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <MagneticButton to="/">Return home</MagneticButton>
          <MagneticButton to="/contact" variant="outline">
            Contact
          </MagneticButton>
        </div>
        <Link to="/work" className="mt-6 text-sm text-muted-foreground hover:text-foreground">
          Or browse products →
        </Link>
      </section>
    </>
  )
}
