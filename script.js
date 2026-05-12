(function() {
  const splash = document.getElementById('splash');

  function animateIn(el, delay) {
    if (!el) return;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'none';
    // Force reflow then animate
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`;
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }

  setTimeout(() => {
    const canvas   = document.getElementById('canvas-wrap');
    const hamBtn   = document.getElementById('ham-btn');
    const logoWrap = document.getElementById('hero-logo-wrap');
    const heroName = document.querySelector('.hero-name');
    const heroTitle= document.querySelector('.hero-title');
    const heroSub  = document.querySelector('.hero-sub');
    const heroCta = document.getElementById('hero-cta');

    // Fade out splash
    splash.classList.add('fade-out');

    // Fade in canvas
    if (canvas) canvas.style.opacity = '1';

    // Staggered hero reveals
    animateIn(logoWrap,  0.05);
    animateIn(heroName,  0.2);
    animateIn(heroTitle, 0.38);
    animateIn(heroSub,   0.54);
    animateIn(heroCta,   0.82);

    // Hamburger last
    setTimeout(() => { if (hamBtn) hamBtn.style.opacity = '1'; }, 700);

    // Remove splash from DOM
    setTimeout(() => { splash.style.display = 'none'; }, 820);
  }, 1800);
})();

/* ================================================================ */

// ══════════════════════════════════════════════════════════════════════
// DEPTH MAP — each section lives at a random 3D distance
// depth > 1 = closer (canvas zoomed in, text bigger)
// depth < 1 = farther (canvas zoomed out, text smaller)
// ══════════════════════════════════════════════════════════════════════
const SECTION_DEPTHS = {
  'hero-section': 1.0,
  's-index':    1.85,
  's-navigation':    1.60,
  's-brand-story':      0.68,
  's-search':      1.38,
  's-improvement-04':  1.20,
  's-product-detail':        0.48,
  's-documents':      1.72,
  's-filtering':      2.05,
  's-summary':   0.82,
};

// Wrap every section's direct children in a .sc-inner for 3D transform
document.querySelectorAll('section').forEach(sec => {
  const id = sec.id || sec.className.split(' ')[0];
  const depth = SECTION_DEPTHS[sec.id] || SECTION_DEPTHS[sec.className.split(' ')[0]] || 1.0;
  sec.dataset.depth = depth;
  const wrapper = document.createElement('div');
  wrapper.className = 'sc-inner';
  // For hero, make sc-inner fill the section so absolute children position correctly
  if (sec.classList.contains('hero-section')) {
    wrapper.style.cssText = 'position:relative; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;';
  }
  while (sec.firstChild) wrapper.appendChild(sec.firstChild);
  sec.appendChild(wrapper);
});

// ── Canvas ──────────────────────────────────────────────────────────
const canvas = document.getElementById('wave-canvas');
const ctx = canvas.getContext('2d');
const wrap = document.getElementById('canvas-wrap');
let W, H;

function resize() {
  W = canvas.width = Math.round(window.innerWidth * 1.4);
  H = canvas.height = Math.round(window.innerHeight * 1.4);
}
resize();
window.addEventListener('resize', resize);

// ══════════════════════════════════════════════════════════════════════
// RIBBON WORLD SYSTEM
// Each world has 1-4 "ribbons" — tight bundles of parallel wavy lines
// with animated depth-of-field focus sweep and scattered glow particles
// ══════════════════════════════════════════════════════════════════════

const P = { // color palette [r,g,b]
  blue:  [73,108,232],  bblue:[53,87,214],  ice:[131,166,255],
  purp:  [133,102,223], pink:[215,113,178],  lpurp:[171,135,242],
  red:   [207,74,82],  dred:[176,76,85],
  teal:  [77,167,181], grn:[53,153,111],
  amb:   [201,131,23],
};

const LINE_OPACITY_MULTIPLIER = 0.22;
const LINE_SHADOW_MULTIPLIER = 0.16;

// Ribbon: n lines, spHz=spacing as fraction of H, cy=center(0-1),
// angle=degrees, f/s/p/amp/f2/s2/p2/r2=wave params,
// col=[r,g,b], al=max alpha, lw=focal line width, fOff=focus phase offset, dots=bool
function R(n,spHz,cy,angle, f,s,p,amp,col,al,lw,fOff=0,dots=true, f2=0,s2=0,p2=0,r2=0) {
  return {n,spHz,cy,angle,f,s,p,amp,col,al,lw,fOff,dots,f2,s2,p2,r2};
}

const WORLDS = [
  // 0 HERO — calm deep-space ribbon, gently angled, more lines
  [R(32,0.010,0.50,-8,  0.0007,0.07,0.0, 0.14,P.bblue,0.80,0.8,0.0,false, 0.0004,0.04,1.2,0.30)],

  // 1 VERDICT — two grand purple sweeps
  [R(30,0.016,0.36,-18, 0.0005,0.05,0.0, 0.22,P.purp,0.85,1.0,0.0,false, 0.0003,0.03,1.5,0.30),
   R(24,0.013,0.68, 14, 0.0004,0.04,2.5, 0.20,P.pink,0.70,0.8,1.8,false)],

  // 2 SEARCH / PRODUCT FINDING — two crossing dense red ribbons
  [R(28,0.008,0.40, 12, 0.0014,0.25,0.0, 0.09,P.dred,0.72,0.5,0.5,false),
   R(24,0.008,0.62,-10, 0.0016,0.22,2.0, 0.08,P.red,0.60,0.4,1.2,false)],

  // 3 OVERVIEW — three precise parallel ribbons
  [R(22,0.006,0.28, 0,  0.0014,0.04,0.0, 0.020,P.ice,0.68,0.4,0.0,false),
   R(22,0.006,0.52, 0,  0.0014,0.04,0.8, 0.020,P.blue,0.62,0.4,1.2,false),
   R(18,0.006,0.74, 0,  0.0014,0.04,1.6, 0.020,P.ice,0.50,0.3,2.4,false)],

  // 4 PRODUCT FINDING — three turbulent interference ribbons
  [R(26,0.012,0.30, 22, 0.0018,0.24,0.0, 0.13,P.blue,0.75,0.7,0.0,false, 0.0025,0.17,1.2,0.65),
   R(22,0.010,0.55,-16, 0.0022,0.20,1.5, 0.11,P.purp,0.65,0.6,1.5,false,0.0016,0.22,0.8,0.55),
   R(18,0.009,0.76, 8,  0.0013,0.27,3.0, 0.12,P.blue,0.55,0.5,3.0,false)],

  // 5 SPECS — two clean teal ribbons
  [R(28,0.010,0.38,-6, 0.0009,0.09,0.0, 0.08,P.teal,0.78,0.7,0.0,false, 0.0004,0.04,1.0,0.22),
   R(24,0.010,0.65, 8, 0.0009,0.09,1.5, 0.08,P.ice,0.62,0.5,2.0,false)],

  // 6 CERTS — two ribbons crossing
  [R(26,0.012,0.45, 20, 0.0012,0.14,0.0, 0.10,P.amb,0.72,0.7,0.0,false),
   R(24,0.012,0.55,-22, 0.0012,-0.14,1.5,0.10,P.purp,0.65,0.6,1.5,false)],

  // 7 COMPANY AGE — vast slow crimson ribbon
  [R(22,0.020,0.52, 3,  0.0003,0.03,0.0, 0.30,P.dred,0.80,1.2,0.0,false, 0.0001,0.015,2.0,0.22)],

  // 8 BRAND — two elegant S-curve ribbons
  [R(30,0.014,0.38,-10, 0.0006,0.10,0.0, 0.15,P.pink,0.82,0.9,0.0,false, 0.0003,0.06,1.8,0.30),
   R(24,0.012,0.68, 12, 0.0008,0.12,2.0, 0.13,P.purp,0.70,0.7,2.5,false)],

  // 9 PAGE SPEED — four fast thin green streams
  [R(20,0.007,0.22, 0, 0.0028,0.58,0.0, 0.032,P.grn,0.72,0.3,0.0,false),
   R(20,0.007,0.42, 0, 0.0028,0.55,0.5, 0.032,P.teal,0.65,0.3,1.0,false),
   R(18,0.007,0.62, 0, 0.0028,0.60,1.0, 0.032,P.grn,0.60,0.3,2.0,false),
   R(16,0.007,0.80, 0, 0.0028,0.57,1.5, 0.032,P.teal,0.50,0.3,3.0,false)],

  // 10 OTHER FINDINGS — two calm organized blue ribbons
  [R(26,0.009,0.36,-8, 0.0008,0.08,0.0, 0.10,P.blue,0.72,0.6,0.0,false, 0.0003,0.04,1.4,0.22),
   R(22,0.009,0.64, 6, 0.0008,0.08,2.0, 0.09,P.ice,0.62,0.5,2.0,false)],
];

// Background gradient per world [top-rgb, mid-rgb, bot-rgb]
const WORLD_BG = [
  [[250,250,252], [250,250,253],[249,250,252]],
  [[250,249,252], [250,250,253],[249,250,252]],  // 1 improvement index
  [[252,250,250], [251,250,250], [250,249,250]], // 2 search / product finding
  [[249,250,253], [250,250,253], [249,250,252]],
  [[249,250,253], [249,250,253],[249,250,252]],
  [[249,251,251],[250,251,251],[249,250,251]],
  [[251,250,250],[250,249,251],[250,249,251]],
  [[252,250,250], [251,250,250], [250,249,250]],  // 7 age
  [[250,249,252],[250,250,252],[249,249,251]],      // 8 brand
  [[249,251,250],[250,251,250],[249,250,250]],      // 9 speed
  [[249,250,253],[250,250,253],[249,249,252]],      // 10 insights
];

let prevWorldIdx = 0, currWorldIdx = 0, worldBlend = 1.0;
let t = 0, currentDepth = 1.0, targetDepth = 1.0;

// ── Draw a single ribbon ───────────────────────────────────────────────
function drawRibbon(rib, worldAlpha, t, depth) {
  const spacing = rib.spHz * H;
  const n = rib.n;
  const cyPx = rib.cy * H;
  const angleRad = rib.angle * Math.PI / 180;
  const cosA = Math.cos(angleRad), sinA = Math.sin(angleRad);
  const cx = W / 2;

  // Animate focal line slowly and smoothly through the bundle
  const focalPos = (n - 1) * (0.5 + 0.42 * Math.sin(t * 0.18 + rib.fOff));

  function waveY(x) {
    const a = rib.amp * H * depth;
    const f = rib.f / Math.sqrt(depth);
    let y = Math.sin(x * f + t * rib.s + rib.p) * a;
    if (rib.f2) y += Math.sin(x * rib.f2 / Math.sqrt(depth) + t * rib.s2 + rib.p2) * a * rib.r2;
    return y;
  }

  function getPoint(x, lineIdx) {
    const yOff = (lineIdx - (n - 1) / 2) * spacing;
    const baseX = x - cx;
    const baseY = cyPx + yOff + waveY(x) - cyPx;
    return [cx + baseX * cosA - baseY * sinA, cyPx + baseX * sinA + baseY * cosA];
  }

  const [r, gc, b] = rib.col;

  // Draw each line with fully continuous blur/alpha — no hard thresholds, no jumping
  for (let i = 0; i < n; i++) {
    const dist = Math.abs(i - focalPos);
    // Smooth alpha falloff
    const a = rib.al * worldAlpha * Math.max(0.03, 1 - dist * 0.052) * LINE_OPACITY_MULTIPLIER;
    if (a < 0.02) continue;
    // Continuous line width
    const lw = rib.lw * Math.max(0.18, 1 - dist * 0.038);
    // Continuous blur: 0 at focal line, grows smoothly outward
    const blur = Math.min(dist * 3.2, 24);

    const step = dist > 10 ? 7 : dist > 5 ? 5 : 3;

    ctx.beginPath();
    let first = true;
    for (let x = -W * 0.1; x <= W * 1.1; x += step) {
      const [px, py] = getPoint(x, i);
      first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      first = false;
    }

    ctx.shadowColor = `rgba(${r},${gc},${b},${(a * LINE_SHADOW_MULTIPLIER).toFixed(3)})`;
    ctx.shadowBlur = blur < 2 ? 5 : blur; // focal lines get a crisp inner glow
    ctx.strokeStyle = `rgba(${r},${gc},${b},${a.toFixed(3)})`;
    ctx.lineWidth = lw;
    ctx.stroke();
  }

  ctx.shadowBlur = 0;
}

function drawWorldFull(worldIdx, alpha, depth) {
  WORLDS[worldIdx].forEach(rib => drawRibbon(rib, alpha, t, depth));
}

function drawWaves(depth) {
  ctx.clearRect(0, 0, W, H);

  // Blend background
  const bgA = WORLD_BG[prevWorldIdx], bgB = WORLD_BG[currWorldIdx];
  const bp = worldBlend;
  function blendC(i, j) { return Math.round(bgA[i][j] + (bgB[i][j] - bgA[i][j]) * bp); }
  const d = Math.min(depth * 0.5, 1);
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0,   `rgb(${blendC(0,0)+Math.round(d*8)},${blendC(0,1)+Math.round(d*5)},${blendC(0,2)+Math.round(d*14)})`);
  grad.addColorStop(0.5, `rgb(${blendC(1,0)+Math.round(d*5)},${blendC(1,1)+Math.round(d*3)},${blendC(1,2)+Math.round(d*10)})`);
  grad.addColorStop(1,   `rgb(${blendC(2,0)+Math.round(d*3)},${blendC(2,1)+Math.round(d*2)},${blendC(2,2)+Math.round(d*7)})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  ctx.lineCap = 'round';

  if (worldBlend < 1) drawWorldFull(prevWorldIdx, (1 - worldBlend) * 0.9, depth);
  drawWorldFull(currWorldIdx, worldBlend, depth);

  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';
  ctx.globalAlpha = 1;
}
const allSections = [...document.querySelectorAll('section')];

function updateOverflowSections() {
  allSections.forEach(sec => {
    sec.classList.toggle('is-overflowing', sec.scrollHeight > sec.clientHeight + 1);
  });
}

function updateSectionEffects() {
  allSections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    const dist = Math.abs(rect.left);
    const focus = Math.max(0, 1 - dist / (window.innerWidth * 0.75));

    const inner = sec.querySelector('.sc-inner');
    if (!inner) return;

    inner.style.transform = 'scale(1)';
    inner.style.filter = 'none';
    inner.style.opacity = '1';

    // reveal children once section is close enough
    if (focus > 0.15) {
      sec.querySelectorAll('.reveal:not(.shown)').forEach(el => el.classList.add('shown'));
      sec.querySelectorAll('.rule:not(.shown)').forEach(el => el.classList.add('shown'));
    }
  });
}

