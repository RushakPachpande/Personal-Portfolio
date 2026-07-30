import { getCaseStudiesByCategory } from '@/content/caseStudies'
import { Seo } from '@/components/layout/Seo'
import { CaseStudyGrid } from '@/features/case-studies/CaseStudyGrid'

export function PlatformsPage() {
  return (
    <>
      <Seo
        title="Platforms"
        description="Engineering case studies for software platforms including Navdrishti and BrainPulses."
        path="/platforms"
      />
      <div className="pt-8 pb-12">
        <CaseStudyGrid
          studies={getCaseStudiesByCategory('platform')}
          eyebrow="Platform Engineering"
          title="Software platforms"
          description="Products owned from architecture and development through deployment and production care."
        />
      </div>
    </>
  )
}
