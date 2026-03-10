import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  variant?: 'primary' | 'ghost' | 'danger';
};

export default function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' &&
          'bg-linear-to-r from-blue-500 to-violet-500 text-white hover:opacity-95',
        variant === 'ghost' &&
          'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white',
        variant === 'danger' && 'bg-red-600 text-white hover:bg-red-500',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
