import { caseStudies } from '@/content/caseStudies';
import { technologies } from '@/content/technologies';

export type EngineeringStat = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  description: string;
};

const productionSystems = caseStudies.filter((study) =>
  [
    'Production',
    'Completed',
    'Implemented',
    'Ongoing',
    'Final development, validation, and rollout',
  ].includes(study.status)
).length;

const automationWorkflows = caseStudies.filter(
  (study) => study.category === 'automation'
).length;
const infrastructureProjects = caseStudies.filter(
  (study) => study.category === 'infrastructure'
).length;
const platformsDelivered = caseStudies.filter(
  (study) => study.category === 'platform'
).length;
const enterpriseTechnologies = technologies.filter((technology) =>
  ['cloud', 'enterprise', 'infrastructure', 'security'].includes(
    technology.category
  )
).length;
const yearsLearning = new Date().getFullYear() - 2019 + 1;

export const engineeringStats: EngineeringStat[] = [
  {
    id: 'production-systems',
    label: 'Production Systems',
    value: productionSystems,
    description:
      'Platforms and initiatives actively used or delivered for real operations.',
  },
  {
    id: 'automation-workflows',
    label: 'Automation Workflows',
    value: automationWorkflows,
    description:
      'Business automation initiatives implemented across n8n and Microsoft flows.',
  },
  {
    id: 'infrastructure-projects',
    label: 'Infrastructure Projects',
    value: infrastructureProjects,
    description:
      'Cloud, hosting, networking, storage, and remote-access engineering initiatives.',
  },
  {
    id: 'platforms-delivered',
    label: 'Platforms Delivered',
    value: platformsDelivered,
    description:
      'Product platforms built and maintained with end-to-end ownership.',
  },
  {
    id: 'enterprise-technologies',
    label: 'Enterprise Technologies',
    value: enterpriseTechnologies,
    description:
      'Cloud, security, and enterprise systems used in shipped initiatives.',
  },
  {
    id: 'years-learning',
    label: 'Years Learning',
    value: yearsLearning,
    suffix: '+',
    description:
      'Continuous hands-on learning journey from foundational study to production ownership.',
  },
];
