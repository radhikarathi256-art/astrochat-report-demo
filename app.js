/* AstroChat Reports demo — Day 1 to Day 3, four reports.
   Every screen, copy line and asset comes from Figma "Hackfest 2026",
   page "📚 Reports · day-wise flow". */
(function () {
'use strict';
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var A = function (f) { return 'a/' + f; };
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

/* ======================= data ======================= */
var R = {
  m: {
    name: 'Marriage Prediction Report', reader: 'marriage', img: 'marriage', rule: '#912018',
    tileBg: 'linear-gradient(270deg,#fceef1 0%,#fdf4f5 45%,#fff9fa 78%,#fffcfc 100%)',
    hook: 'See what dosha is delaying your marriage',
    push: ['Mansi, Rahu is blocking you from meeting the one 🪐', 'Learn how Rahu in your 7th house delays the right rishta, and the month it lets go. Today ₹49 (₹499).'],
    readyPush: 'See the year you marry and what’s been holding it back. Tap to read.',
    chat: 'Mansi, I have kept looking at your chart since we spoke. Rahu on the seventh house is not a small thing, and there is more in it than two minutes allowed, so I have written your Marriage Prediction Report around it.\n\nLearn what your partner will be like, when you meet them, the years that are good for it, and what the Rahu block really takes to clear.\n\nBuy the report and get all of it read out house by house, remedies included. A complete sample on another chart is open to read first, so you can see how deep it goes.',
    cw: { g: ['#fceef1', '#fdf4f5', '#fff9fa', '#fffcfc'], f: '255,252,252', sh: 'rgba(122,46,14,.22)', tc: '#912018', rating: '4.7', readers: '13,000 readers',
      ben: ['When you’ll\nget married', 'Partner\'s\ntraits', 'Manglik\ncheck', '4 more\nanswers'], price: true },
    stats: ['4.7', '13,000', 'One-time', 'Payment'],
    blurb: 'When marriage could happen, what your partner may be like, and what your Kundli says about the life you’ll build',
    chips: ['When you’ll marry', 'Manglik check'],
    learnT: 'Find Answers To', learnS: '',
    learn: ['When will I get married?', 'What will my partner be like?', 'Love or arranged, what does my chart say?', 'Am I Manglik?', 'Will my in-laws be supportive?', 'How may money change after marriage?', 'What will married life look like over the years?'],
    revSum: ['4.7', '· 13,000 readers'],
    revs: [['PS', 'Priya S.', 'Jaipur', 'It said love marriage, and both families agreeing by year end. We told them in October, fully expecting drama. They said yes!', 'Love marriage matched'],
           ['NK', 'Neha K.', 'Indore', 'It said my strongest window runs till July 2027, and to look beyond attraction. That’s what finally got us talking about marriage at home.', 'Marriage window clear'],
           ['RM', 'Ritu M.', 'Nashik', 'The part about why I keep picking the wrong people was hard to read, because it’s true. I’ve stopped rushing things now.', 'Pattern named'],
           ['SV', 'Sneha V.', 'Kolkata', 'It said my partner would value family and steady work. That’s what I look for now, instead of chemistry alone. My mom agreed with every line.', 'Partner traits matched']],
    ups: ['k', 'w', 'r'], up: ['4.7', '13,000 reads', '13k'], payMeta: 'One-time payment', why: 'See what dosha is delaying your marriage',
    hist: 'Discover the Love Meant for You'
  },
  k: {
    name: 'Kundli Milan Report', reader: 'kundli', img: 'kundli', rule: '#7a2e0e',
    tileBg: 'linear-gradient(270deg,#fbf0e4 0%,#fcf5ec 45%,#fefaf5 78%,#fffdfa 100%)',
    hook: 'Calculate compatibility score',
    push: ['Mansi, how well do you and Rahul match? 💞', 'Hemali read both charts. See your guna score, the dosha that matters, and what you can do. Today ₹49 (₹499).'],
    readyPush: 'See your guna score, the dosha that matters and what you can do. Tap to read.',
    chat: 'Mansi, you mentioned Rahul today, so I put both charts in front of me after we finished.\n\nHow well the two of you match and what is holding it back, what the Mangal dosha does to this match, how the two families sit together, and what you can do about it.\n\nGive me his birth details and I will read them together. There is a complete sample on another chart if you want to see how deep it goes first.',
    cw: { g: ['#fbf0e4', '#fcf5ec', '#fefaf5', '#fffdfa'], f: '255,253,250', sh: 'rgba(122,46,14,.22)', tc: '#7a2e0e', rating: '4.8', readers: '96,440 readers',
      ben: ['Guna score\nout of 36', 'Real match\nor on paper', 'Dosha and\nremedies', '3 more\nanswers'], price: false },
    stats: ['4.8', '96,440', 'Unlimited', 'Type'],
    blurb: 'Both charts are in. See what your 28 really means.',
    chips: ['36 guna match', 'Dosha check'],
    learnT: 'What Your 28 Does Not Tell You', learnS: '',
    learn: ['Why are 8 of our points missing, and is it serious?', 'Can our Nadi dosha be cancelled?', 'Is my partner Manglik, and does it cancel with mine?', 'Will we clash over money and family plans?', 'How will we get along with each other’s families?', 'What can we do to make our match stronger?'],
    revSum: ['4.8', '· 96,440 readers'],
    revs: [['AD', 'Anjali D.', 'Surat', 'We got 27 of 36, same as our family pandit. But it also explained why Bhakoot was low, which he never bothered to tell us.', 'Guna score matched'],
           ['KR', 'Kavya R.', 'Chennai', 'Two pandits told me I’m Manglik and I cried for weeks. This showed it’s cancelled in my chart, and why. We’re married now.', 'Manglik doubt cleared'],
           ['PN', 'Pooja N.', 'Bhopal', 'It said the first six months with my in-laws would be tough. It was, almost week by week. Knowing that helped me not take it personally.', 'In-laws matched'],
           ['IG', 'Isha G.', 'Lucknow', 'It showed our Nadi dosha and a simple remedy. My parents only agreed after reading that page. Worth way more than ₹49.', 'Nadi remedy helped']],
    ups: ['m', 'r'], up: ['4.8', '96,440 reads', '96k'], payMeta: 'One-time payment · per couple', why: 'See which dosha matters, and what you can do',
    hist: 'See how well you and Rahul match'
  },
  w: {
    name: 'Monthly Wealth Report', reader: 'career', img: 'wealth', rule: '#344054',
    tileBg: 'linear-gradient(270deg,#edf1fa 0%,#f4f6fc 42%,#fafafc 74%,#fffdf8 100%)',
    hook: 'Know when to chase money and when to hold it',
    push: ['Mansi, your next 30 days have a money rhythm 💰', 'Know the dates to chase a payment and the days to hold back. Today ₹49 (₹499).'],
    readyPush: 'Your ten money dates for 20 Nov – 19 Dec are in. Tap to read.',
    chat: 'Mansi, I kept reading your chart after we spoke. Your next 30 days have a clear money rhythm: days that favour money coming in, and days to hold back.\n\nLearn the dates to chase a pending payment, the day to sleep on a big purchase, when to put money aside, and how to handle family money without friction.\n\nBuy the report and get your ten money dates in one place. A complete sample on another chart is open to read first, so you can see how deep it goes.',
    cw: { g: ['#edf1fa', '#f4f6fc', '#fafafc', '#fffdf8'], f: '255,253,248', sh: '#d8dfef', tc: '#344054', bc: '#475467', rating: '4.6', readers: '71,250 readers',
      ben: ['Next 30 days', 'Best dates\nfor money', 'Big\npurchases', '3 more\nanswers'], price: true },
    stats: ['4.6', '71,250', '30 days', 'From today'],
    blurb: 'When to chase a pending payment, put money aside and think twice before saying yes.',
    chips: ['20 Nov – 19 Dec', 'Money dates'],
    learnT: 'Find Answers To', learnS: 'For 20 Nov – 19 Dec 2026',
    learn: ['Is more money coming in or going out this month?', 'When should I follow up on a pending payment?', 'Is this a good time for a big purchase?', 'Will an unexpected expense come up?', 'How much can I save, and when should I invest?', 'Should I lend money or help family this month?'],
    revSum: ['4.6', '· 71,250 readers'],
    revs: [['SB', 'Shruti B.', 'Pune', 'It said to send my payment reminder on the 26th. I did it that morning, and the money I’d been chasing for weeks came in two days later.', 'Payment date matched'],
           ['MT', 'Meera T.', 'Gurgaon', 'I was about to buy a new phone on EMI. It said give an optional purchase a night. I waited, and honestly I didn’t need it.', 'Big purchase paused'],
           ['DS', 'Divya S.', 'Kochi', 'Money kept slipping away every month and I couldn’t see where. It gave me a date to set some aside, and I’ve kept it up since.', 'Saving habit started'],
           ['TA', 'Tanvi A.', 'Jaipur', 'My cousin asked for a loan the same week it said to check family money plans first. We talked it through at home before I said yes.', 'Family money sorted']],
    ups: ['m', 'k', 'r'], up: ['4.6', '71,250 reads', '71k'], payMeta: 'Covers the next 30 days', why: 'Know when to chase money and when to hold it',
    monthly: true, hist: 'Know your money dates this month'
  },
  r: {
    name: 'Monthly Relationship Report', reader: 'relationships', img: 'rel', rule: '#344054',
    tileBg: 'linear-gradient(270deg,#f5eefc 0%,#f9f4fd 45%,#fcf9ff 78%,#fffcfc 100%)',
    hook: 'Know the best days for the two of you this month',
    push: ['Mansi, good evenings ahead for you and Rahul 💜', 'Know the best days for the two of you this month. Today ₹49 (₹499).'],
    readyPush: 'Your relationship calendar for 20 Nov – 19 Dec is in. Tap to read.',
    chat: 'Mansi, I kept reading your chart after we spoke. The next 30 days have some good evenings for you and Rahul, and a few days to take more care.\n\nLearn which evening suits a date, when a heart-to-heart will land well, how to handle family plans together, and the dates worth keeping.\n\nBuy the report and get your relationship calendar for the month. A complete sample on another chart is open to read first, so you can see how deep it goes.',
    cw: { g: ['#f4edfa', '#f8f4fc', '#fbfafc', '#fcf8ff'], f: '252,248,255', sh: '#d8dfef', tc: '#344054', bc: '#475467', rating: '4.7', readers: '48,120 readers',
      ben: ['Covers next 30 days', 'Good days\nto talk', 'Days to\ntake care', '3 more\nanswers'], price: true },
    stats: ['4.7', '48,120', '30 days', 'From today'],
    blurb: 'A date night, a conversation worth having, and the days to take more care.',
    chips: ['20 Nov – 19 Dec', 'Date nights'],
    learnT: 'Find Answers To', learnS: 'For 20 Nov – 19 Dec 2026',
    learn: ['Which evening is best for a date this month?', 'When is the right time for a heart-to-heart?', 'Why do small plans turn into arguments?', 'How do we handle in-laws’ expectations together?', 'When should I reconnect with my parents or siblings?', 'What should we plan for our special days?'],
    revSum: ['4.7', '· 48,120 readers'],
    revs: [['AP', 'Ankita P.', 'Pune', 'It picked the 5th for a date. We went back to the café from our first date and talked for three hours, no phones.', 'Date night matched'],
           ['SR', 'Swati R.', 'Delhi', 'It said to check with each other before saying yes to family plans. I asked first for once, and the whole weekend went without an argument.', 'Family plans sorted'],
           ['RS', 'Reema S.', 'Bhopal', 'It said the 10th was the day for the talk we kept putting off. We had it after dinner, and it was the calmest conversation we’ve had in months.', 'Heart-to-heart timed'],
           ['NJ', 'Nidhi J.', 'Vadodara', 'We called my parents on the weekend it suggested instead of a rushed call. Ma noticed, and things have felt easier at home since.', 'Good days matched']],
    ups: ['m', 'k'], up: ['4.7', '48,120 reads', '48k'], payMeta: 'Covers the next 30 days', why: 'Know the best days for the two of you this month',
    monthly: true, hist: 'Plan the best days for you two'
  }
};
var IMG = { m: 'marriage', k: 'kundli', w: 'wealth', r: 'rel' };
var VID = { m: 1, k: 0.4, w: 1, r: 1 };  /* hero films and their playback speed, as in the original demo */
var REWARD = [9, 11, 13, 15, 17, 19, 21];
var COIN = [26, 28, 30, 30, 33, 38, 46];
var WALLET0 = { 1: 20, 2: 29, 3: 40 };
var KOOTA = [['Work', 'Varna', 1, 1], ['Influence', 'Vashya', 2, 2], ['Destiny', 'Tara', 3, 3], ['Intimacy', 'Yoni', 4, 4],
  ['Compatibility', 'Graha Maitri', 5, 5], ['Temperament', 'Gana', 6, 6], ['Love', 'Bhakoot', 7, 7], ['Health', 'Nadi', 0, 8]];
var LOADER = ['Varna', 'Vashya', 'Tara', 'Yoni', 'Graha Maitri', 'Gana', 'Bhakoot', 'Nadi', 'Manglik Dosha', 'Dasha periods', '7th House', 'Navamsa'];
var CITIES = ['Pune, Maharashtra', 'Mumbai, Maharashtra', 'Nagpur, Maharashtra', 'Delhi', 'Jaipur, Rajasthan', 'Jodhpur, Rajasthan', 'Lucknow, Uttar Pradesh',
  'Kanpur, Uttar Pradesh', 'Indore, Madhya Pradesh', 'Bhopal, Madhya Pradesh', 'Ahmedabad, Gujarat', 'Surat, Gujarat', 'Bengaluru, Karnataka', 'Chennai, Tamil Nadu',
  'Hyderabad, Telangana', 'Kolkata, West Bengal', 'Patna, Bihar', 'Chandigarh', 'Gurgaon, Haryana', 'Noida, Uttar Pradesh', 'Raipur, Chhattisgarh', 'Rajkot, Gujarat'];

/* ======================= state ======================= */
var S;
function freshState(day, rep) {
  return {
    day: day || 1, rep: rep || 'm', wallet: WALLET0[day || 1], answered: false, answer: null,
    earnShown: false, replied: false, own: {}, lang: 'English',
    me: { name: 'Mansi Sharma', dob: '1996-10-30', time: '04:20', place: 'Pune, Maharashtra', gender: 'Female' },
    him: { name: 'Rahul', dob: '', time: '', place: '', unknown: false }, himDone: false, compatLang: 'en', boughtAt: {}
  };
}
function cur() { return R[S.rep]; }

/* ======================= timers ======================= */
var timers = [];
function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
function clearTimers() { timers.forEach(clearTimeout); timers = []; }

/* ======================= shell ======================= */
var phone = $('#phone'), screensEl = $('#screens'), overlay = $('#overlay');
var stack = [];
var BUILD = {};

function mount(name, opts) {
  var el = document.createElement('section');
  el.className = 'screen ' + name;
  el.dataset.name = name;
  var item = { name: name, el: el, opts: opts || {} };
  el._item = item;
  render(item);
  screensEl.appendChild(el);
  return item;
}
function render(item) {
  var sc = $('.scroll', item.el), top = sc ? sc.scrollTop : 0;
  var r = BUILD[item.name](item.opts, item);
  item.el.className = 'screen ' + item.name + (r.cls ? ' ' + r.cls : '');
  item.el.innerHTML = r.html;
  if (r.after) r.after(item.el, item);
  sc = $('.scroll', item.el);
  if (sc && top) sc.scrollTop = top;
}
function refresh() { stack.forEach(function (it) { if (it.name !== 'reader') render(it); }); tint(); }
function go(name, opts) {
  var prev = stack[stack.length - 1];
  var item = mount(name, opts);
  stack.push(item);
  item.el.classList.add(opts && opts.fade ? 'fade' : 'in');
  if (prev) { prev.el.classList.remove('in', 'back-in', 'fade'); prev.el.classList.add('under'); later2(function () { if (stack.indexOf(prev) > -1 && prev !== stack[stack.length - 1]) prev.el.style.visibility = 'hidden'; }, 300); }
  closeSheet(true); hideToast(true);
  tint();
  return item;
}
function later2(fn, ms) { setTimeout(fn, ms); }
function back() {
  if (sheetOpen) { closeSheet(); return; }
  if (stack.length < 2) return;
  var top = stack.pop(), prev = stack[stack.length - 1];
  prev.el.style.visibility = '';
  if (prev.name !== 'reader') render(prev);
  prev.el.classList.remove('under'); prev.el.classList.add('back-in');
  top.el.classList.remove('in', 'fade'); top.el.classList.add('out');
  setTimeout(function () { top.el.remove(); }, 270);
  tint();
}
function reset(name, opts) {
  stack.forEach(function (it) { it.el.remove(); });
  stack = [];
  var item = mount(name, opts);
  stack.push(item);
  item.el.classList.add('fade');
  tint();
  return item;
}
function topName() { var t = stack[stack.length - 1]; return t && t.name; }
function replaceTop(name, opts) {
  var top = stack.pop();
  var item = mount(name, opts);
  stack.push(item);
  item.el.classList.add('fade');
  setTimeout(function () { top.el.remove(); }, 250);
  tint();
}

/* theme colour of the browser strip follows the top of the screen */
var themeMeta = $('#themeColor');
function tint() {
  var n = topName(), c = '#FFFFFF';
  var it = stack[stack.length - 1];
  if (n === 'today') { var sc = it && $('.scroll', it.el); c = sc && sc.scrollTop > 40 ? '#FFFFFF' : '#FAD2C4'; }
  if (n === 'detail') { var s2 = it && $('.scroll', it.el); c = s2 && s2.scrollTop > 200 ? '#FFFFFF' : ({ m: '#E9C2CC', k: '#D8B48C', w: '#C9D4EE', r: '#D9CCE6' })[it.opts.rep || S.rep]; }
  if (n === 'ready') c = '#FEF3F2';
  themeMeta.setAttribute('content', c);
}

/* ======================= overlays: sheet, push, toast ======================= */
var sheetOpen = null;
function openSheet(html, opts) {
  opts = opts || {};
  closeSheet(true);
  var scrim = document.createElement('div'); scrim.className = 'scrim';
  var sh = document.createElement('div'); sh.className = 'sheet ' + (opts.cls || '');
  sh.innerHTML = (opts.above || '') + '<div class="sh-in">' + html + '</div>' + (opts.below || '');
  overlay.appendChild(scrim); overlay.appendChild(sh);
  var cx = null;
  if (opts.close) { cx = document.createElement('button'); cx.type = 'button'; cx.className = 'sh-close'; cx.setAttribute('aria-label', 'Close'); cx.innerHTML = '<img src="' + A('sheet_close.png') + '" alt="">'; cx.addEventListener('click', function () { closeSheet(); }); overlay.appendChild(cx); }
  scrim.addEventListener('click', function () { if (!opts.modal) closeSheet(); });
  void sh.offsetHeight;
  scrim.classList.add('on'); sh.classList.add('on'); if (cx) cx.classList.add('on');
  sheetOpen = { scrim: scrim, sh: sh, cx: cx, opts: opts };
  if (opts.after) opts.after(sh);
  return sh;
}
function closeSheet(instant) {
  if (!sheetOpen) return;
  var o = sheetOpen; sheetOpen = null;
  if (instant) { o.scrim.remove(); o.sh.remove(); if (o.cx) o.cx.remove(); return; }
  o.scrim.classList.remove('on'); o.sh.classList.remove('on'); if (o.cx) o.cx.classList.remove('on');
  setTimeout(function () { o.scrim.remove(); o.sh.remove(); if (o.cx) o.cx.remove(); if (o.opts.onClose) o.opts.onClose(); }, 300);
}
var pushEl = null, pushT;
function showPush(title, msg, onTap) {
  hidePush(true);
  var b = document.createElement('button'); b.type = 'button'; b.className = 'push';
  b.innerHTML = '<span class="ph"><img src="' + A('push_icon.png') + '" alt="">AstroChat · now</span><b>' + esc(title) + '</b><p>' + esc(msg) + '</p>';
  overlay.appendChild(b); void b.offsetHeight; b.classList.add('on');
  b.addEventListener('click', function () { hidePush(); onTap && onTap(); });
  var y0 = null;
  b.addEventListener('touchstart', function (e) { y0 = e.touches[0].clientY; }, { passive: true });
  b.addEventListener('touchmove', function (e) { if (y0 !== null && e.touches[0].clientY - y0 < -24) { y0 = null; hidePush(); } }, { passive: true });
  pushEl = b; clearTimeout(pushT); pushT = setTimeout(hidePush, 9000);
}
function hidePush(instant) {
  if (!pushEl) return; var b = pushEl; pushEl = null;
  if (instant) { b.remove(); return; }
  b.classList.remove('on'); setTimeout(function () { b.remove(); }, 450);
}
var toastEl = null, toastT;
function showToast(opts) {
  hideToast(true);
  var d = document.createElement('div');
  if (typeof opts === 'string') { d.className = 'toast plain'; d.textContent = opts; }
  else {
    d.className = 'toast';
    d.innerHTML = '<div class="tb"><img src="' + A('toast_av.png') + '" alt=""><div><b>' + esc(opts.title) + '</b><span>' + esc(opts.msg) + '</span></div></div>' +
      '<button type="button" class="see">' + esc(opts.cta || 'See') + '</button><button type="button" class="x" aria-label="Close">✕</button>';
    $('.see', d).addEventListener('click', function () { hideToast(); opts.onTap && opts.onTap(); });
    $('.x', d).addEventListener('click', function () { hideToast(); });
  }
  var inTabs = topName() === 'today' || topName() === 'history';
  if (!inTabs) d.style.bottom = '24px';
  overlay.appendChild(d); void d.offsetHeight; d.classList.add('on');
  toastEl = d; clearTimeout(toastT); toastT = setTimeout(hideToast, typeof opts === 'string' ? 2400 : 5000);
}
function hideToast(instant) {
  if (!toastEl) return; var d = toastEl; toastEl = null;
  if (instant) { d.remove(); return; }
  d.classList.remove('on'); setTimeout(function () { d.remove(); }, 300);
}

/* ======================= shared bits ======================= */
function btn(cls, label, act, extra) { return '<button type="button" class="btn ' + cls + '"' + (act ? ' data-act="' + act + '"' : '') + (extra || '') + '>' + label + '</button>'; }
function wchip(gift) {
  return '<button type="button" class="wchip" data-act="wallet"><span class="bal"><img src="' + A('ic_wallet.png') + '" alt=""><span>₹' + S.wallet + '</span></span>' +
    (gift ? '<span class="gift"><img src="' + A('dp_gift.png') + '" alt=""></span>' : '<span class="gift">🎁</span>') + '</button>';
}
/* The closed report book, built like Figma's "Report=…" book component: a page block with
   leaves along the fore-edge and the painted cover on top. With tease on, the cover lifts
   off its spine, holds the glance and shuts (the tease from the original demo). */
function book(k, w, tease, delay) {
  return '<span class="rbk' + (tease ? ' tz' : '') + '" style="--w:' + w + 'px' + (delay ? ';--d:' + delay + 's' : '') + '"><span class="pgs"></span><span class="cvr" style="background-image:url(' + A('cov_' + k + '.webp') + ')"></span></span>';
}
function bookImg(k) { return book(k, 58, false); }
function bnav(on) {
  var t = [['today', 'nav_today', 'Today'], ['experts', 'nav_experts', 'Experts'], ['history', 'nav_history', 'History'], ['explore', 'nav_explore', 'Explore']];
  return '<nav class="bnav">' + t.map(function (x) {
    return '<button type="button" class="' + (x[0] === on ? 'on' : '') + '" data-act="tab" data-tab="' + x[0] + '"><img src="' + A(x[1] + '.png') + '" alt="" style="' + (x[0] === on || x[0] !== 'today' ? '' : 'filter:grayscale(1) brightness(1.25)') + '">' + x[2] + '</button>';
  }).join('') + '</nav>';
}
function ownState(k) { return S.own[k] || null; }

/* ======================= Today ======================= */
function stripHTML(day, answered) {
  var h = '<div class="strip">';
  for (var i = 1; i <= 7; i++) {
    var past = i < day || (i === day && answered), now = i === day && !answered;
    var sz = COIN[i - 1];
    var left = i === 1 ? 'none' : (i <= day ? 'done' : ''), right = i === 7 ? 'none' : (i < day || (i === day && answered) ? 'done' : '');
    var dot = past ? '<span class="chk"><svg viewBox="0 0 8 8"><path d="M1.5 4.2 3.3 6 6.6 2.4" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
      : now ? '<img src="' + A('dot_today.png') + '" alt="" style="width:14px;height:24px;margin:0 -2px">'
      : '<img src="' + A(i === 7 ? 'dot_7.png' : 'dot_next.png') + '" alt="" style="width:10px;height:24px;margin:0 -2px">';
    h += '<div class="sd' + (i === 7 ? ' d7' : '') + (now ? ' cur' : '') + '"><span class="coin' + (now ? ' today' : '') + (past ? ' got' : '') + '" style="width:' + sz + 'px;height:' + sz + 'px;margin-top:-' + [0, 1, 3, 5, 8, 11, 15][i - 1] + 'px">₹' + REWARD[i - 1] + '</span>' +
      '<div class="mk"><i class="' + left + '"></i>' + dot + '<i class="' + right + '"></i></div><div class="lb">Day<b>' + i + '</b></div></div>';
  }
  return h + '</div>';
}
function ptrHTML(day) {
  var h = '<div class="ptr">';
  for (var i = 1; i <= 7; i++) h += '<div class="' + (i === 7 ? 'd7' : '') + '">' + (i === day ? '<img src="' + A('tail.png') + '" alt="">' : '') + '</div>';
  return h + '</div>';
}
function rewardCard() {
  var d = S.day, amt = REWARD[d - 1];
  if (S.answered) {
    return '<div class="rw-card"><div class="rw-done"><span class="ok">✓</span><div><b>₹' + amt + ' added to your wallet</b><p>You answered “' + esc(S.answer) + '”. Hemali will use it in today’s guidance.</p></div></div>' +
      btn('sec md', 'Continue Chat', 'chat') + '</div>';
  }
  return '<div class="rw-card" id="rwCard"><h3>Day ' + d + ' · Answer to get <em>₹' + amt + '</em> in your wallet</h3><p class="q">Aaj is relationship ko lekar aap kaisa feel kar rahe hain?</p>' +
    '<div class="ans">' + ['Achha', 'Okay', 'Pareshan'].map(function (a) { return '<button type="button" data-act="answer" data-a="' + a + '">' + a + '</button>'; }).join('') + '</div></div>';
}
function tileHTML(k) {
  var r = R[k], st = ownState(k);
  if (st === 'ready') {
    return '<button type="button" class="gt owned" data-act="openRep" data-rep="' + k + '"><span class="book">' + book(k, 38) + '</span>' +
      '<span class="txt"><b>' + r.name + '</b><span>By Astro Hemali</span></span><span class="tag">Ready</span><img class="oarr" src="' + A('tile_arrow_o.png') + '" alt=""><span class="bd"></span></button>';
  }
  var hook = st === 'writing'
    ? '<img class="pdot" src="' + A('tile_dot.png') + '" alt=""><span>Writing your report · report ready in 5 mins</span><img class="arr" src="' + A('tile_arrow_p.png') + '" alt="">'
    : '<img src="' + A('star_' + IMG[k] + '.png') + '" alt=""><span>' + r.hook + '</span><img class="arr" src="' + A('arrow_' + IMG[k] + '.png') + '" alt="">';
  return '<button type="button" class="gt" data-act="openRep" data-rep="' + k + '" style="background:' + r.tileBg + ';--rule:' + r.rule + '">' +
    '<span class="motif"><img src="' + A('motif_' + IMG[k] + '.webp') + '" alt=""></span><span class="hook">' + hook + '</span><span class="bd"></span>' +
    '<span class="txt"><b>' + r.name + '</b><span>By Astro Hemali</span></span><span class="book">' + book(k, 56.33, true, 1.1) + '</span></button>';
}
BUILD.today = function () {
  var d = S.day, unlocked = d > 1;
  var ins = [['ic_love', 'What makes you, You', 'Venus in your 7th house favours honest talks about commitment. Go slow and speak kindly.'],
    ['ic_rahul', 'What Matters', 'You asked about marriage timing. Next, ask about his family’s plans this week.'],
    ['ic_decisions', 'Where You are Today', 'The worry from last week is easing. Expect a calm, positive talk by Thursday.']];
  var html =
    '<header class="t-head" id="tHead"><div class="t-nav">' +
      '<button type="button" class="t-ham" data-act="menu" aria-label="Menu"><img src="' + A('ic_hamburger.png') + '" alt=""></button>' +
      '<div class="t-greet"><small>Namaste</small><b>Mansi</b></div>' +
      '<div class="t-act">' + wchip() +
        '<button type="button" class="ic22" data-act="mine" aria-label="My Reports"><img src="' + A('ic_myreports.png') + '" alt=""></button>' +
        '<button type="button" class="ic22" data-act="chat" aria-label="Chat"><img src="' + A(S.replied ? 'ic_chat_on.png' : 'ic_chat.png') + '" alt=""></button>' +
      '</div></div></header>' +
    '<div class="scroll" id="tScroll">' +
      '<div class="t-hero"><h1>Namaste Mansi</h1><p class="date">' + ['Mon, 5 Oct', 'Tue, 6 Oct', 'Wed, 7 Oct'][d - 1] + ' · Margashirsha Krishna Chaturdashi</p>' +
        '<div class="hrow ins-row" id="insRow">' + ins.map(function (c) { return '<div class="ins"><div class="ins-h"><img src="' + A(c[0] + '.png') + '" alt="">' + c[1] + '</div><p>' + c[2] + '</p></div>'; }).join('') + '</div>' +
        '<div class="dots" id="insDots"><i class="on"></i><i></i><i></i></div>' +
        '<div class="aip"><img src="' + A('ic_ai.png') + '" alt="">AI powered</div></div>' +
      '<div class="t-body">' +
        '<section><div class="sec-h">Your experts<button type="button" data-act="soon">Consult Others →</button></div>' +
          '<div class="hrow exp-row">' +
            '<div class="exp-hero"><div class="exp-ribbon">' + (unlocked ? '<img class="gift" src="' + A('gift20.png') + '" alt="">FREE chat unlocked' : '<img src="' + A('ic_bolt.png') + '" alt="">Next free chat tomorrow') + '</div>' +
              '<div class="exp-card"><span class="av68"><img src="' + A('av_hemali68.png') + '" alt=""></span><div class="exp-info"><div><div class="exp-name">Astro Hemali</div><div class="rate"><s>₹20/min</s><b>' + (unlocked ? 'FREE' : '₹10/min') + '</b></div></div>' +
              btn('pri sm', 'Continue Chat', 'chat') + '</div></div></div>' +
            '<div class="exp-sm"><div class="top"><img src="' + A('av_mala50.png') + '" alt=""><div><div class="exp-name">Astro Mala</div><div class="rate"><s>₹20/min</s><b>₹10/min</b></div></div></div>' + btn('pri sm', 'Continue Chat', 'soon') + '</div>' +
          '</div><div class="exp-dots"><img src="' + A('ic_dots3.png') + '" alt=""></div></section>' +
        '<section id="secReward"><div class="sec-h">Daily reward</div>' + stripHTML(d, S.answered) + ptrHTML(d) + rewardCard() + '</section>' +
        '<section id="secGuide"><div class="sec-h">Personalised guidance</div><div class="tiles">' + tileHTML(S.rep) +
          '<button type="button" class="task" data-act="soon"><img src="' + A('tarot56.png') + '" alt=""><div><b>Ask the Tarot Cards</b><span>3 cards on you and Rahul</span></div><img class="arr" src="' + A('arrow_task.png') + '" alt=""></button>' +
        '</div></section>' +
      '</div>' +
    '</div>' + bnav('today');
  return { html: html, after: function (el) {
    var sc = $('#tScroll', el), head = $('#tHead', el);
    function onS() { head.classList.toggle('solid', sc.scrollTop > 40); tint(); }
    sc.addEventListener('scroll', onS, { passive: true }); onS();
    var row = $('#insRow', el), dots = $$('#insDots i', el);
    row.addEventListener('scroll', function () { var i = Math.round(row.scrollLeft / 278); dots.forEach(function (d, j) { d.classList.toggle('on', j === i); }); }, { passive: true });
  } };
};
function scrollTodayTo(id, offset) {
  var it = stack[0]; if (!it || it.name !== 'today') return;
  var sc = $('#tScroll', it.el), t = $('#' + id, it.el);
  if (sc && t) sc.scrollTo({ top: t.offsetTop - (offset || 100), behavior: 'smooth' });
}

/* ======================= Chat ======================= */
BUILD.chat = function () {
  var k = S.rep, r = R[k], pitch = S.day !== 2 || ownState(k);
  var h = '<div class="c-head"><div class="c-nav"><button type="button" class="bk" data-act="back" aria-label="Back"><img src="' + A('chat_back.png') + '" alt=""></button>' +
    '<img class="av" src="' + A('chat_av36.png') + '" alt=""><div><b>Astro Hemali</b><span class="on"><i></i>Available</span></div></div></div>' +
    '<div class="scroll" id="cScroll"><div class="thread">' +
      '<div class="notice">Astrologer has joined to guide you</div>' +
      '<div class="bub u">Will I have a healthy relationship with my partner?<small>02:24 PM</small></div>' +
      '<div class="bub h">Mansi, I have read your chart. Rahu sits in your seventh house. That is why things stop just as they start to work out.<small>02:24 PM</small></div>' +
      '<div class="bub h">Do not worry, there is a remedy for it.<small>02:24 PM</small></div>' +
      '<div class="notice end">This is an automated message. Your chat ended as you ran out of free minutes. You may recharge and start the chat again. For any issues, contact customer support.</div>' +
      (pitch ? '<div class="gap">10 minutes later</div><div class="bub h">' + esc(r.chat) + '<small>02:34 PM</small></div>' + chatWidget(k) : '') +
    '</div></div>' +
    '<div class="c-bar"><div class="c-offer"><img src="' + A('offer_av40.png') + '" alt=""><span>Hi Mansi, continue this chat at discounted price of <s>₹25/min</s> <b>₹10/min</b></span></div>' + btn('pri xl', 'Continue Chat', 'soon') + '</div>';
  return { html: h, after: function (el) { var sc = $('#cScroll', el); if (pitch) setTimeout(function () { var w = $('.cw', el); if (w) sc.scrollTop = w.offsetTop - 260; }, 30); } };
};
function chatWidget(k) {
  var r = R[k], c = r.cw, st = ownState(k), tc = c.bc || c.tc;
  var style = '--tc:' + c.tc + ';--shadow:' + c.sh + ';--fade0:rgba(' + c.f + ',0);--fade1:rgba(' + c.f + ',.75);--fade2:rgba(' + c.f + ',.95)';
  var bg = 'linear-gradient(270deg,' + c.g[0] + ' 0%,' + c.g[1] + ' 45%,' + c.g[2] + ' 78%,' + c.g[3] + ' 100%)';
  var h = '<div class="cw" style="' + style + '"><div class="cbg" style="background:' + bg + '"><img src="' + A('cw_motif_' + k + '.webp') + '" alt=""></div>' +
    '<span class="cbook">' + book(k, 87, true, 0.7) + '</span>' +
    '<h4>' + r.name + '</h4><div class="badge" style="color:' + tc + '"><span class="r"><span>' + c.rating + '</span><img src="' + A('cwstar_' + k + '.png') + '" alt=""></span><i style="background:' + tc + '"></i><span>' + c.readers + '</span></div>';
  if (st) {
    h += st === 'writing'
      ? '<div class="state"><img class="pdot" src="' + A('tile_dot.png') + '" alt="">Writing your report · ready in 5 mins</div>' + btn('dis lg', 'Read Report', '', ' style="margin-top:12px" disabled')
      : '<div class="state" style="color:var(--ok)">✓ Bought · Ready to read</div>' + btn('pri lg', 'Read Report', 'readBought', ' data-rep="' + k + '" style="margin-top:12px"');
    return h + '</div>';
  }
  h += '<div class="ben">' + c.ben.map(function (b, i) { return '<div style="color:' + tc + '"><img src="' + A('ben_' + k + i + '.png') + '" alt="">' + esc(b) + '</div>'; }).join('') + '</div>';
  if (c.price) {
    h += '<button type="button" class="lm" data-act="openRep" data-rep="' + k + '">Learn More about this Report<img src="' + A('cw_chev.png') + '" alt=""></button>' +
      '<div class="buy"><div class="price"><span class="off">90% OFF</span><span class="row"><s>₹499</s><b>₹49</b></span></div>' + btn('pri md', 'Buy Now', 'buy', ' data-rep="' + k + '"') + '</div>';
  } else {
    h += btn('sec md lmbtn', 'Learn More', 'openRep', ' data-rep="' + k + '"');
  }
  return h + '</div>';
}

/* ======================= Report detail ======================= */
BUILD.detail = function (o) {
  var k = o.rep || S.rep, r = R[k], st = ownState(k);
  var statusRows = '';
  if (st === 'writing' && k !== 'm') {
    statusRows = '<div class="mstat"><button type="button" data-act="mine"><img src="' + A('st_hour.png') + '" alt=""><div><b>' + (k === 'k' ? 'Mansi & Rahul' : '20 Nov – 19 Dec') + '</b><span class="w">Being written · we’ll notify you</span></div><img class="chev" src="' + A('st_chev.png') + '" alt=""></button></div>';
  }
  var h = '<div class="dp-nav" id="dpNav"><div class="in"><button type="button" class="bk" data-act="back" aria-label="Back"><img src="' + A('dp_back.png') + '" alt=""></button><span class="t">' + r.name + '</span>' + wchip(true) + '</div></div>' +
    '<div class="scroll" id="dpScroll">' +
      '<div class="dp-hero"><img class="bg" src="' + A('dp_hero_' + k + '.webp') + '" alt="">' + (VID[k] ? '<video class="hv hv-' + k + '" src="v/hero_' + k + '.mp4" muted autoplay loop playsinline preload="auto"></video>' : '') + '</div>' +
      '<div class="dp-book' + (o.opened ? ' done' : '') + '"><div class="bk-move"><img class="spread" src="' + A('open_' + k + '.webp') + '" alt=""><span class="hinge"><span class="cov"><span class="f" style="background-image:url(' + A('cov_' + k + '.webp') + ')"></span><span class="b" style="background-image:url(' + A('open_' + k + '.webp') + ')"></span></span></span>' +
        '<button type="button" class="pill" data-act="sample" data-rep="' + k + '" aria-label="See Sample report"><img src="' + A('pill.png') + '" alt=""></button></div></div>' +
      '<div class="dp-card"><h1>' + r.name + '</h1><div class="stats"><div><b>' + r.stats[0] + '<img src="' + A('dp_star16.png') + '" alt=""></b><span>Rating</span></div><i></i><div><b>' + r.stats[1] + '</b><span>Reads</span></div><i></i><div><b>' + r.stats[2] + '</b><span>' + r.stats[3] + '</span></div></div>' + statusRows + '</div>' +
      '<div class="dp-blk"><p>' + r.blurb + '</p><div class="chips">' + r.chips.map(function (c, i) { return '<span class="chip"><img src="' + A('chip_' + k + i + '.png') + '" alt="">' + c + '</span>'; }).join('') + '</div>' +
        btn('sec md', 'View Sample Report', 'sample', ' data-rep="' + k + '"') + '</div>' +
      (k === 'k' ? matchBlock() : '') +
      '<div class="dp-learn"><h2>' + r.learnT + '</h2>' + (r.learnS ? '<small>' + r.learnS + '</small>' : '') + '<ul>' + r.learn.map(function (l, i) { return '<li><img src="' + A('learn_' + k + i + '.png') + '" alt="">' + l + '</li>'; }).join('') + '</ul></div>' +
      '<div class="wuf"><img class="md" src="' + A('dp_mandala_' + k + '.png') + '" alt=""><h2>What Users Found</h2><div class="sum"><img src="' + A('rev_star.png') + '" alt=""><b>' + r.revSum[0] + '</b>' + r.revSum[1] + '</div>' +
        '<div class="hrow revs">' + r.revs.map(function (v) { return '<div class="rev"><span class="qm">”</span><div class="who"><i>' + v[0] + '</i><div><b>' + v[1] + '</b><span>' + v[2] + '</span></div></div><p>' + v[3] + '</p><span class="tag">' + v[4] + '</span></div>'; }).join('') + '</div></div>' +
      '<div class="yml"><h2>You May Also Like</h2>' + r.ups.map(function (u, i) { var x = R[u]; return '<button type="button" class="ups" data-act="openRep" data-rep="' + u + '"><span class="bk">' + book(u, 58, true, i % 2 ? 2.5 : 0.7) + '</span><span class="tx"><b>' + x.name + '</b><span class="rt"><img src="' + A('ups_star.png') + '" alt=""><strong>' + x.up[0] + '</strong>· ' + x.up[1] + '</span><span class="pa"><span>₹49<s>₹499</s><em>90% off</em></span><span class="btn sec">Buy now</span></span></span></button>'; }).join('') + '</div>' +
    '</div>' + buyBar(k);
  return { html: h, cls: 'dp', after: function (el, item) {
    var sc = $('#dpScroll', el), nav = $('#dpNav', el);
    var v = $('video.hv', el);
    if (v) {
      var go = function () { v.playbackRate = VID[k]; var p = v.play(); if (p && p.catch) p.catch(function () {}); };
      v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true });
      if (v.readyState >= 1) go(); else v.addEventListener('loadedmetadata', go, { once: true });
    }
    if (!o.opened) setTimeout(function () { o.opened = true; }, 3200);
    function onS() { nav.classList.toggle('solid', sc.scrollTop > 300); tint(); }
    sc.addEventListener('scroll', onS, { passive: true }); onS();
    /* reviews: the card in front is full size, the next one waits a step smaller (Figma 268 vs 244) */
    var rv = $('.revs', el), cards = $$('.rev', el);
    var tick = 0;
    function onR() {
      if (tick) return;
      /* One write per frame, and only when the number really moved. Writing a fresh
         scale on every scroll event is what made the row jitter. */
      tick = requestAnimationFrame(function () {
        tick = 0;
        var x = rv.scrollLeft;
        cards.forEach(function (c) {
          var d = Math.min(1, Math.abs(c.offsetLeft - 16 - x) / 280);
          var s = (1 - .09 * d).toFixed(3);
          if (c.dataset.s !== s) { c.dataset.s = s; c.style.transform = 'scale(' + s + ')'; }
        });
      });
    }
    rv.addEventListener('scroll', onR, { passive: true }); onR();
  } };
};
function matchBlock() {
  return '<div class="dp-match"><h2>Your Compatibility Score</h2><div class="mcard"><div class="sc"><div><small>Mansi & Rahul</small><b>28 of 36</b><span>Very good match</span></div><img src="' + A('k_progress.png') + '" alt=""></div>' +
    '<div class="acts"><button type="button" data-act="compat">All 8 areas</button><button type="button" data-act="editHim">Edit details</button></div>' +
    '<div class="nadi"><img src="' + A('nadi_ic.png') + '" alt=""><span>Nadi is 0 of 8, the dosha families worry about most. See if yours is cancelled.</span></div></div></div>';
}
function buyBar(k) {
  var r = R[k], st = ownState(k);
  var priceBlk = '<div class="bprice"><span class="r"><b>₹49</b><s>₹499</s></span><span>90% OFF</span></div>';
  if (st === 'writing') return '<div class="buybar"><div class="why"><img src="' + A('why_writing.png') + '" alt="">Report being prepared</div><div class="row">' + priceBlk + btn('dis lg', 'We’ll notify you', '', ' disabled') + '</div></div>';
  if (st === 'ready') {
    if (k === 'm') return '<div class="buybar"><div class="why"><img src="' + A('why_owned.png') + '" alt="">Your report is ready. View it anytime.</div><div class="row">' + btn('pri lg', 'View Report', 'readBought', ' data-rep="' + k + '"') + '</div></div>';
    var line = k === 'k' ? 'Matched with Rahul today. Match someone else anytime.' : '20 Nov – 19 Dec is ready. Next one from 20 Dec.';
    return '<div class="buybar"><div class="why"><img src="' + A('why_' + k + '.png') + '" alt="">' + line + '</div><div class="row">' + btn('pri lg', 'View Report', 'readBought', ' data-rep="' + k + '"') + '</div></div>';
  }
  return '<div class="buybar"><div class="why"><img src="' + A('why_' + k + '.png') + '" alt="">' + r.why + '</div><div class="row">' + priceBlk + btn('pri lg', 'Buy Now', 'buy', ' data-rep="' + k + '"') + '</div></div>';
}

