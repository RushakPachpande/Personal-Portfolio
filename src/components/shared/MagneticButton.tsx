import { Link } from 'react-router-dom'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { useMagnetic } from '@/hooks/useMagnetic'
import { cn } from '@/lib/utils'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  to?: string
  href?: string
  variant?: ComponentPropsWithoutRef<typeof Button>['variant']
  size?: ComponentPropsWithoutRef<typeof Button>['size']
  onClick?: () => void
  type?: 'button' | 'submit'
}

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
  const { ref, handlers } = useMagnetic<HTMLDivElement>(0.22)
  const classes = cn(
    'transition-transform duration-200 will-change-transform hover:scale-[1.02]',
    className,
  )

  let control: ReactNode

  if (to) {
    control = (
      <Button variant={variant} size={size} className={classes} asChild>
        <Link to={to}>{children}</Link>
      </Button>
    )
  } else if (href) {
    control = (
      <Button variant={variant} size={size} className={classes} asChild>
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
        >
          {children}
        </a>
      </Button>
    )
  } else {
    control = (
      <Button type={type} variant={variant} size={size} className={classes} onClick={onClick}>
        {children}
      </Button>
    )
  }

  return (
    <div ref={ref} className="inline-flex transition-transform duration-200" {...handlers}>
      {control}
    </div>
  )
}
