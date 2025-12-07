import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LogOut, BarChart3, Users, Calendar, Mail } from 'lucide-react'

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
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-600">AI Interview System</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">
                    {user?.full_name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user?.full_name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
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
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user?.full_name}! 👋</h2>
          <p className="text-gray-600">Here's an overview of your interview management system.</p>
        </div>
        
        {/* User Info Card */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Full Name</p>
              <p className="text-lg font-medium text-gray-900 mt-1">{user?.full_name}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </p>
              <p className="text-lg font-medium text-gray-900 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Candidates Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Candidates</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <Users className="w-12 h-12 text-blue-500 opacity-50" />
            </div>
          </div>

          {/* Interviews Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Scheduled Interviews</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <Calendar className="w-12 h-12 text-green-500 opacity-50" />
            </div>
          </div>

          {/* Completed Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed Interviews</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <BarChart3 className="w-12 h-12 text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Module Status */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">✅</div>
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Module 2 - Admin Authentication Complete!</h3>
              <p className="text-green-800 mb-4">
                You've successfully set up the authentication system. Admin users can now register, login, and access the dashboard with secure JWT tokens.
              </p>
              <p className="text-sm text-green-700">
                <strong>What's working:</strong> User registration, login/logout, protected routes, persistent sessions, and secure token management.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Next Steps</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Module 3 - Candidate Registration & Profile Management
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Module 4 - Interview Scheduling & Calendar Integration
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Module 5 - AI-Powered Interview Analysis
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