/* ======================= Reader (live report pages) ======================= */
/* iOS never gives an iframe the device safe areas, so the reader cannot read them
   itself. Measure them out here and hand them over in the URL. The arch still fills
   the frame edge to edge; only the nav and the buy bar move clear of the hardware. */
function inset(side) {
  var p = document.createElement('div');
  p.style.cssText = 'position:fixed;left:-99px;top:0;width:1px;height:env(safe-area-inset-' + side + ',0px)';
  document.body.appendChild(p);
  var h = p.offsetHeight;
  p.remove();
  return h;
}
BUILD.reader = function (o) {
  return { html: '<iframe title="' + esc(R[o.rep].name) + '" src="reports.html?embed=1&sbt=' + inset('top') + '&sbb=' + inset('bottom') + '#' + R[o.rep].reader + '-' + o.mode + '"></iframe>' };
};
addEventListener('message', function (ev) {
  var m = ev.data; if (!m || m.src !== 'astro-reader') return;
  var it = stack[stack.length - 1]; if (!it || it.name !== 'reader') return;
  if (m.type === 'back') {
    var under = stack[stack.length - 2];
    if (it.opts.mode === 'bought' && !(under && under.name === 'mine')) { reset('today'); if (!S.tipShown) setTimeout(shelfTip, 450); }
    else back();
  }
  if (m.type === 'buy') { var k = it.opts.rep; back(); setTimeout(function () { startBuy(k); }, 280); }
});

