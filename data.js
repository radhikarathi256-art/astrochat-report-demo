/* Report content, keyed by language.
   Every id in LANGS has a body here — the picker promises nine languages, so a
   fallback to the English body would make the sample read as broken. `dev` is
   set only for Devanagari (Hindi, Marathi); the other scripts take the system
   font, which covers them. */
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

/* The report body, re-transcribed from the Figma board at 3366:6885 ("R.11
   Sample report · reworked") — fifteen sections, each an eyebrow with its own
   glyph, a heading, a paragraph and one piece of evidence. `k` names the
   evidence block; the renderer in app.js has a branch per kind. `ic` is the
   eyebrow glyph and `c` is the short label the jump index uses.

   The lock chips are gone. The old sample held twelve of fourteen answers back
   behind "In your full report", which made the preview an argument rather than
   a reading — she had to take on trust that the thing she could not see was
   worth ₹49. The board gives all fifteen away and sells on the two CTA cards
   instead: the pitch is no longer "there is more", it is "this one is Riya's,
   yours will say something else". */
window.RSECS = [
  { e: 'WHEN YOU MEET', c: 'When you meet', ic: 'cal',
    h: 'Your strongest window is 2027',
    p: 'Jupiter moves into your 7th house in March 2027. That is when meeting someone serious is most likely.',
    k: 'chance', label: 'CHANCE OF MEETING · every 6 months', dec: 'moon',
    rows: [['H2 26', 30], ['H1 27', 85], ['H2 27', 100], ['H1 28', 55], ['H2 28', 35], ['H1 29', 25]],
    winLabel: 'YOUR STRONGEST WINDOW', win: 'March 2027 to November 2027' },

  { e: 'WHO THEY ARE', c: 'Who they are', ic: 'user',
    h: 'Calm, creative and family-minded',
    p: 'Venus sits in your 7th house, so your partner brings warmth and patience. Their work is likely creative, like design, writing or teaching.',
    k: 'bars', label: 'PARTNER TRAITS · out of 10', dec: 'hearts',
    rows: [['Warmth', 8], ['Loyalty', 9], ['Creativity', 8], ['Patience', 6], ['Ambition', 7]] },

  { e: 'PHYSICAL TRAITS', c: 'Looks', ic: 'eye',
    h: 'Tall, with a calm and kind face',
    p: 'These are likely signs from your 7th house and its lord. Use them as a hint, not an exact picture.',
    k: 'tiles', dec: 'leaf',
    rows: [['HEIGHT', 'Taller than you'], ['BUILD', 'Lean to medium'],
      ['COMPLEXION', 'Wheatish'], ['FACE', 'Oval, soft jaw'],
      ['EYES', 'Warm, expressive'], ['STYLE', 'Simple and neat']] },

  { e: 'WHERE THEY COME FROM', c: 'Where from', ic: 'pin',
    h: 'From a nearby city, a known family',
    p: 'Your 7th lord sits in the 9th house. This points to someone from another city, but not far from yours.',
    k: 'rows', dec: 'pin',
    rows: [['DIRECTION', 'North or east of your home'], ['DISTANCE', 'Within a day of travel'],
      ['FAMILY', 'Educated, close and respected']] },

  { e: 'HOW YOU WILL MEET', c: 'How you meet', ic: 'people',
    h: 'Through people you trust',
    p: 'You are likely to meet through your circle, not online.',
    k: 'rows', dec: 'lights',
    rows: [['WHERE', 'At a family function or on a trip'], ['THROUGH', 'A friend or a relative'],
      ['FIRST SIGN', 'You talk for a long time at the first meeting']] },

  { e: 'YOUR FIRST MEETING', c: 'First meeting', ic: 'cup',
    h: 'Easy, warm and a little shy',
    p: 'Moon and Venus together show a first meeting that feels natural, not forced.',
    k: 'rows', dec: 'cups',
    rows: [['SETTING', 'A small get-together, not a formal meet'], ['FEELING', 'Comfort first, attraction grows slowly'],
      ['LOOK FOR', 'They remember small things you said']] },

  { e: 'LOVE OR ARRANGED', c: 'Love or arranged', ic: 'rings',
    h: 'Arranged, with love',
    p: 'Your chart points to a match your family brings, where you choose with your heart.',
    k: 'split', dec: 'rings', pct: 70,
    rows: [['70% Arranged, with love', '30% Love first']] },

  { e: 'YOUR KUNDALI', c: 'Kundali', ic: 'chart',
    h: 'Your 7th house, explained',
    p: 'The 7th house is your marriage house. Here is what sits in it, and what it means for you.',
    k: 'kundali', dec: 'orbit',
    houses: { 1: 'Asc', 4: 'Moon', 7: 'Venus', 9: 'Sat', 10: 'Sun Mer', 12: 'Rahu' },
    legend: [['7th house · Venus', 'Love comes with warmth and care. A steady, kind partner.'],
      ['9th house · lord of your 7th', 'Your partner is likely from another city or a different background.']] },

  /* New on this board. Every other section says what will happen; this is the
     only one that says what is in the way, which is the question people
     actually arrive with. */
  { e: 'WHAT IS BLOCKING IT', c: 'What is blocking', ic: 'shield',
    h: 'Rahu is slowing things down',
    p: 'Rahu sits close to your 7th house. It brings delays and the wrong people first.',
    k: 'rows', dec: 'orbit',
    rows: [['WHAT IT DOES', 'Pulls in people who are not right for you'],
      ['UNTIL', 'It moves on in early 2027'],
      ['WHAT HELPS', 'Small steps in the Remedies section']] },

  { e: 'YOUR IN-LAWS', c: 'In-laws', ic: 'home',
    h: 'Caring, with a few old rules',
    p: 'Your 4th and 10th houses show a family that cares, but likes things done their way.',
    k: 'rows', dec: 'house',
    rows: [['MOTHER-IN-LAW', 'Warm, gets close in the first year'], ['FATHER-IN-LAW', 'Quiet and fair'],
      ['TIP', 'Learn their routines early']] },

  { e: 'WILL IT STAY STRONG', c: 'Stay strong', ic: 'arrow',
    h: 'Strong, if you talk openly',
    p: 'Jupiter looks at your 7th house and protects the bond. Small fights pass quickly.',
    k: 'rows', dec: 'plant',
    rows: [['STRENGTH', 'Trust and shared values'], ['WATCH FOR', 'Holding back your feelings'],
      ['BEST YEARS', '2028 to 2031']] },

  { e: 'FAMILY & MARRIAGE', c: 'Family', ic: 'spark',
    h: 'A good start for a steady marriage',
    k: 'tags', dec: 'lamp',
    rows: [['Manglik reading', 'NOT PRESENT', 'No Mangal dosha in your chart. No special pooja needed for this.'],
      ['Family blessing', 'SLOW START', 'Their family may take time to say yes. Patience helps here.']] },

  { e: 'WHAT TO DO NOW', c: 'What to do', ic: 'list',
    h: 'Three small steps for this year',
    k: 'tips', dec: 'lotus',
    rows: [['Say yes to family events', 'Most likely place to meet, early 2027.'],
      ['Wear light colours on Fridays', 'Friday is Venus day, your 7th house planet.'],
      ['Talk openly with your parents', 'It helps the family part go smoothly.']] },

  { e: 'REMEDIES', c: 'Remedies', ic: 'beads',
    h: 'Simple remedies for your chart',
    p: 'Small, easy steps that support Venus and Jupiter in your chart.',
    k: 'rows', dec: 'mala',
    rows: [['MANTRA', 'Om Shukraya Namah, 11 times on Fridays'], ['GIVE', 'White sweets at a temple on Fridays'],
      ['WEAR', 'Light pink or white on Fridays']] },

  { e: 'LUCKY FOR YOU', c: 'Lucky for you', ic: 'sun',
    h: 'Your love signs',
    k: 'tiles', dec: 'stars',
    rows: [['DAY', 'Friday'], ['COLOUR', 'Light pink'], ['NUMBER', '6']] }
];

