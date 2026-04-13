import type { Task } from '../types/task';
import type { TeamMember, SkillKey } from '../types/team';
import { SKILL_KEYS } from '../types/team';
import type { TaskFormValues } from '../features/tasks/taskSchema';
import type { TeamFormValues } from '../features/team/teamSchema';

export function mapFormValuesToTask(
  values: TaskFormValues,
  existingTask?: Task | null,
): Task {
  const parsedTags =
    values.tags
      ?.split(',')
      .map((t) => t.trim())
      .filter(Boolean) ?? [];

  const parsedSkills =
    values.requiredSkills
      ?.split(',')
      .map((s) => s.trim())
      .filter((s): s is SkillKey =>
        (SKILL_KEYS as readonly string[]).includes(s),
      ) ?? [];

  return {
    id: existingTask?.id ?? crypto.randomUUID(),
    title: values.title,
    description: values.description,
    priority: values.priority,
    status: values.status,
    assignedTo: values.assignedTo,
    dueDate: values.dueDate,
    tags: parsedTags,
    requiredSkills: parsedSkills,
    createdAt: existingTask?.createdAt ?? new Date().toISOString(),
  };
}

export function mapFormValuesToMember(
  values: TeamFormValues,
  existingMember?: TeamMember | null,
): TeamMember {
  return {
    id: existingMember?.id ?? crypto.randomUUID(),
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
      // Tech skills: preserve existing values when editing, default 0 on create
      react: existingMember?.skills.react ?? 0,
      typescript: existingMember?.skills.typescript ?? 0,
      css: existingMember?.skills.css ?? 0,
      nodejs: existingMember?.skills.nodejs ?? 0,
      postgres: existingMember?.skills.postgres ?? 0,
      jest: existingMember?.skills.jest ?? 0,
    },
  };
}
