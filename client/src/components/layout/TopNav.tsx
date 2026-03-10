// import {
//   BrainCircuit,
//   CheckSquare,
//   LayoutDashboard,
//   Settings,
//   Users,
// } from 'lucide-react';
// import { NavLink } from 'react-router-dom';
// import clsx from 'clsx';

// const links = [
//   { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//   { to: '/team', label: 'Team', icon: Users },
//   { to: '/tasks', label: 'Tasks', icon: CheckSquare },
//   { to: '/allocation', label: 'AI Allocation', icon: BrainCircuit },
// ];

// export default function TopNav() {
//   return (
//     <header className='sticky top-0 z-40 border-b border-line/70 bg-shell/80 backdrop-blur-xl'>
//       <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6'>
//         <div className='flex items-center gap-3'>
//           <div className='rounded-xl border border-white/10 bg-white/5 p-2 shadow-soft'>
//             <CheckSquare className='h-5 w-5 text-cyan' />
//           </div>
//           <div>
//             <p className='text-lg font-semibold tracking-tight'>TaskFlow</p>
//           </div>
//         </div>

//         <nav className='hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-soft md:flex'>
//           {links.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 clsx(
//                   'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition',
//                   isActive
//                     ? 'bg-gradient-to-r from-teal to-primary text-white shadow-glow'
//                     : 'text-textSoft hover:bg-white/5 hover:text-white',
//                 )
//               }
//             >
//               <Icon className='h-4 w-4' />
//               <span>{label}</span>
//             </NavLink>
//           ))}
//         </nav>

//         <button className='rounded-xl border border-white/10 bg-white/5 p-2 text-textSoft transition hover:bg-white/10 hover:text-white'>
//           <Settings className='h-5 w-5' />
//         </button>
//       </div>
//     </header>
//   );
// }

import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/team', label: 'Team' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/allocation', label: 'AI Allocation' },
];

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
