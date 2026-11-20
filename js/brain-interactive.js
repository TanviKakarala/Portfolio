/**
 * Dual Brain Interactive Engine — Tanvi Kakarala Portfolio
 * 
 * High-Performance Vanilla JS Canvas Engine (60+ FPS):
 * 1. Live Moving Background Parallax (#stageBgLive)
 * 2. Physical 2D Wave-Equation Fluid Water Simulation (#water)
 *    - Float32Array A & B buffers with discrete 2D Laplacian wave propagation
 *    - Downsampled grid (CELL=5) with GPU-smooth upscaled normal refraction
 *    - Rose-tinted crest highlights [255, 190, 210] and deep burgundy trough shadows [50, 6, 30]
 *    - Masked to creative hemisphere via CSS linear-gradient mask
 * 3. Electric Shock & Lightning Arc Generator (#bolt)
 *    - 35 anatomical EDGE coordinate points calibrated to the new electric brain contour
 *    - Recursive midpoint jagged line algorithm (jag)
 *    - Dynamic cursor attraction lightning arcs and ambient energetic discharges
 *    - Dual-stroke electric cyan glow and high-voltage core
 * 4. Swaying Conduit Wires & Glowing Filament Bulbs (#wires)
 *    - Multi-strand organic quadratic bezier tendrils growing behind the brain
 *    - 12 incandescent filament bulbs swaying with harmonic trigonometric motion
 * 5. Dynamic Dual-State Cursor (.cur)
 *    - Cyan electric directional arrow on left hemisphere
 *    - Angled artist paintbrush on right hemisphere
 * 6. Viewport Performance Suspension via requestAnimationFrame
 */

