export type TimelineItem = {
  id: string
  type: 'education' | 'career' | 'deployment' | 'achievement'
  title: string
  organization: string
  period: string
  description: string
  highlights?: string[]
}

export const timeline: TimelineItem[] = [
  {
    id: 'edu-engineering',
    type: 'education',
    title: 'Engineering Foundation',
    organization: 'Academic Program',
    period: 'Foundation',
    description:
      'Built the systems thinking and technical fundamentals that underpin platform ownership today.',
    highlights: ['Problem decomposition', 'Systems fundamentals', 'Continuous learning habit'],
  },
  {
    id: 'career-start',
    type: 'career',
    title: 'Platform & Systems Engineering',
    organization: 'Professional Practice',
    period: '≈ 2 years',
    description:
      'Owning complete systems across cloud, infrastructure, automation, Microsoft 365, and full-stack delivery.',
    highlights: [
      'End-to-end ownership',
      'Production deployments',
      'Automation platforms',
      'Cloud infrastructure',
    ],
  },
  {
    id: 'deploy-o365',
    type: 'deployment',
    title: 'Office 365 Tenant Migration',
    organization: 'Enterprise Workloads',
    period: 'Major deployment',
    description:
      'Planned and executed tenant migration with continuity, identity alignment, and validation under real usage.',
  },
  {
    id: 'deploy-azure',
    type: 'deployment',
    title: 'Azure Infrastructure Baseline',
    organization: 'Cloud Platform',
    period: 'Major deployment',
    description:
      'Stood up Azure environments with networking, identity, and deployable application homes.',
  },
  {
    id: 'deploy-automation',
    type: 'deployment',
    title: 'IT Ticket Automation Platform',
    organization: 'Internal Platforms',
    period: 'Major deployment',
    description:
      'Built n8n-driven automation that reduced repetitive ticket handling and improved operational consistency.',
  },
  {
    id: 'achieve-ownership',
    type: 'achievement',
    title: 'End-to-End Platform Ownership',
    organization: 'Career Signal',
    period: 'Ongoing',
    description:
      'Recognized for owning systems beyond feature delivery — architecture, automation, deployment, and operations.',
    highlights: ['Business impact', 'Operational clarity', 'Documentation mindset'],
  },
]
