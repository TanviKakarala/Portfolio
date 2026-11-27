/**
 * =============================================================================
 * TANVI KAKARALA — 3D EDITORIAL PORTFOLIO BOOK
 * Based on Tanvi Kakarala — Portfolio (1)
 * Zero-Diamond Luxury Editorial Aesthetic & Hardware-Accelerated 3D Transforms
 * =============================================================================
 */

(function () {
  'use strict';

  function initBook() {
    const root = document.getElementById('aboutBookRoot');
    if (!root) return;

    root.innerHTML = `
<div id="bg"></div>
<button class="nav" id="prev" aria-label="Previous page">&#8249;</button>
<button class="nav" id="next" aria-label="Next page">&#8250;</button>
<div id="wrap"><div id="stage"><div id="shadow"></div><div id="book">
 <div id="back"></div><div id="pages"></div>

 <!-- base right page (changes per spread) -->
 <div class="face R" style="z-index:1;backface-visibility:visible">
  <section class="pg" id="p1">
    <div>
      <div class="hd"><span>Chapter 01</span><span>About Me</span></div>
      <h2>ABOUT ME</h2>
      <div class="dv"><i></i><span class="dv-dot"></span><i></i></div>
      <p style="margin-top:10px;color:var(--ink)">I’m <b style="color:var(--rose)">Tanvi Kakarala</b>, a Data &amp; Creative Builder crafting resilient cloud data systems alongside expressive, interactive digital experiences. My work bridges analytical rigor with editorial visual precision.</p>
    </div>
    <div>
      <div class="card t">
        <h3>Data Engineering &amp; Analytics</h3>
        <p>Architecting scalable lakehouse pipelines, automated ETL/ELT workflows and semantic models across <b style="color:var(--teal)">Python, SQL, PySpark, Microsoft Fabric</b> and <b style="color:var(--teal)">Power BI</b>.</p>
      </div>
      <div class="card p">
        <h3>Creative Web &amp; Agentic Automation</h3>
        <p>Designing tactile 3D web interfaces, refined UI/UX systems, motion choreography and intelligent AI-assisted workflows that turn complex operations into effortless tools.</p>
      </div>
    </div>
    <div>
      <div class="pills">
        <span>Python</span><span>SQL</span><span>PySpark</span><span>Microsoft Fabric</span><span>Power BI</span><span>React &amp; Motion</span><span>Agentic Workflows</span>
      </div>
      <div class="book-ft"><span>02</span><button data-go="n">Turn to Medals &rsaquo;</button></div>
    </div>
  </section>

  <section class="pg hid" id="p2">
    <div>
      <div class="hd"><span>Chapter 02</span><span>Credentials &amp; Impact</span></div>
      <h2 class="book-milestones-title">MILESTONES &amp; CERTIFICATIONS</h2>
      <div class="dv"><i></i><span class="dv-dot"></span><i></i></div>
    </div>
    <div class="stats">
      <div><b>99.9%</b>Pipeline SLA</div>
      <div><b>10x</b>ETL Speedup</div>
      <div><b>25+</b>Systems &amp; Apps</div>
    </div>
    <div>
      <div class="card p">
        <h3>Anthropic Claude Certified Developer — Foundations</h3>
        <p>Certified in agentic tool-use architecture, structured evaluation pipelines and production LLM workflows.</p>
      </div>
      <div class="card t">
        <h3>Enterprise Cloud &amp; Lakehouse Modernization</h3>
        <p>Migrated legacy reporting onto Microsoft Fabric &amp; PySpark, cutting daily refresh latency by over 75%.</p>
      </div>
      <div class="card p">
        <h3>Interactive 3D Editorial Web Architecture</h3>
        <p>Engineered bespoke React, Tailwind and hardware-accelerated 3D storytelling interfaces with high visual fidelity.</p>
      </div>
    </div>
    <div class="book-ft"><span>04</span><button data-go="n">Next Spread &rsaquo;</button></div>
  </section>

  <section class="pg hid" id="p3">
    <div>
      <div class="hd"><span>Chapter 03</span><span>Let’s Collaborate</span></div>
      <h2 style="margin-top:12px">CRAFTING WHAT’S NEXT</h2>
      <div class="dv"><i></i><span class="dv-dot"></span><i></i></div>
      <p style="margin-top:16px;font-size:13px;line-height:1.75;color:var(--ink)">Whether architecting fault-tolerant data pipelines or shaping tactile, editorial web experiences, I believe great engineering feels effortless, clear and deeply human.</p>
    </div>
    <div class="card" style="text-align:center;padding:20px 14px">
      <img src="assets/images/tanvi-signature.png" style="width:230px;display:block;margin:0 auto 8px" alt="Tanvi Kakarala">
      <p style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--mid)">Work • Learn • Grow</p>
      <div style="margin-top:14px">
        <button class="cta a btn" data-go="0">&#8634; Close Book</button>
        <button class="cta b btn" data-go="1">Re-read About &#8599;</button>
      </div>
    </div>
    <div class="book-ft"><span>06</span><span>Hyderabad, India</span></div>
  </section>
 </div>

 <!-- leaf 3 : Two Minds, One Identity -->
 <div class="leaf" id="l3">
  <div class="face R" style="visibility:hidden"></div>
  <div class="face L">
    <section class="pg">
      <div class="hd"><span>Philosophy</span><span>05</span></div>
      <div style="text-align:center">
        <svg class="venn" viewBox="0 0 200 200">
          <circle cx="82" cy="100" r="56" fill="rgba(58,138,168,.09)" stroke="#3A8AA8"/>
          <circle cx="118" cy="100" r="56" fill="rgba(196,75,115,.09)" stroke="#C44B73"/>
          <circle cx="100" cy="100" r="76" fill="none" stroke="#C99B8E" stroke-width=".8" stroke-dasharray="3 3"/>
          <text x="100" y="97" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="12" letter-spacing="1.6" fill="#7D4454">PRECISION</text>
          <text x="100" y="112" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="12" letter-spacing="1.6" fill="#7D4454">&amp; POISE</text>
        </svg>
        <h2 style="font-size:28px;margin-top:10px">Two Minds, One Identity</h2>
        <div class="dv c2"><i></i><span class="dv-dot"></span><i></i></div>
        <p style="max-width:300px;margin:8px auto 0;color:var(--ink)">Analytical architecture meets visual storytelling—combining structured data pipelines with calm, luxury-grade user interfaces.</p>
      </div>
      <div class="book-ft"><button data-go="p">&lsaquo; Medals</button><span>05</span></div>
    </section>
  </div>
 </div>

 <!-- leaf 2 : Medals & Honors -->
 <div class="leaf" id="l2">
  <div class="face R" id="l2f">
    <div class="pg" style="justify-content:center;align-items:center;text-align:center;font:500 24px 'Cormorant Garamond',serif;letter-spacing:.12em;text-transform:uppercase;color:#8F5364">
      About Me
    </div>
  </div>
  <div class="face L">
    <section class="pg">
      <div>
        <div class="hd"><span>Recognition</span><span>Chapter 02</span></div>
        <h2>MEDALS &amp; HONORS</h2>
        <div class="dv"><i></i><span class="dv-dot"></span><i></i></div>
      </div>
      <div>
        <div class="card medal">
          <u style="background:linear-gradient(135deg,#F6E2A8,#D9AC54);color:#5E4212">&#9733;</u>
          <div>
            <h3 style="color:#6F3948;text-transform:none;letter-spacing:0;font-size:12px">Academic Excellence &amp; Dean’s Distinction</h3>
            <small>Gold Honor • Computer &amp; Data Sciences</small>
            <p>Awarded top-decile scholastic gold medal for sustained technical distinction and capstone research.</p>
          </div>
        </div>
        <div class="card medal">
          <u style="background:linear-gradient(135deg,#F8D5DF,#D46C8C);color:#fff">&#9733;</u>
          <div>
            <h3 style="color:#6F3948;text-transform:none;letter-spacing:0;font-size:12px">Data Engineering Delivery Excellence</h3>
            <small>Spotlight Award • Enterprise Analytics</small>
            <p>Recognized for zero-downtime cloud pipeline architecture and high-impact BI automation.</p>
          </div>
        </div>
        <div class="card medal">
          <u style="background:linear-gradient(135deg,#E6EEF2,#8CB3C4);color:#164558">&#9733;</u>
          <div>
            <h3 style="color:#6F3948;text-transform:none;letter-spacing:0;font-size:12px">Creative UI/UX &amp; Product Innovation</h3>
            <small>Design Honor • Interactive Web Craft</small>
            <p>Honored for blending editorial motion systems with intuitive, human-centered digital products.</p>
          </div>
        </div>
      </div>
      <div class="book-ft"><button data-go="p">&lsaquo; About Me</button><span>03</span></div>
    </section>
  </div>
 </div>

 <!-- front cover leaf -->
 <div class="leaf" id="lc">
  <div class="face" id="cover">
    <div class="spine"></div>
    <div class="c" id="title">PORTFOLIO</div>
    <div class="c orn"><i></i><span class="orn-dot"></span><i></i></div>
    <div class="c" id="tag">WORK &nbsp;<b>•</b>&nbsp; LEARN &nbsp;<b>•</b>&nbsp; GROW</div>
    <img id="tear" src="assets/images/tanvi-cover-cutout.webp" alt="Tanvi Kakarala" draggable="false">
    <img id="nm" src="assets/images/tanvi-signature.png" alt="Tanvi Kakarala" draggable="false">
  </div>
  <div class="face L">
    <section class="pg">
      <div class="hd"><span>Portrait</span><span>01</span></div>
      <div class="photo">
        <img src="assets/images/tanvi-portrait.webp" alt="Tanvi Kakarala" draggable="false">
      </div>
      <div>
        <div class="card" style="margin-top:0">
          <b style="color:var(--rose);font-size:12px">• Tanvi Kakarala — Data &amp; Creative Builder</b>
          <p style="font-size:10.5px;color:#8E5B69">Hyderabad, India</p>
        </div>
        <div class="book-ft" style="margin-top:6px"><button data-go="0">&lsaquo; Cover</button><span>01</span></div>
      </div>
    </section>
  </div>
 </div>

</div></div></div>

<div id="hint"><div id="dots"></div><button id="hbtn"></button></div>
`;

    const $ = s => root.querySelector(s);
    const N = 4;
    let step = 0;
    let lock = false;
    let scale = 1;

    const L = [
      'Scroll or click to open',
      'Spread 1 of 3 • About Me',
      'Spread 2 of 3 • Medals & Recognition',
      'Spread 3 of 3 • Two Minds, One Identity'
    ];

    const book = $('#book');
    const stage = $('#stage');
    const lc = $('#lc');
    const l2 = $('#l2');
    const l3 = $('#l3');
    const dots = $('#dots');

    for (let i = 0; i < N; i++) {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Go to spread ${i}`);
      b.onclick = () => go(i);
      dots.appendChild(b);
    }

    function fit(id, target, size) {
      const e = $(id);
      if (!e) return;
      e.style.fontSize = size + 'px';
      e.style.letterSpacing = '0px';
      const w = e.getBoundingClientRect().width / (scale || 1);
      const n = e.textContent.length;
      if (n > 1) {
        const ls = (target - w) / (n - 1);
        e.style.letterSpacing = ls + 'px';
        e.style.marginLeft = (ls / 2) + 'px';
      }
    }

    function resize() {
      const container = document.getElementById('about') || root || document.body;
      const H = container.clientHeight || window.innerHeight;
      const W = container.clientWidth || window.innerWidth;
      scale = Math.min(H * 0.928 / 713, W / (step ? 1160 : 640));
      stage.style.zoom = scale;
      const w = $('#wrap');
      if (w) {
        w.style.left = ((W - 511 * scale) / 2) + 'px';
        w.style.top = Math.max(8, (H - 713 * scale) / 2) + 'px';
      }
    }

    function go(n) {
      step = Math.max(0, Math.min(N - 1, n));
      render();
    }

    function render() {
      book.style.transform = step === 0 ? 'translateX(0)' : 'translateX(50%)';
      stage.classList.toggle('open', step > 0);

      lc.style.transform = `rotateY(${step >= 1 ? -180 : 0}deg)`;
      lc.style.zIndex = step === 0 ? 30 : step === 1 ? 24 : 12;
      lc.style.pointerEvents = step <= 1 ? 'auto' : 'none';

      l2.style.transform = `rotateY(${step >= 2 ? -180 : 0}deg)`;
      l2.style.zIndex = step === 2 ? 26 : step === 1 ? 18 : 8;
      l2.style.pointerEvents = step === 2 ? 'auto' : 'none';
      const l2f = $('#l2f');
      if (l2f) l2f.style.opacity = step === 1 ? 0 : 1;

      l3.style.transform = `rotateY(${step >= 3 ? -180 : 0}deg)`;
      l3.style.zIndex = step === 3 ? 28 : step === 2 ? 15 : 5;
      l3.style.opacity = step >= 2 ? 1 : 0;
      l3.style.pointerEvents = step === 3 ? 'auto' : 'none';

      const p1 = $('#p1'), p2 = $('#p2'), p3 = $('#p3');
      if (p1) p1.classList.toggle('hid', step > 1);
      if (p2) p2.classList.toggle('hid', step !== 2);
      if (p3) p3.classList.toggle('hid', step !== 3);

      const prev = $('#prev'), next = $('#next'), hbtn = $('#hbtn');
      if (prev) prev.disabled = step === 0;
      if (next) next.disabled = step === N - 1;
      if (hbtn) hbtn.textContent = L[step];

      [...dots.children].forEach((d, i) => d.classList.toggle('on', i === step));
      resize();
    }

    const nx = () => go(step + 1);
    const pv = () => go(step - 1);

    if ($('#next')) $('#next').onclick = nx;
    if ($('#prev')) $('#prev').onclick = pv;
    if ($('#hbtn')) $('#hbtn').onclick = nx;
    if ($('#cover')) $('#cover').onclick = () => { if (!step) nx(); };

    root.addEventListener('click', e => {
      const t = e.target.closest('[data-go]');
      if (!t) return;
      const g = t.dataset.go;
      if (g === 'n') nx();
      else if (g === 'p') pv();
      else go(+g);
    });

    const aboutSec = document.getElementById('about');
    if (aboutSec) {
      aboutSec.addEventListener('wheel', e => {
        if (lock) return;
        const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (Math.abs(d) < 18) return;

        // If at step 0 and scrolling up, allow normal page scroll
        if (step === 0 && d < 0) return;
        // If at step 3 and scrolling down, allow normal page scroll
        if (step === N - 1 && d > 0) return;

        e.preventDefault();
        lock = true;
        d > 0 ? nx() : pv();
        setTimeout(() => { lock = false; }, 680);
      }, { passive: false });
    }

    window.addEventListener('keydown', e => {
      const rect = aboutSec ? aboutSec.getBoundingClientRect() : null;
      const inView = rect && rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
      if (!inView) return;

      if (['ArrowRight', ' '].includes(e.key)) {
        if (step < N - 1) {
          e.preventDefault();
          nx();
        }
      } else if (['ArrowLeft'].includes(e.key)) {
        if (step > 0) {
          e.preventDefault();
          pv();
        }
      }
    });

    let tx = 0, ty = 0;
    root.addEventListener('touchstart', e => {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
    }, { passive: true });

    root.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      const dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 40 || Math.abs(dy) > 40) {
        ((Math.abs(dx) >= Math.abs(dy) ? dx : dy) < 0) ? nx() : pv();
      }
    }, { passive: true });

    window.addEventListener('resize', resize);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        resize();
        fit('#title', 293, 38);
        fit('#tag', 241, 11.5);
        render();
      });
    }

    resize();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBook);
  } else {
    initBook();
  }
})();
