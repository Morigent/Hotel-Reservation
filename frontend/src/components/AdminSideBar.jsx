import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const adminNavItems = [
  { to: '/room-status', icon: 'bed', label: 'Room Status' },
  { to: '/admin', icon: 'dashboard', label: 'Dashboard', end: true },
  { to: '/guest-log', icon: 'person_book', label: 'Guest Logs' },
  { to: '/maintenance', icon: 'engineering', label: 'Maintenance' },
  { to: '/reports', icon: 'flag', label: 'Reports' },
]

export default function AdminSideBar() {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant z-50 p-6 space-y-4">
      <div className="mb-base flex flex-col gap-2">
        <span
          className="font-headline-md text-headline-md text-primary tracking-tight cursor-pointer"
          onClick={() => navigate('/')}
        >
          LUXE CONCIERGE
        </span>
        <div className="flex items-center gap-3 py-4 border-b border-outline-variant">
          <img
            alt="Concierge Lead"
            className="w-10 h-10 rounded-full object-cover border border-outline-variant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvIhMobuDDTfymz4ud54N7ngDfdJ0EBiNz94C1qvB-szKHH-CI3Rgrf9Ac9GCExOprPksZqtCqwi_sLBaMCYGuGT_85U3g2df6j2pu7QqaTInVKDpwQT4_wd-vMg5mk0wWJfV9R6JdaQ-POcO-7vjQexS5fgjQjSIpB0ip17CMNG_kUZiOJk64yD5cRmK9Lc5D-2ncyB0Qdd9c4wFhXT311MRTvTGX--E4TAqDRkXobIRC775nRb86nJ7_kefljJwxJ18cn9wTILr_"
          />
          <div>
            <h3 className="font-label-md text-label-md uppercase text-on-surface">
              {session?.username || 'Admin'}
            </h3>
            <p className="text-xs text-on-surface-variant font-medium">Senior Staff</p>
          </div>
        </div>
      </div>

      <nav className="flex-grow space-y-2">
        {adminNavItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition-all rounded-lg ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container scale-95 duration-150'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label-md text-label-md uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-4 border-t border-outline-variant space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-all">
          <span className="material-symbols-outlined text-[20px]">help</span>
          <span className="text-sm font-medium">Help Center</span>
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error transition-all w-full text-left"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  )
}
