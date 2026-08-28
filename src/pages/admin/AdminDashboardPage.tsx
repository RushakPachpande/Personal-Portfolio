import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getAdminBasePath } from '@/lib/env';
import { portfolioQueryKey, usePortfolio } from '@/hooks/usePortfolio';
import {
  upsertSiteProfile,
  upsertSiteSettings,
} from '@/services/portfolio-admin';
import {
  AdminSection,
  Field,
  PageHeader,
  SaveBar,
  StringListField,
} from '@/features/admin/fields';
import { AdminPreviewOverlay } from '@/features/admin/AdminPreviewOverlay';
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
      title: 'Open the case study list. Create or edit public project pages.',
    },
    {
      label: 'Technologies',
      value: technologies.length,
      to: `${base}/technologies`,
      hint: 'Library logos and copy',
      title:
        'Edit technology cards shown in the public library and case study stacks.',
    },
    {
      label: 'Timeline',
      value: timeline.length,
      to: `${base}/timeline`,
      hint: 'Career and education',
      title: 'Edit events on the public Experience page.',
    },
    {
      label: 'Philosophy',
      value: philosophyPillars.length,
      to: `${base}/philosophy`,
      hint: 'Principles',
      title: 'Edit the principles listed on the public Philosophy page.',
    },
    {
      label: 'Resume projects',
      value: resume.keyProjects.length,
      to: `${base}/resume`,
      hint: 'Preview sections',
      title: 'Edit resume sections rendered on the public Resume page.',
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
            title={tile.title}
            className="studio-enter glass group rounded-2xl p-5 transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
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
  const [previewOpen, setPreviewOpen] = useState(false);
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
          <Field
            label="Full name"
            hint="Used in page titles, SEO, footer, and resume header. Changing this updates every public mention of your name after save."
          >
            <Input
              value={profile.name}
              onChange={(event) => patch('name', event.target.value)}
            />
          </Field>
          <Field
            label="Short name"
            hint="Compact label in the navbar brand. Visitors see this instead of the full name in tight layouts."
          >
            <Input
              value={profile.shortName}
              onChange={(event) => patch('shortName', event.target.value)}
            />
          </Field>
          <Field
            label="Role"
            hint="Primary title next to your name in SEO and some headers, for example Platform Engineer."
          >
            <Input
              value={profile.role}
              onChange={(event) => patch('role', event.target.value)}
            />
          </Field>
          <Field
            label="Resume title"
            hint="Headline printed on the public resume page, independent of the hero role line."
          >
            <Input
              value={profile.resumeTitle}
              onChange={(event) => patch('resumeTitle', event.target.value)}
            />
          </Field>
          <Field
            label="Location"
            hint="Shown on the contact panel and resume. Does not affect routing."
          >
            <Input
              value={profile.location}
              onChange={(event) => patch('location', event.target.value)}
            />
          </Field>
          <Field
            label="Phone"
            hint="Stored for resume/contact copy. Only appears where the public templates already print it."
          >
            <Input
              value={profile.phone}
              onChange={(event) => patch('phone', event.target.value)}
            />
          </Field>
          <Field
            label="Email"
            hint="Display address on contact cards. The mailto link below can differ if you use a query-string mailto."
          >
            <Input
              type="email"
              value={profile.email}
              onChange={(event) => patch('email', event.target.value)}
            />
          </Field>
          <Field
            label="Site version"
            hint="Shown in the public footer. Bump it when you want visitors to see a new build label; it is not a deploy trigger."
          >
            <Input
              value={siteVersion}
              onChange={(event) => setSiteVersion(event.target.value)}
            />
          </Field>
        </div>
        <StringListField
          label="Rotating roles"
          hint="Hero cycles these titles. Add a role to include it in the rotation; remove one to drop it from the animation."
          values={[...profile.roles]}
          onChange={(roles) => patch('roles', roles)}
        />
        <StringListField
          label="Focus areas"
          hint="Chips/list of focus areas on home and about. Add or remove items to change that list."
          values={[...profile.focusAreas]}
          onChange={(focusAreas) => patch('focusAreas', focusAreas)}
        />
      </AdminSection>
      <AdminSection title="Headline" description="Hero and SEO description.">
        <Field
          label="Headline"
          hint="Hero heading. Use \n for a line break on the public hero. Changing this is the first thing visitors read."
        >
          <Textarea
            rows={3}
            value={profile.headline}
            onChange={(event) => patch('headline', event.target.value)}
          />
        </Field>
        <Field
          label="Short description"
          hint="Supporting sentence under the hero and the default meta description when a page does not override SEO."
        >
          <Textarea
            rows={3}
            value={profile.description}
            onChange={(event) => patch('description', event.target.value)}
          />
        </Field>
      </AdminSection>
      <AdminSection title="Socials">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="GitHub URL"
            hint="Opens in a new tab from contact and footer. Must be a full https URL."
          >
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
          <Field
            label="LinkedIn URL"
            hint="Opens in a new tab from contact. Must be a full https URL."
          >
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
          <Field
            label="Email link"
            hint="mailto: href for the contact email row. Usually mailto:you@domain."
          >
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
        <Field
          label="Who I am"
          hint="First About section. Replaces the public “Who I am” copy after save."
        >
          <Textarea
            rows={4}
            value={profile.about.whoIAm}
            onChange={(event) =>
              patch('about', { ...profile.about, whoIAm: event.target.value })
            }
          />
        </Field>
        <Field
          label="How I think"
          hint="Second About section. Shown as “How I think” on /about."
        >
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
        <Field
          label="What I enjoy"
          hint="Third About section. Shown as “What I enjoy” on /about."
        >
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
        <Field
          label="Approach"
          hint="Fourth About section. Shown as your working approach on /about."
        >
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
          hint="Bullet list on About / home snapshots. Each item is one bullet on the public page."
          values={[...profile.summaryBullets]}
          onChange={(summaryBullets) => patch('summaryBullets', summaryBullets)}
        />
      </AdminSection>
      <SaveBar
        onSave={() => void save()}
        onPreview={() => setPreviewOpen(true)}
        onDiscard={() => {
          setProfile(initialProfile);
          setSiteVersion(initialVersion);
          setStatus('Reverted.');
        }}
        status={status}
        saving={saving}
      />
      <AdminPreviewOverlay
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        draft={{ kind: 'profile', profile, siteVersion }}
        initialPath="/"
        extraPaths={[
          { label: 'About', path: '/about' },
          { label: 'Contact', path: '/contact' },
        ]}
        label="Profile"
      />
    </div>
  );
}