// ── Dominant depth for canvas ─────────────────────────────────────────
function getDominantDepth() {
  const hcenter = window.innerWidth / 2;
  let best = 0, bestDepth = 1.0;
  allSections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    const secCenter = rect.left + rect.width / 2;
    const dist = Math.abs(secCenter - hcenter);
    const score = Math.max(0, 1 - dist / window.innerWidth);
    if (score > best) { best = score; bestDepth = parseFloat(sec.dataset.depth) || 1.0; }
  });
  return bestDepth;
}

// ── Transform-based snap scroll ───────────────────────────────────────
// Since body/html have overflow:hidden, we translate .scroll-root instead
const scrollRoot = document.querySelector('.scroll-root');
const flash = document.getElementById('snap-flash');

let virtualX    = 0;   // our tracked horizontal scroll position
let isSnapping  = false;
let currentSectionIdx = 0;
const SNAP_DURATION = 1000;
const EDGE_SNAP_DELTA = 220;
const EDGE_SNAP_REPEAT_WINDOW = 650;
const EDGE_SNAP_OVERFLOW_COUNT = 2;
let edgeIntent = { sectionIdx: -1, direction: 0, count: 0, lastAt: 0 };

function setVirtualX(x) {
  virtualX = x;
  scrollRoot.style.transform = `translateX(${-x}px)`;
}

