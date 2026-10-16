/* AstroChat · "Sell report from Today" demo.
   One router over absolutely-positioned .screen elements, plus the few bits of
   content that are easier to generate than to hand-write nine times over
   (coin ladder, bottom nav, language list, sample body, full report body). */
(function () {
'use strict';

var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

var LANGS = window.LANGS, SAMPLE = window.SAMPLE;

/* The seven chapters. The first three are the ladder: one is given away each
   day, free, so she has read Hemali's actual writing three times before she is
   asked for money. The remaining four are what ₹49 buys. */
var CHAPTERS = [
  { t: 'Why Rahu is delaying your marriage',  s: 'What is actually blocking it, and how to clear it' },
  { t: 'The person you will marry',           s: 'Nature, work, family — and where you meet' },
  { t: 'Your marriage windows, year by year', s: 'The three clearest openings in your chart' },
  { t: 'Love marriage or arranged?',          s: 'Which way your chart leans, and why' },
  { t: 'Are you Manglik — and how serious?',  s: 'The honest answer, without the fear' },
  { t: 'Will your in-laws be warm?',          s: 'The home you are marrying into' },
  { t: 'How money changes after marriage',    s: 'Your chart after the wedding' }
];

/* One person, three mornings. Each day has to earn the tap on its own terms:
   curiosity on day 1, progress on day 2, a deadline on day 3. */
var JOURNEY = {
  1: {
    unlocked: 1,
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
    today: { eyebrow: '✦ Chapter 1 of 7 · open', note: 'Kal chapter 2 khulega — ya abhi poori report kholiye.' },
    countdown: '✦ CHAPTER 2 + FREE 2 MIN CHAT IN <b>14h : 23m</b>'
  },
  2: {
    unlocked: 2,
    stamp: 'Yesterday',
    /* Day 2 flips the position: the chapter opens the chat instead of closing
       it, so there is a reason to tap in, and the free 2 minutes do not get
       spent on "hi, what is your question". */
    msgs: [
      { who: 'hemali', text: 'Mansi ji! Kal raat maine aapka chart dubara dekha.' },
      { who: 'hemali', text: 'Jo insaan aapki life mein aane wala hai — uske baare mein likh diya hai. Yeh aapke liye free hai.' },
      { who: 'chapter', idx: 1 },
      { who: 'user',   text: 'Ye to bilkul sahi laga 😳' },
      { who: 'hemali', text: 'Bataiye, aur kya jaanna hai?' },
      { who: 'ended',  text: 'Your free minutes are over. Chapter 2 aapki report mein save ho gaya.' }
    ],
    today: { eyebrow: '✦ Chapter 2 of 7 · open', note: 'Kal timing wala chapter khulega — ya abhi poori report kholiye.' },
    countdown: '✦ CHAPTER 3 + FREE 2 MIN CHAT IN <b>14h : 23m</b>',
    push: 'Jo insaan aapki life mein aane wala hai — Chapter 2 khul gaya 📖'
  },
  3: {
    unlocked: 3,
    stamp: '2 days ago',
    /* The cliffhanger lands on the one thing she wants most, and it is the
       truncation that sells — not the discount. */
    msgs: [
      { who: 'hemali', text: 'Mansi ji, aaj timing wala chapter khol rahi hoon.' },
      { who: 'hemali', text: 'Aapka sabse saaf window March 2027 mein khulta hai. Usse pehle do aur hain, aur ek abhi chal raha hai —' },
      { who: 'chapter', idx: 2, cut: true },
      { who: 'ended',  text: 'Your free minutes are over. Baaki 4 chapters aaj raat tak ₹49 mein.' }
    ],
    today: { eyebrow: '✦ Chapter 3 of 7 · open', note: 'Baaki 4 chapters ₹49 mein — aaj raat tak.' },
    countdown: '✦ LAST DAY · ₹49 PRICE ENDS IN <b>9h : 41m</b>',
    push: 'Aapki shaadi ki timing likh di hai — aur ₹49 price aaj raat khatam'
  }
};

var state = {
  day: 1,
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
  if (id !== 'timeline') hidePush();
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
  $('#buyWallet').textContent = '−₹' + state.wallet;
  var pay = 49 - state.wallet;
  $('#buyTotal').textContent = '₹' + pay;
  $('#payBtn').textContent = 'Pay ₹' + pay;
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
  { id: 'timeline', label: 'Timeline' },
  { id: 'explore', label: 'Explore' }
];

function renderNav() {
  $$('[data-bnav]').forEach(function (el) {
    var active = el.getAttribute('data-bnav');
    el.innerHTML = NAV.map(function (n) {
      return '<button type="button" class="' + (n.id === active ? 'on' : '') + '"' +
             ' data-nav="' + n.id + '">' + NAV_ICONS[n.id] + '<span>' + n.label + '</span></button>';
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
      '<button class="btn primary" type="button" id="chatHemali">Chat with Hemali</button>' +
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
  $('#tlReportTime').textContent = '10:42 AM';
  $('#repStatus').textContent = 'Your report is being made';
  $('#repStatus').classList.remove('green');
  $('#repSteps').hidden = false;
  $('#repNotify').hidden = false;
  $('#repActs').hidden = true;
  $$('#repSteps .step').forEach(function (s) { s.classList.remove('done', 'now'); });
  hidePush();
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
    showPush();
  }, 500);
}

function showPush() {
  // If the user already opened the report the banner is stale, so drop it.
  if (state.screen !== 'timeline') return;
  reveal($('#push'));
}
function hidePush() {
  var p = $('#push');
  p.classList.remove('on');
  setTimeout(function () { if (!p.classList.contains('on')) p.hidden = true; }, 440);
}

/* ---------------------------------------------------------------- book opening (R.6b / R.6c) */
function openBook() {
  hidePush();
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
  state.wallet = 0;
  paintWallet();
  toast('Payment successful', 'success');
  later(function () {
    state.stack = [state.entry];
    show('timeline', 'fade');
    resetTimeline();
    later(runMaking, 350);
  }, 900);
}

/* ------------------------------------------------------------- journey */
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

/* The chapter as Hemali hands it over in the chat. On day 3 it is cut off
   mid-paragraph — the truncation is the sell, not the discount under it. */
function chapterBubble(idx, cut) {
  var c = CHAPTERS[idx];
  return '<div class="ch-card' + (cut ? ' cut' : '') + '">' +
    '<span class="ch-no">Chapter ' + (idx + 1) + ' of 7 · free</span>' +
    '<b class="ch-t">' + esc(c.t) + '</b>' +
    '<p class="ch-s">' + esc(c.s) + '</p>' +
    (cut
      ? '<p class="ch-cut">March 2027 ke pehle do aur windows hain. Pehla' +
        '<span class="ch-fade"> window aapke 28ve saal mein khulta hai aur usme</span></p>' +
        '<button class="btn sm primary ch-go" type="button" data-go="report">Baaki 4 chapters kholiye · ₹49</button>'
      : '<button class="btn sm outline ch-go" type="button" data-go="report">Padhiye →</button>') +
    '<span class="ch-saved">Saved to your report</span>' +
  '</div>';
}

function renderChat() {
  var d = JOURNEY[state.day];
  $('#chatThread').innerHTML = d.msgs.map(function (m) {
    if (m.who === 'chapter') return chapterBubble(m.idx, m.cut);
    if (m.who === 'sys')     return '<p class="c-sys">' + esc(m.text) + '</p>';
    if (m.who === 'ended')   return '<p class="c-end">' + esc(m.text) + '</p>';
    if (m.who === 'remind')  return remindCard();
    return '<div class="c-b ' + m.who + '"><p>' + esc(m.text) + '</p><time>02:24 PM</time></div>';
  }).join('');
}

/* Tomorrow gets a name — the chapter 2 title — and one tap says yes. */
function remindCard() {
  if (state.reminded) {
    return '<div class="rm-card done"><p>🔔 Done. Kal <b>' + esc(CHAPTERS[1].t) +
      '</b> khulte hi aapko bata denge.</p></div>';
  }
  return '<div class="rm-card">' +
    '<p>Kal chapter 2 khulega — <b>' + esc(CHAPTERS[1].t) + '</b>. Yaad dila dein?</p>' +
    '<button class="btn sm primary" type="button" data-remind>🔔 Haan, yaad dilaiye</button>' +
  '</div>';
}

/* The Today slot is the same container every day, filling up. The count is the
   point: she can see what she has and what is missing. */
function renderOffer() {
  var d = JOURNEY[state.day], n = d.unlocked, left = CHAPTERS.length - n;
  var dots = CHAPTERS.map(function (c, i) {
    return '<i class="' + (i < n ? 'got' : '') + '" title="' + esc(c.t) + '"></i>';
  }).join('');

  $('#offerSlot').innerHTML =
    '<span class="of-eyebrow">' + esc(d.today.eyebrow) + '</span>' +
    '<div class="of-row">' +
      '<span class="bk3" aria-hidden="true"><span class="bk3-stack"></span></span>' +
      '<span class="of-t">' +
        '<b class="of-hook">Marriage Yog report</b>' +
        '<span class="of-sub">' + esc(CHAPTERS[n - 1].t) + '</span>' +
        '<span class="of-dots">' + dots + '</span>' +
      '</span>' +
    '</div>' +
    '<p class="of-note">' + esc(d.today.note) + '</p>' +
    '<button class="btn sm primary" type="button" data-go="report">' +
      (state.day >= 3 ? 'Unlock ' + left + ' chapters · ₹49' : 'Open chapter ' + n) +
    '</button>';
}

/* Day 1 is structurally different, not just differently worded. The check-in
   has not been answered, so Hemali has no bubble on the page — which is why the
   report cannot live where it lives on day 2 and 3. It goes on the expert card,
   the one surface that is already hers and already on screen. */
function renderDayOne() {
  var d1 = state.day === 1;
  $('#countdownLine').innerHTML = JOURNEY[state.day].countdown;
  $('#checkinCard').hidden  = !d1;
  $('#answeredCard').hidden = d1;
  $('#expertSlot').hidden   = !d1;
  // The ladder has to agree with the card: nothing collected until she answers.
  state.claimed = d1 ? 0 : 1;
  renderLadder();
  if (!d1) return;

  $('#expertSlot').innerHTML =
    '<span class="ex-eyebrow">✦ From your chat just now</span>' +
    '<div class="ex-row">' +
      '<span class="bk3" aria-hidden="true"></span>' +
      '<span class="ex-t">' +
        '<b>' + esc(CHAPTERS[0].t) + '</b>' +
        '<span>Chapter 1 is open and free. Six more inside.</span>' +
      '</span>' +
    '</div>' +
    '<div class="ex-pr"><b>₹49</b><s>₹199</s><i>75% OFF</i></div>' +
    '<button class="btn outline" type="button" data-go="report">Read chapter 1 →</button>';
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
  if (state.introShown || state.screen !== 'today-a') return;
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
  var n = JOURNEY[state.day].unlocked;
  $('#chapterCount').textContent = n + ' of 7 open';
  $('#chapterList').innerHTML = CHAPTERS.map(function (c, i) {
    var open = i < n;
    return '<li class="' + (open ? 'open' : 'shut') + '">' +
      '<span class="ch-ic" aria-hidden="true"></span>' +
      '<span class="ch-body">' +
        '<b>' + esc(c.t) + '</b>' +
        '<span>' + esc(c.s) + '</span>' +
        (open
          ? '<button class="ch-ask" type="button" data-toast="Chat is not part of this demo">Ask Hemali about this →</button>'
          : '') +
      '</span>' +
    '</li>';
  }).join('');
}

/* Picking a day rewinds the whole demo to that morning: day 1 starts in the
   chat that just ran out, later days start on Today the way she would land. */
function setDay(n) {
  state.day = n;
  $$('.switcher [data-day]').forEach(function (b) {
    b.classList.toggle('on', +b.getAttribute('data-day') === n);
  });
  restart();
}

/* ---------------------------------------------------------------- reset */
function restart() {
  clearTimers();
  closeSheet();
  hidePush();
  state.wallet = 20;
  state.lang = 'en';
  state.langFrom = 'sample';
  state.paid = false;
  state.reminded = false;
  state.stack = [];
  paintWallet();
  renderSample();
  renderChat();
  renderOffer();
  renderChapters();
  renderDayOne();
  armIntroSheet();
  resetTimeline();
  $('#bookEl').classList.remove('open');
  // Day 1 opens in the chat that just ran out — that is the moment being tested.
  // On later days she lands on Today, the way a returning user actually does —
  // with the push that brought her here still sitting at the top.
  show(state.day === 1 ? 'chat' : state.entry, 'fade');
  if (state.day >= 2) later(showPush, 700);
}

/* ---------------------------------------------------------------- push note */
function showPush() {
  var el = $('#pushNote');
  $('#pushText').textContent = JOURNEY[state.day].push;
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
  var t = e.target.closest('[data-go],[data-back],[data-sheet],[data-toast],[data-close-sheet],[data-day],[data-lang],[data-nav],[data-mood],[data-remind],#answerNow,#restart,#showSample,#payBtn,#buyInLang,#chatHemali,#push,#pushNote,#scrim');
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
    toast('Reminder set — kal chapter 2 khulte hi', 'success');
    return;
  }
  if (t.id === 'scrim')   { closeSheet(); return; }
  if (t.id === 'restart') { restart(); return; }

  if (t.hasAttribute('data-day')) { setDay(+t.getAttribute('data-day')); return; }

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

  // Answering flips the card to the replied state — which is also the moment
  // Hemali gets a bubble, and the report could move into it.
  if (t.hasAttribute('data-mood')) {
    $('#checkinCard').hidden = true;
    $('#answeredCard').hidden = false;
    $('#expertSlot').hidden = true;
    state.claimed = 1;
    renderLadder();
    renderOffer();
    toast('₹9 added to your wallet', 'success');
    return;
  }

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
  if (t.id === 'chatHemali') {
    toast('Chat is not part of this demo');
    later(function () { state.stack = []; show(state.entry, 'fade'); }, 700);
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
    if (nav === 'timeline') { state.stack = []; show('timeline', 'fade'); return; }
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

/* ---------------------------------------------------------------- boot */
renderLadder();
renderNav();
renderSample();
renderRead();
paintWallet();
resetTimeline();

// Deep link, so a day can be shared: #day2, #day3.
var hash = (location.hash || '').replace('#', '');
var linked = /^day([123])$/.exec(hash);
state.screen = 'today-a';
if (linked) {
  state.day = +linked[1];
  $$('.switcher [data-day]').forEach(function (b) {
    b.classList.toggle('on', +b.getAttribute('data-day') === state.day);
  });
}
renderChat();
renderOffer();
renderChapters();
renderDayOne();
armIntroSheet();
if (state.day === 1) {
  $('#today-a').classList.remove('on');
  $('#chat').classList.add('on');
  state.screen = 'chat';
} else {
  later(showPush, 700);
}
})();
