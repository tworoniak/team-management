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
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey='value' fill='#4f8cff' radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
