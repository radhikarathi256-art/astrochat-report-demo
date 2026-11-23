(() => {
  'use strict';
  const FLOWS = window.FLOWS || [];
  const W = 360, H = 800;                       // Figma screen size
  const $ = s => document.querySelector(s);
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));

  // index every screen: id -> [{flow, screen}]
  const flowById = {}, where = {};
  FLOWS.forEach(f => {
    flowById[f.id] = f;
    f.byId = {};
    f.screens.forEach(s => { f.byId[s.id] = s; (where[s.id] = where[s.id] || []).push(f); });
    f.out = {};
    f.edges.forEach(e => { (f.out[e.f] = f.out[e.f] || []).push(e); });
  });
  const screenOf = (fid, sid) => (flowById[fid] && flowById[fid].byId[sid]) || null;

  const state = { flow: null, screen: null, hist: [], timer: null, reader: false };
  const vp = $('#vp'), phone = $('#phone');

  // ---------- layout ----------
  const mobile = () => matchMedia('(max-width: 860px)').matches;
  function size() {
    if (mobile()) { phone.style.width = ''; phone.style.height = ''; return; }
    const st = $('#stage').getBoundingClientRect();
    const h = Math.max(420, Math.min(st.height - 48, 860));
    let w = h * W / H;
    if (w > st.width - 48) w = st.width - 48;
    phone.style.width = Math.round(w) + 'px';
    phone.style.height = Math.round(w * H / W) + 'px';
  }
  const scale = () => vp.clientWidth / W;

  // ---------- render ----------
  function render(dir) {
    clearTimeout(state.timer);
    const f = flowById[state.flow], s = f.byId[state.screen];
    const k = scale();
    vp.querySelectorAll('.scr, .pin, .autobar, .hot').forEach(n => n.remove());
    if (!state.reader) vp.querySelectorAll('iframe').forEach(n => n.remove());

    const scr = el('div', 'scr' + (dir ? ' enter' : ''));
    const layer = el('div', 'layer');
    const img = el('img', 'shot');
    img.src = s.src; img.alt = s.n; img.draggable = false;
    img.width = 720; img.height = Math.round(s.h * 2);
    layer.appendChild(img);
    scr.appendChild(layer);
    vp.appendChild(scr);

    const edges = (f.out[s.id] || []);
    const sticky = s.sticky;
    let top = null, bot = null;
    if (sticky) {
      if (sticky.top > 0) {
        top = el('div', 'pin top');
        top.style.height = (sticky.top * k) + 'px';
        top.style.backgroundImage = `url("${s.src}")`;
        top.style.backgroundPosition = '0 0';
        vp.appendChild(top);
      }
      if (sticky.bh > 0) {
        bot = el('div', 'pin bot');
        bot.style.height = (sticky.bh * k) + 'px';
        bot.style.backgroundImage = `url("${s.src}")`;
        bot.style.backgroundPosition = `0 ${-sticky.by * k}px`;
        vp.appendChild(bot);
      }
    }

    // report screens: whole screen opens the live reader (other hotspots sit above it)
    if (s.reader) {
      const b = el('button', 'hot reader');
      b.type = 'button'; b.setAttribute('aria-label', 'Open the full report');
      Object.assign(b.style, { left: 0, top: 0, width: '100%', height: (s.h * k) + 'px', borderRadius: 0 });
      b.addEventListener('click', openReader);
      layer.appendChild(b);
    }

    let autoEdge = null;
    edges.forEach(e => {
      if (e.kind === 'auto' && !autoEdge) autoEdge = e;
      if (!e.r) return;
      const [x, y, w, h] = e.r;
      const b = el('button', 'hot');
      b.type = 'button'; b.title = e.l; b.setAttribute('aria-label', e.l);
      let host = layer, yy = y;
      if (bot && y >= sticky.by) { host = bot; yy = y - sticky.by; }
      else if (top && y + h <= sticky.top) { host = top; }
      Object.assign(b.style, { left: (x * k) + 'px', top: (yy * k) + 'px', width: (w * k) + 'px', height: (h * k) + 'px' });
      b.addEventListener('click', ev => { ev.stopPropagation(); go(e.t, e); });
      host.appendChild(b);
    });

    // a tap anywhere without a hotspot flashes the tap areas, so testers can find them
    scr.addEventListener('click', ev => {
      if (ev.target.closest('.hot')) return;
      vp.classList.remove('flash'); void vp.offsetWidth; vp.classList.add('flash');
      setTimeout(() => vp.classList.remove('flash'), 750);
    });

    if (autoEdge && !state.reader) {
      const ms = Math.max(1200, Math.min(3000, autoEdge.auto || 2600));
      const bar = el('div', 'autobar');
      vp.appendChild(bar);
      bar.animate([{ width: '0%' }, { width: '100%' }], { duration: ms, easing: 'linear', fill: 'forwards' });
      state.timer = setTimeout(() => go(autoEdge.t, autoEdge), ms);
    }

    renderPanel();
    renderNav();
    $('#crumb').innerHTML = `${esc(f.group)} · <b>${esc(f.title)}</b> · ${esc(s.n)}`;
    document.title = `${s.n} · AstroChat Reports Demo`;
    const hash = `#${f.id}/${s.id}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
    preload(edges);
  }

  function preload(edges) {
    edges.forEach(e => {
      const fs = where[e.t]; if (!fs) return;
      const s = (flowById[state.flow].byId[e.t]) || fs[0].byId[e.t];
      const i = new Image(); i.src = s.src;
    });
  }

  function stepHTML(e, primary) {
    const k = e.kind === 'auto' ? 'Auto' : e.kind === 'tap' ? 'Tap' : 'Next';
    return `<button type="button" class="step${primary ? ' primary' : ''}" data-to="${esc(e.t)}" data-l="${esc(e.l)}">
      <span class="k${e.kind === 'auto' ? ' auto' : ''}">${k}</span>
      <span class="l">${esc(e.l)}</span>
      <span class="t">→ ${esc(e.tn || e.t)}</span></button>`;
  }

  function panelHTML() {
    const f = flowById[state.flow], s = f.byId[state.screen];
    const edges = f.out[s.id] || [];
    let h = `<p class="ptitle">${esc(s.n)}</p><p class="pflow"><b>${esc(f.title)}</b><br>${esc(f.note || '')}</p>`;
    if (s.reader) h += `<button type="button" class="step primary" data-reader><span class="k">Live report</span><span class="l">Open the full report</span><span class="t">Scroll the real report page · Buy goes to the pay sheet</span></button>`;
    h += `<p class="phead">Next steps</p>`;
    h += edges.length ? edges.map((e, i) => stepHTML(e, i === 0 && !s.reader)).join('') : `<p class="none">End of this flow. Pick another flow, or restart.</p>`;
    h += `<div class="navrow"><button type="button" class="tbtn" data-back ${state.hist.length ? '' : 'disabled'}>Back</button><button type="button" class="tbtn" data-restart>Restart flow</button></div>`;
    h += `<p class="phead">Screens in this flow</p><div class="thumbs">` + f.screens.map(x =>
      `<button type="button" class="thumb" data-jump="${esc(x.id)}" ${x.id === s.id ? 'aria-current="true"' : ''}><img loading="lazy" src="${esc(x.src)}" alt=""><span>${esc(x.n)}</span></button>`).join('') + `</div>`;
    return h;
  }
  function renderPanel() {
    const h = panelHTML();
    $('#panel').innerHTML = h;
    $('#dPanel').innerHTML = h;
  }

  function navHTML() {
    let h = '', g = null;
    FLOWS.forEach(f => {
      if (f.group !== g) { g = f.group; h += `<div class="ngroup">${esc(g)}</div>`; }
      h += `<button type="button" class="nflow" data-flow="${esc(f.id)}" ${f.id === state.flow ? 'aria-current="true"' : ''}><span>${esc(f.title)}</span><small>${f.screens.length}</small></button>`;
    });
    return h;
  }
  let navFlow = null;
  function renderNav() {
    if (navFlow === state.flow) return;
    navFlow = state.flow;
    const h = navHTML();
    $('#nav').innerHTML = h;
    $('#dNav').innerHTML = `<div class="nav-in">${h}</div>`;
  }

  // ---------- navigation ----------
  function show(fid, sid, push, dir) {
    if (!screenOf(fid, sid)) return false;
    if (push && state.flow) state.hist.push([state.flow, state.screen]);
    state.flow = fid; state.screen = sid;
    render(dir !== false);
    return true;
  }
  function go(sid) {
    closeReader(true);
    const cur = flowById[state.flow];
    if (cur.byId[sid]) return show(cur.id, sid, true);
    const fs = where[sid];
    if (fs) return show(fs[0].id, sid, true);
  }
  function back() {
    if (state.reader) return closeReader();
    const p = state.hist.pop();
    if (p) show(p[0], p[1], false);
  }
  function startFlow(fid) {
    const f = flowById[fid]; if (!f) return;
    closeReader(true);
    state.hist = [];
    show(fid, f.start || f.screens[0].id, false);
  }

  // ---------- live reader ----------
  function openReader() {
    const s = flowById[state.flow].byId[state.screen];
    if (!s.reader) return;
    clearTimeout(state.timer);
    state.reader = true;
    vp.querySelectorAll('iframe').forEach(n => n.remove());
    const fr = el('iframe');
    fr.title = 'Report'; fr.src = `reports.html?embed=1#${s.reader.hash}`;
    vp.appendChild(fr);
    closeDrawer();
  }
  function closeReader(silent) {
    if (!state.reader) return;
    state.reader = false;
    vp.querySelectorAll('iframe').forEach(n => n.remove());
    if (!silent) render(false);
  }
  addEventListener('message', ev => {
    const m = ev.data;
    if (!m || m.src !== 'astro-reader') return;
    if (m.type === 'back') closeReader();
    if (m.type === 'buy') {
      const s = flowById[state.flow].byId[state.screen];
      const t = s && s.reader && s.reader.buy;
      if (t) go(t); else closeReader();
    }
  });

  // ---------- events ----------
  function onClick(ev) {
    const t = ev.target.closest('button'); if (!t) return;
    if (t.dataset.flow) { startFlow(t.dataset.flow); closeDrawer(); }
    else if (t.dataset.to) { go(t.dataset.to); closeDrawer(); }
    else if (t.dataset.jump) { closeReader(true); show(state.flow, t.dataset.jump, true); closeDrawer(); }
    else if ('reader' in t.dataset) openReader();
    else if ('back' in t.dataset) { back(); }
    else if ('restart' in t.dataset) { startFlow(state.flow); closeDrawer(); }
  }
  ['#panel', '#nav', '#drawer'].forEach(s => $(s).addEventListener('click', onClick));

  $('#restart').addEventListener('click', () => startFlow(state.flow));
  const tap = $('#tapToggle');
  tap.addEventListener('click', () => {
    const on = document.body.classList.toggle('show-taps');
    tap.setAttribute('aria-pressed', on);
  });

  const drawer = $('#drawer');
  function openDrawer() { drawer.hidden = false; }
  function closeDrawer() { drawer.hidden = true; }
  $('#fab').addEventListener('click', openDrawer);
  drawer.addEventListener('click', ev => { if (ev.target.closest('[data-close]')) closeDrawer(); });

  addEventListener('keydown', ev => {
    if (ev.target.closest('input, textarea')) return;
    if (ev.key === 'Escape') { if (!drawer.hidden) closeDrawer(); else back(); }
    if (ev.key === 'ArrowRight') {
      const e = (flowById[state.flow].out[state.screen] || [])[0];
      if (e) go(e.t);
    }
    if (ev.key === 'ArrowLeft') back();
  });

  let rt;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { size(); if (!state.reader) render(false); }, 120); });
  addEventListener('hashchange', fromHash);

  function fromHash() {
    const [fid, sid] = decodeURIComponent(location.hash.slice(1)).split('/');
    if (fid === state.flow && sid === state.screen) return;
    if (flowById[fid]) {
      closeReader(true);
      if (sid && screenOf(fid, sid)) show(fid, sid, !!state.flow);
      else startFlow(fid);
      return true;
    }
  }

  size();
  if (!fromHash()) startFlow(FLOWS[0].id);
})();
