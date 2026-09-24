import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getAdminBasePath } from '@/lib/env';
import { getCaseStudyPath, getCategoryMeta } from '@/lib/portfolio';
import { portfolioQueryKey, usePortfolio } from '@/hooks/usePortfolio';
import {
  deleteCaseStudy,
  refreshTechnologyUsage,
  upsertCaseStudy,
  uploadPortfolioFile,
} from '@/services/portfolio-admin';
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
import { AdminPreviewOverlay } from '@/features/admin/AdminPreviewOverlay';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type {
  CaseStudy,
  CaseStudyCategory,
  CaseStudyLink,
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
  {
    id: 'basics',
    label: 'Basics',
    description:
      'Identity, URL, listing flags. These drive cards, routes, and featured home slots.',
  },
  {
    id: 'story',
    label: 'Story',
    description:
      'Narrative sections on the case study page. Each field maps to a public heading.',
  },
  {
    id: 'architecture',
    label: 'Architecture',
    description:
      'Overview copy plus diagram nodes rendered in the architecture flow.',
  },
  {
    id: 'stack',
    label: 'Stack',
    description:
      'Library technologies (logos) and grouped stack lists on the case study page.',
  },
  {
    id: 'decisions',
    label: 'Decisions',
    description:
      'Responsibilities, decisions, challenges, and learnings on the public page.',
  },
  {
    id: 'media',
    label: 'Media',
    description:
      'Logo, cover, and gallery. Prefer the library so the same file can be reused.',
  },
  {
    id: 'related',
    label: 'Related',
    description:
      'Other case studies linked at the bottom of this page. Unchecked items are omitted.',
  },
] as const;

type TabId = (typeof tabs)[number]['id'];

