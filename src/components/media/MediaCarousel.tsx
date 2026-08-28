import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import type { CaseStudyMediaItem } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { LogoFrame } from './LogoFrame';
import { LightboxModal } from './LightboxModal';

type MediaCarouselProps = {
  items: CaseStudyMediaItem[];
};

export function MediaCarousel({ items }: MediaCarouselProps) {
  const [index, setIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<CaseStudyMediaItem | null>(
    null
  );

  if (items.length === 0) return null;

  const current = items[index];

  const prev = () =>
    setIndex((value) => (value - 1 + items.length) % items.length);
  const next = () => setIndex((value) => (value + 1) % items.length);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border bg-card/30">
        <div className="relative">
          <LogoFrame
            src={current.src}
            alt={current.caption}
            variant="gallery"
          />
          <div className="absolute top-3 right-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLightboxItem(current)}
            >
              <Expand data-icon="inline-start" />
              Open
            </Button>
          </div>
          {items.length > 1 ? (
            <>
              <Button
                variant="outline"
                size="icon-sm"
                className="absolute top-1/2 left-2 -translate-y-1/2 sm:left-3"
                onClick={prev}
                aria-label="Previous media"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                className="absolute top-1/2 right-2 -translate-y-1/2 sm:right-3"
                onClick={next}
                aria-label="Next media"
              >
                <ChevronRight />
              </Button>
            </>
          ) : null}
        </div>
        <div className="border-t border-border p-4">
          <p className="text-sm text-muted-foreground text-pretty">
            {current.caption}
          </p>
          {items.length > 1 ? (
            <p className="mt-2 font-mono text-xs text-soft-cyan">
              {index + 1} / {items.length}
            </p>
          ) : null}
        </div>
      </div>

      <LightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />
    </>
  );
}
