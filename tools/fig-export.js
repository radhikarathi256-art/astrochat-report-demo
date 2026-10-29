#!/usr/bin/env node
/* Export the running prototype to a single self-contained HTML document that
   Figma's html_to_figma can swallow.

   Why a script and not a hand-written mock: the prototype paints almost
   everything from app.js at runtime, so the only honest source of truth for
   "what does this screen look like" is the screen itself, driven to the state
   we want and then read back out of the DOM. Thirty-odd frames is also too
   many to keep in step by hand - this can be re-run after any UI change.

   It drives headless Chrome over CDP (node 24 has WebSocket and fetch built
   in, so no dependencies), clicks each screen into its state, lifts the
   markup, then inlines every stylesheet and every image as a data URI because
   html_to_figma does not fetch external URLs.

   Usage: node tools/fig-export.js [--port 8811] [--out /tmp/fig-screens.html]
*/

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const argv = (k, d) => { const i = args.indexOf(k); return i < 0 ? d : args[i + 1]; };
const PORT = argv('--port', '8811');
const OUT = argv('--out', '/tmp/fig-screens.html');
const CDP_PORT = 9333;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

/* The Figma file's own screen size. Every flow page in Hackfest - 2026 is laid
   out on 360x800 frames at a 600px pitch, so exporting at the browser's 426x950
   would land screens that no label bar, connector or note in that file fits.
   The prototype is fluid, so it simply lays itself out at this width. */
const W = 360, H = 800;

/* ------------------------------------------------------------------ recipes

   `steps` are selectors clicked in order from a fresh load. `screen` is the
   element lifted afterwards. Anything needing a sheet open says so in `after`,
   which runs last so the sheet is captured on top of its own screen. */
