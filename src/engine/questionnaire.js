// src/engine/questionnaire.js
// PSC Questionnaire — 45 questions across 5 sections
// Languages: fa, en, de

export const questionnaire = {
  sections: [
    // ─── SECTION 1: PSC LEVELS (15 questions, 5 per level) ───
    {
      id: 'levels',
      key_fa: 'سطوح تمرکز PSC',
      key_en: 'PSC Focus Levels',
      key_de: 'PSC-Fokus-Ebenen',
      icon: '🧠',
      questions: [
        // Level 1 — Instinctive (q1–q5)
        {
          id: 'l1_q1', level: 'level1',
          fa: 'در موقعیت‌های استرس‌زا، معمولاً بدون فکر واکنش نشان می‌دهم',
          en: 'In stressful situations, I usually react without thinking',
          de: 'In Stresssituationen reagiere ich normalerweise ohne nachzudenken',
        },
        {
          id: 'l1_q2', level: 'level1',
          fa: 'وقتی تحت فشار هستم، احساساتم بر تصمیم‌گیری‌ام غلبه می‌کند',
          en: 'When under pressure, my emotions override my decision-making',
          de: 'Wenn ich unter Druck stehe, überwältigen meine Gefühle mein Urteilsvermögen',
        },
        {
          id: 'l1_q3', level: 'level1',
          fa: 'نیازهای فوری معمولاً بر اهداف بلندمدت من اولویت دارند',
          en: 'Immediate needs usually take priority over my long-term goals',
          de: 'Unmittelbare Bedürfnisse haben meist Vorrang vor meinen langfristigen Zielen',
        },
        {
          id: 'l1_q4', level: 'level1',
          fa: 'وقتی ناراحت هستم، کنترل رفتارم دشوار می‌شود',
          en: 'When upset, controlling my behaviour becomes difficult',
          de: 'Wenn ich verärgert bin, fällt es mir schwer, mein Verhalten zu kontrollieren',
        },
        {
          id: 'l1_q5', level: 'level1',
          fa: 'در موقعیت‌های دشوار، تمایل دارم سریع واکنش نشان دهم',
          en: 'In challenging situations, I tend to react quickly and impulsively',
          de: 'In schwierigen Situationen neige ich dazu, schnell und impulsiv zu reagieren',
        },
        // Level 2 — Cognitive (q6–q10)
        {
          id: 'l2_q1', level: 'level2',
          fa: 'قبل از تصمیم‌گیری، پیامدهای احتمالی را در نظر می‌گیرم',
          en: 'Before deciding, I consider possible consequences',
          de: 'Bevor ich entscheide, berücksichtige ich mögliche Konsequenzen',
        },
        {
          id: 'l2_q2', level: 'level2',
          fa: 'سعی می‌کنم احساسات و منطق را در تصمیم‌هایم متعادل کنم',
          en: 'I try to balance emotions and logic in my decisions',
          de: 'Ich versuche, Emotionen und Logik in meinen Entscheidungen zu balancieren',
        },
        {
          id: 'l2_q3', level: 'level2',
          fa: 'معمولاً برای مشکلاتم راه‌حل‌های منطقی پیدا می‌کنم',
          en: 'I usually find logical solutions to my problems',
          de: 'Normalerweise finde ich logische Lösungen für meine Probleme',
        },
        {
          id: 'l2_q4', level: 'level2',
          fa: 'نظرات دیگران نقش مهمی در تصمیماتم دارند',
          en: 'Others\' opinions play an important role in my decisions',
          de: 'Die Meinungen anderer spielen eine wichtige Rolle in meinen Entscheidungen',
        },
        {
          id: 'l2_q5', level: 'level2',
          fa: 'در موقعیت‌های دشوار، آرام می‌مانم و گام به گام فکر می‌کنم',
          en: 'In difficult situations, I stay calm and think step by step',
          de: 'In schwierigen Situationen bleibe ich ruhig und denke Schritt für Schritt',
        },
        // Level 3 — Metacognitive (q11–q15)
        {
          id: 'l3_q1', level: 'level3',
          fa: 'ارزش‌ها و اصول شخصی من راهنمای تصمیماتم هستند',
          en: 'My personal values and principles guide my decisions',
          de: 'Meine persönlichen Werte und Prinzipien leiten meine Entscheidungen',
        },
        {
          id: 'l3_q2', level: 'level3',
          fa: 'حتی در موقعیت‌های دشوار، طبق باورهای عمیقم عمل می‌کنم',
          en: 'Even in difficult situations, I act according to my deep beliefs',
          de: 'Auch in schwierigen Situationen handle ich gemäß meinen tiefen Überzeugungen',
        },
        {
          id: 'l3_q3', level: 'level3',
          fa: 'در موقعیت‌های پیچیده، می‌توانم دیدگاه‌های متعدد ببینم',
          en: 'In complex situations, I can see multiple perspectives',
          de: 'In komplexen Situationen kann ich mehrere Perspektiven sehen',
        },
        {
          id: 'l3_q4', level: 'level3',
          fa: 'رشد شخصی و معنای زندگی برای من بسیار مهم است',
          en: 'Personal growth and life meaning are very important to me',
          de: 'Persönliches Wachstum und Lebenssinn sind mir sehr wichtig',
        },
        {
          id: 'l3_q5', level: 'level3',
          fa: 'ابتدا احساسات و افکارم را مشاهده و تحلیل می‌کنم',
          en: 'I first observe and analyse my feelings and thoughts',
          de: 'Ich beobachte und analysiere zunächst meine Gefühle und Gedanken',
        },
      ],
    },

    // ─── SECTION 2: LIMINAL STATES (4 questions) ───
    {
      id: 'liminal',
      key_fa: 'حالت‌های حدی',
      key_en: 'Liminal States',
      key_de: 'Liminale Zustände',
      icon: '🌊',
      questions: [
        {
          id: 'lim_imp1', level: 'impulsive',
          fa: 'وقتی هیجان‌زده هستم، رفتارم را با توجیهات ساده توضیح می‌دهم',
          en: 'When excited, I explain my behaviour with simple justifications',
          de: 'Wenn ich aufgeregt bin, erkläre ich mein Verhalten mit einfachen Rechtfertigungen',
        },
        {
          id: 'lim_imp2', level: 'impulsive',
          fa: 'گاهی احساس کنترل دارم، اما ناگهان رفتارم تکانشی می‌شود',
          en: 'Sometimes I feel in control, but then my behaviour suddenly becomes impulsive',
          de: 'Manchmal fühle ich mich kontrolliert, aber dann wird mein Verhalten plötzlich impulsiv',
        },
        {
          id: 'lim_que1', level: 'questioning',
          fa: 'گاهی احساس می‌کنم زندگی‌ام طبق انتظارات دیگران پیش می‌رود',
          en: 'Sometimes I feel my life is progressing according to others\' expectations',
          de: 'Manchmal habe ich das Gefühl, dass mein Leben nach den Erwartungen anderer verläuft',
        },
        {
          id: 'lim_que2', level: 'questioning',
          fa: 'دوره‌هایی را می‌گذرانم که معنای زندگی‌ام را زیر سوال می‌برم',
          en: 'I go through periods where I question the meaning of my life',
          de: 'Ich durchlaufe Phasen, in denen ich den Sinn meines Lebens in Frage stelle',
        },
      ],
    },

    // ─── SECTION 3: SCAPES (6 questions, 2 per scape) ───
    {
      id: 'scapes',
      key_fa: 'محیط‌های تأثیرگذار',
      key_en: 'Influence Environments',
      key_de: 'Einflussumgebungen',
      icon: '🌐',
      questions: [
        {
          id: 'sc_int1', level: 'internal',
          fa: 'باورهای عمیق من درباره خودم بر رفتارم تأثیر می‌گذارند',
          en: 'My deep beliefs about myself influence my behaviour',
          de: 'Meine tiefen Überzeugungen über mich beeinflussen mein Verhalten',
        },
        {
          id: 'sc_int2', level: 'internal',
          fa: 'الگوهای احساسی تکراری بر تصمیماتم اثر می‌گذارند',
          en: 'Repetitive emotional patterns affect my decisions',
          de: 'Sich wiederholende emotionale Muster beeinflussen meine Entscheidungen',
        },
        {
          id: 'sc_soc1', level: 'social',
          fa: 'نقش‌هایی که در خانواده یا جامعه دارم بر تصمیماتم تأثیر می‌گذارند',
          en: 'The roles I have in family or society influence my decisions',
          de: 'Die Rollen, die ich in Familie oder Gesellschaft habe, beeinflussen meine Entscheidungen',
        },
        {
          id: 'sc_soc2', level: 'social',
          fa: 'فشار اجتماعی یا قضاوت دیگران رفتارم را تغییر می‌دهد',
          en: 'Social pressure or others\' judgement changes my behaviour',
          de: 'Sozialer Druck oder das Urteil anderer verändert mein Verhalten',
        },
        {
          id: 'sc_cul1', level: 'cultural',
          fa: 'ارزش‌های فرهنگی جامعه‌ام بر انتخاب‌هایم تأثیر می‌گذارند',
          en: 'Cultural values of my society influence my choices',
          de: 'Kulturelle Werte meiner Gesellschaft beeinflussen meine Entscheidungen',
        },
        {
          id: 'sc_cul2', level: 'cultural',
          fa: 'گاهی احساس می‌کنم فرهنگ یا هنجارها تصمیم‌گیری‌ام را محدود می‌کنند',
          en: 'Sometimes I feel culture or norms limit my decision-making',
          de: 'Manchmal habe ich das Gefühl, dass Kultur oder Normen meine Entscheidungsfindung einschränken',
        },
      ],
    },

    // ─── SECTION 4: PERSONALITY — Big Five (15 questions, 3 per dimension) ───
    {
      id: 'personality',
      key_fa: 'ابعاد شخصیتی',
      key_en: 'Personality Dimensions',
      key_de: 'Persönlichkeitsdimensionen',
      icon: '🌟',
      questions: [
        {
          id: 'pe_ext1', level: 'extraversion',
          fa: 'از تعاملات اجتماعی انرژی می‌گیرم',
          en: 'I gain energy from social interactions',
          de: 'Ich gewinne Energie aus sozialen Interaktionen',
        },
        {
          id: 'pe_ext2', level: 'extraversion',
          fa: 'در گروه‌ها احساس راحتی می‌کنم',
          en: 'I feel comfortable in groups',
          de: 'Ich fühle mich in Gruppen wohl',
        },
        {
          id: 'pe_ext3', level: 'extraversion',
          fa: 'دوست دارم در فعالیت‌های گروهی نقش فعال داشته باشم',
          en: 'I like to play an active role in group activities',
          de: 'Ich spiele gerne eine aktive Rolle in Gruppenaktivitäten',
        },
        {
          id: 'pe_agr1', level: 'agreeableness',
          fa: 'معمولاً سعی می‌کنم با دیگران همکاری کنم',
          en: 'I usually try to cooperate with others',
          de: 'Ich versuche normalerweise, mit anderen zusammenzuarbeiten',
        },
        {
          id: 'pe_agr2', level: 'agreeableness',
          fa: 'کمک به دیگران برای من ارزشمند است',
          en: 'Helping others is valuable to me',
          de: 'Anderen zu helfen ist mir wichtig',
        },
        {
          id: 'pe_agr3', level: 'agreeableness',
          fa: 'مهربانی در روابطم اهمیت زیادی دارد',
          en: 'Kindness in my relationships is very important',
          de: 'Freundlichkeit in meinen Beziehungen ist sehr wichtig',
        },
        {
          id: 'pe_con1', level: 'conscientiousness',
          fa: 'من منظم و مسئول هستم',
          en: 'I am organised and responsible',
          de: 'Ich bin organisiert und verantwortungsbewusst',
        },
        {
          id: 'pe_con2', level: 'conscientiousness',
          fa: 'برای رسیدن به اهدافم برنامه‌ریزی می‌کنم',
          en: 'I plan to achieve my goals',
          de: 'Ich plane, um meine Ziele zu erreichen',
        },
        {
          id: 'pe_con3', level: 'conscientiousness',
          fa: 'به تعهداتم پایبند هستم',
          en: 'I keep my commitments',
          de: 'Ich halte meine Verpflichtungen ein',
        },
        {
          id: 'pe_neu1', level: 'neuroticism',
          fa: 'در موقعیت‌های دشوار احساس نگرانی می‌کنم',
          en: 'I feel anxious in difficult situations',
          de: 'In schwierigen Situationen fühle ich mich ängstlich',
        },
        {
          id: 'pe_neu2', level: 'neuroticism',
          fa: 'تغییرات ناگهانی برای من استرس‌زا است',
          en: 'Sudden changes are stressful for me',
          de: 'Plötzliche Veränderungen sind für mich stressig',
        },
        {
          id: 'pe_neu3', level: 'neuroticism',
          fa: 'گاهی به راحتی عصبانی یا مضطرب می‌شوم',
          en: 'I sometimes get easily angry or anxious',
          de: 'Manchmal werde ich leicht wütend oder ängstlich',
        },
        {
          id: 'pe_ope1', level: 'openness',
          fa: 'از تجربیات جدید لذت می‌برم',
          en: 'I enjoy new experiences',
          de: 'Ich genieße neue Erfahrungen',
        },
        {
          id: 'pe_ope2', level: 'openness',
          fa: 'ایده‌های خلاقانه برای من جذاب است',
          en: 'Creative ideas are attractive to me',
          de: 'Kreative Ideen finde ich ansprechend',
        },
        {
          id: 'pe_ope3', level: 'openness',
          fa: 'کنجکاو و علاقه‌مند به یادگیری هستم',
          en: 'I am curious and interested in learning',
          de: 'Ich bin neugierig und lerninteressiert',
        },
      ],
    },

    // ─── SECTION 5: MASLOW NEEDS (5 questions) ───
    {
      id: 'maslow',
      key_fa: 'نیازهای بنیادین',
      key_en: 'Core Needs',
      key_de: 'Grundbedürfnisse',
      icon: '🏔️',
      questions: [
        {
          id: 'ms_phy', level: 'physiological',
          fa: 'دسترسی به غذا، آب و پناه مناسب دارم و خواب و استراحت کافی دارم',
          en: 'I have adequate access to food, water, shelter, and sufficient sleep',
          de: 'Ich habe ausreichend Zugang zu Nahrung, Wasser, Unterkunft und ausreichend Schlaf',
        },
        {
          id: 'ms_saf', level: 'safety',
          fa: 'احساس امنیت مالی، شغلی و محیطی دارم',
          en: 'I feel financially, professionally, and environmentally secure',
          de: 'Ich fühle mich finanziell, beruflich und umweltmäßig sicher',
        },
        {
          id: 'ms_bel', level: 'belonging',
          fa: 'روابط صمیمی و معنادار دارم و احساس تعلق می‌کنم',
          en: 'I have intimate, meaningful relationships and feel a sense of belonging',
          de: 'Ich habe enge, bedeutungsvolle Beziehungen und fühle ein Zugehörigkeitsgefühl',
        },
        {
          id: 'ms_est', level: 'esteem',
          fa: 'احساس می‌کنم دیگران مرا احترام می‌گذارند و به خودم اعتماد دارم',
          en: 'I feel respected by others and have confidence in myself',
          de: 'Ich fühle mich von anderen respektiert und habe Selbstvertrauen',
        },
        {
          id: 'ms_sel', level: 'selfActualization',
          fa: 'در مسیر شکوفایی توانایی‌هایم و رسیدن به اهداف معنادار زندگی هستم',
          en: 'I am on a path to actualise my abilities and achieve meaningful life goals',
          de: 'Ich befinde mich auf einem Weg, meine Fähigkeiten zu verwirklichen und bedeutungsvolle Lebensziele zu erreichen',
        },
      ],
    },
  ],
}

// Flatten all questions for pagination
export function getFlatQuestions() {
  return questionnaire.sections.flatMap(s =>
    s.questions.map(q => ({ ...q, sectionId: s.id, sectionIcon: s.icon }))
  )
}

// Total question count
export const TOTAL_QUESTIONS = questionnaire.sections.reduce(
  (acc, s) => acc + s.questions.length, 0
)
