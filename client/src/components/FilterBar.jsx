const FilterBar = ({ filters, onChange, onReset }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value, page: 0 })
  }

  return (
    <div className="flex flex-wrap gap-3 items-end">
      {/* Type filter */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Type</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="input-field w-36"
        >
          <option value="">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
      </div>

      {/* Category filter */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Category</label>
        <input
          type="text"
          name="category"
          value={filters.category}
          onChange={handleChange}
          placeholder="e.g. Salary"
          className="input-field w-36"
        />
      </div>

      {/* Start date */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">From</label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="input-field w-40"
        />
      </div>

      {/* End date */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">To</label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="input-field w-40"
        />
      </div>

      {/* Reset */}
      <button onClick={onReset} className="btn-secondary text-sm py-2">
        Reset
      </button>
    </div>
  )
}

export default FilterBar
