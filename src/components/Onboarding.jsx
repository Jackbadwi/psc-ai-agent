// src/components/Onboarding.jsx
export default function Onboarding({ t, onBegin, onBack }) {
  return (
    <div className="page-center onboarding-page">
      <button className="btn-ghost back-btn" onClick={onBack}>← {t.btn_back}</button>

      <div className="onboard-card">
        <div className="onboard-icon">🧠</div>
        <h2 className="onboard-title">{t.onboard_step1_title}</h2>
        <p className="onboard-desc">{t.onboard_step1_desc}</p>

        <div className="onboard-levels">
          {[
            { num: 1, icon: '⚡', name: t.onboard_level1_name, desc: t.onboard_level1_desc, color: '#ef4444' },
            { num: 2, icon: '🧩', name: t.onboard_level2_name, desc: t.onboard_level2_desc, color: '#f59e0b' },
            { num: 3, icon: '🌟', name: t.onboard_level3_name, desc: t.onboard_level3_desc, color: '#667eea' },
          ].map(lv => (
            <div key={lv.num} className="onboard-level-row">
              <div className="olr-badge" style={{ background: lv.color }}>{lv.icon}</div>
              <div className="olr-text">
                <div className="olr-name">{lv.name}</div>
                <div className="olr-desc">{lv.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary btn-large" onClick={onBegin}>
          {t.onboard_begin} →
        </button>
      </div>
    </div>
  )
}