/* ======================= Kundli: his details ======================= */
BUILD.kform = function () {
  var him = S.him, left = ['dob', 'time', 'place'].filter(function (f) { return !him[f] && !(f === 'time' && him.unknown); }).length + (him.name ? 0 : 1);
  var h = '<div class="fp-top k"><div class="in"><button type="button" data-act="back" aria-label="Back"><img src="' + A('k3_back.png') + '" alt=""></button><h1>Kundli Milan</h1></div></div>' +
    '<div class="scroll"><div class="fbody" style="padding-top:16px;gap:12px">' +
      '<div class="kh"><b>Boy’s details</b><span class="pillst ' + (left ? 'todo' : 'ok') + '" id="kLeft">' + (left ? left + ' detail' + (left > 1 ? 's' : '') + ' left' : '<img src="' + A('ic_check12.png') + '" alt="">Added') + '</span></div>' +
      fld('hName', 'Name', him.name, 'text', '') +
      '<div class="two">' + fld('hDob', 'Date of Birth', him.dob, 'date', 'ic_date.png') + fld('hTime', 'Time of Birth', him.time, 'time', 'ic_time.png') + '</div>' +
      '<button type="button" class="cbx' + (him.unknown ? ' on' : '') + '" data-act="unknownTime"><i>✓</i>Don’t know my exact time of birth</button>' +
      fld('hPlace', 'Place of Birth', him.place, 'city', '') +
      '<div style="height:4px"></div>' +
      '<div class="kh"><b>Girl’s details</b><span class="pillst ok"><img src="' + A('ic_check12.png') + '" alt="">Added</span></div>' +
      '<div class="bsum"><i>M</i><div><b>' + esc(S.me.name) + '</b><span>' + prettyDate(S.me.dob) + ' · ' + prettyTime(S.me.time) + '</span><span>' + esc(S.me.place) + '</span></div><button type="button" class="link" data-act="editMe">Edit</button></div>' +
    '</div></div>' +
    '<div class="kfoot"><div class="pv"><img src="' + A('ic_lock.png') + '" alt="">Used only to make your report. Never shared.</div>' + btn((left ? 'dis' : 'pri') + ' lg', 'See Your Compatibility', 'kSubmit', ' id="kGo"') + '</div>';
  return { html: h, after: bindForm };
};
function fld(id, label, val, type, icon) {
  var isDT = type === 'date' || type === 'time';
  var shown = type === 'date' ? (val ? prettyDate(val) : '') : type === 'time' ? (val ? prettyTime(val) : '') : val;
  return '<div class="fld' + (val ? '' : ' empty') + '" data-f="' + id + '"><div class="box">' +
    '<input id="' + id + '" ' + (isDT ? 'type="text" data-kind="' + type + '" readonly' : 'type="text"') + ' value="' + esc(shown || '') + '" placeholder="' + label + '" autocomplete="off" ' + (type === 'city' ? 'data-kind="city"' : '') + '>' +
    (icon ? '<img src="' + A(icon) + '" alt="">' : '') + '</div><label for="' + id + '">' + label + '</label></div>';
}
var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function prettyDate(v) { if (!v) return ''; var p = v.split('-'); return +p[2] + ' ' + MON[+p[1] - 1] + ' ' + p[0]; }
function prettyTime(v) { if (!v) return ''; var p = v.split(':'), h = +p[0]; return (h % 12 || 12) + ':' + p[1] + ' ' + (h < 12 ? 'AM' : 'PM'); }
function bindForm(el) {
  $$('input', el).forEach(function (inp) {
    var f = inp.closest('.fld'), kind = inp.dataset.kind;
    if (kind === 'date' || kind === 'time') {
      /* Date of Birth and Time of Birth used to spawn a throwaway native input with
         pointer-events:none and then call showPicker(). iOS will not open its wheel
         for an element it cannot tap, so both fields did nothing on a phone. Now the
         real native input sits invisibly over the field, so the tap lands on it and
         the OS picker always opens. The pretty text under it stays as the display. */
      var p = document.createElement('input');
      p.type = kind;
      p.className = 'pick';
      p.setAttribute('aria-label', inp.placeholder);
      p.value = fieldVal(inp.id) || '';
      $('.box', f).appendChild(p);
      p.addEventListener('change', function () {
        setField(inp.id, p.value);
        inp.value = kind === 'date' ? prettyDate(p.value) : prettyTime(p.value);
        f.classList.toggle('empty', !p.value);
        f.classList.remove('err');
        syncK(el);
      });
      return;
    }
    inp.addEventListener('input', function () {
      f.classList.toggle('empty', !inp.value); f.classList.remove('err');
      if (kind === 'city') { setField(inp.id, ''); citySuggest(inp, f, el); } else setField(inp.id, inp.value);
      syncK(el);
    });
    inp.addEventListener('focus', function () { f.classList.remove('empty'); });
    inp.addEventListener('blur', function () { f.classList.toggle('empty', !inp.value); setTimeout(function () { var s = $('.sug', f); if (s) s.remove(); }, 180); });
  });
}
function fieldVal(id) { return { hDob: S.him.dob, hTime: S.him.time, eDob: S.me.dob, eTime: S.me.time }[id]; }
function setField(id, v) {
  var map = { hName: ['him', 'name'], hDob: ['him', 'dob'], hTime: ['him', 'time'], hPlace: ['him', 'place'], eName: ['edit', 'name'], eDob: ['edit', 'dob'], eTime: ['edit', 'time'], ePlace: ['edit', 'place'] };
  var m = map[id]; if (!m) return;
  if (m[0] === 'edit') { (editDraft || {})[m[1]] = v; return; }
  S[m[0]][m[1]] = v;
}
function citySuggest(inp, f, el) {
  var q = inp.value.trim().toLowerCase(), old = $('.sug', f); if (old) old.remove();
  if (q.length < 2) return;
  var hits = CITIES.filter(function (c) { return c.toLowerCase().indexOf(q) === 0 || c.toLowerCase().indexOf(' ' + q) > -1; }).slice(0, 4);
  if (!hits.length) return;
  var s = document.createElement('div'); s.className = 'sug';
  s.innerHTML = hits.map(function (c) { return '<button type="button">' + c + '</button>'; }).join('');
  s.addEventListener('mousedown', function (e) { e.preventDefault(); });
  s.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; inp.value = b.textContent; setField(inp.id, b.textContent); f.classList.remove('empty'); s.remove(); inp.blur(); syncK(el); });
  f.appendChild(s);
}
function syncK(el) {
  var go = $('#kGo', el); if (!go) return;
  var him = S.him, left = ['dob', 'time', 'place'].filter(function (f) { return !him[f] && !(f === 'time' && him.unknown); }).length + (him.name ? 0 : 1);
  var pill = $('#kLeft', el);
  pill.className = 'pillst ' + (left ? 'todo' : 'ok');
  pill.innerHTML = left ? left + ' detail' + (left > 1 ? 's' : '') + ' left' : '<img src="' + A('ic_check12.png') + '" alt="">Added';
  go.className = 'btn lg ' + (left ? 'dis' : 'pri');
}

