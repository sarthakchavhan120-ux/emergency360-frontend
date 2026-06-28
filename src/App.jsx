import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import StaffLoginPage from './pages/auth/StaffLoginPage'   // ← ADD THIS LINE
import PatientDashboard from './pages/patient/PatientDashboard'
import StaffDashboard from './pages/staff/StaffDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/staff" element={<StaffLoginPage />} />   {/* ← ADD THIS LINE */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/patient/dashboard" element={<PatientDashboard />} />
      <Route path="/staff/dashboard" element={<StaffDashboard />} />
    </Routes>
  )
}

export default App