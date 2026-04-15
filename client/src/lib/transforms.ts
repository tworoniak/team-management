import type { TeamMember, SkillKey } from '../types/team';
import { SKILL_KEYS } from '../types/team';
import type { TaskFormValues } from '../features/tasks/taskSchema';
import type { TeamFormValues } from '../features/team/teamSchema';
import type { TaskCreatePayload } from '../hooks/useTasks';
import type { MemberCreatePayload } from '../hooks/useTeam';

export function mapFormValuesToTaskPayload(values: TaskFormValues): TaskCreatePayload {
  return {
    title: values.title,
    description: values.description,
    priority: values.priority,
    status: values.status,
    assignedTo: values.assignedTo,
    dueDate: values.dueDate,
    tags: values.tags?.split(',').map((t) => t.trim()).filter(Boolean) ?? [],
    requiredSkills:
      values.requiredSkills
        ?.split(',')
        .map((s) => s.trim())
        .filter((s): s is SkillKey => (SKILL_KEYS as readonly string[]).includes(s)) ?? [],
    projectId: values.projectId || undefined,
  };
}

export function mapFormValuesToMemberPayload(
  values: TeamFormValues,
  existingMember?: TeamMember | null,
): MemberCreatePayload {
  return {
    fullName: values.fullName,
    email: values.email,
    role: values.role,
    availability: values.availability,
    currentWorkload: values.currentWorkload,
    skills: {
      contentCreation: values.skills.contentCreation,
      socialMedia: values.skills.socialMedia,
      seo: values.skills.seo,
      ppcAdvertising: values.skills.ppcAdvertising,
      design: values.skills.design,
      copywriting: values.skills.copywriting,
      analytics: values.skills.analytics,
      strategy: values.skills.strategy,
      react: existingMember?.skills.react ?? 0,
      typescript: existingMember?.skills.typescript ?? 0,
      css: existingMember?.skills.css ?? 0,
      nodejs: existingMember?.skills.nodejs ?? 0,
      postgres: existingMember?.skills.postgres ?? 0,
      jest: existingMember?.skills.jest ?? 0,
    },
  };
}
