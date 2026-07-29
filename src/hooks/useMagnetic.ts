import { useRef, type MouseEventHandler, type RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T | null>(null)
  const reduced = usePrefersReducedMotion()

  const onMouseMove: MouseEventHandler<T> = (event) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onMouseLeave: MouseEventHandler<T> = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return {
    ref: ref as RefObject<T>,
    handlers: { onMouseMove, onMouseLeave },
  }
}
