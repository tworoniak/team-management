import type { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

type Option = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  error?: string;
};

export default function Select({
  label,
  options,
  error,
  className,
  ...props
}: SelectProps) {
  return (
    <label className='block space-y-2'>
      <span className='text-sm font-medium text-slate-200'>{label}</span>
      <select
        className={clsx(
          'w-full rounded-xl border border-white/10 bg-[#10182f] px-4 py-3 text-white outline-none transition focus:border-blue-500',
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className='text-sm text-red-300'>{error}</p> : null}
    </label>
  );
}
