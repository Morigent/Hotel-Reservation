import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3200)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast-enter flex items-center gap-4 px-6 py-4 rounded shadow-xl border-l-4 pointer-events-auto ${
              toast.type === 'success'
                ? 'bg-surface-container-low border-secondary'
                : 'bg-error-container border-error'
            }`}
          >
            <span className="material-symbols-outlined">
              {toast.type === 'success' ? 'check_circle' : 'warning'}
            </span>
            <span className="text-sm font-bold uppercase tracking-wider">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
