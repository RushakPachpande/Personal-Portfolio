import { products } from '@/content/products'
import { Seo } from '@/components/layout/Seo'
import { ProductGrid } from '@/features/work/ProductGrid'

export function WorkPage() {
  return (
    <>
      <Seo
        title="What I Build"
        description="Software products including Navdrishti and BrainPulses—owned from architecture to production."
        path="/work"
      />
      <div className="pt-8">
        <ProductGrid products={products} />
      </div>
    </>
  )
}
