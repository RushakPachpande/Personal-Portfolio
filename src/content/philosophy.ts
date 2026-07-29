export type PhilosophyPillar = {
  id: string
  title: string
  summary: string
  detail: string
}

export const philosophyPillars: PhilosophyPillar[] = [
  {
    id: 'ownership',
    title: 'Ownership',
    summary: 'Own the outcome end-to-end.',
    detail:
      'Platform work means carrying architecture, delivery, operations, and follow-through—not handing off unfinished systems.',
  },
  {
    id: 'maintainability',
    title: 'Build for maintainability',
    summary: 'Design for the people who will run it next.',
    detail:
      'Clear environments, CI/CD, and durable data models matter as much as shipping the first version.',
  },
  {
    id: 'automation',
    title: 'Automation over repetition',
    summary: 'Automate the repeatable; escalate the exceptional.',
    detail:
      'Workflow platforms and operational automation free people for judgment work—when the automation is observable and reliable.',
  },
  {
    id: 'documentation',
    title: 'Documentation matters',
    summary: 'If it is not written down, it is not finished.',
    detail:
      'Decisions, runbooks, and architecture notes reduce tribal knowledge and make platforms transferable under pressure.',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure is part of software',
    summary: 'Apps do not exist without the platform beneath them.',
    detail:
      'Hosting, identity, networking, backups, and environments are product concerns—not someone else’s leftover work.',
  },
  {
    id: 'business-first',
    title: 'Solve business problems first',
    summary: 'Engineering exists to move real outcomes.',
    detail:
      'Choose tools and architecture that reduce risk, cost, and friction for the organization—not for novelty.',
  },
  {
    id: 'simplicity',
    title: 'Simple systems outperform complicated ones',
    summary: 'Prefer the system you can explain and operate.',
    detail:
      'Complexity should be earned by constraints. Operable platforms beat clever ones that only the author understands.',
  },
]
