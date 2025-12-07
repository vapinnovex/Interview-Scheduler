import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </Router>
  )
}

export default App
