insert into public.timeline_items (id, sort_order, data)
values
  (
    'achieve-disha',
    7,
    jsonb_build_object(
      'id', 'achieve-disha',
      'type', 'achievement',
      'title', 'DISHA',
      'organization', 'ASM',
      'period', '2025 - Present',
      'description', 'Multi-college PGDM induction platform: QR geofenced attendance, timed quizzes, assessments, and live leaderboards.',
      'logoPath', 'logos/disha.png',
      'logoAlt', 'DISHA / ASM logo'
    )
  ),
  (
    'achieve-levelup',
    8,
    jsonb_build_object(
      'id', 'achieve-levelup',
      'type', 'achievement',
      'title', 'LevelUP',
      'organization', 'Zapienz',
      'period', '2025 - Present',
      'description', 'Intelligent school assessment platform with timed multi-subject quizzes, AI-assisted grading, and hardened session security.',
      'logoPath', 'logos/levelup.png',
      'logoAlt', 'Zapienz LevelUP logo'
    )
  )
on conflict (id) do update
set
  sort_order = excluded.sort_order,
  data = excluded.data,
  updated_at = now();
