import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { portfolioQueryKey, usePortfolio } from '@/hooks/usePortfolio';
import {
  deletePhilosophyPillar,
  deleteTechnology,
  deleteTimelineItem,
  replaceResumeData,
  replaceTerminalCommands,
  upsertPhilosophyPillar,
  upsertTechnology,
  upsertTimelineItem,
  uploadPortfolioFile,
} from '@/services/portfolio-admin';
import { MEDIA_BUCKET } from '@/lib/supabase';
import { technologyCategories } from '@/lib/portfolio';
import {
  AdminSection,
  Field,
  ImageField,
  PageHeader,
  SaveBar,
  SelectField,
  StringListField,
  moveItem,
} from '@/features/admin/fields';
import { AdminPreviewOverlay } from '@/features/admin/AdminPreviewOverlay';
import { ResumeFilesPanel } from '@/features/admin/ResumeFilesPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type {
  CaseStudyCategory,
  PhilosophyPillar,
  ResumeData,
  TechnologyCategory,
  TerminalCommand,
  TimelineItem,
} from '@/types/portfolio';

const techCategoryOptions = Object.entries(technologyCategories).map(
  ([value, label]) => ({
    value,
    label,
  })
);

export function AdminTechnologiesPage() {
  const { technologies } = usePortfolio();
  const queryClient = useQueryClient();
  const [items, setItems] = useState(technologies);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await Promise.all(
        items.map((item, index) => upsertTechnology(item, index))
      );
      const removed = technologies.filter(
        (tech) => !items.some((item) => item.id === tech.id)
      );
      await Promise.all(removed.map((tech) => deleteTechnology(tech.id)));
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey });
      setStatus('Saved.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function uploadLogo(id: string, file: File) {
    const ext = file.name.includes('.')
      ? file.name.slice(file.name.lastIndexOf('.'))
      : '.svg';
    const path = `tech/${id}${ext}`;
    await uploadPortfolioFile(MEDIA_BUCKET, path, file);
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, logoPath: path, logo: path } : item
      )
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Technologies"
        description="Logos and blurbs for the technology library. Add a card, upload a mark, and write a short description."
        actions={
          <Button
            type="button"
            variant="outline"
            title="Append a blank technology card. Fill id, name, and logo, then save to publish."
            onClick={() =>
              setItems([
                ...items,
                {
                  id: `tech-${items.length + 1}`,
                  name: 'New technology',
                  category: 'frontend',
                  logo: '',
                  logoPath: '',
                  description: '',
                  usedInSlugs: [],
                },
              ])
            }
          >
            <Plus data-icon="inline-start" />
            Add technology
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item, index) => (
          <AdminSection key={item.id + index} title={item.name || 'Untitled'}>
            <ImageField
              label="Logo"
              hint="Mark on the technology library and case study chips. Reuse an existing file when the logo is already in storage."
              value={item.logoPath || item.logo}
              accept="image/*,.svg"
              onPathChange={(path) =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, logoPath: path, logo: path }
                      : entry
                  )
                )
              }
              onFile={(file) => void uploadLogo(item.id, file)}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Id"
                hint="Stable key used when case studies reference this technology. Changing it breaks existing links until those studies are re-saved."
              >
                <Input
                  value={item.id}
                  onChange={(event) =>
                    setItems((current) =>
                      current.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, id: event.target.value }
                          : entry
                      )
                    )
                  }
                />
              </Field>
              <Field
                label="Name"
                hint="Public label next to the logo in the library and on case studies."
              >
                <Input
                  value={item.name}
                  onChange={(event) =>
                    setItems((current) =>
                      current.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, name: event.target.value }
                          : entry
                      )
                    )
                  }
                />
              </Field>
            </div>
            <SelectField
              label="Category"
              hint="Groups this card in the technology library filters."
              value={item.category}
              options={techCategoryOptions}
              onChange={(value) =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, category: value as TechnologyCategory }
                      : entry
                  )
                )
              }
            />
            <Field
              label="Description"
              hint="Short blurb on the technology library card."
            >
              <Textarea
                rows={3}
                value={item.description}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, description: event.target.value }
                        : entry
                    )
                  )
                }
              />
            </Field>
            {item.usedInSlugs.length > 0 ? (
              <p className="font-mono text-xs text-muted-foreground">
                Used in: {item.usedInSlugs.join(', ')}
              </p>
            ) : null}
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Remove this technology from the form. Save to delete it from the database. Media files stay in storage."
              onClick={() =>
                setItems((current) =>
                  current.filter((_, entryIndex) => entryIndex !== index)
                )
              }
            >
              <Trash2 data-icon="inline-start" />
              Remove
            </Button>
          </AdminSection>
        ))}
      </div>
      <SaveBar
        onSave={() => void save()}
        onPreview={() => setPreviewOpen(true)}
        onDiscard={() => setItems(technologies)}
        status={status}
        saving={saving}
      />
      <AdminPreviewOverlay
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        draft={{ kind: 'technologies', technologies: items }}
        initialPath="/technology-library"
        label="Technologies"
      />
    </div>
  );
}

