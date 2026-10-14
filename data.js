/* Report content, keyed by language.
   Only English and Hindi are written out; every other language in the picker falls back to the
   English body with its own chip label, which is what the Figma flow shows too. */
window.LANGS = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'Hindi', native: 'हिंदी' },
  { id: 'hinglish', label: 'Hinglish' },
  { id: 'bn', label: 'Bengali' },
  { id: 'mr', label: 'Marathi' },
  { id: 'gu', label: 'Gujarati' },
  { id: 'ta', label: 'Tamil' },
  { id: 'te', label: 'Telugu' },
  { id: 'kn', label: 'Kannada' }
];

window.SAMPLE = {
  en: {
    dev: false,
    navTitle: 'Sample report',
    chip: 'English',
    bandSub: 'Marriage Yog report · Sample',
    tag: 'SAMPLE',
    title: 'Marriage Yog report',
    subtitle: 'Your personal reading by Astro Hemali',
    name: 'Priya, 26',
    bpLabel: 'THE BIG PICTURE',
    bpText: 'Your marriage house is strong. The clearest window opens between March and November 2027. Family talks may start before that.',
    scores: [
      { v: '72/100', l: 'Marriage score' },
      { v: '60/100', l: 'In-law warmth' }
    ],
    coversLabel: 'WHAT THIS REPORT COVERS',
    covers: [
      'When you are likely to marry',
      'Who you will marry: nature, work, family',
      'Love or arranged marriage',
      'Your in-laws and family',
      'Money and children after marriage',
      'Manglik reading and remedies'
    ],
    footnote: 'Full report has 10 sections, made for you from your chat.',
    buy: 'Buy in English',
    oneTime: 'One-time'
  },
  hi: {
    dev: true,
    navTitle: 'नमूना रिपोर्ट',
    chip: 'हिंदी',
    bandSub: 'विवाह योग रिपोर्ट · नमूना',
    tag: 'नमूना',
    title: 'विवाह योग रिपोर्ट',
    subtitle: 'एस्ट्रो हेमाली की आपके लिए रीडिंग',
    name: 'प्रिया, 26',
    bpLabel: 'मुख्य बात',
    bpText: 'आपका विवाह भाव मज़बूत है। सबसे अच्छा समय मार्च से नवंबर 2027 के बीच है। उससे पहले परिवार में बात शुरू हो सकती है।',
    scores: [
      { v: '72/100', l: 'विवाह स्कोर' },
      { v: '60/100', l: 'ससुराल से अपनापन' }
    ],
    coversLabel: 'इस रिपोर्ट में क्या है',
    covers: [
      'आपकी शादी कब होगी',
      'जीवनसाथी कैसा होगा: स्वभाव, काम, परिवार',
      'लव मैरिज या अरेंज्ड',
      'आपके ससुराल वाले और परिवार',
      'शादी के बाद पैसा और बच्चे',
      'मांगलिक दोष और उपाय'
    ],
    footnote: 'पूरी रिपोर्ट में 10 सेक्शन हैं, आपकी चैट से बनाई गई।',
    buy: 'Buy in Hindi',
    oneTime: 'एक बार'
  }
};
