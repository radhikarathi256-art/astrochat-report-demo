/* AstroChat · "Sell report from Today" demo.
   One router over absolutely-positioned .screen elements, plus the few bits of
   content that are easier to generate than to hand-write nine times over
   (coin ladder, bottom nav, language list, sample body, full report body). */
(function () {
'use strict';

var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

var LANGS = window.LANGS, SAMPLE = window.SAMPLE;

var state = {
  entry: 'today-a',
  wallet: 20,
  lang: 'en',
  langFrom: 'sample',   // which surface opened the language sheet
  paid: false,
  screen: 'today-a',
  stack: [],
  sheet: null,
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
var TODAY_IX = 1;                  // Day 2 is "today" in the demo
var COIN_SIZE = [22, 26, 29, 32, 35, 38, 44];

function renderLadder() {
  // Rail fill reaches the centre of today's column. Columns are 1/7 wide and the
  // rail is inset 8% each side, so convert the column centre into rail space.
  var centre = (TODAY_IX + 0.5) / DAYS.length;
  var fill = Math.max(0, (centre - 0.08) / 0.84) * 100;

  var cols = DAYS.map(function (day, i) {
    var cls = i < TODAY_IX ? 'col done' : i === TODAY_IX ? 'col today' : 'col';
    if (i === DAYS.length - 1) cls += ' goal';
    var s = COIN_SIZE[i];
    return '<div class="' + cls + '">' +
             '<span class="ic"><span class="coin' + (i < TODAY_IX ? ' got' : '') + '"' +
               ' style="width:' + s + 'px;height:' + s + 'px"></span></span>' +
             '<span class="dot"></span>' +
             '<b>₹' + day.v + '</b>' +
             '<small>' + day.d + '</small>' +
           '</div>';
  }).join('');

  var html = '<div class="ladder"><div class="rail"><i style="width:' + fill.toFixed(1) + '%"></i></div>' +
             cols + '</div>';
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
    oneTime: base.oneTime,
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
  $('[data-i18n="oneTime"]', sec).textContent = c.oneTime;
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
var ALSO = [
  { t: 'Kundli Milan report', s: 'Match with Rahul, point by point', p: '₹49' },
  { t: 'Partner sketch', s: 'See who you will marry', p: '₹49' },
  { t: 'Career report', s: 'Your next 2 years at work', p: '₹49' },
  { t: 'Love report', s: 'What your heart needs', p: '₹49' }
];

function renderRead() {
  $('#readBody').innerHTML =
    '<div class="r-cover">' +
      '<p class="eyebrow">MADE BY ASTRO HEMALI</p>' +
      '<h2>Marriage Yog report</h2>' +
      '<p class="rfor">For Mansi · from your chat</p>' +
      '<p class="rmeta">Lagna · Navamsa · Manglik · 14 Oct 2026</p>' +
    '</div>' +

    accent('THE BIG PICTURE', 'Your marriage house is strong and Venus sits well. The clearest window opens in March 2027. The wait so far has a reason, and it ends soon.') +

    '<div class="r-scores">' +
      '<div><b>72</b><small>MARRIAGE SCORE</small></div>' +
      '<div><b>64</b><small>JOINT FINANCE</small></div>' +
      '<div><b>60</b><small>IN-LAW WARMTH</small></div>' +
      '<div><b class="green">NO</b><small>MANGLIK</small></div>' +
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
    '</div>' +

    '<div class="upsell">' +
      '<b>Have a question about this part?</b>' +
      '<p>Ask Astro Hemali. She made this report for you.</p>' +
      '<button class="btn primary" type="button" id="chatHemali">Chat with Hemali</button>' +
    '</div>' +

    '<div class="r-sec">' +
      '<div class="top-bar"></div>' +
      '<div class="shead"><h3>Is Rahul right for you</h3><p>From what you shared with Hemali</p></div>' +
      accent('WHAT THIS MEANS FOR YOU', 'Your charts match on 24 of 36 points. Trust and family values are strong. The one thing to work on is how you both handle anger.') +
      '<div class="bars"><p class="blbl">MATCH TILT</p>' +
        MATCH.map(function (m) {
          return '<div class="bar-row"><span>' + m.l + '</span>' +
                 '<span class="track"><i data-w="' + (m.v * 10) + '"></i></span>' +
                 '<em>' + m.v + '</em></div>';
        }).join('') +
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

    accent('→ PRACTICAL TIP', 'Bring up Rahul with your family after Diwali. Thursdays and Fridays are good days for big talks in your chart.') +

    '<div class="carousel-wrap">' +
      '<p class="lbl">PEOPLE ALSO BOUGHT</p>' +
      '<div class="carousel">' +
        ALSO.map(function (a) {
          return '<button class="pcard" type="button" data-toast="' + a.t + ' is not part of this demo">' +
                 '<b>' + a.t + '</b><small>' + a.s + '</small><i>' + a.p + '</i></button>';
        }).join('') +
      '</div>' +
    '</div>';
}

function animateBars() {
  // Reset to 0 first so the fill animates every time the screen is opened.
  var bars = $$('#readBody .track i');
  bars.forEach(function (i) { i.style.width = '0'; });
  later(function () {
    bars.forEach(function (i) { i.style.width = i.getAttribute('data-w') + '%'; });
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

/* ---------------------------------------------------------------- reset */
function restart() {
  clearTimers();
  closeSheet();
  state.wallet = 20;
  state.lang = 'en';
  state.langFrom = 'sample';
  state.paid = false;
  state.stack = [];
  paintWallet();
  renderSample();
  resetTimeline();
  $('#bookEl').classList.remove('open');
  show(state.entry, 'fade');
}

/* ---------------------------------------------------------------- wiring */
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-go],[data-back],[data-sheet],[data-toast],[data-close-sheet],[data-entry],[data-lang],[data-nav],#restart,#showSample,#payBtn,#buyInLang,#chatHemali,#push,#scrim');
  if (!t) return;

  if (t.id === 'push')    { openBook(); return; }
  if (t.id === 'scrim')   { closeSheet(); return; }
  if (t.id === 'restart') { restart(); return; }

  if (t.hasAttribute('data-entry')) {
    $$('.switcher [data-entry]').forEach(function (b) { b.classList.remove('on'); });
    t.classList.add('on');
    state.entry = 'today-' + t.getAttribute('data-entry');
    restart();
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

/* ---------------------------------------------------------------- boot */
renderLadder();
renderNav();
renderSample();
renderRead();
paintWallet();
resetTimeline();

// Deep link, so a flow can be shared: #b or #c picks the entry point.
var hash = (location.hash || '').replace('#', '');
if (hash === 'b' || hash === 'c') {
  state.entry = 'today-' + hash;
  $$('.switcher [data-entry]').forEach(function (b) {
    b.classList.toggle('on', b.getAttribute('data-entry') === hash);
  });
}
state.screen = 'today-a';
if (state.entry !== 'today-a') {
  $('#today-a').classList.remove('on');
  $(('#' + state.entry)).classList.add('on');
  state.screen = state.entry;
}
})();
