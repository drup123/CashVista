import { useState, useEffect } from 'react'
import Navbar       from '../components/Navbar'
import Sidebar      from '../components/Sidebar'
import RecordTable  from '../components/RecordTable'
import RecordModal  from '../components/RecordModal'
import FilterBar    from '../components/FilterBar'
import useAuth      from '../hooks/useAuth'
import recordService from '../services/recordService'

const DEFAULT_FILTERS = {
  type: '', category: '', startDate: '', endDate: '', page: 0, size: 10
}

const Records = () => {
  const { canCreate, canModify } = useAuth()

  const [records, setRecords]       = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters]       = useState(DEFAULT_FILTERS)
  const [loading, setLoading]       = useState(true)
  const [modalOpen, setModalOpen]   = useState(false)
  const [editRecord, setEditRecord] = useState(null)
  const [saving, setSaving]         = useState(false)
  const [error, setError]           = useState('')
  const [toast, setToast]           = useState('')

  useEffect(() => {
    fetchRecords()
  }, [filters])

  const fetchRecords = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await recordService.getRecords(filters)
      setRecords(data.content || [])
      setTotalPages(data.totalPages || 0)
    } catch (err) {
      setError('Failed to load records.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditRecord(null)
    setModalOpen(true)
  }

  const handleEdit = (record) => {
    setEditRecord(record)
    setModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return
    try {
      await recordService.deleteRecord(id)
      showToast('Record deleted successfully.')
      fetchRecords()
    } catch {
      setError('Failed to delete record.')
    }
  }

  const handleSubmit = async (formData) => {
    setSaving(true)
    try {
      if (editRecord) {
        await recordService.updateRecord(editRecord.id, formData)
        showToast('Record updated successfully.')
      } else {
        await recordService.createRecord(formData)
        showToast('Record created successfully.')
      }
      fetchRecords()
    } finally {
      setSaving(false)
    }
  }

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }))
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS)
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Financial Records</h2>
              <p className="text-sm text-gray-500 mt-0.5">Manage income and expense records</p>
            </div>
            {canCreate && (
              <button onClick={handleCreate} className="btn-primary text-sm">
                + New Record
              </button>
            )}
          </div>

          {/* Toast */}
          {toast && (
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg border border-green-200">
              {toast}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* Filters */}
          <div className="card">
            <FilterBar
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>

          {/* Table */}
          <div className="card p-0 overflow-hidden">
            <RecordTable
              records={records}
              totalPages={totalPages}
              currentPage={filters.page}
              onPageChange={handlePageChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>

          {/* Modal */}
          <RecordModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit}
            editRecord={editRecord}
            loading={saving}
          />
        </main>
      </div>
    </div>
  )
}

export default Records
