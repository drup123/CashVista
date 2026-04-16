import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const MonthlyChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No monthly data available
      </div>
    )
  }

  // Convert { "2024-03": { INCOME: 59500, EXPENSE: 17200 }, ... }
  // into sorted array [ { month: 'Mar 24', INCOME: 59500, EXPENSE: 17200 }, ... ]
  const chartData = Object.entries(data)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, values]) => {
      const [year, month] = monthKey.split('-')
      const date = new Date(parseInt(year), parseInt(month) - 1)
      return {
        month:   date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
        INCOME:  values.INCOME  || 0,
        EXPENSE: values.EXPENSE || 0,
      }
    })

  const formatAmount = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR',
      notation: 'compact', maximumFractionDigits: 1
    }).format(value)

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
        <YAxis
          tickFormatter={formatAmount}
          tick={{ fontSize: 11, fill: '#6b7280' }}
          width={70}
        />
        <Tooltip
          formatter={(value) => formatAmount(value)}
          contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        <Line
          type="monotone"
          dataKey="INCOME"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 4 }}
          name="Income"
        />
        <Line
          type="monotone"
          dataKey="EXPENSE"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ r: 4 }}
          name="Expense"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default MonthlyChart
