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

  /* The viewport height, measured rather than computed. visualViewport is
     deliberately not used: it shrinks when the keyboard opens, and this number
     has to stay the height of the screen so the bottom bars stay on the bottom
     of it. orientationchange is read late because iOS reports the pre-rotation
     height if asked while the rotation is still running. */
  /* A parked probe whose height is the home-indicator inset, so env() can be
     read as a number instead of trusted blind. */
  var probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;left:-9999px;bottom:0;width:0;visibility:hidden;' +
                        'height:env(safe-area-inset-bottom,0px)';
  function lockVH() {
    var vh = window.innerHeight, de = document.documentElement;
    de.style.setProperty('--appvh', vh + 'px');
    if (!probe.parentNode) document.body.appendChild(probe);
    /* iOS hands a home-screen app a box that runs under the status bar but
       stops above the home indicator. env(safe-area-inset-bottom) still
       reports the full inset, so every bar that pads itself with it pays for
       a strip the box has already given up — that is the dead space under the
       nav, the sticky buttons and the sheets, with the OS's own strip showing
       below it. When the box is short, nobody pays. Portrait only: a landscape
       device is legitimately shorter than screen.height. */
    var shortBox = window.innerWidth < vh && screen.height - vh > 8;
    de.style.setProperty('--sab', (shortBox ? 0 : probe.offsetHeight) + 'px');
  }
  lockVH();
  window.addEventListener('resize', lockVH);
  window.addEventListener('pageshow', lockVH);
  window.addEventListener('orientationchange', function () { setTimeout(lockVH, 150); });

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
  // rgb()/rgba() to hex. Anything transparent comes back null so the caller can
  // fall back rather than painting the strip black.
  function hex(v) {
    var m = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/.exec(v || '');
    if (!m || (m[4] !== undefined && parseFloat(m[4]) < .5)) return null;
    return '#' + [m[1], m[2], m[3]].map(function (n) {
      return ('0' + (+n).toString(16)).slice(-2);
    }).join('').toUpperCase();
  }
  function topColour() {
    var scr = document.querySelector('.screen.on');
    if (!scr) return '#FFFFFF';
    var sc = scr.querySelector('[data-scroll]');
    if (sc && sc.scrollTop > 40) return '#FFFFFF';
    if (scr.querySelector('.head.hero-head')) return '#FBE4D7';
    // Matches --rose-lo, the darker end of the hero's gradient, which is what
    // sits directly under the status bar.
    if (scr.querySelector('.r2-hero')) return '#E6C7C8';
    // Everything else reads its own ground off the element. The two screens
    // above are the only ones whose top is painted by a child rather than by
    // the screen itself; hard-coding the rest is what left the report screens
    // white at the top while the page under them was pink, which on a
    // home-screen app looks like the app starting below the status bar.
    return hex(getComputedStyle(scr).backgroundColor) || '#FFFFFF';
  }
  /* The colour at the foot of the screen. <html> is painted in this rather than
     in the top colour, because <html> is only ever visible where the body box
     falls short — which is under the bottom bar. Giving it that bar's own
     colour means a short box is invisible instead of a peach band, so the
     layout no longer has to be perfect for the screen to look right. */
  function footColour() {
    var scr = document.querySelector('.screen.on');
    if (!scr) return '#FFFFFF';
    var bars = scr.querySelectorAll('.bnav,.buybar,.askbar,.rp-buy');
    var bar = bars[bars.length - 1];
    return (bar && hex(getComputedStyle(bar).backgroundColor)) || '#FFFFFF';
  }
  function tint() {
    var c = topColour();
    tc.setAttribute('content', c);
    document.documentElement.style.background = footColour();
    document.body.style.background = c;
  }
  document.querySelectorAll('.screen').forEach(function (s) {
    var sc = s.querySelector('[data-scroll]');
    if (sc) sc.addEventListener('scroll', tint, { passive: true });
    new MutationObserver(tint).observe(s, { attributes: true, attributeFilter: ['class'] });
  });
  tint();
})();
