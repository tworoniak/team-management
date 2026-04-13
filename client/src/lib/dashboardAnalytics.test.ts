import { describe, it, expect } from 'vitest';
import {
  getActiveTasks,
  getHighPriorityTasks,
  getAverageWorkload,
  getStatusDistribution,
  getPriorityDistribution,
} from './dashboardAnalytics';
import type { Task } from '../types/task';
import type { TeamMember } from '../types/team';

const makeTask = (overrides: Partial<Task>): Task => ({
  id: crypto.randomUUID(),
  title: 'Test Task',
  description: '',
  priority: 'Medium',
  status: 'Backlog',
  dueDate: '2026-01-01',
  tags: [],
  requiredSkills: [],
  createdAt: new Date().toISOString(),
  ...overrides,
});

const makeMember = (workload: number): TeamMember => ({
  id: crypto.randomUUID(),
  fullName: 'Test User',
  email: 'test@example.com',
  role: 'Designer',
  availability: 100,
  currentWorkload: workload,
  skills: {
    contentCreation: 5, socialMedia: 5, seo: 5, ppcAdvertising: 5,
    design: 5, copywriting: 5, analytics: 5, strategy: 5,
    react: 5, typescript: 5, css: 5, nodejs: 5, postgres: 5, jest: 5,
  },
});

describe('getActiveTasks', () => {
  it('counts In Progress and Review tasks', () => {
    const tasks = [
      makeTask({ status: 'In Progress' }),
      makeTask({ status: 'Review' }),
      makeTask({ status: 'Backlog' }),
      makeTask({ status: 'Completed' }),
    ];
    expect(getActiveTasks(tasks)).toBe(2);
  });

  it('returns 0 when no active tasks', () => {
    const tasks = [makeTask({ status: 'Backlog' }), makeTask({ status: 'Completed' })];
    expect(getActiveTasks(tasks)).toBe(0);
  });

  it('returns 0 for empty array', () => {
    expect(getActiveTasks([])).toBe(0);
  });
});

describe('getHighPriorityTasks', () => {
  it('counts High and Critical tasks', () => {
    const tasks = [
      makeTask({ priority: 'High' }),
      makeTask({ priority: 'Critical' }),
      makeTask({ priority: 'Medium' }),
      makeTask({ priority: 'Low' }),
    ];
    expect(getHighPriorityTasks(tasks)).toBe(2);
  });

  it('returns 0 when no high priority tasks', () => {
    const tasks = [makeTask({ priority: 'Low' }), makeTask({ priority: 'Medium' })];
    expect(getHighPriorityTasks(tasks)).toBe(0);
  });
});

describe('getAverageWorkload', () => {
  it('returns average of team workloads', () => {
    const team = [makeMember(20), makeMember(40), makeMember(60)];
    expect(getAverageWorkload(team)).toBe(40);
  });

  it('rounds to nearest integer', () => {
    const team = [makeMember(10), makeMember(20)];
    expect(getAverageWorkload(team)).toBe(15);
  });

  it('returns 0 for empty team', () => {
    expect(getAverageWorkload([])).toBe(0);
  });
});

describe('getStatusDistribution', () => {
  it('counts tasks per status', () => {
    const tasks = [
      makeTask({ status: 'Backlog' }),
      makeTask({ status: 'Backlog' }),
      makeTask({ status: 'In Progress' }),
      makeTask({ status: 'Review' }),
      makeTask({ status: 'Completed' }),
      makeTask({ status: 'Completed' }),
    ];
    const result = getStatusDistribution(tasks);
    expect(result.find((r) => r.name === 'Backlog')?.value).toBe(2);
    expect(result.find((r) => r.name === 'In Progress')?.value).toBe(1);
    expect(result.find((r) => r.name === 'Review')?.value).toBe(1);
    expect(result.find((r) => r.name === 'Completed')?.value).toBe(2);
  });

  it('always returns all 4 statuses even when empty', () => {
    const result = getStatusDistribution([]);
    expect(result).toHaveLength(4);
    result.forEach((r) => expect(r.value).toBe(0));
  });
});

describe('getPriorityDistribution', () => {
  it('counts tasks per priority', () => {
    const tasks = [
      makeTask({ priority: 'Low' }),
      makeTask({ priority: 'Medium' }),
      makeTask({ priority: 'Medium' }),
      makeTask({ priority: 'High' }),
      makeTask({ priority: 'Critical' }),
    ];
    const result = getPriorityDistribution(tasks);
    expect(result.find((r) => r.name === 'Low')?.value).toBe(1);
    expect(result.find((r) => r.name === 'Medium')?.value).toBe(2);
    expect(result.find((r) => r.name === 'High')?.value).toBe(1);
    expect(result.find((r) => r.name === 'Critical')?.value).toBe(1);
  });
});
