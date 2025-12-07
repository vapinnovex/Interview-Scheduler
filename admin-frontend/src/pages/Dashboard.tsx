import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LogOut, BarChart3, Users, Calendar } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-600">AI Interview System</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user?.full_name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Admin Dashboard</h2>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Candidates Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Candidates</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <Users className="w-12 h-12 text-blue-500 opacity-50" />
            </div>
          </div>

          {/* Interviews Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Scheduled Interviews</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <Calendar className="w-12 h-12 text-green-500 opacity-50" />
            </div>
          </div>

          {/* Completed Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed Interviews</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <BarChart3 className="w-12 h-12 text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Module 1 Setup Complete! ✅</h3>
          <p className="text-blue-800">
            All modules are initialized. You can now proceed with Module 2 - Admin Authentication & Dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
