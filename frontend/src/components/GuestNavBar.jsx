import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function GuestNavBar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="w-full top-0 sticky bg-surface border-b border-outline-variant z-50">
      <div className="flex justify-between items-center px-margin-desktop py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-xl">
          <Link to="/" className="font-headline-md text-headline-md text-primary tracking-tight cursor-pointer">
            LUXE CONCIERGE
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            {[
              { to: '/dashboard', label: 'Dashboard', end: true },
              { to: '/book-by-date', label: 'Book by Date' },
              { to: '/book-by-room', label: 'Book by Room' },
            ].map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `pb-1 font-body-md text-body-md transition-colors ${
                    isActive
                      ? 'text-primary border-b-2 border-secondary font-bold'
                      : 'text-on-surface-variant hover:text-secondary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-md">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">notifications</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">settings</span>
            <span
              className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-error transition-colors"
              onClick={handleLogout}
              title="Log Out"
            >
              logout
            </span>
          </div>
          <button
            className="bg-primary-container text-on-primary text-label-md px-6 py-2 rounded uppercase tracking-wider font-bold"
            onClick={() => navigate('/book-by-room')}
          >
            New Booking
          </button>
        </div>
      </div>
    </nav>
  )
}
