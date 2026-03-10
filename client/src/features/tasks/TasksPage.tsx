import Button from '../../components/ui/Button';
import TaskCard from '../../components/tasks/TaskCard';
import { mockTasks } from '../../data/mockTasks';

const tabs = [
  'All Tasks (6)',
  'Backlog (2)',
  'In Progress (1)',
  'Review (1)',
  'Completed (2)',
];

export default function TasksPage() {
  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-5xl font-bold tracking-tight'>Task Management</h1>
          <p className='mt-3 text-lg text-muted'>
            Organize, track, and manage your marketing tasks efficiently.
          </p>
        </div>

        <Button>+ Create Task</Button>
      </div>

      <div className='flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2'>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              index === 0
                ? 'bg-gradient-to-r from-primary to-violet text-white'
                : 'text-textSoft hover:bg-white/5 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
        {mockTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
