import { Link } from 'react-router-dom'
import {
  MdLocalHospital,
  MdLocalPolice,
  MdFireTruck,
  MdWarning,
  MdPhone,
  MdShield,
  MdSpeed,
  MdLocationOn
} from 'react-icons/md'
import { FaAmbulance, FaChild, FaFemale } from 'react-icons/fa'
import { BsPersonFill } from 'react-icons/bs'

const services = [
  { icon: <MdPhone size={32} />, title: 'National Emergency', number: '112', desc: 'All-in-one emergency helpline for immediate assistance', color: '#E53935' },
  { icon: <MdLocalPolice size={32} />, title: 'Police', number: '100', desc: 'Law enforcement and crime response', color: '#1565C0' },
  { icon: <MdFireTruck size={32} />, title: 'Fire Brigade', number: '101', desc: 'Fire fighting and rescue operations', color: '#E53935' },
  { icon: <FaAmbulance size={32} />, title: 'Ambulance', number: '108', desc: 'Medical emergency and patient transport', color: '#2E7D32' },
  { icon: <MdWarning size={32} />, title: 'Disaster Management', number: '1078', desc: 'Natural disaster relief and rescue', color: '#F57F17' },
  { icon: <FaFemale size={32} />, title: 'Women Helpline', number: '1091', desc: 'Safety and support for women in distress', color: '#AD1457' },
  { icon: <FaChild size={32} />, title: 'Child Helpline', number: '1098', desc: 'Protection and support for children', color: '#6A1B9A' },
  { icon: <BsPersonFill size={32} />, title: 'Senior Citizen', number: '14567', desc: 'Dedicated helpline for senior citizens', color: '#00838F' },
]

const features = [
  { icon: <MdSpeed size={28} />, title: 'Instant Response', desc: 'Get help within minutes with our rapid dispatch system' },
  { icon: <MdLocationOn size={28} />, title: 'Live Location', desc: 'Auto-detect your GPS location for faster emergency response' },
  { icon: <MdShield size={28} />, title: 'Always Available', desc: '24/7 emergency assistance, 365 days a year' },
]

export default function LandingPage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #132245 50%, #0A1628 100%)', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(10,22,40,0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E53935, #c62828)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 'bold'
          }}>🚨</div>
          <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'white' }}>
            Emergency<span style={{ color: '#E53935' }}>360</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" style={{
            padding: '0.5rem 1.25rem',
            border: '1.5px solid rgba(255,255,255,0.3)',
            borderRadius: '0.5rem',
            color: 'white',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500
          }}>Login</Link>
          <Link to="/register" style={{
            padding: '0.5rem 1.25rem',
            background: 'linear-gradient(135deg, #E53935, #c62828)',
            borderRadius: '0.5rem',
            color: 'white',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            boxShadow: '0 4px 15px rgba(229,57,53,0.4)'
          }}>Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '5rem 2rem 4rem' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(229,57,53,0.15)',
          border: '1px solid rgba(229,57,53,0.3)',
          borderRadius: '2rem',
          padding: '0.4rem 1.2rem',
          color: '#E53935',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          letterSpacing: '0.05em'
        }}>
          🚨 EMERGENCY RESPONSE PLATFORM
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          color: 'white',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto 1.5rem'
        }}>
          Help is Just One<br />
          <span style={{
            background: 'linear-gradient(135deg, #E53935, #FDB813)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Tap Away</span>
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '1.15rem',
          maxWidth: '560px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7
        }}>
          Connect instantly with police, ambulance, fire brigade, and disaster management teams. Fast, reliable, available 24/7.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{
            padding: '0.9rem 2rem',
            background: 'linear-gradient(135deg, #E53935, #c62828)',
            borderRadius: '0.75rem',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
            boxShadow: '0 6px 24px rgba(229,57,53,0.5)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🚨 Get Emergency Help
          </Link>
          <Link to="/login/staff" style={{
            padding: '0.9rem 2rem',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRadius: '0.75rem',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            background: 'rgba(255,255,255,0.05)'
          }}>
            Staff Login →
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          marginTop: '4rem',
          flexWrap: 'wrap'
        }}>
          {[
            { value: '< 3 min', label: 'Avg Response Time' },
            { value: '8+', label: 'Emergency Services' },
            { value: '24/7', label: 'Always Available' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FDB813' }}>{stat.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1rem',
              padding: '1.75rem',
              backdropFilter: 'blur(12px)'
            }}>
              <div style={{ color: '#FDB813', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Services */}
      <section style={{ padding: '3rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: 'white', fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Emergency Services
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem' }}>
          All critical services available at your fingertips
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {services.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '1rem',
              padding: '1.5rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.3)`
                e.currentTarget.style.borderColor = s.color + '55'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
              }}
            >
              <div style={{ color: s.color, marginBottom: '0.75rem' }}>{s.icon}</div>
              <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '0.25rem' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: '1rem', lineHeight: 1.5 }}>{s.desc}</p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: s.color + '20',
                border: `1px solid ${s.color}40`,
                borderRadius: '2rem',
                padding: '0.3rem 0.9rem',
                color: s.color,
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                📞 {s.number}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '2rem',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.35)',
        fontSize: '0.85rem'
      }}>
        © 2026 Emergency360 — Final Year Project. Built for educational purposes.
      </footer>

    </div>
  )
}