import { Link } from 'react-router-dom';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  to?: string;
  href?: string;
  variant?: ComponentPropsWithoutRef<typeof Button>['variant'];
  size?: ComponentPropsWithoutRef<typeof Button>['size'];
  onClick?: () => void;
  type?: 'button' | 'submit';
};

const hoverClasses =
  'relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_color-mix(in_oklch,var(--electric-blue)_45%,transparent)] active:scale-[0.97] active:translate-y-0 active:shadow-none motion-reduce:transform-none motion-reduce:transition-none';

const variantHoverClasses: Partial<
  Record<
    NonNullable<ComponentPropsWithoutRef<typeof Button>['variant']>,
    string
  >
> = {
  default:
    'hover:bg-[color-mix(in_oklch,var(--primary)_92%,white)] hover:shadow-[0_14px_32px_-12px_color-mix(in_oklch,var(--electric-blue)_55%,transparent)]',
  outline:
    'hover:border-electric-blue/45 hover:bg-electric-blue/8 hover:text-foreground hover:shadow-[0_10px_24px_-12px_color-mix(in_oklch,var(--electric-blue)_35%,transparent)]',
  secondary:
    'hover:border-border hover:shadow-[0_10px_24px_-12px_color-mix(in_oklch,var(--soft-cyan)_30%,transparent)]',
};

export function MagneticButton({
  children,
  className,
  to,
  href,
  variant = 'default',
  size = 'lg',
  onClick,
  type = 'button',
}: MagneticButtonProps) {
  const classes = cn(
    hoverClasses,
    variantHoverClasses[variant ?? 'default'],
    className
  );

  if (to) {
    return (
      <Button variant={variant} size={size} className={classes} asChild>
        <Link to={to}>{children}</Link>
      </Button>
    );
  }

  if (href) {
    return (
      <Button variant={variant} size={size} className={classes} asChild>
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={classes}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
