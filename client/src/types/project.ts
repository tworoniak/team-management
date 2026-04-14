export const PROJECT_STATUSES = ['Active', 'On Hold', 'Completed'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_COLORS = [
  { label: 'Indigo', value: 'indigo', bg: 'bg-indigo-500', ring: 'ring-indigo-500' },
  { label: 'Violet', value: 'violet', bg: 'bg-violet-500', ring: 'ring-violet-500' },
  { label: 'Blue', value: 'blue', bg: 'bg-blue-500', ring: 'ring-blue-500' },
  { label: 'Cyan', value: 'cyan', bg: 'bg-cyan-500', ring: 'ring-cyan-500' },
  { label: 'Emerald', value: 'emerald', bg: 'bg-emerald-500', ring: 'ring-emerald-500' },
  { label: 'Amber', value: 'amber', bg: 'bg-amber-500', ring: 'ring-amber-500' },
  { label: 'Rose', value: 'rose', bg: 'bg-rose-500', ring: 'ring-rose-500' },
  { label: 'Slate', value: 'slate', bg: 'bg-slate-500', ring: 'ring-slate-500' },
] as const;

export type ProjectColorValue = (typeof PROJECT_COLORS)[number]['value'];

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  color: ProjectColorValue;
  createdAt: string;
}
