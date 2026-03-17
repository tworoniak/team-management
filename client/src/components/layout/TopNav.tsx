import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/team', label: 'Team' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/allocation', label: 'AI Allocation' },
];

// <LayoutDashboard />
// <SquareCheckBig />
// <FolderKanban />
// <Users />
// <Zap />

export default function TopNav() {
  return (
    <header className='sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <div className='font-bold text-xl'>TaskFlow</div>

        <nav className='flex gap-3'>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
