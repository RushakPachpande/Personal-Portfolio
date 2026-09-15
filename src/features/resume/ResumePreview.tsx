import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  Award,
  Briefcase,
  Download,
  ExternalLink,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { getCaseStudyPath, getCaseStudy } from '@/lib/portfolio';
import { OverlayCard } from '@/components/cards/OverlayCard';
import { SurfaceCard } from '@/components/cards/SurfaceCard';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Reveal, SectionHeader } from '@/components/shared/Reveal';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn, responsiveCardGridCompactClassName } from '@/lib/utils';

function SectionBlock({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: typeof Briefcase;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('flex flex-col gap-5', className)}>
      <div className="flex items-center gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-secondary/40 text-electric-blue">
          <Icon className="size-4" />
        </span>
        <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

function CaseStudyLink({ slug }: { slug: string }) {
  const { caseStudies } = usePortfolio();
  const study = getCaseStudy(caseStudies, slug);
  if (!study) return null;

  return (
    <Link
      to={getCaseStudyPath(study)}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      View case study
      <ExternalLink className="size-3.5" />
    </Link>
  );
}

export function ResumePreview() {
  const { profile, resume } = usePortfolio();
  const {
    coreCompetencies,
    keyProjects,
    professionalExperience,
    certifications: resumeCertifications,
    education: resumeEducation,
    highlights: resumeHighlights,
    technicalExpertise,
  } = resume;
  return (
    <div className="pb-20">
      <Reveal>
        <SectionHeader
          eyebrow="Resume"
          title="Platform ownership, end to end"
          description="A full preview of professional experience, projects, and technical scope—download the PDF for sharing."
        />
      </Reveal>

      <div className="mt-12 grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)] xl:items-start">
        <Reveal className="xl:sticky xl:top-24">
          <SurfaceCard
            gradient="platform"
            header={
              <div className="space-y-4 px-5 py-5 sm:px-6">
                <div>
                  <h2 className="font-display text-3xl tracking-tight">
                    {profile.name}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {profile.resumeTitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.roles.map((role) => (
                    <Badge key={role} variant="secondary">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            }
          >
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-3 text-muted-foreground">
                <p className="inline-flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-electric-blue" />
                  {profile.location}
                </p>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 shrink-0 text-electric-blue" />
                  {profile.phone}
                </a>
                <a
                  href={profile.socials.email}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 shrink-0 text-electric-blue" />
                  {profile.email}
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <ExternalLink className="size-4 shrink-0 text-electric-blue" />
                  LinkedIn
                </a>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <ExternalLink className="size-4 shrink-0 text-electric-blue" />
                  GitHub
                </a>
              </div>

              <Separator />

              {profile.resumeUrl ? (
                <MagneticButton href={profile.resumeUrl} className="w-full">
                  Download PDF
                  <Download data-icon="inline-end" />
                </MagneticButton>
              ) : null}

              <p className="font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Last updated from verified portfolio content. Full case studies
                available across platform, infrastructure, and automation
                sections.
              </p>
            </div>
          </SurfaceCard>
        </Reveal>

        <div className="flex flex-col gap-10">
          <Reveal>
            <SurfaceCard title="Professional Summary" gradient="platform">
              <div className="flex flex-col gap-4">
                <p className="text-muted-foreground text-pretty">
                  Platform &amp; Solutions Engineer with hands-on experience
                  designing, building, and operating production platforms, cloud
                  infrastructure, and enterprise systems.
                </p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {profile.summaryBullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-soft-cyan">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                  <li className="flex gap-2">
                    <span className="text-soft-cyan">▹</span>
                    <span>
                      Driven to build robust, scalable, and reliable technical
                      solutions.
                    </span>
                  </li>
                </ul>
              </div>
            </SurfaceCard>
          </Reveal>

          <Reveal delay={0.04}>
            <SectionBlock icon={Sparkles} title="Professional Highlights">
              <div className="grid gap-3 sm:grid-cols-2">
                {resumeHighlights.map((highlight) => (
                  <OverlayCard
                    key={highlight.id}
                    gradient="stat"
                    size="compact"
                    eyebrow="Highlight"
                    title={highlight.label}
                    body={
                      highlight.detail ? (
                        <p className="font-mono text-xs text-soft-cyan sm:text-sm">
                          {highlight.detail}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">—</p>
                      )
                    }
                  />
                ))}
              </div>
            </SectionBlock>
          </Reveal>

          <Reveal delay={0.06}>
            <SectionBlock icon={Layers} title="Core Competencies">
              <div className="flex flex-wrap gap-2">
                {coreCompetencies.map((competency) => (
                  <span
                    key={competency}
                    className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-muted-foreground"
                  >
                    {competency}
                  </span>
                ))}
              </div>
            </SectionBlock>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionBlock icon={Wrench} title="Technical Expertise">
              <div className="grid gap-4 md:grid-cols-2">
                {technicalExpertise.map((group) => (
                  <SurfaceCard
                    key={group.id}
                    title={group.title}
                    gradient="technology"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="font-normal"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </SurfaceCard>
                ))}
              </div>
            </SectionBlock>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionBlock icon={Briefcase} title="Professional Experience">
              {professionalExperience.map((entry) => (
                <SurfaceCard key={entry.id} gradient="experience">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-lg font-semibold">
                        {entry.organization}
                      </h4>
                      <p className="mt-1 text-sm text-soft-cyan">
                        {entry.role}
                      </p>
                    </div>
                    <Badge variant="secondary">{entry.period}</Badge>
                  </div>
                  <ul className="mt-5 flex flex-col gap-2.5 text-sm text-muted-foreground">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-0.5 text-soft-cyan">▹</span>
                        <span className="text-pretty">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </SurfaceCard>
              ))}
            </SectionBlock>
          </Reveal>

          <Reveal delay={0.12}>
            <SectionBlock icon={Award} title="Key Projects">
              <div className="grid gap-4">
                {keyProjects.map((project) => (
                  <SurfaceCard key={project.id} gradient="platform">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="font-display text-lg font-semibold">
                          {project.name}
                        </h4>
                        <p className="mt-1 text-sm text-soft-cyan">
                          {project.role}
                        </p>
                      </div>
                      {project.caseStudy ? (
                        <CaseStudyLink slug={project.caseStudy.slug} />
                      ) : null}
                    </div>
                    <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="text-soft-cyan">▹</span>
                          <span className="text-pretty">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="font-normal"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </SurfaceCard>
                ))}
              </div>
            </SectionBlock>
          </Reveal>

          <Reveal delay={0.14}>
            <SectionBlock icon={GraduationCap} title="Education">
              <div className={responsiveCardGridCompactClassName}>
                {resumeEducation.map((entry) => (
                  <SurfaceCard key={entry.id} gradient="about">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="font-display text-base font-semibold">
                        {entry.degree}
                      </h4>
                      <span className="font-mono text-xs text-muted-foreground">
                        {entry.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-soft-cyan">
                      {entry.institution}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {entry.detail}
                    </p>
                  </SurfaceCard>
                ))}
              </div>
            </SectionBlock>
          </Reveal>

          <Reveal delay={0.15}>
            <SectionBlock icon={Award} title="Certifications">
              <div className={responsiveCardGridCompactClassName}>
                {resumeCertifications.map((group) => (
                  <SurfaceCard
                    key={group.id}
                    title={group.provider}
                    gradient="stat"
                    className={cn(
                      group.id === 'microsoft-learn' && 'md:col-span-2'
                    )}
                  >
                    <ul
                      className={cn(
                        'gap-2 text-sm text-muted-foreground',
                        group.items.length > 6
                          ? 'grid min-w-0 grid-cols-1 sm:grid-cols-2'
                          : 'flex flex-col'
                      )}
                    >
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-soft-cyan">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </SurfaceCard>
                ))}
              </div>
            </SectionBlock>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="glass flex flex-col items-start gap-4 rounded-2xl border-border/80 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg font-semibold">
                  Want the full PDF?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Download the formatted resume or explore detailed case studies
                  and experience.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {profile.resumeUrl ? (
                  <MagneticButton href={profile.resumeUrl} variant="outline">
                    Download PDF
                    <Download data-icon="inline-end" />
                  </MagneticButton>
                ) : null}
                <MagneticButton to="/experience" variant="outline">
                  View experience
                </MagneticButton>
                <MagneticButton to="/contact">Get in touch</MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
