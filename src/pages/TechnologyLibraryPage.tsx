import { caseStudies } from '@/content/caseStudies'
import { Seo } from '@/components/layout/Seo'
import { TechnologyLibraryGrid } from '@/features/technology-library/TechnologyLibraryGrid'

function buildUsageMap() {
  const map: Record<string, string[]> = {}
  for (const study of caseStudies) {
    for (const id of study.technologyIds ?? []) {
      if (!map[id]) map[id] = []
      map[id].push(study.slug)
    }
  }
  return map
}

export function TechnologyLibraryPage() {
  return (
    <>
      <Seo
        title="Technology Library"
        description="Official technology branding, usage context, and linked engineering case studies."
        path="/technology-library"
      />
      <div className="pt-8 pb-12">
        <TechnologyLibraryGrid usedInMap={buildUsageMap()} />
      </div>
    </>
  )
}
