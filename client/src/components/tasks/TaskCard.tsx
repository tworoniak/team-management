import type { Task } from '../../types/task';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { priorityTone, statusTone } from '../../lib/utils';

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className='p-5'>
      <div className='mb-4 flex items-start justify-between gap-3'>
        <h3 className='max-w-[75%] text-2xl font-bold tracking-tight'>
          {task.title}
        </h3>
        <Badge tone={priorityTone(task.priority)}>{task.priority}</Badge>
      </div>

      <p className='mb-4 line-clamp-3 text-sm leading-6 text-muted'>
        {task.description}
      </p>

      <div className='mb-4 flex items-center justify-between gap-3'>
        <Badge tone={statusTone(task.status)}>{task.status}</Badge>
        <span className='text-sm text-textSoft'>
          {task.assignedTo ?? 'Unassigned'}
        </span>
      </div>

      <div className='mb-4 flex flex-wrap gap-2'>
        {task.tags.map((tag) => (
          <span
            key={tag}
            className='rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-textSoft'
          >
            {tag}
          </span>
        ))}
      </div>

      <p className='text-sm text-muted'>Due: {task.dueDate}</p>
    </Card>
  );
}
