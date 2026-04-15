import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { api } from '../../lib/api';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (token) {
      api.get('/auth/me').catch(() => {});
    }
  }, []);

  if (!token) return <Navigate to='/login' replace />;
  return <>{children}</>;
}
