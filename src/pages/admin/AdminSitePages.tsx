import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { portfolioQueryKey, usePortfolio } from '@/hooks/usePortfolio';
import {
  upsertSiteConfig,
  uploadPortfolioFile,
} from '@/services/portfolio-admin';
import { MEDIA_BUCKET } from '@/lib/supabase';
import { defaultSiteConfig } from '@/content/siteConfig';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { SiteConfig } from '@/types/site-config';
import type {
  EngineeringAreaCard,
  NavGroupItem,
  NavItem,
  NavLinkItem,
  SiteCategoryConfig,
  SiteStatDefinition,
} from '@/types/site-config';

async function uploadBrandFile(folder: string, file: File) {
  const ext = file.name.includes('.')
    ? file.name.slice(file.name.lastIndexOf('.'))
    : '.png';
  const path = `${folder}/${Date.now()}${ext}`;
  await uploadPortfolioFile(MEDIA_BUCKET, path, file);
  return path;
}

function useSiteConfigEditor() {
  const {
    siteConfig: initial,
    siteVersion,
  } = usePortfolio();
  const queryClient = useQueryClient();
  const [config, setConfig] = useState<SiteConfig>(initial);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  async function save() {
    setStatus('');
    setSaving(true);
    try {
      await upsertSiteConfig(siteVersion, config);
      await queryClient.invalidateQueries({ queryKey: portfolioQueryKey });
      setStatus('Saved. Public site will pick this up on refresh.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return { config, setConfig, status, saving, save, siteVersion };
}

export function AdminSiteContentPage() {
  const { config, setConfig, status, saving, save } = useSiteConfigEditor();
  const chrome = config.chrome;

  function patchChrome<K extends keyof SiteConfig['chrome']>(
    key: K,
    value: SiteConfig['chrome'][K]
  ) {
    setConfig((current) => ({
      ...current,
      chrome: { ...current.chrome, [key]: value },
    }));
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Site content"
        description="Marketing chrome for hero, home sections, about, contact, footer, and boot sequence. Changes publish without a frontend deploy."
      />
      <SaveBar saving={saving} status={status} onSave={save} />

      <AdminSection title="Hero">
        <Field label="Eyebrow" hint="Small line above your name.">
          <Input
            value={chrome.hero.eyebrow}
            onChange={(event) =>
              patchChrome('hero', { ...chrome.hero, eyebrow: event.target.value })
            }
          />
        </Field>
        <Field
          label="Headline"
          hint="Edited on Profile. Shown under your name on the home hero."
        >
          <p className="text-sm text-muted-foreground">
            Use Studio → Profile → Headline to change the hero headline.
          </p>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="CTA label" hint="Primary hero button text.">
            <Input
              value={chrome.hero.ctaLabel}
              onChange={(event) =>
                patchChrome('hero', {
                  ...chrome.hero,
                  ctaLabel: event.target.value,
                })
              }
            />
          </Field>
          <Field label="CTA path" hint="Internal path, e.g. /platforms.">
            <Input
              value={chrome.hero.ctaTo}
              onChange={(event) =>
                patchChrome('hero', {
                  ...chrome.hero,
                  ctaTo: event.target.value,
                })
              }
            />
          </Field>
        </div>
      </AdminSection>

      <AdminSection title="Home sections">
        {(
          [
            ['homeAbout', 'Home about'],
            ['engineeringAreasSection', 'Engineering areas header'],
            ['featured', 'Featured case studies'],
            ['experienceSnapshot', 'Experience snapshot'],
            ['homeCta', 'Home CTA band'],
          ] as const
        ).map(([key, label]) => {
          const block = chrome[key] as Record<string, string>;
          return (
            <div key={key} className="rounded-xl border border-border/80 p-4">
              <p className="mb-3 font-medium">{label}</p>
              <div className="grid gap-3">
                {Object.entries(block).map(([field, value]) => (
                  <Field key={field} label={field} hint={`chrome.${key}.${field}`}>
                    <Input
                      value={value}
                      onChange={(event) =>
                        patchChrome(key, {
                          ...block,
                          [field]: event.target.value,
                        } as SiteConfig['chrome'][typeof key])
                      }
                    />
                  </Field>
                ))}
              </div>
            </div>
          );
        })}
      </AdminSection>

      <AdminSection title="About page chrome">
        <div className="grid gap-3">
          {(['eyebrow', 'title', 'description'] as const).map((field) => (
            <Field key={field} label={field} hint={`about.${field}`}>
              <Input
                value={chrome.about[field]}
                onChange={(event) =>
                  patchChrome('about', {
                    ...chrome.about,
                    [field]: event.target.value,
                  })
                }
              />
            </Field>
          ))}
          {(
            [
              'whoIAm',
              'howIThink',
              'whatIEnjoy',
              'approach',
            ] as const
          ).map((field) => (
            <Field
              key={field}
              label={`Section title: ${field}`}
              hint={`about.sectionTitles.${field}`}
            >
              <Input
                value={chrome.about.sectionTitles[field]}
                onChange={(event) =>
                  patchChrome('about', {
                    ...chrome.about,
                    sectionTitles: {
                      ...chrome.about.sectionTitles,
                      [field]: event.target.value,
                    },
                  })
                }
              />
            </Field>
          ))}
        </div>
      </AdminSection>

      <AdminSection title="Contact chrome">
        {(['eyebrow', 'title', 'description'] as const).map((field) => (
          <Field key={field} label={field} hint={`contact.${field}`}>
            <Input
              value={chrome.contact[field]}
              onChange={(event) =>
                patchChrome('contact', {
                  ...chrome.contact,
                  [field]: event.target.value,
                })
              }
            />
          </Field>
        ))}
      </AdminSection>

      <AdminSection title="Footer">
        <Field label="Tagline" hint="Footer intro under your name.">
          <Textarea
            rows={2}
            value={chrome.footer.tagline}
            onChange={(event) =>
              patchChrome('footer', {
                ...chrome.footer,
                tagline: event.target.value,
              })
            }
          />
        </Field>
        <Field label="Focus blurb" hint="Current focus column copy.">
          <Textarea
            rows={2}
            value={chrome.footer.focus}
            onChange={(event) =>
              patchChrome('footer', {
                ...chrome.footer,
                focus: event.target.value,
              })
            }
          />
        </Field>
        <StringListField
          label="Principles"
          hint="Bullets under Principles in the footer."
          values={chrome.footer.principles}
          onChange={(principles) =>
            patchChrome('footer', { ...chrome.footer, principles })
          }
        />
        <StringListField
          label="Stack chips"
          hint="Small tech chips in the footer."
          values={chrome.footer.stack}
          onChange={(stack) =>
            patchChrome('footer', { ...chrome.footer, stack })
          }
        />
      </AdminSection>

      <AdminSection title="Boot sequence">
        <StringListField
          label="Steps"
          hint="Lines shown during the boot animation."
          values={chrome.bootSteps}
          onChange={(bootSteps) => patchChrome('bootSteps', bootSteps)}
        />
      </AdminSection>

      <AdminSection title="Engineering area cards">
        <PairListField<EngineeringAreaCard>
          label="Areas"
          hint="Home engineering pillars. Gradient must be platform, infrastructure, or automation."
          items={config.engineeringAreas}
          fields={[
            { key: 'id', label: 'Id', hint: 'Stable key.' },
            { key: 'href', label: 'Href', hint: 'Link path.' },
            { key: 'title', label: 'Title', hint: 'Card title.' },
            {
              key: 'description',
              label: 'Description',
              hint: 'Card body.',
              multiline: true,
            },
            { key: 'examples', label: 'Examples', hint: 'Mono line under body.' },
            {
              key: 'gradient',
              label: 'Gradient',
              hint: 'platform | infrastructure | automation',
            },
          ]}
          createItem={() => ({
            id: `area-${Date.now()}`,
            href: '/platforms',
            title: 'New area',
            description: '',
            examples: '',
            gradient: 'platform',
          })}
          onChange={(engineeringAreas) =>
            setConfig((current) => ({ ...current, engineeringAreas }))
          }
        />
      </AdminSection>

      <AdminSection title="Stats">
        <Field label="Baseline year" hint="Used for Years Learning metric.">
          <Input
            type="number"
            value={config.stats.baselineYear}
            onChange={(event) =>
              setConfig((current) => ({
                ...current,
                stats: {
                  ...current.stats,
                  baselineYear: Number(event.target.value) || 2019,
                },
              }))
            }
          />
        </Field>
        <StringListField
          label="Production statuses"
          hint="Case study status values counted as production systems."
          values={config.stats.productionStatuses}
          onChange={(productionStatuses) =>
            setConfig((current) => ({
              ...current,
              stats: { ...current.stats, productionStatuses },
            }))
          }
        />
        <PairListField<SiteStatDefinition>
          label="Stat definitions"
          hint="source: production | automation | infrastructure | platforms | enterprise-tech | years"
          items={config.stats.items}
          fields={[
            { key: 'id', label: 'Id', hint: 'Stable key.' },
            { key: 'label', label: 'Label', hint: 'Public label.' },
            {
              key: 'description',
              label: 'Description',
              hint: 'Card body.',
              multiline: true,
            },
            { key: 'suffix', label: 'Suffix', hint: 'Optional, e.g. +' },
            { key: 'source', label: 'Source', hint: 'Metric source key.' },
          ]}
          createItem={() => ({
            id: `stat-${Date.now()}`,
            label: 'New metric',
            description: '',
            source: 'production',
          })}
          onChange={(items) =>
            setConfig((current) => ({
              ...current,
              stats: { ...current.stats, items },
            }))
          }
        />
      </AdminSection>

      <SaveBar saving={saving} status={status} onSave={save} />
    </div>
  );
}

export function AdminSiteNavigationPage() {
  const { config, setConfig, status, saving, save } = useSiteConfigEditor();

  function updateNav(nav: NavItem[]) {
    setConfig((current) => ({ ...current, nav }));
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Navigation"
        description="Primary nav and footer link list. Use type link for a single item or group for nested Work/Profile menus."
      />
      <SaveBar saving={saving} status={status} onSave={save} />
      <AdminSection title="Nav structure">
        <div className="flex flex-col gap-4">
          {config.nav.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-border/80 bg-card/40 p-4"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                <SelectField
                  label="Type"
                  hint="link = top-level route; group = dropdown."
                  value={item.type}
                  onChange={(value) => {
                    const next = [...config.nav];
                    if (value === 'link') {
                      next[index] = {
                        type: 'link',
                        to: item.type === 'link' ? item.to : '/',
                        label: item.label,
                      };
                    } else {
                      next[index] = {
                        type: 'group',
                        label: item.label,
                        items:
                          item.type === 'group'
                            ? item.items
                            : [{ to: '/', label: 'Item' }],
                      };
                    }
                    updateNav(next);
                  }}
                  options={[
                    { value: 'link', label: 'Link' },
                    { value: 'group', label: 'Group' },
                  ]}
                />
                <Field label="Label" hint="Visible nav label.">
                  <Input
                    value={item.label}
                    onChange={(event) => {
                      const next = [...config.nav];
                      next[index] = { ...item, label: event.target.value };
                      updateNav(next);
                    }}
                  />
                </Field>
                {item.type === 'link' ? (
                  <Field label="Path" hint="Internal path.">
                    <Input
                      value={(item as NavLinkItem).to}
                      onChange={(event) => {
                        const next = [...config.nav];
                        next[index] = {
                          ...(item as NavLinkItem),
                          to: event.target.value,
                        };
                        updateNav(next);
                      }}
                    />
                  </Field>
                ) : null}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    updateNav(config.nav.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </Button>
              </div>
              {item.type === 'group' ? (
                <PairListField<{ to: string; label: string }>
                  label="Group items"
                  hint="Nested links under this group."
                  items={(item as NavGroupItem).items}
                  fields={[
                    { key: 'label', label: 'Label', hint: 'Link label.' },
                    { key: 'to', label: 'Path', hint: 'Internal path.' },
                  ]}
                  createItem={() => ({ to: '/', label: 'New link' })}
                  onChange={(items) => {
                    const next = [...config.nav];
                    next[index] = { ...(item as NavGroupItem), items };
                    updateNav(next);
                  }}
                />
              ) : null}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              updateNav([
                ...config.nav,
                { type: 'link', to: '/', label: 'New link' },
              ])
            }
          >
            Add nav item
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => updateNav(defaultSiteConfig.nav)}
          >
            Reset to defaults
          </Button>
        </div>
      </AdminSection>
      <SaveBar saving={saving} status={status} onSave={save} />
    </div>
  );
}

export function AdminSiteCategoriesPage() {
  const { config, setConfig, status, saving, save } = useSiteConfigEditor();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Categories"
        description="Work categories drive case study URLs, labels, SEO, and grid chrome. Id must match case study category values."
      />
      <SaveBar saving={saving} status={status} onSave={save} />
      <AdminSection title="Categories">
        <PairListField<SiteCategoryConfig>
          label="Categories"
          hint="path should start with / and match public routes (or be resolved by the CMS path catch-all)."
          items={config.categories}
          fields={[
            { key: 'id', label: 'Id', hint: 'Stored on case studies.' },
            { key: 'label', label: 'Label', hint: 'Public display name.' },
            { key: 'path', label: 'Path', hint: 'e.g. /platforms' },
            { key: 'seoTitle', label: 'SEO title', hint: 'Page title.' },
            {
              key: 'seoDescription',
              label: 'SEO description',
              hint: 'Meta description.',
              multiline: true,
            },
            { key: 'gridEyebrow', label: 'Grid eyebrow', hint: 'List eyebrow.' },
            { key: 'gridTitle', label: 'Grid title', hint: 'List title.' },
            {
              key: 'gridDescription',
              label: 'Grid description',
              hint: 'List description.',
              multiline: true,
            },
          ]}
          createItem={() => ({
            id: `category-${Date.now()}`,
            label: 'New category',
            path: '/new-category',
            seoTitle: 'New category',
            seoDescription: '',
            gridEyebrow: 'New category',
            gridTitle: 'Work',
            gridDescription: '',
          })}
          onChange={(categories) =>
            setConfig((current) => ({ ...current, categories }))
          }
        />
      </AdminSection>
      <SaveBar saving={saving} status={status} onSave={save} />
    </div>
  );
}

export function AdminSiteBrandPage() {
  const { config, setConfig, status, saving, save } = useSiteConfigEditor();
  const tokenEntries = Object.entries(config.brand.tokens);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Brand"
        description="Favicon and a safe subset of CSS color tokens. Values apply at runtime on the public site."
      />
      <SaveBar saving={saving} status={status} onSave={save} />
      <AdminSection title="Assets">
        <ImageField
          label="Favicon"
          hint="Uploaded to media library; applied as the document icon."
          value={config.brand.faviconPath}
          onPathChange={(faviconPath) =>
            setConfig((current) => ({
              ...current,
              brand: { ...current.brand, faviconPath },
            }))
          }
          onFile={(file) => {
            void uploadBrandFile('brand', file).then((faviconPath) =>
              setConfig((current) => ({
                ...current,
                brand: { ...current.brand, faviconPath },
              }))
            );
          }}
        />
        <ImageField
          label="Brand logo (optional)"
          hint="Stored for future chrome use."
          value={config.brand.logoPath}
          onPathChange={(logoPath) =>
            setConfig((current) => ({
              ...current,
              brand: { ...current.brand, logoPath },
            }))
          }
          onFile={(file) => {
            void uploadBrandFile('brand', file).then((logoPath) =>
              setConfig((current) => ({
                ...current,
                brand: { ...current.brand, logoPath },
              }))
            );
          }}
        />
      </AdminSection>
      <AdminSection title="CSS tokens">
        <p className="text-sm text-muted-foreground">
          Allowed keys include --primary, --electric-blue, --soft-cyan, --background,
          --foreground, and other theme variables. No urls or expressions.
        </p>
        <PairListField<{ key: string; value: string }>
          label="Tokens"
          hint="CSS custom properties applied to :root."
          items={tokenEntries.map(([key, value]) => ({ key, value }))}
          fields={[
            { key: 'key', label: 'Token', hint: 'e.g. --electric-blue' },
            { key: 'value', label: 'Value', hint: 'e.g. oklch(...) or #hex' },
          ]}
          createItem={() => ({ key: '--electric-blue', value: '' })}
          onChange={(items) =>
            setConfig((current) => ({
              ...current,
              brand: {
                ...current.brand,
                tokens: Object.fromEntries(
                  items
                    .filter((item) => item.key.trim())
                    .map((item) => [item.key.trim(), item.value])
                ),
              },
            }))
          }
        />
      </AdminSection>
      <SaveBar saving={saving} status={status} onSave={save} />
    </div>
  );
}

export function AdminSiteSeoPage() {
  const { config, setConfig, status, saving, save } = useSiteConfigEditor();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="SEO"
        description="Site-wide default description and Open Graph image. Page-level Seo components still override title/description where set."
      />
      <SaveBar saving={saving} status={status} onSave={save} />
      <AdminSection title="Defaults">
        <Field
          label="Default description"
          hint="Used when a page does not pass its own description."
        >
          <Textarea
            rows={4}
            value={config.seo.defaultDescription ?? ''}
            onChange={(event) =>
              setConfig((current) => ({
                ...current,
                seo: {
                  ...current.seo,
                  defaultDescription: event.target.value,
                },
              }))
            }
          />
        </Field>
        <ImageField
          label="Open Graph image"
          hint="Optional social share image."
          value={config.seo.ogImagePath}
          onPathChange={(ogImagePath) =>
            setConfig((current) => ({
              ...current,
              seo: { ...current.seo, ogImagePath },
            }))
          }
          onFile={(file) => {
            void uploadBrandFile('seo', file).then((ogImagePath) =>
              setConfig((current) => ({
                ...current,
                seo: { ...current.seo, ogImagePath },
              }))
            );
          }}
        />
      </AdminSection>
      <SaveBar saving={saving} status={status} onSave={save} />
    </div>
  );
}

