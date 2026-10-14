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
