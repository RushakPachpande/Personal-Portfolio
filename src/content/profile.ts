export const SITE_VERSION = '1.0.0'

export const profile = {
  name: 'Rushak Pachpande',
  shortName: 'Rushak',
  role: 'Platform Engineer',
  resumeTitle: 'Platform & Solutions Engineer',
  roles: [
    'Platform Engineer',
    'Cloud & Infrastructure Engineer',
    'Automation Engineer',
    'Full Stack Systems Developer',
  ],
  location: 'Pune, Maharashtra, India',
  phone: '+91 8483880482',
  headline: 'Building Systems,\nNot Just Software.',
  description:
    'I design, build, automate and operate digital platforms that solve real business problems.',
  email: 'rushakgp06@gmail.com',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/RushakPachpande',
    linkedin: 'https://www.linkedin.com/in/rushak-pachpande/',
    email: 'mailto:rushakgp06@gmail.com',
  },
  focusAreas: [
    'Platform ownership',
    'Cloud & infrastructure',
    'Workflow automation',
    'Application engineering',
  ],
  about: {
    whoIAm:
      'I am a Platform Engineer specializing in building complete software platforms from concept to production. I work across frontend, backend, cloud, networking, DevOps, automation, Microsoft 365 administration, and infrastructure.',
    howIThink:
      'I focus on understanding complete systems, identifying root causes, and making well-informed engineering decisions through research, analysis, and practical implementation. I evaluate multiple solution approaches before implementing production changes.',
    whatIEnjoy:
      'I enjoy solving business problems through technology—designing, building, and operating production platforms, cloud infrastructure, and enterprise systems.',
    approach:
      'I take end-to-end technical ownership of applications from solution design and development to deployment, automation, and production support. Infrastructure, documentation, and maintainability are part of the product—not afterthoughts.',
  },
  summaryBullets: [
    'End-to-end technical ownership from solution design to deployment, automation, and production support.',
    'Work across application engineering, cloud infrastructure, platform operations, and workflow automation.',
    'Strong focus on complete systems, root-cause analysis, and practical implementation.',
  ],
} as const

export type Profile = typeof profile
