-- Replace em dash (U+2014) and en dash (U+2013) in stored portfolio prose.
-- Keys, paths, and contact_submissions stay unchanged.

update public.site_profile
set
  data = replace(replace(data::text, chr(8212), '-'), chr(8211), '-')::jsonb,
  updated_at = now()
where position(chr(8212) in data::text) > 0
   or position(chr(8211) in data::text) > 0;

update public.site_settings
set
  config = replace(replace(config::text, chr(8212), '-'), chr(8211), '-')::jsonb,
  updated_at = now()
where position(chr(8212) in config::text) > 0
   or position(chr(8211) in config::text) > 0;

update public.case_studies
set
  status = replace(replace(status, chr(8212), '-'), chr(8211), '-'),
  data = replace(replace(data::text, chr(8212), '-'), chr(8211), '-')::jsonb,
  updated_at = now()
where position(chr(8212) in status) > 0
   or position(chr(8211) in status) > 0
   or position(chr(8212) in data::text) > 0
   or position(chr(8211) in data::text) > 0;

update public.technologies
set
  name = replace(replace(name, chr(8212), '-'), chr(8211), '-'),
  description = replace(replace(description, chr(8212), '-'), chr(8211), '-'),
  updated_at = now()
where position(chr(8212) in name) > 0
   or position(chr(8211) in name) > 0
   or position(chr(8212) in description) > 0
   or position(chr(8211) in description) > 0;

update public.timeline_items
set
  data = replace(replace(data::text, chr(8212), '-'), chr(8211), '-')::jsonb,
  updated_at = now()
where position(chr(8212) in data::text) > 0
   or position(chr(8211) in data::text) > 0;

update public.philosophy_pillars
set
  data = replace(replace(data::text, chr(8212), '-'), chr(8211), '-')::jsonb,
  updated_at = now()
where position(chr(8212) in data::text) > 0
   or position(chr(8211) in data::text) > 0;

update public.resume_sections
set
  data = replace(replace(data::text, chr(8212), '-'), chr(8211), '-')::jsonb,
  updated_at = now()
where position(chr(8212) in data::text) > 0
   or position(chr(8211) in data::text) > 0;

update public.terminal_commands
set
  description = replace(replace(description, chr(8212), '-'), chr(8211), '-'),
  data = replace(replace(data::text, chr(8212), '-'), chr(8211), '-')::jsonb,
  updated_at = now()
where position(chr(8212) in description) > 0
   or position(chr(8211) in description) > 0
   or position(chr(8212) in data::text) > 0
   or position(chr(8211) in data::text) > 0;

update public.resume_files
set
  label = replace(replace(label, chr(8212), '-'), chr(8211), '-'),
  updated_at = now()
where position(chr(8212) in label) > 0
   or position(chr(8211) in label) > 0;
