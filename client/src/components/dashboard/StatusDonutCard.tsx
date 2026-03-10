import Card from '../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { statusData } from '../../data/mockDashboard';

const COLORS = ['#64748b', '#4f8cff', '#8b5cf6', '#10b981'];

export default function StatusDonutCard() {
  return (
    <Card className='p-5'>
      <h2 className='mb-4 text-2xl font-bold tracking-tight'>
        Task Status Distribution
      </h2>

      <div className='h-72'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={statusData}
              dataKey='value'
              nameKey='name'
              // innerRadius={70}
              outerRadius={100}
            >
              {statusData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='mt-3 flex flex-wrap gap-3 text-sm text-muted'>
        {statusData.map((item) => (
          <span key={item.name}>
            {item.name}: {item.value}
          </span>
        ))}
      </div>
    </Card>
  );
}
