import { useState, useEffect } from 'react'
import Navbar         from '../components/Navbar'
import Sidebar        from '../components/Sidebar'
import StatCard       from '../components/StatCard'
import CategoryChart  from '../components/CategoryChart'
import MonthlyChart   from '../components/MonthlyChart'
import Loader         from '../components/Loader'
import dashboardService from '../services/dashboardService'

const Dashboard = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    setLoading(true)
    try {
      const data = await dashboardService.getSummary()
      setSummary(data)
    } catch (err) {
      setError('Failed to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    })

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">

          {/* Page header */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500 mt-0.5">Financial overview and analytics</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {loading ? (
            <Loader />
          ) : summary ? (
            <>
              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  title="Total Income"
                  value={summary.totalIncome}
                  type="income"
                  icon="↑"
                />
                <StatCard
                  title="Total Expenses"
                  value={summary.totalExpenses}
                  type="expense"
                  icon="↓"
                />
                <StatCard
                  title="Net Balance"
                  value={summary.netBalance}
                  type="balance"
                  icon="="
                />
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Category Breakdown</h3>
                  <CategoryChart data={summary.categoryWiseTotals} />
                </div>
                <div className="card">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Trends</h3>
                  <MonthlyChart data={summary.monthlyTrends} />
                </div>
              </div>

              {/* Recent activity */}
              <div className="card">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
                {summary.recentActivity && summary.recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {summary.recentActivity.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            record.type === 'INCOME'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {record.type === 'INCOME' ? '↑' : '↓'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{record.category}</p>
                            <p className="text-xs text-gray-500">{formatDate(record.date)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-semibold ${
                            record.type === 'INCOME' ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {record.type === 'EXPENSE' ? '-' : '+'}{formatAmount(record.amount)}
                          </p>
                          <p className="text-xs text-gray-500">{record.createdByName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-6">No recent activity</p>
                )}
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
