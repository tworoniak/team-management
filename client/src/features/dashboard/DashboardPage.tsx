import { useMemo } from 'react';
import { AlertCircle, Activity, TrendingUp, Users } from 'lucide-react';

import StatCard from '../../components/ui/StatCard';
import RecentActivityPanel from '../../components/dashboard/RecentActivityPanel';
import StatusDonutCard from '../../components/dashboard/StatusDonutCard';
import PriorityOverviewCard from '../../components/dashboard/PriorityOverviewCard';
import TeamWorkloadCard from '../../components/dashboard/TeamWorkloadCard';

import { mockTasks } from '../../data/mockTasks';
import { mockTeam } from '../../data/mockTeam';

import {
  getActiveTasks,
  getAverageWorkload,
  getHighPriorityTasks,
  getPriorityDistribution,
  getStatusDistribution,
} from '../../lib/dashboardAnalytics';

export default function DashboardPage() {
  const tasks = mockTasks;
  const team = mockTeam;

  const activeTasks = useMemo(() => getActiveTasks(tasks), [tasks]);

  const highPriority = useMemo(() => getHighPriorityTasks(tasks), [tasks]);

  const avgWorkload = useMemo(() => getAverageWorkload(team), [team]);

  const statusData = useMemo(() => getStatusDistribution(tasks), [tasks]);

  const priorityData = useMemo(() => getPriorityDistribution(tasks), [tasks]);

  return (
    <section className='space-y-8'>
      <div>
        <h1 className='text-5xl font-bold text-white'>Marketing Dashboard</h1>
        <p className='mt-3 text-lg text-slate-400'>
          Welcome back. Here’s your team’s performance snapshot.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <StatCard
          label='Team Members'
          value={team.length}
          helper='Active members'
          icon={Users}
        />

        <StatCard
          label='Active Tasks'
          value={activeTasks}
          helper='Currently in progress'
          icon={Activity}
          iconClassName='text-emerald-300'
        />

        <StatCard
          label='Avg Workload'
          value={`${avgWorkload}%`}
          helper='Team capacity utilization'
          icon={TrendingUp}
          iconClassName='text-amber-300'
        />

        <StatCard
          label='High Priority'
          value={highPriority}
          helper='Critical & high priority tasks'
          icon={AlertCircle}
          iconClassName='text-red-300'
        />
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.7fr_1fr]'>
        <RecentActivityPanel />

        <div className='space-y-6'>
          <StatusDonutCard data={statusData} />
          <PriorityOverviewCard data={priorityData} />
          <TeamWorkloadCard />
        </div>
      </div>
    </section>
  );
}
