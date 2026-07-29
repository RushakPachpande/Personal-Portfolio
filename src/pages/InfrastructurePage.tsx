import { initiatives } from '@/content/initiatives'
import { Seo } from '@/components/layout/Seo'
import { InitiativeGrid } from '@/features/infrastructure/InitiativeGrid'

export function InfrastructurePage() {
  return (
    <>
      <Seo
        title="Infrastructure & Operations"
        description="Engineering initiatives across Microsoft 365, Azure, Docker, Linux, and self-hosted platforms."
        path="/infrastructure"
      />
      <div className="pt-8">
        <InitiativeGrid initiatives={initiatives} />
      </div>
    </>
  )
}
