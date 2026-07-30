import { Seo } from '@/components/layout/Seo'
import { PhilosophyGrid } from '@/features/philosophy/PhilosophyGrid'

export function PhilosophyPage() {
  return (
    <>
      <Seo
        title="Engineering Philosophy"
        description="Ownership, documentation, automation, scalability, maintainability, simplicity, continuous learning, and business impact."
        path="/philosophy"
      />
      <div className="pt-8">
        <PhilosophyGrid />
      </div>
    </>
  )
}
