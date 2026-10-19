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
var REPORTS = [
  { id: 'love',   t: 'Partner & Relationship', s: 'Kaun, kab, love ya arranged — aur rukavat kya hai', pages: 38 },
  { id: 'money',  t: 'Money & Wealth',         s: 'Paisa kab tikega, kahan ruk raha hai',               pages: 32 },
  { id: 'career', t: 'Career & Job',           s: 'Job change, promotion aur unka sahi time',           pages: 34 }
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
      { who: 'hemali', text: 'Mansi ji, aapke chart par maine 3 reports taiyar ki hain. Jo aapke kaam ki lage, uska preview free mein dekh lijiye.' },
      { who: 'offer3' }
    ],
    today: { eyebrow: '', note: '' },
    countdown: '✦ NEXT FREE 2 MIN CHAT IN <b>14h : 23m</b>',
    push: 'Aapke chart par 3 reports taiyar hain — preview free hai 📖'
  },
  2: {
    stamp: 'Yesterday',
    surf: { chat: false, today: true, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi ji! Kal aapne partner ke baare mein poochha tha. Aaj kya poochhna hai?' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' }
    ],
    today: { eyebrow: '✦ 3 reports ready for you', note: 'Preview free hai — poori report ₹49, ₹499 se price drop.' },
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  /* Days 3 and 4 are identical — Today keeps the offer and the chat joins in.
     Nothing escalates: same three reports, same preview, same price. */
  3: {
    stamp: '2 days ago',
    surf: { chat: true, today: true, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi ji, aapke chart par teeno reports abhi bhi taiyar hain — jo chahiye uska preview free mein dekh lijiye.' },
      { who: 'offer3' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' }
    ],
    today: { eyebrow: '✦ 3 reports ready for you', note: 'Preview free hai — poori report ₹49, ₹499 se price drop.' },
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  4: {
    stamp: '3 days ago',
    surf: { chat: true, today: true, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi ji, aapke chart par teeno reports abhi bhi taiyar hain — jo chahiye uska preview free mein dekh lijiye.' },
      { who: 'offer3' },
      { who: 'ended',  text: 'Your free minutes are over. Next free 2 min chat in 14h 23m.' }
    ],
    today: { eyebrow: '✦ 3 reports ready for you', note: 'Preview free hai — poori report ₹49, ₹499 se price drop.' },
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
  pick: 'love',     // which of the three reports she is looking at
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
  state.wallet = Math.max(0, state.wallet - 49);
  paintWallet();
  // Every sell surface retires into the follow-up: read, chat, upay, other reports.
  renderDayToday(); renderOffer(); renderChat(); renderChapters(); renderHistCard(); renderTpTabs();
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
function boughtTitle() { return state.pm ? reportById(state.pick).t + ' report' : 'Marriage Yog report'; }

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

/* The PM brief's offer, as it lands in the chat: three reports, she picks one,
   preview before paying. One card, three rows — a menu, not a sell. */
function offer3Card() {
  if (state.paid) return pitchCard();
  // Swiggy's offer-card hierarchy: one coloured strip states the deal once, the
  // title owns the card, and each row carries only what separates it from its
  // neighbours — name, one line, chevron. The price is NOT repeated per row.
  return '<div class="of3">' +
    '<p class="of3-strip">PREVIEW FREE · ALL 3 REPORTS</p>' +
    '<div class="of3-in">' +
      '<div class="of3-head">' +
        '<b>3 reports taiyar hain</b>' +
        '<span class="of3-price"><b>₹49</b><s>₹499</s><i>90% OFF</i></span>' +
      '</div>' +
      REPORTS.map(function (r) {
        return '<button class="of3-row" type="button" data-pick="' + r.id + '">' +
          '<img src="assets/book.svg" alt="">' +
          '<span class="of3-t"><b>' + esc(r.t) + '</b><small>' + esc(r.s) + '</small></span>' +
          '<i class="of3-chev" aria-hidden="true">›</i>' +
        '</button>';
      }).join('') +
      '<span class="of3-foot">Aapki bhasha + English · hamesha History mein</span>' +
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
    var show3 = !state.paid && !!pmSurf().hist;
    $('#tlChap').hidden = !show3;
    if (!show3) return;
    $('#tlChapCard').innerHTML =
      '<div class="rep-top">' +
        '<img src="assets/book.svg" alt="">' +
        '<div>' +
          '<p class="eyebrow">From Astro Hemali</p>' +
          '<b>3 reports on your chart</b>' +
          '<p class="rep-status green">Partner · Money · Career — preview free</p>' +
        '</div>' +
      '</div>' +
      '<div class="rep-acts">' +
        '<button class="btn primary grow" type="button" data-go="picker">See the 3 reports</button>' +
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
    $('#expertSlot').innerHTML =
      '<div class="ex-tap" data-go="picker" role="button" tabindex="0">' +
        '<span class="bk3" aria-hidden="true"></span>' +
        '<span class="ex-t">' +
          '<b>3 reports ready · preview free</b>' +
          '<span class="ex-sub">Partner · Money · Career</span>' +
        '</span>' +
        '<i class="ex-pill">₹49</i>' +
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
    $('#guideSlot').innerHTML =
      '<button class="tile" type="button" data-go="picker">' +
        '<span class="bk3" aria-hidden="true"></span>' +
        '<span class="tt"><b>3 reports for you</b><small>Partner · Money · Career</small></span>' +
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
      '<img class="pk-bk" src="assets/book.svg" alt="">' +
      '<span class="pk-t">' +
        '<b>' + esc(r.t) + '</b>' +
        '<small>' + esc(r.s) + '</small>' +
        '<span class="pk-meta"><i class="pk-free">PREVIEW FREE</i>' + r.pages + ' pages</span>' +
      '</span>' +
      '<em class="pk-chev" aria-hidden="true">›</em>' +
    '</button>';
  }).join('');
}

/* Two pages of the real thing, then the wall. No free chapter on this track —
   the preview is all she gets before paying. */
/* `show` is what she reads free; `cut` is the sentence that gets taken away
   mid-thought — the fade lands on the answer, never on filler. */
var PREVIEW = {
  love: {
    show: [
      'Aapki kundli ke saatve ghar mein Rahu baitha hai. Yeh wahi ghar hai jo shaadi, partner aur long-term rishton ko chalata hai — aur Rahu yahan baithkar har baat ko aakhri waqt par ulajha deta hai.',
      'Isi wajah se aapko lagta hai ki baat ban rahi thi, phir achanak ruk gayi. Galti aapki nahi hai; timing ki hai.'
    ],
    cut: [
      'Rahu is ghar se nikalne ki taiyari mein hai. Jis mahine woh nikalta hai, usi se aapke liye sabse saaf window shuru hoti hai — woh mahina hai',
      'Aur partner kis disha se aayega, yeh aapke chart ke navamsa se saaf dikhta hai. Woh disha hai'
    ],
    toc: ['Shaadi ka sahi saal aur mahina', 'Partner kaisa hoga, kahan se milega', 'Love ya arranged — chart kya kehta hai', 'Rukavat ka kaaran aur uske upay']
  },
  money: {
    show: [
      'Aapke gyarahve ghar — aamdani ka ghar — par Shani ki drishti hai. Paisa aata hai, par thehrta nahi: kharch hamesha ek kadam aage nikal jaata hai.',
      'Aapke chart mein paisa rukne ka ek saaf raasta hai, aur woh kamai badhane se nahi khulta.'
    ],
    cut: [
      'Woh ek purani zimmedari band karne se khulta hai. Aapke chart mein woh zimmedari saaf dikh rahi hai — woh hai',
      'Iske baad aapki bachat kis mahine se badhni shuru hogi, uska time bhi tay hai. Woh mahina hai'
    ],
    toc: ['Paisa kis mahine se tikna shuru hoga', 'Kharch ka asli leak kahan hai', 'Udhaar, loan aur property ka samay', 'Aamdani badhane ke upay']
  },
  career: {
    show: [
      'Dasve ghar ka swami aapke chart mein apni uchch rashi mein hai — kaam mein aapki pehchaan banegi, isme shak nahi. Par abhi woh ek aisi jagah se guzar raha hai jahan mehnat dikhti nahi.',
      'Job change ka sawaal aapke mann mein pichhle kuch mahino se hai. Chart kehta hai ki haan — par abhi nahi.'
    ],
    cut: [
      'Sahi mahina wahi hai jab Guru aapke dasve ghar ko dekhta hai. Aapke chart mein woh mahina padta hai',
      'Aur us waqt kis tarah ka role aapke liye khulega, woh bhi likha hai — woh hai'
    ],
    toc: ['Job change ka sahi mahina', 'Promotion aur salary ka samay', 'Kaunsa field aapke chart ko suit karta hai', 'Boss aur office ke rukavat ke upay']
  }
};

function renderPreview() {
  var r = reportById(state.pick);
  $('#pvTitle').textContent = r.t;
  $('#pvTag').textContent = 'Preview · 2 of ' + r.pages + ' pages';
  // The wall: real sentences fading into the page rather than grey bars, so
  // the cut feels like a page break and not a loading state.
  $('#pvBody').innerHTML =
    PREVIEW[r.id].show.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
    '<div class="pv-fade" aria-hidden="true">' +
      PREVIEW[r.id].cut.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
    '</div>' +
    '<div class="pv-lockbar">' +
      '<span class="pv-lk" aria-hidden="true">' +
        '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="3.2" y="7" width="9.6" height="6.4" rx="1.6" stroke="#B54708" stroke-width="1.4"/><path d="M5.6 7V5.4a2.4 2.4 0 0 1 4.8 0V7" stroke="#B54708" stroke-width="1.4" stroke-linecap="round"/></svg>' +
      '</span>' +
      '<span class="pv-lkt">' +
        '<b>Baaki ' + (r.pages - 2) + ' pages locked hain</b>' +
        '<small>Timing, upay aur poora jawab — sab aage hai</small>' +
      '</span>' +
    '</div>' +
    '<p class="pv-toch">Aage in sawaalon ka jawab hai</p>' +
    '<ul class="pv-toc">' +
      PREVIEW[r.id].toc.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
    '</ul>';
  $('#pvPrice').innerHTML = '<b>₹49</b><small><s>₹499</s><i>90% OFF</i></small>';
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
    if (!pmQuiet()) tabs.push({ id: 'picker', l: 'Pick 1 of 3' }, { id: 'preview', l: 'Preview (locked)' });
    if (!tabs.length) tabs.push({ id: 'today', l: 'Today · nothing asks' }, { id: 'chat', l: 'Chat · nothing asks' });
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
                                : 'pick 1 of 3 · preview free · ₹49')
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
  state.pick = 'love';
  state.histDot = true;
  state.stack = [];
  renderNav();
  $('#notifDlg').hidden = true;
  paintWallet();
  renderSample();
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
  var t = e.target.closest('[data-go],[data-back],[data-sheet],[data-toast],[data-close-sheet],[data-day],[data-lang],[data-nav],[data-mood],[data-remind],#answerNow,#restart,#showSample,#payBtn,#buyInLang,[data-chat],#push,#pushNote,#scrim,#rewardCta,#notifYes,#notifNo,[data-read],#chrCta,[data-tp],[data-pick],#pvCta');
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
