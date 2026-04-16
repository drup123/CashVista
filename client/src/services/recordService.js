import api from './api'

// GET /api/records  (with optional filters)
const getRecords = async (filters = {}) => {
  const params = {}
  if (filters.type)      params.type      = filters.type
  if (filters.category)  params.category  = filters.category
  if (filters.startDate) params.startDate = filters.startDate
  if (filters.endDate)   params.endDate   = filters.endDate
  if (filters.page !== undefined) params.page = filters.page
  if (filters.size !== undefined) params.size = filters.size

  const response = await api.get('/api/records', { params })
  return response.data.data  // Page object { content, totalElements, totalPages, ... }
}

// GET /api/records/:id
const getRecordById = async (id) => {
  const response = await api.get(`/api/records/${id}`)
  return response.data.data
}

// POST /api/records
const createRecord = async (record) => {
  const response = await api.post('/api/records', record)
  return response.data.data
}

// PUT /api/records/:id
const updateRecord = async (id, record) => {
  const response = await api.put(`/api/records/${id}`, record)
  return response.data.data
}

// DELETE /api/records/:id
const deleteRecord = async (id) => {
  const response = await api.delete(`/api/records/${id}`)
  return response.data
}

const recordService = { getRecords, getRecordById, createRecord, updateRecord, deleteRecord }
export default recordService
