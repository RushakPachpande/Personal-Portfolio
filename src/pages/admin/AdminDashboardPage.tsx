import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getAdminBasePath } from '@/lib/env';
import { portfolioQueryKey, usePortfolio } from '@/hooks/usePortfolio';
import { upsertSiteProfile, upsertSiteSettings } from '@/services/portfolio';
import {
  AdminSection,
  Field,
  PageHeader,
  SaveBar,
  StringListField,
} from '@/features/admin/fields';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Profile } from '@/types/portfolio';

export function AdminDashboardPage() {
  const { caseStudies, technologies, timeline, philosophyPillars, resume } =
    usePortfolio();
  const base = getAdminBasePath();
  const tiles = [
    {
      label: 'Case studies',
      value: caseStudies.length,
      to: `${base}/case-studies`,
      hint: 'Engineering narratives',
    },
    {
      label: 'Technologies',
      value: technologies.length,
      to: `${base}/technologies`,
      hint: 'Library logos and copy',
    },
    {
      label: 'Timeline',
      value: timeline.length,
      to: `${base}/timeline`,
      hint: 'Career and education',
    },
    {
      label: 'Philosophy',
      value: philosophyPillars.length,
      to: `${base}/philosophy`,
      hint: 'Principles',
    },
    {
      label: 'Resume projects',
      value: resume.keyProjects.length,
      to: `${base}/resume`,
      hint: 'Preview sections',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Jump into the content you want to change. Each tile opens a form editor—no JSON."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            to={tile.to}
            className="glass group rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
          >
            <p className="font-mono text-xs tracking-wide text-soft-cyan uppercase">
              {tile.hint}
            </p>
            <p className="mt-3 font-display text-4xl font-semibold">
              {tile.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground group-hover:text-foreground">
              {tile.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AdminProfilePage() {
  const { profile: initialProfile, siteVersion: initialVersion } =
    usePortfolio();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [siteVersion, setSiteVersion] = useState(initialVersion);

  function patch<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setStatus('');
    setSaving(true);
    try {
      await upsertSiteProfile(profile);
      await upsertSiteSettings(siteVersion);
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey });
      setStatus('Saved.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Profile"
        description="Name, contact channels, and about copy shown across the public site."
      />
      <AdminSection
        title="Identity"
        description="How you appear in the navbar, hero, and resume header."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <Input
              value={profile.name}
              onChange={(event) => patch('name', event.target.value)}
            />
          </Field>
          <Field label="Short name">
            <Input
              value={profile.shortName}
              onChange={(event) => patch('shortName', event.target.value)}
            />
          </Field>
          <Field label="Role">
            <Input
              value={profile.role}
              onChange={(event) => patch('role', event.target.value)}
            />
          </Field>
          <Field label="Resume title">
            <Input
              value={profile.resumeTitle}
              onChange={(event) => patch('resumeTitle', event.target.value)}
            />
          </Field>
          <Field label="Location">
            <Input
              value={profile.location}
              onChange={(event) => patch('location', event.target.value)}
            />
          </Field>
          <Field label="Phone">
            <Input
              value={profile.phone}
              onChange={(event) => patch('phone', event.target.value)}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={profile.email}
              onChange={(event) => patch('email', event.target.value)}
            />
          </Field>
          <Field label="Site version">
            <Input
              value={siteVersion}
              onChange={(event) => setSiteVersion(event.target.value)}
            />
          </Field>
        </div>
        <StringListField
          label="Rotating roles"
          values={[...profile.roles]}
          onChange={(roles) => patch('roles', roles)}
        />
        <StringListField
          label="Focus areas"
          values={[...profile.focusAreas]}
          onChange={(focusAreas) => patch('focusAreas', focusAreas)}
        />
      </AdminSection>
      <AdminSection title="Headline" description="Hero and SEO description.">
        <Field
          label="Headline"
          hint="Use \n for a line break on the public hero."
        >
          <Textarea
            rows={3}
            value={profile.headline}
            onChange={(event) => patch('headline', event.target.value)}
          />
        </Field>
        <Field label="Short description">
          <Textarea
            rows={3}
            value={profile.description}
            onChange={(event) => patch('description', event.target.value)}
          />
        </Field>
      </AdminSection>
      <AdminSection title="Socials">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="GitHub URL">
            <Input
              value={profile.socials.github}
              onChange={(event) =>
                patch('socials', {
                  ...profile.socials,
                  github: event.target.value,
                })
              }
            />
          </Field>
          <Field label="LinkedIn URL">
            <Input
              value={profile.socials.linkedin}
              onChange={(event) =>
                patch('socials', {
                  ...profile.socials,
                  linkedin: event.target.value,
                })
              }
            />
          </Field>
          <Field label="Email link">
            <Input
              value={profile.socials.email}
              onChange={(event) =>
                patch('socials', {
                  ...profile.socials,
                  email: event.target.value,
                })
              }
            />
          </Field>
        </div>
      </AdminSection>
      <AdminSection
        title="About"
        description="Four paragraphs on the About page."
      >
        <Field label="Who I am">
          <Textarea
            rows={4}
            value={profile.about.whoIAm}
            onChange={(event) =>
              patch('about', { ...profile.about, whoIAm: event.target.value })
            }
          />
        </Field>
        <Field label="How I think">
          <Textarea
            rows={4}
            value={profile.about.howIThink}
            onChange={(event) =>
              patch('about', {
                ...profile.about,
                howIThink: event.target.value,
              })
            }
          />
        </Field>
        <Field label="What I enjoy">
          <Textarea
            rows={4}
            value={profile.about.whatIEnjoy}
            onChange={(event) =>
              patch('about', {
                ...profile.about,
                whatIEnjoy: event.target.value,
              })
            }
          />
        </Field>
        <Field label="Approach">
          <Textarea
            rows={4}
            value={profile.about.approach}
            onChange={(event) =>
              patch('about', { ...profile.about, approach: event.target.value })
            }
          />
        </Field>
        <StringListField
          label="Summary bullets"
          values={[...profile.summaryBullets]}
          onChange={(summaryBullets) => patch('summaryBullets', summaryBullets)}
        />
      </AdminSection>
      <SaveBar
        onSave={() => void save()}
        onDiscard={() => {
          setProfile(initialProfile);
          setSiteVersion(initialVersion);
          setStatus('Reverted.');
        }}
        status={status}
        saving={saving}
      />
    </div>
  );
}