/* ======================= Edit details (her) ======================= */
var editDraft = null;
BUILD.edit = function () {
  editDraft = editDraft || JSON.parse(JSON.stringify(S.me));
  var d = editDraft;
  var h = '<div class="fp-top"><div class="in"><button type="button" data-act="back" aria-label="Back"><img src="' + A('edit_back.png') + '" alt=""></button><h1>Almost there</h1></div></div>' +
    '<div class="scroll"><div class="fbody"><p class="hint">Fill your details to connect with astrologer</p>' +
      fld('eName', 'Name', d.name, 'text', '') + fld('eDob', 'Date of Birth', d.dob, 'date', 'ic_date.png') +
      '<div class="gender"><span>Gender</span><div>' + ['Male', 'Female'].map(function (g) { return '<button type="button" class="radio' + (d.gender === g ? ' on' : '') + '" data-act="gender" data-g="' + g + '"><i></i>' + g + '</button>'; }).join('') + '</div></div>' +
      fld('ePlace', 'Place of Birth', d.place, 'city', '') + fld('eTime', 'Time of Birth', d.time, 'time', 'ic_time.png') +
      '<button type="button" class="cbx" data-act="noop"><i>✓</i>Don’t know my exact time of birth</button>' +
      '<p class="fnote">You can still get your report. Some parts, especially precise timing and house-based details, may be less specific without your birth time.</p>' +
    '</div></div><div class="ffoot">' + btn('pri xl', 'Save Changes', 'saveMe') + '</div>';
  return { html: h, after: bindForm };
};

