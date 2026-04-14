import { useState } from 'react';
import { toast } from 'sonner';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import TeamMemberCard from '../../components/team/TeamMemberCard';
import TeamMemberModal from './TeamMemberModal';
import { useTeam, useCreateMember, useUpdateMember, useDeleteMember } from '../../hooks/useTeam';
import type { TeamMember } from '../../types/team';
import type { TeamFormValues } from './teamSchema';
import { mapFormValuesToMemberPayload } from '../../lib/transforms';

export default function TeamPage() {
  const { data: team = [], isLoading, isError } = useTeam();
  const createMember = useCreateMember();
  const updateMember = useUpdateMember();
  const deleteMember = useDeleteMember();

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [memberModalMode, setMemberModalMode] = useState<'create' | 'edit'>('create');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  const openCreateModal = () => {
    setMemberModalMode('create');
    setSelectedMember(null);
    setIsMemberModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setMemberModalMode('edit');
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };

  const handleSubmitMember = (values: TeamFormValues) => {
    const payload = mapFormValuesToMemberPayload(values, selectedMember);

    if (memberModalMode === 'create') {
      createMember.mutate(payload, {
        onSuccess: () => toast.success(`${values.fullName} added to team`),
        onError: () => toast.error('Failed to add member'),
      });
      return;
    }

    if (selectedMember) {
      updateMember.mutate(
        { id: selectedMember.id, ...payload },
        {
          onSuccess: () => toast.success('Member updated'),
          onError: () => toast.error('Failed to update member'),
        },
      );
    }
  };

  const handleDeleteMember = () => {
    if (!memberToDelete) return;
    const name = memberToDelete.fullName;
    deleteMember.mutate(memberToDelete.id, {
      onSuccess: () => {
        setMemberToDelete(null);
        toast.success(`${name} removed from team`);
      },
      onError: () => toast.error('Failed to delete member'),
    });
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-24'>
        <Spinner className='h-8 w-8' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex items-center justify-center py-24'>
        <p className='text-slate-400'>Failed to load team. Is the server running?</p>
      </div>
    );
  }

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-5xl font-bold tracking-tight text-white'>
            Team Management
          </h1>
          <p className='mt-3 text-lg text-slate-400'>
            Manage your marketing team and track skill maps.
          </p>
        </div>

        <Button onClick={openCreateModal}>+ Add Member</Button>
      </div>

      {team.length > 0 ? (
        <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {team.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onEdit={openEditModal}
              onDelete={(member) => setMemberToDelete(member)}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/3 py-16 text-center'>
          <p className='text-2xl font-semibold text-slate-300'>No team members yet</p>
          <p className='mt-2 text-sm text-slate-500'>
            Add your first team member to start tracking skills and workload.
          </p>
          <Button className='mt-6' onClick={openCreateModal}>
            + Add Member
          </Button>
        </div>
      )}

      <TeamMemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        onSubmitMember={handleSubmitMember}
        mode={memberModalMode}
        initialMember={selectedMember}
      />

      <ConfirmDialog
        isOpen={!!memberToDelete}
        onClose={() => setMemberToDelete(null)}
        onConfirm={handleDeleteMember}
        title='Delete Team Member'
        message={
          memberToDelete
            ? `Are you sure you want to delete "${memberToDelete.fullName}"? This action cannot be undone.`
            : ''
        }
        confirmLabel='Delete Member'
      />
    </section>
  );
}
