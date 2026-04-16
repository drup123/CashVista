import { useState, useEffect } from 'react'

const EMPTY_FORM = {
  amount:   '',
  type:     'INCOME',
  category: '',
  date:     '',
  notes:    '',
}

const RecordModal = ({ isOpen, onClose, onSubmit, editRecord, loading }) => {
  const [form, setForm]     = useState(EMPTY_FORM)
  const [error, setError]   = useState('')

  useEffect(() => {
    if (editRecord) {
      setForm({
        amount:   editRecord.amount,
        type:     editRecord.type,
        category: editRecord.category,
        date:     editRecord.date,
        notes:    editRecord.notes || '',
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setError('')
  }, [editRecord, isOpen])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.amount || !form.category || !form.date) {
      setError('Amount, category and date are required.')
      return
    }
    if (parseFloat(form.amount) <= 0) {
      setError('Amount must be greater than 0.')
      return
    }

    try {
      await onSubmit({ ...form, amount: parseFloat(form.amount) })
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">
            {editRecord ? 'Edit Record' : 'New Record'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Amount *</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="input-field"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Type *</label>
              <select name="type" value={form.type} onChange={handleChange} className="input-field">
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Category *</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Salary, Rent, Freelance"
              className="input-field"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Date *</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Optional description..."
              rows={3}
              className="input-field resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Saving...' : editRecord ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecordModal
