import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const roleBadgeClass = {
    ADMIN:   'badge-admin',
    ANALYST: 'badge-analyst',
    VIEWER:  'badge-viewer',
  }[user?.role] || 'badge-viewer'

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-bold">F</span>
        </div>
        <h1 className="text-lg font-semibold text-gray-900">Finance Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-700 text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <span className={roleBadgeClass}>{user?.role}</span>
        <button
          onClick={handleLogout}
          className="btn-secondary text-sm py-1.5"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
