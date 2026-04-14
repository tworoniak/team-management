import { z } from 'zod';
import { PROJECT_STATUSES, PROJECT_COLORS } from '../../types/project';

const colorValues = PROJECT_COLORS.map((c) => c.value) as [string, ...string[]];

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(80, 'Max 80 characters'),
  description: z.string().max(300, 'Max 300 characters').default(''),
  status: z.enum(PROJECT_STATUSES),
  color: z.enum(colorValues as [string, ...string[]]),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
