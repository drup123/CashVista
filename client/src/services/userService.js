import api from './api'

// GET /api/users
const getUsers = async () => {
  const response = await api.get('/api/users')
  return response.data.data
}

// GET /api/users/:id
const getUserById = async (id) => {
  const response = await api.get(`/api/users/${id}`)
  return response.data.data
}

// POST /api/users
const createUser = async (user) => {
  const response = await api.post('/api/users', user)
  return response.data.data
}

// PUT /api/users/:id
const updateUser = async (id, user) => {
  const response = await api.put(`/api/users/${id}`, user)
  return response.data.data
}

// DELETE /api/users/:id  (soft deactivate)
const deleteUser = async (id) => {
  const response = await api.delete(`/api/users/${id}`)
  return response.data
}

const userService = { getUsers, getUserById, createUser, updateUser, deleteUser }
export default userService
