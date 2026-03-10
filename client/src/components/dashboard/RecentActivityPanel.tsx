import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { priorityTone, statusTone } from '../../lib/utils';
import { useTaskStore } from '../../stores/taskStore';

export default function RecentActivityPanel() {
  const tasks = useTaskStore((state) => state.tasks);

  const recentTasks = [...tasks].slice(0, 6);

  return (
    <Card className='h-full p-5'>
      <div className='mb-5'>
        <h2 className='text-2xl font-bold tracking-tight text-white'>
          Recent Activity
        </h2>
      </div>

      <div className='space-y-3'>
        {recentTasks.map((item) => (
          <div
            key={item.id}
            className='rounded-xl border border-white/10 bg-white/3 p-4'
          >
            <div className='mb-2 flex flex-wrap items-start justify-between gap-3'>
              <h3 className='text-lg font-semibold text-white'>{item.title}</h3>
              <div className='flex items-center gap-2'>
                <Badge tone={priorityTone(item.priority)}>
                  {item.priority}
                </Badge>
                <Badge tone={statusTone(item.status)}>{item.status}</Badge>
              </div>
            </div>

            <p className='text-sm leading-6 text-slate-400'>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
