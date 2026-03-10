import Card from '../ui/Card';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

type StatusDonutCardProps = {
  data: { name: string; value: number }[];
};

const COLORS = ['#64748b', '#4f8cff', '#8b5cf6', '#10b981'];

export default function StatusDonutCard({ data }: StatusDonutCardProps) {
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  if (!data.length) {
    return (
      <Card className='p-5'>
        <h2 className='text-2xl font-bold text-white'>
          Task Status Distribution
        </h2>
        <p className='mt-4 text-slate-400'>No task data available</p>
      </Card>
    );
  }

  return (
    <Card className='p-5'>
      <h2 className='mb-4 text-2xl font-bold text-white'>
        Task Status Distribution
      </h2>

      <div className='h-72'>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={coloredData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={100}
              stroke='none'
              fontSize={12}
              isAnimationActive={false}
              label={({ name, percent = 0 }) =>
                percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
              }
            ></Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              }}
              itemStyle={{
                color: '#e2e8f0',
                fontSize: '13px',
              }}
              labelStyle={{
                color: '#94a3b8',
                fontSize: '12px',
                marginBottom: '4px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='mt-4 flex flex-wrap items-center justify-center gap-4'>
        {coloredData.map((entry) => (
          <div key={entry.name} className='flex items-center gap-2'>
            <span
              className='inline-block h-3 w-3 rounded-full'
              style={{ backgroundColor: entry.fill }}
            />
            <span className='text-sm' style={{ color: entry.fill }}>
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
