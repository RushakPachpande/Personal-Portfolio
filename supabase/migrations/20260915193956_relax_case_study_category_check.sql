-- Allow Studio-defined case study categories beyond the original three.
alter table public.case_studies
  drop constraint if exists case_studies_category_check;
