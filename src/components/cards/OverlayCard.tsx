import { Link } from 'react-router-dom';
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getCardGradient, type CardGradientKey } from '@/lib/cardGradients';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

export type OverlayCardStat = {
  value: string;
  label: string;
};

export type OverlayCardSize = 'compact' | 'standard' | 'featured' | 'panel';

type OverlayCardProps = {
  eyebrow?: string;
  title: string;
  href?: string;
  gradient?: CardGradientKey;
  featured?: boolean;
  /** Wide layout: banner sits left of the content at >=768px. */
  wide?: boolean;
  /** Fixed outer height preset. */
  size?: OverlayCardSize;
  className?: string;
  ariaLabel?: string;
  hero?: ReactNode;
  heroImage?: { src: string; alt: string };
  body?: ReactNode;
  footer?: ReactNode;
  stats?: OverlayCardStat[];
  /** Always reserve 3 stat slots so sibling cards stay aligned. */
  statSlots?: number;
  headerActions?: ReactNode;
  /** Disable pointer tilt (e.g. dense panels). */
  disableTilt?: boolean;
};

const STAT_SLOT_COUNT = 3;

function OverlayCardShell({
  href,
  ariaLabel,
  featured,
  wide,
  size,
  className,
  children,
  onPointerMove,
  onPointerLeave,
  style,
}: {
  href?: string;
  ariaLabel?: string;
  featured?: boolean;
  wide?: boolean;
  size: OverlayCardSize;
  className?: string;
  children: ReactNode;
  onPointerMove?: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerLeave?: (event: ReactPointerEvent<HTMLElement>) => void;
  style?: CSSProperties;
}) {
  const shellClassName = cn(
    'overlay-card group/card relative flex min-w-0 flex-col ring-1 ring-foreground/10',
    `overlay-card--${size}`,
    href && 'overlay-card--link',
    featured && 'overlay-card--featured featured',
    wide && 'overlay-card--wide',
    className
  );

  if (href) {
    return (
      <Link
        to={href}
        aria-label={ariaLabel}
        className={shellClassName}
        style={style}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <article
      className={shellClassName}
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </article>
  );
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
    <div
      className={cn(
        'overlay-card__banner overlay-card__parallax-layer',
        getCardGradient(gradient)
      )}
    >
      <div className="overlay-card__banner-mesh" aria-hidden="true" />
      <div className="overlay-card__header">
        {eyebrow ? (
          <p className="overlay-card__eyebrow">{eyebrow}</p>
        ) : (
          <span className="overlay-card__eyebrow overlay-card__eyebrow--empty" />
        )}
        <div className="overlay-card__actions">
          {headerActions}
          {href ? (
            <span className="overlay-card__arrow" aria-hidden="true">
              <ArrowUpRight className="size-4" />
            </span>
          ) : null}
        </div>
      </div>
      <div className="overlay-card__hero">
        <span className="overlay-card__hero-stage">
          {hero ? (
            hero
          ) : heroImage ? (
            <img src={heroImage.src} alt={heroImage.alt} loading="lazy" />
          ) : (
            <span
              className="overlay-card__hero-placeholder"
              aria-hidden="true"
            />
          )}
        </span>
      </div>
    </div>
  );
}

function OverlayCardStats({
  stats,
  slots,
}: {
  stats?: OverlayCardStat[];
  slots: number;
}) {
  const items = Array.from({ length: slots }, (_, index) => stats?.[index]);

  return (
    <div className="overlay-card__stats" aria-hidden={!stats?.length}>
      {items.map((stat, index) =>
        stat ? (
          <div
            key={`${stat.label}-${stat.value}`}
            className="overlay-card__stat"
          >
            <span className="overlay-card__stat-value">{stat.value}</span>
            <span className="overlay-card__stat-label">{stat.label}</span>
          </div>
        ) : (
          <div
            key={`empty-stat-${index}`}
            className="overlay-card__stat overlay-card__stat--empty"
          />
        )
      )}
    </div>
  );
}

export function OverlayCard({
  eyebrow,
  title,
  href,
  gradient = 'default',
  featured = false,
  wide = false,
  size,
  className,
  ariaLabel,
  hero,
  heroImage,
  body,
  footer,
  stats,
  statSlots = STAT_SLOT_COUNT,
  headerActions,
  disableTilt = false,
}: OverlayCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const resolvedSize: OverlayCardSize =
    size ?? (wide ? 'featured' : 'standard');

  const tiltEnabled = !disableTilt && !reducedMotion && Boolean(href);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (!tiltEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${py * -4}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${px * 5}deg`);
    event.currentTarget.style.setProperty('--tilt-glare-x', `${50 + px * 40}%`);
    event.currentTarget.style.setProperty('--tilt-glare-y', `${50 + py * 40}%`);
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLElement>) {
    if (!tiltEnabled) return;
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
    event.currentTarget.style.setProperty('--tilt-glare-x', '50%');
    event.currentTarget.style.setProperty('--tilt-glare-y', '50%');
  }

  return (
    <OverlayCardShell
      href={href}
      ariaLabel={ariaLabel ?? (href ? `View ${title}` : undefined)}
      featured={featured}
      wide={wide}
      size={resolvedSize}
      className={cn(tiltEnabled && 'overlay-card--tilt', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
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
        <OverlayCardStats stats={stats} slots={statSlots} />
        <div className="overlay-card__body">
          {body}
          {footer}
        </div>
      </div>
    </OverlayCardShell>
  );
}
