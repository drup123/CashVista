import { useState, useEffect } from 'react'

const EMPTY_FORM = {
  name:     '',
  email:    '',
  password: '',
  role:     'VIEWER',
  active:   true,
}

const UserModal = ({ isOpen, onClose, onSubmit, editUser, loading }) => {
  const [form, setForm]   = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editUser) {
      setForm({
        name:     editUser.name,
        email:    editUser.email,
        password: '',
        role:     editUser.role,
        active:   editUser.active,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setError('')
  }, [editUser, isOpen])

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email) {
      setError('Name and email are required.')
      return
    }
    if (!editUser && form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    try {
      const payload = editUser
        ? { name: form.name, role: form.role, active: form.active }
        : { name: form.name, email: form.email, password: form.password, role: form.role }

      await onSubmit(payload)
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">
            {editUser ? 'Edit User' : 'Create User'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Full Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="input-field"
              required
            />
          </div>

          {!editUser && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className="input-field"
                  required
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Role *</label>
            <select name="role" value={form.role} onChange={handleChange} className="input-field">
              <option value="VIEWER">Viewer</option>
              <option value="ANALYST">Analyst</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {editUser && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={form.active}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <label htmlFor="active" className="text-sm text-gray-700">Active user</label>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Saving...' : editUser ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserModal
