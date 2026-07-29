import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    setEnabled(true)
    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  if (!enabled) return null

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-30 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl',
        'bg-[radial-gradient(circle,rgba(59,130,246,0.45)_0%,rgba(124,58,237,0.18)_45%,transparent_70%)]',
      )}
      style={{ left: pos.x, top: pos.y }}
    />
  )
}
