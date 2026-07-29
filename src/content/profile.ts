export const SITE_VERSION = '1.0.0'

export const profile = {
  name: 'Rushak Pachpande',
  shortName: 'Rushak',
  role: 'Platform Engineer',
  roles: [
    'Platform Engineer',
    'Cloud & Infrastructure Engineer',
    'Automation Engineer',
    'Full Stack Systems Developer',
  ],
  location: 'Pune, Maharashtra, India',
  experienceYears: 2,
  headline: 'Building Systems,\nNot Just Software.',
  description:
    'I design, build, automate and deploy scalable digital platforms that solve real business problems.',
  email: 'rushak.pachpande@example.com',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
    email: 'mailto:rushak.pachpande@example.com',
  },
  currentMission: 'Owning platforms end-to-end — architecture to production.',
  currentStatus: 'Open to platform engineering opportunities',
  about: [
    'Unlike traditional software developers, my strength is owning complete systems.',
    'I architect infrastructure, automate business workflows, manage Microsoft 365 tenants, and deploy production applications.',
    'From Azure and Docker to React, Supabase, VPNs, Linux servers, and n8n automation — I build complete products from idea to production deployment.',
  ],
  overview: {
    experience: 2,
    projects: 8,
    deployments: 20,
    cloudPlatforms: 4,
    automationWorkflows: 12,
  },
  messages: [
    'Ownership',
    'Architecture',
    'Automation',
    'Scalability',
    'Problem Solving',
    'Business Impact',
    'Engineering Thinking',
  ],
} as const

export type Profile = typeof profile