export function AdminCaseStudiesPage() {
  const { caseStudies, siteConfig } = usePortfolio();
  const base = getAdminBasePath();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Case studies"
        description="Each card is a public engineering narrative. Toggle Featured on a study to control the home spotlight (up to four)."
        actions={
          <Button asChild>
            <Link
              to={`${base}/case-studies/new`}
              title="Create a blank case study. It is not public until you save."
            >
              New case study
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {caseStudies.map((study) => (
          <Link
            key={study.slug}
            to={`${base}/case-studies/${study.slug}`}
            title={`Edit ${study.name}. Opens the labeled form for this public page.`}
            className="studio-enter glass flex gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
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
                  {getCategoryMeta(siteConfig, study.category)?.label ??
                    study.category}
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
  const { caseStudies, technologies, siteConfig } = usePortfolio();
  const categories = siteConfig.categories;
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [tab, setTab] = useState<TabId>('basics');

  function patch(partial: Partial<CaseStudy>) {
    setStudy((current) => ({ ...current, ...partial }));
  }

  async function upload(
    kind: 'logo' | 'cover' | 'gallery',
    file: File,
    galleryIndex?: number
  ) {
    const slug = study.slug || 'draft';
    const extMatch = /\.[a-z0-9]+$/i.exec(file.name);
    const ext =
      extMatch?.[0].toLowerCase() ??
      (file.type === 'image/svg+xml'
        ? '.svg'
        : file.type === 'image/webp'
          ? '.webp'
          : file.type === 'image/jpeg'
            ? '.jpg'
            : '.png');

    const dest =
      kind === 'logo'
        ? `logos/${slug}${ext}`
        : kind === 'cover'
          ? `covers/${slug}${ext}`
          : `gallery/${slug}/${galleryIndex ?? 0}${ext}`;

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
  const activeTab = tabs.find((item) => item.id === tab);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={existing ? study.name || 'Edit case study' : 'New case study'}
        description="Write the narrative the public site already shows-context, decisions, stack, and media."
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <Button
              key={item.id}
              type="button"
              size="sm"
              variant={tab === item.id ? 'default' : 'outline'}
              title={item.description}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        {activeTab ? (
          <p className="text-sm text-muted-foreground">
            {activeTab.description}
          </p>
        ) : null}
      </div>

      {tab === 'basics' ? (
        <AdminSection title="Basics">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Name"
              hint="Public title on cards and the case study heading. Changing this does not change the URL unless you also edit the slug."
            >
              <Input
                value={study.name}
                onChange={(event) => patch({ name: event.target.value })}
              />
            </Field>
            <Field
              label="URL slug"
              hint="Path segment after the category, e.g. /platforms/this-slug. Changing it breaks old links until you save the new slug."
            >
              <Input
                value={study.slug}
                onChange={(event) => patch({ slug: event.target.value })}
              />
            </Field>
            <SelectField
              label="Category"
              hint="Chooses the public section. Options come from Site → Categories."
              value={study.category}
              onChange={(value) =>
                patch({ category: value as CaseStudyCategory })
              }
              options={
                categories.length > 0
                  ? categories.map((category) => ({
                      value: category.id,
                      label: category.label,
                    }))
                  : [
                      { value: 'platform', label: 'Platform' },
                      { value: 'infrastructure', label: 'Infrastructure' },
                      { value: 'automation', label: 'Automation' },
                    ]
              }
            />
            <Field
              label="Status"
              hint="Badge on the case study, for example Live or Draft. Display only - it does not hide the page."
            >
              <Input
                value={study.status}
                onChange={(event) => patch({ status: event.target.value })}
              />
            </Field>
            <SelectField
              label="Difficulty"
              hint="Shown as a difficulty badge on the public case study."
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
            <Field
              label="Timeline"
              hint="Duration label on the case study, for example 8 weeks. Display only."
            >
              <Input
                value={study.timeline ?? ''}
                onChange={(event) => patch({ timeline: event.target.value })}
              />
            </Field>
            <SwitchField
              label="Featured"
              hint="On: this study can appear in the home featured grid (up to four). Off: it stays on category lists only."
              checked={Boolean(study.featured)}
              onChange={(featured) => patch({ featured })}
            />
            <SwitchField
              label="Incomplete"
              hint="On: public page shows an incomplete/WIP treatment. Off: the study is presented as complete."
              checked={Boolean(study.incomplete)}
              onChange={(incomplete) => patch({ incomplete })}
            />
          </div>
          <Field
            label="Summary"
            hint="Card blurb and intro sentence. Keep it to a few lines; it is truncated on listing cards."
          >
            <Textarea
              rows={4}
              value={study.summary}
              onChange={(event) => patch({ summary: event.target.value })}
            />
          </Field>
          <Field
            label="Todo note"
            hint="Private reminder in Studio only. Not shown on the public site."
          >
            <Input
              value={study.todoNote ?? ''}
              onChange={(event) => patch({ todoNote: event.target.value })}
            />
          </Field>
          <PairListField<CaseStudyLink>
            label="Links"
            hint="Public demo or related URLs shown on the case study page. Leave empty to hide."
            items={study.links ?? []}
            fields={[
              {
                key: 'label',
                label: 'Label',
                hint: 'Button text, for example Student portal.',
              },
              {
                key: 'url',
                label: 'URL',
                hint: 'Absolute https URL opened in a new tab.',
              },
            ]}
            createItem={() => ({ label: '', url: '' })}
            onChange={(links) => patch({ links })}
          />
        </AdminSection>
      ) : null}

      {tab === 'story' ? (
        <AdminSection title="Story">
          {(
            [
              [
                'businessContext',
                'Business context',
                'Opening section: why the work existed. Replaces that heading’s body on the public page.',
              ],
              [
                'problem',
                'Problem',
                'Problem statement visitors read after context.',
              ],
              [
                'objective',
                'Objective',
                'What success looked like. Shown as the Objective section.',
              ],
              [
                'solution',
                'Solution',
                'What you built. Shown as the Solution section.',
              ],
              [
                'outcome',
                'Outcome',
                'Results and impact. Shown as the Outcome section.',
              ],
            ] as const
          ).map(([key, label, hint]) => (
            <Field key={key} label={label} hint={hint}>
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
          <Field
            label="Architecture overview"
            hint="Prose above the architecture diagram. Explains the system at a glance."
          >
            <Textarea
              rows={6}
              value={study.architecture}
              onChange={(event) => patch({ architecture: event.target.value })}
            />
          </Field>
          <PairListField
            label="Architecture nodes"
            hint="Boxes in the architecture flow. Reorder to change diagram order. Empty ids are skipped."
            items={study.architectureNodes ?? []}
            createItem={() => ({ id: '', label: '', detail: '' })}
            onChange={(architectureNodes) => patch({ architectureNodes })}
            fields={[
              {
                key: 'id',
                label: 'Id',
                hint: 'Stable key for this node. Used internally; keep it unique in this study.',
              },
              {
                key: 'label',
                label: 'Label',
                hint: 'Short title drawn on the node in the public diagram.',
              },
              {
                key: 'detail',
                label: 'Detail',
                hint: 'Supporting text shown with the node when visitors inspect it.',
                multiline: true,
              },
            ]}
          />
        </AdminSection>
      ) : null}

      {tab === 'stack' ? (
        <AdminSection
          title="Technology stack"
          description="Pick from the library so logos stay consistent."
        >
          <Field
            label="Technologies used"
            hint="Toggle a chip to attach or detach that library technology. Logos and names then appear on this case study."
          >
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
                    title={
                      selected
                        ? `Remove ${technology.name} from this case study.`
                        : `Add ${technology.name} to this case study’s stack.`
                    }
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
            hint="Named groups such as Frontend or Cloud. Item names are comma-separated and shown as lists."
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
              {
                key: 'group',
                label: 'Group name',
                hint: 'Heading for this stack group on the public page.',
              },
              {
                key: 'items',
                label: 'Items (comma separated)',
                hint: 'Tools in this group. Split on commas after you save.',
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
            hint="Bullet list of what you owned. Each item is one public bullet."
            values={study.responsibilities}
            onChange={(responsibilities) => patch({ responsibilities })}
          />
          <PairListField
            label="Decisions"
            hint="Decision / rationale pairs on the public page. Reorder to change reading order."
            items={study.decisions}
            createItem={() => ({ decision: '', rationale: '' })}
            onChange={(decisions) => patch({ decisions })}
            fields={[
              {
                key: 'decision',
                label: 'Decision',
                hint: 'The choice you made, shown as the decision title.',
              },
              {
                key: 'rationale',
                label: 'Rationale',
                hint: 'Why you made that choice. Shown under the decision.',
                multiline: true,
              },
            ]}
          />
          <PairListField
            label="Challenges"
            hint="Challenge / resolution pairs. Shown in the challenges section."
            items={study.challenges}
            createItem={() => ({ challenge: '', resolution: '' })}
            onChange={(challenges) => patch({ challenges })}
            fields={[
              {
                key: 'challenge',
                label: 'Challenge',
                hint: 'The obstacle title visitors read.',
              },
              {
                key: 'resolution',
                label: 'Resolution',
                hint: 'How it was handled. Shown under the challenge.',
                multiline: true,
              },
            ]}
          />
          <StringListField
            label="Learnings"
            hint="Closing bullets. Each item is one learning on the public page."
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
              hint="Mark on listing cards and the case study header. Prefer an existing logos/{slug} file; new uploads overwrite that stable path (no duplicates)."
              value={study.logo}
              altValue={study.logoAlt}
              onAltChange={(logoAlt) => patch({ logoAlt })}
              onPathChange={(logo) => patch({ logo })}
              onFile={(file) => void upload('logo', file)}
            />
            <ImageField
              label="Cover"
              hint="Hero/cover image on the case study page. Reuse from the library when the asset is already uploaded."
              value={study.coverImage}
              altValue={study.coverImageAlt}
              onAltChange={(coverImageAlt) => patch({ coverImageAlt })}
              onPathChange={(coverImage) => patch({ coverImage })}
              onFile={(file) => void upload('cover', file)}
            />
          </div>
          <Field
            label="Gallery"
            hint="Slideshow on the case study page. Removing a slide unlinks it here; the file stays in storage."
          >
            <div className="flex flex-col gap-4">
              {gallery.map((item, index) => (
                <div
                  key={`${item.src}-${index}`}
                  className="studio-enter rounded-xl border border-border/80 p-4"
                >
                  <ImageField
                    label={`Slide ${index + 1}`}
                    hint="Image for this gallery slide. Pick from the library or upload a new file."
                    value={item.src}
                    onPathChange={(src) => {
                      const next = [...gallery];
                      next[index] = { ...item, src };
                      patch({ gallery: next });
                    }}
                    onFile={(file) => void upload('gallery', file, index)}
                  />
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Caption"
                      hint="Text under this slide on the public gallery."
                    >
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
                      hint="Categorizes the slide (screenshot, architecture, and so on) for gallery filtering."
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
                    title="Remove this slide from the gallery. The image file is not deleted from storage."
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
                title="Append an empty gallery slide. Attach an image before saving."
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
          <Field
            label="Related"
            hint="Checked studies appear as related work at the bottom of this page. Uncheck to unlink."
          >
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
                        title={
                          checked
                            ? `Unlink ${item.name} from related work.`
                            : `Link ${item.name} as related work on this page.`
                        }
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
                          {getCategoryMeta(siteConfig, item.category)?.label ??
                            item.category}
                        </span>
                      </span>
                    </label>
                  );
                })}
            </div>
          </Field>
        </AdminSection>
      ) : null}

      <SaveBar
        onSave={() => void save()}
        onPreview={() => setPreviewOpen(true)}
        onDiscard={() => setStudy(existing ?? emptyStudy())}
        onDestructive={existing ? () => void remove() : undefined}
        destructiveLabel="Delete case study"
        status={status}
        saving={saving}
      />
      <AdminPreviewOverlay
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        draft={{ kind: 'caseStudy', study }}
        initialPath={
          study.slug
            ? getCaseStudyPath(study)
            : `/${study.category === 'platform' ? 'platforms' : study.category}`
        }
        label="Case study"
      />
    </div>
  );
}
