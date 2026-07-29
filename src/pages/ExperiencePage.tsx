import { Seo } from '@/components/layout/Seo'
import { ExperienceTimeline } from '@/features/timeline/ExperienceTimeline'

export function ExperiencePage() {
  return (
    <>
      <Seo
        title="Experience"
        description="Career timeline, education, major deployments, and achievements."
        path="/experience"
      />
      <div className="pt-8">
        <ExperienceTimeline />
      </div>
    </>
  )
}