/* ======================= Pay sheet, language, compat ======================= */
var payRep = null;
function startBuy(k) {
  if (k === 'k' && !S.himDone) { go('kform', {}); return; }
  if (ownState(k)) { openRep(k); return; }
  payRep = k; openPay();
}
function payTotals() { var total = 58, used = Math.min(S.wallet, total); return { used: used, due: total - used }; }
function openPay() {
  var k = payRep, r = R[k], t = payTotals();
  var above = '<span class="obook"><img src="' + A('open_' + k + '.webp') + '" alt=""></span>';
  var html = '<div class="pay"><div class="in">' +
    '<div class="ttl"><b>' + r.name + '</b><span>' + r.payMeta + '</span></div>' +
    '<div class="pfor"><i>M</i><div><b>' + esc(S.me.name) + '</b><span>' + prettyDate(S.me.dob) + ' · ' + prettyTime(S.me.time) + '</span></div><button type="button" class="link" data-act="editMeFromPay">Edit</button></div>' +
    '<div class="plang"><img src="' + A('pay_globe.png') + '" alt=""><span>Report in <b>' + S.lang + '</b></span><button type="button" class="link" data-act="lang">Change</button></div>' +
    '<div class="bill"><div><span>Report price</span><span>₹499</span></div><div><span>Today\'s offer (90% off)</span><span>−₹450</span></div><div><span>GST (18%)</span><span>+₹9</span></div>' +
      (t.used ? '<div class="wal"><span>Wallet money</span><span>−₹' + t.used + '</span></div>' : '') +
      '<hr><div class="tot"><span>You pay</span><span><s>₹499</s><b>₹' + t.due + '</b></span></div></div>' +
    '<div class="pacts">' + (t.due ? '<div class="pw"><small>Pay with<img src="' + A('pay_chev.png') + '" alt=""></small><b><img src="' + A('pay_phonepe.png') + '" alt="">PhonePe</b></div>' : '') +
      btn('pri xl', t.due ? 'Pay ₹' + t.due : 'Get it with wallet', 'pay') + '</div>' +
    '</div></div>';
  openSheet(html, { close: true, cls: 'paysheet', above: above });
}
function openLang(ret) {
  var cur = S.lang;
  var html = '<div class="lang"><h3>Read the report in</h3><p>See a sample first. Your report comes in the language you pick.</p><div>' +
    ['English', 'Hinglish'].map(function (l) { return '<button type="button" class="opt' + (l === cur ? ' on' : '') + '" data-act="pickLang" data-l="' + l + '">' + l + '<i></i></button>'; }).join('') + '</div>' +
    btn('pri xl', 'Change Language', 'setLang', ' data-ret="' + (ret || '') + '"') + '</div>';
  openSheet(html, {});
  openSheet.pick = cur;
}
function compatHTML() {
  var en = S.compatLang === 'en';
  return '<div class="compat"><div class="sch"><div><small>Compatibility score</small><b>28 of 36</b><span>Very good match</span></div></div>' +
    '<div class="seg"><button type="button" class="' + (en ? 'on' : '') + '" data-act="cLang" data-l="en">English</button><button type="button" class="' + (en ? '' : 'on') + '" data-act="cLang" data-l="sa">Sanskrit</button></div>' +
    '<div class="kootas">' + KOOTA.map(function (x) { return '<div class="koota' + (x[2] === 0 ? ' low' : '') + '"><img src="' + A('kt_' + x[0] + '.png') + '" alt=""><b>' + (en ? x[0] : x[1]) + '</b><span>' + x[2] + ' / ' + x[3] + '</span></div>'; }).join('') + '</div>' +
    '<div class="ft"><img src="' + A('kt_pulse.png') + '" alt=""><span>' + (en ? 'Health' : 'Nadi') + ' is 0 of 8. Your report explains if it is cancelled, and the remedy.</span></div></div>';
}
function openCompat() { openSheet(compatHTML(), { close: true, cls: 'compatsheet', below: ownState('k') ? '' : buyBar('k') }); 
}

