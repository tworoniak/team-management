import { Pencil, Trash2, AlertTriangle } from 'lucide-react';
import type { Task } from '../../types/task';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { priorityTone, statusTone, cn } from '../../lib/utils';

type TaskCardProps = {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

const today = new Date().toISOString().split('T')[0];

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const isOverdue =
    task.status !== 'Completed' && !!task.dueDate && task.dueDate < today;

  return (
    <Card className={cn('flex flex-col p-5', isOverdue && 'border-red-500/40')}>
      <div className='mb-4 flex items-start justify-between gap-3'>
        <h3 className='max-w-[70%] text-xl font-bold text-white'>
          {task.title}
        </h3>

        <div className='flex flex-col items-end gap-1.5'>
          <Badge tone={priorityTone(task.priority)}>{task.priority}</Badge>
          {isOverdue && (
            <Badge tone='critical'>
              <AlertTriangle className='mr-1 h-3 w-3' />
              Overdue
            </Badge>
          )}
        </div>
      </div>

      <p className='mb-4 line-clamp-3 text-sm text-slate-400'>
        {task.description}
      </p>

      <div className='mb-4 flex items-center justify-between gap-3'>
        <Badge tone={statusTone(task.status)}>{task.status}</Badge>

        <span className='text-sm text-slate-300'>
          {task.assignedTo ?? 'Unassigned'}
        </span>
      </div>

      {task.tags.length > 0 ? (
        <div className='mb-4 flex flex-wrap gap-2'>
          {task.tags.map((tag) => (
            <span
              key={tag}
              className='rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300'
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className={cn('mb-4 text-sm', isOverdue ? 'text-red-400' : 'text-slate-400')}>
        Due: {task.dueDate}
      </div>

      <div className='mt-auto flex gap-2'>
        <Button
          type='button'
          variant='ghost'
          className='flex-1'
          onClick={() => onEdit?.(task)}
        >
          <Pencil className='mr-2 h-4 w-4' />
          Edit
        </Button>

        <Button
          type='button'
          variant='ghost'
          className='flex-1'
          onClick={() => onDelete?.(task)}
        >
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
        </Button>
      </div>
    </Card>
  );
}
