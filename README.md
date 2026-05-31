# 🎯 PSC AI-Agent — v1.0.0

<p align="center">
  <img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" />
  <img src="https://img.shields.io/badge/version-1.0.0-purple.svg" />
  <img src="https://img.shields.io/badge/languages-FA%20%7C%20EN%20%7C%20DE-green.svg" />
  <img src="https://img.shields.io/badge/powered_by-Claude_AI-orange.svg" />
</p>

<p align="center">
  <b>AI-powered Personal Self-Continuum (PSC) assessment and advisor</b><br/>
  Supports 🇮🇷 Persian · 🇬🇧 English · 🇩🇪 German
</p>

---

## 📋 Table of Contents
- [Overview](#overview)
- [The PSC Model](#the-psc-model)
- [Features](#features)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**PSC AI-Agent** is an open-source, multilingual AI assistant built on the **Personal Self-Continuum (PSC)** psychological model. It guides users through a 45-question profiling assessment across five dimensions, then provides a personalised mind map, brain-region activation visualisation, level-appropriate interventions, and AI-powered conversational coaching — all powered by the Anthropic Claude API.

> **Note:** This is the initial release (v1.0.0). Future versions will support EEG device integration for real-time biometric profiling.

---

## The PSC Model

The PSC model describes three primary levels of behavioural and cognitive processing:

| Level | Name | Characteristics |
|-------|------|-----------------|
| **L1** | Instinctive | Fast reactive decisions, emotion-driven, survival-oriented |
| **L2** | Cognitive | Balance of feeling and logic, social adaptation, goal-directed |
| **L3** | Metacognitive | Values-based, principles-driven, self-actualisation |

### Liminal States
Between any two adjacent levels, a **liminal state** may appear:
- **Impulsive** — oscillating between L1 and L2 with rationalisation
- **Questioning** — existential questioning between L2 and L3
- **Transcendent-Creative** — breakthrough creative state at L3+

### Assessment Dimensions (45 questions)
1. PSC Focus Levels (15 q) — 5 per level
2. Liminal States (4 q)
3. Influence Environments / Scapes (6 q) — internal, social, cultural
4. Big Five Personality Dimensions (15 q) — OCEAN
5. Maslow Needs Hierarchy (5 q)

---

## Features

- 🌐 **Trilingual**: Full FA/EN/DE support with RTL/LTR layout switching
- 📋 **45-Question PSC Assessment** with animated progress and live scoring
- 📊 **Profile Dashboard**: Radar chart, bar charts, level scores, interventions
- 🧠 **Interactive Brain Map**: SVG-based brain with region activation heatmap
- 💬 **AI Chat Advisor**: Personalised coaching via Claude claude-sonnet-4-20250514
- 💡 **Intervention Engine**: Level-appropriate PSC interventions
- 🌙 **Dark/Light Theme**
- 💾 **Local Storage**: All data stays in the user's browser (privacy-first)
- 📱 **Responsive**: Works on mobile, tablet, and desktop

---

## Getting Started

### Prerequisites
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com) for the AI chat feature

### Installation

```bash
git clone https://github.com/YOUR_ORG/psc-ai-agent.git
cd psc-ai-agent
npm install
npm run dev
```

Open `http://localhost:5173`

### Build for production

```bash
npm run build
# Output is in dist/
```

### Configuration

No server configuration required. The app runs entirely in the browser. The user enters their Anthropic API key in **Settings** — it is stored only in `localStorage` and never sent to any server other than Anthropic's API directly.

---

## Architecture

```
psc-ai-agent/
├── src/
│   ├── engine/
│   │   ├── questionnaire.js   # 45-question data (FA/EN/DE)
│   │   └── pscEngine.js       # Scoring, brain activation, interventions, system prompt
│   ├── i18n/
│   │   └── translations.js    # Full UI strings (FA/EN/DE)
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── Welcome.jsx
│   │   ├── Onboarding.jsx
│   │   ├── Assessment.jsx     # 45-question animated questionnaire
│   │   ├── Profile.jsx        # Results with charts + interventions
│   │   ├── BrainMap.jsx       # Interactive SVG brain activation
│   │   ├── Chat.jsx           # AI advisor (Anthropic API)
│   │   └── Settings.jsx
│   ├── styles/
│   │   └── main.css
│   ├── App.jsx                # Routing + state management
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── LICENSE                    # AGPL-3.0
├── COMMERCIAL.md
└── CLA.md
```

### Data Flow

```
User → 45 Questions → computeProfile() → PSC Profile
                                              ↓
                                    Brain Activation Map
                                    Intervention Engine
                                    AI System Prompt
                                              ↓
                                    Chat (Claude API)
```

---

## Roadmap

### v1.0.0 (Current)
- [x] 45-question PSC assessment
- [x] Multilingual FA/EN/DE
- [x] Profile dashboard with visualisations
- [x] Brain map
- [x] AI chat advisor
- [x] Dark/light theme

### v1.1.0 (Planned)
- [ ] EEG device integration (OpenBCI, Muse)
- [ ] Session history and progress tracking
- [ ] PDF report export
- [ ] Specialist dashboard view
- [ ] Fine-tuned PSC model (GGUF/ONNX)

### v2.0.0 (Planned)
- [ ] Backend API (Node.js/FastAPI)
- [ ] Multi-user accounts
- [ ] Specialist-client portal
- [ ] Real-time biometric PSC scoring

---

## Contributing

We welcome contributions! Please read [CLA.md](CLA.md) before submitting a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
6. Sign the CLA in your PR comment

---

## License

This project uses a **dual-licence** model:

- **Open Source**: [GNU AGPL v3.0](LICENSE) — free for open-source and non-commercial use
- **Commercial**: See [COMMERCIAL.md](COMMERCIAL.md) for commercial licensing

> Under AGPL-3.0, if you run a modified version as a network service, you must publish your complete source code.

---

## راهنمای فارسی

**PSC AI-Agent** یک دستیار هوشمند مبتنی بر مدل PSC (تمرکز شخصی) است که با استفاده از API کلود آنتروپیک کار می‌کند.

**شروع سریع:**
```bash
git clone https://github.com/YOUR_ORG/psc-ai-agent.git
cd psc-ai-agent && npm install && npm run dev
```

کلید API آنتروپیک خود را در بخش **تنظیمات** وارد کنید.

---

## Deutsche Kurzanleitung

**PSC KI-Agent** ist ein intelligenter Assistent basierend auf dem PSC-Modell, der die Anthropic Claude API verwendet.

**Schnellstart:**
```bash
git clone https://github.com/YOUR_ORG/psc-ai-agent.git
cd psc-ai-agent && npm install && npm run dev
```

Geben Sie Ihren Anthropic-API-Schlüssel in den **Einstellungen** ein.
