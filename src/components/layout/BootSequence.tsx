import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { shouldShowBootSequence } from '@/lib/bootGate';
import { defaultSiteConfig } from '@/content/siteConfig';
import { Button } from '@/components/ui/button';

const STEP_MS = 300;
const HOLD_MS = 400;
const EXIT_MS = 250;

type BootSequenceProps = {
  onComplete: () => void;
  steps?: string[];
};

export function BootSequence({ onComplete, steps }: BootSequenceProps) {
  const bootSteps =
    steps && steps.length > 0 ? steps : defaultSiteConfig.chrome.bootSteps;
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) {
      return;
    }
    finishedRef.current = true;
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }
    if (holdRef.current !== null) {
      window.clearTimeout(holdRef.current);
    }
    if (reduced) {
      onComplete();
      return;
    }
    setVisible(false);
  }, [onComplete, reduced]);

  useEffect(() => {
    if (!shouldShowBootSequence() || reduced) {
      onComplete();
      return;
    }

    let index = 0;
    intervalRef.current = window.setInterval(() => {
      index += 1;
      if (index >= bootSteps.length) {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
        }
        holdRef.current = window.setTimeout(() => {
          finish();
        }, HOLD_MS);
        return;
      }
      setStep(index);
    }, STEP_MS);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      if (holdRef.current !== null) {
        window.clearTimeout(holdRef.current);
      }
    };
  }, [bootSteps.length, finish, onComplete, reduced]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }
      event.preventDefault();
      finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000 }}
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 font-mono text-muted-foreground"
            aria-label="Skip boot sequence"
            onClick={finish}
          >
            Skip
          </Button>
          <div className="w-full max-w-md px-6">
            <p className="mb-6 font-mono text-xs tracking-[0.25em] text-soft-cyan uppercase sm:text-sm">
              Boot Sequence
            </p>
            <div className="glass rounded-2xl p-6">
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={bootSteps[step]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-mono text-sm text-foreground sm:text-base"
                >
                  <span className="text-electric-blue">{'>'}</span>{' '}
                  {bootSteps[step]}
                </motion.p>
              </AnimatePresence>
              <div className="mt-6 h-1 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full origin-left bg-linear-to-r from-electric-blue via-soft-cyan to-deep-purple"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: (step + 1) / bootSteps.length }}
                  transition={{
                    duration: STEP_MS / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
