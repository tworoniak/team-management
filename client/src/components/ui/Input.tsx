import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <label className='block space-y-2'>
      <span className='text-sm font-medium text-slate-200'>{label}</span>
      <input
        className={clsx(
          'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500',
          className,
        )}
        {...props}
      />
      {error ? <p className='text-sm text-red-300'>{error}</p> : null}
    </label>
  );
}
