import { BrainCircuit, CheckSquare, Users } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import AllocationHeroCard from '../../components/allocation/AllocationHeroCard';
import Card from '../../components/ui/Card';
import { mockAllocation } from '../../data/mockAllocation';

export default function AllocationPage() {
  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
        <div>
          <h1 className='text-5xl font-bold tracking-tight'>
            AI Task Allocation Engine
          </h1>
          <p className='mt-3 text-lg text-muted'>
            Intelligently assign tasks based on skills, workload, and priority.
          </p>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <StatCard
          label='Tasks in Backlog'
          value='2'
          helper='Awaiting assignment'
          icon={CheckSquare}
          iconClassName='text-amber-300'
        />
        <StatCard
          label='Available Team Members'
          value='280'
          helper='Ready for tasks'
          icon={Users}
          iconClassName='text-emerald-300'
        />
        <StatCard
          label='AI Recommendations'
          value={mockAllocation.length}
          helper='Smart suggestions generated'
          icon={BrainCircuit}
          iconClassName='text-violet-300'
        />
      </div>

      <AllocationHeroCard />

      <div className='grid gap-6 lg:grid-cols-2'>
        {mockAllocation.map((item) => (
          <Card key={item.taskId} className='p-5'>
            <div className='mb-4 flex items-start justify-between gap-4'>
              <div>
                <h2 className='text-2xl font-bold tracking-tight'>
                  {item.taskTitle}
                </h2>
                <p className='mt-2 text-sm text-muted'>
                  Recommended assignee: {item.recommendedMember}
                </p>
              </div>
              <div className='rounded-xl border border-violet/30 bg-violet/15 px-3 py-2 text-lg font-bold text-violet-200'>
                {item.score}
              </div>
            </div>

            <div className='space-y-2'>
              {item.reasons.map((reason) => (
                <p key={reason} className='text-sm text-textSoft'>
                  • {reason}
                </p>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
