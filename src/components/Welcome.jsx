// src/components/Welcome.jsx
export default function Welcome({ t, hasProfile, onStart, onAssess }) {
  return (
    <div className="page-center welcome-page">
      <div className="welcome-hero">
        <div className="welcome-icon">🎯</div>
        <h1 className="welcome-title">{t.welcome_title}</h1>
        <p className="welcome-sub">{t.welcome_sub}</p>

        {hasProfile && (
          <div className="notice-box">
            <span>✅</span> {t.welcome_has_profile}
          </div>
        )}

        <div className="welcome-actions">
          {hasProfile ? (
            <>
              <button className="btn-primary" onClick={onStart}>
                {t.welcome_continue}
              </button>
              <button className="btn-outline" onClick={onAssess}>
                {t.nav_assessment}
              </button>
            </>
          ) : (
            <button className="btn-primary btn-large" onClick={onStart}>
              {t.welcome_start}
            </button>
          )}
        </div>
      </div>

      <div className="level-cards">
        {[
          { icon: '⚡', name: t.onboard_level1_name, desc: t.onboard_level1_desc, cls: 'level-1' },
          { icon: '🧩', name: t.onboard_level2_name, desc: t.onboard_level2_desc, cls: 'level-2' },
          { icon: '🌟', name: t.onboard_level3_name, desc: t.onboard_level3_desc, cls: 'level-3' },
        ].map(lv => (
          <div key={lv.cls} className={`level-card ${lv.cls}`}>
            <div className="lc-icon">{lv.icon}</div>
            <div className="lc-name">{lv.name}</div>
            <div className="lc-desc">{lv.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
