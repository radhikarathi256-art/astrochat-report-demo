/* AstroChat · "Sell report from Today" demo.
   One router over absolutely-positioned .screen elements, plus the few bits of
   content that are easier to generate than to hand-write nine times over
   (coin ladder, bottom nav, language list, sample body, full report body). */
(function () {
'use strict';

var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

var LANGS = window.LANGS, SAMPLE = window.SAMPLE;

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
    id: 'partner', t: 'Partner Prediction', s: 'Who, where and when you will meet, and what is holding it up', pages: 38, rating: '4.7', sold: 13000,
    // `t2` is the long name, used where the card has room for two lines and the
    // book is sitting right next to it — it has to match the cover she can see.
    t2: 'Your Future Partner Prediction Report',
    // `tl` is the sell page's own headline, Figma 3186:204216 — it names both
    // halves of what the report answers, which "Your Partner Prediction" does
    // not. Reports without one fall back to "Your " + t.
    tl: 'Your Future Partner & Marriage Prediction',
    why: 'Learn how Rahu is blocking you from meeting him',
    cover: { a: '#F0668B', b: '#8B2F55', ink: '#FFE4EC', motif: 'heart' },
    // Partner is the one report whose art is photographed rather than painted:
    // Figma 3311:6840 for the cover and 3254:6840 for the open spread, exported
    // straight out of the board. The spread keeps its own board edges on
    // transparency, re-padded to the proportions the hero's hand-placed contact
    // shadow and gutter were measured against. The query strings are the only
    // thing that gets an installed home-screen app to re-fetch art that kept its
    // filename.
    // `solid` is the same cover rendered as a real book in perspective
    // (Figma 3318:6840). It replaces the CSS board wherever the book is inert;
    // the three places it has to move keep the built one.
    art: {
      closed: 'assets/cover-partner.jpg?v=3',
      open: 'assets/spread-partner.png?v=3',
      solid: 'assets/book3d-partner.png?v=1'
    },
    // What is in the box, as chips — the one thing unique to this report first.
    chips: ['Partner image', 'Birth chart analysis'],
    // Quotes that name something the report called before it happened. A quote
    // that only says "very good" proves nothing and sells nothing.
    revs: [
      { s: 5, n: 'Priya S., Jaipur', q: 'It said my partner would be from a creative field. Six months later I got a rishta from a graphic designer.' },
      { s: 5, n: 'Neha K., Indore',  q: 'The part about meeting through people who already know me is exactly how it happened.' },
      { s: 4, n: 'Ritu M., Nashik',  q: 'The wrong-people pattern was uncomfortable to read because it was true. I stopped rushing the first week.' },
      { s: 5, n: 'Sneha V., Kolkata', q: 'I showed the partner image to my mother before the first meeting. She went quiet when she saw him.' }
    ],
    /* Figma 3111:201622 — eight, and the top three said in the frame's own
       words. The chat card shows three and counts "+5"; History counts all
       eight. Both numbers come from this one list, so they cannot drift. */
    learn: [
      'Image of your future partner',
      'How and where you will meet',
      'What your first meeting looks like',
      'When real love arrives in this life',
      'What is blocking that person from reaching you now',
      'Love or arranged, what the chart says',
      'The kind of wrong people you keep attracting',
      'What to do each day so that person comes closer'
    ],
    ask: [
      { q: 'Where will I meet them?',        a: 'Your navamsa points to one direction. An introduction through work or study, not alone in some unknown place. It comes through people who already know you.' },
      { q: 'What is the remedy for Rahu?',   a: 'Pray to Durga on Wednesdays and feed one person. And for three weeks, make no new promise about the thing that is stuck.' },
      { q: 'Why do wrong people turn up?',   a: 'Rahu shows whatever is available instantly. Any relationship that moves very fast in the first week is your pattern. Wait three weeks and the pattern breaks.' }
    ]
  },
  {
    id: 'marriage', t: 'Marriage Report', s: 'When it happens, with whom, and how the home feels', pages: 42, rating: '4.8', sold: 96440,
    why: 'Learn how Mars in your chart is holding the talks back',
    cover: { a: '#E8973C', b: '#8A4A12', ink: '#FFEBD4', motif: 'knot' },
    // Figma 3258:6840 for the spread, 3330:6840 for the hero ground.
    art: {
      closed: 'assets/cover-marriage.jpg?v=2',
      open: 'assets/spread-marriage.png?v=1',
      hero: 'assets/bg-marriage.jpg?v=1'
    },
    chips: ['36 guna match', 'Dosha check'],
    revs: [
      { s: 5, n: 'Anjali D., Surat',  q: 'It put the window in late 2027 and that is when my family started the talks. I had told nobody.' },
      { s: 5, n: 'Kavya R., Chennai', q: 'The low-Manglik reading saved me months of panic. Two astrologers had said the opposite.' },
      { s: 4, n: 'Pooja N., Bhopal',  q: 'The first six months of adjustment with in-laws is exactly what happened, almost to the week.' },
      { s: 5, n: 'Isha G., Lucknow',  q: 'The guna count matched what the pandit worked out later. We stopped paying for a second opinion.' }
    ],
    learn: [
      'Am I Manglik or not, and how strongly',
      'When the marriage happens, and the best window for it',
      'A full reading of your house of marriage',
      'The kind of life partner written in your chart',
      'Whether your in-laws will stand by you',
      'Whether money changes after marriage',
      'How many of the 36 gunas match, full compatibility',
      'Which doshas you have, and the right remedies'
    ],
    ask: [
      { q: 'How serious is the Manglik?',    a: 'Mars is in your chart but weakly placed. This is called a low Manglik. With a partner whose chart is similar, it settles on its own.' },
      { q: 'Which is the best month?',       a: 'When Jupiter looks at your seventh house. In that window talks move forward and the family agrees too.' },
      { q: 'What will the in-laws be like?', a: 'The lord of your fourth house is well placed, so the home stays calm. The first six months ask for some adjustment, then it steadies.' }
    ]
  },
  {
    id: 'career', t: 'Career & Job', s: 'Switch, promotion, your boss and the right time', pages: 34, rating: '4.6', sold: 71250,
    why: 'Learn how Saturn is slowing down your next move',
    cover: { a: '#3E8FD6', b: '#1B4A78', ink: '#DCEBFA', motif: 'arrow' },
    // Figma 3325:6840 cover, 3328:6840 spread, 3330:6864 hero ground.
    art: {
      closed: 'assets/cover-career.jpg?v=1',
      open: 'assets/spread-career.png?v=1',
      hero: 'assets/bg-career.jpg?v=1'
    },
    chips: ['Switch timing', 'Raise window'],
    revs: [
      { s: 5, n: 'Shruti B., Pune',   q: 'It named March as the switch month. I got the offer on the 11th of March.' },
      { s: 5, n: 'Meera T., Gurgaon', q: 'The bit about my work being invisible rather than weak changed how I ran my reviews.' },
      { s: 4, n: 'Divya S., Kochi',   q: 'Saturn watching the tenth lord explained a slow year I had been blaming myself for.' },
      { s: 5, n: 'Tanvi A., Jaipur',  q: 'It said job, not business, for this year. I had almost put in my notice to start something.' }
    ],
    learn: [
      'The one big career theme of the next three months',
      'The best dates to ask for a raise or pitch an idea',
      'Business or a job, what the chart says',
      'What your boss actually thinks about you',
      'What to change at work, and how to make your work visible',
      'The right month for a job switch',
      'How likely a raise is in this job',
      'Colours, directions and mantras for success at work'
    ],
    ask: [
      { q: 'When should I change jobs?',     a: 'When Jupiter looks at your tenth house. In that window the offers are better and talks close. Before it, only talk, do not switch.' },
      { q: 'What does my boss think?',       a: 'The Sun is fine but Saturn is watching. He trusts the work, not the show. So he knows your work, he just does not remember it.' },
      { q: 'Will I get a raise?',            a: 'Your tenth lord is exalted, so yes, but only if you ask, not on its own. Ask on the dates named in the report.' }
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
      { who: 'hemali', text: 'Mansi, I have read your chart. Rahu sits in your seventh house. That is why things stop just as they start to work out.' },
      { who: 'hemali', text: 'Do not worry, there is a remedy for it.' },
      { who: 'ended',  text: 'This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.' },
      /* The brief's wait, made visible — nothing touches her until it passes. */
      { who: 'gap',    text: '15 minutes later' },
      { who: 'hemali', text: 'Mansi, I have written a full report on your seventh house covering the Rahu block, the timing, what your partner will be like and the remedies, all of it. A complete sample on another chart is open to read, so you can see how deep it goes.' },
      { who: 'offer3' }
    ],
    today: { eyebrow: '', note: '' },
    countdown: '✦ NEXT FREE 2 MIN CHAT IN <b>14h : 23m</b>',
    /* A notification that names her own house and opens that one preview beats
       a storefront ad that makes her choose again on the other side of the tap. */
    lead: 'partner',
    push: 'Mansi, Rahu is in your seventh house. The Partner Prediction report is ₹49 today instead of ₹499 📖'
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
      { who: 'hemali', text: 'Mansi! Yesterday you asked about your partner. What would you like to ask today?' },
      { who: 'ended',  text: 'This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.' }
    ],
    today: { eyebrow: '', note: '' },   // PM Today uses the expert card, not this slot
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  /* Day 3 steps back off the expert card — Today keeps only the personalised
     tile, and the chat carries the ask. Nothing escalates: same three reports,
     same preview, same price. */
  3: {
    stamp: '2 days ago',
    lead: 'career',
    surf: { chat: true, today: false, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi, I noticed one more thing in your chart. Saturn is aspecting your tenth house. Your job and promotion timing rests on that. I have a report on it too.' },
      { who: 'offer3' },
      { who: 'ended',  text: 'This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.' }
    ],
    today: { eyebrow: '', note: '' },   // PM Today uses the expert card, not this slot
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  /* Day 4 is the last ask, and it is quieter than day 3, not louder: the chat
     and the expert card both drop away and the report sits as the first task in
     Personalised Guidance, where she can take it or walk past it. */
  4: {
    stamp: '3 days ago',
    lead: 'marriage',
    lastAsk: true,
    surf: { chat: false, today: false, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi, one thing was left. There is a Mars question in your chart, so the Manglik part, the marriage timing and the in-laws sit in a separate report. Do take a look today.' },
      { who: 'offer3' },
      { who: 'ended',  text: 'This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.' }
    ],
    today: { eyebrow: '', note: '' },   // PM Today uses the expert card, not this slot
    countdown: '✦ FREE 2 MIN CHAT READY'
  },
  /* Day 5: the stop. Nothing asks her any more — no push, no chat line, no
     expert card. The report stays on the shelf as a task she can pick up if she
     wants it, which is not the same as being sold to. */
  5: {
    stamp: '4 days ago',
    quiet: true,
    surf: { chat: false, today: false, guide: true, hist: false },
    msgs: [
      { who: 'hemali', text: 'Mansi, tell me, what would you like to ask today?' },
      { who: 'ended',  text: 'This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.' }
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
  pick: 'partner',  // which of the three reports she is looking at
  /* The morning's report is waiting in History — the dot on the nav says so,
     and visiting History clears it. */
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
  // The scroll went back to the top, so the header has to go back to glass —
  // it does not fire a scroll event for a programmatic reset.
  var rh = $('.rp-head', next);
  if (rh) rh.classList.remove('solid');
  onEnter(id);
}

function go(id, mode) {
  if (mode !== 'back') state.stack.push(state.screen);
  // The knock belongs to Today. Leaving the page is an answer to it either way.
  if (id !== 'today-a') hideRepToast();
  show(id, mode || 'push');
}

function back() {
  var prev = state.stack.pop();
  if (!prev) prev = state.entry;
  show(prev, 'back');
}

function onEnter(id) {
  if (id === 'read') { startAsk(); } else { stopAsk(); }
  if (id === 'paysc') { runPay(); } else { stopPay(); }
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

/* ---------------------------------------------------------------- the report's knock on Today
   Day 1 and Day 3 only, and only once the check-in is answered: that is the
   one moment she has just been handed something, so the ask is a reply rather
   than an interruption. Day 2 is left clear — the same nudge three days running
   stops being a nudge. */
function repToastDays() { return state.day === 1 || state.day === 3; }

function showRepToast() {
  if (state.paid || state.repToastSeen || !repToastDays()) return;
  var el = $('#repToast');
  if (!el) return;
  var r = leadReport();
  $('#repToastLine').textContent = 'Hemali made your ' + r.t + ' Report · ₹49';
  state.repToastSeen = true;
  reveal(el);
}

function hideRepToast() {
  var el = $('#repToast');
  if (!el || el.hidden) return;
  el.classList.remove('on');
  setTimeout(function () { el.hidden = true; }, 260);
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
  // The reward sheet covers the page, so the knock waits for it to clear.
  if (state.repToastPending) {
    state.repToastPending = false;
    setTimeout(showRepToast, 420);
  }
}

/* ---------------------------------------------------------------- content: ladder */
var DAYS = [
  { d: 'Day 1', v: 9 },
  { d: 'Day 2', v: 11 },
  { d: 'Day 3', v: 13 },
  { d: 'Day 4', v: 15 },
  { d: 'Day 5', v: 17 },
  { d: 'Day 6', v: 19 },
  { d: 'Day 7', v: 21 }
];
/* Sizes and lifts match the daily-reward prototype. */
var COIN_SIZE = [26, 28, 30, 30, 33, 38, 46];
var COIN_LIFT = [0, 1, 3, 5, 8, 11, 15];
var CHECK = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none">' +
  '<path d="M3.5 8.4l3 3 6-6.3" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function renderLadder() {
  var cols = DAYS.map(function (day, i) {
    var done = i < state.claimed;
    // Today is today whether or not she has collected it — Figma 2640:12298
    // keeps the brand ring and label on day 1 in the answered state, so the
    // strip says where she is rather than what is next.
    var cls = 'col' + (done ? ' done' : '') + (i === state.day - 1 ? ' today' : '') +
      (i === DAYS.length - 1 ? ' goal' : '');
    return '<div class="' + cls + '">' +
             '<span class="ic"><span class="coin' + (done ? ' got' : '') + '" style="width:' +
               COIN_SIZE[i] + 'px;height:' + COIN_SIZE[i] + 'px;margin-bottom:' + COIN_LIFT[i] + 'px">' +
               '<span class="cn-v"><small>₹</small><b>' + day.v + '</b></span></span></span>' +
             '<span class="tr"><i class="dot">' + (done ? CHECK : '') + '</i></span>' +
             '<span class="lb">Day<b>' + (i + 1) + '</b></span>' +
           '</div>';
  }).join('');

  var html = '<div class="ladder" style="--f:' + (Math.max(state.claimed - 1, 0) / 6) + '">' + cols + '</div>';
  $$('[data-ladder]').forEach(function (el) { el.innerHTML = html; });
  // Day 1 keeps the Daily reward block — the check-in is the day's one job —
  // but not the seven coins. On the morning someone arrives, a full streak laid
  // out ahead of them reads as a chore list rather than a reward. The sheets in
  // the reward flow still show it, because there the strip is the subject.
  // ...until she answers: Figma 2640:12298 puts the strip back in the answered
  // state, where it is a receipt for day 1 rather than a list of six chores.
  $('#todayLadder').hidden = state.day === 1 && !state.answered;
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
             // The board uses a counter, not a dot: a number says how much is
             // waiting, which is the only part a dot cannot say.
             (n.id === 'timeline' && state.histDot ? '<i class="ncount">1</i>' : '') +
             '<span>' + n.label + '</span></button>';
    }).join('');
  });
  // The chapter is reachable from two doors — the History tab and the chat
  // history icon in the header. Both carry the same counter.
  $$('.ic-btn[data-chat]').forEach(function (b) {
    var d = b.querySelector('.ncount');
    if (state.histDot && !d) {
      d = document.createElement('i');
      d.className = 'ncount';
      d.textContent = '1';
      b.appendChild(d);
    } else if (!state.histDot && d) {
      d.remove();
    }
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

/* The sample is only written in two voices, and a nine-row list promised seven
   it could not keep. English and Hinglish are also the two that actually split
   her audience — anything else is a translation request, not a reading choice. */
var READ_LANGS = ['en', 'hinglish'];

function renderLangList() {
  $('#langList').innerHTML = LANGS.filter(function (l) {
    return READ_LANGS.indexOf(l.id) > -1;
  }).map(function (l) {
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

/* One section of the reader: a full-width band of paper laid on the arch, with
   a gap above and below so the painting shows through the seams. */
function rsec(label, body) {
  return '<section class="rs">' +
    (label ? '<h3 class="rs-h">' + label + '</h3>' : '') + body + '</section>';
}

/* The evidence block at the foot of each section. One branch per `k` on the
   board — the kind is what makes a section feel written rather than templated,
   so they are not collapsed into a single list renderer. */
function rsEvidence(s) {
  var i;
  if (s.k === 'bars') {
    return '<div class="rs-card"><p class="rs-cl">' + esc(s.label) + '</p>' +
      s.rows.map(function (r) {
        return '<div class="rs-bar"><span>' + esc(r[0]) + '</span>' +
          '<i><b style="width:' + (r[1] * 10) + '%"></b></i>' +
          '<em>' + r[1] + '</em></div>';
      }).join('') + '</div>';
  }
  if (s.k === 'tiles') {
    return '<div class="rs-tiles">' + s.rows.map(function (r) {
      return '<div><small>' + esc(r[0]) + '</small><b>' + esc(r[1]) + '</b></div>';
    }).join('') + '</div>';
  }
  if (s.k === 'rows') {
    return '<div class="rs-rows">' + s.rows.map(function (r) {
      return '<div><small>' + esc(r[0]) + '</small><b>' + esc(r[1]) + '</b></div>';
    }).join('') + '</div>';
  }
  if (s.k === 'chance') {
    return '<div class="rs-card"><p class="rs-cl">' + esc(s.label) + '</p>' +
      '<div class="rs-chart">' + s.rows.map(function (r) {
        // The two tall bars are the answer; the rest are there to make them
        // look like an answer rather than an assertion.
        var hot = r[1] >= 80;
        return '<div' + (hot ? ' class="hot"' : '') + '>' +
          '<i style="height:' + r[1] + '%"></i><small>' + esc(r[0]) + '</small></div>';
      }).join('') + '</div>' +
      '<div class="rs-win"><small>' + esc(s.winLabel) + '</small><b>' + esc(s.win) + '</b></div>' +
    '</div>';
  }
  if (s.k === 'split') {
    return '<div class="rs-card tight">' +
      '<i class="rs-split"><b style="width:' + s.pct + '%"></b></i>' +
      '<p class="rs-sl"><span>' + esc(s.rows[0][0]) + '</span><em>' + esc(s.rows[0][1]) + '</em></p>' +
    '</div>';
  }
  if (s.k === 'tags') {
    return s.rows.map(function (r) {
      return '<div class="rs-tag"><p><b>' + esc(r[0]) + '</b><i>' + esc(r[1]) + '</i></p>' +
        '<small>' + esc(r[2]) + '</small></div>';
    }).join('');
  }
  if (s.k === 'tips') {
    return '<div class="rs-tips">' + s.rows.map(function (r, n) {
      return '<div><i>' + (n + 1) + '</i><span><b>' + esc(r[0]) + '</b><small>' +
        esc(r[1]) + '</small></span></div>';
    }).join('') + '</div>';
  }
  if (s.k === 'kundali') {
    // North Indian square: the diamond and the two diagonals, with the twelve
    // house labels dropped at the anchor points the board uses.
    var pos = [
      [50, 19], [32, 7], [13, 25], [32, 44], [13, 68], [32, 87],
      [50, 76], [68, 87], [87, 68], [68, 44], [87, 25], [68, 7]
    ];
    var cells = '';
    for (i = 0; i < 12; i++) {
      var occ = s.houses[i + 1];
      cells += '<span class="kh" style="left:' + pos[i][0] + '%;top:' + pos[i][1] + '%">' +
        '<em>' + (i + 1) + '</em>' + (occ ? '<b>' + esc(occ) + '</b>' : '') + '</span>';
    }
    return '<div class="rs-kun">' +
      '<div class="kun">' +
        '<svg viewBox="0 0 240 240" aria-hidden="true">' +
          '<rect x="1" y="1" width="238" height="238" rx="4" fill="none" stroke="#EAECF0" stroke-width="1.5"/>' +
          '<path d="M1 1 239 239M239 1 1 239M120 1 239 120 120 239 1 120Z" fill="none" stroke="#EAECF0" stroke-width="1.5" stroke-linejoin="round"/>' +
        '</svg>' + cells +
      '</div>' +
      '<div class="rs-leg">' + s.legend.map(function (l) {
        return '<div><i></i><span><b>' + esc(l[0]) + '</b><small>' + esc(l[1]) + '</small></span></div>';
      }).join('') + '</div>' +
    '</div>';
  }
  return '';
}

/* Every section ends on the same two hills so the bands read as one landscape;
   the motif on top is what tells them apart. They are drawn in the grey ramp,
   not in pink: the only colour the reader should carry is the painted artwork,
   and a pink motif beside it read as a second, competing brand. */
/* Back in pink. In grey the decorations read as chrome — a footer, a divider,
   something structural — when the whole point of them is that the report is a
   warm, hand-made object. `--dec1`/`--dec2` are the pale and deep tones, so
   there is one place to tune all fourteen. */
var DECOR = {
  hearts: '<path d="M262 36c0-8 6-13 12-13s11 5 11 11-9 14-14 18c-5-4-9-10-9-16Z" fill="var(--dec1)"/><path d="M279 24c0-10 8-16 15-16s14 6 14 14-11 18-17 23c-7-5-12-13-12-21Z" fill="var(--dec2)"/>',
  leaf:   '<path d="M268 48c0-18 14-32 32-32 0 18-14 32-32 32Z" fill="var(--dec2)"/><path d="M300 48V22" stroke="var(--dec1)" stroke-width="2"/>',
  pin:    '<path d="M288 10c9 0 16 7 16 16 0 12-16 26-16 26s-16-14-16-26c0-9 7-16 16-16Z" fill="var(--dec2)"/><circle cx="288" cy="26" r="6" fill="#fff"/>',
  orbit:  '<circle cx="288" cy="32" r="16" fill="var(--dec1)"/><ellipse cx="288" cy="32" rx="30" ry="11" fill="none" stroke="var(--dec2)" stroke-width="2"/>',
  moon:   '<path d="M298 12a22 22 0 1 0 0 42 26 26 0 0 1 0-42Z" fill="var(--dec2)"/>',
  lights: '<path d="M258 16h62" stroke="var(--dec1)" stroke-width="2"/><circle cx="268" cy="26" r="7" fill="var(--dec2)"/><circle cx="288" cy="30" r="7" fill="var(--dec1)"/><circle cx="308" cy="26" r="7" fill="var(--dec2)"/>',
  cups:   '<path d="M270 18h36l-5 22h-26Z" fill="var(--dec2)"/><path d="M282 40h12v12h-12Z" fill="var(--dec1)"/>',
  rings:  '<circle cx="280" cy="32" r="14" fill="none" stroke="var(--dec2)" stroke-width="4"/><circle cx="300" cy="32" r="14" fill="none" stroke="var(--dec1)" stroke-width="4"/>',
  house:  '<path d="M288 12l24 18v24h-48V30Z" fill="var(--dec1)"/><path d="M280 54V40h16v14" fill="var(--dec2)"/>',
  lamp:   '<path d="M266 44c0-8 10-12 22-12s22 4 22 12-10 10-22 10-22-2-22-10Z" fill="var(--dec1)"/><path d="M288 32c0-10 8-14 8-20-10 3-16 10-16 20Z" fill="var(--dec2)"/>',
  plant:  '<path d="M288 54V24" stroke="var(--dec2)" stroke-width="3"/><path d="M288 34c-12 0-18-8-18-16 12 0 18 7 18 16Zm0-4c12 0 18-8 18-16-12 0-18 7-18 16Z" fill="var(--dec1)"/>',
  lotus:  '<path d="M288 14c7 8 7 22 0 32-7-10-7-24 0-32Z" fill="var(--dec2)"/><path d="M288 46c-10 0-20-6-24-14 11-3 20 3 24 14Zm0 0c10 0 20-6 24-14-11-3-20 3-24 14Z" fill="var(--dec1)"/>',
  mala:   '<circle cx="288" cy="32" r="18" fill="none" stroke="var(--dec1)" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/><circle cx="288" cy="52" r="5" fill="var(--dec2)"/>',
  stars:  '<path d="M288 12l5 13 13 5-13 5-5 13-5-13-13-5 13-5Z" fill="var(--dec2)"/><circle cx="262" cy="24" r="3" fill="var(--dec1)"/><circle cx="314" cy="40" r="4" fill="var(--dec1)"/>'
};

function rsDecor(k) {
  return '<div class="rs-dec" aria-hidden="true">' +
    '<svg viewBox="0 0 360 96" preserveAspectRatio="none">' +
      '<path d="M0 56c60-18 120-18 180 0s120 18 180 0v40H0Z" fill="var(--decw1)"/>' +
      '<path d="M0 73c70-14 140-14 210 0s100 10 150 0v23H0Z" fill="var(--decw2)"/>' +
    '</svg>' +
    '<svg class="rs-dec-m" viewBox="0 0 360 96">' + (DECOR[k] || '') + '</svg>' +
  '</div>';
}

/* The report body. `locked` draws the chip the board puts on every section the
   sample does not pay for; the bought copy passes false and the chip goes. */
function renderSecs(locked) {
  return RSECS.map(function (s) {
    return '<section class="rs">' +
      '<h3 class="rs-h">' + esc(s.e) + '</h3>' +
      '<p class="rs-t">' + esc(s.h) + '</p>' +
      (locked && s.lock ? '<p class="rs-lock">' + esc(LOCK_TEXT) + '</p>' : '') +
      (s.p ? '<p class="rs-p">' + esc(s.p) + '</p>' : '') +
      rsEvidence(s) +
      rsDecor(s.dec) +
    '</section>';
  }).join('');
}

/* The arch behind the reader takes the colour of the book being read: the
   gradient stops and the hue the PNG is rotated into both hang off this one
   attribute, on both reader screens at once. */
function paintArch() {
  $$('.rp').forEach(function (s) { s.setAttribute('data-rep', state.pick); });
}

function renderSample() {
  var c = copyFor(state.lang);
  var sec = $('#sample');

  paintArch();
  sec.classList.toggle('dev', c.dev);
  $('#langChipLabel').textContent = 'Read in ' + c.chip;
  $('#sampleWhy').textContent = reportById(state.pick).why;
  $('#sampleBody').innerHTML = renderSecs(true);
}

function renderRead() {
  paintArch();
  /* The same fourteen sections the sample shows, with the lock chips off —
     Figma 3155:12516. The sample is a window onto this page, so a bought report
     that was laid out differently made the preview read as a different product. */
  $('#readBody').innerHTML = renderSecs(false) +
      // The end of the report is a door, not a full stop: the other two
      // reports, then the chat where the questions it raised get spent.
      '<div class="carousel-wrap">' +
        '<p class="lbl">MORE ON YOUR CHART</p>' +
        // Two cards, so they split the row the way the sell page's do rather
        // than sitting at a fixed width with nothing to scroll to.
        '<div class="carousel fill">' +
          REPORTS.filter(function (x) { return x.id !== state.pick; })
            .map(upsellCard).join('') +
        '</div>' +
      '</div>';
  // No "Continue with Astro Hemali" button under it: the ask bar is pinned to
  // the bottom of this same screen with her face, her rate and a composer in
  // it, so a second button for the identical action only competed with the one
  // that is always on screen.
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
  var bk = $('#bookEl'), cap = $('#bookCap'), r = reportById(state.pick);
  // Where the painted cover exists, the thing that swings open is the real
  // cover, onto the painted spread — not a drawing of a book.
  var img = $('#bookCover img'), pg = $('#bookPage');
  bk.classList.toggle('art', !!r.art);
  img.src = r.art ? r.art.closed : 'assets/book.svg';
  pg.style.backgroundImage = r.art ? 'url(' + r.art.open + ')' : '';
  bk.classList.remove('open');
  cap.textContent = 'Your report is ready';
  later(function () {
    bk.classList.add('open');
    cap.textContent = 'Opening your report…';
  }, 450);
  later(enterRead, 1800);
}

/* The opening is a curtain, not a toll booth: the second time she sees it a tap
   takes her straight in. */
function enterRead() {
  if (state.screen !== 'book') return;
  clearTimers();
  state.stack = [state.entry];        // the report is now "read", so back lands on Today
  show('read', 'fade');
}

/* ---------------------------------------------------------------- the reader's composer
   The report answers what she asked and raises what she did not. This bar is
   where those go, so it types the open question for her — a live composer reads
   as the next line of the report, where a banner reads as an ad. */
/* Every question names something the report just told her. A general question
   could have been asked before she paid; one that quotes her own report only
   exists because she read it, which is the whole reason this bar is here. */
var ASKS = {
  partner: [
    'My report says north-west — how far is that?',
    'The image in my report, is that how he looks?',
    'Chapter 3 says Rahu is blocking it. For how long?',
    'My report gives a 2027 window. Can I move it?'
  ],
  marriage: [
    'My report says low Manglik — does that need a remedy?',
    '28 of 36 gunas in my report. Is that enough?',
    'My report puts the window in late 2027. Why then?',
    'The in-laws chapter says six months. Six months of what?'
  ],
  career: [
    'My report says March for the switch. Which week?',
    'It says my work is invisible, not weak. How do I fix that?',
    'My report says job, not business, this year. Why?',
    'Saturn on my tenth lord — is that the slow year it means?'
  ]
};

var askT = null, askN = 0;
function stopAsk() { clearTimeout(askT); askT = null; }

function startAsk() {
  stopAsk();
  var el = $('#askIn');
  if (!el) return;
  var list = ASKS[state.pick] || ASKS.partner;
  var msg = list[askN % list.length], i = 0;
  // A sentence appearing letter by letter is motion; reduced motion gets the
  // whole question at once and no loop.
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    el.placeholder = msg;
    return;
  }
  el.placeholder = '';
  function type() {
    el.placeholder = msg.slice(0, ++i);
    askT = setTimeout(i < msg.length ? type : erase, i < msg.length ? 36 : 1900);
  }
  function erase() {
    el.placeholder = msg.slice(0, --i);
    if (i > 0) { askT = setTimeout(erase, 14); return; }
    askN++;
    askT = setTimeout(startAsk, 260);
  }
  type();
}

/* ---------------------------------------------------------------- payment */
/* Figma 3339:208658. The report is a flat ₹49 off a ₹499 list price and the
   wallet is not in the way any more — the only thing left to decide is the
   language, so the screen shows the book, the arithmetic and one button. */
var payT = [];
var LIST_PRICE = 499, PRICE = 49, GST = 0.18;

/* The wash behind the book, in the book's own colours. Sampled off each painted
   cover, the same three the reader's arch is built from. */
var PAY_GLOW = {
  partner:  ['rgba(255,236,240,.95)', 'rgba(244,201,206,.6)'],
  marriage: ['rgba(255,246,226,.95)', 'rgba(228,206,160,.6)'],
  career:   ['rgba(238,246,255,.95)', 'rgba(188,214,246,.6)']
};

function openPay() {
  closeSheet();
  var r = reportById(state.pick);
  var sc = $('#paysc');

  // The ground is the page she just came from, blurred by CSS. Each report
  // already owns the art the detail page stands on; where it does not, its
  // cover stands in.
  var bg = (r.art && (r.art.hero || r.art.closed)) || '';
  $('#paysBg').style.backgroundImage = bg ? 'url(' + bg + ')' : '';

  var g = PAY_GLOW[r.id] || PAY_GLOW.partner;
  sc.style.setProperty('--pay-g1', g[0]);
  sc.style.setProperty('--pay-g2', g[1]);

  // Open and still: the spread is a finished painting of an open book, so it
  // needs no swing and no frame. Only a report without art falls back to the
  // built one.
  $('#paysBook').innerHTML = r.art
    ? '<img src="' + r.art.open + '" alt="">'
    : book3d(r);

  $('#paysLangName').textContent = langById(state.lang).label;
  $('#payTot').textContent = '\u20b9' + payTotal();
  go('paysc');
}

/* 18% GST on the ₹49 actually charged. The board's button said ₹118, which is
   18% on ₹100 — a number from an older price that no longer exists anywhere on
   this screen. */
function payTotal() { return PRICE + Math.round(PRICE * GST); }

/* The demo drives the last tap itself: a beat to read the screen, a visible
   press, then the spinner. Nobody walking somebody through this should have to
   stop and hunt for the Pay button. */
function runPay() {
  var btn = $('#paySubmit');
  stopPay();
  btn.classList.remove('pressed', 'busy');
  payT.push(later(function () { btn.classList.add('pressed'); }, 1100));
  payT.push(later(function () {
    btn.classList.remove('pressed');
    btn.classList.add('busy');
    payT.push(later(pay, 950));
  }, 1400));
}

function stopPay() {
  payT.forEach(clearTimeout);
  payT = [];
  var btn = $('#paySubmit');
  if (btn) btn.classList.remove('pressed', 'busy');
}

function pay() {
  stopPay();
  closeSheet();
  state.paid = true;
  // The report is flat ₹49 and never comes out of the wallet — the wallet is
  // the daily-reward habit's own currency and spending it here would punish
  // the one loop that actually brings her back.
  paintWallet();
  paintBought();
  // Every sell surface retires into the follow-up: read, chat, remedies, other reports.
  renderDayToday(); renderChat(); renderHistCard(); renderTpTabs(); renderRead();
  toast('Payment successful', 'success');
  later(function () {
    state.stack = [state.entry];
    show('timeline', 'fade');
    resetTimeline();
    later(runMaking, 350);
  }, 900);
}

/* ------------------------------------------------------------- journey */
function dayData() { return PM_JOURNEY[state.day]; }
/* The ask is live for four days and then retires for good, so the ₹49 price
   "ends tonight" on day 4. */
function lastDay() { return 4; }
function pmQuiet() { return !!dayData().quiet; }
/* Which surfaces today is allowed to use — renderers read this rather than
   guessing from the day number. */
function pmSurf() { return dayData().surf || {}; }
/* What she actually owns: whichever of the three she picked. */
function boughtTitle() { return reportById(state.pick).t; }
/* Six surfaces name the report she owns — buy sheet, "ready" push, sample
   cover, timeline card, book cover and the reader's own header. They used to
   be hard-coded to Marriage Yog, so picking Money and paying handed her
   somebody else's report. One writer keeps them honest. */
function paintBought() {
  var r = reportById(state.pick);
  var t = boughtTitle();
  $('#buyTitle').textContent  = 'Your ' + t;
  $('#r2Title').textContent   = r.tl || 'Your ' + t;
  $('#pushReadyTitle').textContent = 'Your ' + t + ' is ready';
  // The timeline card is the one surface with room for the report's full name,
  // and it is the card she taps to read — so it says the whole thing.
  $('#repTitle').textContent  = r.t2 || 'Your ' + t;
  $('#repThumb').innerHTML    = book3d(r);
  $('#bookTitle').textContent = t;
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

/* The one report today suggests. A three-row menu makes her choose before she
   has any reason to care; a single report tied to a house Hemali already named
   is a recommendation, and the other two stay one tap away. */
/* Pinned to Partner Prediction rather than rotating a different report in each
   day: one report, nudged until she takes it. Day 1 shows none of this — the
   free chat is the whole of day 1. */
function leadReport() { return reportById('partner'); }

/* The pointers ARE the sell. A title and a house name tell her nothing; the
   list of questions tells her whether her own question is answered. So the
   same list rides every surface — chat, History, Today — cut to the top few
   with the remainder counted, so the report reads finite and worth ₹49. */
function pointers(r, n) {
  var top = r.learn.slice(0, n), rest = r.learn.length - top.length;
  return '<ul class="pts">' +
    top.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
    (rest > 0 ? '<li class="pts-more">+' + rest + ' more questions answered</li>' : '') +
  '</ul>';
}

/* The countdown and the live-buyer count are gone. A clock under a ₹49 report
   makes the report look like the thing that needs rescuing, and a number that
   climbs while you watch is the one element on the page nobody believes. */

/* 49 against 499, and what the 49 buys you forever. Said once per surface,
   directly under the list of questions it pays for. */
function priceRow() {
  return '<p class="of3-price"><b>₹49</b><s>₹499</s><i>90% OFF</i>' +
    '<em>one-time · yours forever</em></p>';
}

/* 1,28,880 -> "1,28,880". Indian grouping: last three, then pairs. */
function inr(n) {
  var s = String(n), last3 = s.slice(-3), rest = s.slice(0, -3);
  return rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3 : last3;
}

/* A closed book, turned so its spine faces her and carries the title the way a
   real one does. The open book was the wrong object to show: an open book is
   something already being read, and nothing about it says "not yours yet". */
/* Each report gets its own cover instead of all three sharing one book icon —
   on a shelf of three, the colourway is what tells them apart at a glance. */
var MOTIFS = {
  heart: '<path fill="currentColor" d="M20 30c-5.7-4.2-10-7.8-10-12.6 0-3 2.3-5.4 5.1-5.4 2 0 3.7 1.1 4.9 2.8 1.2-1.7 2.9-2.8 4.9-2.8 2.8 0 5.1 2.4 5.1 5.4C30 22.2 25.7 25.8 20 30z"/>',
  knot:  '<g fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="16" cy="21" r="6.4"/><circle cx="24" cy="21" r="6.4"/></g>',
  arrow: '<g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 27l6.5-6.5 4 4L30 15"/><path d="M23.5 15H30v6.5"/></g>'
};

/* The flat cover, for the places that only need the report's face at a glance —
   the chat bubble's thumbnail and the picker's row. */
function coverArt(r, cls) {
  var c = r.cover;
  // All three reports are painted now, so the drawn motif is only a fallback.
  if (r.art) {
    return '<span class="cv cv-art-on' + (cls ? ' ' + cls : '') + '" aria-hidden="true">' +
      '<img src="' + r.art.closed + '" alt="">' +
    '</span>';
  }
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

/* The drawn cover's face, for the reports with no painted artwork yet: the
   wash is the element's own background, the motif and its stars ride on top.
   Shared by the standing book and the History card's hinged one. */
function drawnFace(r, cls) {
  var c = r.cover;
  return '<span class="' + cls + '"' +
    ' style="--cva:' + c.a + ';--cvb:' + c.b + ';--cvi:' + c.ink + '">' +
    '<svg class="bk3-art" viewBox="0 0 40 52">' +
      '<circle class="cv-star" cx="9" cy="10" r="1"/>' +
      '<circle class="cv-star" cx="32" cy="14" r="1.5"/>' +
      '<circle class="cv-star" cx="29" cy="43" r="1"/>' +
      '<g transform="translate(0,5)">' + MOTIFS[c.motif] + '</g>' +
    '</svg>' +
  '</span>';
}

function book3d(r) {
  // Where the painted cover and its spread exist, show those instead: the art
  // is the argument, and a drawing of a book cannot make it.
  if (r.art) {
    return '<span class="bkt' + (r.art.solid ? ' has3d' : '') + '" aria-hidden="true">' +
      // The rendered book, painted over the built one. CSS decides which of the
      // two is showing, because that depends on whether this copy has to move.
      (r.art.solid ? '<span class="bkt-3d" style="background-image:url(' + r.art.solid + ')"></span>' : '') +
      '<span class="bkt-in">' +
        // The right-hand page of the spread, sitting under the cover.
        '<span class="bkt-leaf" style="background-image:url(' + r.art.open + ')"></span>' +
        // The cover and the first leaf turn together: painted board on the
        // front, the spread's left-hand page on the back, so when it swings
        // the full 180 the book is lying open flat rather than ajar.
        '<span class="bkt-cov">' +
          '<span class="bkt-face" style="background-image:url(' + r.art.closed + ')"></span>' +
          '<span class="bkt-back" style="background-image:url(' + r.art.open + ')"></span>' +
        '</span>' +
      '</span>' +
    '</span>';
  }
  return '<span class="bk3" aria-hidden="true">' +
    '<span class="bk3-in">' +
      '<span class="bk3-spine"><em>' + esc(r.t) + '</em></span>' +
      // The leaf sits a hair behind the cover so that when the cover swings
      // open on the tease loop there is paper underneath, not a hole.
      '<span class="bk3-leaf"></span>' +
      drawnFace(r, 'bk3-face') +
    '</span>' +
  '</span>';
}

/* Figma 3169:202620 — the upsell card, one component used both at the foot of
   the report page and at the end of the reader. Cover, title, the one-line
   promise, price with the saving as its own chip, then Buy now on the bottom
   edge. Both call sites render the identical card; only the list differs. */
function upsellCard(x) {
  return '<button class="pcard" type="button" data-pick="' + x.id + '">' +
    book3d(x) +
    '<b>' + esc(x.t) + '</b><small>' + esc(x.s) + '</small>' +
    '<span class="pc-pr">' +
      '<i><em>\u20b949</em><s>\u20b9499</s></i>' +
      '<span class="pc-off">90% OFF</span>' +
    '</span>' +
    '<span class="pc-btn">Buy now</span>' +
  '</button>';
}

/* The report's own artwork as the backdrop, the closed book standing in it, the
   title and the numbers beside it — composed as a card, not as a miniature of
   the report page. */
function sellCard(r) {
  return '<button class="sell-hit" type="button" data-pick="' + r.id + '">' +
    '<span class="sell-hero">' +
      book3d(r) +
      '<span class="sell-hd">' +
        '<b class="sell-t">' + esc(r.t) + '</b>' +
        '<span class="sell-stats">' +
          '<em><b>' + r.rating + '</b><i>★</i> · ' + r.pages + ' pages</em>' +
          '<em><b>' + inr(r.sold) + '</b> readers</em>' +
        '</span>' +
      '</span>' +
    '</span>' +
    '<span class="sell-body">' +
      '<span class="sell-why">' + esc(r.why) + '</span>' +
    '</span>' +
  '</button>';
}

/* The PM brief's offer as it lands in the chat, built to the board at
   3088:160535: a 288-wide bubble, the painted banner carrying the title and
   the rating, the book standing proud of the top-right corner, then the
   pointers and one price row. */
function offer3Card() {
  // Once she owns one, the offer leaves the thread entirely — segueCard() is
  // the follow-up, and two follow-ups in a row is one too many.
  if (state.paid) return '';
  var r = leadReport();
  // The whole card is the link to the detail page; only Buy Now jumps the
  // queue straight to payment.
  return '<div class="of3" role="button" tabindex="0" data-pick="' + r.id + '">' +
    '<div class="of3-head">' +
      '<div class="of3-ttl">' + esc(r.t2 || r.t) + '</div>' +
      // The green dot is switched off in the frame, and rightly so: it says
      // "live" next to a rating, which is the one thing a rating is not.
      '<div class="of3-badge">' +
        '<b>' + r.rating + '</b><i class="of3-star">\u2605</i>' +
        '<i class="of3-sep"></i>' +
        '<b>' + inr(r.sold) + ' readers</b>' +
      '</div>' +
    '</div>' +
    // Stands proud of the top-right corner and hinges on its spine, so the
    // card has one thing moving and it is the thing being sold.
    '<span class="of3-bkw" aria-hidden="true">' +
      '<span class="of3-leaf"' +
        (r.art ? ' style="background-image:url(' + r.art.open + ')"' : '') + '></span>' +
      '<span class="of3-cov">' +
        '<img class="of3-bk" src="' + (r.art ? r.art.closed : '') + '" alt="">' +
        '<span class="of3-back"' +
          (r.art ? ' style="background-image:url(' + r.art.open + ')"' : '') + '></span>' +
      '</span>' +
    '</span>' +
    '<div class="of3-pts">' + pointers(r, 3) + '</div>' +
    '<div class="of3-foot">' +
      '<div class="of3-price"><span><b>₹49</b><s>₹499</s></span><i>90% OFF</i></div>' +
      '<button class="of3-go" type="button" data-buy="' + r.id + '">Buy Now</button>' +
    '</div>' +
  '</div>';
}

/* The same offer where History shows it, per 3077:159093 — not the chat card
   shrunk down, but a message from Hemali: her face, her rate, and the pitch
   in a peach bubble with the book leaning out of it. */
function histCard(r) {
  // The rate pills are off in 3111:201206 — this card sells the report, and a
  // per-minute price next to her name sells the chat instead.
  return '<div class="hw" role="button" tabindex="0" data-pick="' + r.id + '">' +
    '<div class="hw-top">' +
      '<span class="hw-av"><img src="assets/hemali.png" alt=""><i></i></span>' +
      '<span class="hw-who">' +
        '<span class="hw-line"><b>Astro Hemali</b></span>' +
        '<small>Made from your birth chart</small>' +
      '</span>' +
    '</div>' +
    '<div class="hw-bub">' +
      '<div class="hw-row">' +
        '<span class="hw-tx">' +
          '<b>Mansi, ' + esc(r.t2 || r.t) + '</b>' +
          '<small>' + r.learn.length + ' questions answered</small>' +
        '</span>' +
        // Shut, with its page block showing on the right — the same object the
        // chat offer sells, at rest.
        '<span class="hw-bkw" aria-hidden="true">' +
          '<span class="hw-leaf"' +
            (r.art ? ' style="background-image:url(' + r.art.open + ')"' : '') + '></span>' +
          '<span class="hw-cov">' +
            (r.art
              ? '<img class="hw-bk" src="' + r.art.closed + '" alt="">'
              // No painted cover yet: the drawn one stands in, so the hinge
              // never swings an empty frame over the leaf.
              : drawnFace(r, 'hw-bk bk3-face')) +
            '<span class="hw-back"' +
              (r.art ? ' style="background-image:url(' + r.art.open + ')"' : '') + '></span>' +
          '</span>' +
        '</span>' +
      '</div>' +
      '<button class="hw-go" type="button" data-pick="' + r.id + '">Learn More</button>' +
    '</div>' +
  '</div>';
}

/* Figma 3203:205266 — on Today the report rides the expert card as a ticket
   stub: a dashed perforation, a notch bitten out of each edge of the white
   card, then one row. The History widget used to be dropped in here whole,
   which put Hemali's face and name on the card twice and ran it to 383px. */
function exTicket(r) {
  return '<button class="ex-tkt" type="button" data-pick="' + r.id + '">' +
    '<i class="tk-n tk-l" aria-hidden="true"></i>' +
    '<i class="tk-n tk-r" aria-hidden="true"></i>' +
    (r.art
      ? '<img class="tk-bk" src="' + r.art.closed + '" alt="">'
      : drawnFace(r, 'tk-bk bk3-face')) +
    '<span class="tk-t">' +
      '<b>Your ' + esc(r.id) + ' report is ready</b>' +
      '<small>Made by Hemali from your chart</small>' +
    '</span>' +
    '<i class="tk-go" aria-hidden="true">' +
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.9 7h8.2m-3.3-3.3L11.1 7l-3.3 3.3" stroke="#F28761" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</i>' +
  '</button>';
}

function renderChat() {
  $('#chatThread').innerHTML = dayData().msgs.map(function (m) {
    if (m.who === 'sys')    return '<p class="c-sys">' + esc(m.text) + '</p>';
    if (m.who === 'ended')  return '<p class="c-end">' + esc(m.text) + '</p>';
    if (m.who === 'gap')    return '<p class="c-gap"><span>' + esc(m.text) + '</span></p>';
    if (m.who === 'offer3') return offer3Card();
    if (m.who === 'remind') return remindCard();
    return '<div class="c-b ' + m.who + '"><p>' + esc(m.text) + '</p><time>02:24 PM</time></div>';
  }).join('') + (state.paid ? segueCard() : '');
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
  return '<div class="c-b hemali"><p>Mansi, your <b>' + esc(r.t) +
      '</b> report is open. If any part needs explaining, or you want the remedies, ask me right here.</p>' +
      '<time>02:41 PM</time></div>' +
    '<div class="sg" id="sgChips">' +
      '<p class="sg-h">Ask beyond the report</p>' +
      r.ask.map(function (x, i) {
        return '<button class="sg-q" type="button" data-ask="' + i + '">' + esc(x.q) + '</button>';
      }).join('') +
    '</div>';
}

/* History is the brief's third surface — the same three reports, and once
   bought the purchased report stays here for good (tlReport). */
function renderHistCard() {
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
  // The board at 3077:159093 shows this as a message from Hemali, not a second
  // storefront: her face, her rate, and the pitch in a peach bubble.
  $('#tlChapCard').innerHTML = histCard(leadReport());
}

/* Tomorrow's reason to return: the free chat and the next coin. */
function remindCard() {
  if (state.reminded) {
    return '<div class="rm-card done"><p>🔔 Done. We will tell you the moment tomorrow\'s free chat is ready.</p></div>';
  }
  return '<div class="rm-card">' +
    '<p>Tomorrow you get <b>2 minutes free chat</b> again, and ₹11 on the check-in. Shall we remind you?</p>' +
    '<button class="btn sm primary" type="button" data-remind>🔔 Yes, remind me</button>' +
  '</div>';
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
  // Two lines by hand, as in Figma: the break keeps "wallet" clear of the
  // coin stack parked in the title row's top-right corner.
  $('#checkinTitle').innerHTML =
    'Day ' + day + ' · Answer to get<br><span class="amt">₹' + r + '</span> in your wallet';
  $('#answeredTitle').innerHTML =
    'Day ' + day + ' · <span class="amt">₹' + r + '</span> added to your wallet';
  // The ladder has to agree with the card: today is not collected until she answers.
  state.claimed = state.answered ? day : day - 1;
  renderLadder();

  // Today carries the offer in the expert card on every nudging day (the brief
  // puts it there alongside Chat and History), with the guidance tile from
  // day 2. Day 5 is the stop — every surface goes quiet.
  var sf = pmSurf();
  if (!state.paid) {
    $('#expertSlot').hidden = !sf.today;
    // The guidance tile is the one permanent surface: it is a tile among tiles,
    // not a nudge, so it stays put all five days while the louder cards come
    // and go.
    $('#guideSlot').hidden = false;
    renderGuideTile();
    // Hiding the slot is not enough — yesterday's countdown would survive in
    // the DOM and reappear the moment anything unhid it.
    if (!sf.today) { $('#expertSlot').innerHTML = ''; return; }
    $('#expertSlot').innerHTML = exTicket(leadReport());
    return;
  }

  // Bought: the expert card goes back to being only the expert. The report she
  // owns already has a row of its own in Personalised Guidance, with the same
  // title, the same Ready pill and the same destination — two of them on one
  // screen was the same tap offered twice.
  $('#expertSlot').hidden = true;
  $('#expertSlot').innerHTML = '';
  $('#guideSlot').hidden  = false;
  renderGuideTile();
}

/* The report as one tile among her guidance — same object as the tarot and
   prediction tiles. */
function renderGuideTile() {
  // Personalised Guidance is always two tasks. From day 2 the first of them is
  // the report; on day 1, which carries no report anywhere, kundli matching
  // stands in so the section is never a single lonely tile.
  var report = state.paid || state.day > 1;
  $('#guideAlt').hidden = report;
  $('#guideSlot').hidden = !report;
  if (!state.paid) {
    // Clearing as well as hiding: switching back from a later day would
    // otherwise leave that day's tile sitting in the DOM.
    if (state.day === 1) { $('#guideSlot').hidden = true; $('#guideSlot').innerHTML = ''; return; }
    // From day 2 the tile sells the one report, Partner Prediction — not a
    // "2 more reports" bundle. No price chip: the tarot and prediction tiles
    // carry a title, a line and a chevron, and this is the same object.
    var lead = leadReport();
    $('#guideSlot').innerHTML =
      '<button class="tile" type="button" data-pick="' + lead.id + '">' +
        book3d(lead) +
        '<span class="tt"><b>' + esc(lead.t) + '</b><small>' + esc(lead.s) + '</small></span>' +
        '<svg class="arr" width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3.5 8h8.5M8.5 4.2 12.3 8l-3.8 3.8" stroke="#475467" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>';
    return;
  }
  $('#guideSlot').innerHTML =
    '<button class="tile" type="button" data-go="read">' +
      book3d(reportById(state.pick)) +
      '<span class="tt"><b>' + esc(boughtTitle()) + '</b>' +
        '<small>Full report open \u2713 \u2014 ask Hemali for the remedies</small></span>' +
      '<i class="tag green">Ready</i>' +
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
        '<span class="pk-meta"><i class="pk-n">' + r.learn.length + ' questions answered</i>' +
          r.pages + ' pages</span>' +
      '</span>' +
      '<em class="pk-chev" aria-hidden="true">›</em>' +
    '</button>';
  }).join('');
}

/* The sell page. The hero GIF and the cover swinging open off its spine are
   this page's entire first impression. Nothing is locked: the pointers say what
   the report answers, and then the ENTIRE report follows, rendered on a demo
   chart. She learns the depth from the sample and that it is about her from the
   pointers. */
function renderReport() {
  var r = reportById(state.pick);
  // The pick has just changed, so every surface that names the report she is
  // buying — this title included — has to be rewritten with it.
  paintBought();
  // The hero is the closed cover of the report she is looking at — the same
  // object the chat bubble and the upsells show, just larger.
  $('#r2Book').innerHTML = book3d(r);
  // Partner's hero moves; the other two are painted stills out of the same
  // board. `has-bg` is what stops the couple's clip and its rose wash from
  // showing through a ground that is neither pink nor about a couple.
  var hero = $('#r2Hero');
  hero.classList.toggle('has-bg', !!(r.art && r.art.hero));
  hero.style.backgroundImage = r.art && r.art.hero ? 'url(' + r.art.hero + ')' : '';
  // Was hard-coded, so picking Money or Marriage still showed the Partner
  // report's reader count. One number, read off the report being shown.
  $('#r2Reads').textContent = inr(r.sold);
  $('#r2Lead').textContent = r.s + '. Astro Hemali makes it from your birth chart.';
  $('#r2Chips').innerHTML = r.chips.concat([r.pages + ' pages', 'Shareable', 'Private'])
    .map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('');
  $('#r2Learn').innerHTML =
    '<h2 class="r2-h">What you will get</h2>' +
    '<ul class="r2-learn">' +
      r.learn.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
    '</ul>';
  $('#r2Revs').innerHTML = r.revs.map(function (v) {
    return '<div class="review">' +
      '<i class="rv-stars">' + '\u2605'.repeat(v.s) + '\u2606'.repeat(5 - v.s) + '</i>' +
      '<p>\u201c' + esc(v.q) + '\u201d</p>' +
      '<b>' + esc(v.n) + '</b></div>';
  }).join('');
  // The strip starts parked on the first card, so that one is already snapped.
  markSnappedReview($('#r2Revs'));
  $('#r2AlsoList').innerHTML = REPORTS.filter(function (x) { return x.id !== r.id; })
    .map(upsellCard).join('');
  $('#r2Why').textContent = r.why;
  // The board says "Buy Now" and nothing else. The price is already sitting
  // beside the button, so repeating ₹49 inside it only crowds the line.
  $('#r2Cta').textContent = 'Buy Now';
}

/* Per the board's J1: answering opens the reward sheet — coin, ladder with
   today claimed, tomorrow's amount as the comeback reason. Day 3 swaps the
   comeback line for the deadline. */
function openRewardSheet() {
  $('#rewardTitle').textContent = '₹' + REWARD[state.day] + ' added to your wallet!';
  if (state.day < lastDay()) {
    $('#rewardSub').textContent = 'Your wallet is now ₹' + state.wallet +
      '. Come back tomorrow for ₹' + REWARD[state.day + 1] + ' more.';
    $('#rewardCta').textContent = 'Remind me for tomorrow';
  } else {
    $('#rewardSub').textContent = 'One more thing. The ₹49 price on the report ends tonight. Back to ₹499 tomorrow.';
    $('#rewardCta').textContent = 'Unlock full report · ₹49';
  }
  openSheet('reward');
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

/* Demo chrome: the selected day's touchpoints, as chips docked right under its
   card in the switcher — tap one to jump the phone to that surface. */
function renderTpTabs() {
  var old = $('.switcher .tp-wrap');
  if (old) old.parentNode.removeChild(old);
  $$('.switcher .has-tp').forEach(function (b) { b.classList.remove('has-tp'); });
  var host = $('.switcher [data-day].on');
  if (!host) return;

  var tabs;
  if (state.paid) {
    // Post-purchase: every sell surface has retired into the follow-up.
    tabs = [
      { id: 'today',   l: 'Today \u00b7 read your report' },
      { id: 'chat',    l: 'Chat \u00b7 continue chat' },
      { id: 'read',    l: 'Full report' },
      { id: 'upsell',  l: 'Report end \u00b7 upsell' },
      { id: 'history', l: 'History \u00b7 report ready' }
    ];
  } else {
    // The tabs ARE the schedule: only the surfaces today actually uses, named
    // so a PM can see at a glance what day 1 does and day 2 does not.
    var sf = pmSurf();
    tabs = [];
    if (dayData().push) tabs.push({ id: 'push', l: 'Notification \u00b7 +15 min' });
    if (sf.chat)  tabs.push({ id: 'chat',    l: state.day === 1 ? 'Chat \u00b7 offer at +15 min' : 'Chat \u00b7 offer' });
    if (sf.today) tabs.push({ id: 'today',   l: 'Today \u00b7 expert card' });
    if (sf.guide) tabs.push({ id: 'guide',   l: 'Today \u00b7 personalised' });
    // History, the picker and the report page are deliberately not listed:
    // they are destinations, and jumping straight to one skips the only thing
    // the demo is meant to show — how she gets there.
    if (!tabs.length) tabs.push(
      { id: 'today',   l: 'Today \u00b7 nothing asks' },
      { id: 'chat',    l: 'Chat \u00b7 nothing asks' });
    // No "Daily reward · answered" chip: the check-in card is right there on
    // Today and answering it by hand is the honest way to see that state.
    if (repToastDays()) tabs.push({ id: 'toast', l: 'Toast \u00b7 Hemali\u2019s knock' });
    if (state.day === 1) tabs.push({ id: 'counter', l: 'Counter \u00b7 header + History' });
  }

  var wrap = document.createElement('div');
  wrap.className = 'tp-wrap';
  wrap.innerHTML =
    '<p class="tp-note">Touchpoints: ' +
      (state.paid ? 'report bought · every surface is the follow-up'
        : pmQuiet() ? 'nudging has stopped, the report only sits in her guidance'
        : 'one report a day · ₹49, sample on a demo chart') + '</p>' +
    '<div class="tp-tabs">' + tabs.map(function (t) {
      return '<button type="button" data-tp="' + t.id + '">' + t.l + '</button>';
    }).join('') + '</div>';
  host.classList.add('has-tp');
  host.insertAdjacentElement('afterend', wrap);
}

/* Answering flips the card to the replied state — the moment Hemali gets a
   bubble and the report moves into it — and pays the day's reward. Idempotent,
   because the demo chips can call it on a day she has already answered. */
function answerCheckin() {
  if (state.answered) return;
  state.answered = true;
  state.wallet += REWARD[state.day];
  paintWallet();
  renderDayToday();
  renderChat();
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
  state.answered = false;
  state.wallet = WALLET_AT[state.day];
  state.lang = 'en';
  state.langFrom = 'sample';
  state.paid = false;
  state.reminded = false;
  state.repToastSeen = false;
  state.repToastPending = false;
  hideRepToast();
  state.pick = 'partner';
  // The counter is day 1 only — that is the morning the chapter lands in
  // History. After that the badge has nothing new to count.
  state.histDot = state.day === 1;
  state.stack = [];
  renderNav();
  $('#notifDlg').hidden = true;
  paintWallet();
  paintBought();
  renderSample();
  renderRead();
  renderChat();
  renderPicker();
  renderReport();
  renderDayToday();
  renderTpTabs();
  renderHistCard();
  armIntroSheet();
  resetTimeline();
  applyPaidTimeline();
  $('#bookEl').classList.remove('open');
  show(state.entry, 'fade');
  // The notification no longer fires on load. It is a touchpoint, not a page
  // state, so it belongs to its own chip — otherwise it lands on top of
  // whatever surface the chips were actually opened to look at.
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
  var t = e.target.closest('[data-go],[data-back],[data-sheet],[data-toast],[data-close-sheet],[data-day],[data-lang],[data-nav],[data-mood],[data-remind],#answerNow,#restart,#showSample,#r2ViewSample,#repToastSee,#repToastX,#payBtn,#r2Cta,#paySubmit,#paysLang,#buyInLang,[data-chat],#push,#pushNote,#scrim,#rewardCta,#notifYes,#notifNo,[data-tp],[data-pick],[data-buy],[data-ask]');
  if (!t) return;

  // Buy Now skips the detail page. It sits inside a [data-pick] card, and
  // closest() stops at whichever matches first — the button — so this has to
  // be tested before the pick branch below.
  if (t.hasAttribute('data-buy')) {
    state.pick = t.getAttribute('data-buy');
    renderReport();
    openPay();
    return;
  }

  // PM track: picking one of the three reports opens it on the report page.
  if (t.hasAttribute('data-pick')) {
    state.pick = t.getAttribute('data-pick');
    renderReport();
    // The rail at the foot of this page picks too, so it can already be the
    // current screen. `go` would push it onto its own back stack, so only the
    // scroll comes back to the hero — otherwise she lands mid-way down a
    // report she has not seen the cover of.
    $('#report [data-scroll]').scrollTop = 0;
    if (state.screen !== 'report') go('report');
    return;
  }

  if (t.id === 'push')    { openBook(); return; }

  // The push is the door back in: it lands in the chat, where the chapter is.
  if (t.id === 'pushNote') {
    hidePush();
    // The notification names one report, so it has to land on that report's
    // page. Dropping her on the picker would ask her to make the same choice
    // twice.
    if (!state.paid && dayData().lead) {
      state.pick = dayData().lead;
      renderReport();
      $('#report [data-scroll]').scrollTop = 0;
      if (state.screen !== 'report') go('report');
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
    toast('Reminder set for tomorrow\u2019s free chat', 'success');
    return;
  }
  if (t.id === 'scrim')   { closeSheet(); return; }
  if (t.id === 'restart') { restart(); return; }

  if (t.hasAttribute('data-day'))  { setDay(+t.getAttribute('data-day')); return; }

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

  if (t.hasAttribute('data-mood')) {
    answerCheckin();
    // Queued, not shown: the reward sheet is about to cover the page.
    if (repToastDays() && !state.repToastSeen && !state.paid) state.repToastPending = true;
    openRewardSheet();
    return;
  }

  // The knock is from Hemali, so it opens Hemali — the chat, where the chapter
  // and the offer already sit. Sending her straight to the report page would
  // skip the person doing the asking.
  if (t.id === 'repToastSee') {
    hideRepToast();
    if (state.histDot) { state.histDot = false; renderNav(); }
    renderChat();
    if (state.screen !== 'chat') go('chat');
    var rtc = $('#chat [data-scroll]');
    if (rtc) requestAnimationFrame(function () { rtc.scrollTop = rtc.scrollHeight; });
    return;
  }
  if (t.id === 'repToastX') { hideRepToast(); return; }

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
    toast('Reminder on, tomorrow ₹' + REWARD[Math.min(state.day + 1, 3)] + ' + free chat ready', 'success');
    return;
  }
  if (t.id === 'notifNo') { $('#notifDlg').hidden = true; closeSheet(); return; }

  if (t.hasAttribute('data-lang')) {
    state.lang = t.getAttribute('data-lang');
    renderLangList();
    return;
  }

  // The sample is a whole report, so it gets its own screen rather than being
  // inlined under About, where it buried every section after it.
  if (t.id === 'r2ViewSample') {
    renderSample();
    if (state.screen !== 'sample') go('sample');
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
  // Changing the language on the payment screen stops the auto-press — she has
  // taken the wheel, and the demo pressing Pay under her would be a theft.
  if (t.id === 'paysLang') { stopPay(); state.langFrom = 'buy'; openSheet('lang'); return; }

  // Both routes to the money land on the same payment screen.
  if (t.id === 'payBtn' || t.id === 'r2Cta') { openPay(); return; }
  if (t.id === 'paySubmit') { stopPay(); pay(); return; }
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
      renderReport();
      $('#report [data-scroll]').scrollTop = 0;
      if (state.screen !== 'report') go('report');
    } else if (tp === 'guide') {
      state.stack = [];
      show(state.entry, 'fade');
      var gs = $('#guideSlot');
      if (gs) later(function () { gs.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 380);
    } else if (tp === 'picker') {
      if (state.screen !== 'picker') go('picker');
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
    } else if (tp === 'reward' || tp === 'toast') {
      // Answer on her behalf — the reward sheet is skipped, because the chip is
      // asking for the state the sheet leaves behind, not the sheet itself.
      answerCheckin();
      state.stack = [];
      show(state.entry, 'fade');
      var cc = $('#answeredCard');
      if (cc) later(function () { cc.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 380);
      if (tp === 'toast') {
        state.repToastSeen = false;
        later(showRepToast, 700);
      }
    } else if (tp === 'counter') {
      // The counter is already live on day 1; the chip just puts both doors
      // that carry it back on screen and blinks them.
      state.histDot = true;
      renderNav();
      state.stack = [];
      hideRepToast();
      show(state.entry, 'fade');
      // show() only resets the scroll when the screen actually changes, and the
      // header counter has to be in frame for the blink to mean anything.
      var tsc2 = $('#today-a [data-scroll]');
      if (tsc2) tsc2.scrollTop = 0;
      later(function () {
        $$('.ncount').forEach(function (n) {
          n.classList.remove('lit'); void n.offsetHeight; n.classList.add('lit');
        });
      }, 360);
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
    // The chapter has been seen either way, so the dot clears from both doors.
    if (state.histDot) { state.histDot = false; renderNav(); }
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

/* Figma 3169:202696 — the review the strip has snapped to sits at full size and
   its neighbours sit back. The quote is the evidence, so the one she is reading
   is the one that gets the weight. "Snapped" is the card whose left edge is
   nearest the strip's own left edge, which is where scroll-snap parks it. */
function markSnappedReview(strip) {
  var cards = $$('.review', strip);
  if (!cards.length) return;
  var edge = strip.getBoundingClientRect().left + 16, best = 0, bestD = Infinity;
  cards.forEach(function (c, i) {
    var d = Math.abs(c.getBoundingClientRect().left - edge);
    if (d < bestD) { bestD = d; best = i; }
  });
  cards.forEach(function (c, i) { c.classList.toggle('is-snap', i === best); });
}
$$('.revs').forEach(function (strip) {
  strip.addEventListener('scroll', function () { markSnappedReview(strip); },
    { passive: true });
});

/* The bought reader wears the sample's header. Cloning it beats a second copy
   of the same forty lines of SVG, which is how the two drifted apart before. */
$$('[data-head-clone]').forEach(function (slot) {
  slot.innerHTML = $('#sampleHead .rp-head-r').innerHTML;
});

$('#bookStage').addEventListener('click', enterRead);

/* The two report readers do the same thing: the header starts transparent on
   the painted arch and only takes a white surface once prose is under it. */
$$('.rp').forEach(function (s) {
  var head = $('.rp-head', s), sc = $('[data-scroll]', s);
  if (!head || !sc) return;
  sc.addEventListener('scroll', function () {
    head.classList.toggle('solid', sc.scrollTop > 24);
  }, { passive: true });
});

/* The report page's nav does the same, but it only goes white once the hero's
   artwork has actually left — turning it white over the couple looked broken. */
(function () {
  var nav = $('#r2Nav'), sc = $('#report [data-scroll]');
  sc.addEventListener('scroll', function () {
    nav.classList.toggle('solid', sc.scrollTop > 150);
  }, { passive: true });
})();

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

// Deep link, so a day can be shared: #day1 .. #day5.
var hash = (location.hash || '').replace('#', '');
var linked = /^day([1-5])$/.exec(hash);
state.screen = 'today-a';
if (linked) {
  state.day = +linked[1];
  $$('.switcher [data-day]').forEach(function (b) {
    b.classList.toggle('on', +b.getAttribute('data-day') === state.day);
  });
}
state.pick = 'partner';
// Same rule as setDay(): the counter belongs to day 1 only. Deep links skip
// setDay entirely, so without this the badge boots on for every day.
state.histDot = state.day === 1;
renderNav();
state.wallet = WALLET_AT[state.day];
paintWallet();
paintBought();
renderRead();
renderChat();
renderPicker();
renderReport();
renderDayToday();
renderTpTabs();
renderHistCard();
armIntroSheet();
applyPaidTimeline();
})();
