// src/components/Settings.jsx
import { useState } from 'react'
import { checkHealth } from '../engine/apiClient.js'

export default function Settings({ t, lang, theme, onLangChange, onThemeChange, onReset }) {
  const [confirmReset, setConfirmReset] = useState(false)
  const [healthMsg,    setHealthMsg]    = useState('')

  async function pingBackend() {
    setHealthMsg('Checking…')
    const h = await checkHealth()
    setHealthMsg(h ? `✅ Online · model: ${h.model}` : '❌ Backend unreachable — check Koyeb')
  }

  const langs  = [{ code:'fa', label:'فارسی', flag:'🇮🇷' }, { code:'en', label:'English', flag:'🇬🇧' }, { code:'de', label:'Deutsch', flag:'🇩🇪' }]

  return (
    <div className="settings-page">
      <h1 className="page-title">⚙️ {t.settings_title}</h1>

      <div className="settings-card">
        <div className="settings-label">🌐 {t.settings_lang}</div>
        <div className="lang-buttons">
          {langs.map(l => (
            <button key={l.code} className={`lang-btn ${lang===l.code?'active':''}`} onClick={() => onLangChange(l.code)}>
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-label">🎨 {t.settings_theme}</div>
        <div className="theme-buttons">
          <button className={`theme-btn ${theme==='light'?'active':''}`} onClick={() => onThemeChange('light')}>☀️ {t.settings_theme_light}</button>
          <button className={`theme-btn ${theme==='dark' ?'active':''}`} onClick={() => onThemeChange('dark')}>🌙 {t.settings_theme_dark}</button>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-label">🖥️ Backend Status</div>
        <button className="btn-outline" onClick={pingBackend}>Ping Koyeb Backend</button>
        {healthMsg && <p className="settings-hint">{healthMsg}</p>}
        <p className="settings-hint">Backend URL: {import.meta.env.VITE_API_URL || 'http://localhost:8000'}</p>
      </div>

      <div className="settings-card danger-card">
        <div className="settings-label">⚠️ {t.settings_reset}</div>
        {!confirmReset
          ? <button className="btn-danger" onClick={() => setConfirmReset(true)}>{t.settings_reset}</button>
          : <div className="confirm-row">
              <p>{t.settings_reset_confirm}</p>
              <div style={{display:'flex',gap:10}}>
                <button className="btn-danger" onClick={onReset}>✓ Confirm</button>
                <button className="btn-ghost" onClick={() => setConfirmReset(false)}>{t.btn_close}</button>
              </div>
            </div>
        }
      </div>

      <div className="settings-version">PSC AI-Agent v1.0.0 · AGPL-3.0 · Groq + Koyeb + Supabase</div>
    </div>
  )
}