function getActiveSection() {
  return allSections[currentSectionIdx];
}

function canScrollSection(section, deltaY) {
  if (!section) return false;
  const maxScroll = section.scrollHeight - section.clientHeight;
  if (maxScroll <= 1) return false;
  if (deltaY > 0) return section.scrollTop < maxScroll - 1;
  if (deltaY < 0) return section.scrollTop > 1;
  return false;
}

function scrollSection(section, deltaY) {
  if (!section) return;
  const maxScroll = Math.max(0, section.scrollHeight - section.clientHeight);
  section.scrollTop = Math.max(0, Math.min(maxScroll, section.scrollTop + deltaY));
}

function resetEdgeIntent() {
  edgeIntent = { sectionIdx: -1, direction: 0, count: 0, lastAt: 0 };
}

function shouldSnapFromEdge(section, deltaY) {
  if (!section) return true;
  const maxScroll = section.scrollHeight - section.clientHeight;
  if (maxScroll <= 1) return true;
  if (Math.abs(deltaY) < EDGE_SNAP_DELTA) return false;

  const direction = deltaY > 0 ? 1 : -1;
  const now = performance.now();
  if (
    edgeIntent.sectionIdx === currentSectionIdx &&
    edgeIntent.direction === direction &&
    now - edgeIntent.lastAt < EDGE_SNAP_REPEAT_WINDOW
  ) {
    edgeIntent.count += 1;
  } else {
    edgeIntent = { sectionIdx: currentSectionIdx, direction, count: 1, lastAt: now };
  }
  edgeIntent.lastAt = now;
  return edgeIntent.count >= EDGE_SNAP_OVERFLOW_COUNT;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
}

