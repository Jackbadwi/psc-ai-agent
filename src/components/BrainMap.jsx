// src/components/BrainMap.jsx
import { useState } from 'react'

const REGIONS = [
  { id: 'prefrontal',   label_fa: 'قشر پیش‌پیشانی', label_en: 'Prefrontal Cortex',  label_de: 'Präfrontaler Kortex', cx: 50, cy: 22, r: 13, psc_fa: 'سطح ۳ · DMN · خودشکوفایی',         psc_en: 'Level 3 · DMN · Self-actualisation',        psc_de: 'Stufe 3 · DMN · Selbstverwirklichung' },
  { id: 'frontal',      label_fa: 'لوب پیشانی',      label_en: 'Frontal Lobe',       label_de: 'Frontallappen',       cx: 50, cy: 36, r: 11, psc_fa: 'سطح ۲ · FPN · انعطاف شناختی',      psc_en: 'Level 2 · FPN · Cognitive flexibility',     psc_de: 'Stufe 2 · FPN · Kognitive Flexibilität' },
  { id: 'parietal',     label_fa: 'لوب آهیانه',      label_en: 'Parietal Lobe',      label_de: 'Scheitellappen',      cx: 50, cy: 50, r: 10, psc_fa: 'توجه · آگاهی فضایی',               psc_en: 'Attention · Spatial awareness',              psc_de: 'Aufmerksamkeit · Räumliches Bewusstsein' },
  { id: 'temporal',     label_fa: 'لوب گیجگاهی',     label_en: 'Temporal Lobe',      label_de: 'Schläfenlappen',      cx: 22, cy: 52, r: 9,  psc_fa: 'زبان · حافظه معنایی',              psc_en: 'Language · Semantic memory',                 psc_de: 'Sprache · Semantisches Gedächtnis' },
  { id: 'amygdala',     label_fa: 'آمیگدال',          label_en: 'Amygdala',           label_de: 'Amygdala',            cx: 35, cy: 63, r: 8,  psc_fa: 'سطح ۱ · تهدید · واکنش هیجانی',    psc_en: 'Level 1 · Threat · Emotional reaction',     psc_de: 'Stufe 1 · Bedrohung · Emotionale Reaktion' },
  { id: 'hippocampus',  label_fa: 'هیپوکامپ',         label_en: 'Hippocampus',        label_de: 'Hippocampus',         cx: 65, cy: 63, r: 8,  psc_fa: 'حافظه · یادگیری · بافت‌دهی',        psc_en: 'Memory · Learning · Contextualisation',     psc_de: 'Gedächtnis · Lernen · Kontextualisierung' },
  { id: 'basal_ganglia',label_fa: 'عقده‌های قاعده‌ای', label_en: 'Basal Ganglia',      label_de: 'Basalganglien',       cx: 50, cy: 66, r: 8,  psc_fa: 'عادات · پاداش · انگیزش',            psc_en: 'Habits · Reward · Motivation',              psc_de: 'Gewohnheiten · Belohnung · Motivation' },
  { id: 'cerebellum',   label_fa: 'مخچه',             label_en: 'Cerebellum',         label_de: 'Kleinhirn',           cx: 50, cy: 81, r: 11, psc_fa: 'هماهنگی · روال‌های خودکار',          psc_en: 'Coordination · Automatic routines',         psc_de: 'Koordination · Automatische Routinen' },
]

function getColor(v) {
  if (v < 0.3)  return '#bfdbfe'
  if (v < 0.5)  return '#60a5fa'
  if (v < 0.65) return '#818cf8'
  if (v < 0.8)  return '#667eea'
  return '#7c3aed'
}

export default function BrainMap({ t, lang, profile, onBack }) {
  const [selected, setSelected] = useState(null)
  const act = profile?.brainActivation || {}

  return (
    <div className="brainmap-page">
      <div className="page-header">
        <button className="btn-ghost" onClick={onBack}>← {t.btn_back}</button>
        <h1 className="page-title">{t.nav_brain_map}</h1>
      </div>

      <div className="brainmap-layout">
        {/* SVG Brain */}
        <div className="brain-svg-wrap">
          <svg viewBox="0 0 100 100" className="brain-svg">
            <ellipse cx="50" cy="52" rx="46" ry="44" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            {/* Connectors */}
            {[['50,36','50,50'],['50,50','22,52'],['50,50','35,63'],['50,50','65,63'],['35,63','50,66'],['65,63','50,66'],['50,66','50,81']].map((pair,i)=>(
              <line key={i} x1={pair[0].split(',')[0]} y1={pair[0].split(',')[1]} x2={pair[1].split(',')[0]} y2={pair[1].split(',')[1]} stroke="#e2e8f0" strokeWidth="0.8"/>
            ))}
            {REGIONS.map(reg => {
              const v = act[reg.id] || 0
              const color = getColor(v)
              const isSel = selected === reg.id
              return (
                <g key={reg.id} onClick={() => setSelected(isSel ? null : reg.id)} style={{cursor:'pointer'}}>
                  <circle cx={reg.cx} cy={reg.cy} r={reg.r + (isSel?2:0)}
                    fill={color} stroke={isSel?'#1e40af':'#fff'} strokeWidth={isSel?2:1} opacity="0.9"/>
                  <text x={reg.cx} y={reg.cy} textAnchor="middle" dominantBaseline="middle"
                    fontSize="4" fill="white" fontWeight="700">{Math.round(v*100)}%</text>
                </g>
              )
            })}
          </svg>
          <div className="brain-legend">
            {[0.15,0.4,0.6,0.75,0.92].map(v=>(
              <div key={v} className="legend-item">
                <div className="legend-dot" style={{background:getColor(v)}}/>
                <span>{Math.round(v*100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Region list */}
        <div className="region-list">
          {REGIONS.map(reg => {
            const v = act[reg.id] || 0
            const label = reg[`label_${lang}`] || reg.label_en
            const psc   = reg[`psc_${lang}`]   || reg.psc_en
            const isSel = selected === reg.id
            return (
              <div key={reg.id} className={`region-item ${isSel?'selected':''}`}
                onClick={() => setSelected(isSel ? null : reg.id)}>
                <div className="ri-header">
                  <div className="ri-dot" style={{background:getColor(v)}}/>
                  <div className="ri-name">{label}</div>
                  <div className="ri-pct">{Math.round(v*100)}%</div>
                </div>
                {isSel && (
                  <div className="ri-detail">
                    <div className="ri-bar-wrap">
                      <div className="ri-bar" style={{width:`${v*100}%`,background:getColor(v)}}/>
                    </div>
                    <div className="ri-psc">{psc}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
