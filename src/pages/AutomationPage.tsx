import { getCaseStudiesByCategory } from '@/content/caseStudies'
import { Seo } from '@/components/layout/Seo'
import { CaseStudyGrid } from '@/features/case-studies/CaseStudyGrid'

export function AutomationPage() {
  return (
    <>
      <Seo
        title="Automation"
        description="Business automation case studies: n8n, SharePoint workflows, IT ticket automation, and enterprise SaaS operations."
        path="/automation"
      />
      <div className="pt-8 pb-12">
        <CaseStudyGrid
          studies={getCaseStudiesByCategory('automation')}
          eyebrow="Automation Engineering"
          title="Business automation initiatives"
          description="Workflow platforms and process automation that reduce toil and improve operational consistency."
        />
      </div>
    </>
  )
}
