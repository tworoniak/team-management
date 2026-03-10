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
import { priorityData } from '../../data/mockDashboard';

export default function PriorityOverviewCard() {
  return (
    <Card className='p-5'>
      <h2 className='mb-4 text-2xl font-bold tracking-tight'>
        Task Priority Overview
      </h2>

      <div className='h-72'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={priorityData} layout='vertical'>
            <CartesianGrid stroke='rgba(255,255,255,0.08)' />
            <XAxis type='number' stroke='#93a4c3' />
            <YAxis dataKey='name' type='category' stroke='#93a4c3' />
            <Tooltip />
            <Bar dataKey='value' radius={[0, 8, 8, 0]} fill='#4f8cff' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
