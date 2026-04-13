import { createBrowserRouter, Navigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

function NotFoundPage() {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center'>
      <p className='text-6xl font-bold text-slate-600'>404</p>
      <h1 className='text-2xl font-semibold text-white'>Page not found</h1>
      <p className='text-slate-400'>The page you're looking for doesn't exist.</p>
      <Link
        to='/dashboard'
        className='mt-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 transition'
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
import DashboardPage from '../features/dashboard/DashboardPage';
import TeamPage from '../features/team/TeamPage';
import TasksPage from '../features/tasks/TasksPage';
import AllocationPage from '../features/allocation/AllocationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to='/dashboard' /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'allocation', element: <AllocationPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