function snapToIndex(idx) {
  if (isSnapping) return;
  idx = Math.max(0, Math.min(allSections.length - 1, idx));
  currentSectionIdx = idx;
  resetEdgeIntent();

  const dest = allSections[idx].offsetLeft;
  const from = virtualX;
  if (Math.abs(dest - from) < 1) return;

  // Trigger world crossfade
  prevWorldIdx = currWorldIdx;
  currWorldIdx = idx;
  worldBlend = 0;

  isSnapping = true;
  document.body.classList.add('is-snapping');

  // Reset destination section to top immediately before animating in
  allSections[idx].scrollTop = 0;

  const t0 = performance.now();
  function tick(now) {
    const p  = Math.min((now - t0) / SNAP_DURATION, 1);
    const ep = easeInOutCubic(p);
    worldBlend = ep;                          // crossfade world lines in sync
    setVirtualX(from + (dest - from) * ep);
    if (p < 1) requestAnimationFrame(tick);
    else {
      worldBlend = 1;
      setVirtualX(dest);
      setTimeout(() => { isSnapping = false; document.body.classList.remove('is-snapping'); }, 60);
    }
  }
  requestAnimationFrame(tick);
}

// ── Input handlers ────────────────────────────────────────────────────
// Wheel: scroll within section; snap between pages 0↔1 only via scroll
let wheelCooldown = false;
window.addEventListener('wheel', e => {
  e.preventDefault();
  if (document.getElementById('nav-panel').classList.contains('open')) return;
  const activeSection = getActiveSection();
  if (canScrollSection(activeSection, e.deltaY)) {
    scrollSection(activeSection, e.deltaY);
    return;
  }
  if (isSnapping || wheelCooldown) return;
  const idx = currentSectionIdx;
  if ((idx === 0 && e.deltaY > 0) || (idx === 1 && e.deltaY < 0)) {
    wheelCooldown = true;
    setTimeout(() => { wheelCooldown = false; }, 800);
    snapToIndex(idx + (e.deltaY > 0 ? 1 : -1));
  }
}, { passive: false });

