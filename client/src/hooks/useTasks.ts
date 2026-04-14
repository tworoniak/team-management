import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Task } from '../types/task';

export type TaskCreatePayload = Omit<Task, 'id' | 'createdAt'>;
export type TaskUpdatePayload = Pick<Task, 'id'> & Partial<Omit<Task, 'id' | 'createdAt'>>;

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await api.get<Task[]>('/tasks');
      return data;
    },
    staleTime: 30_000,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation<Task, Error, TaskCreatePayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<Task>('/tasks', payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation<Task, Error, TaskUpdatePayload>({
    mutationFn: async ({ id, ...payload }) => {
      const { data } = await api.patch<Task>(`/tasks/${id}`, payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });
}
