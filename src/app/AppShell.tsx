import { useCallback, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { BootSequence } from '@/components/layout/BootSequence'
import { CursorGlow } from '@/components/effects/CursorGlow'
import { CommandTerminal } from '@/components/terminal/CommandTerminal'
import { DevModeContext } from '@/hooks/useDevMode'
import { useKonami } from '@/hooks/useKonami'

export function AppShell() {
  const location = useLocation()
  const [booted, setBooted] = useState(
    () => sessionStorage.getItem('boot-complete') === '1',
  )
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [badgeVisible, setBadgeVisible] = useState(false)

  const completeBoot = useCallback(() => setBooted(true), [])

  const onUnlock = useCallback(() => {
    setBadgeVisible(true)
    window.setTimeout(() => setBadgeVisible(false), 4000)
  }, [])

  const unlocked = useKonami(onUnlock)

  return (
    <DevModeContext.Provider value={{ unlocked }}>
      {!booted ? <BootSequence onComplete={completeBoot} /> : null}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[120] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <CursorGlow />
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      <main id="main-content" className="min-h-[70vh]">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
      <CommandTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {badgeVisible || unlocked ? (
        <div
          className="pointer-events-none fixed right-4 bottom-4 z-[90] rounded-full border border-soft-cyan/40 bg-card/90 px-3 py-1.5 font-mono text-[11px] text-soft-cyan shadow-lg backdrop-blur"
          aria-live="polite"
        >
          {badgeVisible ? 'Achievement unlocked: Developer Mode' : 'Developer Mode'}
        </div>
      ) : null}
    </DevModeContext.Provider>
  )
}