const RECIPES = [
  // --- Today ---------------------------------------------------------------
  { id: 'today-day1-unanswered', group: 'Today', label: 'Today · day 1, check-in unanswered',
    steps: ['#scrim'], screen: '#today-a' },
  // The earn sheet is armed on a timer rather than on load, so this one waits.
  { id: 'today-day1-intro', group: 'Today', label: 'Today · day 1 + earn sheet',
    steps: [], wait: 3200, screen: '#today-a' },
  { id: 'today-day2', group: 'Today', label: 'Today · day 2, answered',
    steps: ['#scrim', '[data-day="2"]'], screen: '#today-a' },
  { id: 'today-day5', group: 'Today', label: 'Today · day 5',
    steps: ['#scrim', '[data-day="5"]'], screen: '#today-a' },

  // --- Chat ----------------------------------------------------------------
  { id: 'chat-partner', group: 'Chat', label: 'Chat · end of free chat, Partner offer',
    steps: ['#scrim', '[data-lead="partner"]', '[data-day="1"]', '#today-a .bnav [data-nav="experts"]'],
    screen: '#chat' },
  { id: 'chat-marriage', group: 'Chat', label: 'Chat · Marriage offer (match card)',
    steps: ['#scrim', '[data-lead="marriage"]', '[data-day="1"]', '#today-a .bnav [data-nav="experts"]'],
    screen: '#chat' },

  // --- Sell page -----------------------------------------------------------
  { id: 'report-partner', group: 'Report', label: 'Report sell page · Partner',
    steps: ['#scrim', '[data-lead="partner"]', '[data-day="2"]', '[data-tp="today"]', '.ex-tkt'],
    screen: '#report' },
  { id: 'report-marriage', group: 'Report', label: 'Report sell page · Marriage',
    steps: ['#scrim', '[data-lead="marriage"]', '[data-day="2"]', '[data-tp="today"]', '.ex-tkt'],
    screen: '#report' },
  { id: 'report-pay', group: 'Report', label: 'Report sell page + pay sheet',
    steps: ['#scrim', '[data-lead="partner"]', '[data-day="2"]', '[data-tp="today"]', '.ex-tkt', '#r2Cta'],
    screen: '#report' },

  // --- Match / free form ---------------------------------------------------
  { id: 'match-empty', group: 'Match', label: 'Free compatibility form · empty',
    steps: ['#scrim', '[data-lead="marriage"]', '[data-day="2"]', '[data-tp="today"]', '.ex-tkt', '#r2ViewSample'],
    screen: '#match' },

  // --- Sample --------------------------------------------------------------
  { id: 'sample-en', group: 'Sample', label: 'Sample reader · English',
    steps: ['#scrim', '[data-lead="partner"]', '[data-day="2"]', '[data-tp="today"]', '.ex-tkt', '#r2ViewSample'],
    screen: '#sample' },

  // --- History -------------------------------------------------------------
  { id: 'history-offer', group: 'History', label: 'History · with offer card',
    steps: ['#scrim', '[data-lead="partner"]', '[data-day="1"]', '#today-a .bnav [data-nav="timeline"]'],
    screen: '#timeline' },
  { id: 'history-plain', group: 'History', label: 'History · no offer',
    steps: ['#scrim', '[data-day="3"]', '#today-a .bnav [data-nav="timeline"]'],
    screen: '#timeline' },

  // --- My Reports ----------------------------------------------------------
  { id: 'mine-empty', group: 'Reports', label: 'My Reports · empty shelf',
    steps: ['#scrim', '#today-a .bnav [data-nav="mine"]'], screen: '#mine' },
  // Paying lands on the timeline screen, so the way back to the shelf is that
  // screen's own nav bar - `.screen.on` was resolving before the transition
  // had moved the class.
  { id: 'mine-one', group: 'Reports', label: 'My Reports · one bought',
    steps: ['#scrim', '#today-a .bnav [data-nav="mine"]', '#mineBody .pcard', '#r2Cta', '#paySubmit',
            '#timeline .bnav [data-nav="mine"]'],
    screen: '#mine' },

  // --- Read ----------------------------------------------------------------
  { id: 'read-top', group: 'Read', label: 'Bought report · top',
    steps: ['#scrim', '#today-a .bnav [data-nav="mine"]', '#mineBody .pcard', '#r2Cta', '#paySubmit',
            '#timeline .bnav [data-nav="mine"]', '#mineBody .mine-row'],
    screen: '#read' },

  // --- Menu ----------------------------------------------------------------
  { id: 'menu', group: 'Menu', label: 'Menu',
    steps: ['#scrim', '#today-a .head .ic-btn[data-go="menu"]'], screen: '#menu' },

  // --- Language ------------------------------------------------------------
  // The language chip belongs to the sample reader, not the form.
  { id: 'lang-sheet', group: 'Sheets', label: 'Sample + language sheet',
    steps: ['#scrim', '[data-lead="partner"]', '[data-day="2"]', '[data-tp="today"]', '.ex-tkt',
            '#r2ViewSample', '#sample .rp-lang'],
    screen: '#sample' }
];

/* ------------------------------------------------------------------- CDP */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function cdpTarget() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
      const list = await r.json();
      const page = list.find(t => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch (e) { /* chrome not up yet */ }
    await sleep(200);
  }
  throw new Error('Chrome never opened a debug target');
}

function connect(url) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(url);
    const waiting = new Map();
    let id = 0;
    ws.onopen = () => res({
      send(method, params) {
        const n = ++id;
        ws.send(JSON.stringify({ id: n, method, params: params || {} }));
        return new Promise((ok, no) => waiting.set(n, { ok, no }));
      },
      close() { ws.close(); }
    });
    ws.onerror = rej;
    ws.onmessage = ev => {
      const m = JSON.parse(ev.data);
      if (m.id && waiting.has(m.id)) {
        const { ok, no } = waiting.get(m.id);
        waiting.delete(m.id);
        m.error ? no(new Error(m.error.message)) : ok(m.result);
      }
    };
  });
}

async function evaluate(cdp, expr) {
  const r = await cdp.send('Runtime.evaluate', {
    expression: expr, returnByValue: true, awaitPromise: true
  });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + expr.slice(0, 120));
  return r.result.value;
}

