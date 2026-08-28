import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { ScrollToTopButton } from '@/components/layout/ScrollToTopButton';
import { DevModeContext } from '@/hooks/useDevMode';
import { useKonami } from '@/hooks/useKonami';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import {
  PortfolioContext,
  usePublicPortfolioQuery,
} from '@/hooks/usePortfolio';
import { PageRouteSkeleton } from '@/components/layout/PageRouteSkeleton';
import { rememberDocumentLoad, shouldShowBootSequence } from '@/lib/bootGate';

const BootSequence = lazy(() =>
  import('@/components/layout/BootSequence').then((module) => ({
    default: module.BootSequence,
  }))
);
const CommandTerminal = lazy(() =>
  import('@/components/terminal/CommandTerminal').then((module) => ({
    default: module.CommandTerminal,
  }))
);
const CursorGlow = lazy(() =>
  import('@/components/effects/CursorGlow').then((module) => ({
    default: module.CursorGlow,
  }))
);

function ShellError({ message }: { message: string }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <main
        id="main-content"
        className="flex min-h-[70vh] items-center justify-center px-6 text-center font-mono text-sm text-muted-foreground"
      >
        {message}
      </main>
    </div>
  );
}

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-120 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
    >
      Skip to content
    </a>
  );
}

export function AppShell() {
  const location = useLocation();
  useScrollRestoration();
  const portfolioQuery = usePublicPortfolioQuery();
  const [booted, setBooted] = useState(() => !shouldShowBootSequence());
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);

  useEffect(() => {
    rememberDocumentLoad();
  }, []);

  const completeBoot = useCallback(() => setBooted(true), []);

  const onUnlock = useCallback(() => {
    setBadgeVisible(true);
    window.setTimeout(() => setBadgeVisible(false), 4000);
  }, []);

  const unlocked = useKonami(onUnlock);

  if (portfolioQuery.isError) {
    return (
      <ShellError message="Unable to load portfolio data. Confirm local supabase start or production project keys, then refresh." />
    );
  }

  const portfolio = portfolioQuery.data ?? null;

  return (
    <PortfolioContext.Provider value={portfolio}>
      <DevModeContext.Provider value={{ unlocked }}>
        {!booted ? (
          <Suspense fallback={null}>
            <BootSequence onComplete={completeBoot} />
          </Suspense>
        ) : null}

        <SkipLink />

        <div className="scroll-progress" aria-hidden />

        <Suspense fallback={null}>
          <CursorGlow />
        </Suspense>
        <Navbar
          onOpenTerminal={() => {
            if (portfolio) setTerminalOpen(true);
          }}
        />

        <main
          id="main-content"
          className="grid min-h-[70vh] min-w-0 overflow-x-clip"
        >
          {portfolio ? (
            <AnimatePresence>
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          ) : (
            <PageRouteSkeleton />
          )}
        </main>

        <Footer />
        <ScrollToTopButton />
        {terminalOpen && portfolio ? (
          <Suspense fallback={null}>
            <CommandTerminal
              open={terminalOpen}
              onClose={() => setTerminalOpen(false)}
            />
          </Suspense>
        ) : null}

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
