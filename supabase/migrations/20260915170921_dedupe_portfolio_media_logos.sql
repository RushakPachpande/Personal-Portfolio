-- Dedupe portfolio-media logo *references* onto stable paths.
-- Canonical: logos/{slug}.{ext}, tech/{id}.{ext}
-- Renames the chosen storage.objects row when the canonical key is free.
-- Orphan file removal is handled by scripts/dedupe-portfolio-media.ts
-- (Storage API) because direct DELETE on storage.objects is forbidden.

create or replace function public._storage_ext(object_name text)
returns text
language sql
immutable
as $$
  select coalesce(
    nullif(lower(substring(object_name from '\.[a-z0-9]+$')), ''),
    '.png'
  );
$$;

create or replace function public._media_basename(path text)
returns text
language sql
immutable
as $$
  select nullif(
    regexp_replace(
      regexp_replace(
        coalesce(path, ''),
        '^https?://[^/]+/storage/v1/object/public/portfolio-media/',
        ''
      ),
      '[?#].*$',
      ''
    ),
    ''
  );
$$;

update public.technologies
set logo_path = public._media_basename(logo_path)
where logo_path is not null
  and logo_path is distinct from public._media_basename(logo_path);

update public.case_studies
set data = jsonb_set(
  data,
  '{logo}',
  to_jsonb(public._media_basename(data->>'logo')),
  true
)
where coalesce(data->>'logo', '') <> ''
  and public._media_basename(data->>'logo') is distinct from (data->>'logo');

do $$
declare
  r record;
  canonical text;
  canonical_exists boolean;
begin
  for r in
    select
      t.id,
      (
        select o.id
        from storage.objects o
        where o.bucket_id = 'portfolio-media'
          and (
            o.name = t.logo_path
            or o.name ~ ('^tech/' || t.id || '\.[a-z0-9]+$')
          )
        order by
          case when o.name ~ ('^tech/' || t.id || '\.[a-z0-9]+$') then 0 else 1 end,
          o.updated_at desc nulls last,
          o.created_at desc nulls last
        limit 1
      ) as object_id,
      (
        select o.name
        from storage.objects o
        where o.bucket_id = 'portfolio-media'
          and (
            o.name = t.logo_path
            or o.name ~ ('^tech/' || t.id || '\.[a-z0-9]+$')
          )
        order by
          case when o.name ~ ('^tech/' || t.id || '\.[a-z0-9]+$') then 0 else 1 end,
          o.updated_at desc nulls last,
          o.created_at desc nulls last
        limit 1
      ) as source_name
    from public.technologies t
  loop
    if r.object_id is null or r.source_name is null then
      continue;
    end if;

    canonical := 'tech/' || r.id || public._storage_ext(r.source_name);

    select exists (
      select 1
      from storage.objects o
      where o.bucket_id = 'portfolio-media'
        and o.name = canonical
        and o.id <> r.object_id
    )
    into canonical_exists;

    if r.source_name is distinct from canonical and not canonical_exists then
      update storage.objects
      set
        name = canonical,
        updated_at = now()
      where id = r.object_id;
    end if;

    update public.technologies
    set logo_path = case
      when canonical_exists then canonical
      else coalesce(
        (
          select o.name
          from storage.objects o
          where o.bucket_id = 'portfolio-media'
            and o.name ~ ('^tech/' || r.id || '\.[a-z0-9]+$')
          order by o.updated_at desc nulls last
          limit 1
        ),
        canonical
      )
    end
    where id = r.id;
  end loop;
end $$;

do $$
declare
  r record;
  canonical text;
  canonical_exists boolean;
  chosen_name text;
begin
  for r in
    select
      cs.slug,
      (
        select o.id
        from storage.objects o
        where o.bucket_id = 'portfolio-media'
          and (
            o.name = public._media_basename(cs.data->>'logo')
            or o.name ~ ('^logos/' || cs.slug || '\.[a-z0-9]+$')
            or o.name ~ ('^uploads/' || cs.slug || '/logo-')
          )
        order by
          case
            when o.name ~ ('^logos/' || cs.slug || '\.[a-z0-9]+$') then 0
            when o.name = public._media_basename(cs.data->>'logo') then 1
            else 2
          end,
          o.updated_at desc nulls last,
          o.created_at desc nulls last
        limit 1
      ) as object_id,
      (
        select o.name
        from storage.objects o
        where o.bucket_id = 'portfolio-media'
          and (
            o.name = public._media_basename(cs.data->>'logo')
            or o.name ~ ('^logos/' || cs.slug || '\.[a-z0-9]+$')
            or o.name ~ ('^uploads/' || cs.slug || '/logo-')
          )
        order by
          case
            when o.name ~ ('^logos/' || cs.slug || '\.[a-z0-9]+$') then 0
            when o.name = public._media_basename(cs.data->>'logo') then 1
            else 2
          end,
          o.updated_at desc nulls last,
          o.created_at desc nulls last
        limit 1
      ) as source_name
    from public.case_studies cs
    where coalesce(cs.data->>'logo', '') <> ''
  loop
    if r.object_id is null or r.source_name is null then
      continue;
    end if;

    canonical := 'logos/' || r.slug || public._storage_ext(r.source_name);

    select exists (
      select 1
      from storage.objects o
      where o.bucket_id = 'portfolio-media'
        and o.name = canonical
        and o.id <> r.object_id
    )
    into canonical_exists;

    if r.source_name is distinct from canonical and not canonical_exists then
      update storage.objects
      set
        name = canonical,
        updated_at = now()
      where id = r.object_id;
      chosen_name := canonical;
    elsif canonical_exists then
      chosen_name := canonical;
    else
      chosen_name := r.source_name;
    end if;

    update public.case_studies
    set data = jsonb_set(data, '{logo}', to_jsonb(chosen_name), true)
    where slug = r.slug;
  end loop;
end $$;

drop function if exists public._storage_ext(text);
drop function if exists public._media_basename(text);
