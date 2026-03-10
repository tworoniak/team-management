import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import NumberInput from '../../components/ui/NumberInput';
import Button from '../../components/ui/Button';

import { teamRoleValues, teamSchema, type TeamFormValues } from './teamSchema';
import type { TeamMember } from '../../types/team';

type TeamMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitMember: (values: TeamFormValues) => void;
  mode: 'create' | 'edit';
  initialMember?: TeamMember | null;
};

const roleOptions = teamRoleValues.map((role) => ({
  label: role,
  value: role,
}));

function memberToFormValues(member?: TeamMember | null): TeamFormValues {
  return {
    fullName: member?.fullName ?? '',
    email: member?.email ?? '',
    role: member?.role ?? 'Designer',
    availability: member?.availability ?? 100,
    currentWorkload: member?.currentWorkload ?? 0,
    skills: {
      contentCreation: member?.skills.contentCreation ?? 5,
      socialMedia: member?.skills.socialMedia ?? 5,
      seo: member?.skills.seo ?? 5,
      ppcAdvertising: member?.skills.ppcAdvertising ?? 5,
      design: member?.skills.design ?? 5,
      copywriting: member?.skills.copywriting ?? 5,
      analytics: member?.skills.analytics ?? 5,
      strategy: member?.skills.strategy ?? 5,
    },
  };
}

export default function TeamMemberModal({
  isOpen,
  onClose,
  onSubmitMember,
  mode,
  initialMember,
}: TeamMemberModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeamFormValues, unknown, TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: memberToFormValues(initialMember),
  });

  useEffect(() => {
    reset(memberToFormValues(initialMember));
  }, [initialMember, reset, isOpen]);

  const onSubmit = (values: TeamFormValues) => {
    onSubmitMember(values);
    reset(memberToFormValues(null));
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Add Team Member' : 'Edit Team Member'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div className='grid gap-4 md:grid-cols-2'>
          <Input
            label='Full Name'
            placeholder='e.g. Ariel Amador'
            error={errors.fullName?.message}
            {...register('fullName')}
          />

          <Input
            label='Email'
            placeholder='e.g. ariel@example.com'
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <Select
          label='Role'
          options={roleOptions}
          error={errors.role?.message}
          {...register('role')}
        />

        <div className='grid gap-4 md:grid-cols-2'>
          <NumberInput
            label='Availability %'
            min={0}
            max={100}
            error={errors.availability?.message}
            {...register('availability')}
          />

          <NumberInput
            label='Current Workload %'
            min={0}
            max={100}
            error={errors.currentWorkload?.message}
            {...register('currentWorkload')}
          />
        </div>

        <div className='space-y-4 rounded-2xl border border-white/10 bg-white/3 p-4'>
          <h3 className='text-lg font-semibold text-white'>
            Skills Assessment
          </h3>

          <div className='grid gap-4 md:grid-cols-2'>
            <NumberInput
              label='Content Creation'
              min={0}
              max={10}
              error={errors.skills?.contentCreation?.message}
              {...register('skills.contentCreation')}
            />

            <NumberInput
              label='Social Media'
              min={0}
              max={10}
              error={errors.skills?.socialMedia?.message}
              {...register('skills.socialMedia')}
            />

            <NumberInput
              label='SEO'
              min={0}
              max={10}
              error={errors.skills?.seo?.message}
              {...register('skills.seo')}
            />

            <NumberInput
              label='PPC Advertising'
              min={0}
              max={10}
              error={errors.skills?.ppcAdvertising?.message}
              {...register('skills.ppcAdvertising')}
            />

            <NumberInput
              label='Design'
              min={0}
              max={10}
              error={errors.skills?.design?.message}
              {...register('skills.design')}
            />

            <NumberInput
              label='Copywriting'
              min={0}
              max={10}
              error={errors.skills?.copywriting?.message}
              {...register('skills.copywriting')}
            />

            <NumberInput
              label='Analytics'
              min={0}
              max={10}
              error={errors.skills?.analytics?.message}
              {...register('skills.analytics')}
            />

            <NumberInput
              label='Strategy'
              min={0}
              max={10}
              error={errors.skills?.strategy?.message}
              {...register('skills.strategy')}
            />
          </div>
        </div>

        <div className='flex justify-end gap-3 pt-2'>
          <Button type='button' variant='ghost' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {mode === 'create' ? 'Add Member' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
