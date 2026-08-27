import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getAdminBasePath } from '@/lib/env';
import { categoryLabels } from '@/lib/portfolio';
import { portfolioQueryKey, usePortfolio } from '@/hooks/usePortfolio';
import {
  deleteCaseStudy,
  refreshTechnologyUsage,
  upsertCaseStudy,
  uploadPortfolioFile,
} from '@/services/portfolio';
import { MEDIA_BUCKET, publicMediaUrl } from '@/lib/supabase';
import {
  AdminSection,
  Field,
  ImageField,
  PageHeader,
  PairListField,
  SaveBar,
  SelectField,
  StringListField,
  SwitchField,
} from '@/features/admin/fields';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type {
  CaseStudy,
  CaseStudyCategory,
  CaseStudyMediaItem,
} from '@/types/portfolio';

const emptyStudy = (): CaseStudy => ({
  slug: '',
  category: 'platform',
  name: '',
  summary: '',
  status: 'Draft',
  technologies: [],
  technologyIds: [],
  stack: [],
  businessContext: '',
  problem: '',
  objective: '',
  solution: '',
  architecture: '',
  architectureNodes: [],
  responsibilities: [],
  decisions: [],
  challenges: [],
  outcome: '',
  learnings: [],
  gallery: [],
  relatedSlugs: [],
});

const tabs = [
  { id: 'basics', label: 'Basics' },
  { id: 'story', label: 'Story' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'stack', label: 'Stack' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'media', label: 'Media' },
  { id: 'related', label: 'Related' },
] as const;

type TabId = (typeof tabs)[number]['id'];

