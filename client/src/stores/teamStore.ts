import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTeam } from '../data/mockTeam';
import type { TeamMember } from '../types/team';

type TeamStore = {
  team: TeamMember[];
  setTeam: (team: TeamMember[]) => void;
  addMember: (member: TeamMember) => void;
  updateMember: (updatedMember: TeamMember) => void;
  deleteMember: (memberId: string) => void;
};

export const useTeamStore = create<TeamStore>()(
  persist(
    (set) => ({
      team: mockTeam,

      setTeam: (team) => set({ team }),

      addMember: (member) =>
        set((state) => ({
          team: [member, ...state.team],
        })),

      updateMember: (updatedMember) =>
        set((state) => ({
          team: state.team.map((member) =>
            member.id === updatedMember.id ? updatedMember : member,
          ),
        })),

      deleteMember: (memberId) =>
        set((state) => ({
          team: state.team.filter((member) => member.id !== memberId),
        })),
    }),
    { name: 'taskflow-team' },
  ),
);
