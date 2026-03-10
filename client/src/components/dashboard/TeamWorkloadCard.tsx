import Card from '../ui/Card';
import { mockTeam } from '../../data/mockTeam';

export default function TeamWorkloadCard() {
  return (
    <Card className='p-5'>
      <h2 className='mb-6 text-2xl font-bold text-white'>Team Workload</h2>

      <div className='space-y-6'>
        {mockTeam.map((member) => (
          <div key={member.id}>
            <div className='mb-2 flex items-center justify-between'>
              <div>
                <p className='font-semibold text-white'>{member.fullName}</p>
                <p className='text-sm text-slate-400'>{member.role}</p>
              </div>

              <span className='text-lg font-semibold text-white'>
                {member.currentWorkload}%
              </span>
            </div>

            {/* progress bar */}
            <div className='h-3 w-full overflow-hidden rounded-full bg-white/10'>
              <div
                className='h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500 transition-all'
                style={{
                  width: `${member.currentWorkload}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
