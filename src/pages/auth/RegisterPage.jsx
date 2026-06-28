import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'patient', department: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await registerUser(form)
      const data = res.data
      login(data)
      if (data.role === 'staff') {
        navigate('/staff/dashboard')
      } else {
        navigate('/patient/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0A1628, #132245)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚨</div>
          <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 700 }}>Create Account</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>Join Emergency360 today</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '2rem', backdropFilter: 'blur(12px)' }}>
          {error && (
            <div style={{ background: 'rgba(229,57,53,0.15)', border: '1px solid rgba(229,57,53,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#E53935', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
              <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
              <input type="tel" name="phone" placeholder="9876543210" value={form.phone} onChange={handleChange} required
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Password</label>
              <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Register As</label>
              <select name="role" value={form.role} onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem 1rem', background: '#132245', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', color: 'white', fontSize: '0.95rem', outline: 'none' }}>
                <option value="patient">Patient (Public User)</option>
                <option value="staff">Emergency Staff</option>
              </select>
            </div>

            {form.role === 'staff' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Department</label>
                <select name="department" value={form.department} onChange={handleChange} required
                  style={{ width: '100%', padding: '0.75rem 1rem', background: '#132245', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', color: 'white', fontSize: '0.95rem', outline: 'none' }}>
                  <option value="">Select Department</option>
                  <option value="ambulance">Ambulance</option>
                  <option value="police">Police</option>
                  <option value="fire">Fire Brigade</option>
                  <option value="disaster">Disaster Management</option>
                </select>
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #E53935, #c62828)', border: 'none', borderRadius: '0.75rem', color: 'white', fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem', boxShadow: '0 4px 20px rgba(229,57,53,0.4)', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#FDB813', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}