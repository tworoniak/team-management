import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Search } from 'lucide-react';
import TaskCard from '../../components/tasks/TaskCard';
import Button from '../../components/ui/Button';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import type { Task, TaskStatus } from '../../types/task';
import CreateTaskModal from './CreateTaskModal';
import type { TaskFormValues } from './taskSchema';
import { useTaskStore } from '../../stores/taskStore';
import { mapFormValuesToTask } from '../../lib/transforms';

const filterTabs: { label: string; value: 'All' | TaskStatus }[] = [
  { label: 'All Tasks', value: 'All' },
  { label: 'Backlog', value: 'Backlog' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Review', value: 'Review' },
  { label: 'Completed', value: 'Completed' },
];

export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();

  const [activeFilter, setActiveFilter] = useState<'All' | TaskStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModalMode, setTaskModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    let result =
      activeFilter === 'All'
        ? tasks
        : tasks.filter((t) => t.status === activeFilter);

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.assignedTo?.toLowerCase().includes(q) ?? false) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [activeFilter, searchQuery, tasks]);

  const counts = useMemo(() => {
    return {
      all: tasks.length,
      backlog: tasks.filter((t) => t.status === 'Backlog').length,
      inProgress: tasks.filter((t) => t.status === 'In Progress').length,
      review: tasks.filter((t) => t.status === 'Review').length,
      completed: tasks.filter((t) => t.status === 'Completed').length,
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
      addTask(mapFormValuesToTask(values));
      toast.success('Task created');
      return;
    }

    if (selectedTask) {
      updateTask(mapFormValuesToTask(values, selectedTask));
      toast.success('Task updated');
    }
  };

  const handleDeleteTask = () => {
    if (!taskToDelete) return;
    const title = taskToDelete.title;
    deleteTask(taskToDelete.id);
    setTaskToDelete(null);
    toast.success(`"${title}" deleted`);
  };

  const hasActiveSearch = searchQuery.trim().length > 0;

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-4xl font-bold text-white'>Task Management</h1>
          <p className='mt-2 text-slate-400'>
            Organize and track your team's work.
          </p>
        </div>

        <Button onClick={openCreateModal}>+ Create Task</Button>
      </div>

      {/* Search */}
      <div className='relative'>
        <Search className='absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none' />
        <input
          type='search'
          placeholder='Search by title, assignee, or tag…'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500'
        />
      </div>

      {/* Filter tabs */}
      <div
        role='tablist'
        aria-label='Filter tasks by status'
        className='flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/5 p-2'
      >
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.value;

          return (
            <button
              key={tab.value}
              type='button'
              role='tab'
              aria-selected={isActive}
              aria-controls='task-panel'
              id={`tab-${tab.value}`}
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

      {/* Task grid or empty state */}
      {filteredTasks.length > 0 ? (
        <div
          id='task-panel'
          role='tabpanel'
          aria-labelledby={`tab-${activeFilter}`}
          className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'
        >
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditModal}
              onDelete={(task) => setTaskToDelete(task)}
            />
          ))}
        </div>
      ) : (
        <div
          id='task-panel'
          role='tabpanel'
          aria-labelledby={`tab-${activeFilter}`}
          className='flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/3 py-16 text-center'
        >
          {tasks.length === 0 ? (
            <>
              <p className='text-2xl font-semibold text-slate-300'>No tasks yet</p>
              <p className='mt-2 text-sm text-slate-500'>
                Create your first task to get started.
              </p>
              <Button className='mt-6' onClick={openCreateModal}>
                + Create Task
              </Button>
            </>
          ) : (
            <>
              <p className='text-2xl font-semibold text-slate-300'>No tasks found</p>
              <p className='mt-2 text-sm text-slate-500'>
                {hasActiveSearch
                  ? 'No tasks match your search. Try a different keyword.'
                  : 'No tasks match this filter.'}
              </p>
              {hasActiveSearch && (
                <button
                  type='button'
                  onClick={() => setSearchQuery('')}
                  className='mt-4 text-sm text-blue-400 hover:text-blue-300 transition'
                >
                  Clear search
                </button>
              )}
            </>
          )}
        </div>
      )}

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
