// src/engine/pscEngine.js
// PSC profile computation, brain activation mapping, and intervention engine

// ─────────────────────────────────────────────
// SCORING
// ─────────────────────────────────────────────

export function computeProfile(answers) {
  // answers: { questionId: 1-5 }
  const levels = { level1: [], level2: [], level3: [] }
  const liminal = { impulsive: [], questioning: [] }
  const scapes  = { internal: [], social: [], cultural: [] }
  const personality = { extraversion: [], agreeableness: [], conscientiousness: [], neuroticism: [], openness: [] }
  const maslow = { physiological: [], safety: [], belonging: [], esteem: [], selfActualization: [] }

  Object.entries(answers).forEach(([qid, score]) => {
    const s = parseInt(score)
    if (qid.startsWith('l1_'))  levels.level1.push(s)
    else if (qid.startsWith('l2_')) levels.level2.push(s)
    else if (qid.startsWith('l3_')) levels.level3.push(s)
    else if (qid.startsWith('lim_imp')) liminal.impulsive.push(s)
    else if (qid.startsWith('lim_que')) liminal.questioning.push(s)
    else if (qid.startsWith('sc_int'))  scapes.internal.push(s)
    else if (qid.startsWith('sc_soc'))  scapes.social.push(s)
    else if (qid.startsWith('sc_cul'))  scapes.cultural.push(s)
    else if (qid.startsWith('pe_ext'))  personality.extraversion.push(s)
    else if (qid.startsWith('pe_agr'))  personality.agreeableness.push(s)
    else if (qid.startsWith('pe_con'))  personality.conscientiousness.push(s)
    else if (qid.startsWith('pe_neu'))  personality.neuroticism.push(s)
    else if (qid.startsWith('pe_ope'))  personality.openness.push(s)
    else if (qid === 'ms_phy')  maslow.physiological.push(s)
    else if (qid === 'ms_saf')  maslow.safety.push(s)
    else if (qid === 'ms_bel')  maslow.belonging.push(s)
    else if (qid === 'ms_est')  maslow.esteem.push(s)
    else if (qid === 'ms_sel')  maslow.selfActualization.push(s)
  })

  const avg = arr => arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 0
  const pct = arr => Math.round(avg(arr) / 5 * 100)

  const levelScores = {
    level1: avg(levels.level1),
    level2: avg(levels.level2),
    level3: avg(levels.level3),
  }

  // Dominant level: highest mean, with level2/3 tiebreaker
  let dominantLevel = 1
  if (levelScores.level3 >= levelScores.level2 && levelScores.level3 >= levelScores.level1) dominantLevel = 3
  else if (levelScores.level2 >= levelScores.level1) dominantLevel = 2

  // Liminal state
  const impScore = avg(liminal.impulsive)
  const queScore = avg(liminal.questioning)
  let liminalState = null
  if (impScore >= 3.5 && impScore > queScore) liminalState = 'impulsive'
  else if (queScore >= 3.5 && queScore > impScore) liminalState = 'questioning'
  else if (impScore >= 3.5 && queScore >= 3.5) liminalState = 'transcendent'

  const personalityScores = {
    extraversion:      pct(personality.extraversion),
    agreeableness:     pct(personality.agreeableness),
    conscientiousness: pct(personality.conscientiousness),
    neuroticism:       pct(personality.neuroticism),
    openness:          pct(personality.openness),
  }

  // Dominant personality type (simplified OCEAN label)
  const ptMax = Object.entries(personalityScores).sort((a,b)=>b[1]-a[1])[0]
  const personalityType = ptMax ? ptMax[0] : 'balanced'

  const maslowScores = {
    physiological:    avg(maslow.physiological),
    safety:           avg(maslow.safety),
    belonging:        avg(maslow.belonging),
    esteem:           avg(maslow.esteem),
    selfActualization:avg(maslow.selfActualization),
  }

  const scapesScores = {
    internal: pct(scapes.internal),
    social:   pct(scapes.social),
    cultural: pct(scapes.cultural),
  }

  // Brain activation model (based on PSC levels + personality)
  const brainActivation = computeBrainActivation(dominantLevel, liminalState, personalityScores, levelScores)

  return {
    dominantLevel,
    liminalState,
    personalityType,
    levelScores,
    personalityScores,
    maslowScores,
    scapesScores,
    brainActivation,
    rawAnswers: answers,
    updatedAt: new Date().toISOString(),
  }
}

