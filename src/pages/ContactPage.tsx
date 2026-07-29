import { Seo } from '@/components/layout/Seo'
import { ContactMissionControl } from '@/features/contact/ContactMissionControl'

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Mission Control contact panel for Rushak Pachpande."
        path="/contact"
      />
      <div className="pt-8">
        <ContactMissionControl />
      </div>
    </>
  )
}