function ReorderButtons<T>({
  items,
  index,
  onChange,
}: {
  items: T[];
  index: number;
  onChange: (items: T[]) => void;
}) {
  return (
    <div className="flex gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        title="Move this item one position earlier on the public page."
        aria-label="Move up"
        disabled={index === 0}
        onClick={() => onChange(moveItem(items, index, index - 1))}
      >
        <ArrowUp />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        title="Move this item one position later on the public page."
        aria-label="Move down"
        disabled={index === items.length - 1}
        onClick={() => onChange(moveItem(items, index, index + 1))}
      >
        <ArrowDown />
      </Button>
    </div>
  );
}

export function AdminTimelinePage() {
  const { timeline } = usePortfolio();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<TimelineItem[]>(timeline);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await Promise.all(
        items.map((item, index) => upsertTimelineItem(item, index))
      );
      const removed = timeline.filter(
        (item) => !items.some((entry) => entry.id === item.id)
      );
      await Promise.all(removed.map((item) => deleteTimelineItem(item.id)));
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
        title="Timeline"
        description="Career, education, deployments, and achievements on the Experience page."
        actions={
          <Button
            type="button"
            variant="outline"
            title="Append a blank timeline event. Fill the fields, then save to publish."
            onClick={() =>
              setItems([
                ...items,
                {
                  id: `item-${Date.now()}`,
                  type: 'career',
                  title: '',
                  organization: '',
                  period: '',
                  description: '',
                  highlights: [],
                },
              ])
            }
          >
            <Plus data-icon="inline-start" />
            Add event
          </Button>
        }
      />
      {items.map((item, index) => (
        <AdminSection key={item.id} title={item.title || 'Untitled event'}>
          <div className="flex justify-between">
            <SelectField
              label="Type"
              hint="Icon and grouping on the Experience page: career, education, achievement, or deployment."
              value={item.type}
              options={[
                { value: 'career', label: 'Career' },
                { value: 'education', label: 'Education' },
                { value: 'achievement', label: 'Achievement' },
                { value: 'deployment', label: 'Deployment' },
              ]}
              onChange={(type) =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, type: type as TimelineItem['type'] }
                      : entry
                  )
                )
              }
            />
            <ReorderButtons items={items} index={index} onChange={setItems} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Title"
              hint="Event heading on the public timeline, for example the role or degree."
            >
              <Input
                value={item.title}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, title: event.target.value }
                        : entry
                    )
                  )
                }
              />
            </Field>
            <Field
              label="Organization"
              hint="Company or school name shown under the title."
            >
              <Input
                value={item.organization}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, organization: event.target.value }
                        : entry
                    )
                  )
                }
              />
            </Field>
            <Field
              label="Period"
              hint="Date range label, for example 2022 — Present."
            >
              <Input
                value={item.period}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, period: event.target.value }
                        : entry
                    )
                  )
                }
              />
            </Field>
            <Field
              label="Id"
              hint="Stable key for this event. Keep it unique; changing it creates a new row on save."
            >
              <Input
                value={item.id}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, id: event.target.value }
                        : entry
                    )
                  )
                }
              />
            </Field>
          </div>
          <Field
            label="Description"
            hint="Body copy for this timeline card on /experience."
          >
            <Textarea
              rows={3}
              value={item.description}
              onChange={(event) =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, description: event.target.value }
                      : entry
                  )
                )
              }
            />
          </Field>
          <StringListField
            label="Highlights"
            hint="Optional bullets under the description. Each item is one public bullet."
            values={item.highlights ?? []}
            onChange={(highlights) =>
              setItems((current) =>
                current.map((entry, entryIndex) =>
                  entryIndex === index ? { ...entry, highlights } : entry
                )
              )
            }
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            title="Remove this event from the form. Save to delete it from the database."
            onClick={() =>
              setItems((current) =>
                current.filter((_, entryIndex) => entryIndex !== index)
              )
            }
          >
            Remove event
          </Button>
        </AdminSection>
      ))}
      <SaveBar
        onSave={() => void save()}
        onPreview={() => setPreviewOpen(true)}
        onDiscard={() => setItems(timeline)}
        status={status}
        saving={saving}
      />
      <AdminPreviewOverlay
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        draft={{ kind: 'timeline', timeline: items }}
        initialPath="/experience"
        label="Timeline"
      />
    </div>
  );
}

