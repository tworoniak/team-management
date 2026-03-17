import { createBrowserRouter, Navigate } from 'react-router-dom';
// import AppShell from '../components/layout/AppShell';
import Layout from '../components/layout/Layout';
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
]);
