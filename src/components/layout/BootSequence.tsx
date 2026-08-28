import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STEPS = [
  'Initializing Platform...',
  'Loading Infrastructure...',
  'Loading Projects...',
  'Connecting Services...',
  'System Ready.',
] as const;

const STORAGE_KEY = 'boot-complete';
const STEP_MS = 120;
const HOLD_MS = 150;
const EXIT_MS = 200;

type BootSequenceProps = {
  onComplete: () => void;
};

export function BootSequence({ onComplete }: BootSequenceProps) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === '1' || reduced) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      onComplete();
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      if (index >= STEPS.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem(STORAGE_KEY, '1');
          window.setTimeout(onComplete, EXIT_MS);
        }, HOLD_MS);
        return;
      }
      setStep(index);
    }, STEP_MS);

    return () => window.clearInterval(interval);
  }, [onComplete, reduced]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: EXIT_MS / 1000 }}
      >
        <div className="w-full max-w-md px-6">
          <p className="mb-6 font-mono text-xs tracking-[0.25em] text-soft-cyan uppercase sm:text-sm">
            Boot Sequence
          </p>
          <div className="glass rounded-2xl p-6">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={STEPS[step]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-mono text-sm text-foreground sm:text-base"
              >
                <span className="text-electric-blue">{'>'}</span> {STEPS[step]}
              </motion.p>
            </AnimatePresence>
            <div className="mt-6 h-1 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-electric-blue via-soft-cyan to-deep-purple"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: (step + 1) / STEPS.length }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
