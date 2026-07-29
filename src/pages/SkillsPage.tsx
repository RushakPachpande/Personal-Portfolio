import { Seo } from '@/components/layout/Seo'
import { CapabilityMatrix } from '@/features/skills/CapabilityMatrix'

export function SkillsPage() {
  return (
    <>
      <Seo
        title="Skills"
        description="Capability matrix across frontend, backend, cloud, infrastructure, networking, automation, security, databases, Microsoft 365, and DevOps."
        path="/skills"
      />
      <div className="pt-8">
        <CapabilityMatrix />
      </div>
    </>
  )
}
