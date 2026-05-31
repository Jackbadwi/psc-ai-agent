// src/App.jsx
import { useState, useEffect } from 'react'
import { translations } from './i18n/translations.js'
import Welcome    from './components/Welcome.jsx'
import Onboarding from './components/Onboarding.jsx'
import Assessment from './components/Assessment.jsx'
import Profile    from './components/Profile.jsx'
import BrainMap   from './components/BrainMap.jsx'
import Chat       from './components/Chat.jsx'
import Settings   from './components/Settings.jsx'
import NavBar     from './components/NavBar.jsx'

const KEYS = { lang:'psc_lang', profile:'psc_profile', theme:'psc_theme' }

export default function App() {
  const [lang,    setLang]    = useState(() => localStorage.getItem(KEYS.lang)  || 'fa')
  const [theme,   setTheme]   = useState(() => localStorage.getItem(KEYS.theme) || 'light')
  const [profile, setProfile] = useState(() => { try { return JSON.parse(localStorage.getItem(KEYS.profile)) } catch { return null } })
  const [page,    setPage]    = useState(() => localStorage.getItem(KEYS.profile) ? 'profile' : 'welcome')

  const t = translations[lang] || translations['fa']

  useEffect(() => { localStorage.setItem(KEYS.lang, lang); document.documentElement.lang = lang; document.documentElement.dir = t.dir }, [lang])
  useEffect(() => { localStorage.setItem(KEYS.theme, theme); document.documentElement.setAttribute('data-theme', theme) }, [theme])

  function saveProfile(p) { setProfile(p); localStorage.setItem(KEYS.profile, JSON.stringify(p)) }
  function resetProfile()  { setProfile(null); localStorage.removeItem(KEYS.profile); localStorage.removeItem('psc_chat_history'); setPage('welcome') }

  const showNav = !['welcome','onboarding','assessment'].includes(page)

  return (
    <div className={`app-root ${theme}`} dir={t.dir}>
      {showNav && <NavBar t={t} lang={lang} page={page} onNavigate={setPage} hasProfile={!!profile}/>}
      <main className="app-main">
        {page==='welcome'    && <Welcome    t={t} hasProfile={!!profile} onStart={() => setPage(profile?'profile':'onboarding')} onAssess={() => setPage('assessment')}/>}
        {page==='onboarding' && <Onboarding t={t} onBegin={() => setPage('assessment')} onBack={() => setPage('welcome')}/>}
        {page==='assessment' && <Assessment t={t} lang={lang} onComplete={p => { saveProfile(p); setPage('profile') }} onBack={() => setPage('welcome')}/>}
        {page==='profile'    && <Profile    t={t} lang={lang} profile={profile} onViewMap={() => setPage('brainmap')} onChat={() => setPage('chat')} onRetake={() => setPage('assessment')}/>}
        {page==='brainmap'   && <BrainMap   t={t} lang={lang} profile={profile} onBack={() => setPage('profile')}/>}
        {page==='chat'       && <Chat       t={t} lang={lang} profile={profile} onBack={() => setPage('profile')}/>}
        {page==='settings'   && <Settings   t={t} lang={lang} theme={theme} onLangChange={setLang} onThemeChange={setTheme} onReset={resetProfile}/>}
      </main>
    </div>
  )
}
