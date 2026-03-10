export type TeamRole =
  | 'Designer'
  | 'Content Creator'
  | 'Marketing Manager'
  | 'SEO Specialist'
  | 'PPC Specialist'
  | 'Social Media Manager';

export interface Skills {
  contentCreation: number;
  socialMedia: number;
  seo: number;
  ppcAdvertising: number;
  design: number;
  copywriting: number;
  analytics: number;
  strategy: number;
}

export interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  role: TeamRole;
  availability: number;
  currentWorkload: number;
  skills: Skills;
}

export type SkillKey = keyof Skills;
