import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export default function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        'rounded-lg px-4 py-2 font-medium transition',
        variant === 'primary' &&
          'bg-linear-to-r from-blue-500 to-violet-500 text-white hover:opacity-90',
        variant === 'ghost' &&
          'border border-white/10 bg-white/5 hover:bg-white/10',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