/* The prototype wires everything through one delegated listener, so a real
   bubbling MouseEvent is the only thing that counts as a tap. */
const CLICK = sel => `(function(){var e=document.querySelector(${JSON.stringify(sel)});` +
  `if(!e)return 'MISS ' + ${JSON.stringify(sel)};` +
  `e.dispatchEvent(new MouseEvent('click',{bubbles:true}));return 'ok';})()`;

/* --------------------------------------------------------------- assets */
const assetCache = new Map();
const SHRUNK = fs.mkdtempSync('/tmp/figassets-');

/* Figma caps the upload at 50MB and every frame carries its own copy of each
   data URI, so a 3.4MB book cover that renders 104px wide is paid for again in
   every frame that shows it. Cap the long edge at 760 - twice the 360pt screen
   - which is past anything these assets are displayed at. sips ships with
   macOS, so this needs nothing installed. */
function shrink(file, ext) {
  if (fs.statSync(file).size < 120 * 1024) return file;
  const to = path.join(SHRUNK, path.basename(file));
  try {
    require('child_process').execFileSync('sips', ['-Z', '560', file, '--out', to], { stdio: 'ignore' });
    return fs.existsSync(to) && fs.statSync(to).size < fs.statSync(file).size ? to : file;
  } catch (e) { return file; }
}

