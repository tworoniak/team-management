import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ children, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-[#0d1630] p-5 shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}
