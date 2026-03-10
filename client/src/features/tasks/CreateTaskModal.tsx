import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { taskSchema, type TaskFormValues } from './taskSchema';

type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (values: TaskFormValues) => void;
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

export default function CreateTaskModal({
  isOpen,
  onClose,
  onCreateTask,
}: CreateTaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Backlog',
      assignedTo: 'Unassigned',
      dueDate: '',
      tags: '',
    },
  });

  const onSubmit = (values: TaskFormValues) => {
    onCreateTask(values);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Create Task'>
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
            options={priorityOptions.map((o) => ({ ...o }))}
            error={errors.priority?.message}
            {...register('priority')}
          />

          <Select
            label='Status'
            options={statusOptions.map((o) => ({ ...o }))}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <Select
            label='Assign To'
            options={assigneeOptions.map((o) => ({ ...o }))}
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

        <div className='flex justify-end gap-3 pt-2'>
          <Button type='button' variant='ghost' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
