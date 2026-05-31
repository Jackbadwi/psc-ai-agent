// src/components/Profile.jsx
import { getSuggestedInterventions } from '../engine/pscEngine.js'

const LEVEL_COLORS = { 1: '#ef4444', 2: '#f59e0b', 3: '#667eea' }
const LEVEL_ICONS  = { 1: '⚡', 2: '🧩', 3: '🌟' }
const LIMINAL_ICONS = { impulsive: '🌊', questioning: '🔍', transcendent: '✨' }

function BarChart({ data, colors }) {
  const max = Math.max(...Object.values(data), 1)
  return (
    <div className="bar-chart">
      {Object.entries(data).map(([key, val]) => (
        <div key={key} className="bar-row">
          <div className="bar-label">{key}</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ width: `${Math.round(val / max * 100)}%`, background: colors?.[key] || '#667eea' }}
            />
          </div>
          <div className="bar-val">{typeof val === 'number' ? Math.round(val) : val}%</div>
        </div>
      ))}
    </div>
  )
}

function RadarChart({ data, size = 200 }) {
  const keys = Object.keys(data)
  const vals = Object.values(data)
  const n = keys.length
  if (n < 3) return null
  const cx = size / 2, cy = size / 2, r = size * 0.38
  const pts = keys.map((_, i) => {
    const angle = (Math.PI * 2 / n) * i - Math.PI / 2
    const v = Math.min(vals[i] / 100, 1)
    return {
      x: cx + Math.cos(angle) * r * v,
      y: cy + Math.sin(angle) * r * v,
      lx: cx + Math.cos(angle) * (r + 18),
      ly: cy + Math.sin(angle) * (r + 18),
      label: keys[i].slice(0, 5),
    }
  })
  const polygon = pts.map(p => `${p.x},${p.y}`).join(' ')
  const axes = keys.map((_, i) => {
    const angle = (Math.PI * 2 / n) * i - Math.PI / 2
    return { x2: cx + Math.cos(angle) * r, y2: cy + Math.sin(angle) * r }
  })
  return (
    <svg width={size} height={size} className="radar-svg">
      {[0.25, 0.5, 0.75, 1].map(sc => {
        const ring = axes.map((a, i) => {
          const angle = (Math.PI * 2 / n) * i - Math.PI / 2
          return `${cx + Math.cos(angle)*r*sc},${cy + Math.sin(angle)*r*sc}`
        }).join(' ')
        return <polygon key={sc} points={ring} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      })}
      {axes.map((a, i) => (
        <line key={i} x1={cx} y1={cy} x2={a.x2} y2={a.y2} stroke="#d1d5db" strokeWidth="1" />
      ))}
      <polygon points={polygon} fill="rgba(102,126,234,0.25)" stroke="#667eea" strokeWidth="2" />
      {pts.map((p, i) => (
        <text key={i} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle"
          fontSize="10" fill="#6b7280">{p.label}</text>
      ))}
    </svg>
  )
}

