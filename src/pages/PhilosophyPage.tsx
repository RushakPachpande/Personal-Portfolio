import { Seo } from '@/components/layout/Seo'
import { PhilosophyGrid } from '@/features/philosophy/PhilosophyGrid'

export function PhilosophyPage() {
  return (
    <>
      <Seo
        title="Engineering Philosophy"
        description="Ownership, maintainability, automation, documentation, infrastructure as software, business-first thinking, and simplicity."
        path="/philosophy"
      />
      <div className="pt-8">
        <PhilosophyGrid />
      </div>
    </>
  )
}
