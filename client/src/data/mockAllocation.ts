import type { AllocationRecommendation } from '../types/allocation';

export const mockAllocation: AllocationRecommendation[] = [
  {
    taskId: '1',
    taskTitle: 'Dashboard Redesign',
    recommendedMember: 'Grayson Johnson',
    score: 92,
    reasons: [
      'Excellent PPC skill match',
      'Low workload',
      'Strong analytics score',
    ],
  },
  {
    taskId: '2',
    taskTitle: 'API v3 Migration',
    recommendedMember: 'Sarah Johnson',
    score: 88,
    reasons: ['Strong design fit', 'Full availability', 'Low current workload'],
  },
];
