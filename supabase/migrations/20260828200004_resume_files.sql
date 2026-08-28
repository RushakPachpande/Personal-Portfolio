create table public.resume_files (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  storage_path text not null unique,
  is_active boolean not null default false,
  size_bytes bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index resume_files_single_active
  on public.resume_files (is_active)
  where is_active;

alter table public.resume_files enable row level security;

create policy "Public read resume_files"
  on public.resume_files for select
  to anon, authenticated
  using (true);

create policy "Admin write resume_files"
  on public.resume_files for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create or replace function public.set_active_resume(target uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not private.is_admin() then
    raise exception 'not allowed';
  end if;

  if not exists (select 1 from public.resume_files where id = target) then
    raise exception 'resume not found';
  end if;

  update public.resume_files
    set is_active = false, updated_at = now()
    where is_active;

  update public.resume_files
    set is_active = true, updated_at = now()
    where id = target;
end;
$$;

revoke all on function public.set_active_resume(uuid) from public;
grant execute on function public.set_active_resume(uuid) to authenticated;