// ─────────────────────────────────────────────
// BRAIN ACTIVATION MODEL
// Based on PSC-Brain v7 mapping
// ─────────────────────────────────────────────

export function computeBrainActivation(dominantLevel, liminalState, personality, levelScores) {
  const l1 = levelScores.level1 / 5
  const l2 = levelScores.level2 / 5
  const l3 = levelScores.level3 / 5
  const neu = personality.neuroticism / 100
  const con = personality.conscientiousness / 100
  const ope = personality.openness / 100

  return {
    prefrontal:    Math.min(1, 0.2 + l3 * 0.5 + con * 0.3),               // vmPFC/dlPFC — Level 3
    frontal:       Math.min(1, 0.15 + l2 * 0.4 + ope * 0.3),              // Frontal lobe — Level 2
    parietal:      Math.min(1, 0.2 + l2 * 0.3 + l3 * 0.2),               // Attention/awareness
    temporal:      Math.min(1, 0.2 + l1 * 0.2 + l2 * 0.2),               // Language/memory
    amygdala:      Math.min(1, 0.1 + l1 * 0.5 + neu * 0.4),              // Threat — Level 1
    hippocampus:   Math.min(1, 0.15 + l3 * 0.3 + l2 * 0.2),              // Memory consolidation
    basal_ganglia: Math.min(1, 0.15 + l1 * 0.3 + l2 * 0.3),              // Habits/reward
    cerebellum:    Math.min(1, 0.2 + l1 * 0.2 + con * 0.2),              // Coordination/routine
  }
}

// ─────────────────────────────────────────────
// INTERVENTION ENGINE
// Level-appropriate interventions from PSC model
// ─────────────────────────────────────────────

