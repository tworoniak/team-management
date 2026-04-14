import { z } from 'zod';
import { PROJECT_STATUSES, PROJECT_COLORS, type ProjectColorValue } from '../../types/project';

const colorValues = PROJECT_COLORS.map((c) => c.value) as [ProjectColorValue, ...ProjectColorValue[]];

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(80, 'Max 80 characters'),
  description: z.string().max(300, 'Max 300 characters'),
  status: z.enum(PROJECT_STATUSES),
  color: z.enum(colorValues),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
