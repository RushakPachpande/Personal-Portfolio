import { getCaseStudiesByCategory } from '@/lib/portfolio'
import { usePortfolio } from '@/hooks/usePortfolio'
import { Seo } from '@/components/layout/Seo'
import { CaseStudyGrid } from '@/features/case-studies/CaseStudyGrid'

export function InfrastructurePage() {
  const { caseStudies } = usePortfolio()
  return (
    <>
      <Seo
        title="Infrastructure"
        description="Engineering initiatives across Microsoft 365, Azure, Docker, Linux, storage, and secure remote access."
        path="/infrastructure"
      />
      <div className="pt-8 pb-12">
        <CaseStudyGrid
          studies={getCaseStudiesByCategory(caseStudies, 'infrastructure')}
          eyebrow="Infrastructure Engineering"
          title="Engineering initiatives"
          description="Cloud, tenants, hosting, storage, and remote access—owned as operable platforms, not one-off tickets."
        />
      </div>
    </>
  )
}
