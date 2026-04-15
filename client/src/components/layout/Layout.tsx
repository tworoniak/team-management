import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  FolderKanban,
  Kanban,
  Zap,
  Menu,
  X,
  Brain,
  LogOut,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../stores/authStore';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/kanban', label: 'Kanban', icon: Kanban },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
  { path: '/team', label: 'Team', icon: Users },
  { path: '/allocation', label: 'AI Allocation', icon: Brain },
];

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((s) => s.user);
  const clearToken = useAuthStore((s) => s.clearToken);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    clearToken();
    navigate('/login', { replace: true });
  }

  return (
    <div className='min-h-screen bg-slate-950 flex'>
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Logo */}
        <div className='h-16 flex items-center px-6 border-b border-slate-800'>
          <div className='flex items-center gap-2.5'>
            <div className='w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center'>
              <Zap className='w-4 h-4 text-white' />
            </div>
            <span className='text-white font-semibold text-lg tracking-tight'>
              DevFlow
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className='flex-1 px-3 py-6 space-y-1'>
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800',
                )
              }
            >
              <Icon className='w-4 h-4 shrink-0' />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className='px-6 py-4 border-t border-slate-800'>
          <p className='text-xs text-slate-600'>v1.0 · DevFlow Portal</p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/60 lg:hidden'
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className='flex-1 lg:ml-64 flex flex-col min-h-screen'>
        {/* Top bar */}
        <header className='h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6 sticky top-0 z-30'>
          <button
            className='lg:hidden text-slate-400 hover:text-white mr-4'
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className='w-5 h-5' />
            ) : (
              <Menu className='w-5 h-5' />
            )}
          </button>
          <div className='flex-1' />
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className='flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-slate-800 transition'
            >
              <div className='w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center'>
                <span className='text-indigo-400 text-xs font-semibold'>
                  {user ? getInitials(user.name) : '?'}
                </span>
              </div>
              {user && (
                <span className='text-slate-300 text-sm font-medium hidden sm:block'>
                  {user.name}
                </span>
              )}
            </button>

            {dropdownOpen && (
              <div className='absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-slate-900 shadow-xl py-1 z-50'>
                {user && (
                  <div className='px-4 py-3 border-b border-white/10'>
                    <p className='text-sm font-medium text-white truncate'>{user.name}</p>
                    <p className='text-xs text-slate-400 truncate'>{user.email}</p>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className='flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition'
                >
                  <LogOut className='w-4 h-4' />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <main className='flex-1 p-6 overflow-auto'>
          <Outlet />
        </main>
      </div>
      <Toaster theme='dark' position='bottom-right' richColors />
    </div>
  );
}
