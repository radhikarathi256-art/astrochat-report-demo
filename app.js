/* AstroChat · "Sell report from Today" demo.
   One router over absolutely-positioned .screen elements, plus the few bits of
   content that are easier to generate than to hand-write nine times over
   (coin ladder, bottom nav, language list, sample body, full report body). */
(function () {
'use strict';

var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

var LANGS = window.LANGS, SAMPLE = window.SAMPLE;

/* The seven chapters. Chapter 1 is the hook and the only free one — general on
   purpose, ending on the chapter-2 tease. The other six are what ₹49 buys. */
var CHAPTERS = [
  { t: 'Why Rahu is delaying your marriage',  s: 'What is actually blocking it, and how to clear it' },
  { t: 'The person you will marry',           s: 'Nature, work, family — and where you meet' },
  { t: 'Your marriage windows, year by year', s: 'The three clearest openings in your chart' },
  { t: 'Love marriage or arranged?',          s: 'Which way your chart leans, and why' },
  { t: 'Are you Manglik — and how serious?',  s: 'The honest answer, without the fear' },
  { t: 'Will your in-laws be warm?',          s: 'The home you are marrying into' },
  { t: 'How money changes after marriage',    s: 'Your chart after the wedding' }
];

/* Chapter 1, readable in full. It names the blocker, gives one near-term thing
   she can check herself (the Waiter persona leaves without one), and ends
   pointing every open question at the locked chapters. */
var CHAPTER_BODY = [
  ['Mansi ji, aapke saatve ghar — shaadi ke ghar — mein Rahu baitha hai. Yehi woh graha hai jo baat bante bante rok deta hai: rishta aage badhta hai, phir achanak thanda pad jaata hai.',
   'Yeh aapki kami nahi hai. Rahu ka kaam hi deri aur confusion dalna hai. Aapke chart mein iska zor 2026 ke end se kam hona shuru ho jaata hai.',
   'Ise aap khud check kar sakti hain: November ke aakhri hafte mein ek ruki hui baat apne aap phir se khulegi. Dhyan rakhiye.',
   'Seedha matlab: jo rishte ab tak ruke, unka rukna likha tha. Aage ka raasta khul raha hai — kab, kiske saath aur kaise, woh agle chapters mein.']
];

/* One person, three mornings. The story never moves past chapter 1: until she
   reads it every surface nudges the read, and the moment she has read it every
   surface asks for the other six. Day 3 only adds the deadline. */
var JOURNEY = {
  1: {
    stamp: 'Just now',
    /* Day 1's chat is left exactly as it is today — complete answer, billing
       notice, done. The report's first appearance is the Today expert card. */
    msgs: [
      { who: 'sys',    text: 'Astrologer has joined to guide you' },
      { who: 'user',   text: 'Will I have a healthy relationship with my partner?' },
      { who: 'hemali', text: 'Mansi ji, maine aapki kundli dekh li. Aapke saatve ghar mein Rahu baitha hai — isi wajah se baat bante bante ruk jaati hai.' },
      { who: 'hemali', text: 'Pareshan mat hoiye, iska upay hai. Poora maine likh diya hai aapke liye.' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' }
    ],
    today: { eyebrow: '✦ Chapter 1 of 7 · open', note: 'Chapter 1 free hai — padhiye. Poori report ₹49, ₹499 se price drop.' },
    countdown: '✦ NEXT FREE 2 MIN CHAT IN <b>14h : 23m</b>'
  },
  2: {
    stamp: 'Yesterday',
    /* She came back for the chat, so the chat answers first — her question IS
       the chapter — and the ask waits for the end. Which script she gets
       depends on one thing only: has she read chapter 1. */
    msgsUnread: [
      { who: 'hemali', text: 'Mansi ji! Kal aapne partner ke baare mein poochha tha — uska poora jawab maine chapter 1 mein likh diya hai.' },
      { who: 'hemali', text: 'Aapne abhi tak padha nahi. Do minute lagenge — padhiye:' },
      { who: 'chapter', idx: 0 },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' }
    ],
    msgsRead: [
      { who: 'hemali', text: 'Aapne chapter 1 padh liya — ab aap jaanti hain rukavat kya thi.' },
      { who: 'user',   text: 'Haan, Rahu wali baat bilkul sahi lagi 😳' },
      { who: 'hemali', text: 'Aage ke 6 chapters mein likha hai: kaun hoga, kab hoga, love ya arranged. Poori report ₹49 mein — ₹499 se price drop chal raha hai.' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' },
      { who: 'pitch' }
    ],
    today: { eyebrow: '✦ Chapter 1 of 7 · open', note: '' },
    countdown: '✦ FREE 2 MIN CHAT READY'
    /* No push on day 2 — the chapter-1 read push fires on day 3 only (user ruling). */
  },
  3: {
    stamp: '2 days ago',
    msgsUnread: [
      { who: 'hemali', text: 'Mansi ji, aaj aakhri din hai — ₹49 wali price aaj raat khatam ho rahi hai.' },
      { who: 'hemali', text: 'Par pehle woh padhiye jo maine aapke liye likha tha. Free hai —' },
      { who: 'chapter', idx: 0 },
      { who: 'ended',  text: 'Your free minutes are over. ₹49 price aaj raat khatam ho rahi hai.' }
    ],
    msgsRead: [
      { who: 'hemali', text: 'Aapne chapter 1 padh liya. Baaki 6 chapters mein aapki timing, partner, love ya arranged — sab likha hai.' },
      { who: 'hemali', text: 'Aaj raat ke baad yeh wapas ₹499 ki ho jayegi. Aaj ₹49 mein khul jaati hai.' },
      { who: 'ended',  text: 'Your free minutes are over. ₹49 price aaj raat khatam ho rahi hai.' },
      { who: 'pitch' }
    ],
    today: { eyebrow: '✦ Last day · ₹49 ends tonight', note: '' },
    countdown: '✦ FREE 2 MIN CHAT READY',
    push: 'Aakhri din — ₹49 price aaj raat khatam. Chapter 1 abhi bhi free hai 📖'
  }
};

/* The other track: she read chapter 1 on day 1, so her mornings are buy
   nudges, not read nudges — days 2 and 3 sell on curiosity, day 4 closes on
   the deadline. The deadline always sits on the track's LAST day. */
var READ_JOURNEY = {
  2: {
    stamp: 'Yesterday',
    msgs: [
      { who: 'hemali', text: 'Aapne chapter 1 padh liya — ab aap jaanti hain rukavat kya thi.' },
      { who: 'user',   text: 'Haan, Rahu wali baat bilkul sahi lagi 😳' },
      { who: 'hemali', text: 'Aage ke 6 chapters mein likha hai: kaun hoga, kab hoga, love ya arranged. Poori report ₹49 mein — ₹499 se price drop chal raha hai.' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' },
      { who: 'pitch' }
    ],
    today: { eyebrow: '✦ Chapter 1 padh liya ✓', note: '' },
    countdown: '✦ FREE 2 MIN CHAT READY',
    push: 'Kal jo padha tha, uske aage ke 6 chapters ₹49 mein khul rahe hain 📖'
  },
  3: {
    stamp: '2 days ago',
    msgs: [
      { who: 'hemali', text: 'Mansi ji, jo rukavat chapter 1 mein padhi thi — uska poora jawab baaki 6 chapters mein hai. Kaun, kab, love ya arranged.' },
      { who: 'hemali', text: 'Price drop abhi bhi chal raha hai: poori report ₹49 mein, ₹499 se.' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' },
      { who: 'pitch' }
    ],
    today: { eyebrow: '✦ Chapter 1 padh liya ✓', note: '' },
    countdown: '✦ FREE 2 MIN CHAT READY',
    push: 'Aapki report ab bhi ₹49 par hai — kaun aur kab, sab andar 📖'
  },
  4: {
    stamp: '3 days ago',
    msgs: [
      { who: 'hemali', text: 'Mansi ji, aaj aakhri din hai — ₹49 wali price aaj raat khatam ho rahi hai.' },
      { who: 'hemali', text: 'Chapter 1 mein aapne rukavat padhi. Baaki 6 chapters mein uska jawab hai — kaun, kab, love ya arranged.' },
      { who: 'ended',  text: 'Your free minutes are over. ₹49 price aaj raat khatam ho rahi hai.' },
      { who: 'pitch' }
    ],
    today: { eyebrow: '✦ Last day · ₹49 ends tonight', note: '' },
    countdown: '✦ FREE 2 MIN CHAT READY',
    push: 'Aakhri din — ₹49 price aaj raat khatam. Baaki 6 chapters abhi kholiye 📖'
  }
};

/* ---------------------------------------------------------------- PM spec track
   The product brief as written: the pitch waits 10 minutes after the free chat
   so it never sits on top of the daily reward or the paid-chat decision; three
   reports are offered and the user picks; there is no free chapter, only a
   preview; day 2 re-offers in the free chat and on Today. Kept as its own track
   so the two models can be clicked side by side. */
/* Three reports: finding someone, marrying them, and work. Each one carries
   - `learn`: the questions it answers, written against HER chart. This is the
     sell, so it is phrased as her questions, not as a contents page.
   - `ask`:  the brief's sixth point — what she leaves the report wanting to
     ask the astrologer.
   - `cover`: its own colourway, so three reports do not look like one product.
   - `sample`: the whole report on the demo chart, for the free preview. */
var REPORTS = [
  {
    id: 'partner', t: 'Partner Prediction', s: 'Kaun, kahan, kab milega — aur kya rok raha hai', pages: 38,
    why: 'Aapke saatve ghar mein Rahu — isi par aapne poochha tha',
    cover: { a: '#F0668B', b: '#8B2F55', ink: '#FFE4EC', motif: 'heart' },
    learn: [
      'Aapka partner dikhne mein kaisa hoga — kundli se bani tasveer',
      'Is janam mein sachcha pyaar kab milega',
      'Kahan aur kaise mulaqat hogi',
      'Rishta kaisa chalega — rozmarra ki sachchai',
      'Abhi us vyakti se milne mein kya rukavat hai',
      'Love hoga ya arranged — chart kya kehta hai',
      'Baar baar kis tarah ke galat log aapki taraf khinchte hain',
      'Aapki attachment style aur love language',
      'Kis tarah ka saathi aapke liye sabse sahi hai',
      'Roz kya kijiye jisse woh vyakti paas aaye'
    ],
    ask: [
      { q: 'Woh kahan milega?',             a: 'Aapke navamsa se disha saaf hai — kaam ya padhai ki jagah se juda hua parichay. Akele kisi anjaan jagah par nahi; kisi jaan-pehchaan ke beech se.' },
      { q: 'Rahu ka upay kya hai?',          a: 'Budhwar ko Durga ji ka dhyan aur ek vyakti ko bhojan. Aur jo baat atki hai, usme teen hafte tak koi naya vaada mat kijiye.' },
      { q: 'Galat log kyun aate hain?',      a: 'Rahu wahi dikhata hai jo turant mil jaaye. Jo rishta pehle hafte mein hi bahut tez lage — wahi aapka pattern hai. Teen hafte rukiye, pattern toot jaata hai.' }
    ]
  },
  {
    id: 'marriage', t: 'Marriage Report', s: 'Manglik, timing, sasuraal aur gun milan', pages: 42,
    why: 'Saatve ghar mein Rahu ke saath Mangal ka sawaal bhi hai',
    cover: { a: '#E8973C', b: '#8A4A12', ink: '#FFEBD4', motif: 'knot' },
    learn: [
      'Main Manglik hoon ya nahi — aur kitna gehra hai',
      'Shaadi kab hogi, aur sabse achha samay kaunsa hai',
      'Shaadi ke ghar ka poora kundli vishleshan',
      'Kaisa jeevansaathi aapke bhagya mein likha hai',
      'Sasuraal waale saath denge ya nahi',
      'Shaadi ke baad paise ki sthiti badlegi kya',
      '36 mein se kitne gun milte hain — poora compatibility',
      'Kaun se dosh hain aur unke theek upay'
    ],
    ask: [
      { q: 'Manglik kitna serious hai?',   a: 'Mangal aapke chart mein hai par kamzor sthiti mein — isse "nichla Manglik" kehte hain. Samaan chart wale saathi se yeh apne aap sant ho jaata hai.' },
      { q: 'Sabse achha mahina kaunsa?',    a: 'Jab Guru aapke saatve ghar ko dekhta hai. Us window mein baat bhi banti hai aur parivaar bhi raazi hota hai.' },
      { q: 'Sasuraal kaisa milega?',        a: 'Chauthe ghar ka swami theek hai — ghar shaant rahega. Shuruaat ke chh: mahine thoda adjustment maangenge, uske baad sthir.' }
    ]
  },
  {
    id: 'career', t: 'Career & Job', s: 'Switch, promotion, boss aur unka sahi time', pages: 34,
    why: 'Dasve ghar ka swami uchch ka hai, par Shani dekh raha hai',
    cover: { a: '#3E8FD6', b: '#1B4A78', ink: '#DCEBFA', motif: 'arrow' },
    learn: [
      'Aane waale teen mahine ka ek bada career theme',
      'Raise maangne aur idea rakhne ki sabse achhi tareekhein',
      'Business karein ya job — chart kya kehta hai',
      'Aapke boss aapke baare mein asal mein kya sochte hain',
      'Kaam mein kya badalna hai, aur kaam kaise dikhana hai',
      'Job switch ke liye achha mahina kaunsa hai',
      'Is job mein increment milne ki kitni sambhavna hai',
      'Kaam ki safalta ke liye rang, disha aur mantra'
    ],
    ask: [
      { q: 'Job change kab karun?',        a: 'Jab Guru aapke dasve ghar ko dekhega. Us window mein offer bhi achhi aati hai aur baat banti bhi hai — usse pehle sirf baat chalaiye, switch mat kijiye.' },
      { q: 'Boss kya sochte hain?',        a: 'Surya theek hai par Shani dekh raha hai — kaam par bharosa hai, dikhawe par nahi. Isliye aapka kaam unhe pata to hai, yaad nahi rehta.' },
      { q: 'Increment milega?',            a: 'Dasve ghar ka swami uchch ka hai, to haan — par maangne par, apne aap nahi. Jin tareekhon ka zikr report mein hai, unhi mein baat kijiye.' }
    ]
  }
];
function reportById(id) {
  for (var i = 0; i < REPORTS.length; i++) if (REPORTS[i].id === id) return REPORTS[i];
  return REPORTS[0];
}

/* Each day names the surfaces it is allowed to use — `surf` is the whole
   schedule, and every renderer reads it rather than guessing from the day
   number. Day 1 stays out of Today entirely: the chat, History and a
   notification carry it, so nothing competes with the daily reward. */
var PM_JOURNEY = {
  1: {
    stamp: 'Just now',
    surf: { chat: true, today: false, guide: false, hist: true },
    msgs: [
      { who: 'sys',    text: 'Astrologer has joined to guide you' },
      { who: 'user',   text: 'Will I have a healthy relationship with my partner?' },
      { who: 'hemali', text: 'Mansi ji, maine aapki kundli dekh li. Aapke saatve ghar mein Rahu baitha hai — isi wajah se baat bante bante ruk jaati hai.' },
      { who: 'hemali', text: 'Pareshan mat hoiye, iska upay hai.' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' },
      /* The brief's wait, made visible — nothing touches her until it passes. */
      { who: 'gap',    text: '15 minutes later' },
      { who: 'hemali', text: 'Mansi ji, aapke saatve ghar par maine poori report taiyar ki hai — Rahu ki rukavat, timing, partner kaisa hoga aur upay, sab usme hai. Ek doosri kundli par bani poori report free mein khuli hai — dekh lijiye ki kitni gehri hai.' },
      { who: 'offer3' }
    ],
    today: { eyebrow: '', note: '' },
    countdown: '✦ NEXT FREE 2 MIN CHAT IN <b>14h : 23m</b>',
    /* A notification that names her own house and opens that one preview beats
       a storefront ad that makes her choose again on the other side of the tap. */
    lead: 'partner',
    push: 'Mansi ji, aapke saatve ghar mein Rahu — Partner Prediction report poori free padh lijiye 📖'
  },
  /* `lead` is the one report each day actually suggests. Day 1 and 2 lead with
     the house she asked about; if that has not landed in two days the
     hypothesis was wrong, so days 3 and 4 change the question instead of
     repeating it. The other two are always one tap away, never stacked. */
  2: {
    stamp: 'Yesterday',
    lead: 'partner',
    surf: { chat: false, today: true, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi ji! Kal aapne partner ke baare mein poochha tha. Aaj kya poochhna hai?' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' }
    ],
    today: { eyebrow: '', note: '' },   // PM Today uses the expert card, not this slot
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  /* Days 3 and 4 are identical — Today keeps the offer and the chat joins in.
     Nothing escalates: same three reports, same preview, same price. */
  3: {
    stamp: '2 days ago',
    lead: 'career',
    surf: { chat: true, today: true, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi ji, ek aur baat chart mein dikhi — aapke dasve ghar par Shani ki drishti hai. Job aur promotion ki timing uspar tiki hai. Uski report bhi taiyar hai.' },
      { who: 'offer3' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' }
    ],
    today: { eyebrow: '', note: '' },   // PM Today uses the expert card, not this slot
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  /* Day 4 is the last ask. Nothing gets louder — one line of copy says so,
     because a silent last ask is a wasted one. */
  4: {
    stamp: '3 days ago',
    lead: 'marriage',
    lastAsk: true,
    surf: { chat: true, today: true, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi ji, ek baat reh gayi thi — aapke chart mein Mangal ka sawaal hai, isliye Manglik, shaadi ki timing aur sasuraal ka hissa alag report mein hai. Aaj dekh lijiye.' },
      { who: 'offer3' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' }
    ],
    today: { eyebrow: '', note: '' },   // PM Today uses the expert card, not this slot
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  /* Day 5: the stop. Everything the brief asks for has been asked four times —
     from here Today, the chat and History go quiet. */
  5: {
    stamp: '4 days ago',
    quiet: true,
    surf: { chat: false, today: false, guide: false, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi ji, bataiye — aaj kya poochhna hai?' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' }
    ],
    today: { eyebrow: '', note: '' },
    countdown: '✦ FREE 2 MIN CHAT READY'
  }
};

/* Daily-reward coins. The wallet is the habit loop's own currency — the report
   is flat ₹49 (down from ₹499) and never discounts off the wallet. */
var REWARD = { 1: 9, 2: 11, 3: 13, 4: 16, 5: 17 };
var WALLET_AT = { 1: 20, 2: 29, 3: 40, 4: 53, 5: 69 };   // start of each day, pre-answer

var state = {
  day: 1,
  answered: false,
  entry: 'today-a',
  wallet: 20,
  lang: 'en',
  langFrom: 'sample',   // which surface opened the language sheet
  paid: false,
  screen: 'today-a',
  stack: [],
  sheet: null,
  introShown: false,
  /* Coins collected on the 7-day ladder. Day 1 starts at 0 because the check-in
     is still unanswered — the intro sheet is asking for that first answer. */
  claimed: 0,
  reminded: false,
  /* Has she read chapter 1? Until then every surface pushes the read — chapter
     1 is the hook, and an unread hook sells nothing. Once read — on whichever
     day — the same surfaces flip to the buy. */
  read1: false,
  /* Which track the demo sits on: false = she never read chapter 1 (days 1-3),
     true = she read it on day 1 (days 2-4). Set by the journey switcher. */
  preRead: false,
  /* The post-purchase journey: she bought the report. Set by the switcher's
     "Report bought" entry; restart() carries it into state.paid. */
  prePaid: false,
  /* The PM-spec track: pitch 10 min after the chat, three reports to pick
     from, preview instead of a free chapter. Its own journey, its own
     surfaces — the chapter-1 model is untouched by it. */
  pm: false,
  pick: 'partner',  // which of the three reports she is looking at
  /* The morning's free chapter is waiting in History — the dot on the nav says
     so, and visiting History clears it. */
  histDot: true,
  timers: []
};

function clearTimers() {
  state.timers.forEach(clearTimeout);
  state.timers = [];
}
function later(fn, ms) {
  var t = setTimeout(fn, ms);
  state.timers.push(t);
  return t;
}

/* ---------------------------------------------------------------- router */
var screens = $('#screens');

function screenEl(id) { return $('#' + id); }

/* mode: 'push' (from the right), 'back' (reverse) or 'fade' */
function show(id, mode) {
  var next = screenEl(id), cur = screenEl(state.screen);
  if (!next || id === state.screen) return;

  // Only the outgoing and incoming screens may be painted. Without this a screen
  // left parked at .behind by an earlier push shows through the next fade.
  $$('.screen').forEach(function (s) {
    if (s !== cur && s !== next) s.classList.remove('on', 'behind');
  });

  next.classList.toggle('fade-in', mode === 'fade');

  if (mode === 'back') {
    // The outgoing screen slides back out to the right; the one underneath
    // was already parked at -24%, so just un-park it.
    cur.classList.remove('on');
    next.classList.remove('behind');
    next.classList.add('on');
  } else {
    if (cur && mode === 'push') { cur.classList.add('behind'); cur.classList.remove('on'); }
    else if (cur) { cur.classList.remove('on', 'behind'); }
    // Force a frame so the translateX(100%) start state is actually painted.
    next.offsetHeight;
    next.classList.add('on');
  }

  state.screen = id;
  if (id !== 'timeline') hideReadyPush();
  hidePush();
  var sc = $('[data-scroll]', next);
  if (sc) sc.scrollTop = 0;
  onEnter(id);
}

function go(id, mode) {
  if (mode !== 'back') state.stack.push(state.screen);
  show(id, mode || 'push');
}

function back() {
  var prev = state.stack.pop();
  if (!prev) prev = state.entry;
  show(prev, 'back');
}

function onEnter(id) {
  if (id === 'read') animateBars();
  if (id === 'timeline' && !state.paid) return;
}

/* ---------------------------------------------------------------- wallet */
function paintWallet() {
  $$('[data-wallet]').forEach(function (el) { el.textContent = '₹' + state.wallet; });
}

/* Reveal something that animates in from a parked transform. Reading offsetHeight
   forces the start state to be computed now; requestAnimationFrame is not safe
   here because browsers throttle it while the tab is not painting. */
function reveal(el, cls) {
  el.hidden = false;
  void el.offsetHeight;
  el.classList.add(cls || 'on');
}

/* ---------------------------------------------------------------- toast */
var toastT;
function toast(msg, kind) {
  var el = $('#toast');
  el.textContent = msg;
  el.classList.toggle('success', kind === 'success');
  reveal(el);
  clearTimeout(toastT);
  toastT = setTimeout(function () {
    el.classList.remove('on');
    setTimeout(function () { el.hidden = true; }, 220);
  }, 1600);
}

/* ---------------------------------------------------------------- sheets */
function openSheet(name) {
  var el = $('#sheet-' + name);
  if (!el) return;
  if (state.sheet && state.sheet !== name) {
    var old = $('#sheet-' + state.sheet);
    if (old) { old.classList.remove('on'); old.setAttribute('aria-hidden', 'true'); }
  }
  state.sheet = name;
  if (name === 'lang') renderLangList();
  if (name === 'buy') paintBuySheet();
  reveal($('#scrim'));
  reveal(el);
  el.setAttribute('aria-hidden', 'false');
}

function closeSheet() {
  var el = state.sheet && $('#sheet-' + state.sheet);
  if (el) { el.classList.remove('on'); el.setAttribute('aria-hidden', 'true'); }
  state.sheet = null;
  var scrim = $('#scrim');
  scrim.classList.remove('on');
  setTimeout(function () { if (!state.sheet) scrim.hidden = true; }, 240);
}

/* ---------------------------------------------------------------- content: ladder */
var DAYS = [
  { d: 'Day 1', v: 9 },
  { d: 'Day 2', v: 11 },
  { d: 'Day 3', v: 13 },
  { d: 'Day 4', v: 15 },
  { d: 'Day 5', v: 17 },
  { d: 'Day 6', v: 19 },
  { d: 'Day 7', v: 51 }
];
/* Sizes and lifts match the daily-reward prototype. */
var COIN_SIZE = [26, 28, 30, 30, 33, 38, 46];
var COIN_LIFT = [0, 1, 3, 5, 8, 11, 15];
var CHECK = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none">' +
  '<path d="M3.5 8.4l3 3 6-6.3" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function renderLadder() {
  var cols = DAYS.map(function (day, i) {
    var done = i < state.claimed;
    var cls = 'col' + (done ? ' done' : '') + (i === DAYS.length - 1 ? ' goal' : '');
    return '<div class="' + cls + '">' +
             '<span class="ic"><span class="coin' + (done ? ' got' : '') + '" style="width:' +
               COIN_SIZE[i] + 'px;height:' + COIN_SIZE[i] + 'px;margin-bottom:' + COIN_LIFT[i] + 'px">' +
               '<span class="cv"><small>₹</small><b>' + day.v + '</b></span></span></span>' +
             '<span class="tr"><i class="dot">' + (done ? CHECK : '') + '</i></span>' +
             '<span class="lb">Day<b>' + (i + 1) + '</b></span>' +
           '</div>';
  }).join('');

  var html = '<div class="ladder" style="--f:' + (Math.max(state.claimed - 1, 0) / 6) + '">' + cols + '</div>';
  $$('[data-ladder]').forEach(function (el) { el.innerHTML = html; });
}

/* ---------------------------------------------------------------- content: bottom nav */
var NAV_ICONS = {
  today: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  experts: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.2" stroke="currentColor" stroke-width="1.6"/><path d="M2.8 20c.5-3.3 3.1-5.4 6.2-5.4S14.7 16.7 15.2 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16.2 5.3a3.2 3.2 0 010 5.6M18 14.9c2 .8 3.2 2.7 3.5 5.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  timeline: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M7 4v16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="8" r="2.2" fill="#fff" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="17" r="2.2" fill="#fff" stroke="currentColor" stroke-width="1.6"/><path d="M12 8h8M12 17h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  explore: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="m15.2 8.8-1.8 4.6-4.6 1.8 1.8-4.6 4.6-1.8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'
};
var NAV = [
  { id: 'today', label: 'Today' },
  { id: 'experts', label: 'Experts' },
  { id: 'timeline', label: 'History' },
  { id: 'explore', label: 'Explore' }
];

function renderNav() {
  $$('[data-bnav]').forEach(function (el) {
    var active = el.getAttribute('data-bnav');
    el.innerHTML = NAV.map(function (n) {
      return '<button type="button" class="' + (n.id === active ? 'on' : '') + '"' +
             ' data-nav="' + n.id + '">' + NAV_ICONS[n.id] +
             (n.id === 'timeline' && state.histDot ? '<i class="ndot">1</i>' : '') +
             '<span>' + n.label + '</span></button>';
    }).join('');
  });
}

/* ---------------------------------------------------------------- content: language sheet */
function langById(id) {
  for (var i = 0; i < LANGS.length; i++) if (LANGS[i].id === id) return LANGS[i];
  return LANGS[0];
}
function langLabel(id) {
  var l = langById(id);
  return l.native || l.label;
}

function renderLangList() {
  $('#langList').innerHTML = LANGS.map(function (l) {
    var name = l.native ? l.label + ' · ' + l.native : l.label;
    return '<button type="button" data-lang="' + l.id + '"' +
           (l.id === state.lang ? ' class="on"' : '') + '>' +
           '<span>' + name + '</span><span class="rd"></span></button>';
  }).join('');
  paintShowSample();
}

function paintShowSample() {
  var btn = $('#showSample');
  btn.textContent = state.langFrom === 'buy'
    ? 'Use ' + langById(state.lang).label
    : 'Show sample in ' + langById(state.lang).label;
}

/* ---------------------------------------------------------------- content: sample report (R.3 / R.3c) */
function copyFor(id) {
  // Only English and Hindi are written out; everything else borrows the English
  // body and keeps its own chip + buy label, exactly like the Figma flow.
  var base = SAMPLE[id] || SAMPLE.en;
  var l = langById(id);
  return {
    dev: !!base.dev,
    chip: base === SAMPLE[id] ? base.chip : (l.native || l.label),
    navTitle: base.navTitle,
    bandSub: base.bandSub,
    tag: base.tag,
    title: base.title,
    subtitle: base.subtitle,
    name: base.name,
    bpLabel: base.bpLabel,
    bpText: base.bpText,
    scores: base.scores,
    coversLabel: base.coversLabel,
    covers: base.covers,
    footnote: base.footnote,
    buy: 'Buy in ' + l.label
  };
}

function renderSample() {
  var c = copyFor(state.lang);
  var sec = $('#sample');

  sec.classList.toggle('dev', c.dev);
  $('#langChipLabel').textContent = c.chip;
  $('#sampleBandSub').textContent = c.bandSub;
  $('[data-i18n="sampleTitle"]', sec).textContent = c.navTitle;
  $('#buyInLang').textContent = c.buy;

  $('#sampleBody').innerHTML =
    '<div class="s-cover">' +
      '<span class="s-tag">' + c.tag + '</span>' +
      '<h2>' + c.title + '</h2>' +
      '<p class="ssub">' + c.subtitle + '</p>' +
      '<p class="sname">' + c.name + '</p>' +
    '</div>' +
    accent(c.bpLabel, c.bpText) +
    '<div class="s-scores">' + c.scores.map(function (s) {
      return '<div><b>' + s.v + '</b><small>' + s.l + '</small></div>';
    }).join('') + '</div>' +
    '<div class="s-covers"><span class="clbl">' + c.coversLabel + '</span>' +
      c.covers.map(function (t) { return '<div class="item"><p>' + t + '</p></div>'; }).join('') +
    '</div>' +
    '<p class="s-note">' + c.footnote + '</p>';
}

function accent(label, text) {
  return '<div class="accent"><span class="bar"></span><div class="at">' +
         '<b>' + label + '</b><p>' + text + '</p></div></div>';
}

/* ---------------------------------------------------------------- content: full report (R.7) */
var MATCH = [
  { l: 'Trust', v: 8 },
  { l: 'Family values', v: 9 },
  { l: 'Communication', v: 6 },
  { l: 'Patience', v: 5 }
];
/* MyNaksh gives a year-by-year likelihood; ours says it in plain percentages
   so the reader does not have to decode a chart. */
var BANDS = [
  { l: 'Rest of 2026', v: 18 },
  { l: '2027', v: 74 },
  { l: '2028', v: 52 },
  { l: '2029', v: 30 },
  { l: '2030 onwards', v: 16 }
];
var PORTRAIT = [
  ['Nature', 'Calm on the outside, stubborn underneath. Says less than he feels, so you will have to ask twice.'],
  ['Work', 'Something steady with numbers or systems — finance, engineering, or a small setup of his own.'],
  ['Family', 'A smaller family with one sibling. Parents who ask a lot of questions before they say yes.'],
  ['How you meet', 'Through someone you already know. Your chart does not show a stranger from an app.'],
  ['Direction', 'North or north-west of where you live now, within a day of travel.']
];
var GREENS = [
  'Venus sits well in your 7th house.',
  'Jupiter looks at your marriage house all through 2027.',
  'No Manglik dosh, so nothing has to be matched around it.',
  'Your 2nd house supports a joint home and joint money.'
];
var AMBERS = [
  'Saturn slows family conversations until February.',
  'Mercury turns back in May 2027 — do not fix a date that month.',
  'Anger between you two needs a rule, not a winner.'
];
/* Upsells stay inside marriage, love and partner — someone who just bought a
   marriage reading is not shopping for a career report. */
var ALSO = [
  { t: 'Kundli Milan report', s: 'Your two charts, point by point', p: '₹49', was: '₹199' },
  { t: 'Partner sketch', s: 'See the face you will marry', p: '₹49', was: '₹199' },
  { t: 'Love report', s: 'What your heart needs', p: '₹49', was: '₹199' },
  { t: 'Rishta timing report', s: 'The best months to say yes', p: '₹49', was: '₹199' }
];

/* Melooha's ring dials, in our light palette. A bare "72" told the reader
   nothing, so the word under the label carries the meaning and the ring
   carries the degree. */
var DIALS = [
  ['Marriage timing', 'Strong',       72, '#DC6803'],
  ['Joint finance',   'Steady',       64, '#027A48'],
  ['In-law warmth',   'Warms slowly', 60, '#7D58A1'],
  ['Manglik dosh',    'Not present', 100, '#0E9384']
];

function dial(label, sub, pct, col) {
  var r = 42, c = 2 * Math.PI * r;
  var a0 = -Math.PI / 2, a1 = a0 + 2 * Math.PI * pct / 100;
  var pt = function (a) { return [(50 + r * Math.cos(a)).toFixed(1), (50 + r * Math.sin(a)).toFixed(1)]; };
  var s = pt(a0), e = pt(a1);
  return '<div class="dial" style="--c:' + col + '">' +
    '<svg viewBox="0 0 100 100" aria-hidden="true">' +
      '<circle class="tk" cx="50" cy="50" r="' + r + '"/>' +
      '<circle class="ar" cx="50" cy="50" r="' + r + '" transform="rotate(-90 50 50)" ' +
        'data-dash="' + (c * pct / 100).toFixed(1) + ' ' + c.toFixed(1) + '" ' +
        'stroke-dasharray="0 ' + c.toFixed(1) + '"/>' +
      '<circle class="cap" cx="' + s[0] + '" cy="' + s[1] + '" r="4.4"/>' +
      '<circle class="cap" cx="' + e[0] + '" cy="' + e[1] + '" r="4.4"/>' +
    '</svg>' +
    '<span><b>' + label + '</b><small>' + sub + '</small></span></div>';
}

function renderRead() {
  /* On the PM track she bought one of three, so the reader renders that one on
     her own chart. The legacy Marriage Yog content below stays for the other
     track, which only ever sells the one report. */
  if (state.pm) {
    $('#readBody').innerHTML = reportBody(state.pick, 'her') +
      // The end of the report is a door, not a full stop: the other two
      // reports, then the chat where the questions it raised get spent.
      '<div class="carousel-wrap">' +
        '<p class="lbl">AAPKE CHART PAR AUR BHI HAI</p>' +
        '<div class="carousel">' +
          REPORTS.filter(function (x) { return x.id !== state.pick; }).map(function (x) {
            return '<button class="pcard" type="button" data-pick="' + x.id + '">' +
              coverArt(x, 'cv-sm') +
              '<b>' + esc(x.t) + '</b><small>' + esc(x.s) + '</small>' +
              '<span class="pc-pr"><em>₹49</em><s>₹499</s></span>' +
              '<span class="pc-btn">Poori report free dekhiye</span></button>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="upsell">' +
        '<b>Poora padh liya?</b>' +
        '<p>Hemali abhi online hai. Report ka koi bhi hissa samajhna ho, ya apne chart ke <b>upay</b> poochhne ho — seedha unse poochh lijiye.</p>' +
        '<button class="btn primary" type="button" data-chat>Chat with Hemali — upay poochhiye</button>' +
      '</div>';
    return;
  }
  $('#readBody').innerHTML =
    '<div class="r-cover">' +
      '<p class="eyebrow">MADE BY ASTRO HEMALI</p>' +
      '<h2>' + esc(boughtTitle()) + '</h2>' +
      '<p class="rfor">For Mansi · from your chat</p>' +
      '<p class="rmeta">Lagna · Navamsa · Manglik · 14 Oct 2026</p>' +
    '</div>' +

    accent('THE BIG PICTURE', 'Your marriage house is strong and Venus sits well. The clearest window opens in March 2027. The wait so far has a reason, and it ends soon.') +

    '<div class="r-scores"><p class="dlbl">YOUR CHART AT A GLANCE</p>' +
      DIALS.map(function (d) { return dial(d[0], d[1], d[2], d[3]); }).join('') +
    '</div>' +

    '<div class="r-sec">' +
      '<div class="top-bar"></div>' +
      '<div class="shead"><h3>When will you marry</h3><p>The headline answer of your chart</p></div>' +
      accent('WHAT THIS MEANS FOR YOU', 'The Steady Build. Your 7th house holds Venus and Jupiter looks at it. Talks in the family may start before your birthday.') +
      '<div class="win strong">' +
        '<p class="wlbl">WINDOW 1 · YOUR STRONGEST WINDOW</p>' +
        '<h4>March 2027 to November 2027</h4>' +
        '<p>Jupiter moves over your marriage house. This is the clearest window of the coming years.</p>' +
      '</div>' +
      '<div class="win">' +
        '<p class="wlbl">WINDOW 2 · MID CONFIDENCE</p>' +
        '<h4 class="sm">February 2028</h4>' +
        '<p>Family talks move from “let us think” to “let us meet”.</p>' +
      '</div>' +
      '<div class="bars bands"><p class="blbl">HOW LIKELY, YEAR BY YEAR</p>' +
        BANDS.map(function (b) {
          return '<div class="bar-row"><span>' + b.l + '</span>' +
                 '<span class="track"><i data-w="' + b.v + '"></i></span>' +
                 '<em>' + b.v + '%</em></div>';
        }).join('') +
      '</div>' +
    '</div>' +

    '<div class="upsell">' +
      '<b>Have a question about this part?</b>' +
      '<p>Ask Astro Hemali. She made this report for you.</p>' +
      '<button class="btn primary" type="button" data-chat>Chat with Hemali</button>' +
    '</div>' +

    '<div class="r-sec">' +
      '<div class="top-bar"></div>' +
      '<div class="shead"><h3>Will the match work</h3><p>From what you shared with Hemali</p></div>' +
      accent('WHAT THIS MEANS FOR YOU', 'Your charts match on 24 of 36 points. Trust and family values are strong. The one thing to work on is how you both handle anger.') +
      '<div class="bars"><p class="blbl">MATCH TILT</p>' +
        MATCH.map(function (m) {
          return '<div class="bar-row"><span>' + m.l + '</span>' +
                 '<span class="track"><i data-w="' + (m.v * 10) + '"></i></span>' +
                 '<em>' + m.v + '</em></div>';
        }).join('') +
      '</div>' +
    '</div>' +

    '<div class="r-sec">' +
      '<div class="top-bar"></div>' +
      '<div class="shead"><h3>Who you will marry</h3><p>The person your chart describes</p></div>' +
      '<div class="facts">' +
        PORTRAIT.map(function (p) {
          return '<div><span>' + p[0] + '</span><p>' + p[1] + '</p></div>';
        }).join('') +
      '</div>' +
    '</div>' +

    '<div class="r-sec">' +
      '<div class="top-bar"></div>' +
      '<div class="shead"><h3>Love or arranged</h3><p>Which way your chart leans</p></div>' +
      '<div class="tilt">' +
        '<div class="tilt-top"><span>Love match</span><span>Arranged</span></div>' +
        '<span class="track"><i data-w="66"></i></span>' +
        '<div class="tilt-top n"><span>34%</span><span>66%</span></div>' +
      '</div>' +
      accent('WHAT THIS MEANS FOR YOU', 'It starts as an introduction and turns into your own choice. Not a cold setup, and not a runaway love story either.') +
    '</div>' +

    '<div class="verdicts">' +
      '<div class="vlist go">' +
        '<p class="vh">GOING FOR YOU</p>' +
        '<ul>' + GREENS.map(function (g) { return '<li>' + g + '</li>'; }).join('') + '</ul>' +
      '</div>' +
      '<div class="vlist hold">' +
        '<p class="vh">HOLD CAREFULLY</p>' +
        '<ul>' + AMBERS.map(function (a) { return '<li>' + a + '</li>'; }).join('') + '</ul>' +
      '</div>' +
    '</div>' +

    '<div class="tagged">' +
      '<div class="th"><h4>Your Manglik reading</h4><span class="tpill green">NOT PRESENT</span></div>' +
      '<p>Mars is not in a Manglik house in your chart. No special matching is needed for this.</p>' +
    '</div>' +

    '<div class="tagged">' +
      '<div class="th"><h4>Family blessing</h4><span class="tpill amber">SLOW START</span></div>' +
      '<p>Your family says yes, but the saying takes time. Start the talk in small steps.</p>' +
    '</div>' +

    accent('→ PRACTICAL TIP', 'Open the marriage talk with your family after Diwali. Thursdays and Fridays carry the best weight in your chart for a conversation that big.') +

    '<div class="carousel-wrap">' +
      '<p class="lbl">PEOPLE ALSO BOUGHT</p>' +
      '<div class="carousel">' +
        ALSO.map(function (a) {
          return '<button class="pcard" type="button" data-toast="' + a.t + ' is not part of this demo">' +
                 '<span class="bk3" aria-hidden="true"></span>' +
                 '<b>' + a.t + '</b><small>' + a.s + '</small>' +
                 '<span class="pc-pr"><em>' + a.p + '</em><s>' + a.was + '</s></span>' +
                 '<span class="pc-btn">View report</span></button>';
        }).join('') +
      '</div>' +
    '</div>' +

    /* Post-completion: the report ends on a door, not a full stop. The reader
       who just finished has questions — the chat is where they get spent. */
    '<div class="upsell">' +
      '<b>Poora padh liya?</b>' +
      '<p>Hemali abhi online hai. Report ka koi bhi hissa samajhna ho, ya apne chart ke <b>upay</b> poochhne ho — seedha unse poochh lijiye.</p>' +
      '<button class="btn primary" type="button" data-chat>Chat with Hemali — upay poochhiye</button>' +
    '</div>';
}

/* `root` is the reader by default and the free preview on the PM track — both
   render the same report body, so both need their bars and dials filled. */
function animateBars(root) {
  root = root || '#readBody';
  // Reset to 0 first so the fill animates every time the screen is opened.
  var bars = $$(root + ' .track i');
  bars.forEach(function (i) { i.style.width = '0'; });
  var arcs = $$(root + ' .dial .ar');
  arcs.forEach(function (a) { a.setAttribute('stroke-dasharray', '0 265'); });
  later(function () {
    bars.forEach(function (i) { i.style.width = i.getAttribute('data-w') + '%'; });
    arcs.forEach(function (a) { a.setAttribute('stroke-dasharray', a.getAttribute('data-dash')); });
  }, 220);
}

/* ---------------------------------------------------------------- buy sheet */
function paintBuySheet() {
  $('#buyLang').textContent = langById(state.lang).label;
  paintBought();
  paintWallet();
}

/* ---------------------------------------------------------------- timeline: making -> ready */
function resetTimeline() {
  // The "report being made / ready" card only exists after the purchase.
  $('#tlReport').hidden = !state.paid;
  $('#tlReportTime').textContent = '10:42 AM';
  $('#repStatus').textContent = 'Your report is being made';
  $('#repStatus').classList.remove('green');
  $('#repSteps').hidden = false;
  $('#repNotify').hidden = false;
  $('#repActs').hidden = true;
  $$('#repSteps .step').forEach(function (s) { s.classList.remove('done', 'now'); });
  hideReadyPush();
}

/* The switcher's "Report bought" entry lands with the report already made —
   the timeline card sits in its settled "Ready to read" state, no animation. */
function applyPaidTimeline() {
  if (!state.paid) return;
  $('#tlReport').hidden = false;
  $('#tlReportTime').textContent = '12:10 PM';
  var st = $('#repStatus');
  st.textContent = 'Ready to read';
  st.classList.add('green');
  $('#repSteps').hidden = true;
  $('#repNotify').hidden = true;
  $('#repActs').hidden = false;
}

function runMaking() {
  var steps = $$('#repSteps .step');
  steps.forEach(function (s) { s.classList.remove('done', 'now'); });

  function tick(i) {
    for (var k = 0; k < i; k++) { steps[k].classList.add('done'); steps[k].classList.remove('now'); }
    if (steps[i]) steps[i].classList.add('now');
  }
  tick(0);
  later(function () { tick(1); }, 900);
  later(function () { tick(2); }, 1800);
  later(function () { tick(3); }, 2700);
  later(markReady, 3400);
}

function markReady() {
  $$('#repSteps .step').forEach(function (s) { s.classList.add('done'); s.classList.remove('now'); });
  later(function () {
    $('#tlReportTime').textContent = '12:10 PM';
    var st = $('#repStatus');
    st.textContent = 'Ready to read';
    st.classList.add('green');
    $('#repSteps').hidden = true;
    $('#repNotify').hidden = true;
    $('#repActs').hidden = false;
    showReadyPush();
  }, 500);
}

function showReadyPush() {
  // If the user already opened the report the banner is stale, so drop it.
  if (state.screen !== 'timeline') return;
  reveal($('#push'));
}
function hideReadyPush() {
  var p = $('#push');
  p.classList.remove('on');
  setTimeout(function () { if (!p.classList.contains('on')) p.hidden = true; }, 440);
}

/* ---------------------------------------------------------------- book opening (R.6b / R.6c) */
function openBook() {
  hideReadyPush();
  go('book', 'fade');
  var bk = $('#bookEl'), cap = $('#bookCap');
  bk.classList.remove('open');
  cap.textContent = 'Your report is ready';
  later(function () {
    bk.classList.add('open');
    cap.textContent = 'Opening your report…';
  }, 450);
  later(function () {
    state.stack = [state.entry];      // the report is now "read", so back lands on Today
    show('read', 'fade');
  }, 2000);
}

/* ---------------------------------------------------------------- payment */
function pay() {
  closeSheet();
  state.paid = true;
  // The report is flat ₹49 and never comes out of the wallet — the wallet is
  // the daily-reward habit's own currency and spending it here would punish
  // the one loop that actually brings her back.
  paintWallet();
  paintBought();
  // Every sell surface retires into the follow-up: read, chat, upay, other reports.
  renderDayToday(); renderOffer(); renderChat(); renderChapters(); renderHistCard(); renderTpTabs(); renderRead();
  toast('Payment successful', 'success');
  later(function () {
    state.stack = [state.entry];
    show('timeline', 'fade');
    resetTimeline();
    later(runMaking, 350);
  }, 900);
}

/* ------------------------------------------------------------- journey */
/* The day's content and its deadline, track-aware. The ₹49 price "ends
   tonight" only on the LAST day of whichever track she is on. */
function dayData() {
  if (state.pm) return PM_JOURNEY[state.day];
  return state.preRead ? READ_JOURNEY[state.day] : JOURNEY[state.day];
}
function lastDay() {
  if (state.pm) return 4;           // the nudging stops after day 4
  return state.preRead ? 4 : 3;
}
/* On the PM track the ask is live for four days and then retires for good. */
function pmQuiet() { return state.pm && !!dayData().quiet; }
/* Which surfaces today is allowed to use. Off the PM track nothing reads it. */
function pmSurf() { return (state.pm && dayData().surf) || {}; }
/* What she actually owns: on the PM track that is whichever of the three she
   picked, everywhere else it is the one Marriage Yog report. */
function boughtTitle() { return state.pm ? reportById(state.pick).t : 'Marriage Yog report'; }
/* Six surfaces name the report she owns — buy sheet, "ready" push, sample
   cover, timeline card, book cover and the reader's own header. They used to
   be hard-coded to Marriage Yog, so picking Money and paying handed her
   somebody else's report. One writer keeps them honest. */
function paintBought() {
  var t = boughtTitle();
  $('#buyTitle').textContent  = 'Your ' + t;
  $('#r2Title').textContent   = 'Your ' + t;
  $('#pushReadyTitle').textContent = 'Your ' + t + ' is ready';
  $('#repTitle').textContent  = t;
  $('#bookTitle').textContent = t;
  $('#readTitle').textContent = t;
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

/* The chapter as Hemali hands it over in the chat. Before the read its one
   button is the read; after it, the same card asks for the other six. */
function chapterBubble(idx) {
  var c = CHAPTERS[idx];
  return '<div class="ch-card">' +
    '<div class="ch-row">' +
      '<img class="ch-cover" src="assets/book.svg" alt="">' +
      '<div class="ch-meta">' +
        '<span class="ch-no">Chapter ' + (idx + 1) + ' of 7' +
          (state.read1 ? '' : '<i class="ch-free">FREE</i>') + '</span>' +
        '<b class="ch-t">' + esc(c.t) + '</b>' +
        '<p class="ch-s">' + esc(c.s) + '</p>' +
      '</div>' +
    '</div>' +
    (state.read1
      ? '<button class="btn sm primary ch-go" type="button" data-go="report">Baaki 6 chapters kholiye · ₹49</button>' :
        '<button class="btn sm primary ch-go" type="button" data-go="report">Padhiye · 2 min →</button>') +
    '<span class="ch-saved">' + (state.read1 ? 'Padh liya ✓ · saved to your report' : 'Saved to your report') + '</span>' +
  '</div>';
}

/* The one report today suggests. A three-row menu makes her choose before she
   has any reason to care; a single report tied to a house Hemali already named
   is a recommendation, and the other two stay one tap away. */
function leadReport() { return reportById(dayData().lead || 'partner'); }

/* The PM brief's offer as it lands in the chat. Swiggy's hierarchy: one
   coloured strip states the deal once, the dish owns the card, the price is a
   single token, and everything else is a quiet second line. */
function offer3Card() {
  // Once she owns one, the offer leaves the thread entirely — segueCard() is
  // the follow-up, and two follow-ups in a row is one too many.
  if (state.paid) return '';
  var r = leadReport();
  return '<div class="of3">' +
    '<p class="of3-strip">POORI REPORT FREE PADHIYE</p>' +
    '<div class="of3-in">' +
      '<div class="of3-head">' +
        '<b>' + esc(r.t) + '</b>' +
        '<span class="of3-price"><b>₹49</b><s>₹499</s><i>90% OFF</i></span>' +
      '</div>' +
      '<button class="of3-lead" type="button" data-pick="' + r.id + '">' +
        coverArt(r, 'cv-sm') +
        '<span class="of3-t">' +
          '<small>' + esc(r.why) + '</small>' +
          '<em>' + r.pages + ' pages · aapki bhasha + English</em>' +
        '</span>' +
      '</button>' +
      '<button class="btn sm primary of3-go" type="button" data-pick="' + r.id + '">Poori report free dekhiye</button>' +
      '<span class="of3-foot' + (dayData().lastAsk ? ' last' : '') + '">' +
        (dayData().lastAsk
          ? 'Aaj ke baad yeh yahan nahi dikhega'
          : 'Aapke chart par 2 aur reports hain') +
        '<button class="lnk-btn" type="button" data-go="picker">Sabhi dekhiye</button>' +
      '</span>' +
    '</div>' +
  '</div>';
}

function renderChat() {
  var msgs;
  if (state.pm) msgs = PM_JOURNEY[state.day].msgs;
  else if (state.day === 1) msgs = JOURNEY[1].msgs;
  else if (state.preRead) msgs = READ_JOURNEY[state.day].msgs;
  else msgs = state.read1 ? JOURNEY[state.day].msgsRead : JOURNEY[state.day].msgsUnread;
  $('#chatThread').innerHTML = msgs.map(function (m) {
    if (m.who === 'chapter') return chapterBubble(m.idx);
    if (m.who === 'sys')     return '<p class="c-sys">' + esc(m.text) + '</p>';
    if (m.who === 'ended')   return '<p class="c-end">' + esc(m.text) + '</p>';
    if (m.who === 'gap')     return '<p class="c-gap"><span>' + esc(m.text) + '</span></p>';
    if (m.who === 'offer3')  return offer3Card();
    if (m.who === 'remind')  return remindCard();
    if (m.who === 'pitch')   return pitchCard();
    return '<div class="c-b ' + m.who + '"><p>' + esc(m.text) + '</p><time>02:24 PM</time></div>';
  }).join('') + (state.pm && state.paid ? segueCard() : '');
}

/* Live thread helpers — only the post-purchase follow-up appends to the chat
   after render, so they stay small and local to it. */
function bubble(who, text) {
  var el = document.createElement('div');
  el.className = 'c-b ' + who;
  el.innerHTML = '<p>' + esc(text) + '</p><time>02:41 PM</time>';
  return el;
}
function scrollChat() {
  var sc = $('#chat [data-scroll]');
  if (sc) requestAnimationFrame(function () { sc.scrollTop = sc.scrollHeight; });
}
function typing(done) {
  var el = document.createElement('div');
  el.className = 'c-b hemali c-typing';
  el.innerHTML = '<span></span><span></span><span></span>';
  $('#chatThread').insertBefore(el, $('#sgChips'));
  scrollChat();
  later(function () { el.remove(); done(); }, 900);
}

/* Brief point 6: the report has to end in a conversation, not a full stop.
   Once she owns one, the thread picks up where the report left off and hands
   her the three questions that report actually leaves people with. */
function segueCard() {
  var r = reportById(state.pick);
  return '<div class="c-b hemali"><p>Mansi ji, aapki <b>' + esc(r.t) +
      '</b> report khul gayi hai. Jo hissa samajhna ho ya upay poochhne ho — yahin poochh lijiye.</p>' +
      '<time>02:41 PM</time></div>' +
    '<div class="sg" id="sgChips">' +
      '<p class="sg-h">Report se aage poochhiye</p>' +
      r.ask.map(function (x, i) {
        return '<button class="sg-q" type="button" data-ask="' + i + '">' + esc(x.q) + '</button>';
      }).join('') +
    '</div>';
}

/* The end-of-chat ask: flat ₹49 against the ₹499 anchor. Day 3 adds the
   deadline — that is the only thing that changes. */
function pitchCard() {
  // Post-purchase the pitch retires: the chat's job becomes the follow-up —
  // questions on the report, and the upay that go with it.
  if (state.paid) {
    return '<div class="rm-card pitch">' +
      '<p>Aapki poori report khul gayi ✓. Koi hissa samajhna ho, ya apne chart ke <b>upay</b> poochhne ho — Hemali yahin hai.</p>' +
      '<button class="btn sm primary" type="button" data-chat>Continue chat with Hemali</button>' +
    '</div>';
  }
  var ending = state.day >= lastDay();
  return '<div class="ch-card">' +
    '<div class="ch-row">' +
      '<img class="ch-cover" src="assets/book.svg" alt="">' +
      '<div class="ch-meta">' +
        '<span class="ch-no">Full report · 7 chapters</span>' +
        '<b class="ch-t">Kaun, kab, love ya arranged — sab likha hai</b>' +
        '<p class="ch-price"><b>₹49</b><s>₹499</s><i>90% OFF</i></p>' +
      '</div>' +
    '</div>' +
    (ending ? '<p class="ch-end">Aaj raat ke baad wapas ₹499</p>' : '') +
    '<button class="btn sm primary ch-go" type="button" data-go="report">Unlock full report · ₹49</button>' +
  '</div>';
}

/* History's morning chapter card: read nudge until chapter 1 is read, buy
   pitch after, and gone once the report is bought (tlReport takes over). */
function renderHistCard() {
  // PM track: History is the brief's third surface — the same three reports,
  // and once bought the purchased report stays here for good (tlReport).
  if (state.pm) {
    // Once the nudging stops the reports do not disappear — they become a
    // shelf. Nothing asks; the row is simply still there when the problem
    // arrives, which for a report is often weeks later.
    var shelf = !state.paid && pmQuiet();
    var show3 = !state.paid && !!pmSurf().hist;
    $('#tlChap').hidden = !(show3 || shelf);
    if (shelf) {
      $('#tlChapCard').innerHTML =
        '<div class="rep-top quiet">' +
          '<img src="assets/book.svg" alt="">' +
          '<div>' +
            '<p class="eyebrow">Saved on your chart</p>' +
            '<b>3 reports</b>' +
            '<p class="rep-status">' + REPORTS.map(function (x) { return x.t; }).join(' · ') + '</p>' +
          '</div>' +
          '<button class="lnk-btn" type="button" data-go="picker">View</button>' +
        '</div>';
      return;
    }
    if (!show3) return;
    var hr = leadReport();
    $('#tlChapCard').innerHTML =
      '<div class="rep-top">' +
        coverArt(hr, 'cv-sm') +
        '<div>' +
          '<p class="eyebrow">From Astro Hemali</p>' +
          '<b>' + esc(hr.t) + '</b>' +
          '<p class="rep-status green">' + esc(hr.why) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="rep-acts">' +
        '<button class="btn primary grow" type="button" data-pick="' + hr.id + '">Poori report free dekhiye</button>' +
      '</div>';
    return;
  }
  $('#tlChap').hidden = state.paid;
  if (state.paid) return;
  $('#tlChapCard').innerHTML = state.read1
    ? '<div class="rep-top">' +
        '<img src="assets/book.svg" alt="">' +
        '<div>' +
          '<p class="eyebrow">Your report · Astro Hemali</p>' +
          '<b>' + esc(CHAPTERS[0].t) + '</b>' +
          '<p class="rep-status green">Chapter 1 padh liya ✓ · 6 chapters locked</p>' +
        '</div>' +
      '</div>' +
      '<div class="rep-acts">' +
        '<button class="btn primary grow" type="button" data-go="report">Unlock all 7 chapters · ₹49</button>' +
      '</div>'
    : '<div class="rep-top">' +
        '<img src="assets/book.svg" alt="">' +
        '<div>' +
          '<p class="eyebrow">Free chapter · Astro Hemali</p>' +
          '<b>' + esc(CHAPTERS[0].t) + '</b>' +
          '<p class="rep-status green">Chapter 1 ready to read</p>' +
        '</div>' +
      '</div>' +
      '<div class="rep-acts">' +
        '<button class="btn primary grow" type="button" data-go="report">Read chapter 1</button>' +
      '</div>';
}

/* Tomorrow's reason to return: the free chat and the next coin. */
function remindCard() {
  if (state.reminded) {
    return '<div class="rm-card done"><p>🔔 Done. Kal ki free chat ready hote hi aapko bata denge.</p></div>';
  }
  return '<div class="rm-card">' +
    '<p>Kal phir <b>2 minute free chat</b> milegi, aur check-in par ₹11. Yaad dila dein?</p>' +
    '<button class="btn sm primary" type="button" data-remind>🔔 Haan, yaad dilaiye</button>' +
  '</div>';
}

/* The Today slot is the same container every day, filling up. The count is the
   point: she can see what she has and what is missing. */
function renderOffer() {
  var d = dayData();
  var dots = CHAPTERS.map(function (c, i) {
    return '<i class="' + (state.paid || i === 0 ? 'got' : '') + '" title="' + esc(c.t) + '"></i>';
  }).join('');

  $('#offerSlot').innerHTML =
    '<span class="of-eyebrow">' + esc(d.today.eyebrow) + '</span>' +
    '<div class="of-row">' +
      '<span class="bk3" aria-hidden="true"><span class="bk3-stack"></span></span>' +
      '<span class="of-t">' +
        '<b class="of-hook">' + esc(boughtTitle()) + '</b>' +
        '<span class="of-sub">' + esc(CHAPTERS[0].t) + '</span>' +
        '<span class="of-dots">' + dots + '</span>' +
      '</span>' +
    '</div>' +
    '<p class="of-note">' + (state.paid
      ? 'Poori report khul gayi ✓ — padhiye, aur apne chart ke upay Hemali se poochhiye.'
      : state.read1
      ? 'Chapter 1 padh liya ✓ — baaki 6 chapters <b>₹49</b> <s>₹499</s> mein.'
      : esc(d.today.note)) + '</p>' +
    (state.paid
      ? '<button class="btn sm primary" type="button" data-go="read">Read your report</button>'
      : state.read1
      ? '<button class="btn sm primary" type="button" data-go="report">Unlock 6 chapters · ₹49</button>'
      // Unread: land on the report page, where chapter 1 sits highlighted and
      // free — the buy waits until she has read it.
      : '<button class="btn sm primary" type="button" data-go="report">Read chapter 1 free</button>');
}

/* Every day lands unanswered, per the daily reward board: the check-in is the
   day's one job, and Hemali's reply (with the report in it) is what answering
   buys. Until then the chapter sits on the expert card — the one surface that
   is already hers and already on screen. */
function renderDayToday() {
  var day = state.day, r = REWARD[day];
  $('#countdownLine').innerHTML = dayData().countdown;
  $('#checkinCard').hidden  = state.answered;
  $('#answeredCard').hidden = !state.answered;
  $('#checkinTitle').innerHTML =
    'Day ' + day + ' · Answer to get <span class="amt">₹' + r + '</span> in your wallet';
  $('#answeredTitle').innerHTML =
    'Day ' + day + ' · <span class="amt">₹' + r + '</span> added to your wallet';
  // The ladder has to agree with the card: today is not collected until she answers.
  state.claimed = state.answered ? day : day - 1;
  renderLadder();

  // Day 1: the hook sits on the expert card (and moves into Hemali's reply
  // bubble once she answers). Days 2/3: the hook lives in Personalised
  // Guidance instead, and the expert card goes back to being the chat card.
  // PM track: Today carries the offer in the expert card on every nudging day
  // (the brief puts it there alongside Chat and History), with the guidance
  // tile from day 2. Day 5 is the stop — every surface goes quiet.
  if (state.pm && !state.paid) {
    var sf = pmSurf();
    $('#expertSlot').hidden = !sf.today;
    $('#guideSlot').hidden  = !sf.guide;
    $('#offerSlot').hidden  = true;
    if (sf.guide) renderGuideTile();
    if (!sf.today) return;
    var lr = leadReport();
    $('#expertSlot').innerHTML =
      '<div class="ex-tap" data-pick="' + lr.id + '" role="button" tabindex="0">' +
        coverArt(lr, 'cv-sm') +
        '<span class="ex-t">' +
          '<b>' + esc(lr.t) + '</b>' +
          '<span class="ex-sub wrap' + (dayData().lastAsk ? ' last' : '') + '">' +
            (dayData().lastAsk ? 'Aaj ke baad yeh yahan nahi dikhega' : esc(lr.why)) +
          '</span>' +
        '</span>' +
        '<i class="ex-pill">FREE</i>' +
        '<span class="ex-chev" aria-hidden="true">›</span>' +
      '</div>';
    return;
  }

  var onExpert = day === 1 && !state.answered;
  $('#expertSlot').hidden = !onExpert;
  $('#guideSlot').hidden  = day === 1;
  $('#offerSlot').hidden  = day >= 2;
  if (day >= 2) renderGuideTile();
  if (!onExpert) return;

  // In flow A this card IS the day-1 delivery, so it cannot say "from your
  // chat" — the chat never mentioned it. It has to introduce itself.
  // Before the read, the row lands on the report page, where chapter 1 sits
  // highlighted and free. After it, the same row asks for the other six.
  // One compact row inside the expert card: book · title + one sub-line ·
  // status pill · chevron. No eyebrow — the sub-line carries the credit.
  var title, sub, pill, act;
  if (state.paid) {
    title = boughtTitle();
    sub = state.pm ? 'Poori report khul gayi ✓ · upay poochhiye' : 'Saaton chapters khule ✓ · upay poochhiye';
    pill = 'Ready';
    act = ' data-go="read"';
  } else if (state.read1) {
    title = 'Unlock the other 6 chapters';
    sub = 'Baaki 6 chapters · <s>₹499</s> 90% OFF';
    pill = '₹49';
    act = ' data-go="report"';
  } else {
    // Unread: just the chapter title and the FREE pill — no credit line.
    title = CHAPTERS[0].t;
    sub = '';
    pill = 'FREE';
    act = ' data-go="report"';
  }
  $('#expertSlot').innerHTML =
    '<div class="ex-tap"' + act + ' role="button" tabindex="0">' +
      '<span class="bk3" aria-hidden="true"></span>' +
      '<span class="ex-t">' +
        '<b>' + esc(title) + '</b>' +
        (sub ? '<span class="ex-sub">' + sub + '</span>' : '') +
      '</span>' +
      '<i class="ex-pill">' + pill + '</i>' +
      '<span class="ex-chev" aria-hidden="true">›</span>' +
    '</div>';
}

/* Days 2/3: the report is one tile among her guidance — same object as the
   tarot and prediction tiles. Unread it nudges the free chapter; read, it
   asks for the other six at the flat price. */
function renderGuideTile() {
  var sub, tag, act;
  if (state.pm && !state.paid) {
    // The guidance tile is the quieter of Today's two surfaces, so it carries
    // the other two reports — the expert card above it already leads with one.
    $('#guideSlot').innerHTML =
      '<button class="tile" type="button" data-go="picker">' +
        '<span class="bk3" aria-hidden="true"></span>' +
        '<span class="tt"><b>2 aur reports aapke chart par</b><small>' +
          esc(REPORTS.filter(function (x) { return x.id !== leadReport().id; })
                     .map(function (x) { return x.t; }).join(' · ')) +
        '</small></span>' +
        '<i class="tag green">₹49</i>' +
        '<svg class="arr" width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3.5 8h8.5M8.5 4.2 12.3 8l-3.8 3.8" stroke="#475467" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>';
    return;
  }
  if (state.paid) {
    sub = state.pm ? 'Poori report khul gayi ✓ — upay Hemali se poochhiye'
                   : 'Saaton chapters khule ✓ — upay Hemali se poochhiye';
    tag = 'Ready';
    act = ' data-go="read"';
  } else if (state.read1) {
    sub = state.day >= lastDay() ? '₹49 aaj raat tak — phir ₹499' : 'Baaki 6 chapters · ₹49 <s>₹499</s>';
    tag = '₹49';
    act = ' data-go="report"';
  } else {
    sub = state.day >= lastDay()
      ? 'Chapter 1 free — ₹49 price aaj raat tak'
      : 'Hemali ne chapter 1 likha hai — 2 min mein padhiye';
    tag = 'Open';
    act = ' data-go="report"';
  }
  $('#guideSlot').innerHTML =
    '<button class="tile" type="button"' + act + '>' +
      '<span class="bk3" aria-hidden="true"></span>' +
      '<span class="tt"><b>' + esc(boughtTitle()) + '</b><small>' + sub + '</small></span>' +
      '<i class="tag green">' + tag + '</i>' +
      '<svg class="arr" width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3.5 8h8.5M8.5 4.2 12.3 8l-3.8 3.8" stroke="#475467" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</button>';
}

/* ---------------------------------------------------------------- PM: picker + preview */
/* The brief's shop front: three reports, she picks. */
function renderPicker() {
  // All three cost the same, so repeating ₹49 three times only flattens the
  // choice. Price moves to one strip above the list; the cards are then about
  // which problem she has, and the chevron is the only thing on the right.
  $('#pkList').innerHTML = REPORTS.map(function (r) {
    return '<button class="pk-card" type="button" data-pick="' + r.id + '">' +
      coverArt(r, 'cv-md pk-bk') +
      '<span class="pk-t">' +
        '<b>' + esc(r.t) + '</b>' +
        '<small>' + esc(r.s) + '</small>' +
        '<span class="pk-meta"><i class="pk-free">POORI REPORT FREE</i>' + r.pages + ' pages</span>' +
      '</span>' +
      '<em class="pk-chev" aria-hidden="true">›</em>' +
    '</button>';
  }).join('');
}

/* Two pages of the real thing, then the wall. No free chapter on this track —
   the preview is all she gets before paying. */
/* `show` is what she reads free; `cut` is the sentence that gets taken away
   mid-thought — the fade lands on the answer, never on filler. */
/* Two charts, one set of reports. The free preview renders the WHOLE report on
   the demo chart, so she sees real depth instead of two pages that stop
   mid-sentence; buying swaps in her own numbers. Same prose, different chart —
   which is exactly what a real report is. */
var CHARTS = {
  sample: {
    who: 'Priya S.', meta: '14 March 1996 · 6:42 AM · Pune',
    partner: {
      big: 'Saatve ghar mein Rahu baitha hai — isiliye baat banti bhi hai aur aakhri waqt par ulajh bhi jaati hai. Sabse saaf window June 2027 se khulti hai.',
      dials: [['Milne ka yog', 'Strong', 74, '#DC6803'], ['Rishte ki sthirta', 'Steady', 61, '#027A48'],
              ['Rukavat', 'Ghat rahi hai', 48, '#7D58A1'], ['Love ya arranged', 'Love tilt', 62, '#0E9384']],
      w1: { h: 'June 2027 se January 2028', p: 'Rahu saatve ghar se nikal raha hai. Is dauran naye parichay sabse zyada bante hain.' },
      w2: { h: 'April 2029', p: 'Doosri window — agar pehli mein baat nahi badhi to yahan phir khulti hai.' },
      bands: [['Baaki 2026', 14], ['2027', 71], ['2028', 55], ['2029', 34], ['2030 ke baad', 18]],
      look: 'Gehra gehua rang, saadharan kad, chehre par thodi si daadhi. Aankhein shaant, hansi dheemi.',
      traits: [['Swabhav', 'Bahar se shaant, andar se zidd. Jo mehsoos karta hai woh kam bolta hai.'],
               ['Kaam', 'Numbers ya systems se juda — finance, engineering ya apna chhota setup.'],
               ['Parivaar', 'Chhota parivaar, ek bhai ya behan. Maata-pita haan kehne se pehle bahut poochhte hain.'],
               ['Mulaqat', 'Kisi jaan-pehchaan ke zariye. Chart mein kisi anjaan app ka ishara nahi hai.'],
               ['Disha', 'Aapke shehar se uttar ya uttar-paschim, ek din ke safar ke andar.']],
      tilt: 62,
      block: 'Rahu wahi dikhata hai jo turant mil jaaye. Isliye jo rishta pehle hafte mein hi bahut tez lagta hai, wahi baad mein rukta hai.',
      patterns: ['Jo bahut jaldi bahut kareeb aa jaaye', 'Jo apni baat se zyada aapki zarurat samjhe', 'Jo maafi maange par aadat na badle'],
      attach: [['Attachment style', 'Anxious-secure ke beech. Jawab der se aaye to mann bhaagta hai.'],
               ['Love language', 'Waqt dena — tohfe nahi. Saath baithna sabse zyada asar karta hai.']],
      daily: ['Budhwar ko Durga ji ka dhyan', 'Guruwar ko peela kuch daan', 'Teen hafte tak koi naya vaada nahi']
    },
    marriage: {
      big: 'Mangal chart mein hai par kamzor sthiti mein — nichla Manglik. 36 mein se 28 gun milte hain, jo achha maana jaata hai.',
      dials: [['Shaadi ka samay', 'Strong', 70, '#DC6803'], ['Gun milan', '28 / 36', 78, '#027A48'],
              ['Sasuraal', 'Dheere ghulta hai', 58, '#7D58A1'], ['Manglik dosh', 'Halka', 35, '#B42318']],
      w1: { h: 'November 2027 se June 2028', p: 'Guru saatve ghar ko dekhta hai. Parivaar bhi isi dauran sabse jaldi raazi hota hai.' },
      w2: { h: 'January 2030', p: 'Agar pehli window nikal jaaye to agla saaf samay yahi hai.' },
      bands: [['Baaki 2026', 9], ['2027', 58], ['2028', 76], ['2029', 41], ['2030 ke baad', 22]],
      gun: [['Bharosa', 8], ['Parivaar ke sanskaar', 9], ['Baat-cheet', 6], ['Dhairya', 5]],
      traits: [['Jeevansaathi', 'Umar mein 2–4 saal bada, sthir naukri, kam bolne wala.'],
               ['Sasuraal', 'Shuruaat ke chh: mahine adjustment maangenge, uske baad ghar shaant.'],
               ['Paisa', 'Shaadi ke baad sthiti sudhrti hai — doosra ghar majboot hota hai.'],
               ['Vidhi', 'Guruwar ya Shukrawar. Mangalwar ki tareekh na rakhein.']],
      doshas: [['Manglik dosh', 'HALKA', 'amber', 'Mangal kamzor sthiti mein hai. Samaan chart wale saathi se apne aap sant ho jaata hai.'],
               ['Nadi dosh', 'NAHI HAI', 'green', 'Dono ki nadi alag hai. Koi alag vidhi ki zarurat nahi.']],
      greens: ['Shukra saatve ghar mein theek baitha hai.', 'Guru 2028 bhar shaadi ke ghar ko dekhta hai.',
               'Doosra ghar joint paisa support karta hai.'],
      ambers: ['Shani February tak parivaar ki baat dheemi rakhta hai.', 'May 2028 mein Budh vakri — us mahine tareekh na rakhein.'],
      tip: 'Parivaar se baat Diwali ke baad chhediye. Guruwar aur Shukrawar aapke chart mein sabse bhaari din hain.'
    },
    career: {
      big: 'Dasve ghar ka swami uchch ka hai — pehchaan banegi, isme shak nahi. Par Shani ki drishti hai, isliye mehnat dikhti nahi.',
      dials: [['Switch ka yog', 'Strong', 68, '#DC6803'], ['Increment', 'Sambhav', 62, '#027A48'],
              ['Business vs job', 'Job tilt', 71, '#7D58A1'], ['Boss ka bharosa', 'Hai', 66, '#0E9384']],
      w1: { h: 'August 2027 se December 2027', p: 'Guru dasve ghar ko dekhta hai. Offer bhi achhi aati hai aur baat banti bhi hai.' },
      w2: { h: 'March 2029', p: 'Doosri window — agar pehli mein switch nahi hua.' },
      bands: [['Baaki 2026', 20], ['2027', 69], ['2028', 47], ['2029', 52], ['2030 ke baad', 25]],
      dates: [['Raise maangne ke liye', 'Guruwar, mahine ka doosra hafta'],
              ['Idea rakhne ke liye', 'Budhwar subah, 10 se 12'],
              ['Interview ke liye', 'Shukrawar — Shukra aapke chart ka mitra hai'],
              ['Kuch bada shuru karne ke liye', 'Shukla paksh ka pehla Guruwar']],
      theme: 'Aane waale teen mahine ka theme: aapka kaam logon tak pahunchna, naya kaam milna nahi. Jo kar chuke hain woh dikhaiye.',
      boss: 'Surya theek hai par Shani dekh raha hai — bharosa kaam par hai, dikhawe par nahi. Isliye aapka kaam unhe pata to hai, yaad nahi rehta.',
      change: ['Har kaam ka likhit record rakhiye', 'Zubani tay baat mail par confirm kijiye', 'Mahine mein ek baar kaam ka summary bhejiye'],
      luck: [['Rang', 'Gehra neela aur safed'], ['Disha', 'Uttar — mez is taraf mod lijiye'], ['Mantra', 'Ravivar ko Surya ko jal']],
      tip: 'Raise ki baat August ke doosre hafte mein kijiye, aur usse pehle teen mahine ka kaam likhit bhej dijiye.'
    }
  },
  her: {
    who: 'Mansi', meta: 'Lagna · Navamsa · 14 Oct 2026',
    partner: {
      big: 'Aapke saatve ghar mein Rahu baitha hai — isiliye baat bante bante ruk jaati hai. Sabse saaf window March 2027 se khulti hai.',
      dials: [['Milne ka yog', 'Strong', 79, '#DC6803'], ['Rishte ki sthirta', 'Steady', 66, '#027A48'],
              ['Rukavat', 'Ghat rahi hai', 42, '#7D58A1'], ['Love ya arranged', 'Arranged tilt', 66, '#0E9384']],
      w1: { h: 'March 2027 se November 2027', p: 'Guru aapke saatve ghar par aata hai. Yeh aane waale saalon ki sabse saaf window hai.' },
      w2: { h: 'February 2028', p: 'Parivaar ki baat "sochte hain" se "miltе hain" tak badhti hai.' },
      bands: [['Baaki 2026', 18], ['2027', 74], ['2028', 52], ['2029', 30], ['2030 ke baad', 16]],
      look: 'Gora rang, lamba kad, chehra saaf. Aankhon mein thehrav, bolne se pehle sochta hai.',
      traits: [['Swabhav', 'Bahar se shaant, andar se zidd. Dil ki baat poochhne par hi kehta hai.'],
               ['Kaam', 'Kuch sthir — finance, engineering ya apna chhota setup.'],
               ['Parivaar', 'Chhota parivaar, ek bhai ya behan. Maata-pita dheere raazi hote hain.'],
               ['Mulaqat', 'Kisi jaan-pehchaan ke zariye — chart mein anjaan app ka ishara nahi hai.'],
               ['Disha', 'Uttar ya uttar-paschim, ek din ke safar ke andar.']],
      tilt: 34,
      block: 'Rahu wahi dikhata hai jo turant mil jaaye. Jo rishta pehle hafte mein bahut tez lage — wahi aapka pattern hai.',
      patterns: ['Jo bahut jaldi bahut kareeb aa jaaye', 'Jo aapki zarurat ko pyaar samajh le', 'Jo maafi maange par aadat na badle'],
      attach: [['Attachment style', 'Anxious. Jawab der se aaye to sabse bura soch lete hain.'],
               ['Love language', 'Waqt dena. Tohfe se zyada saath baithna asar karta hai.']],
      daily: ['Budhwar ko Durga ji ka dhyan', 'Ek vyakti ko bhojan', 'Teen hafte tak koi naya vaada nahi']
    },
    marriage: {
      big: 'Aapke chart mein Manglik dosh nahi hai — kuch alag se milane ki zarurat nahi. 36 mein se 24 gun milte hain.',
      dials: [['Shaadi ka samay', 'Strong', 72, '#DC6803'], ['Gun milan', '24 / 36', 67, '#027A48'],
              ['Sasuraal', 'Dheere ghulta hai', 60, '#7D58A1'], ['Manglik dosh', 'Nahi hai', 100, '#0E9384']],
      w1: { h: 'March 2027 se November 2027', p: 'Guru aapke shaadi ke ghar par aata hai. Parivaar ki baat isi dauran shuru hoti hai.' },
      w2: { h: 'February 2028', p: 'Doosri window — baat "let us think" se "let us meet" tak badhti hai.' },
      bands: [['Baaki 2026', 18], ['2027', 74], ['2028', 52], ['2029', 30], ['2030 ke baad', 16]],
      gun: [['Bharosa', 8], ['Parivaar ke sanskaar', 9], ['Baat-cheet', 6], ['Dhairya', 5]],
      traits: [['Jeevansaathi', 'Umar mein 2–4 saal bada, sthir naukri, kam bolne wala.'],
               ['Sasuraal', 'Haan kehte hain, par kehne mein waqt lagta hai. Chhote kadam rakhiye.'],
               ['Paisa', 'Shaadi ke baad sthiti sudhrti hai — doosra ghar joint paisa support karta hai.'],
               ['Vidhi', 'Guruwar aur Shukrawar aapke chart mein sabse bhaari din hain.']],
      doshas: [['Manglik dosh', 'NAHI HAI', 'green', 'Mangal kisi Manglik ghar mein nahi hai. Koi alag milan ki zarurat nahi.'],
               ['Parivaar ka aashirvaad', 'DHEERE', 'amber', 'Parivaar haan kehta hai, par dheere. Baat chhote kadam mein chhediye.']],
      greens: ['Shukra aapke saatve ghar mein theek baitha hai.', 'Guru 2027 bhar shaadi ke ghar ko dekhta hai.',
               'Manglik dosh nahi — kuch match karne ki zarurat nahi.', 'Doosra ghar joint ghar aur joint paisa support karta hai.'],
      ambers: ['Shani February tak parivaar ki baat dheemi rakhta hai.', 'May 2027 mein Budh vakri — us mahine tareekh na rakhein.',
               'Gussa dono taraf se ek niyam maangta hai, jeet nahi.'],
      tip: 'Parivaar se shaadi ki baat Diwali ke baad chhediye. Guruwar aur Shukrawar sabse bhaari din hain.'
    },
    career: {
      big: 'Dasve ghar ka swami aapke chart mein uchch ka hai — pehchaan banegi. Par abhi Shani ki drishti hai, isliye mehnat dikhti nahi.',
      dials: [['Switch ka yog', 'Strong', 73, '#DC6803'], ['Increment', 'Sambhav', 58, '#027A48'],
              ['Business vs job', 'Job tilt', 76, '#7D58A1'], ['Boss ka bharosa', 'Hai', 63, '#0E9384']],
      w1: { h: 'May 2027 se October 2027', p: 'Guru aapke dasve ghar ko dekhta hai. Offer bhi achhi aati hai aur baat banti bhi hai.' },
      w2: { h: 'January 2029', p: 'Doosri window — agar pehli mein switch nahi hua.' },
      bands: [['Baaki 2026', 16], ['2027', 72], ['2028', 44], ['2029', 49], ['2030 ke baad', 23]],
      dates: [['Raise maangne ke liye', 'Guruwar, mahine ka doosra hafta'],
              ['Idea rakhne ke liye', 'Budhwar subah, 10 se 12'],
              ['Interview ke liye', 'Shukrawar — Shukra aapke chart ka mitra hai'],
              ['Kuch bada shuru karne ke liye', 'Shukla paksh ka pehla Guruwar']],
      theme: 'Aane waale teen mahine ka theme: aapka kaam logon tak pahunchna, naya kaam milna nahi. Jo kar chuke hain woh dikhaiye.',
      boss: 'Surya theek hai par Shani dekh raha hai — bharosa aapke kaam par hai, dikhawe par nahi. Isliye kaam unhe pata to hai, yaad nahi rehta.',
      change: ['Har kaam ka likhit record rakhiye', 'Zubani tay baat mail par confirm kijiye', 'Mahine mein ek baar kaam ka summary bhejiye'],
      luck: [['Rang', 'Gehra neela aur safed'], ['Disha', 'Uttar — mez is taraf mod lijiye'], ['Mantra', 'Ravivar ko Surya ko jal']],
      tip: 'Raise ki baat May ke doosre hafte mein kijiye, aur usse pehle teen mahine ka kaam likhit bhej dijiye.'
    }
  }
};

/* ------------------------------------------------- report body (shared) */
/* Small helpers so the three reports can be written as content, not markup. */
function secOpen(h, sub) {
  return '<div class="r-sec"><div class="top-bar"></div>' +
    '<div class="shead"><h3>' + esc(h) + '</h3><p>' + esc(sub) + '</p></div>';
}
function winBlock(w, strong, lbl) {
  return '<div class="win' + (strong ? ' strong' : '') + '">' +
    '<p class="wlbl">' + esc(lbl) + '</p>' +
    '<h4' + (strong ? '' : ' class="sm"') + '>' + esc(w.h) + '</h4>' +
    '<p>' + esc(w.p) + '</p></div>';
}
function barBlock(lbl, items, max) {
  return '<div class="bars bands"><p class="blbl">' + esc(lbl) + '</p>' +
    items.map(function (b) {
      return '<div class="bar-row"><span>' + esc(b[0]) + '</span>' +
        '<span class="track"><i data-w="' + (b[1] * (100 / max)) + '"></i></span>' +
        '<em>' + b[1] + (max === 100 ? '%' : '') + '</em></div>';
    }).join('') + '</div>';
}
function factBlock(items) {
  return '<div class="facts">' + items.map(function (p) {
    return '<div><span>' + esc(p[0]) + '</span><p>' + esc(p[1]) + '</p></div>';
  }).join('') + '</div>';
}
function listBlock(lbl, items) {
  return '<div class="rlist"><p class="blbl">' + esc(lbl) + '</p><ul>' +
    items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
}

/* Each report gets its own cover instead of all three sharing one book icon —
   on a shelf of three, the colourway is what tells them apart at a glance. */
var MOTIFS = {
  heart: '<path fill="currentColor" d="M20 30c-5.7-4.2-10-7.8-10-12.6 0-3 2.3-5.4 5.1-5.4 2 0 3.7 1.1 4.9 2.8 1.2-1.7 2.9-2.8 4.9-2.8 2.8 0 5.1 2.4 5.1 5.4C30 22.2 25.7 25.8 20 30z"/>',
  knot:  '<g fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="16" cy="21" r="6.4"/><circle cx="24" cy="21" r="6.4"/></g>',
  arrow: '<g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 27l6.5-6.5 4 4L30 15"/><path d="M23.5 15H30v6.5"/></g>'
};
function coverArt(r, cls) {
  var c = r.cover;
  return '<span class="cv' + (cls ? ' ' + cls : '') + '" aria-hidden="true"' +
    ' style="--cva:' + c.a + ';--cvb:' + c.b + ';--cvi:' + c.ink + '">' +
    '<svg class="cv-art" viewBox="0 0 40 52">' +
      '<circle class="cv-star" cx="9" cy="10" r="1"/>' +
      '<circle class="cv-star" cx="32" cy="14" r="1.5"/>' +
      '<circle class="cv-star" cx="29" cy="43" r="1"/>' +
      '<g transform="translate(0,5)">' + MOTIFS[c.motif] + '</g>' +
    '</svg>' +
  '</span>';
}

/* The partner, seen from behind and dissolving into light. A face would claim
   a specific person exists and looks like this; a turned back says "someone is
   coming" without the lie — and it is the more wanted image of the two. */
function portraitArt() {
  return '<div class="pt-art" aria-hidden="true">' +
    /* `meet`, not `slice`: slice crops from the top, which beheaded the figure
       and left a dome. Nothing may be cropped here — the head IS the image. */
    '<svg class="pt-fig" viewBox="0 0 400 480" preserveAspectRatio="xMidYMax meet">' +
      '<defs><linearGradient id="ptg" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#D9A7BD"/>' +
        '<stop offset=".42" stop-color="#C87FA0"/>' +
        '<stop offset="1" stop-color="#A5527A"/>' +
      '</linearGradient></defs>' +
      '<g fill="url(#ptg)">' +
        /* Shoulders need a shoulder LINE — a smooth cone reads as a chess
           pawn. The two short segments are the trapezius rising to the neck,
           the curve between them is the neckline. */
        '<path d="M58 480c0-80 27-131 74-150l26-10c15 23 69 23 84 0l26 10c47 19 74 70 74 150z"/>' +
        '<rect x="170" y="248" width="60" height="78" rx="28"/>' +
        '<ellipse cx="200" cy="196" rx="72" ry="88"/>' +
        '<ellipse cx="268" cy="212" rx="13" ry="23"/>' +
      '</g>' +
    '</svg>' +
  '</div>';
}

function partnerBody(c) {
  return secOpen('Woh kab milega', 'Aapke chart ka sabse saaf jawab') +
      winBlock(c.w1, true, 'WINDOW 1 · SABSE SAAF SAMAY') +
      winBlock(c.w2, false, 'WINDOW 2 · DOOSRA MAUKA') +
      barBlock('SAAL DAR SAAL SAMBHAVNA', c.bands, 100) +
    '</div>' +

    secOpen('Woh dikhega kaisa', 'Kundli se bani tasveer') +
      '<figure class="pt">' + portraitArt() +
        '<figcaption>' + esc(c.look) + '</figcaption>' +
      '</figure>' +
      factBlock(c.traits) +
    '</div>' +

    secOpen('Love ya arranged', 'Aapka chart kis taraf jhukta hai') +
      '<div class="tilt">' +
        '<div class="tilt-top"><span>Love</span><span>Arranged</span></div>' +
        '<span class="track"><i data-w="' + c.tilt + '"></i></span>' +
        '<div class="tilt-top n"><span>' + c.tilt + '%</span><span>' + (100 - c.tilt) + '%</span></div>' +
      '</div>' +
    '</div>' +

    secOpen('Abhi kya rok raha hai', 'Rukavat ka asli kaaran aur uska ilaaj') +
      accent('ISKA MATLAB AAPKE LIYE', esc(c.block)) +
      listBlock('BAAR BAAR KAUN KHINCHTA HAI', c.patterns) +
      factBlock(c.attach) +
      listBlock('ROZ YEH KIJIYE', c.daily) +
    '</div>';
}

function marriageBody(c) {
  return secOpen('Shaadi kab hogi', 'Chart ka headline jawab') +
      winBlock(c.w1, true, 'WINDOW 1 · SABSE SAAF SAMAY') +
      winBlock(c.w2, false, 'WINDOW 2 · DOOSRA MAUKA') +
      barBlock('SAAL DAR SAAL SAMBHAVNA', c.bands, 100) +
    '</div>' +

    secOpen('Gun milan', '36 mein se kitne milte hain') +
      barBlock('KIS BAAT PAR KITNA', c.gun, 10) +
    '</div>' +

    secOpen('Kya likha hai', 'Jeevansaathi, sasuraal aur uske baad') +
      factBlock(c.traits) +
    '</div>' +

    c.doshas.map(function (d) {
      return '<div class="tagged"><div class="th"><h4>' + esc(d[0]) + '</h4>' +
        '<span class="tpill ' + d[2] + '">' + esc(d[1]) + '</span></div>' +
        '<p>' + esc(d[3]) + '</p></div>';
    }).join('') +

    '<div class="verdicts">' +
      '<div class="vlist go"><p class="vh">AAPKE PAKSH MEIN</p><ul>' +
        c.greens.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="vlist hold"><p class="vh">DHYAAN SE</p><ul>' +
        c.ambers.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></div>' +
    '</div>' +
    accent('→ PRACTICAL TIP', esc(c.tip));
}

function careerBody(c) {
  return secOpen('Aane waale teen mahine', 'Ek bada theme, baaki sab uske neeche') +
      accent('ISKA MATLAB AAPKE LIYE', esc(c.theme)) +
    '</div>' +

    secOpen('Switch ka sahi samay', 'Kab baat chalaiye, kab chhodiye') +
      winBlock(c.w1, true, 'WINDOW 1 · SABSE SAAF SAMAY') +
      winBlock(c.w2, false, 'WINDOW 2 · DOOSRA MAUKA') +
      barBlock('SAAL DAR SAAL SAMBHAVNA', c.bands, 100) +
    '</div>' +

    secOpen('Sahi tareekhein', 'Kaunsa din kis kaam ke liye') +
      factBlock(c.dates) +
    '</div>' +

    secOpen('Boss kya sochte hain', 'Aur usme kya badalna hai') +
      accent('ISKA MATLAB AAPKE LIYE', esc(c.boss)) +
      listBlock('YEH TEEN CHEEZEIN BADLIYE', c.change) +
    '</div>' +

    secOpen('Rang, disha aur mantra', 'Kaam ki safalta ke liye') +
      factBlock(c.luck) +
    '</div>' +
    accent('→ PRACTICAL TIP', esc(c.tip));
}

/* One body, two charts. `mode` is 'sample' for the free preview (the demo
   chart, whole report, nothing withheld) and 'her' once she has paid. */
function reportBody(id, mode) {
  var r = reportById(id), ch = CHARTS[mode], c = ch[id];
  return '<div class="r-cover rc-art" style="--cva:' + r.cover.a + ';--cvb:' + r.cover.b + '">' +
      coverArt(r, 'cv-lg') +
      '<p class="eyebrow">MADE BY ASTRO HEMALI</p>' +
      '<h2>' + esc(r.t) + '</h2>' +
      '<p class="rfor">For ' + esc(ch.who) + '</p>' +
      '<p class="rmeta">' + esc(ch.meta) + '</p>' +
    '</div>' +
    accent('THE BIG PICTURE', esc(c.big)) +
    '<div class="r-scores"><p class="dlbl">CHART AT A GLANCE</p>' +
      c.dials.map(function (d) { return dial(d[0], d[1], d[2], d[3]); }).join('') +
    '</div>' +
    (id === 'partner' ? partnerBody(c) : id === 'marriage' ? marriageBody(c) : careerBody(c));
}

/* The free preview: her own questions answered against her chart as a list,
   then the ENTIRE report on somebody else's chart. She learns the depth from
   the sample and that it is about her from the list. */
function renderPreview() {
  var r = reportById(state.pick);
  $('#pvTitle').textContent = r.t;
  $('#pvTop').innerHTML = coverArt(r, 'cv-md') +
    '<span class="pv-tag">' + r.pages + ' pages · aapki bhasha + English</span>';
  $('#pvBody').innerHTML =
    '<div class="pv-learn">' +
      '<p class="pv-lh">Aapki report in sab ka jawab degi</p>' +
      '<ul>' + r.learn.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<p class="pv-lw">' + esc(r.why) + '</p>' +
    '</div>' +
    '<div class="pv-samp">' +
      '<p class="pv-sh"><b>Neeche poori report hai — shuru se aakhir tak</b>' +
      '<small>Yeh ' + esc(CHARTS.sample.who) + ' ki kundli par bani hai, taaki aap dekh sakein ki report kitni gehri hai. ' +
      'Aapki report bilkul aisi hi hogi — aapke apne chart par.</small></p>' +
    '</div>' +
    '<div class="read-body pv-report">' + reportBody(r.id, 'sample') + '</div>';
  $('#pvPrice').innerHTML = '<b>₹49</b><small><s>₹499</s><i>90% OFF</i></small>';
  // Nothing is locked any more, so "Unlock" would be a lie — what ₹49 buys is
  // this same report recalculated on her chart.
  $('#pvCta').textContent = 'Meri kundli par banwaiye · ₹49';
  animateBars('#pvBody');
}

/* Per the board's J1: answering opens the reward sheet — coin, ladder with
   today claimed, tomorrow's amount as the comeback reason. Day 3 swaps the
   comeback line for the deadline. */
function openRewardSheet() {
  $('#rewardTitle').textContent = '₹' + REWARD[state.day] + ' added to your wallet!';
  if (state.day < lastDay()) {
    $('#rewardSub').textContent = 'Wallet mein ab ₹' + state.wallet +
      ' hai. Kal wapas aaiye — ₹' + REWARD[state.day + 1] + ' aur milenge.';
    $('#rewardCta').textContent = 'Remind me for tomorrow';
  } else {
    $('#rewardSub').textContent = 'Aur ek baat — report ki ₹49 price aaj raat khatam ho rahi hai. Kal se wapas ₹499.';
    $('#rewardCta').textContent = 'Unlock full report · ₹49';
  }
  openSheet('reward');
}

/* The chapter's astrology figures — a North-Indian kundli with Rahu sitting in
   the 7th house, and the transit bar that puts a date on his exit. Drawn
   inline so the page reads like a report, not a chat message. */
function kundliFig() {
  var H = { 1:[100,44], 2:[52,24], 3:[24,52], 4:[52,100], 5:[24,148], 6:[52,176],
            7:[100,152], 8:[148,176], 9:[176,148], 10:[148,100], 11:[176,52], 12:[148,24] };
  function g(h, t, hl) {
    return '<text class="kg' + (hl ? ' hl' : '') + '" x="' + H[h][0] + '" y="' + H[h][1] + '">' + t + '</text>';
  }
  return '<figure class="chr-fig">' +
    '<svg viewBox="0 0 200 200" role="img" aria-label="Janam chart — Rahu saatve ghar mein">' +
      '<rect x="2" y="2" width="196" height="196" rx="8"/>' +
      '<path d="M2 2 198 198M198 2 2 198M100 2 2 100l98 98 98-98Z"/>' +
      '<circle class="khl" cx="100" cy="148" r="15"/>' +
      g(7, 'Ra', true) + g(1, 'La') + g(4, 'Ch') + g(10, 'Sa') +
      g(2, 'Gu') + g(11, 'Su') + g(9, 'Ma') + g(5, 'Ve') +
    '</svg>' +
    '<figcaption>Aapka janam chart — <b>Rahu</b> saatve ghar mein, shaadi ke ghar mein</figcaption>' +
  '</figure>';
}
function transitFig() {
  return '<figure class="chr-fig chr-trans">' +
    '<div class="ktl"><span class="ktl-bar"><i></i></span><span class="ktl-dot"></span></div>' +
    '<div class="ktl-lab"><span>Aaj</span><span><b>Nov 2026</b> · Rahu nikalta hai</span></div>' +
    '<figcaption>Rahu ka saatva ghar chhodna — yahin se raasta khulta hai</figcaption>' +
  '</figure>';
}

/* The chapter as a full ebook page. Chapter 1 is general on purpose: it ends
   on the chapter-2 hook, then the 7-chapter map (what each one teaches), then
   the one price that opens them. */
function openChapterSheet(i) {
  var c = CHAPTERS[i];
  var paras = (CHAPTER_BODY[i] || []).map(function (p) { return '<p>' + esc(p) + '</p>'; });
  $('#chrNo').textContent = 'Chapter ' + (i + 1) + ' of 7 · free';
  $('#chrTitle').textContent = c.t;
  $('#chrBody').innerHTML =
    paras.slice(0, 2).join('') +
    (i === 0 ? kundliFig() : '') +
    paras.slice(2, 3).join('') +
    (i === 0 ? transitFig() : '') +
    paras.slice(3).join('') +
    '<p class="chr-hook">Agla chapter: <b>' + esc(CHAPTERS[i + 1].t) + '</b> — ' +
      esc(CHAPTERS[i + 1].s.toLowerCase()) + '.</p>' +
    '<div class="chr-list">' +
      '<p class="cl-h">Aapki poori report · 7 chapters</p>' +
      CHAPTERS.map(function (ch, k) {
        return '<div class="cl-row' + (k <= i ? ' done' : '') + '">' +
          '<i>' + (k <= i ? '✓' : (k + 1)) + '</i>' +
          '<span><b>' + esc(ch.t) + '</b><small>' + esc(ch.s) + '</small></span>' +
        '</div>';
      }).join('') +
    '</div>' +
    '<p class="chr-price"><b>₹49</b> <s>₹499</s> <em>90% OFF · PRICE DROP</em>' +
      (state.day >= lastDay() ? '<span class="ends">Ends tonight</span>' : '') + '</p>';
  // Pinned above the CTA so the price is on screen without scrolling the body.
  $('#chrLimited').innerHTML = state.day >= lastDay()
    ? 'Limited-time price — <b class="rd">ends tonight</b> · <s>₹499</s> <b>₹49</b>'
    : 'Limited-time price drop · <s>₹499</s> <b>₹49</b>';
  $('#chrCta').textContent = 'Unlock all 7 chapters · ₹49';
  $('#chapter [data-scroll]').scrollTop = 0;
  go('chapter');
}

/* The intro sheet fires once, on the scroll past the free-chat section, exactly
   as the daily reward board specifies. Day 1 only — by day 2 she has seen it. */
function armIntroSheet() {
  var sc = $('#today-a [data-scroll]'), experts = $('#today-a .expert-card');
  if (!sc || !experts) return;
  sc.removeEventListener('scroll', onTodayScroll);
  state.introShown = state.day !== 1;
  if (state.day === 1) sc.addEventListener('scroll', onTodayScroll);
}
/* "Past the free chat section" in practice means the check-in has come into
   view — waiting for the expert card to leave the screen entirely needs another
   full screen of scrolling, by which point she is already somewhere else. */
function onTodayScroll() {
  // state.answered: once she has answered, the intro has nothing left to sell —
  // and it must not steal the reward sheet that is opening at the same moment.
  if (state.introShown || state.answered || state.screen !== 'today-a') return;
  var card = $('#checkinCard'), sc = $('#today-a [data-scroll]');
  if (card.getBoundingClientRect().top > sc.getBoundingClientRect().bottom - 80) return;
  state.introShown = true;
  openSheet('intro');
}

/* The sell page, as a ladder. The chapters she has already read sit at the top,
   open and ticked — the paywall is then asking her to continue something, not
   to start something. Each open chapter carries the question she can put to
   Hemali, because a report reader has questions and a free user has none. */
function renderChapters() {
  var n = 1;   // only chapter 1 is ever open — it is the hook
  $('#chapterCount').textContent = n + ' of 7 open';
  $('#chapterList').innerHTML = CHAPTERS.map(function (c, i) {
    var open = i < n;
    var hl = open && !state.read1;   // unread: chapter 1 is this page's one highlighted job
    return '<li class="' + (open ? 'open' : 'shut') + (hl ? ' hl' : '') + '">' +
      '<span class="ch-ic" aria-hidden="true"></span>' +
      '<span class="ch-body">' +
        '<b>' + esc(c.t) + (open ? ' <i class="ch-free">FREE</i>' : '') + '</b>' +
        '<span>' + esc(c.s) + '</span>' +
        (open
          ? '<button class="ch-read" type="button" data-read="' + i + '">' +
              (state.read1 ? 'Read chapter ' + (i + 1) + ' →' : 'Read chapter 1 free →') + '</button>' +
            (state.read1
              ? '<button class="ch-ask" type="button" data-chat>Ask Hemali about this →</button>'
              : '')
          : '') +
      '</span>' +
    '</li>';
  }).join('');
}

/* Demo chrome: the selected day's touchpoints, as chips docked right under its
   card in the switcher — tap one to jump the phone to that surface. */
function renderTpTabs() {
  var old = $('.switcher .tp-wrap');
  if (old) old.parentNode.removeChild(old);
  $$('.switcher .has-tp').forEach(function (b) { b.classList.remove('has-tp'); });
  var host = $('.switcher [data-day].on');
  if (!host) return;

  var tabs;
  if (state.pm && !state.paid) {
    // The tabs ARE the schedule: only the surfaces today actually uses, named
    // so a PM can see at a glance what day 1 does and day 2 does not.
    var sf = pmSurf();
    tabs = [];
    if (dayData().push) tabs.push({ id: 'push', l: 'Notification · +15 min' });
    if (sf.chat)  tabs.push({ id: 'chat',    l: state.day === 1 ? 'Chat · offer at +15 min' : 'Chat · offer' });
    if (sf.hist)  tabs.push({ id: 'history', l: 'History · 3 reports' });
    if (sf.today) tabs.push({ id: 'today',   l: 'Today · expert card' });
    if (sf.guide) tabs.push({ id: 'guide',   l: 'Today · personalised' });
    if (!pmQuiet()) tabs.push({ id: 'picker', l: 'Pick 1 of 3' }, { id: 'preview', l: 'Full report free' });
    // Day 5: nothing asks, but the shelf in History is still reachable.
    if (!tabs.length) tabs.push(
      { id: 'today',   l: 'Today · nothing asks' },
      { id: 'chat',    l: 'Chat · nothing asks' },
      { id: 'history', l: 'History · still on the shelf' },
      { id: 'picker',  l: 'Pick 1 of 3' });
  } else if (state.paid) {
    // Post-purchase: every sell surface has retired into the follow-up.
    tabs = [
      { id: 'today',   l: 'Today · read your report' },
      { id: 'chat',    l: 'Chat · continue chat' },
      { id: 'read',    l: 'Full report' },
      { id: 'upsell',  l: 'Report end · upsell' },
      { id: 'history', l: 'History · report ready' }
    ];
  } else {
    tabs = [
      { id: 'today',   l: state.day === 1 ? 'Today · expert card' : 'Today · guidance tile' }
    ];
    // Day 1's chat is the plain free chat — the pitch only enters it from day 2.
    if (state.day >= 2) tabs.push({ id: 'chat', l: 'Chat · pitch' });
    tabs.push(
      { id: 'reader',  l: 'Chapter 1 reader' },
      { id: 'history', l: 'History · card + dot' }
    );
    if (dayData().push) tabs.push({ id: 'push', l: 'Push note' });
  }

  var wrap = document.createElement('div');
  wrap.className = 'tp-wrap';
  wrap.innerHTML =
    '<p class="tp-note">Touchpoints — ' +
      (state.paid ? 'report bought · every surface is the follow-up'
        : state.pm ? (pmQuiet() ? 'nudging has stopped — every surface is quiet'
                                : 'one report a day · whole sample free · ₹49')
        : state.read1 ? 'every surface asks the buy · ₹49' : 'every surface asks the read · free') + '</p>' +
    '<div class="tp-tabs">' + tabs.map(function (t) {
      return '<button type="button" data-tp="' + t.id + '">' + t.l + '</button>';
    }).join('') + '</div>';
  host.classList.add('has-tp');
  host.insertAdjacentElement('afterend', wrap);
}

/* Picking a day rewinds the whole demo to that morning: day 1 starts in the
   chat that just ran out, later days start on Today the way she would land. */
function setDay(n, r1, paid, pm) {
  state.day = n;
  state.pm = !!pm;
  state.preRead = !state.pm && !!r1;
  state.prePaid = !!paid;
  $$('.switcher [data-day]').forEach(function (b) {
    b.classList.toggle('on',
      +b.getAttribute('data-day') === n &&
      b.hasAttribute('data-pm') === state.pm &&
      b.hasAttribute('data-r1') === state.preRead &&
      b.hasAttribute('data-paid') === state.prePaid);
  });
  restart();
}

/* ---------------------------------------------------------------- reset */
function restart() {
  clearTimers();
  closeSheet();
  hidePush();
  state.answered = false;
  state.wallet = WALLET_AT[state.day];
  state.lang = 'en';
  state.langFrom = 'sample';
  state.paid = state.prePaid;
  state.reminded = false;
  state.read1 = state.preRead || state.prePaid;   // read/bought tracks start with chapter 1 done
  state.pick = (state.pm && dayData().lead) || 'partner';
  state.histDot = true;
  state.stack = [];
  renderNav();
  $('#notifDlg').hidden = true;
  paintWallet();
  paintBought();
  renderSample();
  renderRead();
  renderChat();
  renderOffer();
  renderChapters();
  renderPicker();
  renderPreview();
  renderDayToday();
  renderTpTabs();
  renderHistCard();
  armIntroSheet();
  resetTimeline();
  applyPaidTimeline();
  $('#bookEl').classList.remove('open');
  show(state.entry, 'fade');
  if (!state.paid && dayData().push) later(showPush, 700);
}

/* ---------------------------------------------------------------- push note */
function showPush() {
  var el = $('#pushNote');
  $('#pushText').textContent = dayData().push;
  el.hidden = false;
  requestAnimationFrame(function () { el.classList.add('on'); });
  later(hidePush, 6000);
}
function hidePush() {
  var el = $('#pushNote');
  el.classList.remove('on');
  setTimeout(function () { if (!el.classList.contains('on')) el.hidden = true; }, 300);
}

/* ---------------------------------------------------------------- wiring */
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-go],[data-back],[data-sheet],[data-toast],[data-close-sheet],[data-day],[data-lang],[data-nav],[data-mood],[data-remind],#answerNow,#restart,#showSample,#payBtn,#buyInLang,[data-chat],#push,#pushNote,#scrim,#rewardCta,#notifYes,#notifNo,[data-read],#chrCta,[data-tp],[data-pick],#pvCta,[data-ask]');
  if (!t) return;

  // PM track: picking one of the three reports opens its preview.
  if (t.hasAttribute('data-pick')) {
    state.pick = t.getAttribute('data-pick');
    renderPreview();
    go('preview');
    return;
  }
  // Preview's one button: the buy sheet, where language is chosen.
  if (t.id === 'pvCta') { state.langFrom = 'buy'; openSheet('buy'); return; }

  if (t.id === 'push')    { openBook(); return; }

  // The push is the door back in: it lands in the chat, where the chapter is.
  if (t.id === 'pushNote') {
    hidePush();
    // On the PM track the notification names one report, so it has to land on
    // that report's preview. Dropping her on the picker would ask her to make
    // the same choice twice.
    if (state.pm && !state.paid && dayData().lead) {
      state.pick = dayData().lead;
      renderPreview();
      go('preview');
      return;
    }
    if (state.screen !== 'chat') go('chat');
    return;
  }

  // The report's own follow-up questions, answered in the thread.
  if (t.hasAttribute('data-ask')) {
    var qa = reportById(state.pick).ask[+t.getAttribute('data-ask')];
    var thread = $('#chatThread'), chips = $('#sgChips');
    t.remove();
    thread.insertBefore(bubble('user', qa.q), chips);
    scrollChat();
    typing(function () { thread.insertBefore(bubble('hemali', qa.a), chips); scrollChat(); });
    if (!chips.querySelector('.sg-q')) chips.remove();
    return;
  }

  if (t.hasAttribute('data-remind')) {
    state.reminded = true;
    renderChat();
    var sc = $('#chat [data-scroll]');
    if (sc) sc.scrollTop = sc.scrollHeight;
    toast('Reminder set — kal ki free chat ke liye', 'success');
    return;
  }
  if (t.hasAttribute('data-read')) {
    var ci = +t.getAttribute('data-read');
    // Reading chapter 1 flips every day-1 surface from "read it" to "buy the rest".
    if (ci === 0 && !state.read1) {
      state.read1 = true;
      renderDayToday(); renderOffer(); renderChat(); renderChapters(); renderHistCard();
    }
    openChapterSheet(ci);
    return;
  }
  if (t.id === 'chrCta') { state.langFrom = 'buy'; openSheet('buy'); return; }

  if (t.id === 'scrim')   { closeSheet(); return; }
  if (t.id === 'restart') { restart(); return; }

  if (t.hasAttribute('data-day'))  { setDay(+t.getAttribute('data-day'), t.hasAttribute('data-r1'), t.hasAttribute('data-paid'), t.hasAttribute('data-pm')); return; }

  // "Answer now" scrolls to the card and rings it for 2.6s, per the focus rule
  // on the daily reward board. Your Experts stays on screen above it.
  if (t.id === 'answerNow') {
    closeSheet();
    var card = $('#checkinCard');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('focus');
    later(function () { card.classList.remove('focus'); }, 2600);
    return;
  }

  // Answering flips the card to the replied state — the moment Hemali gets a
  // bubble and the report moves into it — and pays the day's reward.
  if (t.hasAttribute('data-mood')) {
    state.answered = true;
    state.wallet += REWARD[state.day];
    paintWallet();
    renderDayToday();
    renderOffer();
    renderChat();     // the chat's pitch card prices off the wallet
    openRewardSheet();
    return;
  }

  // The reward sheet's CTA: before day 3 it asks the OS for notifications;
  // on day 3 the wallet covers ₹49, so it goes straight to the buy sheet.
  if (t.id === 'rewardCta') {
    if (state.day >= lastDay()) { state.langFrom = 'buy'; openSheet('buy'); }
    else $('#notifDlg').hidden = false;
    return;
  }
  if (t.id === 'notifYes') {
    $('#notifDlg').hidden = true;
    closeSheet();
    state.reminded = true;
    renderChat();
    toast('Reminder on — kal ₹' + REWARD[Math.min(state.day + 1, 3)] + ' + free chat ready', 'success');
    return;
  }
  if (t.id === 'notifNo') { $('#notifDlg').hidden = true; closeSheet(); return; }

  if (t.hasAttribute('data-lang')) {
    state.lang = t.getAttribute('data-lang');
    renderLangList();
    return;
  }

  if (t.id === 'showSample') {
    if (state.langFrom === 'buy') {
      renderSample();
      openSheet('buy');
    } else {
      closeSheet();
      renderSample();
      if (state.screen !== 'sample') go('sample');
    }
    return;
  }

  if (t.id === 'buyInLang') { state.langFrom = 'buy'; openSheet('buy'); return; }
  if (t.id === 'payBtn')    { pay(); return; }
  // Touchpoint tabs in the demo sidebar: jump the phone to that surface.
  if (t.hasAttribute('data-tp')) {
    var tp = t.getAttribute('data-tp');
    closeSheet();
    if (tp === 'chat') {
      renderChat();
      if (state.screen !== 'chat') go('chat');
      var tsc = $('#chat [data-scroll]');
      if (tsc) requestAnimationFrame(function () { tsc.scrollTop = tsc.scrollHeight; });
    } else if (tp === 'report') {
      if (state.screen !== 'report') go('report');
    } else if (tp === 'guide') {
      state.stack = [];
      show(state.entry, 'fade');
      var gs = $('#guideSlot');
      if (gs) later(function () { gs.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 380);
    } else if (tp === 'picker') {
      if (state.screen !== 'picker') go('picker');
    } else if (tp === 'preview') {
      renderPreview();
      if (state.screen !== 'preview') go('preview');
    } else if (tp === 'reader') {
      openChapterSheet(0);
    } else if (tp === 'read') {
      if (state.screen !== 'read') { state.stack = [state.entry]; show('read', 'fade'); }
    } else if (tp === 'upsell') {
      if (state.screen !== 'read') { state.stack = [state.entry]; show('read', 'fade'); }
      // The read body has inline ask-Hemali cards too — the carousel + closing
      // upsell sit at the end, so jump to the last one.
      var ups = $$('#read .upsell');
      var up = ups[ups.length - 1];
      if (up) later(function () { up.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 420);
    } else if (tp === 'history') {
      state.stack = []; show('timeline', 'fade');
    } else if (tp === 'push') {
      if (state.screen === 'chat') show(state.entry, 'fade');
      showPush();
    } else {
      state.stack = [];
      show(state.entry, 'fade');
      var slot = $(state.day === 1 ? '#expertSlot' : '#guideSlot');
      if (slot) later(function () { slot.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 380);
    }
    return;
  }

  // Every chat door — Continue Chat, the header icon, Ask Hemali — lands in
  // the real thread, scrolled to its end, where the day's pitch sits.
  if (t.hasAttribute('data-chat')) {
    renderChat();
    if (state.screen !== 'chat') go('chat');
    var cs = $('#chat [data-scroll]');
    if (cs) requestAnimationFrame(function () { cs.scrollTop = cs.scrollHeight; });
    return;
  }

  if (t.hasAttribute('data-close-sheet')) { closeSheet(); return; }

  if (t.hasAttribute('data-sheet')) {
    var name = t.getAttribute('data-sheet');
    if (name === 'lang') state.langFrom = state.sheet === 'buy' ? 'buy' : 'sample';
    else if (name === 'buy') state.langFrom = 'buy';
    openSheet(name);
    return;
  }

  if (t.hasAttribute('data-back')) { back(); return; }

  if (t.hasAttribute('data-go')) {
    var dest = t.getAttribute('data-go');
    if (dest === 'book') openBook();
    else go(dest, 'push');
    return;
  }

  if (t.hasAttribute('data-nav')) {
    var nav = t.getAttribute('data-nav');
    if (nav === 'today')    { state.stack = []; show(state.entry, 'fade'); return; }
    if (nav === 'timeline') { state.stack = []; state.histDot = false; renderNav(); show('timeline', 'fade'); return; }
    toast(t.textContent.trim() + ' is not part of this demo');
    return;
  }

  if (t.hasAttribute('data-toast')) { toast(t.getAttribute('data-toast')); return; }
}, false);

/* The Today header sits transparently over the hero. Once the page scrolls the
   hero away, give it a solid backdrop so content doesn't run under the icons. */
$$('.screen').forEach(function (s) {
  var head = $('.head.hero-head', s), sc = $('[data-scroll]', s);
  if (!head || !sc) return;
  sc.addEventListener('scroll', function () {
    head.classList.toggle('scrolled', sc.scrollTop > 40);
  }, { passive: true });
});

/* ---------------------------------------------------------------- fit */
/* Small laptops: the frame is 360x800; when the window is shorter, zoom the
   whole phone down so the mobile aspect ratio holds instead of squashing.
   On real phones (<=600px) the frame is the viewport and must stay unzoomed. */
function fitPhone() {
  var ph = $('#phone');
  if (window.innerWidth <= 600) { ph.style.zoom = ''; return; }
  var s = Math.min(1, (window.innerHeight - 48) / 800);
  ph.style.zoom = s < 1 ? s : '';
}
window.addEventListener('resize', fitPhone);

/* ---------------------------------------------------------------- boot */
fitPhone();
renderLadder();
renderNav();
renderSample();
renderRead();
paintWallet();
resetTimeline();

// Deep link, so a track and day can be shared: #day2 (unread), #r-day2..#r-day4
// (read track) and #p-day2 (report bought).
var hash = (location.hash || '').replace('#', '');
var linked = /^(?:([rpm])-)?day([1-5])$/.exec(hash);
state.screen = 'today-a';
if (linked) {
  state.pm = linked[1] === 'm';
  state.prePaid = linked[1] === 'p';
  state.preRead = !state.pm && (linked[1] === 'r' || state.prePaid || +linked[2] === 4);   // day 4 only exists read
  state.day = state.pm ? +linked[2] : Math.min(+linked[2], 4);
  state.paid = state.prePaid;
  state.read1 = state.preRead;
  $$('.switcher [data-day]').forEach(function (b) {
    b.classList.toggle('on',
      +b.getAttribute('data-day') === state.day &&
      b.hasAttribute('data-pm') === state.pm &&
      b.hasAttribute('data-r1') === state.preRead &&
      b.hasAttribute('data-paid') === state.prePaid);
  });
}
state.wallet = WALLET_AT[state.day];
paintWallet();
paintBought();
renderRead();
renderChat();
renderOffer();
renderChapters();
renderPicker();
renderPreview();
renderDayToday();
renderTpTabs();
renderHistCard();
armIntroSheet();
applyPaidTimeline();
if (!state.paid && dayData().push) later(showPush, 700);
})();
