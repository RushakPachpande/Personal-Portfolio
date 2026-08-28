import type { ReactNode } from 'react';
import { getCardGradient, type CardGradientKey } from '@/lib/cardGradients';
import { cn } from '@/lib/utils';

type SurfaceCardProps = {
  title?: string;
  gradient?: CardGradientKey;
  className?: string;
  header?: ReactNode;
  children: ReactNode;
};

export function SurfaceCard({
  title,
  gradient,
  className,
  header,
  children,
}: SurfaceCardProps) {
  return (
    <article
      className={cn(
        'overlay-card overlay-card--surface ring-1 ring-foreground/10',
        className
      )}
    >
      {gradient ? (
        <div
          className={cn(
            'overlay-card__banner overlay-card__banner--strip',
            getCardGradient(gradient)
          )}
          aria-hidden="true"
        >
          <div className="overlay-card__notch" />
        </div>
      ) : null}
      {header ??
        (title ? (
          <div className="border-b border-border/60 px-5 py-4 sm:px-6">
            <h3 className="font-display text-xl font-semibold tracking-tight">
              {title}
            </h3>
          </div>
        ) : null)}
      <div className="px-5 py-4 sm:px-6 sm:py-5">{children}</div>
    </article>
  );
}
