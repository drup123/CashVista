import api from './api'

// POST /api/auth/login
const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password })
  return response.data.data  // { token, tokenType, email, name, role }
}

// POST /api/auth/register
const register = async (name, email, password, role) => {
  const response = await api.post('/api/auth/register', { name, email, password, role })
  return response.data.data
}

const authService = { login, register }
export default authService
