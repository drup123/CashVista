import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loader from './Loader'

const PrivateRoute = ({ requiredRole }) => {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) return <Loader fullScreen />

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default PrivateRoute
