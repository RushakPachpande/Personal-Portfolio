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
        'overflow-hidden rounded-2xl border border-border/80 bg-card/70 ring-1 ring-foreground/10 backdrop-blur-xl',
        className
      )}
    >
      {gradient ? (
        <div
          className={cn('h-1 w-full', getCardGradient(gradient))}
          aria-hidden="true"
        />
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
