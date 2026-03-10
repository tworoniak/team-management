import { useMemo } from 'react';
import { BrainCircuit, CheckSquare, Users } from 'lucide-react';

import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useTaskStore } from '../../stores/taskStore';
import { useTeamStore } from '../../stores/teamStore';
import { generateAllocationResults } from '../../lib/allocationEngine';

export default function AllocationPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const team = useTeamStore((state) => state.team);

  const results = useMemo(
    () => generateAllocationResults(tasks, team),
    [tasks, team],
  );

  const backlogCount = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.status === 'Backlog' &&
          (!task.assignedTo || task.assignedTo === 'Unassigned'),
      ).length,
    [tasks],
  );

  const handleApplyRecommendation = (taskId: string, memberName: string) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    updateTask({
      ...task,
      assignedTo: memberName,
    });
  };

  return (
    <section className='space-y-8'>
      <div>
        <h1 className='text-5xl font-bold tracking-tight text-white'>
          AI Task Allocation Engine
        </h1>
        <p className='mt-3 text-lg text-slate-400'>
          Recommend the best assignee based on skills, availability, and
          workload.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <StatCard
          label='Backlog Tasks'
          value={backlogCount}
          helper='Awaiting assignment'
          icon={CheckSquare}
          iconClassName='text-amber-300'
        />
        <StatCard
          label='Team Members'
          value={team.length}
          helper='Available for scoring'
          icon={Users}
          iconClassName='text-emerald-300'
        />
        <StatCard
          label='Recommendations'
          value={results.length}
          helper='Generated task matches'
          icon={BrainCircuit}
          iconClassName='text-violet-300'
        />
      </div>

      <div className='grid gap-6'>
        {results.length === 0 ? (
          <Card className='p-8 text-center'>
            <h2 className='text-2xl font-bold text-white'>
              No tasks need allocation
            </h2>
            <p className='mt-2 text-slate-400'>
              All backlog tasks are already assigned, or there are no backlog
              items.
            </p>
          </Card>
        ) : (
          results.map(({ task, recommendations }) => (
            <Card key={task.id} className='p-5'>
              <div className='mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
                <div>
                  <h2 className='text-2xl font-bold tracking-tight text-white'>
                    {task.title}
                  </h2>
                  <p className='mt-2 text-sm text-slate-400'>
                    {task.description}
                  </p>
                  <p className='mt-3 text-sm text-slate-500'>
                    Required skills:{' '}
                    {task.requiredSkills.join(', ') || 'None specified'}
                  </p>
                </div>

                <div className='rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200'>
                  {task.priority} Priority
                </div>
              </div>

              <div className='grid gap-4 lg:grid-cols-3'>
                {recommendations.map((rec, index) => (
                  <div
                    key={rec.member.id}
                    className='rounded-2xl border border-white/10 bg-white/3 p-4'
                  >
                    <div className='mb-3 flex items-start justify-between gap-3'>
                      <div>
                        <p className='text-lg font-semibold text-white'>
                          {rec.member.fullName}
                        </p>
                        <p className='text-sm text-slate-400'>
                          {rec.member.role}
                        </p>
                      </div>

                      <div className='rounded-lg bg-blue-500/15 px-3 py-2 text-sm font-bold text-blue-300'>
                        {rec.score}
                      </div>
                    </div>

                    <div className='mb-4 space-y-1 text-sm text-slate-300'>
                      <p>Availability: {rec.member.availability}%</p>
                      <p>Workload: {rec.member.currentWorkload}%</p>
                    </div>

                    <div className='mb-4 space-y-2'>
                      {rec.reasons.map((reason) => (
                        <p key={reason} className='text-sm text-slate-400'>
                          • {reason}
                        </p>
                      ))}
                    </div>

                    {index === 0 ? (
                      <Button
                        type='button'
                        className='w-full'
                        onClick={() =>
                          handleApplyRecommendation(
                            task.id,
                            rec.member.fullName,
                          )
                        }
                      >
                        Apply Best Match
                      </Button>
                    ) : (
                      <Button
                        type='button'
                        variant='ghost'
                        className='w-full'
                        onClick={() =>
                          handleApplyRecommendation(
                            task.id,
                            rec.member.fullName,
                          )
                        }
                      >
                        Assign Instead
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
