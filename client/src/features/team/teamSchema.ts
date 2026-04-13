import { z } from 'zod';
import { TEAM_ROLES } from '../../types/team';

export const teamRoleValues = TEAM_ROLES;

export const teamSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  role: z.enum(TEAM_ROLES),
  availability: z.number().min(0).max(100),
  currentWorkload: z.number().min(0).max(100),
  skills: z.object({
    contentCreation: z.number().min(0).max(10),
    socialMedia: z.number().min(0).max(10),
    seo: z.number().min(0).max(10),
    ppcAdvertising: z.number().min(0).max(10),
    design: z.number().min(0).max(10),
    copywriting: z.number().min(0).max(10),
    analytics: z.number().min(0).max(10),
    strategy: z.number().min(0).max(10),
  }),
});

export type TeamFormValues = z.infer<typeof teamSchema>;