/* ======================= Payment → loader → ready ======================= */
BUILD.success = function (o) {
  return { html: '<div class="sbox"><img class="bg" src="' + A('success_bg.png') + '" alt=""><span class="wipe"></span><div class="mark"><svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="56"/><path d="M50 77l17 17 34-36"/></svg></div><h2>Payment Successful</h2><p>' + (o.due ? '₹' + o.due + ' paid' : 'Paid from your wallet') + ' for your report</p></div>', cls: 'succ',
    after: function (el) { var bx = $('.sbox', el); var f = function () { var s = (phone.clientWidth || 360) / 360; bx.style.transform = 'scale(' + s + ')'; }; f(); } };
};
var loaderRun = null;
BUILD.loader = function (o) {
  return { html: '<button type="button" class="bk" data-act="leaveLoader" aria-label="Back"><img src="' + A('ld_back.png') + '" alt=""></button>' +
    '<div class="body"><h2>' + (o.rep === 'k' ? 'Analysing your Kundlis' : 'Analysing your Kundli') + '</h2><p class="time">Report ready in 5 mins · we’ll notify you</p><div class="pick" id="pick"></div></div>' +
    '<div class="hands"><img src="' + A('loader_hands.webp') + '" alt=""><span class="orb"></span></div>', cls: 'ldr', after: function (el) { runPicker($('#pick', el)); } };
};
function runPicker(host) {
  var rows = LOADER.map(function (n) {
    var d = document.createElement('div'); d.className = 'prow';
    d.innerHTML = '<div class="tp"><b>Analysing ' + n + '</b><div class="tr"><i></i></div></div><img src="' + A('koota_' + n.replace(/ /g, '_') + '.png') + '" alt="">';
    host.appendChild(d); return d;
  });
  var i = loaderRun ? loaderRun.i : 0;
  function place() {
    rows.forEach(function (d, j) {
      var off = j - i, a = Math.abs(off);
      var w = [296, 266, 237, 219][Math.min(a, 3)], hgt = [54, 49, 43, 40][Math.min(a, 3)], fs = a ? (a === 1 ? 14 : 12) : 16;
      var y = off === 0 ? 0 : (off > 0 ? 1 : -1) * ([0, 57, 106, 144][Math.min(a, 3)] + Math.max(0, a - 3) * 20);
      d.style.width = w + 'px'; d.style.height = hgt + 'px';
      d.style.transform = 'translate(-50%,-50%) translateY(' + y + 'px)';
      d.style.opacity = a === 0 ? 1 : a === 1 ? .55 : a === 2 ? .28 : 0;
      $('b', d).style.fontSize = fs + 'px';
      d.classList.toggle('done', j < i); d.classList.toggle('cur', j === i);
    });
  }
  place();
  host._tick = setInterval(function () {
    if (!document.body.contains(host)) { clearInterval(host._tick); return; }
    if (loaderRun) i = loaderRun.i;
    place();
  }, 120);
}
function startLoaderClock(k) {
  loaderRun = { i: 0, rep: k };
  (function step() {
    if (!loaderRun || loaderRun.rep !== k) return;
    if (loaderRun.i >= LOADER.length - 1) { setTimeout(function () { finishReport(k); }, 900); return; }
    loaderRun.t = later(function () { loaderRun.i++; step(); }, 850);
  })();
}
function finishReport(k) {
  if (!loaderRun || loaderRun.rep !== k) return;
  loaderRun = null;
  S.own[k] = 'ready';
  if (topName() === 'loader') replaceTop('reader', { rep: k, mode: 'bought' });
  else {
    refresh();
    showPush('Your ' + R[k].name + ' is ready 📖', R[k].readyPush, function () { openReader(k, 'bought'); });
  }
}
BUILD.ready = function (o) {
  var k = o.rep, cov = (k === 'm' || k === 'r') ? '<img src="' + A('cover_' + k + '.webp') + '" alt="">' : book(k, 150);
  return { html: '<span class="glow"></span><div class="cov">' + cov + '</div><h2>Your ' + '' + R[k].name + ' is ready</h2><p>Made from your birth chart by Astro Hemali</p>' + btn('pri xl', 'Read Report', 'readBought', ' data-rep="' + k + '"'), cls: 'ready' };
};

