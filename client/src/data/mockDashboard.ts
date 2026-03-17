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
    title: 'Dashboard Redesign',
    description: 'Full redesign of the main customer dashboard.',
    priority: 'High',
    status: 'Backlog',
  },
  {
    id: '2',
    title: 'API v3 Migration',
    description: 'Migrate all endpoints to the new v3 API architecture.',
    priority: 'Critical',
    status: 'Backlog',
  },
  {
    id: '3',
    title: 'Mobile App',
    description: 'React Native mobile companion app.',
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
