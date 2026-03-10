import type { PropsWithChildren, ReactNode } from 'react';
import { X } from 'lucide-react';

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
}>;

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1630] shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between border-b border-white/10 px-5 py-4'>
          <div className='text-xl font-semibold text-white'>{title}</div>

          <button
            type='button'
            onClick={onClose}
            className='rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white'
            aria-label='Close modal'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='p-5'>{children}</div>
      </div>
    </div>
  );
}
