import { Link } from 'react-router-dom'
import { profile, SITE_VERSION } from '@/content/profile'
import { useDevMode } from '@/hooks/useDevMode'
import { navItems } from './navItems'

export function Footer() {
  const { unlocked } = useDevMode()

  return (
    <footer className="mt-24 border-t border-border/80 bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <p className="font-display text-xl font-semibold">
              {profile.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Platform engineer owning systems from architecture to production.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. Built with intent.</p>
          <p className="font-mono">
            v{SITE_VERSION}
            {unlocked ? ' · developer mode' : ''}
          </p>
        </div>
      </div>
    </footer>
  )
}