function dataURI(rel) {
  const clean = rel.split('?')[0].replace(/^\.?\//, '');
  if (assetCache.has(clean)) return assetCache.get(clean);
  const file = path.join(ROOT, clean);
  if (!fs.existsSync(file)) { assetCache.set(clean, null); return null; }
  const ext = path.extname(clean).toLowerCase();
  const mime = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif' }[ext];
  if (!mime) { assetCache.set(clean, null); return null; }  // mp4 and friends
  const src = ext === '.svg' ? file : shrink(file, ext);
  const uri = `data:${mime};base64,${fs.readFileSync(src).toString('base64')}`;
  assetCache.set(clean, uri);
  return uri;
}

/* Every assets/... reference, in markup or in CSS, swapped for its bytes. */
function inlineAssets(text) {
  return text.replace(/(assets\/[A-Za-z0-9._-]+)(\?v=[0-9]+)?/g, (m, rel) => dataURI(rel) || m);
}

/* mobile.css only speaks inside a phone-width media query, but the export
   document is a wide board of phones, so the query would never fire and every
   mobile rule would be lost. Unwrap it by matching braces. */
function unwrapPhoneQuery(css) {
  const marker = /@media\s*\(max-width:\s*600px\)\s*\{/g;
  let out = css, m;
  while ((m = marker.exec(out))) {
    let i = m.index + m[0].length, depth = 1;
    while (i < out.length && depth) {
      if (out[i] === '{') depth++;
      else if (out[i] === '}') depth--;
      i++;
    }
    out = out.slice(0, m.index) + out.slice(m.index + m[0].length, i - 1) + out.slice(i);
    marker.lastIndex = m.index;
  }
  return out;
}

/* ----------------------------------------------------------------- main */
(async function main() {
  const profile = fs.mkdtempSync('/tmp/figexport-');
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check',
    '--hide-scrollbars', `--window-size=${W},${H}`, 'about:blank'
  ], { stdio: 'ignore' });

  let cdp;
  try {
    cdp = await connect(await cdpTarget());
    await cdp.send('Runtime.enable');
    await cdp.send('Page.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride',
      { width: W, height: H, deviceScaleFactor: 2, mobile: true });

    /* Figma rejected a 47MB document outright, so the board ships in batches.
       --only takes a comma-separated list of recipe ids or group names. */
    const only = (argv('--only', '') || '').split(',').filter(Boolean);
    const list = only.length
      ? RECIPES.filter(r => only.includes(r.id) || only.includes(r.group))
      : RECIPES;

    const captured = [];
    for (const r of list) {
      await cdp.send('Page.navigate', { url: `http://localhost:${PORT}/?x=${Date.now()}` });
      await sleep(700);
      for (const s of r.steps) {
        const res = await evaluate(cdp, CLICK(s));
        if (String(res).startsWith('MISS')) console.warn(`  ! ${r.id}: ${res}`);
        // Paying runs a success animation before it routes anywhere, so the
        // next tap has nothing to hit until it finishes.
        await sleep(s === '#paySubmit' ? 2600 : 260);
      }
      await sleep(r.wait || 320);
      /* Figma gets layers, not film. Headless Chrome has no H.264, so grabbing
         a real poster frame off the <video> is not available either - each
         film is swapped for the still that was cut from it, which inlineAssets
         then turns into bytes like any other image. */
      await evaluate(cdp, `(function(){
        var still = { 'r2-hero.mp4':'assets/r2-hero.png',
                      'hero-marriage.mp4':'assets/bg-marriage.jpg',
                      'hero-career.mp4':'assets/bg-career.jpg' };
        document.querySelectorAll('video').forEach(function(v){
          var src = (v.currentSrc || v.src || '').split('/').pop().split('?')[0];
          var img = document.createElement('img');
          img.src = still[src] || 'assets/r2-hero.png';
          img.className = v.className;
          img.setAttribute('style', 'width:100%;height:100%;object-fit:cover;display:block');
          v.parentNode.replaceChild(img, v);
        });
      })()`);
      const html = await evaluate(cdp,
        `(function(){var e=document.querySelector(${JSON.stringify(r.screen)});` +
        `return e?e.outerHTML:'';})()`);
      // Sheets and the scrim live outside the screen, so they come along separately.
      const over = await evaluate(cdp,
        `(function(){var o='';document.querySelectorAll('.sheet.on,#scrim.on').forEach(function(n){o+=n.outerHTML});return o;})()`);
      if (!html) { console.warn(`  ! ${r.id}: empty capture`); continue; }
      captured.push({ ...r, html, over });
      console.log(`  captured ${r.id}${over ? ' (+overlay)' : ''}`);
    }

    const css = unwrapPhoneQuery(
      fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8') + '\n' +
      fs.readFileSync(path.join(ROOT, 'mobile.css'), 'utf8'));

    const board = captured.map(c => `
<div class="fig-screen" data-name="${c.group} / ${c.label}">
  <div class="fig-inner">${c.html}${c.over}</div>
</div>`).join('\n');

    const doc = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
${css}
/* Board chrome. The phone is a plain clipped box so every frame lands in
   Figma at exactly the device size, and the screen inside it is forced
   visible because the prototype only ever shows one at a time. */
html,body{margin:0;padding:0;background:#fff;width:auto;height:auto;overflow:visible}
body{display:flex;flex-wrap:wrap;gap:64px;padding:64px;align-items:flex-start}
.fig-screen{width:${W}px;height:${H}px;position:relative;overflow:hidden;background:#fff;flex:none}
.fig-inner{position:absolute;inset:0}
.fig-screen .screen{position:absolute!important;inset:0!important;display:flex!important;
  opacity:1!important;visibility:visible!important;transform:none!important;z-index:1}
.fig-screen #scrim,.fig-screen .sheet{position:absolute!important}
.fig-screen .sheet{transform:none!important;opacity:1!important;visibility:visible!important}
.fig-screen .scroll{overflow:hidden!important}
.fig-screen *{animation:none!important;transition:none!important}
</style></head><body>
${board}
</body></html>`;

    fs.writeFileSync(OUT, inlineAssets(doc));
    const mb = (fs.statSync(OUT).size / 1048576).toFixed(1);
    console.log(`\n${captured.length}/${list.length} frames -> ${OUT} (${mb} MB)`);
    fs.writeFileSync(OUT.replace(/\.html$/, '.names.json'),
      JSON.stringify(captured.map(c => `${c.group} / ${c.label}`), null, 2));
  } finally {
    if (cdp) cdp.close();
    chrome.kill();
  }
})().catch(e => { console.error(e); process.exit(1); });
