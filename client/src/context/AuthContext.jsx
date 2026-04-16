import { createContext, useState, useEffect } from 'react'
import authService from '../services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [token, setToken]     = useState(null)
  const [loading, setLoading] = useState(true)

  // On app load — restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser  = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const data = await authService.login(email, password)
    // data = { token, tokenType, email, name, role }
    const userInfo = { email: data.email, name: data.name, role: data.role }
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(userInfo))
    setToken(data.token)
    setUser(userInfo)
    return userInfo
  }

  const register = async (name, email, password, role) => {
    const data = await authService.register(name, email, password, role)
    const userInfo = { email: data.email, name: data.name, role: data.role }
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(userInfo))
    setToken(data.token)
    setUser(userInfo)
    return userInfo
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  // Helper role checks
  const isAdmin   = user?.role === 'ADMIN'
  const isAnalyst = user?.role === 'ANALYST'
  const isViewer  = user?.role === 'VIEWER'
  const canCreate = isAdmin || isAnalyst
  const canModify = isAdmin

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, register, logout,
      isAdmin, isAnalyst, isViewer,
      canCreate, canModify,
      isAuthenticated: !!token,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
