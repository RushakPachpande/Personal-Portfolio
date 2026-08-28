import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!fine || !wide || reduced) return;

    setEnabled(true);
    let frame = 0;
    let scheduled = false;
    let x = -200;
    let y = -200;

    const paint = () => {
      scheduled = false;
      const node = glowRef.current;
      if (!node) return;
      node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (scheduled) return;
      scheduled = true;
      frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-30 size-72 rounded-full opacity-30 blur-3xl cursor-glow will-change-transform'
      )}
      style={{ transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)' }}
    />
  );
}
