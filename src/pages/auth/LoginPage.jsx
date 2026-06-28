import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await loginUser(form)
      login(data)
      if (data.role === 'staff') navigate('/staff/dashboard')
      else navigate('/patient/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0A1628, #132245)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚨</div>
          <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 700 }}>Welcome Back</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>Login to Emergency360</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '2rem', backdropFilter: 'blur(12px)' }}>
          {error && (
            <div style={{ background: 'rgba(229,57,53,0.15)', border: '1px solid rgba(229,57,53,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#E53935', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Password</label>
              <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #E53935, #c62828)', border: 'none', borderRadius: '0.75rem', color: 'white', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(229,57,53,0.4)' }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#FDB813', textDecoration: 'none', fontWeight: 600 }}>Register</Link>
          </p>

          <p style={{ textAlign: 'center', marginTop: '0.75rem' }}>
            <Link to="/login/staff" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none' }}>Staff Login →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}