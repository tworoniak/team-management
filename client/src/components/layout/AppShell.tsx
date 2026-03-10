// import { Outlet } from 'react-router-dom';
// import TopNav from './TopNav';
// import PageContainer from './PageContainer';

// export default function AppShell() {
//   return (
//     <div className='min-h-screen'>
//       <TopNav />
//       <PageContainer>
//         <Outlet />
//       </PageContainer>
//     </div>
//   );
// }

import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

export default function AppShell() {
  return (
    <div className='min-h-screen'>
      <TopNav />

      <main className='mx-auto max-w-7xl px-6 py-10'>
        <Outlet />
      </main>
    </div>
  );
}