window.addEventListener('keydown', e => {
  if (isSnapping) return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); snapToIndex(currentSectionIdx + 1); }
  if (e.key === 'ArrowLeft'  || e.key === 'PageUp')   { e.preventDefault(); snapToIndex(currentSectionIdx - 1); }
});
// ── Override section effects to use virtualY instead of scrollY ────────
// getBoundingClientRect reflects the CSS transform, so it works correctly.
// getDominantDepth also uses getBoundingClientRect — no changes needed.

// ── Animation loop ─────────────────────────────────────────────────────
function loop(ts) {
  t = ts * 0.001;
  targetDepth  = getDominantDepth();
  currentDepth += (targetDepth - currentDepth) * 0.055;
  drawWaves(currentDepth);
  wrap.style.transform = `scale(${(0.75 + currentDepth * 0.28).toFixed(4)})`;
  updateOverflowSections();
  updateSectionEffects();
  requestAnimationFrame(loop);
}

// Start at section 0
currWorldIdx = 0; prevWorldIdx = 0; worldBlend = 1;
setVirtualX(0);
requestAnimationFrame(loop);

// Expose globals for nav menu
window.snapToIndex = snapToIndex;
Object.defineProperty(window, 'currentSectionIdx', { get: () => currentSectionIdx });

/* ================================================================ */