/* ======================= My Reports spotlight (P6.2, shown once) ======================= */
function shelfTip() {
  if (topName() !== 'today') return;
  S.tipShown = true;
  var icon = $('.screen.today .t-act [data-act="mine"]'); if (!icon) return;
  var pr = phone.getBoundingClientRect(), r = icon.getBoundingClientRect();
  var cx = r.left - pr.left + r.width / 2, cy = r.top - pr.top + r.height / 2;
  var d = document.createElement('div'); d.className = 'spot';
  d.innerHTML = '<div class="sp-scrim"></div><button type="button" class="sp-target" style="left:' + (cx - 22) + 'px;top:' + (cy - 22) + 'px" aria-label="My Reports"><img src="' + A('ic_myreports.png') + '" alt=""></button>' +
    '<span class="sp-ptr" style="left:' + (cx - 10) + 'px;top:' + (cy + 29) + 'px"></span>' +
    '<div class="sp-call" style="top:' + (cy + 38) + 'px"><button type="button" class="sp-body"><img src="' + A('mr_empty.webp') + '" alt=""><span class="sp-c"><b>All your reports are here</b><span>Read, download or share them anytime from this icon.</span></span></button><button type="button" class="sp-ok">Got it</button></div>';
  overlay.appendChild(d); void d.offsetHeight; d.classList.add('on');
  function close(then) { d.classList.remove('on'); setTimeout(function () { d.remove(); if (then) then(); }, 250); }
  $('.sp-ok', d).addEventListener('click', function () { close(); });
  $('.sp-scrim', d).addEventListener('click', function () { close(); });
  $('.sp-target', d).addEventListener('click', function () { close(function () { go('mine', {}); }); });
  $('.sp-body', d).addEventListener('click', function () { close(function () { go('mine', {}); }); });
}

/* ======================= My Reports, History ======================= */
BUILD.mine = function () {
  var owned = Object.keys(S.own);
  var DL = '<span class="ibtn"><img src="' + A('ic_download.png') + '" alt=""></span><span class="ibtn"><img src="' + A('ic_share.png') + '" alt=""></span>';
  var list = owned.length ? '<div class="mr-list">' + owned.map(function (k) {
    var rd = S.own[k] === 'ready';
    return '<div class="mrow"><button type="button" class="bk" data-act="' + (rd ? 'readBought' : 'openRep') + '" data-rep="' + k + '">' + book(k, 58) + '</button><div class="tx"><b>' + R[k].name + '</b><small>Bought today</small>' +
      (rd ? '<div class="mact">' + btn('sec sm', 'Read report', 'readBought', ' data-rep="' + k + '"') + '<span class="icons"><button type="button" class="ibtn" data-act="soon" aria-label="Download"><img src="' + A('ic_download.png') + '" alt=""></button><button type="button" class="ibtn" data-act="soon" aria-label="Share"><img src="' + A('ic_share.png') + '" alt=""></button></span></div>'
          : '<button type="button" class="st" data-act="openRep" data-rep="' + k + '"><i></i>Ready in 5 mins</button>') + '</div></div>';
  }).join('') + '</div>'
    : '<div class="mr-empty"><img src="' + A('mr_empty.webp') + '" alt=""><b>No reports yet</b><p>Reports Astro Hemali writes for you stay here. Read them anytime.</p></div>';
  var more = ['m', 'k', 'w', 'r'].filter(function (k) { return !S.own[k]; });
  var SHELF = { m: 'Marriage Prediction', k: 'Kundli Milan Report', w: 'Monthly Wealth Report', r: 'Monthly Relationship Report' };
  var h = '<div class="mr-top"><div class="in"><button type="button" data-act="back" aria-label="Back"><img src="' + A('mr_back.png') + '" alt=""></button><h1>My Reports</h1></div></div>' +
    '<div class="scroll">' + list + (more.length ? '<div class="mr-h">' + (owned.length ? 'More reports for you' : 'Popular reports') + '</div><div class="hrow shelf">' + more.map(function (k, i) {
      var r = R[k];
      /* The books tease here too. Staggered 0.7s / 2.5s and alternating, so the shelf
         catches the eye one book at a time instead of flapping in unison. */
      return '<button type="button" class="scard" data-act="openRep" data-rep="' + k + '"><span class="cv">' + book(k, 87, true, i % 2 ? 2.5 : 0.7) + '</span><b>' + SHELF[k] + '</b><span class="m"><img src="' + A('shelf_star.png') + '" alt="">' + r.up[0] + ' · ' + r.up[2] + ' reads</span><span class="p"><b>₹49</b><s>₹499</s><em>90% off</em></span></button>';
    }).join('') + '</div>' : '') + '</div>';
  return { html: h };
};
BUILD.history = function () {
  var k = S.rep, r = R[k], st = ownState(k);
  var h = '<div class="mr-top"><div class="in"><h1 style="margin-left:4px">History</h1></div></div><div class="scroll"><div class="hitem"><small>10:42 AM</small><div class="hcard">' +
    '<div class="who"><img src="' + A('av_mala50.png').replace('av_mala50', 'av_hemali68') + '" alt=""><div><b>Astro Hemali</b><span>' + r.hist + '</span></div></div>' +
    '<div class="box"><b>' + r.name + '</b><span class="bk">' + book(k, 61) + '</span>' + (st ? btn('pri sm', st === 'ready' ? 'Read Report' : 'Writing your report…', st === 'ready' ? 'readBought' : 'openRep', ' data-rep="' + k + '"') : btn('pri sm', 'Learn More', 'openRep', ' data-rep="' + k + '"')) + '</div>' +
    '</div></div></div>' + bnav('history');
  return { html: h, cls: 'hist' };
};

