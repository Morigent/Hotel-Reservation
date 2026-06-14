import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const guestNavItems = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard', end: true },
  { to: '/book-by-date', icon: 'calendar_today', label: 'Book by Date' },
  { to: '/book-by-room', icon: 'meeting_room', label: 'Book by Room' },
]

export default function GuestSideBar() {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 sticky top-[72px] p-6 space-y-4 bg-surface-container-low border-r border-outline-variant">
      <div className="mb-8">
        <div className="flex items-center gap-sm mb-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div>
            <p className="font-label-md text-label-md uppercase text-primary">
              {session?.username || 'Guest'}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Logged In</p>
          </div>
        </div>
      </div>

      <nav className="flex-grow space-y-2">
        {guestNavItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-sm px-4 py-3 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-all ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-outline-variant space-y-2">
        <button className="w-full py-3 px-4 border border-error text-error font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-error-container transition-colors">
          Emergency Lockout
        </button>
        <a href="#" className="flex items-center gap-sm px-4 py-2 text-on-surface-variant hover:text-primary font-label-md text-label-md uppercase">
          <span className="material-symbols-outlined">help</span>
          Help Center
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-sm px-4 py-2 text-on-surface-variant hover:text-primary font-label-md text-label-md uppercase w-full text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          Log Out
        </button>
      </div>
    </aside>
  )
}