/* The two cards the board drops into the run of sections, after "Where they
   come from" and after "What is blocking it" — the places a reader is most
   likely to have stopped nodding and started wondering about her own chart.
   `after` is the index of the section they follow. Sample only: in the bought
   report there is nothing left to sell, and a card asking her to buy the thing
   she is reading would read as a bug. */
window.RCTAS = [
  { after: 3, h: 'Want this for your chart?',
    p: 'Astro Hemali makes your report from your own birth details. One-time, no subscription.' },
  { after: 8, h: 'Your answers will be different',
    p: 'Every chart is unique. Get yours made by Astro Hemali in about 30 minutes.' }
];

/* The demo-chart banner and the jump index, straight off the board. Fifteen
   answers in a scroll this long needs a way in that is not the scrollbar. */
window.RINDEX = {
  h: 'This is a sample on a demo chart',
  p: 'Riya · 14 Mar 1997 · 6:20 AM · Jaipur. Your report is made from your own birth chart.',
  jump: '15 answers in this sample · tap to jump'
};

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
  },
  hinglish: {
    dev: false,
    navTitle: 'Sample report',
    chip: 'Hinglish',
    bandSub: 'Marriage Yog report · Sample',
    tag: 'SAMPLE',
    title: 'Marriage Yog Report',
    subtitle: 'Astro Hemali ki aapke liye reading',
    name: 'Priya, 26',
    bpLabel: 'MUKHYA BAAT',
    bpText: 'Aapka vivah bhav mazboot hai. Sabse achha samay March se November 2027 ke beech hai. Usse pehle ghar mein baat shuru ho sakti hai.',
    scores: [
      { v: '72/100', l: 'Marriage score' },
      { v: '60/100', l: 'Sasural se apnapan' }
    ],
    coversLabel: 'IS REPORT MEIN KYA HAI',
    covers: [
      'Aapki shaadi kab hogi',
      'Jeevansaathi kaisa hoga: swabhav, kaam, parivaar',
      'Love marriage ya arranged',
      'Aapke sasural waale aur parivaar',
      'Shaadi ke baad paisa aur bachche',
      'Manglik dosh aur upay'
    ],
    footnote: 'Poori report mein 10 sections hain, aapki chat se banayi gayi.',
    buy: 'Buy in Hinglish',
    oneTime: 'One-time'
  },
  bn: {
    dev: false,
    navTitle: 'নমুনা রিপোর্ট',
    chip: 'বাংলা',
    bandSub: 'বিবাহ যোগ রিপোর্ট · নমুনা',
    tag: 'নমুনা',
    title: 'বিবাহ যোগ রিপোর্ট',
    subtitle: 'অ্যাস্ট্রো হেমালির আপনার জন্য রিডিং',
    name: 'প্রিয়া, ২৬',
    bpLabel: 'প্রধান কথা',
    bpText: 'আপনার বিবাহ ভাব শক্তিশালী। সবচেয়ে ভালো সময় ২০২৭ সালের মার্চ থেকে নভেম্বর। তার আগে পরিবারে কথা শুরু হতে পারে।',
    scores: [
      { v: '৭২/১০০', l: 'বিবাহ স্কোর' },
      { v: '৬০/১০০', l: 'শ্বশুরবাড়ির আন্তরিকতা' }
    ],
    coversLabel: 'এই রিপোর্টে যা আছে',
    covers: [
      'আপনার বিয়ে কবে হবে',
      'জীবনসঙ্গী কেমন হবে: স্বভাব, কাজ, পরিবার',
      'প্রেমের বিয়ে না সম্বন্ধ করে',
      'আপনার শ্বশুরবাড়ি ও পরিবার',
      'বিয়ের পর টাকা ও সন্তান',
      'মাঙ্গলিক দোষ ও প্রতিকার'
    ],
    footnote: 'সম্পূর্ণ রিপোর্টে ১০টি অংশ আছে, আপনার চ্যাট থেকে তৈরি।',
    buy: 'Buy in Bengali',
    oneTime: 'একবার'
  },
  mr: {
    dev: true,
    navTitle: 'नमुना अहवाल',
    chip: 'मराठी',
    bandSub: 'विवाह योग अहवाल · नमुना',
    tag: 'नमुना',
    title: 'विवाह योग अहवाल',
    subtitle: 'अ‍ॅस्ट्रो हेमालीचे तुमच्यासाठी वाचन',
    name: 'प्रिया, 26',
    bpLabel: 'मुख्य गोष्ट',
    bpText: 'तुमचे विवाह स्थान मजबूत आहे. सर्वात चांगला काळ मार्च ते नोव्हेंबर 2027 दरम्यान आहे. त्याआधी घरात बोलणी सुरू होऊ शकतात.',
    scores: [
      { v: '72/100', l: 'विवाह स्कोअर' },
      { v: '60/100', l: 'सासरचा जिव्हाळा' }
    ],
    coversLabel: 'या अहवालात काय आहे',
    covers: [
      'तुमचे लग्न कधी होईल',
      'जोडीदार कसा असेल: स्वभाव, काम, कुटुंब',
      'प्रेमविवाह की ठरवून',
      'तुमचे सासर आणि कुटुंब',
      'लग्नानंतर पैसा आणि मुले',
      'मंगळ दोष आणि उपाय'
    ],
    footnote: 'पूर्ण अहवालात 10 विभाग आहेत, तुमच्या चॅटवरून तयार केलेले.',
    buy: 'Buy in Marathi',
    oneTime: 'एकदाच'
  },
  gu: {
    dev: false,
    navTitle: 'નમૂના રિપોર્ટ',
    chip: 'ગુજરાતી',
    bandSub: 'લગ્ન યોગ રિપોર્ટ · નમૂનો',
    tag: 'નમૂનો',
    title: 'લગ્ન યોગ રિપોર્ટ',
    subtitle: 'એસ્ટ્રો હેમાલીનું તમારા માટે વાંચન',
    name: 'પ્રિયા, 26',
    bpLabel: 'મુખ્ય વાત',
    bpText: 'તમારું લગ્ન સ્થાન મજબૂત છે. સૌથી સારો સમય માર્ચથી નવેમ્બર 2027 વચ્ચે છે. તે પહેલાં ઘરમાં વાત શરૂ થઈ શકે છે.',
    scores: [
      { v: '72/100', l: 'લગ્ન સ્કોર' },
      { v: '60/100', l: 'સાસરિયાંનો સ્નેહ' }
    ],
    coversLabel: 'આ રિપોર્ટમાં શું છે',
    covers: [
      'તમારાં લગ્ન ક્યારે થશે',
      'જીવનસાથી કેવો હશે: સ્વભાવ, કામ, પરિવાર',
      'પ્રેમ લગ્ન કે ગોઠવેલાં',
      'તમારું સાસરું અને પરિવાર',
      'લગ્ન પછી પૈસા અને બાળકો',
      'માંગલિક દોષ અને ઉપાય'
    ],
    footnote: 'પૂરા રિપોર્ટમાં 10 વિભાગ છે, તમારી ચેટમાંથી બનાવેલ.',
    buy: 'Buy in Gujarati',
    oneTime: 'એક વખત'
  },
  ta: {
    dev: false,
    navTitle: 'மாதிரி அறிக்கை',
    chip: 'தமிழ்',
    bandSub: 'திருமண யோக அறிக்கை · மாதிரி',
    tag: 'மாதிரி',
    title: 'திருமண யோக அறிக்கை',
    subtitle: 'ஆஸ்ட்ரோ ஹேமாலியின் உங்களுக்கான வாசிப்பு',
    name: 'பிரியா, 26',
    bpLabel: 'முக்கியமானது',
    bpText: 'உங்கள் திருமண ஸ்தானம் வலுவானது. சிறந்த காலம் 2027 மார்ச் முதல் நவம்பர் வரை. அதற்கு முன்பே வீட்டில் பேச்சு தொடங்கலாம்.',
    scores: [
      { v: '72/100', l: 'திருமண மதிப்பெண்' },
      { v: '60/100', l: 'மாமியார் வீட்டு அன்பு' }
    ],
    coversLabel: 'இந்த அறிக்கையில் உள்ளவை',
    covers: [
      'உங்கள் திருமணம் எப்போது',
      'வாழ்க்கைத் துணை எப்படி: குணம், வேலை, குடும்பம்',
      'காதல் திருமணமா, பெரியவர்கள் பார்ப்பதா',
      'உங்கள் மாமியார் வீடு மற்றும் குடும்பம்',
      'திருமணத்திற்குப் பின் பணம், குழந்தைகள்',
      'செவ்வாய் தோஷம் மற்றும் பரிகாரம்'
    ],
    footnote: 'முழு அறிக்கையில் 10 பகுதிகள், உங்கள் அரட்டையிலிருந்து உருவாக்கியது.',
    buy: 'Buy in Tamil',
    oneTime: 'ஒரு முறை'
  },
  te: {
    dev: false,
    navTitle: 'నమూనా నివేదిక',
    chip: 'తెలుగు',
    bandSub: 'వివాహ యోగ నివేదిక · నమూనా',
    tag: 'నమూనా',
    title: 'వివాహ యోగ నివేదిక',
    subtitle: 'ఆస్ట్రో హేమాలి మీ కోసం చేసిన రీడింగ్',
    name: 'ప్రియ, 26',
    bpLabel: 'ముఖ్య విషయం',
    bpText: 'మీ వివాహ స్థానం బలంగా ఉంది. మంచి సమయం 2027 మార్చి నుండి నవంబర్ వరకు. అంతకు ముందే ఇంట్లో మాట మొదలవ్వవచ్చు.',
    scores: [
      { v: '72/100', l: 'వివాహ స్కోరు' },
      { v: '60/100', l: 'అత్తవారి ఆప్యాయత' }
    ],
    coversLabel: 'ఈ నివేదికలో ఏమి ఉంది',
    covers: [
      'మీ పెళ్లి ఎప్పుడు అవుతుంది',
      'జీవిత భాగస్వామి ఎలా ఉంటారు: స్వభావం, పని, కుటుంబం',
      'ప్రేమ వివాహమా, పెద్దలు కుదిర్చినదా',
      'మీ అత్తవారు మరియు కుటుంబం',
      'పెళ్లి తర్వాత డబ్బు, పిల్లలు',
      'కుజ దోషం మరియు పరిహారాలు'
    ],
    footnote: 'పూర్తి నివేదికలో 10 విభాగాలు, మీ చాట్ నుండి తయారు చేశాం.',
    buy: 'Buy in Telugu',
    oneTime: 'ఒకసారి'
  },
  kn: {
    dev: false,
    navTitle: 'ಮಾದರಿ ವರದಿ',
    chip: 'ಕನ್ನಡ',
    bandSub: 'ವಿವಾಹ ಯೋಗ ವರದಿ · ಮಾದರಿ',
    tag: 'ಮಾದರಿ',
    title: 'ವಿವಾಹ ಯೋಗ ವರದಿ',
    subtitle: 'ಆಸ್ಟ್ರೋ ಹೇಮಾಲಿ ನಿಮಗಾಗಿ ಮಾಡಿದ ಓದು',
    name: 'ಪ್ರಿಯಾ, 26',
    bpLabel: 'ಮುಖ್ಯ ವಿಷಯ',
    bpText: 'ನಿಮ್ಮ ವಿವಾಹ ಸ್ಥಾನ ಬಲವಾಗಿದೆ. ಅತ್ಯುತ್ತಮ ಸಮಯ 2027ರ ಮಾರ್ಚ್‌ನಿಂದ ನವೆಂಬರ್‌ವರೆಗೆ. ಅದಕ್ಕೂ ಮೊದಲು ಮನೆಯಲ್ಲಿ ಮಾತು ಶುರುವಾಗಬಹುದು.',
    scores: [
      { v: '72/100', l: 'ವಿವಾಹ ಸ್ಕೋರ್' },
      { v: '60/100', l: 'ಅತ್ತೆಮನೆಯ ಪ್ರೀತಿ' }
    ],
    coversLabel: 'ಈ ವರದಿಯಲ್ಲಿ ಏನಿದೆ',
    covers: [
      'ನಿಮ್ಮ ಮದುವೆ ಯಾವಾಗ ಆಗುತ್ತದೆ',
      'ಸಂಗಾತಿ ಹೇಗಿರುತ್ತಾರೆ: ಸ್ವಭಾವ, ಕೆಲಸ, ಕುಟುಂಬ',
      'ಪ್ರೇಮ ವಿವಾಹವೋ ಹಿರಿಯರು ನಿಶ್ಚಯಿಸಿದ್ದೋ',
      'ನಿಮ್ಮ ಅತ್ತೆಮನೆ ಮತ್ತು ಕುಟುಂಬ',
      'ಮದುವೆಯ ನಂತರ ಹಣ ಮತ್ತು ಮಕ್ಕಳು',
      'ಮಾಂಗಲಿಕ ದೋಷ ಮತ್ತು ಪರಿಹಾರ'
    ],
    footnote: 'ಪೂರ್ಣ ವರದಿಯಲ್ಲಿ 10 ವಿಭಾಗಗಳಿವೆ, ನಿಮ್ಮ ಚಾಟ್‌ನಿಂದ ತಯಾರಿಸಲಾಗಿದೆ.',
    buy: 'Buy in Kannada',
    oneTime: 'ಒಮ್ಮೆ'
  }
};
