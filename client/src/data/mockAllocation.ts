import type { AllocationRecommendation } from '../types/allocation';

export const mockAllocation: AllocationRecommendation[] = [
  {
    taskId: '1',
    taskTitle: 'LinkedIn Ad Campaign Optimization',
    recommendedMember: 'Yael Mizrahi',
    score: 92,
    reasons: [
      'Excellent PPC skill match',
      'Low workload',
      'Strong analytics score',
    ],
  },
  {
    taskId: '2',
    taskTitle: 'Landing Page Design for Summer Sale',
    recommendedMember: 'Ariel Amador',
    score: 88,
    reasons: ['Strong design fit', 'Full availability', 'Low current workload'],
  },
];
