import api from './api'

// GET /api/dashboard/summary
const getSummary = async () => {
  const response = await api.get('/api/dashboard/summary')
  return response.data.data
  // Returns: { totalIncome, totalExpenses, netBalance,
  //            categoryWiseTotals, monthlyTrends, recentActivity }
}

const dashboardService = { getSummary }
export default dashboardService
