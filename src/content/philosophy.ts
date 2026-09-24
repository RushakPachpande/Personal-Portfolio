export type PhilosophyPillar = {
  id: string;
  title: string;
  summary: string;
  detail: string;
};

export const philosophyPillars: PhilosophyPillar[] = [
  {
    id: 'ownership',
    title: 'Ownership',
    summary: 'Carry the outcome past the merge.',
    detail:
      'Architecture, delivery, operations, and follow-through belong together. Unowned systems fail quietly until they fail loudly.',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    summary: 'Writable systems transfer under pressure.',
    detail:
      'Decisions, runbooks, and diagrams reduce tribal knowledge. If only one person can operate it, it is unfinished.',
  },
  {
    id: 'automation',
    title: 'Automation',
    summary: 'Remove recurrence, not judgment.',
    detail:
      'Automate repeatable work when the path is observable and reversible. Escalate exceptions to humans with context.',
  },
  {
    id: 'scalability',
    title: 'Scalability',
    summary: 'Scale the boundaries that matter.',
    detail:
      'Environments, identity, deployments, and ownership models should grow before inventing abstractions nobody can run.',
  },
  {
    id: 'maintainability',
    title: 'Maintainability',
    summary: 'Design for the next operator.',
    detail:
      'CI/CD, clear data models, and environment discipline keep platforms honest after the first release.',
  },
  {
    id: 'simplicity',
    title: 'Simplicity',
    summary: 'Prefer systems you can explain.',
    detail:
      'Complexity is earned by constraints. Operable platforms outperform clever ones that only the author understands.',
  },
  {
    id: 'learning',
    title: 'Continuous Learning',
    summary: 'Stay sharp where it compounds.',
    detail:
      'Deepen cloud, networking, automation, and delivery under real constraints-not every trendy tool.',
  },
  {
    id: 'business-impact',
    title: 'Business Impact',
    summary: 'Engineering exists to move outcomes.',
    detail:
      'Choose approaches that reduce risk, cost, and friction for the organization. Tools are means, not trophies.',
  },
];
