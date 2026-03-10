import type { TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export default function Textarea({
  label,
  error,
  className,
  ...props
}: TextareaProps) {
  return (
    <label className='block space-y-2'>
      <span className='text-sm font-medium text-slate-200'>{label}</span>
      <textarea
        className={clsx(
          'min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500',
          className,
        )}
        {...props}
      />
      {error ? <p className='text-sm text-red-300'>{error}</p> : null}
    </label>
  );
}
