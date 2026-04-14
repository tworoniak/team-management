import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { toast } from 'sonner';
import { AlertTriangle, GripVertical } from 'lucide-react';

import { useTaskStore } from '../../stores/taskStore';
import type { Task, TaskStatus } from '../../types/task';
import Badge from '../../components/ui/Badge';
import { cn, priorityTone } from '../../lib/utils';

const COLUMNS: { status: TaskStatus; label: string; headerClass: string }[] = [
  {
    status: 'Backlog',
    label: 'Backlog',
    headerClass: 'border-slate-500/40 bg-slate-500/10 text-slate-300',
  },
  {
    status: 'In Progress',
    label: 'In Progress',
    headerClass: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  },
  {
    status: 'Review',
    label: 'Review',
    headerClass: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  },
  {
    status: 'Completed',
    label: 'Completed',
    headerClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  },
];

const today = new Date().toISOString().split('T')[0];

function KanbanCard({
  task,
  overlay = false,
}: {
  task: Task;
  overlay?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const isOverdue =
    task.status !== 'Completed' && !!task.dueDate && task.dueDate < today;

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'rounded-xl border border-white/10 bg-[#0d1630] p-4 shadow-md cursor-grab active:cursor-grabbing select-none',
        isOverdue && 'border-red-500/40',
        isDragging && !overlay && 'opacity-25',
        overlay &&
          'rotate-1 shadow-2xl cursor-grabbing ring-2 ring-indigo-500/50',
      )}
      {...attributes}
      {...listeners}
    >
      <div className='mb-2.5 flex items-start justify-between gap-2'>
        <p className='text-sm font-semibold text-white leading-snug'>
          {task.title}
        </p>
        <GripVertical className='w-4 h-4 text-slate-600 shrink-0 mt-0.5' />
      </div>

      <div className='flex flex-wrap gap-1.5 mb-2.5'>
        <Badge tone={priorityTone(task.priority)}>{task.priority}</Badge>
        {isOverdue && (
          <Badge tone='critical'>
            <AlertTriangle className='mr-1 h-3 w-3' />
            Overdue
          </Badge>
        )}
      </div>

      <p className='text-xs text-slate-500 truncate'>
        {task.assignedTo ?? 'Unassigned'}
      </p>

      {task.dueDate && (
        <p
          className={cn(
            'mt-1 text-xs',
            isOverdue ? 'text-red-400' : 'text-slate-600',
          )}
        >
          Due {task.dueDate}
        </p>
      )}
    </div>
  );
}

function KanbanColumn({
  status,
  label,
  headerClass,
  tasks,
}: {
  status: TaskStatus;
  label: string;
  headerClass: string;
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className='flex min-w-65 flex-1 flex-col'>
      <div
        className={cn(
          'mb-3 flex items-center justify-between rounded-xl border px-4 py-2.5',
          headerClass,
        )}
      >
        <span className='text-sm font-semibold'>{label}</span>
        <span className='rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold text-slate-300'>
          {tasks.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          'flex flex-1 flex-col gap-3 rounded-xl border-2 border-dashed p-3 min-h-50 transition-colors duration-150',
          isOver
            ? 'border-indigo-500/60 bg-indigo-500/5'
            : 'border-white/5 bg-white/2',
        )}
      >
        {tasks.length === 0 ? (
          <p className='mt-6 text-center text-sm text-slate-700'>
            Drop tasks here
          </p>
        ) : (
          tasks.map((task) => <KanbanCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default function KanbanPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === String(event.active.id));
    setActiveTask(task ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const newStatus = String(over.id) as TaskStatus;
    const task = tasks.find((t) => t.id === String(active.id));
    if (!task || task.status === newStatus) return;

    updateTask({ ...task, status: newStatus });
    toast.success(`Moved "${task.title}" to ${newStatus}`);
  };

  const handleDragCancel = () => setActiveTask(null);

  return (
    <section className='space-y-6'>
      <div>
        <h1 className='text-5xl font-bold tracking-tight text-white'>
          Kanban Board
        </h1>
        <p className='mt-3 text-lg text-slate-400'>
          Drag tasks between columns to update their status.
        </p>
      </div>

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className='flex gap-4 overflow-x-auto pb-4'>
          {COLUMNS.map(({ status, label, headerClass }) => (
            <KanbanColumn
              key={status}
              status={status}
              label={label}
              headerClass={headerClass}
              tasks={tasks.filter((t) => t.status === status)}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeTask ? <KanbanCard task={activeTask} overlay /> : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
