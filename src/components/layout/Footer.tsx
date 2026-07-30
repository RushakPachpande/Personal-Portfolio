import { Link } from 'react-router-dom'
import { profile, SITE_VERSION } from '@/content/profile'
import { useDevMode } from '@/hooks/useDevMode'
import { navItems } from './navItems'

export function Footer() {
  const { unlocked } = useDevMode()
  const lastUpdated = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
  const principles = ['Own outcomes', 'Build for production', 'Automate repetitive work']
  const stack = ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite']

  return (
    <footer className="mt-24 border-t border-border/80 bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="max-w-sm">
            <p className="font-display text-xl font-semibold">
              {profile.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Platform engineer owning systems from architecture to production.
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-mono text-[11px] tracking-wide text-soft-cyan uppercase">Principles</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {principles.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] tracking-wide text-soft-cyan uppercase">Navigate</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
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
          <div>
            <p className="mb-3 font-mono text-[11px] tracking-wide text-soft-cyan uppercase">Current focus</p>
            <p className="text-sm text-muted-foreground text-pretty">
              Platform architecture, cloud optimization, enterprise automations, and production operations.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={profile.socials.github} className="text-sm text-muted-foreground hover:text-foreground">
            GitHub
          </a>
          <a href={profile.socials.linkedin} className="text-sm text-muted-foreground hover:text-foreground">
            LinkedIn
          </a>
          <Link to="/resume" className="text-sm text-muted-foreground hover:text-foreground">
            Resume
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. Built with intent.</p>
          <p className="font-mono">
            v{SITE_VERSION} · Updated {lastUpdated}
            {unlocked ? ' · developer mode' : ''}
          </p>
        </div>
      </div>
    </footer>
  )
}
