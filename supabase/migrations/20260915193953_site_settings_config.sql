-- Site-wide CMS configuration (chrome, nav, categories, brand, SEO, flags).
alter table public.site_settings
  add column if not exists config jsonb not null default '{}'::jsonb;

comment on column public.site_settings.config is
  'Studio-managed site configuration: chrome, engineering areas, stats, nav, categories, brand, seo, feature flags, terminal copy.';
