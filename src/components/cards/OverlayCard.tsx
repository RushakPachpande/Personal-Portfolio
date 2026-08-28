import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getCardGradient, type CardGradientKey } from '@/lib/cardGradients';
import { cn } from '@/lib/utils';

export type OverlayCardStat = {
  value: string;
  label: string;
};

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
  stats?: OverlayCardStat[];
  headerActions?: ReactNode;
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
    'overlay-card group/card relative flex h-full min-w-0 flex-col ring-1 ring-foreground/10',
    href && 'overlay-card--link',
    featured && 'overlay-card--featured featured',
    className
  );

  if (href) {
    return (
      <Link to={href} aria-label={ariaLabel} className={shellClassName}>
        {children}
      </Link>
    );
  }

  return <article className={shellClassName}>{children}</article>;
}

function OverlayCardBanner({
  gradient,
  eyebrow,
  href,
  headerActions,
  hero,
  heroImage,
}: {
  gradient: CardGradientKey;
  eyebrow?: string;
  href?: string;
  headerActions?: ReactNode;
  hero?: ReactNode;
  heroImage?: { src: string; alt: string };
}) {
  return (
    <div className={cn('overlay-card__banner', getCardGradient(gradient))}>
      <div className="overlay-card__notch" aria-hidden="true" />
      <div className="overlay-card__header">
        {eyebrow ? <p className="overlay-card__eyebrow">{eyebrow}</p> : <span />}
        <div className="overlay-card__actions">
          {headerActions}
          {href ? (
            <span className="overlay-card__arrow" aria-hidden="true">
              <ArrowUpRight className="size-4" />
            </span>
          ) : null}
        </div>
      </div>
      {hero || heroImage ? (
        <div className="overlay-card__hero">
          {hero ? (
            hero
          ) : heroImage ? (
            <img src={heroImage.src} alt={heroImage.alt} loading="lazy" />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function OverlayCardStats({ stats }: { stats: OverlayCardStat[] }) {
  return (
    <div className="overlay-card__stats">
      {stats.map((stat) => (
        <div key={`${stat.label}-${stat.value}`} className="overlay-card__stat">
          <span className="overlay-card__stat-value">{stat.value}</span>
          <span className="overlay-card__stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
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
  stats,
  headerActions,
}: OverlayCardProps) {
  return (
    <OverlayCardShell
      href={href}
      ariaLabel={ariaLabel ?? (href ? `View ${title}` : undefined)}
      featured={featured}
      className={className}
    >
      <OverlayCardBanner
        gradient={gradient}
        eyebrow={eyebrow}
        href={href}
        headerActions={headerActions}
        hero={hero}
        heroImage={heroImage}
      />
      <div className="overlay-card__bottom">
        <h3 className="overlay-card__title">{title}</h3>
        {stats && stats.length > 0 ? <OverlayCardStats stats={stats} /> : null}
        {body || footer ? (
          <div className="overlay-card__body">
            {body}
            {footer}
          </div>
        ) : null}
      </div>
    </OverlayCardShell>
  );
}
