import { Seo } from '@/components/layout/Seo';
import { ContactPanel } from '@/features/contact/ContactPanel';

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Contact Rushak Pachpande — email, LinkedIn, GitHub, and resume."
        path="/contact"
      />
      <div className="pt-8">
        <ContactPanel />
      </div>
    </>
  );
}
