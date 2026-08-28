import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  Command,
  FolderOpen,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  UserRound,
  Wrench,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getAdminBasePath } from '@/lib/env';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const links = [
  { to: '', label: 'Dashboard', icon: LayoutDashboard },
  { to: 'profile', label: 'Profile', icon: UserRound },
  { to: 'case-studies', label: 'Case studies', icon: Briefcase },
  { to: 'technologies', label: 'Technologies', icon: Wrench },
  { to: 'timeline', label: 'Timeline', icon: BookOpen },
  { to: 'philosophy', label: 'Philosophy', icon: Sparkles },
  { to: 'resume', label: 'Resume', icon: FolderOpen },
  { to: 'terminal', label: 'Terminal', icon: Command },
  { to: 'submissions', label: 'Inbox', icon: Inbox },
  { to: 'media', label: 'Media', icon: ImageIcon },
];

type AdminNavLinksProps = {
  base: string;
  onNavigate?: () => void;
  linkClassName: string;
  activeClassName?: string;
};

function AdminNavLinks({
  base,
  onNavigate,
  linkClassName,
  activeClassName,
}: AdminNavLinksProps) {
  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.to}
            to={link.to === '' ? base : `${base}/${link.to}`}
            end={link.to === ''}
            title={`Open ${link.label} in Studio.`}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(linkClassName, isActive && activeClassName)
            }
          >
            <Icon className="size-4 shrink-0 text-electric-blue" />
            {link.label}
          </NavLink>
        );
      })}
    </>
  );
}

export function AdminLayout() {
  const navigate = useNavigate();
  const base = getAdminBasePath();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function signOut() {
    await supabase.auth.signOut();
    navigate(`${base}/login`);
  }

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,var(--bg-glow-blue),transparent_36%),radial-gradient(circle_at_bottom_right,var(--bg-glow-cyan),transparent_32%)]" />
        <header className="sticky top-0 z-30 border-b border-border/80 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-2">
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                  title={
                    mobileOpen
                      ? 'Close Studio navigation.'
                      : 'Open Studio navigation.'
                  }
                  className="shrink-0 lg:hidden"
                >
                  {mobileOpen ? (
                    <X className="size-5" />
                  ) : (
                    <Menu className="size-5" />
                  )}
                </Button>
              </SheetTrigger>
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold tracking-tight">
                  Studio
                </p>
                <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                  Portfolio control plane
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                title="Sign out of Studio and return to the login screen. Public site is unchanged."
                onClick={() => void signOut()}
                className="hidden shrink-0 sm:inline-flex"
              >
                <LogOut data-icon="inline-start" />
                Sign out
              </Button>
            </div>
          </div>
        </header>

        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav
            className="hidden h-fit flex-col gap-1 lg:sticky lg:top-24 lg:flex"
            aria-label="Admin"
          >
            <AdminNavLinks
              base={base}
              linkClassName="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
              activeClassName="bg-secondary text-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--electric-blue)_35%,transparent)]"
            />
          </nav>
          <main className="min-w-0">
            <Outlet />
          </main>
        </div>

        <SheetContent
          side="left"
          className="flex w-[min(100vw,20rem)] flex-col gap-0 border-border bg-background/95 p-0 backdrop-blur-xl sm:w-[min(100vw,24rem)]"
        >
          <SheetHeader className="shrink-0 border-b border-border/80 px-4 py-4 pr-14">
            <SheetTitle className="font-display text-left text-lg">
              Studio navigation
            </SheetTitle>
            <SheetDescription className="text-left">
              Jump between portfolio sections and inbox tools.
            </SheetDescription>
          </SheetHeader>

          <nav
            className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-3 py-4"
            aria-label="Mobile admin"
          >
            <AdminNavLinks
              base={base}
              onNavigate={() => setMobileOpen(false)}
              linkClassName="flex min-h-11 items-center gap-3 rounded-lg px-3 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeClassName="bg-secondary font-medium text-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--electric-blue)_35%,transparent)]"
            />
          </nav>

          <div className="shrink-0 border-t border-border/80 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                Appearance
              </p>
              <ThemeToggle />
            </div>
            <Button
              variant="outline"
              className="w-full justify-start"
              title="Sign out of Studio and return to the login screen."
              onClick={() => {
                setMobileOpen(false);
                void signOut();
              }}
            >
              <LogOut data-icon="inline-start" />
              Sign out
            </Button>
          </div>
        </SheetContent>
      </div>
    </Sheet>
  );
}
