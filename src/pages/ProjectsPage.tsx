import { projects } from '@/content/projects'
import { Seo } from '@/components/layout/Seo'
import { FeaturedSystems } from '@/features/systems/FeaturedSystems'

export function ProjectsPage() {
  return (
    <>
      <Seo
        title="Projects"
        description="Featured systems spanning product platforms, Azure infrastructure, Microsoft 365, automation, and networking."
        path="/projects"
      />
      <div className="pt-8">
        <FeaturedSystems projects={projects} />
      </div>
    </>
  )
}
