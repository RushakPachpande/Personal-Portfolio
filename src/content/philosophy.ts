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
    summary: 'Own the outcome, not just the ticket.',
    detail:
      'Platform work means carrying architecture, delivery, operations, and follow-through — not throwing unfinished systems over the wall.',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    summary: 'If it is not written down, it is not finished.',
    detail:
      'Clear runbooks, decisions, and diagrams reduce tribal knowledge and make platforms transferable under pressure.',
  },
  {
    id: 'automation',
    title: 'Automation',
    summary: 'Automate the repeatable; escalate the exceptional.',
    detail:
      'Workflows should remove toil without hiding failures. Good automation is observable, guarded, and reversible.',
  },
  {
    id: 'scalability',
    title: 'Scalability',
    summary: 'Design for growth without premature complexity.',
    detail:
      'Scale the boundaries that matter — environments, identity, deployments, and ownership — before inventing abstractions nobody needs.',
  },
  {
    id: 'simplicity',
    title: 'Simplicity',
    summary: 'Prefer the system you can explain.',
    detail:
      'Elegant platforms are operable. Complexity is earned by constraints, not by fashion.',
  },
  {
    id: 'business-first',
    title: 'Business-first thinking',
    summary: 'Engineering exists to move real outcomes.',
    detail:
      'Infrastructure and automation earn their place by reducing risk, cost, and friction for the business — not by collecting tools.',
  },
  {
    id: 'learning',
    title: 'Continuous learning',
    summary: 'Stay sharp without chasing every trend.',
    detail:
      'Learn deeply in the domains that compound: cloud, networking, automation, and product delivery under real constraints.',
  },
]
