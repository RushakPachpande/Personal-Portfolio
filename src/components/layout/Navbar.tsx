import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, TerminalSquare, X } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
  isNavGroupActive,
  isNavLinkActive,
  navStructure,
  type NavGroupItem,
  type NavLinkItem,
} from './navItems'

const navLinkClassName =
  'relative rounded-md px-3 py-2 text-sm text-muted-foreground transition-[color,background-color] duration-200 hover:bg-secondary/45 hover:text-foreground'

const mobileNavLinkClassName =
  'flex min-h-11 items-center rounded-lg px-3 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground'

function DesktopNavLink({ item }: { item: NavLinkItem }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) => cn(navLinkClassName, isActive && 'text-foreground')}
    >
      {({ isActive }) => (
        <>
          {item.label}
          <span
            className={cn(
              'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-linear-to-r from-electric-blue to-soft-cyan transition-transform duration-300',
              isActive ? 'scale-x-100' : 'scale-x-0',
            )}
          />
        </>
      )}
    </NavLink>
  )
}

function DesktopNavDropdown({ group }: { group: NavGroupItem }) {
  const { pathname } = useLocation()
  const active = isNavGroupActive(pathname, group)
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const openMenu = () => {
    clearCloseTimer()
    setOpen(true)
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimer.current = window.setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => clearCloseTimer(), [])

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onFocus={openMenu}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node)) {
            scheduleClose()
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false)
          }
        }}
        className={cn(
          navLinkClassName,
          'inline-flex items-center gap-1 outline-none',
          open && 'bg-secondary/60 text-foreground',
          active && 'text-foreground',
        )}
      >
        {group.label}
        <ChevronDown
          className={cn('size-3.5 opacity-70 transition-transform duration-200', open && 'rotate-180')}
        />
        <span
          className={cn(
            'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-linear-to-r from-electric-blue to-soft-cyan transition-transform duration-300',
            active ? 'scale-x-100' : 'scale-x-0',
          )}
        />
      </button>

      {open ? (
        <div className="absolute top-full left-0 z-60 pt-2">
          <div
            role="menu"
            aria-label={group.label}
            className="min-w-52 rounded-lg border border-border/80 bg-popover p-1.5 text-popover-foreground shadow-lg ring-1 ring-foreground/10"
          >
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = isNavLinkActive(pathname, item.to)

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-md px-3 py-2.5 text-sm transition-colors outline-none',
                      isActive
                        ? 'bg-secondary/80 font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function MobileNavContent({ onClose, onOpenTerminal }: { onClose: () => void; onOpenTerminal: () => void }) {
  const { profile } = usePortfolio()
  return (
    <SheetContent
      side="right"
      className="flex w-[min(100vw,20rem)] flex-col gap-0 border-border bg-background/95 p-0 backdrop-blur-xl sm:w-[min(100vw,24rem)]"
    >
      <SheetHeader className="shrink-0 border-b border-border/80 px-4 py-4 pr-14">
        <SheetTitle className="font-display text-left text-lg">Navigate</SheetTitle>
        <SheetDescription className="text-left">
          {profile.shortName}&apos;s portfolio — platforms, profile, and contact.
        </SheetDescription>
      </SheetHeader>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Mobile">
        <div className="flex flex-col gap-5">
          {navStructure.map((item) =>
            item.type === 'link' ? (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(mobileNavLinkClassName, isActive && 'bg-secondary font-medium text-foreground')
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <div key={item.label} className="flex flex-col gap-1">
                <p className="px-3 py-1 font-mono text-xs tracking-wide text-soft-cyan uppercase sm:text-sm">
                  {item.label}
                </p>
                {item.items.map((route) => (
                  <NavLink
                    key={route.to}
                    to={route.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        mobileNavLinkClassName,
                        'py-2.5 pl-5',
                        isActive && 'bg-secondary font-medium text-foreground',
                      )
                    }
                  >
                    {route.label}
                  </NavLink>
                ))}
              </div>
            ),
          )}
        </div>
      </nav>

      <div className="shrink-0 border-t border-border/80 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {
            onClose()
            onOpenTerminal()
          }}
        >
          <TerminalSquare data-icon="inline-start" />
          Open command terminal
        </Button>
      </div>
    </SheetContent>
  )
}

export function Navbar({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const { profile } = usePortfolio()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <header
        className={cn(
          'sticky top-0 z-50 border-b border-transparent transition-all duration-300',
          scrolled && 'border-border/80 bg-background/70 backdrop-blur-xl',
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {profile.shortName}
            <span className="text-soft-cyan">.</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navStructure.map((item) =>
              item.type === 'link' ? (
                <DesktopNavLink key={item.to} item={item} />
              ) : (
                <DesktopNavDropdown key={item.label} group={item} />
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label="Open command terminal"
              onClick={onOpenTerminal}
              className="hidden sm:inline-flex"
            >
              <TerminalSquare className="size-5" />
            </Button>

            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="lg:hidden"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </header>

      <MobileNavContent onClose={() => setOpen(false)} onOpenTerminal={onOpenTerminal} />
    </Sheet>
  )
}
