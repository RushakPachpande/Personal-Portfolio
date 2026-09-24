import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { getCaseStudyPath, getCaseStudy } from '@/lib/portfolio';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Reveal } from '@/components/shared/Reveal';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const contactLinkClassName =
  'inline-flex min-h-11 items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none';

const bulletListClassName =
  'flex max-w-3xl list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground marker:text-muted-foreground';

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
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
      className="inline-flex min-h-11 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
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
    <div className="flex flex-col gap-8 pb-20">
      <Reveal>
        <header className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 flex-col gap-2">
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {profile.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {profile.resumeTitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.roles.map((role) => (
                  <Badge key={role} variant="secondary">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
            {profile.resumeUrl ? (
              <MagneticButton
                href={profile.resumeUrl}
                className="min-h-11 w-full sm:w-auto"
              >
                Download PDF
                <Download data-icon="inline-end" />
              </MagneticButton>
            ) : null}
          </div>

          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <li className="inline-flex min-h-11 items-center gap-2">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              {profile.location}
            </li>
            <li>
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className={contactLinkClassName}
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {profile.phone}
              </a>
            </li>
            <li>
              <a href={profile.socials.email} className={contactLinkClassName}>
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className={contactLinkClassName}
              >
                <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className={contactLinkClassName}
              >
                <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
                GitHub
              </a>
            </li>
          </ul>
        </header>
      </Reveal>

      <Separator />

      <ResumeSection title="Professional Summary">
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="text-muted-foreground text-pretty">
            Platform &amp; Solutions Engineer with hands-on experience
            designing, building, and operating production platforms, cloud
            infrastructure, and enterprise systems.
          </p>
          <ul className={bulletListClassName}>
            {profile.summaryBullets.map((bullet) => (
              <li key={bullet} className="text-pretty">
                {bullet}
              </li>
            ))}
            <li className="text-pretty">
              Driven to build robust, scalable, and reliable technical
              solutions.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-base font-semibold">Highlights</h3>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-1.5 marker:text-muted-foreground sm:grid-cols-2">
            {resumeHighlights.map((highlight) => (
              <li key={highlight.id} className="list-disc pl-5 font-medium">
                {highlight.label}
              </li>
            ))}
          </ul>
        </div>
      </ResumeSection>

      <Separator />

      <ResumeSection title="Professional Experience">
        <ol className="flex flex-col gap-8 border-l border-border">
          {professionalExperience.map((entry) => (
            <li key={entry.id} className="relative flex flex-col gap-2 pl-6">
              <span
                className="absolute top-2 left-0 size-2 -translate-x-1/2 rounded-full bg-foreground"
                aria-hidden="true"
              />
              <h3 className="font-display text-lg font-semibold">
                {entry.organization}
              </h3>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p className="text-sm text-soft-cyan">{entry.role}</p>
                <p className="shrink-0 text-sm text-muted-foreground">
                  {entry.period}
                </p>
              </div>
              <ul className={bulletListClassName}>
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="text-pretty">
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </ResumeSection>

      <Separator />

      <ResumeSection title="Key Projects">
        <ol className="flex flex-col gap-8 border-l border-border">
          {keyProjects.map((project) => (
            <li
              key={project.id}
              className="relative flex flex-col gap-3 pl-6"
            >
              <span
                className="absolute top-2 left-0 size-2 -translate-x-1/2 rounded-full bg-foreground"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-lg font-semibold">
                    {project.name}
                  </h3>
                  <p className="text-sm text-soft-cyan">{project.role}</p>
                </div>
                {project.caseStudy ? (
                  <CaseStudyLink slug={project.caseStudy.slug} />
                ) : null}
              </div>
              <ul className={bulletListClassName}>
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="text-pretty">
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </ResumeSection>

      <Separator />

      <ResumeSection title="Core Competencies">
        <div className="flex flex-wrap gap-2">
          {coreCompetencies.map((competency) => (
            <Badge key={competency} variant="outline">
              {competency}
            </Badge>
          ))}
        </div>
      </ResumeSection>

      <Separator />

      <ResumeSection title="Technical Expertise">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {technicalExpertise.map((group) => (
            <div key={group.id} className="flex flex-col gap-1">
              <h3 className="text-sm font-medium">{group.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                {group.items.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </ResumeSection>

      <Separator />

      <ResumeSection title="Education">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {resumeEducation.map((entry) => (
            <p key={entry.id} className="text-sm leading-6">
              <span className="font-semibold text-foreground">
                {entry.degree}
              </span>
              <span className="text-muted-foreground">
                {' · '}
                {entry.period}
                {' · '}
              </span>
              <span className="text-soft-cyan">{entry.institution}</span>
              <span className="text-muted-foreground">
                {' · '}
                {entry.detail}
              </span>
            </p>
          ))}
        </div>
      </ResumeSection>

      <Separator />

      <ResumeSection title="Certifications">
        <div className="flex flex-col gap-6">
          {resumeCertifications.map((group) => (
            <div key={group.id} className="flex flex-col gap-2">
              <h3 className="font-display text-base font-semibold">
                {group.provider}
              </h3>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="list-disc pl-5 text-pretty">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ResumeSection>

      <Separator />

      <nav className="flex flex-wrap gap-3" aria-label="Related">
        <MagneticButton to="/experience" variant="outline">
          View experience
        </MagneticButton>
        <MagneticButton to="/contact">Get in touch</MagneticButton>
      </nav>
    </div>
  );
}