(function () {
  const NAV_PAGES = [
    { index: 0, label: 'Introduction',                    sub: 'Hero' },
    { index: 1, label: 'Improvement Index',               sub: 'Overview' },
    { index: 2, label: 'Navigation Menu',                 sub: 'Improvement 01' },
    { index: 3, label: 'Corporate Video Visibility',      sub: 'Improvement 02' },
    { index: 4, label: 'Search & Product Finding',        sub: 'Improvement 03' },
    { index: 5, label: 'Wrong Category Search Support',   sub: 'Improvement 04' },
    { index: 6, label: 'Product Detail & Specification',  sub: 'Improvement 05' },
    { index: 7, label: 'Documents & Certifications',      sub: 'Improvement 06' },
    { index: 8, label: 'All Products & Filtering',        sub: 'Improvement 07' },
    { index: 9, label: 'Final Summary',                   sub: 'Outcome' },
  ];

  const hamBtn    = document.getElementById('ham-btn');
  const backdrop  = document.getElementById('nav-backdrop');
  const panel     = document.getElementById('nav-panel');
  const closeBtn  = document.getElementById('nav-close');
  const itemsWrap = document.getElementById('nav-items');
  const navCurrent= document.getElementById('nav-current');
  const navTotal  = document.getElementById('nav-total');

  navTotal.textContent = String(NAV_PAGES.length).padStart(2, '0');

  // Build items
  NAV_PAGES.forEach(({ index, label, sub }) => {
    const btn = document.createElement('button');
    btn.className = 'nav-item';
    btn.dataset.index = index;
    btn.style.transitionDelay = '0s'; // set on open
    btn.innerHTML = `
      <span class="nav-item-num">${String(index + 1).padStart(2, '0')}</span>
      <span class="nav-item-title">${label}</span>
    `;
    btn.addEventListener('click', () => {
      closeMenu();
      // Use the existing snapToIndex function from the main script
      setTimeout(() => { window.snapToIndex(index); }, 320);
    });
    itemsWrap.appendChild(btn);
  });

  const items = itemsWrap.querySelectorAll('.nav-item');

  function updateActive(idx) {
    items.forEach((el, i) => el.classList.toggle('active', i === idx));
    navCurrent.textContent = String(idx + 1).padStart(2, '0');
  }

  function openMenu() {
    hamBtn.classList.add('open');
    backdrop.classList.add('open');
    panel.classList.add('open');
    // stagger items
    items.forEach((el, i) => {
      el.style.transitionDelay = `${0.08 + i * 0.04}s`;
    });
    updateActive(window.currentSectionIdx || 0);
  }

  function closeMenu() {
    hamBtn.classList.remove('open');
    backdrop.classList.remove('open');
    panel.classList.remove('open');
    items.forEach(el => { el.style.transitionDelay = '0s'; });
  }

  hamBtn.addEventListener('click', () => {
    panel.classList.contains('open') ? closeMenu() : openMenu();
  });
  closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Capture wheel events inside the panel — scroll the items list, not the page
  panel.addEventListener('wheel', e => {
    e.stopPropagation();
    const items = document.getElementById('nav-items');
    if (items) items.scrollTop += e.deltaY;
  }, { passive: true });

  // Expose snapToIndex globally (it's defined in the main script scope)
  // Patch: re-export after main script runs
  window.addEventListener('load', () => {
    // Also update active item whenever section changes
    const origSnap = window.snapToIndex;
    if (origSnap) {
      window.snapToIndex = function(idx) {
        origSnap(idx);
        updateActive(idx);
      };
    }
  });
})();

/* ================================================================ */

