import type { AllocationResult, ScoredMember } from '../types/allocation';
import type { Task } from '../types/task';
import type { SkillKey, TeamMember } from '../types/team';

function getRoleSkillMap(role: TeamMember['role']): SkillKey[] {
  switch (role) {
    case 'Designer':
      return ['design'];
    case 'Content Creator':
      return ['contentCreation', 'copywriting'];
    case 'Marketing Manager':
      return ['strategy', 'analytics'];
    case 'SEO Specialist':
      return ['seo', 'analytics'];
    case 'PPC Specialist':
      return ['ppcAdvertising', 'analytics'];
    case 'Social Media Manager':
      return ['socialMedia', 'contentCreation'];
    default:
      return [];
  }
}

function getPriorityBonus(priority: Task['priority']) {
  switch (priority) {
    case 'Critical':
      return 8;
    case 'High':
      return 5;
    case 'Medium':
      return 2;
    case 'Low':
      return 0;
    default:
      return 0;
  }
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function scoreMemberForTask(task: Task, member: TeamMember): ScoredMember {
  const requiredSkills = task.requiredSkills ?? [];

  const skillValues = requiredSkills.map((skill) => member.skills[skill] ?? 0);
  const avgSkill = requiredSkills.length ? average(skillValues) : 5;
  const skillScore = (avgSkill / 10) * 100;

  const availabilityScore = member.availability;
  const workloadScore = 100 - member.currentWorkload;

  const roleSkills = getRoleSkillMap(member.role);
  const roleOverlap = requiredSkills.filter((skill) =>
    roleSkills.includes(skill),
  ).length;
  const roleScore = requiredSkills.length
    ? (roleOverlap / requiredSkills.length) * 100
    : 50;

  const total =
    skillScore * 0.5 +
    availabilityScore * 0.2 +
    workloadScore * 0.2 +
    roleScore * 0.1 +
    getPriorityBonus(task.priority);

  const reasons: string[] = [];

  if (avgSkill >= 8) reasons.push('Strong skill match');
  else if (avgSkill >= 6) reasons.push('Good skill alignment');

  if (member.availability >= 80) reasons.push('High availability');
  else if (member.availability >= 60) reasons.push('Solid availability');

  if (member.currentWorkload <= 30) reasons.push('Low current workload');
  else if (member.currentWorkload <= 50) reasons.push('Manageable workload');

  if (roleOverlap > 0) reasons.push(`Role fit: ${member.role}`);

  return {
    member,
    score: Math.round(total),
    reasons,
  };
}

export function generateAllocationResults(
  tasks: Task[],
  team: TeamMember[],
): AllocationResult[] {
  const backlogTasks = tasks.filter(
    (task) =>
      task.status === 'Backlog' &&
      (!task.assignedTo || task.assignedTo === 'Unassigned'),
  );

  return backlogTasks.map((task) => {
    const recommendations = team
      .map((member) => scoreMemberForTask(task, member))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return {
      task,
      recommendations,
    };
  });
}
