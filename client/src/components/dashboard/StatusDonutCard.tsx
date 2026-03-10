import Card from '../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type StatusDonutCardProps = {
  data: { name: string; value: number }[];
};

const COLORS = ['#64748b', '#4f8cff', '#8b5cf6', '#10b981'];

export default function StatusDonutCard({ data }: StatusDonutCardProps) {
  return (
    <Card className='p-5'>
      <h2 className='mb-4 text-2xl font-bold text-white'>
        Task Status Distribution
      </h2>

      <div className='h-72'>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              // innerRadius={70}
              outerRadius={100}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
