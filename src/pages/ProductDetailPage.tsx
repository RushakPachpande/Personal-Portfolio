import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getProductBySlug } from '@/content/products'
import { Seo } from '@/components/layout/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/shared/Reveal'

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Product not found</h1>
        <p className="mt-3 text-muted-foreground">That work item does not exist in the catalog.</p>
        <Button asChild className="mt-8">
          <Link to="/work">Back to What I Build</Link>
        </Button>
      </div>
    )
  }

  const sections = [
    { title: 'Mission', body: product.mission },
    { title: 'Problem', body: product.problem },
    { title: 'Solution', body: product.solution },
    { title: 'Role', body: product.role },
    { title: 'Outcome', body: product.outcome },
  ]

  return (
    <>
      <Seo title={product.name} description={product.tagline} path={`/work/${product.slug}`} />
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/work">
            <ArrowLeft data-icon="inline-start" />
            All products
          </Link>
        </Button>

        <Reveal>
          <div className="glass rounded-2xl border-border/80 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{product.incomplete ? 'TODO' : product.status}</Badge>
              <Badge variant="secondary">{product.role}</Badge>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{product.tagline}</p>
            {product.incomplete ? (
              <p className="mt-4 font-mono text-sm text-amber-300/90">
                Details forthcoming — {product.todoNote}
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 0.04}>
              <Card className="glass h-full border-border/80">
                <CardHeader>
                  <CardTitle className="font-display text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-pretty">{section.body}</CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {!product.incomplete && product.technology.length > 0 ? (
          <Reveal>
            <Card className="glass mt-4 border-border/80">
              <CardHeader>
                <CardTitle className="font-display text-xl">Technology</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {product.technology.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </CardContent>
            </Card>
          </Reveal>
        ) : null}
      </article>
    </>
  )
}
