import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { rememberScrollPosition } from '@/hooks/useScrollRestoration'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const showAfterPx = 320

export function ScrollToTopButton() {
  const { pathname } = useLocation()
  const reducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfterPx)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
    rememberScrollPosition(pathname, 0)
  }

  return (
    <Button
      type="button"
      size="icon-lg"
      variant="outline"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={cn(
        'fixed right-4 bottom-20 z-85 rounded-full border-border/80 bg-background/85 shadow-lg backdrop-blur transition-all duration-300',
        'hover:border-electric-blue/45 hover:bg-secondary/80',
        visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <ArrowUp />
    </Button>
  )
}
