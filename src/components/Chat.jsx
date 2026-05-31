// src/components/Chat.jsx — uses Koyeb backend (Groq AI, no API key in browser)
import { useState, useRef, useEffect } from 'react'
import { buildSystemPrompt, getSuggestedInterventions } from '../engine/pscEngine.js'
import { sendChat, checkHealth, getOrCreateUserId } from '../engine/apiClient.js'

const STORAGE_KEY = 'psc_chat_history'

export default function Chat({ t, lang, profile, onBack }) {
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
  })
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [status,  setStatus]  = useState(null)
  const bottomRef = useRef(null)
  const userId = getOrCreateUserId()

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)) }, [messages])

  useEffect(() => {
    checkHealth().then(h => setStatus(h ? 'ok' : 'error'))
  }, [])

  useEffect(() => {
    if (messages.length === 0 && profile) {
      const ivs = getSuggestedInterventions(profile, lang)
      setMessages([{ role:'assistant', content: t.chat_welcome, interventions: ivs.slice(0,2), ts: Date.now() }])
    }
  }, [profile])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return
    setInput(''); setError('')
    const userMsg = { role:'user', content: text, ts: Date.now() }
    const updated = [...messages, userMsg]
    setMessages(updated); setLoading(true)
    try {
      const systemPrompt = buildSystemPrompt(profile, lang)
      const apiMessages = updated
        .filter(m => m.role==='user' || m.role==='assistant')
        .map(m => ({ role: m.role, content: m.content }))
      const data = await sendChat({ messages: apiMessages, systemPrompt, lang, userId })
      setMessages(prev => [...prev, { role:'assistant', content: data.reply, model: data.model, ts: Date.now() }])
    } catch(err) {
      setError(t.error_api + ': ' + err.message)
    } finally { setLoading(false) }
  }

  function handleKey(e) {
    if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const dot = { null:{c:'#94a3b8',l:'…'}, ok:{c:'#10b981',l:'Online'}, error:{c:'#ef4444',l:'Offline'} }[status]

  return (
    <div className="chat-page">
      <div className="chat-header">
        <button className="btn-ghost icon-btn" onClick={onBack}>←</button>
        <div className="chat-header-info">
          <span className="chat-avatar">🤖</span>
          <div>
            <div className="chat-name">{t.app_name}</div>
            <div className="chat-sub" style={{display:'flex',alignItems:'center',gap:5}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:dot.c,display:'inline-block'}}/>
              {dot.l}{profile && ` · L${profile.dominantLevel}`}
            </div>
          </div>
        </div>
        <button className="btn-ghost icon-btn" onClick={() => { setMessages([]); localStorage.removeItem(STORAGE_KEY) }} title="Clear">🗑️</button>
      </div>

      <div className="chat-messages">
        {messages.length===0 && (
          <div className="chat-empty">
            <div className="chat-empty-icon">💬</div>
            <p>{profile ? t.chat_welcome : t.chat_no_profile}</p>
          </div>
        )}
        {messages.map((msg,i) => (
          <div key={i} className={`msg-wrap ${msg.role}`}>
            {msg.role==='assistant' && <div className="msg-avatar">🤖</div>}
            <div className={`msg-bubble ${msg.role}`}>
              <div className="msg-text" dangerouslySetInnerHTML={{__html: toHtml(msg.content)}}/>
              {msg.interventions?.map((iv,j) => (
                <div key={j} className="iv-chip"><strong>{iv.label}</strong>: {iv.text}</div>
              ))}
              {msg.model && <div style={{fontSize:'.68rem',opacity:.4,marginTop:4}}>{msg.model}</div>}
            </div>
          </div>
        ))}
        {loading && (
          <div className="msg-wrap assistant">
            <div className="msg-avatar">🤖</div>
            <div className="msg-bubble assistant typing"><span/><span/><span/></div>
          </div>
        )}
        {error && <div className="msg-error">{error}</div>}
        <div ref={bottomRef}/>
      </div>

      <div className="chat-input-wrap">
        <textarea className="chat-input" placeholder={t.chat_placeholder}
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey} rows={1} disabled={loading}/>
        <button className="chat-send-btn" onClick={sendMessage} disabled={!input.trim()||loading}>
          {t.chat_send}
        </button>
      </div>
    </div>
  )
}

function toHtml(text='') {
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/\n/g,'<br/>')
}
