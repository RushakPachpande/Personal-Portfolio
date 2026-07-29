import { Seo } from '@/components/layout/Seo'
import { AutomationSection } from '@/features/automation/AutomationSection'

export function AutomationPage() {
  return (
    <>
      <Seo
        title="Automation"
        description="Self-hosted n8n, Microsoft integrations, and operational automation improvements."
        path="/automation"
      />
      <div className="pt-8 pb-12">
        <AutomationSection />
      </div>
    </>
  )
}