(function() {
  function setupVideoLightbox(ids) {
    const thumb    = document.getElementById(ids.thumb);
    const lightbox = document.getElementById(ids.lightbox);
    const fullVid  = document.getElementById(ids.full);
    const closeBtn = document.getElementById(ids.close);
    const preview  = document.getElementById(ids.preview);

    if (!thumb || !lightbox || !fullVid || !closeBtn || !preview) return;

    preview.addEventListener('loadedmetadata', () => { preview.currentTime = 0.5; });

    function openLightbox() {
      lightbox.classList.add('open');
      fullVid.play();
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      fullVid.pause();
      fullVid.currentTime = 0;
    }

    thumb.addEventListener('click', openLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  setupVideoLightbox({
    thumb: 'video-thumb',
    lightbox: 'video-lightbox',
    full: 'video-full',
    close: 'video-lightbox-close',
    preview: 'video-preview',
  });
  setupVideoLightbox({
    thumb: 'video-thumb-specs',
    lightbox: 'video-lightbox-specs',
    full: 'video-full-specs',
    close: 'video-lightbox-close-specs',
    preview: 'video-preview-specs',
  });
  setupVideoLightbox({
    thumb: 'video-thumb-certs',
    lightbox: 'video-lightbox-certs',
    full: 'video-full-certs',
    close: 'video-lightbox-close-certs',
    preview: 'video-preview-certs',
  });
})();

/* ================================================================ */

(function() {
  const wrap    = document.querySelector('.impr-table-wrap');
  const tooltip = document.getElementById('impr-tooltip');
  const tipBadge= document.getElementById('impr-tooltip-badge');
  const tipText = document.getElementById('impr-tooltip-text');
  if (!wrap || !tooltip) return;

  function getBadgeHTML(row) {
    const badge = row.querySelector('.badge');
    if (!badge) return '';
    return `<span class="badge ${badge.className.replace('badge','').trim()}">${badge.textContent}</span>`;
  }

  let activeRow = null;

  function positionTooltip(row) {
    const rowRect = row.getBoundingClientRect();
    const tipW    = tooltip.offsetWidth  || 240;
    const tipH    = tooltip.offsetHeight || 90;
    const margin  = 12;
    const vw      = window.innerWidth;
    const vh      = window.innerHeight;

    // Try right of row, then left, then overlay inside row
    let left = rowRect.right + margin;
    if (left + tipW > vw - 8) {
      left = rowRect.left - tipW - margin;
    }
    // If still off-screen on the left, centre it horizontally within viewport
    if (left < 8) {
      left = Math.max(8, (vw - tipW) / 2);
    }

    // Vertically centred on row, clamped within viewport
    let top = rowRect.top + rowRect.height / 2 - tipH / 2;
    top = Math.max(8, Math.min(top, vh - tipH - 8));

    // On narrow screens where tooltip overlaps table, push it below the row
    const tableRect = row.closest('table').getBoundingClientRect();
    if (left + tipW > tableRect.left + 8 && left < tableRect.right - 8) {
      top = Math.min(rowRect.bottom + margin, vh - tipH - 8);
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top  = `${top}px`;
  }

  function positionTooltipTouch(row) {
    const rowRect = row.getBoundingClientRect();
    const tipW    = tooltip.offsetWidth  || 240;
    const tipH    = tooltip.offsetHeight || 90;
    const margin  = 10;
    const vw      = window.innerWidth;
    const vh      = window.innerHeight;

    // Horizontally centred in viewport
    const left = Math.max(8, (vw - tipW) / 2);

    // Below the row; fall back above if not enough space
    let top = rowRect.bottom + margin;
    if (top + tipH > vh - 8) top = rowRect.top - tipH - margin;
    if (top < 8) top = (vh - tipH) / 2;

    tooltip.style.left = `${left}px`;
    tooltip.style.top  = `${top}px`;
  }

  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  const rows = [...wrap.querySelectorAll('tr[data-desc]')];

  if (isTouch) {
    // Add info icon to the first cell of each tappable row
    rows.forEach(row => {
      const firstTd = row.querySelector('td');
      if (!firstTd) return;
      const icon = document.createElement('span');
      icon.className = 'row-info-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = 'i';
      firstTd.appendChild(icon);
    });

    // Touch tap handler
    rows.forEach(row => {
      row.addEventListener('click', e => {
        const isOpen = activeRow === row && tooltip.classList.contains('visible');

        // Close any previously open row
        if (activeRow) {
          activeRow.classList.remove('row-active');
          tooltip.classList.remove('visible');
          activeRow = null;
        }

        if (isOpen) return; // toggled off — done

        activeRow = row;
        row.classList.add('row-active');
        tipBadge.innerHTML = getBadgeHTML(row);
        tipText.textContent = row.dataset.desc;

        tooltip.style.visibility = 'hidden';
        tooltip.classList.add('visible');
        positionTooltipTouch(row);
        tooltip.style.visibility = '';

        e.stopPropagation();
      });
    });

    // Tap outside closes tooltip
    document.addEventListener('click', () => {
      if (!activeRow) return;
      activeRow.classList.remove('row-active');
      tooltip.classList.remove('visible');
      activeRow = null;
    });

    // Prevent tap on tooltip itself from bubbling to document close handler
    tooltip.addEventListener('click', e => e.stopPropagation());

  } else {
    // Desktop: hover behaviour
    rows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        if (activeRow) activeRow.classList.remove('row-active');
        activeRow = row;
        row.classList.add('row-active');

        tipBadge.innerHTML = getBadgeHTML(row);
        tipText.textContent = row.dataset.desc;

        tooltip.style.visibility = 'hidden';
        tooltip.classList.add('visible');
        positionTooltip(row);
        tooltip.style.visibility = '';
      });

      row.addEventListener('mouseleave', () => {
        row.classList.remove('row-active');
        tooltip.classList.remove('visible');
        activeRow = null;
      });
    });
  }
})();

/* ================================================================ */

// ── URL name parameter ──────────────────────────────────────────────
// Usage: ?name=Jerry  →  displays "Hi Jerry,"
(function() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const el = document.getElementById('recipient-name');
  if (el && name && name.trim()) {
    el.textContent = name.trim();
  }
})();

