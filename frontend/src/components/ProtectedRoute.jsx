import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * ProtectedRoute — redirects to /login if not authenticated.
 * Optionally enforces a specific role (e.g. 'admin').
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { session } = useAuth()

  if (!session) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && session.role !== requiredRole) {
    // Wrong role — redirect to appropriate dashboard
    if (session.role === 'admin') return <Navigate to="/admin" replace />
    return <Navigate to="/dashboard" replace />
  }

  return children
}
