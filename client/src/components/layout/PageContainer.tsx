import type { PropsWithChildren } from 'react';

export default function PageContainer({ children }: PropsWithChildren) {
  return (
    <main className='mx-auto max-w-7xl px-4 py-8 md:px-6'>{children}</main>
  );
}
