/* Mobile web-app layer: the in-app hamburger opens a drawer that drives the
   demo's entry points, and the status-bar strip follows the page. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var FLOWS = [
    ['a', 'A · Reply + report', 'R.1 — attachment under Hemali\u2019s answer'],
    ['b', 'B · Expert card',    'R.1b — inside the astrologer card'],
    ['c', 'C · Guidance tile',  'R.1c — personalised guidance']
  ];
  var drawer = $('drawer'), scrim = $('dscrim');

  function current() {
    var on = document.querySelector('.switcher [data-entry].on');
    return on ? on.getAttribute('data-entry') : 'a';
  }

  function render() {
    var cur = current();
    $('drFlows').innerHTML = FLOWS.map(function (f, i) {
      return '<button type="button" data-dr-entry="' + f[0] + '"' +
        (f[0] === cur ? ' class="on"' : '') + '>' +
        '<span class="n">' + (i + 1) + '</span>' +
        '<span><b>' + f[1] + '</b><small>' + f[2] + '</small></span></button>';
    }).join('');
  }

  function open()  { render(); scrim.hidden = false;
    requestAnimationFrame(function () { scrim.classList.add('on'); drawer.classList.add('on'); });
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
  drawer.addEventListener('click', function (e) {
    e.stopPropagation();
    var f = e.target.closest('[data-dr-entry]');
    if (f) {
      // Re-use the switcher's own button so app.js does the entry switch + restart.
      var btn = document.querySelector('.switcher [data-entry="' + f.getAttribute('data-dr-entry') + '"]');
      close();
      setTimeout(function () { btn.click(); }, 200);
      return;
    }
    if (e.target.id === 'drRestart') { close(); setTimeout(function () { $('restart').click(); }, 200); }
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
