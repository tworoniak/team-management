import type { LucideIcon } from 'lucide-react';
import Card from './Card';

type StatCardProps = {
  label: string;
  value: string | number;
  helper: string;
  icon: LucideIcon;
  iconClassName?: string;
};

export default function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  iconClassName = 'text-cyan',
}: StatCardProps) {
  return (
    <Card className='p-5'>
      <div className='mb-4 flex items-start justify-between'>
        <p className='text-sm font-medium text-textSoft'>{label}</p>
        <Icon className={`h-5 w-5 ${iconClassName}`} />
      </div>

      <div className='space-y-1'>
        <h3 className='text-4xl font-bold tracking-tight'>{value}</h3>
        <p className='text-sm text-muted'>{helper}</p>
      </div>
    </Card>
  );
}
