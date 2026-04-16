import { useState, useEffect } from 'react'
import Navbar      from '../components/Navbar'
import Sidebar     from '../components/Sidebar'
import UserTable   from '../components/UserTable'
import UserModal   from '../components/UserModal'
import userService from '../services/userService'

const Users = () => {
  const [users, setUsers]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editUser, setEditUser]   = useState(null)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState('')
  const [toast, setToast]         = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await userService.getUsers()
      setUsers(data)
    } catch (err) {
      setError('Failed to load users.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditUser(null)
    setModalOpen(true)
  }

  const handleEdit = (user) => {
    setEditUser(user)
    setModalOpen(true)
  }

  const handleDeactivate = async (id) => {
    if (!window.confirm('Deactivate this user?')) return
    try {
      await userService.deleteUser(id)
      showToast('User deactivated successfully.')
      fetchUsers()
    } catch {
      setError('Failed to deactivate user.')
    }
  }

  const handleSubmit = async (formData) => {
    setSaving(true)
    try {
      if (editUser) {
        await userService.updateUser(editUser.id, formData)
        showToast('User updated successfully.')
      } else {
        await userService.createUser(formData)
        showToast('User created successfully.')
      }
      fetchUsers()
    } finally {
      setSaving(false)
    }
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
              <h2 className="text-xl font-semibold text-gray-900">Users</h2>
              <p className="text-sm text-gray-500 mt-0.5">Manage system users and their roles</p>
            </div>
            <button onClick={handleCreate} className="btn-primary text-sm">
              + New User
            </button>
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

          {/* Stats row */}
          {!loading && users.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['ADMIN', 'ANALYST', 'VIEWER'].map((role) => (
                <div key={role} className="card py-4">
                  <p className="text-xs text-gray-500 font-medium">{role}S</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {users.filter((u) => u.role === role).length}
                  </p>
                </div>
              ))}
              <div className="card py-4">
                <p className="text-xs text-gray-500 font-medium">TOTAL</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="card p-0 overflow-hidden">
            <UserTable
              users={users}
              onEdit={handleEdit}
              onDeactivate={handleDeactivate}
              loading={loading}
            />
          </div>

          {/* Modal */}
          <UserModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit}
            editUser={editUser}
            loading={saving}
          />
        </main>
      </div>
    </div>
  )
}

export default Users
