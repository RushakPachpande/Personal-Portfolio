create schema if not exists private;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

create table public.site_profile (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id text primary key default 'main',
  site_version text not null,
  updated_at timestamptz not null default now()
);

create table public.case_studies (
  slug text primary key,
  category text not null check (category in ('platform', 'infrastructure', 'automation')),
  featured boolean not null default false,
  status text not null,
  sort_order integer not null default 0,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.technologies (
  id text primary key,
  name text not null,
  category text not null,
  logo_path text not null,
  description text not null,
  used_in_slugs text[] not null default '{}',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table public.timeline_items (
  id text primary key,
  sort_order integer not null default 0,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.philosophy_pillars (
  id text primary key,
  sort_order integer not null default 0,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.resume_sections (
  section text not null,
  item_id text not null,
  sort_order integer not null default 0,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (section, item_id)
);

create table public.terminal_commands (
  command text primary key,
  aliases text[] not null default '{}',
  description text not null,
  sort_order integer not null default 0,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.site_profile enable row level security;
alter table public.site_settings enable row level security;
alter table public.case_studies enable row level security;
alter table public.technologies enable row level security;
alter table public.timeline_items enable row level security;
alter table public.philosophy_pillars enable row level security;
alter table public.resume_sections enable row level security;
alter table public.terminal_commands enable row level security;
alter table public.contact_submissions enable row level security;

create policy "Public read site_profile"
  on public.site_profile for select
  to anon, authenticated
  using (true);

create policy "Admin write site_profile"
  on public.site_profile for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "Public read site_settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Admin write site_settings"
  on public.site_settings for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "Public read case_studies"
  on public.case_studies for select
  to anon, authenticated
  using (true);

create policy "Admin write case_studies"
  on public.case_studies for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "Public read technologies"
  on public.technologies for select
  to anon, authenticated
  using (true);

create policy "Admin write technologies"
  on public.technologies for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "Public read timeline_items"
  on public.timeline_items for select
  to anon, authenticated
  using (true);

create policy "Admin write timeline_items"
  on public.timeline_items for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "Public read philosophy_pillars"
  on public.philosophy_pillars for select
  to anon, authenticated
  using (true);

create policy "Admin write philosophy_pillars"
  on public.philosophy_pillars for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "Public read resume_sections"
  on public.resume_sections for select
  to anon, authenticated
  using (true);

create policy "Admin write resume_sections"
  on public.resume_sections for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "Public read terminal_commands"
  on public.terminal_commands for select
  to anon, authenticated
  using (true);

create policy "Admin write terminal_commands"
  on public.terminal_commands for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "Anyone can submit contact"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

create policy "Admin read contact submissions"
  on public.contact_submissions for select
  to authenticated
  using (private.is_admin());

create policy "Admin delete contact submissions"
  on public.contact_submissions for delete
  to authenticated
  using (private.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('portfolio-media', 'portfolio-media', true, 10485760, null),
  ('portfolio-resume', 'portfolio-resume', true, 20971520, array['application/pdf']::text[])
on conflict (id) do nothing;

create policy "Public read portfolio media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('portfolio-media', 'portfolio-resume'));

create policy "Admin insert portfolio media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id in ('portfolio-media', 'portfolio-resume')
    and private.is_admin()
  );

create policy "Admin update portfolio media"
  on storage.objects for update
  to authenticated
  using (
    bucket_id in ('portfolio-media', 'portfolio-resume')
    and private.is_admin()
  )
  with check (
    bucket_id in ('portfolio-media', 'portfolio-resume')
    and private.is_admin()
  );

create policy "Admin delete portfolio media"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id in ('portfolio-media', 'portfolio-resume')
    and private.is_admin()
  );