export function AdminPhilosophyPage() {
  const { philosophyPillars } = usePortfolio();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<PhilosophyPillar[]>(philosophyPillars);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await Promise.all(
        items.map((item, index) => upsertPhilosophyPillar(item, index))
      );
      const removed = philosophyPillars.filter(
        (item) => !items.some((entry) => entry.id === item.id)
      );
      await Promise.all(removed.map((item) => deletePhilosophyPillar(item.id)));
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
        title="Philosophy"
        description="The eight (or however many) principles on the philosophy page."
        actions={
          <Button
            type="button"
            variant="outline"
            title="Append a blank principle. Fill title and copy, then save to publish."
            onClick={() =>
              setItems([
                ...items,
                {
                  id: `pillar-${Date.now()}`,
                  title: '',
                  summary: '',
                  detail: '',
                },
              ])
            }
          >
            Add pillar
          </Button>
        }
      />
      {items.map((item, index) => (
        <AdminSection key={item.id} title={item.title || 'Untitled pillar'}>
          <div className="flex justify-end">
            <ReorderButtons items={items} index={index} onChange={setItems} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Id"
              hint="Stable key for this pillar. Keep it unique across the list."
            >
              <Input
                value={item.id}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, id: event.target.value }
                        : entry
                    )
                  )
                }
              />
            </Field>
            <Field label="Title" hint="Heading on the public philosophy card.">
              <Input
                value={item.title}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, title: event.target.value }
                        : entry
                    )
                  )
                }
              />
            </Field>
          </div>
          <Field label="Summary" hint="One-line teaser on the philosophy card.">
            <Input
              value={item.summary}
              onChange={(event) =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, summary: event.target.value }
                      : entry
                  )
                )
              }
            />
          </Field>
          <Field
            label="Detail"
            hint="Expanded copy on the philosophy card body."
          >
            <Textarea
              rows={4}
              value={item.detail}
              onChange={(event) =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, detail: event.target.value }
                      : entry
                  )
                )
              }
            />
          </Field>
          <Button
            type="button"
            variant="outline"
            size="sm"
            title="Remove this pillar from the form. Save to delete it from the database."
            onClick={() =>
              setItems((current) =>
                current.filter((_, entryIndex) => entryIndex !== index)
              )
            }
          >
            Remove pillar
          </Button>
        </AdminSection>
      ))}
      <SaveBar
        onSave={() => void save()}
        onPreview={() => setPreviewOpen(true)}
        onDiscard={() => setItems(philosophyPillars)}
        status={status}
        saving={saving}
      />
      <AdminPreviewOverlay
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        draft={{ kind: 'philosophy', philosophyPillars: items }}
        initialPath="/philosophy"
        label="Philosophy"
      />
    </div>
  );
}

const resumeTabs = [
  {
    id: 'PDFs',
    description:
      'Upload resume PDFs and choose which one public download buttons use.',
  },
  {
    id: 'Highlights',
    description:
      'Top stats on the resume page. Each row is one highlight chip.',
  },
  {
    id: 'Competencies',
    description: 'Core competency chips listed near the top of the resume.',
  },
  {
    id: 'Expertise',
    description: 'Grouped skill lists under Technical expertise.',
  },
  {
    id: 'Experience',
    description: 'Professional roles and bullets on the resume.',
  },
  {
    id: 'Projects',
    description: 'Key projects, optional link to a public case study.',
  },
  {
    id: 'Education',
    description: 'Degrees shown in the education block.',
  },
  {
    id: 'Certifications',
    description: 'Certification groups by provider.',
  },
] as const;

