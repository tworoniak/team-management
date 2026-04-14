import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Project } from '../types/project';

export type ProjectCreatePayload = Omit<Project, 'id' | 'createdAt'>;
export type ProjectUpdatePayload = Pick<Project, 'id'> & Partial<Omit<Project, 'id' | 'createdAt'>>;

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get<Project[]>('/projects');
      return data;
    },
    staleTime: 30_000,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation<Project, Error, ProjectCreatePayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<Project>('/projects', payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation<Project, Error, ProjectUpdatePayload>({
    mutationFn: async ({ id, ...payload }) => {
      const { data } = await api.patch<Project>(`/projects/${id}`, payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.delete(`/projects/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}
