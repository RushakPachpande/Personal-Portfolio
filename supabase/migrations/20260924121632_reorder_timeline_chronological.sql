-- Oldest-first timeline: education, NextGen role, then 2025 work cards.
update public.timeline_items
set sort_order = case id
  when 'edu-bba' then 0
  when 'edu-mca' then 1
  when 'career-nextgen' then 2
  when 'achieve-navdrishti' then 3
  when 'deploy-m365' then 4
  when 'deploy-azure' then 5
  when 'deploy-n8n' then 6
  else sort_order
end
where id in (
  'edu-bba',
  'edu-mca',
  'career-nextgen',
  'achieve-navdrishti',
  'deploy-m365',
  'deploy-azure',
  'deploy-n8n'
);
