import type { Task } from './task';
import type { TeamMember } from './team';

export interface AllocationRecommendation {
  taskId: string;
  taskTitle: string;
  memberId: string;
  recommendedMember: string;
  score: number;
  reasons: string[];
}

export interface ScoredMember {
  member: TeamMember;
  score: number;
  reasons: string[];
}

export interface AllocationResult {
  task: Task;
  recommendations: ScoredMember[];
}
