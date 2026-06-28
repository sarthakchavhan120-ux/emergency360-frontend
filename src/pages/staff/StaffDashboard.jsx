import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getDepartmentRequests, updateRequestStatus } from '../../services/api'
import { MdLogout, MdLocationOn, MdRefresh } from 'react-icons/md'

const statusColors = {
  waiting: '#FDB813',
  accepted: '#1565C0',
  ontheway: '#6A1B9A',
  completed: '#2E7D32',
  rejected: '#E53935',
}

const statusFlow = {
  waiting: ['accepted', 'rejected'],
  accepted: ['ontheway'],
  ontheway: ['completed'],
  completed: [],
  rejected: [],
}

const statusLabels = {
  waiting: '⏳ Waiting',
  accepted: '✅ Accepted',
  ontheway: '🚗 On The Way',
  completed: '✔️ Completed',
  rejected: '❌ Rejected',
}

export default function StaffDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.role !== 'staff') { navigate('/patient/dashboard'); return }
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const { data } = await getDepartmentRequests()
      setRequests(data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleStatusUpdate = async (id, status) => {
    setUpdating(id + status)
    try {
      await updateRequestStatus(id, status)
      fetchRequests()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status')
    }
    setUpdating(null)
  }

  const handleLogout = () => { logout(); navigate('/') }

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)

  const deptColors = {
    ambulance: '#2E7D32',
    police: '#1565C0',
    fire: '#E53935',
    disaster: '#F57F17',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0A1628, #132245)' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(10,22,40,0.9)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🚨</span>
          <div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>Emergency<span style={{ color: '#E53935' }}>360</span></span>
            <div style={{ fontSize: '0.75rem', color: deptColors[user?.department] || '#FDB813', fontWeight: 600, textTransform: 'uppercase' }}>
              {user?.department} Department
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={fetchRequests} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', color: 'white', padding: '0.4rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <MdRefresh /> Refresh
          </button>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>👤 {user?.name}</span>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(229,57,53,0.15)', border: '1px solid rgba(229,57,53,0.3)', borderRadius: '0.5rem', color: '#E53935', padding: '0.4rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <MdLogout /> Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total', value: requests.length, color: 'white' },
            { label: 'Waiting', value: requests.filter(r => r.status === 'waiting').length, color: '#FDB813' },
            { label: 'Active', value: requests.filter(r => r.status === 'accepted' || r.status === 'ontheway').length, color: '#1565C0' },
            { label: 'Completed', value: requests.filter(r => r.status === 'completed').length, color: '#2E7D32' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['all', 'waiting', 'accepted', 'ontheway', 'completed', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '0.4rem 1rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, background: filter === f ? (statusColors[f] || '#E53935') : 'rgba(255,255,255,0.08)', color: 'white', textTransform: 'capitalize' }}>
              {f === 'all' ? '📋 All' : statusLabels[f]}
            </button>
          ))}
        </div>

        {/* Requests */}
        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '3rem' }}>Loading requests...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            No requests found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map((r) => (
              <div key={r._id} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${statusColors[r.status]}30`, borderRadius: '1rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{r.patientName}</h3>
                      <span style={{ background: statusColors[r.status] + '25', border: `1px solid ${statusColors[r.status]}50`, borderRadius: '2rem', padding: '0.2rem 0.75rem', color: statusColors[r.status], fontSize: '0.78rem', fontWeight: 700 }}>
                        {statusLabels[r.status]}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem' }}>📞 {r.patientPhone}</p>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem' }}>🚨 Service: <span style={{ color: 'white', textTransform: 'capitalize' }}>{r.serviceType}</span></p>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem' }}>📍 {r.address}</p>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem' }}>🕐 {new Date(r.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '180px' }}>
                    <a href={r.googleMapsLink} target="_blank" rel="noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(253,184,19,0.15)', border: '1px solid rgba(253,184,19,0.3)', borderRadius: '0.5rem', padding: '0.5rem', color: '#FDB813', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                      <MdLocationOn /> View Location
                    </a>

                    {statusFlow[r.status].map(nextStatus => (
                      <button key={nextStatus}
                        onClick={() => handleStatusUpdate(r._id, nextStatus)}
                        disabled={updating === r._id + nextStatus}
                        style={{ padding: '0.5rem', background: statusColors[nextStatus], border: 'none', borderRadius: '0.5rem', color: 'white', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                        {updating === r._id + nextStatus ? '...' : nextStatus === 'accepted' ? '✅ Accept' : nextStatus === 'rejected' ? '❌ Reject' : nextStatus === 'ontheway' ? '🚗 On The Way' : '✔️ Complete'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}