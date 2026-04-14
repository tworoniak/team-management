import { useState } from 'react';
import { FolderKanban, Plus, Pencil, Trash2, CheckSquare, Clock } from 'lucide-react';
import { toast } from 'sonner';

import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../../hooks/useProjects';
import { useTasks } from '../../hooks/useTasks';
import Spinner from '../../components/ui/Spinner';
import type { Project, ProjectColorValue } from '../../types/project';
import { PROJECT_COLORS } from '../../types/project';
import type { ProjectFormValues } from './projectSchema';
import CreateProjectModal from './CreateProjectModal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { cn } from '../../lib/utils';

function colorBg(color: ProjectColorValue): string {
  return PROJECT_COLORS.find((c) => c.value === color)?.bg ?? 'bg-indigo-500';
}

function statusTone(status: Project['status']): 'completed' | 'progress' | 'review' {
  switch (status) {
    case 'Active':
      return 'progress';
    case 'On Hold':
      return 'review';
    case 'Completed':
      return 'completed';
  }
}

function ProjectCard({
  project,
  taskCount,
  completedCount,
  onEdit,
  onDelete,
}: {
  project: Project;
  taskCount: number;
  completedCount: number;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}) {
  const accent = colorBg(project.color);

  return (
    <Card className='flex flex-col p-0 overflow-hidden'>
      <div className={cn('h-1.5 w-full', accent)} />
      <div className='flex flex-col flex-1 p-5 gap-4'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', accent, 'bg-opacity-20')}>
              <FolderKanban className='w-4 h-4 text-white' />
            </div>
            <h3 className='text-lg font-bold text-white leading-tight'>{project.name}</h3>
          </div>
          <Badge tone={statusTone(project.status)}>{project.status}</Badge>
        </div>

        {project.description ? (
          <p className='text-sm text-slate-400 line-clamp-2'>{project.description}</p>
        ) : (
          <p className='text-sm text-slate-600 italic'>No description</p>
        )}

        <div className='flex items-center gap-4 text-sm text-slate-400'>
          <span className='flex items-center gap-1.5'>
            <CheckSquare className='w-3.5 h-3.5' />
            {completedCount}/{taskCount} tasks
          </span>
          <span className='flex items-center gap-1.5'>
            <Clock className='w-3.5 h-3.5' />
            {project.createdAt}
          </span>
        </div>

        {taskCount > 0 && (
          <div className='w-full h-1.5 rounded-full bg-white/5 overflow-hidden'>
            <div
              className={cn('h-full rounded-full transition-all', accent)}
              style={{ width: `${Math.round((completedCount / taskCount) * 100)}%` }}
            />
          </div>
        )}

        <div className='mt-auto flex gap-2'>
          <Button
            type='button'
            variant='ghost'
            className='flex-1'
            onClick={() => onEdit(project)}
          >
            <Pencil className='mr-2 h-4 w-4' />
            Edit
          </Button>
          <Button
            type='button'
            variant='ghost'
            className='flex-1'
            onClick={() => onDelete(project)}
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function ProjectsPage() {
  const { data: projects = [], isLoading, isError } = useProjects();
  const { data: tasks = [] } = useTasks();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const handleCreate = (values: ProjectFormValues) => {
    createProject.mutate(values, {
      onSuccess: () => toast.success(`Project "${values.name}" created`),
      onError: () => toast.error('Failed to create project'),
    });
  };

  const handleEdit = (values: ProjectFormValues) => {
    if (!editTarget) return;
    updateProject.mutate(
      { id: editTarget.id, ...values },
      {
        onSuccess: () => {
          toast.success(`Project "${values.name}" updated`);
          setEditTarget(null);
        },
        onError: () => toast.error('Failed to update project'),
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteProject.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(`Project "${deleteTarget.name}" deleted`);
        setDeleteTarget(null);
      },
      onError: () => toast.error('Failed to delete project'),
    });
  };

  const openEdit = (project: Project) => {
    setEditTarget(project);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditTarget(null);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-24'>
        <Spinner className='h-8 w-8' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex items-center justify-center py-24'>
        <p className='text-slate-400'>Failed to load projects. Is the server running?</p>
      </div>
    );
  }

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <h1 className='text-5xl font-bold tracking-tight text-white'>Projects</h1>
          <p className='mt-3 text-lg text-slate-400'>
            Organise your work into projects and track progress at a glance.
          </p>
        </div>
        <Button
          type='button'
          className='shrink-0 flex items-center gap-2'
          onClick={() => setModalOpen(true)}
        >
          <Plus className='w-4 h-4' />
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className='py-16 text-center'>
          <FolderKanban className='mx-auto mb-4 h-10 w-10 text-slate-600' />
          <h2 className='text-2xl font-bold text-white'>No projects yet</h2>
          <p className='mt-2 text-slate-400'>
            Create your first project to start organising tasks.
          </p>
          <Button
            type='button'
            className='mx-auto mt-6 flex items-center gap-2'
            onClick={() => setModalOpen(true)}
          >
            <Plus className='w-4 h-4' />
            New Project
          </Button>
        </Card>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project) => {
            const projectTasks = tasks.filter((t) => t.projectId === project.id);
            const completedCount = projectTasks.filter(
              (t) => t.status === 'Completed',
            ).length;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                taskCount={projectTasks.length}
                completedCount={completedCount}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
              />
            );
          })}
        </div>
      )}

      <CreateProjectModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmit={editTarget ? handleEdit : handleCreate}
        mode={editTarget ? 'edit' : 'create'}
        initialProject={editTarget}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title='Delete Project'
        message={`Delete "${deleteTarget?.name}"? This will not delete the tasks inside it.`}
        confirmLabel='Delete'
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </section>
  );
}
