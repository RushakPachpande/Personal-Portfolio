import { Seo } from '@/components/layout/Seo'
import { ResumePreview } from '@/features/resume/ResumePreview'

export function ResumePage() {
  return (
    <>
      <Seo
        title="Resume"
        description="Full resume preview for Rushak Pachpande — platform engineering, cloud infrastructure, automation, and production ownership."
        path="/resume"
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ResumePreview />
      </section>
    </>
  )
}
