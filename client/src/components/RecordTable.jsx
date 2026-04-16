import useAuth from '../hooks/useAuth'

const RecordTable = ({ records, totalPages, currentPage, onPageChange, onEdit, onDelete, loading }) => {
  const { canCreate, canModify } = useAuth()

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No records found</p>
        <p className="text-sm mt-1">Try adjusting your filters or create a new record</p>
      </div>
    )
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Amount</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Notes</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Created By</th>
              {(canCreate || canModify) && (
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-700">{formatDate(record.date)}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{record.category}</td>
                <td className="px-4 py-3">
                  <span className={record.type === 'INCOME' ? 'badge-income' : 'badge-expense'}>
                    {record.type}
                  </span>
                </td>
                <td className={`px-4 py-3 text-right font-semibold ${
                  record.type === 'INCOME' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {record.type === 'EXPENSE' ? '-' : '+'}{formatAmount(record.amount)}
                </td>
                <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                  {record.notes || '—'}
                </td>
                <td className="px-4 py-3 text-gray-500">{record.createdByName}</td>
                {(canCreate || canModify) && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {canModify && (
                        <button
                          onClick={() => onEdit(record)}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Edit
                        </button>
                      )}
                      {canModify && (
                        <button
                          onClick={() => onDelete(record.id)}
                          className="text-xs text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 mt-2">
          <p className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecordTable
