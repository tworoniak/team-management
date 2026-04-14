import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { TeamMember } from '../types/team';

export type MemberCreatePayload = Omit<TeamMember, 'id'>;
export type MemberUpdatePayload = Pick<TeamMember, 'id'> & Partial<Omit<TeamMember, 'id'>>;

export function useTeam() {
  return useQuery<TeamMember[]>({
    queryKey: ['team'],
    queryFn: async () => {
      const { data } = await api.get<TeamMember[]>('/team');
      return data;
    },
    staleTime: 30_000,
  });
}

export function useCreateMember() {
  const qc = useQueryClient();
  return useMutation<TeamMember, Error, MemberCreatePayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<TeamMember>('/team', payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['team'] }),
  });
}

export function useUpdateMember() {
  const qc = useQueryClient();
  return useMutation<TeamMember, Error, MemberUpdatePayload>({
    mutationFn: async ({ id, ...payload }) => {
      const { data } = await api.patch<TeamMember>(`/team/${id}`, payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['team'] }),
  });
}

export function useDeleteMember() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.delete(`/team/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['team'] }),
  });
}