/* ======================= actions ======================= */
function openRep(k) { if (k === 'k' && !S.himDone) { go('kform', {}); return; } go('detail', { rep: k }); }
function openReader(k, mode) { closeSheet(true); go('reader', { rep: k, mode: mode }); }
function chatFlow() { S.replied = false; go('chat', {}); }

var ACT = {
  back: back, closeSheet: function () { closeSheet(); },
  menu: function () { openDrawer(); },
  wallet: function () { showToast('Wallet balance ₹' + S.wallet); },
  soon: function () { showToast('Not part of this demo'); },
  noop: function () {},
  mine: function () { go('mine', {}); },
  chat: function () { chatFlow(); },
  tab: function (b) {
    var t = b.dataset.tab;
    if (t === 'today' && topName() !== 'today') reset('today');
    else if (t === 'history' && topName() !== 'history') reset('history');
    else if (t === 'experts' || t === 'explore') showToast('Not part of this demo');
  },
  answer: function (b) {
    if (S.answered) return;
    var row = b.parentNode; $$('button', row).forEach(function (x) { x.disabled = x !== b; }); b.classList.add('load');
    later(function () {
      S.answered = true; S.answer = b.dataset.a; S.wallet += REWARD[S.day - 1]; refresh();
      var wc = $('.screen.today .wchip'); if (wc) { wc.classList.add('bump'); }
      if (S.day === 3 && !ownState(S.rep)) later(function () { dayToast(); }, 1200);
    }, 900);
  },
  earnNow: function () { closeSheet(); setTimeout(function () { scrollTodayTo('secReward', 110); }, 250); },
  earnLater: function () { closeSheet(); setTimeout(function () { scrollTodayTo('secGuide', 300); }, 250); },
  openRep: function (b) { openRep(b.dataset.rep || S.rep); },
  sample: function (b) { openReader(b.dataset.rep, 'sample'); },
  readBought: function (b) { openReader(b.dataset.rep, 'bought'); },
  buy: function (b) { startBuy(b.dataset.rep || S.rep); },
  compat: function () { openCompat(); },
  cLang: function (b) { S.compatLang = b.dataset.l; if (sheetOpen) $('.sh-in', sheetOpen.sh).innerHTML = compatHTML(); },
  editHim: function () { go('kform', {}); },
  editMe: function () { editDraft = null; go('edit', { ret: 'back' }); },
  editMeFromPay: function () { closeSheet(true); editDraft = null; go('edit', { ret: 'pay' }); },
  gender: function (b) { editDraft.gender = b.dataset.g; $$('.radio', b.parentNode).forEach(function (x) { x.classList.toggle('on', x === b); }); },
  saveMe: function () {
    var it = stack[stack.length - 1], ret = it.opts.ret;
    Object.keys(editDraft).forEach(function (f) { if (editDraft[f]) S.me[f] = editDraft[f]; });
    editDraft = null; back();
    if (ret === 'pay') setTimeout(openPay, 300);
  },
  unknownTime: function (b) { S.him.unknown = !S.him.unknown; b.classList.toggle('on', S.him.unknown); syncK(b.closest('.screen')); },
  kSubmit: function (b) {
    if (b.classList.contains('dis')) {
      var el = b.closest('.screen'); ['hName', 'hDob', 'hTime', 'hPlace'].forEach(function (id) { var v = { hName: S.him.name, hDob: S.him.dob, hTime: S.him.time || (S.him.unknown ? 'x' : ''), hPlace: S.him.place }[id]; if (!v) $('[data-f="' + id + '"]', el).classList.add('err'); });
      return;
    }
    S.himDone = true;
    var prevIsDetail = stack.length > 1 && stack[stack.length - 2].name === 'detail';
    if (prevIsDetail) back(); else replaceTop('detail', { rep: 'k' });
  },
  lang: function () { closeSheet(true); openLang('pay'); },
  pickLang: function (b) { openSheet.pick = b.dataset.l; $$('.opt', b.parentNode).forEach(function (x) { x.classList.toggle('on', x === b); }); },
  setLang: function (b) { S.lang = openSheet.pick || S.lang; closeSheet(true); if (b.dataset.ret === 'pay') openPay(); else showToast('Report language: ' + S.lang); },
  pay: function () {
    var k = payRep, t = payTotals();
    S.wallet -= t.used; S.own[k] = 'writing'; closeSheet(true); hidePush(true); hideToast(true);
    go('success', { rep: k, due: t.due, fade: true });
    startLoaderClock(k);
    later(function () { if (topName() === 'success') replaceTop('loader', { rep: k }); }, 2000);
  },
  leaveLoader: function () { reset('today'); }
};

phone.addEventListener('click', function (e) {
  var b = e.target.closest('[data-act]');
  if (!b || !phone.contains(b)) return;
  var f = ACT[b.dataset.act];
  if (f) { e.preventDefault(); f(b, e); }
});

/* ======================= day scripts ======================= */
function earnSheet() {
  var html = '<div class="earn"><div class="art"></div><div class="tx"><h2>Answer &amp; Earn every day!</h2><p>Answer today’s question to earn.</p></div>' + stripHTML(1, false) +
    '<div class="acts">' + btn('pri x2', 'Answer now', 'earnNow') + btn('txt', 'Maybe Later', 'earnLater') + '</div></div>';
  openSheet(html, { onClose: afterEarn });
}
function afterEarn() {
  if (S.day !== 1 || S._d1) return; S._d1 = true;
  later(function () {
    if (ownState(S.rep)) return;
    S.replied = true; refresh();
    dayToast();
    later(function () { if (!ownState(S.rep) && topName() === 'today') dayPush(); }, 3500);
  }, 4000);
}
function dayToast() {
  if (topName() !== 'today') return;
  var r = cur();
  showToast({ title: 'From Astro Hemali', msg: 'Hemali made your ' + r.name + ' · ₹49', cta: 'See', onTap: function () { openRep(S.rep); } });
}
function dayPush() {
  var r = cur();
  showPush(r.push[0], r.push[1], function () { openRep(S.rep); });
}
function startDay(day, rep) {
  clearTimers(); closeSheet(true); hidePush(true); hideToast(true); loaderRun = null;
  var keepRep = rep || (S && S.rep) || 'm';
  S = freshState(day, keepRep);
  reset('today');
  paintSwitcher();
  if (day === 1) later(earnSheet, 700);
  if (day === 3) later(function () { if (topName() === 'today' && !ownState(S.rep)) dayPush(); }, 2500);
  try { localStorage.setItem('acr-demo', JSON.stringify({ day: day, rep: keepRep })); } catch (e) {}
}

/* ======================= switcher + drawer ======================= */
var sw = $('#switcher'), drawer = $('#drawer'), dscrim = $('#dscrim'), drBody = $('#drBody');
function paintSwitcher() {
  $$('[data-day]', sw).forEach(function (b) { b.classList.toggle('on', +b.dataset.day === S.day); });
  $$('[data-rep]', sw).forEach(function (b) { b.classList.toggle('on', b.dataset.rep === S.rep); });
}
sw.addEventListener('click', function (e) {
  var b = e.target.closest('button'); if (!b) return;
  if (b.dataset.day) startDay(+b.dataset.day, S.rep);
  else if (b.dataset.rep) startDay(S.day, b.dataset.rep);
  else if ('restart' in b.dataset) startDay(1, 'm');
  closeDrawer();
});
function placeSwitcher() {
  var want = innerWidth <= 900 ? drBody : document.body;
  if (sw.parentNode === want) return;
  if (want === drBody) drBody.appendChild(sw); else document.body.insertBefore(sw, $('.stage'));
}
function openDrawer() {
  if (innerWidth > 900) { sw.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 400 }); return; }
  dscrim.hidden = false; void dscrim.offsetHeight; dscrim.classList.add('on'); drawer.classList.add('on'); drawer.setAttribute('aria-hidden', 'false');
}
function closeDrawer() {
  dscrim.classList.remove('on'); drawer.classList.remove('on'); drawer.setAttribute('aria-hidden', 'true');
  setTimeout(function () { dscrim.hidden = true; }, 240);
}
dscrim.addEventListener('click', closeDrawer);
$('#drClose').addEventListener('click', closeDrawer);
addEventListener('resize', placeSwitcher);
addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (drawer.classList.contains('on')) closeDrawer(); else back(); } });

/* ======================= boot ======================= */
placeSwitcher();
var saved = null; try { saved = JSON.parse(localStorage.getItem('acr-demo')); } catch (e) {}
var hash = location.hash.slice(1).split('/');
var d0 = +hash[0] || (saved && saved.day) || 1, r0 = (R[hash[1]] && hash[1]) || (saved && saved.rep) || 'm';
startDay(Math.min(3, Math.max(1, d0)), r0);
window.__demo = { S: function () { return S; }, go: go, startDay: startDay, ACT: ACT };
})();
