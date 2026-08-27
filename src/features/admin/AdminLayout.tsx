import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { getAdminBasePath } from '@/lib/env'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const links = [
  { to: '', label: 'Dashboard' },
  { to: 'profile', label: 'Profile' },
  { to: 'case-studies', label: 'Case studies' },
  { to: 'technologies', label: 'Technologies' },
  { to: 'timeline', label: 'Timeline' },
  { to: 'philosophy', label: 'Philosophy' },
  { to: 'resume', label: 'Resume' },
  { to: 'terminal', label: 'Terminal' },
  { to: 'submissions', label: 'Submissions' },
  { to: 'media', label: 'Media' },
]

export function AdminLayout() {
  const navigate = useNavigate()
  const base = getAdminBasePath()

  async function signOut() {
    await supabase.auth.signOut()
    navigate(`${base}/login`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <p className="font-display text-lg font-semibold">Studio</p>
          <Button variant="outline" size="sm" onClick={() => void signOut()}>
            Sign out
          </Button>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)]">
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to === '' ? base : `${base}/${link.to}`}
              end={link.to === ''}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                  isActive && 'bg-secondary text-foreground',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
