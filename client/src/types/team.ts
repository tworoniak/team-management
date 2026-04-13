export const TEAM_ROLES = [
  'Designer',
  'Frontend Developer',
  'Backend Developer',
  'SEO Specialist',
  'PPC Specialist',
  'Social Media Manager',
] as const;

export type TeamRole = (typeof TEAM_ROLES)[number];

export const SKILL_KEYS = [
  'contentCreation',
  'socialMedia',
  'seo',
  'ppcAdvertising',
  'design',
  'copywriting',
  'analytics',
  'strategy',
  'react',
  'typescript',
  'css',
  'nodejs',
  'postgres',
  'jest',
] as const;

export type SkillKey = (typeof SKILL_KEYS)[number];
export type Skills = Record<SkillKey, number>;

export interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  role: TeamRole;
  availability: number;
  currentWorkload: number;
  skills: Skills;
}
