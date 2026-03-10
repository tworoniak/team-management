import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(5, 'Description is required'),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  status: z.enum(['Backlog', 'In Progress', 'Review', 'Completed']),
  assignedTo: z.string().min(1, 'Assignee is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  tags: z.string().optional(),
  requiredSkills: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
