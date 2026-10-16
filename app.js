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
    /* The free chat does not end cleanly. It stops mid-sentence, and the rest
       of the sentence is the chapter. */
    msgs: [
      { who: 'sys',    text: 'Astrologer has joined to guide you' },
      { who: 'user',   text: 'Will I have a healthy relationship with my partner?' },
      { who: 'hemali', text: 'Mansi ji, maine aapki kundli dekh li. Aapke saatve ghar mein Rahu baitha hai — isi wajah se baat bante bante ruk jaati hai.' },
      { who: 'hemali', text: 'Poora likh diya hai aapke liye. Padhiye —' },
      { who: 'chapter', idx: 0 },
      { who: 'ended',  text: 'Your free minutes are over. Hemali ne jo likha hai woh aapka hai — kal phir 2 minute milenge.' },
      /* The opt-in, at the moment she has just read Hemali's writing about her
         own chart. Day 1's real output is this yes, not the sale — push is the
         only surface the 83% who never return will ever see. */
      { who: 'remind' }
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
    countdown: '✦ FREE 2 MIN CHAT READY',
    push: 'Hemali ne jo aapke liye likha tha, abhi tak padha nahi 📖 Aaj ki free chat bhi ready hai'
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

/* Daily-reward coins. The wallet is the habit loop's own currency — the report
   is flat ₹49 (down from ₹499) and never discounts off the wallet. */
var REWARD = { 1: 9, 2: 11, 3: 13, 4: 16 };
var WALLET_AT = { 1: 20, 2: 29, 3: 40, 4: 53 };   // start of each day, pre-answer

var state = {
  day: 1,
  flow: 'a',
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
             (n.id === 'timeline' && state.histDot ? '<i class="ndot"></i>' : '') +
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
  $('#readBody').innerHTML =
    '<div class="r-cover">' +
      '<p class="eyebrow">MADE BY ASTRO HEMALI</p>' +
      '<h2>Marriage Yog report</h2>' +
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

function animateBars() {
  // Reset to 0 first so the fill animates every time the screen is opened.
  var bars = $$('#readBody .track i');
  bars.forEach(function (i) { i.style.width = '0'; });
  var arcs = $$('#readBody .dial .ar');
  arcs.forEach(function (a) { a.setAttribute('stroke-dasharray', '0 265'); });
  later(function () {
    bars.forEach(function (i) { i.style.width = i.getAttribute('data-w') + '%'; });
    arcs.forEach(function (a) { a.setAttribute('stroke-dasharray', a.getAttribute('data-dash')); });
  }, 220);
}

/* ---------------------------------------------------------------- buy sheet */
function paintBuySheet() {
  $('#buyLang').textContent = langById(state.lang).label;
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
  state.wallet = Math.max(0, state.wallet - 49);
  paintWallet();
  // Every sell surface retires into the follow-up: read, chat, upay, other reports.
  renderDayToday(); renderOffer(); renderChat(); renderChapters();
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
  return state.preRead ? READ_JOURNEY[state.day] : JOURNEY[state.day];
}
function lastDay() {
  return state.preRead ? 4 : 3;
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

function renderChat() {
  var msgs;
  if (state.day === 1) msgs = JOURNEY[1].msgs;
  else if (state.preRead) msgs = READ_JOURNEY[state.day].msgs;
  else msgs = state.read1 ? JOURNEY[state.day].msgsRead : JOURNEY[state.day].msgsUnread;
  $('#chatThread').innerHTML = msgs.map(function (m) {
    if (m.who === 'chapter') return chapterBubble(m.idx);
    if (m.who === 'sys')     return '<p class="c-sys">' + esc(m.text) + '</p>';
    if (m.who === 'ended')   return '<p class="c-end">' + esc(m.text) + '</p>';
    if (m.who === 'remind')  return remindCard();
    if (m.who === 'pitch')   return pitchCard();
    return '<div class="c-b ' + m.who + '"><p>' + esc(m.text) + '</p><time>02:24 PM</time></div>';
  }).join('');
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
  var line, cta;
  if (state.day >= lastDay()) {
    line = 'Baaki 6 chapters — kaun, kab, love ya arranged — <b>₹49</b> mein. Aaj raat ke baad wapas ₹499.';
    cta = 'Unlock full report · ₹49 — ends tonight';
  } else {
    line = 'Poori report — saaton chapters — <b>₹49</b> <s>₹499</s> mein khul jaati hai. 90% price drop chal raha hai.';
    cta = 'Unlock full report · ₹49';
  }
  return '<div class="rm-card pitch">' +
    '<p>' + line + '</p>' +
    '<button class="btn sm primary" type="button" data-go="report">' + cta + '</button>' +
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
        '<b class="of-hook">Marriage Yog report</b>' +
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
    title = 'Marriage Yog report';
    sub = 'Saaton chapters khule ✓ · upay poochhiye';
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
  if (state.paid) {
    sub = 'Saaton chapters khule ✓ — upay Hemali se poochhiye';
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
      '<span class="tt"><b>Marriage Yog report</b><small>' + sub + '</small></span>' +
      '<i class="tag green">' + tag + '</i>' +
      '<svg class="arr" width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3.5 8h8.5M8.5 4.2 12.3 8l-3.8 3.8" stroke="#475467" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</button>';
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

  var tabs = [
    { id: 'today',   l: state.day === 1 ? 'Today · expert card' : 'Today · guidance tile' },
    { id: 'chat',    l: 'Chat · pitch' },
    { id: 'report',  l: 'Report page' },
    { id: 'reader',  l: 'Chapter 1 reader' },
    { id: 'history', l: 'History · card + dot' }
  ];
  if (JOURNEY[state.day].push) tabs.push({ id: 'push', l: 'Push note' });

  var wrap = document.createElement('div');
  wrap.className = 'tp-wrap';
  wrap.innerHTML =
    '<p class="tp-note">Touchpoints — ' +
      (state.read1 ? 'every surface asks the buy · ₹49' : 'every surface asks the read · free') + '</p>' +
    '<div class="tp-tabs">' + tabs.map(function (t) {
      return '<button type="button" data-tp="' + t.id + '">' + t.l + '</button>';
    }).join('') + '</div>';
  host.classList.add('has-tp');
  host.insertAdjacentElement('afterend', wrap);
}

/* Picking a day rewinds the whole demo to that morning: day 1 starts in the
   chat that just ran out, later days start on Today the way she would land. */
function setDay(n, r1) {
  state.day = n;
  state.preRead = !!r1;
  $$('.switcher [data-day]').forEach(function (b) {
    b.classList.toggle('on',
      +b.getAttribute('data-day') === n && b.hasAttribute('data-r1') === state.preRead);
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
  state.paid = false;
  state.reminded = false;
  state.read1 = state.preRead;   // the read track starts with chapter 1 done
  state.histDot = true;
  state.stack = [];
  renderNav();
  $('#notifDlg').hidden = true;
  paintWallet();
  renderSample();
  renderChat();
  renderOffer();
  renderChapters();
  renderDayToday();
  renderTpTabs();
  armIntroSheet();
  resetTimeline();
  $('#bookEl').classList.remove('open');
  // Flow B's day 1 opens in the chat that just ran out — that is the moment
  // being tested. Flow A's day 1 (and every later day) lands on Today, the way
  // a returning user actually does — with the push still sitting at the top.
  show(state.day === 1 && state.flow === 'b' ? 'chat' : state.entry, 'fade');
  if (state.day >= 2) later(showPush, 700);
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
  var t = e.target.closest('[data-go],[data-back],[data-sheet],[data-toast],[data-close-sheet],[data-day],[data-lang],[data-nav],[data-mood],[data-remind],#answerNow,#restart,#showSample,#payBtn,#buyInLang,[data-chat],#push,#pushNote,#scrim,#rewardCta,#notifYes,#notifNo,[data-read],#chrCta,[data-tp]');
  if (!t) return;

  if (t.id === 'push')    { openBook(); return; }

  // The push is the door back in: it lands in the chat, where the chapter is.
  if (t.id === 'pushNote') {
    hidePush();
    if (state.screen !== 'chat') go('chat');
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
      renderDayToday(); renderOffer(); renderChat(); renderChapters();
    }
    openChapterSheet(ci);
    return;
  }
  if (t.id === 'chrCta') { state.langFrom = 'buy'; openSheet('buy'); return; }

  if (t.id === 'scrim')   { closeSheet(); return; }
  if (t.id === 'restart') { restart(); return; }

  if (t.hasAttribute('data-day'))  { setDay(+t.getAttribute('data-day'), t.hasAttribute('data-r1')); return; }

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
    } else if (tp === 'reader') {
      openChapterSheet(0);
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

// Deep link, so a flow and day can be shared: #day2, #a-day1, #b-day3.
var hash = (location.hash || '').replace('#', '');
// #day2 / #a-day1 / #b-day3 (unread track) and #r-day2..#r-day4 (read track).
var linked = /^(?:([abr])-)?day([1-4])$/.exec(hash);
state.screen = 'today-a';
if (linked) {
  if (linked[1] === 'a' || linked[1] === 'b') state.flow = linked[1];
  state.preRead = linked[1] === 'r' || +linked[2] === 4;   // day 4 only exists read
  state.day = +linked[2];
  state.read1 = state.preRead;
  $$('.switcher [data-day]').forEach(function (b) {
    b.classList.toggle('on',
      +b.getAttribute('data-day') === state.day && b.hasAttribute('data-r1') === state.preRead);
  });
}
state.wallet = WALLET_AT[state.day];
paintWallet();
renderChat();
renderOffer();
renderChapters();
renderDayToday();
renderTpTabs();
armIntroSheet();
if (state.day === 1 && state.flow === 'b') {
  $('#today-a').classList.remove('on');
  $('#chat').classList.add('on');
  state.screen = 'chat';
} else if (state.day >= 2) {
  later(showPush, 700);
}
})();
