import Card from '../ui/Card';
import { mockTeam } from '../../data/mockTeam';

export default function TeamWorkloadCard() {
  return (
    <Card className='p-5'>
      <h2 className='mb-5 text-2xl font-bold tracking-tight'>Team Workload</h2>

      <div className='space-y-5'>
        {mockTeam.map((member) => (
          <div key={member.id}>
            <div className='mb-2 flex items-center justify-between gap-3'>
              <div>
                <p className='font-semibold'>{member.fullName}</p>
                <p className='text-sm text-muted'>{member.role}</p>
              </div>
              <p className='text-sm font-semibold text-textSoft'>
                {member.currentWorkload}%
              </p>
            </div>

            <div className='h-3 rounded-full bg-white/10'>
              <div
                className='h-3 rounded-full bg-gradient-to-r from-primary to-violet'
                style={{ width: `${member.currentWorkload}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
