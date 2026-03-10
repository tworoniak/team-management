import Card from '../ui/Card';
import { useTeamStore } from '../../stores/teamStore';

export default function TeamWorkloadCard() {
  const team = useTeamStore((state) => state.team);

  return (
    <Card className='p-5'>
      <h2 className='mb-6 text-2xl font-bold text-white'>Team Workload</h2>

      <div className='space-y-6'>
        {team.map((member) => (
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

            <div className='h-3 w-full overflow-hidden rounded-full bg-white/10'>
              <div
                className={`h-full rounded-full transition-all ${
                  member.currentWorkload > 90
                    ? 'bg-red-500'
                    : member.currentWorkload > 70
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                }`}
                style={{ width: `${member.currentWorkload}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
