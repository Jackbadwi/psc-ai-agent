// src/engine/apiClient.js
// All AI calls go through the Koyeb backend (never direct from browser)

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// ── Chat ──────────────────────────────────────────────
export async function sendChat({ messages, systemPrompt, lang, userId }) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      system_prompt: systemPrompt,
      lang,
      user_id: userId || null,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || `Server error ${res.status}`)
  }
  return res.json() // { reply, model, usage }
}

// ── Health check ──────────────────────────────────────
export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(5000) })
    return res.ok ? await res.json() : null
  } catch { return null }
}

// ── Profile cloud sync (Supabase via backend) ─────────
export async function saveProfileCloud(userId, profile) {
  try {
    const res = await fetch(`${API_BASE}/api/profile/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, profile }),
    })
    return res.ok
  } catch { return false }
}

export async function loadProfileCloud(userId) {
  try {
    const res = await fetch(`${API_BASE}/api/profile/${userId}`)
    if (res.ok) return (await res.json()).profile
    return null
  } catch { return null }
}

// ── Generate anonymous user ID (stored in localStorage) ──
export function getOrCreateUserId() {
  const key = 'psc_user_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = 'psc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9)
    localStorage.setItem(key, id)
  }
  return id
}
