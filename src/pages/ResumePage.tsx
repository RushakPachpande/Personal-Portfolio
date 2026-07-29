import { Seo } from '@/components/layout/Seo'
import { ResumePreview } from '@/features/resume/ResumePreview'

export function ResumePage() {
  return (
    <>
      <Seo
        title="Resume"
        description="Resume preview and download for Rushak Pachpande, Platform Engineer."
        path="/resume"
      />
      <div className="pt-8">
        <ResumePreview />
      </div>
    </>
  )
}
