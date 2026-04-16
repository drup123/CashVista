import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const CategoryChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No category data available
      </div>
    )
  }

  // Convert { Salary: { INCOME: 50000 }, Rent: { EXPENSE: 12000 } }
  // into [ { category: 'Salary', INCOME: 50000, EXPENSE: 0 }, ... ]
  const chartData = Object.entries(data).map(([category, values]) => ({
    category,
    INCOME:  values.INCOME  || 0,
    EXPENSE: values.EXPENSE || 0,
  }))

  const formatAmount = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR',
      notation: 'compact', maximumFractionDigits: 1
    }).format(value)

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="category"
          tick={{ fontSize: 11, fill: '#6b7280' }}
          angle={-35}
          textAnchor="end"
          interval={0}
        />
        <YAxis
          tickFormatter={formatAmount}
          tick={{ fontSize: 11, fill: '#6b7280' }}
          width={70}
        />
        <Tooltip
          formatter={(value) => formatAmount(value)}
          contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
        />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
        <Bar dataKey="INCOME"  fill="#22c55e" radius={[4, 4, 0, 0]} name="Income" />
        <Bar dataKey="EXPENSE" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CategoryChart
