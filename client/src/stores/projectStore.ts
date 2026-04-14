import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project } from '../types/project';

type ProjectStore = {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
};

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],

      addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),

      updateProject: (project) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === project.id ? project : p)),
        })),

      deleteProject: (projectId) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== projectId),
        })),
    }),
    { name: 'taskflow-projects' },
  ),
);
