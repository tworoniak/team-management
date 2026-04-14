import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';

import { projectSchema, type ProjectFormValues } from './projectSchema';
import { PROJECT_STATUSES, PROJECT_COLORS } from '../../types/project';
import type { Project } from '../../types/project';
import { cn } from '../../lib/utils';

const statusOptions = PROJECT_STATUSES.map((s) => ({ label: s, value: s }));

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ProjectFormValues) => void;
  mode: 'create' | 'edit';
  initialProject?: Project | null;
};

function projectToFormValues(project?: Project | null): ProjectFormValues {
  return {
    name: project?.name ?? '',
    description: project?.description ?? '',
    status: project?.status ?? 'Active',
    color: project?.color ?? 'indigo',
  };
}

export default function CreateProjectModal({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialProject,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: projectToFormValues(initialProject),
  });

  const selectedColor = watch('color');

  useEffect(() => {
    reset(projectToFormValues(initialProject));
  }, [initialProject, isOpen, reset]);

  const onFormSubmit = (values: ProjectFormValues) => {
    onSubmit(values);
    reset(projectToFormValues(null));
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'New Project' : 'Edit Project'}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-5'>
        <Input
          label='Project Name'
          placeholder='e.g. Website Redesign'
          error={errors.name?.message}
          {...register('name')}
        />

        <Textarea
          label='Description'
          placeholder='What is this project about?'
          {...register('description')}
        />

        <Select
          label='Status'
          options={statusOptions}
          error={errors.status?.message}
          {...register('status')}
        />

        <div className='space-y-2'>
          <span className='text-sm font-medium text-slate-200'>Color</span>
          <div className='flex flex-wrap gap-2.5 pt-1'>
            {PROJECT_COLORS.map(({ value, label, bg, ring }) => (
              <button
                key={value}
                type='button'
                title={label}
                onClick={() => setValue('color', value as ProjectFormValues['color'])}
                className={cn(
                  'w-8 h-8 rounded-full transition-all',
                  bg,
                  selectedColor === value
                    ? `ring-2 ring-offset-2 ring-offset-slate-900 ${ring} scale-110`
                    : 'opacity-60 hover:opacity-100',
                )}
              />
            ))}
          </div>
          {errors.color && (
            <p className='text-sm text-red-300'>{errors.color.message}</p>
          )}
        </div>

        <div className='flex justify-end gap-3 pt-2'>
          <Button type='button' variant='ghost' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {mode === 'create' ? 'Create Project' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
