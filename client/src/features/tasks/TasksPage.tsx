import { useMemo, useState } from 'react';
import TaskCard from '../../components/tasks/TaskCard';
import Button from '../../components/ui/Button';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { mockTasks } from '../../data/mockTasks';
import type { Task, TaskStatus } from '../../types/task';
import CreateTaskModal from './CreateTaskModal';
import type { TaskFormValues } from './taskSchema';

const filterTabs: { label: string; value: 'All' | TaskStatus }[] = [
  { label: 'All Tasks', value: 'All' },
  { label: 'Backlog', value: 'Backlog' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Review', value: 'Review' },
  { label: 'Completed', value: 'Completed' },
];

function mapFormValuesToTask(
  values: TaskFormValues,
  existingId?: string,
): Task {
  const parsedTags =
    values.tags
      ?.split(',')
      .map((tag) => tag.trim())
      .filter(Boolean) ?? [];

  return {
    id: existingId ?? crypto.randomUUID(),
    title: values.title,
    description: values.description,
    priority: values.priority,
    status: values.status,
    assignedTo: values.assignedTo,
    dueDate: values.dueDate,
    tags: parsedTags,
    requiredSkills: [],
  };
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeFilter, setActiveFilter] = useState<'All' | TaskStatus>('All');

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModalMode, setTaskModalMode] = useState<'create' | 'edit'>(
    'create',
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'All') return tasks;
    return tasks.filter((task) => task.status === activeFilter);
  }, [activeFilter, tasks]);

  const counts = useMemo(() => {
    return {
      all: tasks.length,
      backlog: tasks.filter((task) => task.status === 'Backlog').length,
      inProgress: tasks.filter((task) => task.status === 'In Progress').length,
      review: tasks.filter((task) => task.status === 'Review').length,
      completed: tasks.filter((task) => task.status === 'Completed').length,
    };
  }, [tasks]);

  const tabLabels: Record<(typeof filterTabs)[number]['value'], string> = {
    All: `All Tasks (${counts.all})`,
    Backlog: `Backlog (${counts.backlog})`,
    'In Progress': `In Progress (${counts.inProgress})`,
    Review: `Review (${counts.review})`,
    Completed: `Completed (${counts.completed})`,
  };

  const openCreateModal = () => {
    setTaskModalMode('create');
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setTaskModalMode('edit');
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSubmitTask = (values: TaskFormValues) => {
    if (taskModalMode === 'create') {
      const newTask = mapFormValuesToTask(values);
      setTasks((prev) => [newTask, ...prev]);
      return;
    }

    if (selectedTask) {
      const updatedTask = mapFormValuesToTask(values, selectedTask.id);
      setTasks((prev) =>
        prev.map((task) => (task.id === selectedTask.id ? updatedTask : task)),
      );
    }
  };

  const handleDeleteTask = () => {
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((task) => task.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-4xl font-bold text-white'>Task Management</h1>
          <p className='mt-2 text-slate-400'>
            Organize and track your team’s work.
          </p>
        </div>

        <Button onClick={openCreateModal}>+ Create Task</Button>
      </div>

      <div className='flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/5 p-2'>
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.value;

          return (
            <button
              key={tab.value}
              type='button'
              onClick={() => setActiveFilter(tab.value)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              {tabLabels[tab.value]}
            </button>
          );
        })}
      </div>

      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={openEditModal}
            onDelete={setTaskToDelete}
          />
        ))}
      </div>

      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmitTask={handleSubmitTask}
        mode={taskModalMode}
        initialTask={selectedTask}
      />

      <ConfirmDialog
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDeleteTask}
        title='Delete Task'
        message={
          taskToDelete
            ? `Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`
            : ''
        }
        confirmLabel='Delete Task'
      />
    </section>
  );
}