export function AdminResumePage() {
  const { resume, caseStudies } = usePortfolio();
  const queryClient = useQueryClient();
  const [data, setData] = useState<ResumeData>(resume);
  const [tab, setTab] =
    useState<(typeof resumeTabs)[number]['id']>('Highlights');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const activeTab = resumeTabs.find((item) => item.id === tab);

  async function save() {
    setSaving(true);
    try {
      await replaceResumeData(data);
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
        title="Resume"
        description="Sections that render on the resume preview page."
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {resumeTabs.map((item) => (
            <Button
              key={item.id}
              type="button"
              size="sm"
              variant={tab === item.id ? 'default' : 'outline'}
              title={item.description}
              onClick={() => setTab(item.id)}
            >
              {item.id}
            </Button>
          ))}
        </div>
        {activeTab ? (
          <p className="text-sm text-muted-foreground">
            {activeTab.description}
          </p>
        ) : null}
      </div>

      {tab === 'PDFs' ? <ResumeFilesPanel /> : null}

      {tab === 'Highlights' ? (
        <AdminSection title="Highlights">
          {data.highlights.map((item, index) => (
            <div
              key={item.id}
              className="studio-enter grid gap-3 rounded-xl border border-border/80 p-4 sm:grid-cols-2"
            >
              <Field
                label="Label"
                hint="Short highlight title, for example the metric name on the resume."
              >
                <Input
                  value={item.label}
                  onChange={(event) =>
                    setData({
                      ...data,
                      highlights: data.highlights.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, label: event.target.value }
                          : entry
                      ),
                    })
                  }
                />
              </Field>
              <Field
                label="Detail"
                hint="Optional supporting value or sentence next to the label."
              >
                <Input
                  value={item.detail ?? ''}
                  onChange={(event) =>
                    setData({
                      ...data,
                      highlights: data.highlights.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, detail: event.target.value }
                          : entry
                      ),
                    })
                  }
                />
              </Field>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            title="Add another highlight row to the resume."
            onClick={() =>
              setData({
                ...data,
                highlights: [
                  ...data.highlights,
                  { id: `h-${Date.now()}`, label: '', detail: '' },
                ],
              })
            }
          >
            Add highlight
          </Button>
        </AdminSection>
      ) : null}

      {tab === 'Competencies' ? (
        <AdminSection title="Core competencies">
          <StringListField
            label="Competencies"
            hint="Each item becomes a competency chip on the public resume."
            values={data.coreCompetencies}
            onChange={(coreCompetencies) =>
              setData({ ...data, coreCompetencies })
            }
          />
        </AdminSection>
      ) : null}

      {tab === 'Expertise' ? (
        <AdminSection title="Technical expertise">
          {data.technicalExpertise.map((group, index) => (
            <div
              key={group.id}
              className="studio-enter flex flex-col gap-3 rounded-xl border border-border/80 p-4"
            >
              <Field
                label="Group title"
                hint="Heading for this skill group, for example Cloud or Frontend."
              >
                <Input
                  value={group.title}
                  onChange={(event) =>
                    setData({
                      ...data,
                      technicalExpertise: data.technicalExpertise.map(
                        (entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, title: event.target.value }
                            : entry
                      ),
                    })
                  }
                />
              </Field>
              <StringListField
                label="Items"
                hint="Skills listed under this group heading."
                values={group.items}
                onChange={(items) =>
                  setData({
                    ...data,
                    technicalExpertise: data.technicalExpertise.map(
                      (entry, entryIndex) =>
                        entryIndex === index ? { ...entry, items } : entry
                    ),
                  })
                }
              />
            </div>
          ))}
        </AdminSection>
      ) : null}

      {tab === 'Experience' ? (
        <AdminSection title="Professional experience">
          {data.professionalExperience.map((entry, index) => (
            <div
              key={entry.id}
              className="studio-enter flex flex-col gap-3 rounded-xl border border-border/80 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Organization"
                  hint="Employer name on this resume role."
                >
                  <Input
                    value={entry.organization}
                    onChange={(event) =>
                      setData({
                        ...data,
                        professionalExperience: data.professionalExperience.map(
                          (item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, organization: event.target.value }
                              : item
                        ),
                      })
                    }
                  />
                </Field>
                <Field
                  label="Role"
                  hint="Job title shown next to the organization."
                >
                  <Input
                    value={entry.role}
                    onChange={(event) =>
                      setData({
                        ...data,
                        professionalExperience: data.professionalExperience.map(
                          (item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, role: event.target.value }
                              : item
                        ),
                      })
                    }
                  />
                </Field>
                <Field
                  label="Period"
                  hint="Date range for this role, for example 2021 — 2024."
                >
                  <Input
                    value={entry.period}
                    onChange={(event) =>
                      setData({
                        ...data,
                        professionalExperience: data.professionalExperience.map(
                          (item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, period: event.target.value }
                              : item
                        ),
                      })
                    }
                  />
                </Field>
              </div>
              <StringListField
                label="Bullets"
                hint="Achievement bullets under this role. Each item is one line."
                values={entry.bullets}
                onChange={(bullets) =>
                  setData({
                    ...data,
                    professionalExperience: data.professionalExperience.map(
                      (item, itemIndex) =>
                        itemIndex === index ? { ...item, bullets } : item
                    ),
                  })
                }
              />
            </div>
          ))}
        </AdminSection>
      ) : null}

      {tab === 'Projects' ? (
        <AdminSection title="Key projects">
          {data.keyProjects.map((project, index) => (
            <div
              key={project.id}
              className="studio-enter flex flex-col gap-3 rounded-xl border border-border/80 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Name"
                  hint="Project title on the resume. If linked, it can route to the case study."
                >
                  <Input
                    value={project.name}
                    onChange={(event) =>
                      setData({
                        ...data,
                        keyProjects: data.keyProjects.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, name: event.target.value }
                            : item
                        ),
                      })
                    }
                  />
                </Field>
                <Field
                  label="Role"
                  hint="Your role on this project, shown under the title."
                >
                  <Input
                    value={project.role}
                    onChange={(event) =>
                      setData({
                        ...data,
                        keyProjects: data.keyProjects.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, role: event.target.value }
                            : item
                        ),
                      })
                    }
                  />
                </Field>
              </div>
              <StringListField
                label="Bullets"
                hint="Project achievement bullets on the resume."
                values={project.bullets}
                onChange={(bullets) =>
                  setData({
                    ...data,
                    keyProjects: data.keyProjects.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, bullets } : item
                    ),
                  })
                }
              />
              <StringListField
                label="Stack"
                hint="Tech names listed on this project. These are text labels, not library logos."
                values={project.stack}
                onChange={(stack) =>
                  setData({
                    ...data,
                    keyProjects: data.keyProjects.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, stack } : item
                    ),
                  })
                }
              />
              <SelectField
                label="Linked case study"
                hint="None keeps the project as resume-only. Choosing a study adds a public case study link."
                value={project.caseStudy?.slug ?? 'none'}
                options={[
                  { value: 'none', label: 'None' },
                  ...caseStudies.map((study) => ({
                    value: study.slug,
                    label: study.name,
                  })),
                ]}
                onChange={(value) => {
                  const study = caseStudies.find((item) => item.slug === value);
                  setData({
                    ...data,
                    keyProjects: data.keyProjects.map((item, itemIndex) =>
                      itemIndex === index
                        ? {
                            ...item,
                            caseStudy: study
                              ? {
                                  slug: study.slug,
                                  category: study.category as CaseStudyCategory,
                                }
                              : undefined,
                          }
                        : item
                    ),
                  });
                }}
              />
            </div>
          ))}
        </AdminSection>
      ) : null}

      {tab === 'Education' ? (
        <AdminSection title="Education">
          {data.education.map((entry, index) => (
            <div
              key={entry.id}
              className="studio-enter grid gap-3 rounded-xl border border-border/80 p-4 sm:grid-cols-2"
            >
              <Field
                label="Degree"
                hint="Degree name shown in the education block."
              >
                <Input
                  value={entry.degree}
                  onChange={(event) =>
                    setData({
                      ...data,
                      education: data.education.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, degree: event.target.value }
                          : item
                      ),
                    })
                  }
                />
              </Field>
              <Field label="Institution" hint="School or university name.">
                <Input
                  value={entry.institution}
                  onChange={(event) =>
                    setData({
                      ...data,
                      education: data.education.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, institution: event.target.value }
                          : item
                      ),
                    })
                  }
                />
              </Field>
              <Field
                label="Period"
                hint="Years attended, for example 2018 — 2022."
              >
                <Input
                  value={entry.period}
                  onChange={(event) =>
                    setData({
                      ...data,
                      education: data.education.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, period: event.target.value }
                          : item
                      ),
                    })
                  }
                />
              </Field>
              <Field
                label="Detail"
                hint="Optional extra line such as GPA or honors."
              >
                <Input
                  value={entry.detail}
                  onChange={(event) =>
                    setData({
                      ...data,
                      education: data.education.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, detail: event.target.value }
                          : item
                      ),
                    })
                  }
                />
              </Field>
            </div>
          ))}
        </AdminSection>
      ) : null}

      {tab === 'Certifications' ? (
        <AdminSection title="Certifications">
          {data.certifications.map((group, index) => (
            <div
              key={group.id}
              className="studio-enter flex flex-col gap-3 rounded-xl border border-border/80 p-4"
            >
              <Field
                label="Provider"
                hint="Issuer heading, for example AWS or Microsoft."
              >
                <Input
                  value={group.provider}
                  onChange={(event) =>
                    setData({
                      ...data,
                      certifications: data.certifications.map(
                        (item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, provider: event.target.value }
                            : item
                      ),
                    })
                  }
                />
              </Field>
              <StringListField
                label="Items"
                hint="Certificate names listed under this provider."
                values={group.items}
                onChange={(items) =>
                  setData({
                    ...data,
                    certifications: data.certifications.map(
                      (item, itemIndex) =>
                        itemIndex === index ? { ...item, items } : item
                    ),
                  })
                }
              />
            </div>
          ))}
        </AdminSection>
      ) : null}

      {tab === 'PDFs' ? null : (
        <SaveBar
          onSave={() => void save()}
          onPreview={() => setPreviewOpen(true)}
          onDiscard={() => setData(resume)}
          status={status}
          saving={saving}
        />
      )}
      <AdminPreviewOverlay
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        draft={{ kind: 'resume', resume: data }}
        initialPath="/resume"
        label="Resume"
      />
    </div>
  );
}