/* ================================================================ */

(function() {
  const PAGE_LABELS = [
    'Introduction', 'Improvement Index', 'Navigation Menu',
    'Corporate Video Visibility', 'Search & Product Finding',
    'Wrong Category Search Support', 'Product Detail & Specification',
    'Documents & Certifications', 'All Products & Filtering', 'Final Summary'
  ];
  const total = PAGE_LABELS.length;

  const nav       = document.getElementById('page-nav');
  const prevBtn   = document.getElementById('page-nav-prev');
  const nextBtn   = document.getElementById('page-nav-next');
  const prevTitle = document.getElementById('prev-page-title');
  const nextTitle = document.getElementById('next-page-title');

  function updateNav(idx) {
    nav.classList.toggle('on-hero', idx === 0);
    if (idx <= 0) {
      prevBtn.classList.add('hidden');
    } else {
      prevBtn.classList.remove('hidden');
      prevTitle.textContent = PAGE_LABELS[idx - 1];
    }
    if (idx >= total - 1) {
      nextBtn.classList.add('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      nextTitle.textContent = PAGE_LABELS[idx + 1];
    }
  }

  prevBtn.addEventListener('click', () => { window.snapToIndex(window.currentSectionIdx - 1); });
  nextBtn.addEventListener('click', () => { window.snapToIndex(window.currentSectionIdx + 1); });

  let lastIdx = -1;
  function tick() {
    const idx = window.currentSectionIdx || 0;
    if (idx !== lastIdx) { lastIdx = idx; updateNav(idx); }
    requestAnimationFrame(tick);
  }

  // Measure pill width with both halves showing the longest label, then lock it.
  // grid 1fr 1px 1fr then distributes that fixed width into exactly equal halves.
  function lockNavWidth() {
    const longest = PAGE_LABELS.reduce((a, b) => a.length > b.length ? a : b);
    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    nav.style.width = '';
    prevTitle.textContent = longest;
    nextTitle.textContent = longest;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nav.style.width = nav.offsetWidth + 'px';
        updateNav(window.currentSectionIdx || 0);
        nav.classList.add('ready');
      });
    });
  }

  setTimeout(lockNavWidth, 1600);
  let navResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(navResizeTimer);
    navResizeTimer = setTimeout(lockNavWidth, 300);
  });

  tick();
})();

/* ── Before / After tab toggle ── */
(function() {
  document.querySelectorAll('.impr-toggle-row').forEach(row => {
    const tabs = row.querySelectorAll('.impr-tab');
    const wrap = row.nextElementSibling;
    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (wrap && wrap.classList.contains('impr-preview-wrap')) {
          const items = wrap.querySelectorAll('.impr-preview-img');
          items.forEach(el => {
            el.classList.remove('active');
            if (el.tagName === 'VIDEO') { el.pause(); el.currentTime = 0; }
          });
          if (items[idx]) {
            items[idx].classList.add('active');
            if (items[idx].tagName === 'VIDEO') items[idx].play();
          }
        }
      });
    });
  });
  // Auto-play initially active videos
  document.querySelectorAll('.impr-preview-wrap .impr-preview-img.active').forEach(el => {
    if (el.tagName === 'VIDEO') el.play();
  });
  // Auto-play current-problem videos
  document.querySelectorAll('.bm-problem-video').forEach(el => el.play());
})();

// Image lightbox for benchmark images
(function() {
  const lightbox = document.getElementById('img-lightbox');
  const lightboxImg = document.getElementById('img-lightbox-img');
  const closeBtn = document.getElementById('img-lightbox-close');
  if (!lightbox || !lightboxImg || !closeBtn) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  document.querySelectorAll('.bm-img img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();

// Benchmark tab switching (Improvement 07)
(function() {
  document.querySelectorAll('.bm-tab-group').forEach(group => {
    const tabs = group.querySelectorAll('.impr-tab');
    const panels = group.closest('.bm-area').querySelectorAll('.bm-panel');
    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        panels.forEach(p => p.classList.remove('active'));
        if (panels[idx]) panels[idx].classList.add('active');
      });
    });
  });
})();

// Back-to-index links: use snapToIndex instead of native anchor scroll
document.querySelectorAll('a.back-to-index').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    const idx = allSections.findIndex(s => s.id === targetId);
    if (idx !== -1) window.snapToIndex(idx);
  });
});
