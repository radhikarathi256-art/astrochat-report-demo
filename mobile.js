/* Mobile web-app layer: the in-app hamburger opens a drawer that drives the
   demo's entry points, and the status-bar strip follows the page. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var drawer = $('drawer'), scrim = $('dscrim');

  /* One switcher, two homes. Moving the live node keeps app.js's delegated
     handlers and renderTpTabs() working — a copy would go stale the moment the
     touchpoint chips re-rendered. */
  var sw = $('switcher'), drBody = $('drBody'), stage = document.querySelector('.stage');
  function placeSwitcher() {
    var want = window.innerWidth <= 600 ? drBody : document.body;
    if (sw.parentNode === want) return;
    if (want === drBody) drBody.appendChild(sw);
    else document.body.insertBefore(sw, stage);
  }
  placeSwitcher();
  window.addEventListener('resize', placeSwitcher);

  // A forced reflow, not rAF: browsers throttle rAF when the tab is not
  // painting, and the open class would then never land.
  function open()  { scrim.hidden = false;
    void scrim.offsetHeight;
    scrim.classList.add('on'); drawer.classList.add('on');
    drawer.setAttribute('aria-hidden', 'false'); }
  function close() { scrim.classList.remove('on'); drawer.classList.remove('on');
    drawer.setAttribute('aria-hidden', 'true');
    setTimeout(function () { scrim.hidden = true; }, 240); }

  // Capture, so this runs before app.js's own delegated click handler.
  document.addEventListener('click', function (e) {
    if (e.target.closest('.js-ham')) { e.stopPropagation(); e.preventDefault(); open(); }
  }, true);
  scrim.addEventListener('click', close);
  $('drClose').addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('on')) close();
  });
  // Picking a day, a touchpoint or Restart has done its job — get out of the way
  // so the surface it jumped to is actually visible. app.js's own document-level
  // handler still runs, so nothing here has to re-implement the switch.
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('[data-day],[data-tp],#restart,.sw-link')) close();
  });

  /* The status-bar strip takes its colour from whatever is at the top of the
     active screen: the peach Today hero or the report's photo at rest, white
     once that has scrolled away or on a plain white screen. */
  var tc = $('themeColor');
  function topColour() {
    var scr = document.querySelector('.screen.on');
    if (!scr) return '#FFFFFF';
    var sc = scr.querySelector('[data-scroll]');
    if (sc && sc.scrollTop > 40) return '#FFFFFF';
    if (scr.querySelector('.head.hero-head')) return '#FBE4D7';
    if (scr.querySelector('.r2-hero')) return '#F6DED6';
    return '#FFFFFF';
  }
  function tint() {
    var c = topColour();
    tc.setAttribute('content', c);
    document.documentElement.style.background = c;
    document.body.style.background = c;
  }
  document.querySelectorAll('.screen').forEach(function (s) {
    var sc = s.querySelector('[data-scroll]');
    if (sc) sc.addEventListener('scroll', tint, { passive: true });
    new MutationObserver(tint).observe(s, { attributes: true, attributeFilter: ['class'] });
  });
  tint();
})();
