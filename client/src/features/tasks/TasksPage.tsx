import { useMemo, useState } from 'react';
import TaskCard from '../../components/tasks/TaskCard';
import Button from '../../components/ui/Button';
import { mockTasks } from '../../data/mockTasks';
import CreateTaskModal from './CreateTaskModal';
import type { Task, TaskStatus } from '../../types/task';
import type { TaskFormValues } from './taskSchema';

const filterTabs: { label: string; value: 'All' | TaskStatus }[] = [
  { label: 'All Tasks', value: 'All' },
  { label: 'Backlog', value: 'Backlog' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Review', value: 'Review' },
  { label: 'Completed', value: 'Completed' },
];

function mapFormValuesToTask(values: TaskFormValues): Task {
  const parsedTags =
    values.tags
      ?.split(',')
      .map((tag) => tag.trim())
      .filter(Boolean) ?? [];

  return {
    id: crypto.randomUUID(),
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
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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

  const handleCreateTask = (values: TaskFormValues) => {
    const newTask = mapFormValuesToTask(values);
    setTasks((prev) => [newTask, ...prev]);
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

        <Button onClick={() => setIsCreateOpen(true)}>+ Create Task</Button>
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
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </section>
  );
}
