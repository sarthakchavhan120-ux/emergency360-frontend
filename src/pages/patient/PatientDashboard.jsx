import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { createRequest, getMyRequests } from '../../services/api'
import { MdLocalPolice, MdFireTruck, MdWarning, MdPhone, MdLocationOn, MdHistory, MdLogout } from 'react-icons/md'
import { FaAmbulance, FaChild, FaFemale } from 'react-icons/fa'
import { BsPersonFill } from 'react-icons/bs'

const services = [
  { icon: <MdPhone size={28} />, title: 'National Emergency', number: '112', type: 'national', color: '#E53935' },
  { icon: <MdLocalPolice size={28} />, title: 'Police', number: '100', type: 'police', color: '#1565C0' },
  { icon: <MdFireTruck size={28} />, title: 'Fire Brigade', number: '101', type: 'fire', color: '#E53935' },
  { icon: <FaAmbulance size={28} />, title: 'Ambulance', number: '108', type: 'ambulance', color: '#2E7D32' },
  { icon: <MdWarning size={28} />, title: 'Disaster', number: '1078', type: 'disaster', color: '#F57F17' },
  { icon: <FaFemale size={28} />, title: 'Women Helpline', number: '1091', type: 'women', color: '#AD1457' },
  { icon: <FaChild size={28} />, title: 'Child Helpline', number: '1098', type: 'child', color: '#6A1B9A' },
  { icon: <BsPersonFill size={28} />, title: 'Senior Citizen', number: '14567', type: 'senior', color: '#00838F' },
]

const statusColors = {
  waiting: '#FDB813',
  accepted: '#1565C0',
  ontheway: '#6A1B9A',
  completed: '#2E7D32',
  rejected: '#E53935',
}

export default function PatientDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [location, setLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [sosLoading, setSosLoading] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.role !== 'patient') { navigate('/staff/dashboard'); return }
    getLocation()
    fetchRequests()
  }, [])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocationError('Location access denied. Please enable GPS.')
      )
    }
  }

  const fetchRequests = async () => {
    try {
      const { data } = await getMyRequests()
      setRequests(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSOS = async (serviceType) => {
    if (!location) { alert('Please enable location access first!'); return }
    setSosLoading(serviceType)
    try {
      await createRequest({
        serviceType,
        latitude: location.lat,
        longitude: location.lng,
        address: `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}`
      })
      setSuccessMsg(`✅ Emergency request sent for ${serviceType.toUpperCase()}! Help is on the way.`)
      setTimeout(() => setSuccessMsg(''), 4000)
      fetchRequests()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send request')
    }
    setSosLoading(null)
  }

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0A1628, #132245)' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(10,22,40,0.9)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🚨</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>Emergency<span style={{ color: '#E53935' }}>360</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>👤 {user?.name}</span>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(229,57,53,0.15)', border: '1px solid rgba(229,57,53,0.3)', borderRadius: '0.5rem', color: '#E53935', padding: '0.4rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <MdLogout /> Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {['dashboard', 'history'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: '0.6rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', background: activeTab === tab ? 'linear-gradient(135deg, #E53935, #c62828)' : 'rgba(255,255,255,0.08)', color: 'white' }}>
              {tab === 'dashboard' ? '🏠 Dashboard' : '📋 My Requests'}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Success Message */}
            {successMsg && (
              <div style={{ background: 'rgba(46,125,50,0.2)', border: '1px solid rgba(46,125,50,0.4)', borderRadius: '0.75rem', padding: '1rem 1.5rem', color: '#4CAF50', marginBottom: '1.5rem', fontWeight: 600 }}>
                {successMsg}
              </div>
            )}

            {/* SOS Button */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {location ? `📍 Location detected: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : locationError || '📍 Detecting your location...'}
              </div>
              <button
                onClick={() => handleSOS('national')}
                disabled={sosLoading === 'national'}
                style={{
                  width: '160px', height: '160px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E53935, #b71c1c)',
                  border: '4px solid rgba(229,57,53,0.4)',
                  color: 'white', fontSize: '1.1rem', fontWeight: 800,
                  cursor: 'pointer', boxShadow: '0 0 0 0 rgba(229,57,53,0.7)',
                  animation: 'sosPulse 1.5s ease-in-out infinite',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', margin: '0 auto'
                }}>
                <span style={{ fontSize: '2.5rem' }}>🆘</span>
                <span>SOS</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.8 }}>Press for help</span>
              </button>
              <style>{`@keyframes sosPulse { 0%,100%{box-shadow:0 0 0 0 rgba(229,57,53,0.7)} 50%{box-shadow:0 0 0 20px rgba(229,57,53,0)} }`}</style>
            </div>

            {/* Location Map Link */}
            {location && (
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <a href={`https://www.google.com/maps?q=${location.lat},${location.lng}`} target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', padding: '0.5rem 1rem', color: '#FDB813', textDecoration: 'none', fontSize: '0.9rem' }}>
                  <MdLocationOn /> View My Location on Google Maps
                </a>
              </div>
            )}

            {/* Service Cards */}
            <h2 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '1.2rem' }}>🚨 Request Emergency Service</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {services.map((s) => (
                <div key={s.type} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1.25rem' }}>
                  <div style={{ color: s.color, marginBottom: '0.5rem' }}>{s.icon}</div>
                  <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{s.title}</h3>
                  <p style={{ color: s.color, fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>📞 {s.number}</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a href={`tel:${s.number}`} style={{ flex: 1, padding: '0.5rem', background: s.color + '20', border: `1px solid ${s.color}40`, borderRadius: '0.5rem', color: s.color, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}>
                      📞 Call
                    </a>
                    <button onClick={() => handleSOS(s.type)} disabled={sosLoading === s.type}
                      style={{ flex: 1, padding: '0.5rem', background: s.color, border: 'none', borderRadius: '0.5rem', color: 'white', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                      {sosLoading === s.type ? '...' : '🆘 Help'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 style={{ color: 'white', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.2rem' }}>📋 My Emergency Requests</h2>
            {requests.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '3rem' }}>No requests yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {requests.map((r) => (
                  <div key={r._id} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem', textTransform: 'capitalize' }}>{r.serviceType} Emergency</span>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{new Date(r.createdAt).toLocaleString()}</p>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>📍 {r.address}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                        <span style={{ background: statusColors[r.status] + '25', border: `1px solid ${statusColors[r.status]}50`, borderRadius: '2rem', padding: '0.3rem 0.9rem', color: statusColors[r.status], fontSize: '0.8rem', fontWeight: 700, textTransform: 'capitalize' }}>
                          {r.status}
                        </span>
                        <a href={r.googleMapsLink} target="_blank" rel="noreferrer" style={{ color: '#FDB813', fontSize: '0.8rem', textDecoration: 'none' }}>📍 View on Map</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}