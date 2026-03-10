import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { taskSchema, type TaskFormValues } from './taskSchema';
import type { Task } from '../../types/task';

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTask: (values: TaskFormValues) => void;
  mode: 'create' | 'edit';
  initialTask?: Task | null;
};

const priorityOptions = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
  { label: 'Critical', value: 'Critical' },
] as const;

const statusOptions = [
  { label: 'Backlog', value: 'Backlog' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Review', value: 'Review' },
  { label: 'Completed', value: 'Completed' },
] as const;

const assigneeOptions = [
  { label: 'Yael Mizrahi', value: 'Yael Mizrahi' },
  { label: 'Ariel Amador', value: 'Ariel Amador' },
  { label: 'Sarah Johnson', value: 'Sarah Johnson' },
  { label: 'Grayson Johnson', value: 'Grayson Johnson' },
  { label: 'Unassigned', value: 'Unassigned' },
] as const;

function taskToFormValues(task?: Task | null): TaskFormValues {
  return {
    title: task?.title ?? '',
    description: task?.description ?? '',
    priority: task?.priority ?? 'Medium',
    status: task?.status ?? 'Backlog',
    assignedTo: task?.assignedTo ?? 'Unassigned',
    dueDate: task?.dueDate ?? '',
    tags: task?.tags?.join(', ') ?? '',
    requiredSkills: task?.requiredSkills?.join(', ') ?? '',
  };
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSubmitTask,
  mode,
  initialTask,
}: TaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: taskToFormValues(initialTask),
  });

  useEffect(() => {
    reset(taskToFormValues(initialTask));
  }, [initialTask, reset, isOpen]);

  const onSubmit = (values: TaskFormValues) => {
    onSubmitTask(values);
    reset(taskToFormValues(null));
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Create Task' : 'Edit Task'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <Input
          label='Title'
          placeholder='e.g. Email Campaign Launch'
          error={errors.title?.message}
          {...register('title')}
        />

        <Textarea
          label='Description'
          placeholder='Describe the task...'
          error={errors.description?.message}
          {...register('description')}
        />

        <div className='grid gap-4 md:grid-cols-2'>
          <Select
            label='Priority'
            options={[...priorityOptions]}
            error={errors.priority?.message}
            {...register('priority')}
          />

          <Select
            label='Status'
            options={[...statusOptions]}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <Select
            label='Assign To'
            options={[...assigneeOptions]}
            error={errors.assignedTo?.message}
            {...register('assignedTo')}
          />

          <Input
            label='Due Date'
            type='date'
            error={errors.dueDate?.message}
            {...register('dueDate')}
          />
        </div>

        <Input
          label='Tags'
          placeholder='e.g. seo, content, launch'
          error={errors.tags?.message}
          {...register('tags')}
        />

        <Input
          label='Required Skills'
          placeholder='e.g. design, copywriting, seo'
          error={errors.requiredSkills?.message}
          {...register('requiredSkills')}
        />

        <div className='flex justify-end gap-3 pt-2'>
          <Button type='button' variant='ghost' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {mode === 'create' ? 'Create Task' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
