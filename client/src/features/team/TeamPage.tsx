import Button from '../../components/ui/Button';
import TeamMemberCard from '../../components/team/TeamMemberCard';
import { mockTeam } from '../../data/mockTeam';

export default function TeamPage() {
  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-5xl font-bold tracking-tight'>Team Management</h1>
          <p className='mt-3 text-lg text-muted'>
            Manage your marketing team and track skill maps.
          </p>
        </div>

        <Button>+ Add Member</Button>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
        {mockTeam.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
