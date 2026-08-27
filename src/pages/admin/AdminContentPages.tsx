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
              value={item.logoPath || item.logo}
              accept="image/*,.svg"
              onFile={(file) => void uploadLogo(item.id, file)}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Id">
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
              <Field label="Name">
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
            <Field label="Description">
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
        onDiscard={() => setItems(technologies)}
        status={status}
        saving={saving}
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
            <Field label="Title">
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
            <Field label="Organization">
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
            <Field label="Period">
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
            <Field label="Id">
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
          <Field label="Description">
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
        onDiscard={() => setItems(timeline)}
        status={status}
        saving={saving}
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
            <Field label="Id">
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
            <Field label="Title">
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
          <Field label="Summary">
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
          <Field label="Detail">
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
        onDiscard={() => setItems(philosophyPillars)}
        status={status}
        saving={saving}
      />
    </div>
  );
}

const resumeTabs = [
  'Highlights',
  'Competencies',
  'Expertise',
  'Experience',
  'Projects',
  'Education',
  'Certifications',
] as const;

export function AdminResumePage() {
  const { resume, caseStudies } = usePortfolio();
  const queryClient = useQueryClient();
  const [data, setData] = useState<ResumeData>(resume);
  const [tab, setTab] = useState<(typeof resumeTabs)[number]>('Highlights');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

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
      <div className="flex flex-wrap gap-2">
        {resumeTabs.map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant={tab === item ? 'default' : 'outline'}
            onClick={() => setTab(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      {tab === 'Highlights' ? (
        <AdminSection title="Highlights">
          {data.highlights.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-xl border border-border/80 p-4 sm:grid-cols-2"
            >
              <Field label="Label">
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
              <Field label="Detail">
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
              className="flex flex-col gap-3 rounded-xl border border-border/80 p-4"
            >
              <Field label="Group title">
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
              className="flex flex-col gap-3 rounded-xl border border-border/80 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Organization">
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
                <Field label="Role">
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
                <Field label="Period">
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
              className="flex flex-col gap-3 rounded-xl border border-border/80 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name">
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
                <Field label="Role">
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
              className="grid gap-3 rounded-xl border border-border/80 p-4 sm:grid-cols-2"
            >
              <Field label="Degree">
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
              <Field label="Institution">
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
              <Field label="Period">
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
              <Field label="Detail">
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
              className="flex flex-col gap-3 rounded-xl border border-border/80 p-4"
            >
              <Field label="Provider">
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

      <SaveBar
        onSave={() => void save()}
        onDiscard={() => setData(resume)}
        status={status}
        saving={saving}
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
            className="glass flex flex-col gap-3 rounded-2xl p-4"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Command">
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
              <Field label="Description">
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
        onDiscard={() => setCommands(terminalCommands)}
        status={status}
        saving={saving}
      />
    </div>
  );
}
