import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Top navigation bar used on the Landing Page.
 */
export default function TopNavBar() {
  const { session } = useAuth()
  const navigate = useNavigate()

  function handleRequireLogin() {
    if (!session) {
      navigate('/login')
    } else if (session.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/dashboard')
    }
  }

  const authLinkLabel = session
    ? session.role === 'admin' ? 'Admin Panel' : 'My Dashboard'
    : 'Sign In'
  const authLinkTo = session
    ? session.role === 'admin' ? '/admin' : '/dashboard'
    : '/login'

  return (
    <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant">
      <nav className="flex justify-between items-center px-margin-desktop py-4 max-w-[1440px] mx-auto">
        <Link to="/" className="font-headline-md text-headline-md text-primary tracking-tight">
          LUXE CONCIERGE
        </Link>

        <div className="hidden md:flex space-x-8 font-body-md text-body-md">
          <Link to="/" className="text-primary border-b-2 border-secondary font-bold pb-1">
            Reservations
          </Link>
          <button onClick={handleRequireLogin} className="text-on-surface-variant hover:text-secondary transition-colors pb-1 cursor-pointer bg-transparent border-none">
            Guest Logs
          </button>
          <button onClick={handleRequireLogin} className="text-on-surface-variant hover:text-secondary transition-colors pb-1 cursor-pointer bg-transparent border-none">
            Maintenance
          </button>
          <button onClick={handleRequireLogin} className="text-on-surface-variant hover:text-secondary transition-colors pb-1 cursor-pointer bg-transparent border-none">
            Reports
          </button>
          <Link
            to={authLinkTo}
            className={`pb-1 transition-colors ${session ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-secondary'}`}
          >
            {authLinkLabel}
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
            notifications
          </button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
            settings
          </button>
          <button
            className="bg-primary text-on-primary px-6 py-2 font-label-md uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity"
            onClick={handleRequireLogin}
          >
            New Booking
          </button>
        </div>
      </nav>
    </header>
  )
}
