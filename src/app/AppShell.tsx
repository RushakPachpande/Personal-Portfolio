import { useCallback, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { ScrollToTopButton } from '@/components/layout/ScrollToTopButton';
import { BootSequence } from '@/components/layout/BootSequence';
import { CursorGlow } from '@/components/effects/CursorGlow';
import { CommandTerminal } from '@/components/terminal/CommandTerminal';
import { DevModeContext } from '@/hooks/useDevMode';
import { useKonami } from '@/hooks/useKonami';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import {
  PortfolioContext,
  usePublicPortfolioQuery,
} from '@/hooks/usePortfolio';

export function AppShell() {
  const location = useLocation();
  useScrollRestoration();
  const portfolioQuery = usePublicPortfolioQuery();
  const [booted, setBooted] = useState(
    () => sessionStorage.getItem('boot-complete') === '1'
  );
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);

  const completeBoot = useCallback(() => setBooted(true), []);

  const onUnlock = useCallback(() => {
    setBadgeVisible(true);
    window.setTimeout(() => setBadgeVisible(false), 4000);
  }, []);

  const unlocked = useKonami(onUnlock);

  if (portfolioQuery.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-display text-2xl font-semibold">
            Unable to load portfolio data
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            The site could not reach Supabase. Confirm local `supabase start` or
            production project keys, then refresh.
          </p>
        </div>
      </div>
    );
  }

  if (portfolioQuery.isPending || !portfolioQuery.data) {
    return (
      <div className="flex min-h-screen items-center justify-center font-mono text-sm text-muted-foreground">
        Loading systems...
      </div>
    );
  }

  return (
    <PortfolioContext.Provider value={portfolioQuery.data}>
      <DevModeContext.Provider value={{ unlocked }}>
        {!booted ? <BootSequence onComplete={completeBoot} /> : null}

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-120 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>

        <CursorGlow />
        <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

        <main
          id="main-content"
          className="min-h-[70vh] min-w-0 overflow-x-clip"
        >
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>

        <Footer />
        <ScrollToTopButton />
        <CommandTerminal
          open={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />

        {badgeVisible || unlocked ? (
          <div
            className="pointer-events-none fixed right-4 bottom-4 z-90 rounded-full border border-soft-cyan/40 bg-card/90 px-3 py-1.5 font-mono text-xs text-soft-cyan shadow-lg backdrop-blur sm:text-sm"
            aria-live="polite"
          >
            {badgeVisible
              ? 'Achievement unlocked: Developer Mode'
              : 'Developer Mode'}
          </div>
        ) : null}
      </DevModeContext.Provider>
    </PortfolioContext.Provider>
  );
}