export function AdminCaseStudiesPage() {
  const { caseStudies } = usePortfolio();
  const base = getAdminBasePath();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Case studies"
        description="Each card is a public engineering narrative. Open one to edit with labeled fields."
        actions={
          <Button asChild>
            <Link to={`${base}/case-studies/new`}>New case study</Link>
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {caseStudies.map((study) => (
          <Link
            key={study.slug}
            to={`${base}/case-studies/${study.slug}`}
            className="glass flex gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
          >
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-card">
              {study.logo ? (
                <img
                  src={publicMediaUrl(study.logo)}
                  alt=""
                  className="max-h-12 max-w-12 object-contain"
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {categoryLabels[study.category]}
                </Badge>
                {study.featured ? <Badge>Featured</Badge> : null}
              </div>
              <h2 className="mt-2 truncate font-display text-lg font-semibold">
                {study.name}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {study.summary}
              </p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {study.status}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AdminCaseStudyEditPage({ slug }: { slug?: string }) {
  const { caseStudies, technologies } = usePortfolio();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const base = getAdminBasePath();
  const existing = slug
    ? caseStudies.find((study) => study.slug === slug)
    : undefined;
  const [study, setStudy] = useState<CaseStudy>(
    existing ?? { ...emptyStudy(), slug: slug ?? '' }
  );
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<TabId>('basics');

  function patch(partial: Partial<CaseStudy>) {
    setStudy((current) => ({ ...current, ...partial }));
  }

  async function upload(
    kind: 'logo' | 'cover' | 'gallery',
    file: File,
    galleryIndex?: number
  ) {
    const dest = `uploads/${study.slug || 'draft'}/${kind}-${Date.now()}-${file.name}`;
    await uploadPortfolioFile(MEDIA_BUCKET, dest, file);
    if (kind === 'logo') patch({ logo: dest });
    if (kind === 'cover') patch({ coverImage: dest });
    if (kind === 'gallery' && galleryIndex !== undefined) {
      const gallery = [...(study.gallery ?? [])];
      const current = gallery[galleryIndex];
      if (current) gallery[galleryIndex] = { ...current, src: dest };
      patch({ gallery });
    }
  }

  async function save() {
    setStatus('');
    setSaving(true);
    try {
      const sortOrder = existing
        ? caseStudies.findIndex((item) => item.slug === existing.slug)
        : caseStudies.length;
      await upsertCaseStudy(
        study,
        sortOrder < 0 ? caseStudies.length : sortOrder
      );
      await refreshTechnologyUsage();
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey });
      setStatus('Saved.');
      if (!existing && study.slug)
        navigate(`${base}/case-studies/${study.slug}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!study.slug) return;
    await deleteCaseStudy(study.slug);
    await refreshTechnologyUsage();
    await queryClient.invalidateQueries({ queryKey: portfolioQueryKey });
    navigate(`${base}/case-studies`);
  }

  const gallery = study.gallery ?? [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={existing ? study.name || 'Edit case study' : 'New case study'}
        description="Write the narrative the public site already shows—context, decisions, stack, and media."
      />
      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <Button
            key={item.id}
            type="button"
            size="sm"
            variant={tab === item.id ? 'default' : 'outline'}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {tab === 'basics' ? (
        <AdminSection title="Basics">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <Input
                value={study.name}
                onChange={(event) => patch({ name: event.target.value })}
              />
            </Field>
            <Field
              label="URL slug"
              hint="Used in /platforms/slug (or infrastructure / automation)."
            >
              <Input
                value={study.slug}
                onChange={(event) => patch({ slug: event.target.value })}
              />
            </Field>
            <SelectField
              label="Category"
              value={study.category}
              onChange={(value) =>
                patch({ category: value as CaseStudyCategory })
              }
              options={[
                { value: 'platform', label: 'Platform' },
                { value: 'infrastructure', label: 'Infrastructure' },
                { value: 'automation', label: 'Automation' },
              ]}
            />
            <Field label="Status">
              <Input
                value={study.status}
                onChange={(event) => patch({ status: event.target.value })}
              />
            </Field>
            <SelectField
              label="Difficulty"
              value={study.difficulty ?? 'Advanced'}
              onChange={(value) =>
                patch({ difficulty: value as CaseStudy['difficulty'] })
              }
              options={[
                { value: 'Intermediate', label: 'Intermediate' },
                { value: 'Advanced', label: 'Advanced' },
                { value: 'Complex', label: 'Complex' },
              ]}
            />
            <Field label="Timeline">
              <Input
                value={study.timeline ?? ''}
                onChange={(event) => patch({ timeline: event.target.value })}
              />
            </Field>
            <SwitchField
              label="Featured"
              checked={Boolean(study.featured)}
              onChange={(featured) => patch({ featured })}
            />
            <SwitchField
              label="Incomplete"
              checked={Boolean(study.incomplete)}
              onChange={(incomplete) => patch({ incomplete })}
            />
          </div>
          <Field label="Summary">
            <Textarea
              rows={4}
              value={study.summary}
              onChange={(event) => patch({ summary: event.target.value })}
            />
          </Field>
          <Field label="Todo note">
            <Input
              value={study.todoNote ?? ''}
              onChange={(event) => patch({ todoNote: event.target.value })}
            />
          </Field>
        </AdminSection>
      ) : null}

      {tab === 'story' ? (
        <AdminSection title="Story">
          {(
            [
              ['businessContext', 'Business context'],
              ['problem', 'Problem'],
              ['objective', 'Objective'],
              ['solution', 'Solution'],
              ['outcome', 'Outcome'],
            ] as const
          ).map(([key, label]) => (
            <Field key={key} label={label}>
              <Textarea
                rows={5}
                value={study[key]}
                onChange={(event) => patch({ [key]: event.target.value })}
              />
            </Field>
          ))}
        </AdminSection>
      ) : null}

      {tab === 'architecture' ? (
        <AdminSection title="Architecture">
          <Field label="Architecture overview">
            <Textarea
              rows={6}
              value={study.architecture}
              onChange={(event) => patch({ architecture: event.target.value })}
            />
          </Field>
          <PairListField
            label="Architecture nodes"
            items={study.architectureNodes ?? []}
            createItem={() => ({ id: '', label: '', detail: '' })}
            onChange={(architectureNodes) => patch({ architectureNodes })}
            fields={[
              { key: 'id', label: 'Id' },
              { key: 'label', label: 'Label' },
              { key: 'detail', label: 'Detail', multiline: true },
            ]}
          />
        </AdminSection>
      ) : null}

      {tab === 'stack' ? (
        <AdminSection
          title="Technology stack"
          description="Pick from the library so logos stay consistent."
        >
          <Field label="Technologies used">
            <div className="flex flex-wrap gap-2">
              {technologies.map((technology) => {
                const selected = (study.technologyIds ?? []).includes(
                  technology.id
                );
                return (
                  <Button
                    key={technology.id}
                    type="button"
                    size="sm"
                    variant={selected ? 'default' : 'outline'}
                    onClick={() => {
                      const ids = new Set(study.technologyIds ?? []);
                      if (ids.has(technology.id)) ids.delete(technology.id);
                      else ids.add(technology.id);
                      const technologyIds = [...ids];
                      const names = technologies
                        .filter((item) => technologyIds.includes(item.id))
                        .map((item) => item.name);
                      patch({ technologyIds, technologies: names });
                    }}
                  >
                    {technology.name}
                  </Button>
                );
              })}
            </div>
          </Field>
          <PairListField
            label="Stack groups"
            items={study.stack.map((group) => ({
              group: group.group,
              items: group.items.join(', '),
            }))}
            createItem={() => ({ group: '', items: '' })}
            onChange={(groups) =>
              patch({
                stack: groups.map((group) => ({
                  group: group.group,
                  items: group.items
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean),
                })),
              })
            }
            fields={[
              { key: 'group', label: 'Group name' },
              {
                key: 'items',
                label: 'Items (comma separated)',
                multiline: true,
              },
            ]}
          />
        </AdminSection>
      ) : null}

      {tab === 'decisions' ? (
        <AdminSection title="Decisions and challenges">
          <StringListField
            label="Responsibilities"
            values={study.responsibilities}
            onChange={(responsibilities) => patch({ responsibilities })}
          />
          <PairListField
            label="Decisions"
            items={study.decisions}
            createItem={() => ({ decision: '', rationale: '' })}
            onChange={(decisions) => patch({ decisions })}
            fields={[
              { key: 'decision', label: 'Decision' },
              { key: 'rationale', label: 'Rationale', multiline: true },
            ]}
          />
          <PairListField
            label="Challenges"
            items={study.challenges}
            createItem={() => ({ challenge: '', resolution: '' })}
            onChange={(challenges) => patch({ challenges })}
            fields={[
              { key: 'challenge', label: 'Challenge' },
              { key: 'resolution', label: 'Resolution', multiline: true },
            ]}
          />
          <StringListField
            label="Learnings"
            values={study.learnings}
            onChange={(learnings) => patch({ learnings })}
          />
        </AdminSection>
      ) : null}

      {tab === 'media' ? (
        <AdminSection title="Media">
          <div className="grid gap-6 lg:grid-cols-2">
            <ImageField
              label="Logo"
              value={study.logo}
              altValue={study.logoAlt}
              onAltChange={(logoAlt) => patch({ logoAlt })}
              onFile={(file) => void upload('logo', file)}
            />
            <ImageField
              label="Cover"
              value={study.coverImage}
              altValue={study.coverImageAlt}
              onAltChange={(coverImageAlt) => patch({ coverImageAlt })}
              onFile={(file) => void upload('cover', file)}
            />
          </div>
          <Field label="Gallery">
            <div className="flex flex-col gap-4">
              {gallery.map((item, index) => (
                <div
                  key={`${item.src}-${index}`}
                  className="rounded-xl border border-border/80 p-4"
                >
                  <ImageField
                    label={`Slide ${index + 1}`}
                    value={item.src}
                    onFile={(file) => void upload('gallery', file, index)}
                  />
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field label="Caption">
                      <Input
                        value={item.caption}
                        onChange={(event) => {
                          const next = [...gallery];
                          next[index] = {
                            ...item,
                            caption: event.target.value,
                          };
                          patch({ gallery: next });
                        }}
                      />
                    </Field>
                    <SelectField
                      label="Type"
                      value={item.type}
                      onChange={(value) => {
                        const next = [...gallery];
                        next[index] = {
                          ...item,
                          type: value as CaseStudyMediaItem['type'],
                        };
                        patch({ gallery: next });
                      }}
                      options={[
                        { value: 'screenshot', label: 'Screenshot' },
                        { value: 'architecture', label: 'Architecture' },
                        { value: 'workflow', label: 'Workflow' },
                        { value: 'infrastructure', label: 'Infrastructure' },
                        { value: 'deployment', label: 'Deployment' },
                        { value: 'network', label: 'Network' },
                      ]}
                    />
                  </div>
                  <Button
                    className="mt-3"
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      patch({
                        gallery: gallery.filter(
                          (_, itemIndex) => itemIndex !== index
                        ),
                      })
                    }
                  >
                    Remove slide
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  patch({
                    gallery: [
                      ...gallery,
                      { src: '', caption: '', type: 'screenshot' },
                    ],
                  })
                }
              >
                Add gallery slide
              </Button>
            </div>
          </Field>
        </AdminSection>
      ) : null}

      {tab === 'related' ? (
        <AdminSection title="Related case studies">
          <div className="flex flex-col gap-2">
            {caseStudies
              .filter((item) => item.slug !== study.slug)
              .map((item) => {
                const checked = study.relatedSlugs.includes(item.slug);
                return (
                  <label
                    key={item.slug}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-lg border border-border/80 px-3 py-2',
                      checked && 'border-electric-blue/40 bg-secondary/40'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const relatedSlugs = checked
                          ? study.relatedSlugs.filter(
                              (value) => value !== item.slug
                            )
                          : [...study.relatedSlugs, item.slug];
                        patch({ relatedSlugs });
                      }}
                    />
                    <span>
                      {item.name}{' '}
                      <span className="text-xs text-muted-foreground">
                        {categoryLabels[item.category]}
                      </span>
                    </span>
                  </label>
                );
              })}
          </div>
        </AdminSection>
      ) : null}

      <SaveBar
        onSave={() => void save()}
        onDiscard={() => setStudy(existing ?? emptyStudy())}
        onDestructive={existing ? () => void remove() : undefined}
        destructiveLabel="Delete case study"
        status={status}
        saving={saving}
      />
    </div>
  );
}
