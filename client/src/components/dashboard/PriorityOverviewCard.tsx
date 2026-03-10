import Card from '../ui/Card';
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type PriorityOverviewCardProps = {
  data: { name: string; value: number }[];
};

export default function PriorityOverviewCard({
  data,
}: PriorityOverviewCardProps) {
  return (
    <Card className='p-5'>
      <h2 className='mb-4 text-2xl font-bold text-white'>
        Task Priority Overview
      </h2>

      <div className='h-72'>
        <ResponsiveContainer>
          <BarChart data={data} layout='vertical'>
            <CartesianGrid stroke='rgba(255,255,255,0.08)' />
            <XAxis type='number' stroke='#94a3b8' />
            <YAxis dataKey='name' type='category' stroke='#94a3b8' />
            <Tooltip />
            <Bar dataKey='value' fill='#4f8cff' radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
