import { ArrowDownRight, Download } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '@/content/profile'
import { AnimatedGrid, GradientBlobs } from '@/components/effects/BackgroundEffects'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function HeroSection() {
  const reduced = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
      <AnimatedGrid />
      <GradientBlobs />

      <motion.div
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
        variants={staggerContainer}
        initial={reduced ? undefined : 'hidden'}
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs tracking-[0.22em] text-soft-cyan uppercase sm:text-sm"
        >
          Platform Engineer · Cloud · Automation · Full Stack Systems
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl font-display text-2xl leading-snug text-muted-foreground sm:text-3xl"
        >
          Building <span className="text-gradient">Systems,</span>
          <br />
          Not Just Software.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg"
        >
          {profile.description}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
          <MagneticButton to="/platforms">
            Explore My Work
            <ArrowDownRight data-icon="inline-end" />
          </MagneticButton>
          <MagneticButton href={profile.resumeUrl} variant="outline">
            Download Resume
            <Download data-icon="inline-end" />
          </MagneticButton>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          className="mt-10 flex flex-wrap gap-2"
          aria-label="Focus areas"
        >
          {profile.focusAreas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground"
            >
              {area}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
