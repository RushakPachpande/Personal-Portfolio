import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AnimatedGrid({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <div
        className={cn(
          'absolute inset-0 opacity-[0.18]',
          '[background-image:linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)]',
          '[background-size:48px_48px]',
          !reduced && 'animate-[grid-drift_40s_linear_infinite]'
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
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

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <div
        className={cn(
          'absolute -top-24 left-1/4 size-72 rounded-full bg-electric-blue/20 blur-3xl',
          !reduced && 'animate-[float-a_12s_ease-in-out_infinite]'
        )}
      />
      <div
        className={cn(
          'absolute top-1/3 right-0 size-80 rounded-full bg-deep-purple/20 blur-3xl',
          !reduced && 'animate-[float-b_16s_ease-in-out_infinite]'
        )}
      />
      <div
        className={cn(
          'absolute bottom-0 left-10 size-64 rounded-full bg-soft-cyan/10 blur-3xl',
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
