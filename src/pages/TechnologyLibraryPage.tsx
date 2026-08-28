import { Seo } from '@/components/layout/Seo';
import { TechnologyLibraryGrid } from '@/features/technology-library/TechnologyLibraryGrid';

export function TechnologyLibraryPage() {
  return (
    <>
      <Seo
        title="Technology Library"
        description="Official technology branding, usage context, and linked engineering case studies."
        path="/technology-library"
      />
      <div className="pt-8 pb-12">
        <TechnologyLibraryGrid />
      </div>
    </>
  );
}