(function () {
  'use strict';

  // System capability queries
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  if (fine) {
    document.documentElement.classList.add('fine');
  }

  // 35 Anatomical EDGE coordinate points tracing the new left brain contour
  const EDGE = [
    [0.6695, 0.0294], [0.5622, 0.0569], [0.4721, 0.0843], [0.4120, 0.1118],
    [0.3562, 0.1392], [0.3047, 0.1667], [0.2575, 0.1941], [0.2275, 0.2235],
    [0.1845, 0.2510], [0.1717, 0.2784], [0.1288, 0.3059], [0.1073, 0.3333],
    [0.1159, 0.3608], [0.1030, 0.3882], [0.0644, 0.4157], [0.0601, 0.4431],
    [0.0601, 0.4706], [0.0300, 0.5000], [0.0258, 0.5275], [0.0300, 0.5549],
    [0.0129, 0.5824], [0.0258, 0.6098], [0.0429, 0.6373], [0.0515, 0.6647],
    [0.0515, 0.6922], [0.0815, 0.7196], [0.1202, 0.7471], [0.1459, 0.7765],
    [0.1974, 0.8039], [0.2575, 0.8314], [0.3004, 0.8588], [0.3734, 0.8863],
    [0.4378, 0.9137], [0.4893, 0.9412], [0.6052, 0.9686]
  ];

  // DOM Elements
  const stage = document.getElementById('hero');
  const bgVideo = document.getElementById('stageBgVideo');
  const bgLive = document.getElementById('stageBgLive');
  const wc = document.getElementById('water');
  const bc = document.getElementById('bolt');
  const hl = document.getElementById('hl');
  const bb = document.getElementById('bb');
  const gl = document.getElementById('gl');
  const cur = document.getElementById('cur');

  if (bgVideo) {
    bgVideo.muted = true;
    const playP = bgVideo.play();
    if (playP !== undefined) {
      playP.catch(() => {
        window.addEventListener('pointerdown', () => bgVideo.play(), { once: true });
      });
    }
  }

  if (!stage || !wc || !bc) return;

  const wx = wc.getContext('2d');
  const bx = bc.getContext('2d');

  let W = 0, H = 0, dpr = 1;
  const CELL = 5;
  let gw = 0, gh = 0, A = null, B = null, img = null;

  // Pointer state & velocity tracking
  let px = window.innerWidth * 0.5, py = window.innerHeight * 0.5;
  let prevPx = px, prevPy = py;
  let pvx = 0, pvy = 0;
  let kx = px, ky = py;
  let moved = false;
  let lastBolt = 0, tB = 0;
  let bolts = [];

  function updatePointer(x, y) {
    pvx = x - px;
    pvy = y - py;
    px = x;
    py = y;
    moved = true;

    // Split-Screen Interactive Custom Cursors
    const isRight = x >= (stage.clientWidth || window.innerWidth) * 0.50;
    if (isRight) {
      stage.classList.add('cursor-creative');
      stage.classList.remove('cursor-tech');
    } else {
      stage.classList.add('cursor-tech');
      stage.classList.remove('cursor-creative');
    }
  }

  window.addEventListener('pointermove', e => {
    updatePointer(e.clientX, e.clientY);
  }, { passive: true });

  stage.addEventListener('pointerdown', e => {
    updatePointer(e.clientX, e.clientY);
    // Instant drop disturbance on right half
    if (px > W * 0.38) {
      drop(px, py, 60);
      setTimeout(() => drop(px, py, 35), 70);
    } else {
      // Manual spark jump on left side
      spawnManualBolt(px, py);
    }
  }, { passive: true });

  stage.addEventListener('touchmove', e => {
    if (e.touches && e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      if (px > W * 0.40) {
        drop(px, py, 25);
      }
    }
  }, { passive: true });

  // 1. Responsive Canvas Initialization
  function init() {
    W = stage.clientWidth || window.innerWidth;
    H = stage.clientHeight || window.innerHeight;
    gw = Math.ceil(W / CELL);
    gh = Math.ceil(H / CELL);

    // Setup water grid canvas
    wc.width = gw;
    wc.height = gh;
    A = new Float32Array(gw * gh);
    B = new Float32Array(gw * gh);
    img = wx.createImageData(gw, gh);

    // Setup high-DPI bolt canvas
    dpr = Math.min(2, window.devicePixelRatio || 1);
    bc.width = W * dpr;
    bc.height = H * dpr;
    bx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  init();
  window.addEventListener('resize', init);

  // 3. Physical Water Ripple Engine (Creative Hemisphere)
  function drop(x, y, s) {
    const cx = (x / CELL) | 0;
    const cy = (y / CELL) | 0;
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const r = dx * dx + dy * dy;
        if (r > 16) continue;
        const X = cx + dx;
        const Y = cy + dy;
        if (X < 1 || Y < 1 || X >= gw - 1 || Y >= gh - 1) continue;
        A[Y * gw + X] += s * (1 - r / 17);
      }
    }
  }

  let tAmb = 0;
  function stepW(t) {
    if (!reduce) {
      // Dynamic pointer velocity excitation on creative half
      if (px > W * 0.40 && moved) {
        const sp = Math.min(40, Math.hypot(pvx, pvy));
        if (sp > 1.2) {
          drop(px, py, sp * 0.45);
        }
      }
      // Ambient atmospheric raindrops falling across the rose nebula
      if (t > tAmb) {
        tAmb = t + 1100 + Math.random() * 1500;
        drop(W * (0.55 + Math.random() * 0.40), H * (0.12 + Math.random() * 0.76), 35);
      }
    }

    // 2D Wave equation simulation update
    for (let y = 1; y < gh - 1; y++) {
      for (let x = 1; x < gw - 1; x++) {
        const i = y * gw + x;
        B[i] = ((A[i - 1] + A[i + 1] + A[i - gw] + A[i + gw]) * 0.5 - B[i]) * 0.985;
      }
    }

    // Buffer swap
    const T = A; A = B; B = T;

    // Normal gradient computation and color rendering
    const d = img.data;
    for (let y = 1; y < gh - 1; y++) {
      for (let x = 1; x < gw - 1; x++) {
        const i = y * gw + x;
        const l = (A[i + 1] - A[i - 1] + A[i + gw] - A[i - gw]) * 0.5;
        const o = i * 4;
        if (l > 0) {
          // Shimmering rose/pink light highlight on wave crest
          d[o] = 255;
          d[o + 1] = 185;
          d[o + 2] = 210;
          d[o + 3] = Math.min(220, l * 9.5);
        } else {
          // Velvety burgundy shadow in wave trough
          d[o] = 45;
          d[o + 1] = 5;
          d[o + 2] = 28;
          d[o + 3] = Math.min(175, -l * 6.5);
        }
      }
    }
    wx.putImageData(img, 0, 0);
  }

  // 4. Electric Shocks & Lightning Arcs (Logical Hemisphere)
  function jag(x1, y1, x2, y2, d) {
    let p = [[x1, y1], [x2, y2]];
    for (let k = 0; k < 6; k++) {
      const n = [];
      for (let i = 0; i < p.length - 1; i++) {
        n.push(p[i], [
          (p[i][0] + p[i + 1][0]) / 2 + (Math.random() - 0.5) * d,
          (p[i][1] + p[i + 1][1]) / 2 + (Math.random() - 0.5) * d
        ]);
      }
      n.push(p[p.length - 1]);
      p = n;
      d *= 0.55;
    }
    return p;
  }

  function edgePts() {
    if (!hl) return [[W * 0.25, H * 0.5]];
    const r = hl.getBoundingClientRect();
    const sRect = stage.getBoundingClientRect();
    const W_left = r.width;
    const H_brain = r.height;
    return EDGE.map(e => [
      (r.left - sRect.left) + e[0] * W_left,
      (r.top - sRect.top) + e[1] * H_brain
    ]);
  }

  function spawnManualBolt(x, y) {
    const E = edgePts();
    if (!E || !E.length) return;
    const e = E[(Math.random() * E.length) | 0];
    const bd = Math.hypot(e[0] - x, e[1] - y);
    bolts.push({
      p: jag(e[0], e[1], x, y, bd * 0.35),
      l: 9,
      w: 1.8
    });
  }

  function spawn(t) {
    const E = edgePts();
    if (!E || !E.length) return;

    // Focused synaptic connection when cursor hovers near logical hemisphere
    if (moved && px < W * 0.48 && t - lastBolt > 140 && !reduce) {
      let best = E[0], bd = 1e9;
      for (const e of E) {
        const d = Math.hypot(e[0] - px, e[1] - py);
        if (d < bd) {
          bd = d;
          best = e;
        }
      }
      if (bd < 380) {
        lastBolt = t;
        bolts.push({
          p: jag(best[0], best[1], px, py, bd * 0.32),
          l: 7,
          w: 1.4
        });
      }
    }
  }

  function drawB(t) {
    bx.clearRect(0, 0, W, H);
    if (!reduce) spawn(t);
    bx.lineJoin = 'round';

    for (const b of bolts) {
      const a = b.l / 9;
      bx.beginPath();
      b.p.forEach((q, i) => (i ? bx.lineTo(q[0], q[1]) : bx.moveTo(q[0], q[1])));

      // Outer cyan electrical glow
      bx.strokeStyle = `rgba(0, 245, 255, ${0.32 * a})`;
      bx.lineWidth = 7 * b.w;
      bx.shadowColor = '#00f5ff';
      bx.shadowBlur = 20;
      bx.stroke();

      // Core high-voltage energetic discharge
      bx.strokeStyle = `rgba(235, 252, 255, ${0.98 * a})`;
      bx.lineWidth = 1.6 * b.w;
      bx.shadowBlur = 6;
      bx.stroke();
      b.l--;
    }
    bx.shadowBlur = 0;
    bolts = bolts.filter(b => b.l > 0);
  }

  // 5. Live Background Parallax Offset
  function liveParallax() {
    if (!bgLive || reduce) return;
    const plx = ((px / W) - 0.5) * -22;
    const ply = ((py / H) - 0.5) * -16;
    bgLive.style.setProperty('--plx', `${plx.toFixed(2)}px`);
    bgLive.style.setProperty('--ply', `${ply.toFixed(2)}px`);
  }

  // 6. 60 FPS Render Loop with Automatic Viewport Suspension
  (function loop(t) {
    if (window.scrollY < H * 1.05) {
      stepW(t);
      drawB(t);
      liveParallax();
    }
    requestAnimationFrame(loop);
  })(0);

  // Expose manual ripple drop helper for external UI interactions
  window.triggerDualBrainRipple = function (x, y, strength = 45) {
    drop(x || W * 0.7, y || H * 0.5, strength);
  };

})();
