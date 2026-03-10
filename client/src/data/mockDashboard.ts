import type { PriorityDatum, StatusDatum } from '../types/dashboard';

export const statusData: StatusDatum[] = [
  { name: 'Backlog', value: 2 },
  { name: 'In Progress', value: 2 },
  { name: 'Review', value: 1 },
  { name: 'Completed', value: 2 },
];

export const priorityData: PriorityDatum[] = [
  { name: 'Low', value: 1 },
  { name: 'Medium', value: 2 },
  { name: 'High', value: 2 },
  { name: 'Critical', value: 1 },
];

export const recentActivity = [
  {
    id: '1',
    title: 'LinkedIn Ad Campaign Optimization',
    description:
      'Review and optimize current LinkedIn ad campaigns to improve CTR and reduce CPC.',
    priority: 'High',
    status: 'Backlog',
  },
  {
    id: '2',
    title: 'Landing Page Design for Summer Sale',
    description:
      'Design a visually appealing and high-converting landing page for the upcoming sale.',
    priority: 'Critical',
    status: 'Backlog',
  },
  {
    id: '3',
    title: 'Brand Identity Refresh',
    description:
      'Update brand guidelines and create new visual assets for marketing materials.',
    priority: 'Low',
    status: 'In Progress',
  },
  {
    id: '4',
    title: 'SEO Audit and Optimization',
    description:
      'Complete technical SEO audit of company website and implement recommendations.',
    priority: 'Medium',
    status: 'Review',
  },
];