export default function Profile({ t, lang, profile, onViewMap, onChat, onRetake }) {
  if (!profile) return null

  const { dominantLevel, liminalState, personalityScores, maslowScores, levelScores, scapesScores } = profile
  const interventions = getSuggestedInterventions(profile, lang)

  const levelLabel = { fa: { 1:'غریزی', 2:'شناختی', 3:'فراشناختی' }, en: { 1:'Instinctive', 2:'Cognitive', 3:'Metacognitive' }, de: { 1:'Instinktiv', 2:'Kognitiv', 3:'Metakognitiv' } }[lang] || { 1:'Instinctive', 2:'Cognitive', 3:'Metacognitive' }
  const liminalLabel = { fa: { impulsive:'تکانشی', questioning:'پرسشگری', transcendent:'فراشناختی-خلاق' }, en: { impulsive:'Impulsive', questioning:'Questioning', transcendent:'Transcendent' }, de: { impulsive:'Impulsiv', questioning:'Hinterfragend', transcendent:'Transzendent' } }[lang] || {}

  const levelPctData = {
    [`L1 ${levelLabel[1]}`]: Math.round(levelScores.level1 / 5 * 100),
    [`L2 ${levelLabel[2]}`]: Math.round(levelScores.level2 / 5 * 100),
    [`L3 ${levelLabel[3]}`]: Math.round(levelScores.level3 / 5 * 100),
  }

  const maslowLabels = {
    fa: { physiological:'فیزیولوژیک', safety:'ایمنی', belonging:'تعلق', esteem:'احترام', selfActualization:'خودشکوفایی' },
    en: { physiological:'Physical', safety:'Safety', belonging:'Belonging', esteem:'Esteem', selfActualization:'Self-Act.' },
    de: { physiological:'Physiolog.', safety:'Sicherheit', belonging:'Zugehörig.', esteem:'Wertsch.', selfActualization:'Selbstverw.' },
  }[lang] || {}

  const maslowDisplay = {}
  Object.entries(maslowScores).forEach(([k, v]) => {
    maslowDisplay[maslowLabels[k] || k] = Math.round(v / 5 * 100)
  })

  const persDisplay = {}
  const persLabels = {
    fa: { extraversion:'برون‌گرا', agreeableness:'توافق‌پذیر', conscientiousness:'وظیفه‌شناس', neuroticism:'روان‌رنجور', openness:'گشوده' },
    en: { extraversion:'Extrav.', agreeableness:'Agreeable', conscientiousness:'Conscient.', neuroticism:'Neurotic', openness:'Openness' },
    de: { extraversion:'Extraver.', agreeableness:'Verträgl.', conscientiousness:'Gewissnh.', neuroticism:'Neurotic.', openness:'Offenheit' },
  }[lang] || {}
  Object.entries(personalityScores).forEach(([k, v]) => {
    persDisplay[persLabels[k] || k] = v
  })

  return (
    <div className="profile-page">
      <h1 className="page-title">{t.profile_title}</h1>

      {/* Hero cards */}
      <div className="hero-cards">
        <div className="hero-card dominant" style={{ borderColor: LEVEL_COLORS[dominantLevel] }}>
          <div className="hc-icon">{LEVEL_ICONS[dominantLevel]}</div>
          <div className="hc-sub">{t.profile_dominant}</div>
          <div className="hc-val" style={{ color: LEVEL_COLORS[dominantLevel] }}>
            {`L${dominantLevel} — ${levelLabel[dominantLevel]}`}
          </div>
        </div>
        <div className="hero-card">
          <div className="hc-icon">{liminalState ? LIMINAL_ICONS[liminalState] : '—'}</div>
          <div className="hc-sub">{t.profile_liminal}</div>
          <div className="hc-val">
            {liminalState ? (liminalLabel[liminalState] || liminalState) : t.profile_liminal_none}
          </div>
        </div>
      </div>

      {/* Level scores */}
      <div className="section-card">
        <h3 className="sc-title">🧠 {t.nav_assessment}</h3>
        <BarChart data={levelPctData} colors={{ [`L1 ${levelLabel[1]}`]: '#ef4444', [`L2 ${levelLabel[2]}`]: '#f59e0b', [`L3 ${levelLabel[3]}`]: '#667eea' }} />
      </div>

      {/* Personality */}
      <div className="section-card">
        <h3 className="sc-title">🌟 {t.profile_personality}</h3>
        <div className="radar-row">
          <RadarChart data={persDisplay} size={220} />
          <BarChart data={persDisplay} />
        </div>
      </div>

      {/* Maslow */}
      <div className="section-card">
        <h3 className="sc-title">🏔️ {t.profile_maslow}</h3>
        <BarChart data={maslowDisplay} />
      </div>

      {/* Interventions */}
      {interventions.length > 0 && (
        <div className="section-card intervention-card">
          <h3 className="sc-title">💡 {t.intervention_title}</h3>
          {interventions.map((iv, i) => (
            <div key={i} className="iv-item">
              <div className="iv-label">{iv.label}</div>
              <div className="iv-text">{iv.text}</div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="profile-actions">
        <button className="btn-primary" onClick={onChat}>💬 {t.profile_chat_now}</button>
        <button className="btn-outline" onClick={onViewMap}>🧠 {t.profile_view_map}</button>
        <button className="btn-ghost" onClick={onRetake}>🔄 {t.profile_retake}</button>
      </div>

      {profile.updatedAt && (
        <div className="updated-at">
          {t.updated_at}: {new Date(profile.updatedAt).toLocaleDateString(lang === 'fa' ? 'fa-IR' : lang === 'de' ? 'de-DE' : 'en-GB')}
        </div>
      )}
    </div>
  )
}