export function AdminSiteFlagsPage() {
  const { config, setConfig, status, saving, save } = useSiteConfigEditor();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Flags & terminal"
        description="Feature flags and terminal welcome copy. Command behavior still lives in code."
      />
      <SaveBar saving={saving} status={status} onSave={save} />
      <AdminSection title="Feature flags">
        <SwitchField
          label="Show boot sequence"
          hint="Off: skip the boot animation on first load."
          checked={config.featureFlags.showBoot}
          onChange={(showBoot) =>
            setConfig((current) => ({
              ...current,
              featureFlags: { ...current.featureFlags, showBoot },
            }))
          }
        />
        <SwitchField
          label="Show terminal"
          hint="Off: hide terminal entry points in the navbar."
          checked={config.featureFlags.showTerminal}
          onChange={(showTerminal) =>
            setConfig((current) => ({
              ...current,
              featureFlags: { ...current.featureFlags, showTerminal },
            }))
          }
        />
      </AdminSection>
      <AdminSection title="Terminal welcome">
        <StringListField
          label="Welcome lines"
          hint="Shown when the terminal opens. Help/nav still come from command catalog."
          values={config.terminal.welcomeLines}
          onChange={(welcomeLines) =>
            setConfig((current) => ({
              ...current,
              terminal: { ...current.terminal, welcomeLines },
            }))
          }
        />
      </AdminSection>
      <AdminSection title="What needs a deploy?">
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Studio can change logos, case studies, tech icons, profile, chrome,
            nav labels, categories, brand tokens, SEO defaults, and flags
            without a frontend deploy.
          </li>
          <li>
            A deploy is still required for new page templates, auth/security
            changes, dependency upgrades, and terminal command logic.
          </li>
          <li>
            Schema changes need a migration apply (`db:push` / migration up),
            which is ops—not a Vite rebuild of content.
          </li>
          <li>
            Featured home slots: toggle Featured on each case study in Case
            studies → Basics. Home shows up to four featured, non-incomplete
            studies.
          </li>
        </ul>
      </AdminSection>
      <SaveBar saving={saving} status={status} onSave={save} />
    </div>
  );
}
