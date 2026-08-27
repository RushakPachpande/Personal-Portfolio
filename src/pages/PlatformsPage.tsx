import { getCaseStudiesByCategory } from '@/lib/portfolio'
import { usePortfolio } from '@/hooks/usePortfolio'
import { Seo } from '@/components/layout/Seo'
import { CaseStudyGrid } from '@/features/case-studies/CaseStudyGrid'

export function PlatformsPage() {
  const { caseStudies } = usePortfolio()
  return (
    <>
      <Seo
        title="Platforms"
        description="Engineering case studies for software platforms including Navdrishti and BrainPulses."
        path="/platforms"
      />
      <div className="pt-8 pb-12">
        <CaseStudyGrid
          studies={getCaseStudiesByCategory(caseStudies, 'platform')}
          eyebrow="Platform Engineering"
          title="Software platforms"
          description="Products owned from architecture and development through deployment and production care."
        />
      </div>
    </>
  )
}
