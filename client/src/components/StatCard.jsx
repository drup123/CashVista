const StatCard = ({ title, value, type, icon }) => {
  const colorMap = {
    income:  'bg-green-50 text-green-700 border-green-100',
    expense: 'bg-red-50 text-red-700 border-red-100',
    balance: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    default: 'bg-gray-50 text-gray-700 border-gray-100',
  }

  const valueColorMap = {
    income:  'text-green-700',
    expense: 'text-red-700',
    balance: value >= 0 ? 'text-indigo-700' : 'text-red-700',
    default: 'text-gray-900',
  }

  const cardColor  = colorMap[type]  || colorMap.default
  const valueColor = valueColorMap[type] || valueColorMap.default

  const formatted = new Intl.NumberFormat('en-IN', {
    style:    'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value || 0)

  return (
    <div className={`rounded-xl border p-5 ${cardColor}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium opacity-75">{title}</p>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <p className={`text-2xl font-bold ${valueColor}`}>{formatted}</p>
    </div>
  )
}

export default StatCard
