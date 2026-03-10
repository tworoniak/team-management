import type { ReactNode } from 'react';
import clsx from 'clsx';

type BadgeTone =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'
  | 'backlog'
  | 'progress'
  | 'review'
  | 'completed'
  | 'role';

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
};

const toneMap: Record<BadgeTone, string> = {
  low: 'bg-cyan/15 text-cyan border-cyan/30',
  medium: 'bg-primary/15 text-blue-300 border-primary/30',
  high: 'bg-amber/15 text-amber-300 border-amber/30',
  critical: 'bg-redsoft/15 text-red-300 border-redsoft/30',
  backlog: 'bg-slate-400/15 text-slate-300 border-slate-400/30',
  progress: 'bg-primary/15 text-blue-300 border-primary/30',
  review: 'bg-violet/15 text-violet-300 border-violet/30',
  completed: 'bg-teal/15 text-emerald-300 border-teal/30',
  role: 'bg-violet/15 text-violet-200 border-violet/30',
};

export default function Badge({ children, tone = 'medium' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
        toneMap[tone],
      )}
    >
      {children}
    </span>
  );
}
