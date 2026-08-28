import { X } from 'lucide-react';
import type { CaseStudyMediaItem } from '@/types/portfolio';
import { LogoFrame } from '@/components/media/LogoFrame';
import { Button } from '@/components/ui/button';

type LightboxModalProps = {
  item: CaseStudyMediaItem | null;
  onClose: () => void;
};

export function LightboxModal({ item, onClose }: LightboxModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close lightbox"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden overflow-y-auto rounded-2xl border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="font-mono text-sm text-soft-cyan uppercase tracking-wide">
            {item.type}
          </p>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close"
          >
            <X />
          </Button>
        </div>
        <LogoFrame src={item.src} alt={item.caption} variant="lightbox" />
        <p className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
          {item.caption}
        </p>
      </div>
    </div>
  );
}
