// src/components/NavBar.jsx
export default function NavBar({ t, page, onNavigate, hasProfile }) {
  const items = [
    { id: 'profile',  label: t.nav_profile,    icon: '👤', req: true },
    { id: 'brainmap', label: t.nav_brain_map,   icon: '🧠', req: true },
    { id: 'chat',     label: t.nav_chat,        icon: '💬', req: true },
    { id: 'settings', label: t.nav_settings,    icon: '⚙️', req: false },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate(hasProfile ? 'profile' : 'welcome')}>
        <span className="brand-icon">🎯</span>
        <span className="brand-name">{t.app_name}</span>
      </div>
      <div className="navbar-links">
        {items.map(item => (
          (!item.req || hasProfile) && (
            <button
              key={item.id}
              className={`nav-item ${page === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          )
        ))}
      </div>
    </nav>
  )
}
