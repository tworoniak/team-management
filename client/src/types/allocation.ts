export interface AllocationRecommendation {
  taskId: string;
  taskTitle: string;
  recommendedMember: string;
  score: number;
  reasons: string[];
}
