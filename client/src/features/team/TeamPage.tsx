import { useState } from 'react';
import { toast } from 'sonner';
import Button from '../../components/ui/Button';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import TeamMemberCard from '../../components/team/TeamMemberCard';
import TeamMemberModal from './TeamMemberModal';
import { useTeamStore } from '../../stores/teamStore';
import type { TeamMember } from '../../types/team';
import type { TeamFormValues } from './teamSchema';
import { mapFormValuesToMember } from '../../lib/transforms';

export default function TeamPage() {
  const { team, addMember, updateMember, deleteMember } = useTeamStore();

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [memberModalMode, setMemberModalMode] = useState<'create' | 'edit'>(
    'create',
  );
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
    if (memberModalMode === 'create') {
      addMember(mapFormValuesToMember(values));
      toast.success(`${values.fullName} added to team`);
      return;
    }

    if (selectedMember) {
      updateMember(mapFormValuesToMember(values, selectedMember));
      toast.success('Member updated');
    }
  };

  const handleDeleteMember = () => {
    if (!memberToDelete) return;
    const name = memberToDelete.fullName;
    deleteMember(memberToDelete.id);
    setMemberToDelete(null);
    toast.success(`${name} removed from team`);
  };

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
