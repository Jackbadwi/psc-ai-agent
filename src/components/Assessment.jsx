// src/components/Assessment.jsx
import { useState } from 'react'
import { getFlatQuestions, TOTAL_QUESTIONS } from '../engine/questionnaire.js'
import { computeProfile } from '../engine/pscEngine.js'

const SCALE = [1, 2, 3, 4, 5]

const SECTION_LABELS = {
  levels:      { fa: 'سطوح تمرکز',       en: 'Focus Levels',          de: 'Fokus-Ebenen',          icon: '🧠' },
  liminal:     { fa: 'حالت‌های حدی',      en: 'Liminal States',        de: 'Liminale Zustände',     icon: '🌊' },
  scapes:      { fa: 'محیط‌های تأثیرگذار',en: 'Influence Environments',de: 'Einflussumgebungen',    icon: '🌐' },
  personality: { fa: 'ابعاد شخصیتی',     en: 'Personality',           de: 'Persönlichkeit',        icon: '🌟' },
  maslow:      { fa: 'نیازهای بنیادین',   en: 'Core Needs',            de: 'Grundbedürfnisse',      icon: '🏔️' },
}

export default function Assessment({ t, lang, onComplete, onBack }) {
  const questions = getFlatQuestions()
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [animating, setAnimating] = useState(false)

  const q = questions[idx]
  const text = q[lang] || q.en
  const answered = answers[q.id] !== undefined
  const progress = Math.round(((idx) / TOTAL_QUESTIONS) * 100)
  const sectionInfo = SECTION_LABELS[q.sectionId] || {}
  const sectionLabel = sectionInfo[lang] || sectionInfo.en || q.sectionId

  function select(val) {
    const newAnswers = { ...answers, [q.id]: val }
    setAnswers(newAnswers)
    if (idx < questions.length - 1) {
      setTimeout(() => advance(newAnswers), 280)
    }
  }

  function advance(ans = answers) {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setIdx(i => i + 1)
      setAnimating(false)
    }, 150)
  }

  function goBack() {
    if (idx > 0) setIdx(i => i - 1)
    else onBack()
  }

  function finish() {
    const profile = computeProfile(answers)
    onComplete(profile)
  }

  const isLast = idx === questions.length - 1
  const allAnswered = questions.every(q => answers[q.id] !== undefined)

  const scaleLabels = {
    1: t.assess_scale_1,
    2: t.assess_scale_2,
    3: t.assess_scale_3,
    4: t.assess_scale_4,
    5: t.assess_scale_5,
  }

  return (
    <div className="assessment-page">
      {/* Header */}
      <div className="assess-header">
        <button className="btn-ghost" onClick={goBack}>← {t.btn_back}</button>
        <div className="assess-header-title">
          <span className="section-icon">{sectionInfo.icon}</span>
          <span>{sectionLabel}</span>
        </div>
        <span className="assess-counter">{idx + 1} / {TOTAL_QUESTIONS}</span>
      </div>

      {/* Progress */}
      <div className="progress-bar-wrap">
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{progress}%</span>
      </div>

      {/* Question */}
      <div className={`question-card ${animating ? 'fade-out' : 'fade-in'}`}>
        <div className="q-number">Q{idx + 1}</div>
        <div className="q-text">{text}</div>

        {/* Scale buttons */}
        <div className="scale-wrap">
          <div className="scale-labels">
            <span>{scaleLabels[1]}</span>
            <span>{scaleLabels[5]}</span>
          </div>
          <div className="scale-buttons">
            {SCALE.map(val => (
              <button
                key={val}
                className={`scale-btn ${answers[q.id] === val ? 'selected' : ''}`}
                onClick={() => select(val)}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="assess-nav">
        <button className="btn-outline" onClick={goBack} disabled={idx === 0 && false}>
          {t.assess_prev}
        </button>

        {isLast ? (
          <button
            className="btn-primary"
            onClick={finish}
            disabled={!allAnswered}
          >
            {t.assess_finish} ✓
          </button>
        ) : (
          <button
            className="btn-primary"
            onClick={() => advance()}
            disabled={!answered}
          >
            {t.assess_next} →
          </button>
        )}
      </div>

      {/* Mini dot progress */}
      <div className="dot-progress">
        {questions.map((q2, i) => (
          <div
            key={i}
            className={`dot ${i === idx ? 'current' : answers[q2.id] ? 'done' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
