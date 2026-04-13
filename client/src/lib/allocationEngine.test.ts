import { describe, it, expect } from 'vitest';
import { generateAllocationResults } from './allocationEngine';
import type { Task } from '../types/task';
import type { TeamMember } from '../types/team';

const makeTask = (overrides: Partial<Task>): Task => ({
  id: crypto.randomUUID(),
  title: 'Test Task',
  description: '',
  priority: 'Medium',
  status: 'Backlog',
  assignedTo: 'Unassigned',
  dueDate: '2026-01-01',
  tags: [],
  requiredSkills: [],
  createdAt: new Date().toISOString(),
  ...overrides,
});

const makeMember = (overrides: Partial<TeamMember>): TeamMember => ({
  id: crypto.randomUUID(),
  fullName: 'Test User',
  email: 'test@example.com',
  role: 'Designer',
  availability: 100,
  currentWorkload: 0,
  skills: {
    contentCreation: 5, socialMedia: 5, seo: 5, ppcAdvertising: 5,
    design: 5, copywriting: 5, analytics: 5, strategy: 5,
    react: 5, typescript: 5, css: 5, nodejs: 5, postgres: 5, jest: 5,
  },
  ...overrides,
});

describe('generateAllocationResults', () => {
  it('only processes Backlog tasks', () => {
    const tasks = [
      makeTask({ status: 'Backlog' }),
      makeTask({ status: 'In Progress' }),
      makeTask({ status: 'Review' }),
      makeTask({ status: 'Completed' }),
    ];
    const team = [makeMember({})];
    const results = generateAllocationResults(tasks, team);
    expect(results).toHaveLength(1);
    expect(results[0].task.status).toBe('Backlog');
  });

  it('only processes unassigned tasks', () => {
    const tasks = [
      makeTask({ status: 'Backlog', assignedTo: 'Unassigned' }),
      makeTask({ status: 'Backlog', assignedTo: 'Alice' }),
      makeTask({ status: 'Backlog', assignedTo: undefined }),
    ];
    const team = [makeMember({})];
    const results = generateAllocationResults(tasks, team);
    expect(results).toHaveLength(2);
  });

  it('returns empty array when no backlog tasks', () => {
    const tasks = [makeTask({ status: 'Completed' })];
    const team = [makeMember({})];
    expect(generateAllocationResults(tasks, team)).toHaveLength(0);
  });

  it('returns empty recommendations when team is empty', () => {
    const tasks = [makeTask({ status: 'Backlog' })];
    const results = generateAllocationResults(tasks, []);
    expect(results[0].recommendations).toHaveLength(0);
  });

  it('returns at most 3 recommendations per task', () => {
    const tasks = [makeTask({ status: 'Backlog' })];
    const team = [
      makeMember({ id: '1' }), makeMember({ id: '2' }),
      makeMember({ id: '3' }), makeMember({ id: '4' }),
    ];
    const results = generateAllocationResults(tasks, team);
    expect(results[0].recommendations.length).toBeLessThanOrEqual(3);
  });

  it('sorts recommendations by score descending', () => {
    const tasks = [makeTask({ status: 'Backlog', requiredSkills: ['design'] })];
    const team = [
      makeMember({ id: 'low', role: 'Designer', skills: { ...makeMember({}).skills, design: 2 } }),
      makeMember({ id: 'high', role: 'Designer', skills: { ...makeMember({}).skills, design: 9 } }),
    ];
    const results = generateAllocationResults(tasks, team);
    const scores = results[0].recommendations.map((r) => r.score);
    expect(scores[0]).toBeGreaterThanOrEqual(scores[1]);
  });

  it('gives a role fit reason when role skills match required skills', () => {
    const tasks = [makeTask({ status: 'Backlog', requiredSkills: ['react', 'typescript'] })];
    const team = [makeMember({ role: 'Frontend Developer' })];
    const results = generateAllocationResults(tasks, team);
    const reasons = results[0].recommendations[0].reasons;
    expect(reasons.some((r) => r.startsWith('Role fit'))).toBe(true);
  });

  it('applies priority bonus — Critical tasks score higher than Low for same member', () => {
    const team = [makeMember({})];
    const criticalTask = makeTask({ status: 'Backlog', priority: 'Critical' });
    const lowTask = makeTask({ status: 'Backlog', priority: 'Low' });
    const criticalScore = generateAllocationResults([criticalTask], team)[0].recommendations[0].score;
    const lowScore = generateAllocationResults([lowTask], team)[0].recommendations[0].score;
    expect(criticalScore).toBeGreaterThan(lowScore);
  });
});