const interventions = {
  fa: {
    level1_stress: {
      label: 'سطح ۱ · استرس',
      text: 'تکنیک زمین‌سازی ۵-۴-۳-۲-۱: ۵ چیزی که می‌بینید، ۴ صدا، ۳ حس لمس، ۲ بو، ۱ طعم. سپس چند قدم از موقعیت فاصله بگیرید.',
    },
    level1_impulse: {
      label: 'سطح ۱ · تکانشگری',
      text: 'قانون ۱۰ ثانیه: قبل از واکنش ۱۰ ثانیه صبر کنید. یک رفتار جایگزین مثل آدامس جویدن یا فشار دادن یک شیء را تمرین کنید.',
    },
    level2_social: {
      label: 'سطح ۲ · فشار اجتماعی',
      text: 'هنجارهای اجتماعی را بازتعریف کنید. از گروه‌های حمایت همتا کمک بگیرید. با یک فرد مورد اعتماد صحبت کنید.',
    },
    level2_decision: {
      label: 'سطح ۲ · تصمیم‌گیری',
      text: 'هدف را به مراحل کوچک تقسیم کنید. مزایا و معایب هر گزینه را بنویسید. یک فرد قابل اعتماد را به عنوان مسئولیت‌پذیر معرفی کنید.',
    },
    level3_values: {
      label: 'سطح ۳ · ارزش‌ها',
      text: 'ارزش اصلی خود را بنویسید. بپرسید: «کسی که می‌خواهم باشم در این موقعیت چه می‌کند؟» از تمرین مدیتیشن ارزش‌محور استفاده کنید.',
    },
    level3_rumination: {
      label: 'سطح ۳ · نشخوار فکری',
      text: 'شفقت به خود را تمرین کنید. روایت‌درمانی: داستان خود را از زاویه رشد بازنویسی کنید. ذهن‌آگاهی ۵ دقیقه‌ای.',
    },
    liminal_impulsive: {
      label: 'حالت حدی تکانشی',
      text: 'تکنیک تحمل پریشانی فوری (TIPP: Temperature, Intense exercise, Paced breathing, Paired muscle relaxation). پس از رفتار، توجیه خود را ثبت و تحلیل کنید.',
    },
    liminal_questioning: {
      label: 'حالت حدی پرسشگری',
      text: 'پرسش‌های ارزشی راهنما: «چه چیزی برای من واقعاً مهم است؟» نقشه هویت جدید ترسیم کنید. با یک مشاور صحبت کنید.',
    },
    liminal_transcendent: {
      label: 'حالت فراشناختی-خلاق',
      text: 'فرصت خلاقیت: نقاشی، موسیقی بداهه، نوشتن آزاد، یا پیاده‌روی در طبیعت بدون هدف مشخص. این حالت نشانه رشد است.',
    },
  },
  en: {
    level1_stress: {
      label: 'Level 1 · Stress',
      text: '5-4-3-2-1 Grounding: 5 things you see, 4 sounds, 3 touches, 2 smells, 1 taste. Then step away from the situation for a few moments.',
    },
    level1_impulse: {
      label: 'Level 1 · Impulsivity',
      text: '10-second rule: wait 10 seconds before reacting. Practise a replacement behaviour such as chewing gum or squeezing an object.',
    },
    level2_social: {
      label: 'Level 2 · Social Pressure',
      text: 'Redefine social norms. Seek peer support groups. Have a conversation with a trusted person.',
    },
    level2_decision: {
      label: 'Level 2 · Decision-Making',
      text: 'Break your goal into small steps. Write down the pros and cons of each option. Nominate an accountability partner.',
    },
    level3_values: {
      label: 'Level 3 · Values',
      text: 'Write down your core value. Ask: "What would the person I want to be do in this situation?" Practise values-based meditation.',
    },
    level3_rumination: {
      label: 'Level 3 · Rumination',
      text: 'Practise self-compassion. Narrative therapy: rewrite your story from a growth perspective. 5-minute mindfulness.',
    },
    liminal_impulsive: {
      label: 'Liminal · Impulsive',
      text: 'Immediate distress tolerance (TIPP). After the behaviour, record and analyse your self-justification.',
    },
    liminal_questioning: {
      label: 'Liminal · Questioning',
      text: 'Guiding value questions: "What really matters to me?" Draw a new identity map. Speak with a counsellor.',
    },
    liminal_transcendent: {
      label: 'Liminal · Transcendent',
      text: 'Creative opportunity: drawing, improvised music, free writing, or walking in nature with no specific goal. This state signals growth.',
    },
  },
  de: {
    level1_stress: {
      label: 'Stufe 1 · Stress',
      text: '5-4-3-2-1-Erdung: 5 Dinge die Sie sehen, 4 Geräusche, 3 Berührungen, 2 Gerüche, 1 Geschmack. Dann treten Sie kurz aus der Situation heraus.',
    },
    level1_impulse: {
      label: 'Stufe 1 · Impulsivität',
      text: '10-Sekunden-Regel: 10 Sekunden warten bevor Sie reagieren. Üben Sie ein Ersatzverhalten wie Kaugummi kauen oder ein Objekt drücken.',
    },
    level2_social: {
      label: 'Stufe 2 · Sozialer Druck',
      text: 'Soziale Normen neu definieren. Peer-Support-Gruppen suchen. Mit einer Vertrauensperson sprechen.',
    },
    level2_decision: {
      label: 'Stufe 2 · Entscheidungsfindung',
      text: 'Ziel in kleine Schritte aufteilen. Vor- und Nachteile jeder Option aufschreiben. Einen Verantwortlichkeitspartner bestimmen.',
    },
    level3_values: {
      label: 'Stufe 3 · Werte',
      text: 'Ihren Kernwert aufschreiben. Fragen: "Was würde die Person, die ich sein möchte, in dieser Situation tun?" Wertebasierte Meditation üben.',
    },
    level3_rumination: {
      label: 'Stufe 3 · Grübeln',
      text: 'Selbstmitgefühl üben. Narrative Therapie: Ihre Geschichte aus einer Wachstumsperspektive umschreiben. 5-minütige Achtsamkeit.',
    },
    liminal_impulsive: {
      label: 'Liminal · Impulsiv',
      text: 'Sofortige Distress-Toleranz (TIPP). Nach dem Verhalten: Selbstrechtfertigung aufzeichnen und analysieren.',
    },
    liminal_questioning: {
      label: 'Liminal · Hinterfragend',
      text: 'Leitende Wertfragen: "Was ist mir wirklich wichtig?" Eine neue Identitätskarte zeichnen. Mit einem Berater sprechen.',
    },
    liminal_transcendent: {
      label: 'Liminal · Transzendent',
      text: 'Kreative Gelegenheit: Zeichnen, improvisierte Musik, freies Schreiben oder Spaziergang in der Natur ohne bestimmtes Ziel. Dieser Zustand signalisiert Wachstum.',
    },
  },
}

