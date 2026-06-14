import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Initialize default admin user in localStorage
function initUsers() {
  if (!localStorage.getItem('luxe_users')) {
    localStorage.setItem('luxe_users', JSON.stringify([{
      username: 'admin',
      password: 'admin',
      role: 'admin',
      email: 'admin@luxeconcierge.com'
    }]))
  }
}

export function AuthProvider({ children }) {
  initUsers()

  const [session, setSession] = useState(() => {
    try {
      const stored = sessionStorage.getItem('luxe_auth')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = useCallback((username, password) => {
    const users = JSON.parse(localStorage.getItem('luxe_users') || '[]')
    const found = users.find(u => u.username === username && u.password === password)
    if (!found) return { success: false, message: 'Invalid credentials. Please try again.' }

    const data = {
      username: found.username,
      role: found.role,
      email: found.email,
      loginTime: new Date().toISOString()
    }
    sessionStorage.setItem('luxe_auth', JSON.stringify(data))
    setSession(data)
    return { success: true, role: found.role }
  }, [])

  const register = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem('luxe_users') || '[]')
    const username = email.split('@')[0]

    if (users.find(u => u.email === email || u.username === username)) {
      return { success: false, message: 'An account with this email already exists.' }
    }

    const newUser = { username, password, role: 'guest', email }
    users.push(newUser)
    localStorage.setItem('luxe_users', JSON.stringify(users))

    const data = {
      username: newUser.username,
      role: newUser.role,
      email: newUser.email,
      loginTime: new Date().toISOString()
    }
    sessionStorage.setItem('luxe_auth', JSON.stringify(data))
    setSession(data)
    return { success: true, role: 'guest' }
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('luxe_auth')
    setSession(null)
  }, [])

  return (
    <AuthContext.Provider value={{ session, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
