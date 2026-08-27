import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getCardGradient, type CardGradientKey } from '@/lib/cardGradients';
import { cn } from '@/lib/utils';

type OverlayCardProps = {
  eyebrow?: string;
  title: string;
  href?: string;
  gradient?: CardGradientKey;
  featured?: boolean;
  className?: string;
  ariaLabel?: string;
  hero?: ReactNode;
  heroImage?: { src: string; alt: string };
  body?: ReactNode;
  footer?: ReactNode;
};

function OverlayCardShell({
  href,
  ariaLabel,
  featured,
  className,
  children,
}: {
  href?: string;
  ariaLabel?: string;
  featured?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const shellClassName = cn(
    'group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/70 ring-1 ring-foreground/10 backdrop-blur-xl transition-all duration-300',
    href &&
      'hover:border-primary/50 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--electric-blue)_12%,transparent)] focus-within:border-primary/50 motion-safe:hover:scale-[1.01] motion-reduce:transform-none',
    featured && 'featured',
    className
  );

  if (href) {
    return (
      <Link
        to={href}
        aria-label={ariaLabel ?? undefined}
        className={shellClassName}
      >
        {children}
      </Link>
    );
  }

  return <article className={shellClassName}>{children}</article>;
}

export function OverlayCard({
  eyebrow,
  title,
  href,
  gradient = 'default',
  featured = false,
  className,
  ariaLabel,
  hero,
  heroImage,
  body,
  footer,
}: OverlayCardProps) {
  return (
    <OverlayCardShell
      href={href}
      ariaLabel={ariaLabel ?? (href ? `View ${title}` : undefined)}
      featured={featured}
      className={className}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          featured
            ? 'aspect-4/3 sm:aspect-video'
            : 'aspect-4/3 sm:aspect-16/10',
          getCardGradient(gradient)
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {hero ? (
            hero
          ) : heroImage ? (
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className="max-h-[55%] max-w-[55%] object-contain transition-transform duration-300 motion-safe:group-hover/card:scale-105 motion-reduce:transform-none"
              loading="lazy"
            />
          ) : null}
        </div>

        <div className="overlay-hero-scrim absolute inset-x-0 bottom-0 px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
          {eyebrow ? (
            <p className="font-mono text-xs tracking-wide text-soft-cyan uppercase sm:text-sm">
              {eyebrow}
            </p>
          ) : null}
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
            {title}
          </h3>
        </div>

        {href ? (
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/60 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 group-focus-within/card:opacity-100 sm:top-4 sm:right-4"
          >
            <ArrowUpRight className="size-4" />
          </span>
        ) : null}
      </div>

      {body || footer ? (
        <div className="flex min-w-0 flex-1 flex-col gap-3 px-4 py-4 sm:px-5">
          {body}
          {footer}
        </div>
      ) : null}
    </OverlayCardShell>
  );
}
