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
          window.setTimeout(onComplete, 350);
        }, 450);
        return;
      }
      setStep(index);
    }, 520);

    return () => window.clearInterval(interval);
  }, [onComplete, reduced]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-full max-w-md px-6">
          <p className="mb-6 font-mono text-xs tracking-[0.25em] text-soft-cyan uppercase sm:text-sm">
            Boot Sequence
          </p>
          <div className="glass rounded-2xl p-6">
            <AnimatePresence mode="wait">
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
                className="h-full bg-gradient-to-r from-electric-blue via-soft-cyan to-deep-purple"
                initial={{ width: '0%' }}
                animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
