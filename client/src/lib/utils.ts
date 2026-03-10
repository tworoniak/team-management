import type { TaskPriority, TaskStatus } from '../types/task';

export function priorityTone(priority: TaskPriority) {
  switch (priority) {
    case 'Low':
      return 'low';
    case 'Medium':
      return 'medium';
    case 'High':
      return 'high';
    case 'Critical':
      return 'critical';
    default:
      return 'medium';
  }
}

export function statusTone(status: TaskStatus) {
  switch (status) {
    case 'Backlog':
      return 'backlog';
    case 'In Progress':
      return 'progress';
    case 'Review':
      return 'review';
    case 'Completed':
      return 'completed';
    default:
      return 'backlog';
  }
}