export function getSuggestedInterventions(profile, lang = 'fa') {
  const iv = interventions[lang] || interventions['fa']
  const results = []
  const { dominantLevel, liminalState, personalityScores } = profile

  if (liminalState) {
    const key = `liminal_${liminalState}`
    if (iv[key]) results.push(iv[key])
  }

  if (dominantLevel === 1) {
    results.push(iv.level1_stress)
    if (personalityScores.neuroticism > 60) results.push(iv.level1_impulse)
  } else if (dominantLevel === 2) {
    results.push(iv.level2_decision)
    if (personalityScores.neuroticism > 60) results.push(iv.level2_social)
  } else if (dominantLevel === 3) {
    results.push(iv.level3_values)
    if (personalityScores.neuroticism > 50) results.push(iv.level3_rumination)
  }

  return results.slice(0, 3)
}

// ─────────────────────────────────────────────
// SYSTEM PROMPT BUILDER for AI chat
// ─────────────────────────────────────────────

export function buildSystemPrompt(profile, lang = 'fa') {
  if (!profile) {
    const noProfile = {
      fa: 'تو PSC AI-Agent هستی. کاربر هنوز پروفایل PSC ندارد. از او بخواه ابتدا پرسشنامه ۴۵ سوالی PSC را تکمیل کند.',
      en: 'You are the PSC AI-Agent. The user has no PSC profile yet. Ask them to complete the 45-question PSC questionnaire first.',
      de: 'Du bist der PSC KI-Agent. Der Benutzer hat noch kein PSC-Profil. Bitte ihn, zunächst den 45-Fragen-PSC-Fragebogen auszufüllen.',
    }
    return noProfile[lang] || noProfile.en
  }

  const levelNames = {
    fa: { 1: 'غریزی', 2: 'شناختی', 3: 'فراشناختی' },
    en: { 1: 'Instinctive', 2: 'Cognitive', 3: 'Metacognitive' },
    de: { 1: 'Instinktiv', 2: 'Kognitiv', 3: 'Metakognitiv' },
  }[lang] || { 1: 'Instinctive', 2: 'Cognitive', 3: 'Metacognitive' }

  const lvl = profile.dominantLevel
  const lim = profile.liminalState || 'none'
  const pers = profile.personalityType

  const prompts = {
    fa: `تو PSC AI-Agent هستی — یک دستیار هوشمند روان‌شناختی مبتنی بر مدل PSC (تمرکز شخصی).

**پروفایل PSC کاربر:**
- سطح غالب: سطح ${lvl} — ${levelNames[lvl]}
- حالت حدی: ${lim === 'none' ? 'ندارد' : lim}
- تیپ شخصیتی برتر: ${pers}
- امتیازات سطوح: سطح۱=${Math.round(profile.levelScores.level1*20)}% · سطح۲=${Math.round(profile.levelScores.level2*20)}% · سطح۳=${Math.round(profile.levelScores.level3*20)}%
- شخصیت: برون‌گرایی=${profile.personalityScores.extraversion}% · توافق‌پذیری=${profile.personalityScores.agreeableness}% · وظیفه‌شناسی=${profile.personalityScores.conscientiousness}% · روان‌رنجوری=${profile.personalityScores.neuroticism}% · گشودگی=${profile.personalityScores.openness}%
- مازلو: فیزیولوژیک=${Math.round(profile.maslowScores.physiological*20)}% · ایمنی=${Math.round(profile.maslowScores.safety*20)}% · تعلق=${Math.round(profile.maslowScores.belonging*20)}% · احترام=${Math.round(profile.maslowScores.esteem*20)}% · خودشکوفایی=${Math.round(profile.maslowScores.selfActualization*20)}%

**دستورالعمل:**
- همیشه پاسخ‌هایت را با پروفایل PSC کاربر تطبیق بده
- برای سطح ۱: از تکنیک‌های جسمی و فوری استفاده کن
- برای سطح ۲: از تحلیل منطقی و راه‌حل‌های گام‌به‌گام استفاده کن
- برای سطح ۳: از چارچوب ارزش‌محور و فلسفی استفاده کن
- اگر حالت حدی وجود دارد، مداخله مناسب ارائه بده
- پاسخ‌ها را کوتاه، گرم و عملی نگه دار
- هرگز تشخیص بالینی نده؛ در صورت نیاز متخصص را توصیه کن
- زبان پاسخ: فارسی`,

    en: `You are the PSC AI-Agent — an intelligent psychological assistant based on the PSC (Personal Self-Continuum) model.

**User's PSC Profile:**
- Dominant Level: Level ${lvl} — ${levelNames[lvl]}
- Liminal State: ${lim === 'none' ? 'None' : lim}
- Dominant Personality Type: ${pers}
- Level Scores: L1=${Math.round(profile.levelScores.level1*20)}% · L2=${Math.round(profile.levelScores.level2*20)}% · L3=${Math.round(profile.levelScores.level3*20)}%
- Personality: Extraversion=${profile.personalityScores.extraversion}% · Agreeableness=${profile.personalityScores.agreeableness}% · Conscientiousness=${profile.personalityScores.conscientiousness}% · Neuroticism=${profile.personalityScores.neuroticism}% · Openness=${profile.personalityScores.openness}%
- Maslow: Physiological=${Math.round(profile.maslowScores.physiological*20)}% · Safety=${Math.round(profile.maslowScores.safety*20)}% · Belonging=${Math.round(profile.maslowScores.belonging*20)}% · Esteem=${Math.round(profile.maslowScores.esteem*20)}% · Self-Actualisation=${Math.round(profile.maslowScores.selfActualization*20)}%

**Guidelines:**
- Always tailor your responses to the user's PSC profile
- For Level 1: use immediate, physical/somatic techniques
- For Level 2: use logical analysis and step-by-step solutions
- For Level 3: use values-based and philosophical frameworks
- If a liminal state is present, offer appropriate interventions
- Keep responses concise, warm, and practical
- Never give clinical diagnoses; recommend a professional when needed
- Response language: English`,

    de: `Du bist der PSC KI-Agent — ein intelligenter psychologischer Assistent basierend auf dem PSC-Modell (Personal Self-Continuum).

**PSC-Profil des Benutzers:**
- Dominante Ebene: Ebene ${lvl} — ${levelNames[lvl]}
- Liminaler Zustand: ${lim === 'none' ? 'Keiner' : lim}
- Dominanter Persönlichkeitstyp: ${pers}
- Ebenen-Scores: E1=${Math.round(profile.levelScores.level1*20)}% · E2=${Math.round(profile.levelScores.level2*20)}% · E3=${Math.round(profile.levelScores.level3*20)}%
- Persönlichkeit: Extraversion=${profile.personalityScores.extraversion}% · Verträglichkeit=${profile.personalityScores.agreeableness}% · Gewissenhaftigkeit=${profile.personalityScores.conscientiousness}% · Neurotizismus=${profile.personalityScores.neuroticism}% · Offenheit=${profile.personalityScores.openness}%
- Maslow: Physiologisch=${Math.round(profile.maslowScores.physiological*20)}% · Sicherheit=${Math.round(profile.maslowScores.safety*20)}% · Zugehörigkeit=${Math.round(profile.maslowScores.belonging*20)}% · Wertschätzung=${Math.round(profile.maslowScores.esteem*20)}% · Selbstverwirklichung=${Math.round(profile.maslowScores.selfActualization*20)}%

**Richtlinien:**
- Antworten immer auf das PSC-Profil des Benutzers abstimmen
- Für Stufe 1: unmittelbare, körperlich/somatische Techniken verwenden
- Für Stufe 2: logische Analyse und schrittweise Lösungen
- Für Stufe 3: wertebasierte und philosophische Rahmenbedingungen
- Bei liminalen Zuständen geeignete Interventionen anbieten
- Antworten kurz, warm und praktisch halten
- Keine klinischen Diagnosen stellen; bei Bedarf Fachmann empfehlen
- Antwortsprache: Deutsch`,
  }

  return prompts[lang] || prompts.en
}
