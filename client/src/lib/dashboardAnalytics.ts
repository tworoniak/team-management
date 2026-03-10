import type { Task } from '../types/task';
import type { TeamMember } from '../types/team';

export function getActiveTasks(tasks: Task[]) {
  return tasks.filter(
    (t) => t.status === 'In Progress' || t.status === 'Review',
  ).length;
}

export function getHighPriorityTasks(tasks: Task[]) {
  return tasks.filter((t) => t.priority === 'High' || t.priority === 'Critical')
    .length;
}

export function getAverageWorkload(team: TeamMember[]) {
  if (!team.length) return 0;

  const total = team.reduce((sum, member) => sum + member.currentWorkload, 0);

  return Math.round(total / team.length);
}

export function getStatusDistribution(tasks: Task[]) {
  const map: Record<string, number> = {
    Backlog: 0,
    'In Progress': 0,
    Review: 0,
    Completed: 0,
  };

  tasks.forEach((task) => {
    map[task.status]++;
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getPriorityDistribution(tasks: Task[]) {
  const map: Record<string, number> = {
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  };

  tasks.forEach((task) => {
    map[task.priority]++;
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}