export function AdminTerminalPage() {
  const { terminalCommands } = usePortfolio();
  const queryClient = useQueryClient();
  const [commands, setCommands] = useState<TerminalCommand[]>(terminalCommands);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await replaceTerminalCommands(commands);
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
        title="Terminal catalog"
        description="Names, aliases, and help text. Built-in command behavior still lives in code."
        actions={
          <Button
            type="button"
            variant="outline"
            title="Add a help catalog entry. Runtime behavior still requires matching code."
            onClick={() =>
              setCommands([
                ...commands,
                { name: '', description: '', aliases: [] },
              ])
            }
          >
            Add command
          </Button>
        }
      />
      <div className="flex flex-col gap-3">
        {commands.map((command, index) => (
          <div
            key={`${command.name}-${index}`}
            className="studio-enter glass flex flex-col gap-3 rounded-2xl p-4"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Command"
                hint="Typed name in the public terminal help, for example about. Must match a coded command to run."
              >
                <Input
                  value={command.name}
                  onChange={(event) =>
                    setCommands((current) =>
                      current.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, name: event.target.value }
                          : entry
                      )
                    )
                  }
                />
              </Field>
              <Field
                label="Description"
                hint="Help-text line shown next to this command in the terminal catalog."
              >
                <Input
                  value={command.description}
                  onChange={(event) =>
                    setCommands((current) =>
                      current.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, description: event.target.value }
                          : entry
                      )
                    )
                  }
                />
              </Field>
            </div>
            <StringListField
              label="Aliases"
              hint="Alternate names that should resolve to this command in help text."
              values={command.aliases ?? []}
              onChange={(aliases) =>
                setCommands((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, aliases } : entry
                  )
                )
              }
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Remove this command from the catalog. Save to persist. Coded behavior is unchanged."
              onClick={() =>
                setCommands((current) =>
                  current.filter((_, entryIndex) => entryIndex !== index)
                )
              }
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <SaveBar
        onSave={() => void save()}
        onPreview={() => setPreviewOpen(true)}
        onDiscard={() => setCommands(terminalCommands)}
        status={status}
        saving={saving}
      />
      <AdminPreviewOverlay
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        draft={{ kind: 'terminal', terminalCommands: commands }}
        initialPath="/"
        label="Terminal"
      />
    </div>
  );
}
