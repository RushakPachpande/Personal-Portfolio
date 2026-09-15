import { useRef, type CSSProperties, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  /** Multiplier for scroll distance → translateY (px). Positive = moves slower upward feel. */
  speed?: number;
  style?: CSSProperties;
};

export function ParallaxLayer({
  children,
  className,
  speed = 0.2,
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [speed * -80, speed * 80]
  );

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}

type ScrollFadeProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollFadeIn({ children, className }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.45'],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [0.35, 1]
  );
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [28, 0]);

  return (
    <motion.div ref={ref} className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
