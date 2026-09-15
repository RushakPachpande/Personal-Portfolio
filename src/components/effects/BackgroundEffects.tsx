import { useRef } from 'react';
import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export function AnimatedGrid({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 120]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <motion.div
        style={{ y }}
        className={cn(
          'absolute inset-[-20%] opacity-[0.18]',
          'bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)]',
          'bg-size-[48px_48px]',
          !reduced && 'animate-[grid-drift_40s_linear_infinite]'
        )}
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/20 via-transparent to-background" />
      <style>{`
        @keyframes grid-drift {
          from { background-position: 0 0, 0 0; }
          to { background-position: 48px 48px, 48px 48px; }
        }
      `}</style>
    </div>
  );
}

export function GradientBlobs({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const ySlow = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [0, 90]
  );
  const yFast = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [0, 160]
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <motion.div
        style={{ y: ySlow }}
        className={cn(
          'absolute -top-24 left-1/4 size-72 rounded-full bg-electric-blue/20 blur-3xl',
          !reduced && 'animate-[float-a_12s_ease-in-out_infinite]'
        )}
      />
      <motion.div
        style={{ y: yFast }}
        className={cn(
          'absolute top-1/3 right-0 size-80 rounded-full bg-deep-purple/20 blur-3xl max-md:hidden',
          !reduced && 'animate-[float-b_16s_ease-in-out_infinite]'
        )}
      />
      <motion.div
        style={{ y: ySlow }}
        className={cn(
          'absolute bottom-0 left-10 size-64 rounded-full bg-soft-cyan/10 blur-3xl max-md:hidden',
          !reduced && 'animate-[float-a_18s_ease-in-out_infinite_reverse]'
        )}
      />
      <style>{`
        @keyframes float-a {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(24px, -18px, 0); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-20px, 22px, 0); }
        }
      `}</style>
    </div>
  );
}
