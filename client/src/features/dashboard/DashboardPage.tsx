import { AlertCircle, Activity, TrendingUp, Users } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import RecentActivityPanel from '../../components/dashboard/RecentActivityPanel';
import StatusDonutCard from '../../components/dashboard/StatusDonutCard';
import PriorityOverviewCard from '../../components/dashboard/PriorityOverviewCard';
import TeamWorkloadCard from '../../components/dashboard/TeamWorkloadCard';

export default function DashboardPage() {
  return (
    <section className='space-y-8'>
      <div>
        <h1 className='text-5xl font-bold tracking-tight'>
          Marketing Dashboard
        </h1>
        <p className='mt-3 text-lg text-muted'>
          Welcome back. Here’s your team’s performance snapshot.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <StatCard
          label='Team Members'
          value='280'
          helper='Active members'
          icon={Users}
        />
        <StatCard
          label='Active Tasks'
          value='4'
          helper='Currently in progress'
          icon={Activity}
          iconClassName='text-emerald-300'
        />
        <StatCard
          label='Avg Workload'
          value='19%'
          helper='Team capacity utilization'
          icon={TrendingUp}
          iconClassName='text-amber-300'
        />
        <StatCard
          label='High Priority'
          value='6'
          helper='Critical & high priority tasks'
          icon={AlertCircle}
          iconClassName='text-red-300'
        />
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.7fr_1fr]'>
        <RecentActivityPanel />

        <div className='space-y-6'>
          <StatusDonutCard />
          <PriorityOverviewCard />
          <TeamWorkloadCard />
        </div>
      </div>
    </section>
  );
}
