import dishaLogo from '@/assets/logos/disha.png';
import levelupLogo from '@/assets/logos/levelup.png';
import ngiLogo from '@/assets/logos/NGI Logo.png';
import navdrishtiLogo from '@/assets/logos/navdrishti.png';
import azureLogo from '@/assets/tech/azure.svg';
import type { TimelineItem } from '@/types/portfolio';

export type { TimelineItem };

export const timeline: TimelineItem[] = [
  {
    id: 'edu-bba',
    type: 'education',
    title: 'Bachelor of Business Administration (Computer Applications)',
    organization: "ASM's CSIT, Pune",
    period: '2019 - 2022',
    description: 'CGPA: 7.58',
  },
  {
    id: 'edu-mca',
    type: 'education',
    title: 'Master of Computer Applications (MCA)',
    organization: "ASM's IBMR, Pune",
    period: '2023 - 2025',
    description: 'CGPA: 7.57',
  },
  {
    id: 'career-nextgen',
    type: 'career',
    title: 'Platform & Technology Professional',
    organization: 'NextGenInnov8, Pune',
    period: 'Apr 2025 - Present',
    description:
      'Technical ownership of production platforms, cloud infrastructure, and internal technology systems-ensuring reliable operations and continuous improvement.',
    highlights: [
      'Primary technical owner - Navdrishti',
      'Azure infrastructure optimization (~50% cost reduction)',
      'Microsoft 365 migration for 50+ users',
      'Self-hosted Supabase and n8n infrastructure',
      'CI/CD for multi-environment deployments',
    ],
    showOnHome: true,
    homeTitle: 'NextGenInnov8',
    homeDetail: 'Platform & Technology Professional · Apr 2025 - Present',
    logoPath: ngiLogo,
    logoAlt: 'NextGenInnov8 logo',
  },
  {
    id: 'achieve-navdrishti',
    type: 'achievement',
    title: 'Primary Technical Owner - Navdrishti',
    organization: 'NextGenInnov8',
    period: 'Achievement',
    description:
      'End-to-end ownership of a role-based student placement management platform through architecture, development, CI/CD, and multi-environment deployment.',
    showOnHome: true,
    homeDetail: 'End-to-end platform ownership through rollout',
    logoPath: navdrishtiLogo,
    logoAlt: 'Navdrishti logo',
  },
  {
    id: 'deploy-m365',
    type: 'deployment',
    title: 'Microsoft 365 Tenant Migration',
    organization: 'Enterprise operations',
    period: 'Major deployment',
    description:
      'Led technical planning and coordination for an organization-wide Microsoft 365 tenant migration involving 50+ users.',
  },
  {
    id: 'deploy-azure',
    type: 'deployment',
    title: 'Azure Infrastructure Optimization',
    organization: 'Cloud platform',
    period: 'Major deployment',
    description:
      'Managed Azure infrastructure hosting production applications and reduced infrastructure costs by nearly 50%.',
    showOnHome: true,
    homeTitle: 'Azure cost optimization',
    homeDetail: 'Nearly 50% infrastructure cost reduction',
    logoPath: azureLogo,
    logoAlt: 'Microsoft Azure logo',
  },
  {
    id: 'deploy-n8n',
    type: 'deployment',
    title: 'Self-hosted n8n Production Platform',
    organization: 'Internal platforms',
    period: 'Major deployment',
    description:
      'Introduced and operated the organization’s first n8n automation platform, migrating the production architecture from SQLite to PostgreSQL.',
  },
  {
    id: 'achieve-disha',
    type: 'achievement',
    title: 'DISHA',
    organization: 'ASM',
    period: '2025 - Present',
    description:
      'Multi-college PGDM induction platform: QR geofenced attendance, timed quizzes, assessments, and live leaderboards.',
    logoPath: dishaLogo,
    logoAlt: 'DISHA / ASM logo',
  },
  {
    id: 'achieve-levelup',
    type: 'achievement',
    title: 'LevelUP',
    organization: 'Zapienz',
    period: '2025 - Present',
    description:
      'Intelligent school assessment platform with timed multi-subject quizzes, AI-assisted grading, and hardened session security.',
    logoPath: levelupLogo,
    logoAlt: 'Zapienz LevelUP logo',
  },
];
