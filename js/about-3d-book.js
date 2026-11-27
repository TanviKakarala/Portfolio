/**
 * =============================================================================
 * TANVI KAKARALA — 3D EDITORIAL PORTFOLIO BOOK
 * Based on Tanvi Kakarala — Portfolio (1)
 * Zero-Diamond Luxury Editorial Aesthetic & Hardware-Accelerated 3D Transforms
 * Featuring:
 * - Watermark-free studio wave background
 * - Merged Academic Mastery (4 Years 4 Gold Medals) & Swecha Social Impact
 * - Merged 6-Stage Delivery Process & AI-Assisted Manifesto
 * - Grand Finale: "WORK WITH ME" with Luxury VIP Metallic Bank Card
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

 <!-- =======================================================================
      BASE RIGHT PAGE (Changes per spread: p1, p2, p3)
      ======================================================================= -->
 <div class="face R" style="z-index:1;backface-visibility:visible">

  <!-- SPREAD 1 RIGHT: ABOUT ME (step <= 1) -->
  <section class="pg" id="p1">
    <div>
      <div class="hd"><span>Chapter 01</span><span>About Me</span></div>
      <h2>ABOUT ME</h2>
      <div class="dv"><i></i><span class="dv-dot"></span><i></i></div>
      <p style="margin-top:8px;color:var(--ink)">I’m <b style="color:var(--rose)">Tanvi Kakarala</b>, a Data &amp; Creative Builder crafting resilient cloud data systems alongside expressive, interactive digital experiences. My work bridges analytical rigor with editorial visual precision.</p>
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

  <!-- SPREAD 2 RIGHT: MILESTONES & SOCIAL IMPACT (step === 2) -->
  <section class="pg hid" id="p2">
    <div>
      <div class="hd"><span>Chapter 02</span><span>Credentials &amp; Impact</span></div>
      <h2 class="book-milestones-title">MILESTONES &amp; SOCIAL IMPACT</h2>
      <div class="dv"><i></i><span class="dv-dot"></span><i></i></div>
    </div>
    <div class="stats">
      <div><b>99.9%</b>Pipeline SLA</div>
      <div><b>10x</b>ETL Speedup</div>
      <div><b>6+</b>Colleges &amp; Swecha</div>
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
        <h3>Social Impact: Swecha Free Software Movement</h3>
        <p>GLUG leader: conducted technical bootcamps across 6+ premier colleges (IARE, MLRIT, CBIT, CMR), equipped Govt school labs, and gathered speech datasets for Telugu AI models.</p>
      </div>
    </div>
    <div class="book-ft"><span>04</span><button data-go="n">Next Spread &rsaquo;</button></div>
  </section>

  <!-- SPREAD 3 RIGHT: CRAFTING WHAT'S NEXT & EDITORIAL FINALE (step === 3) -->
  <section class="pg hid" id="p3">
    <div>
      <div class="hd"><span>Chapter 03</span><span>Let’s Collaborate</span></div>
      <h2 style="margin-top:12px">CRAFTING WHAT’S NEXT</h2>
      <div class="dv"><i></i><span class="dv-dot"></span><i></i></div>
      <p style="margin-top:14px;font-size:13px;line-height:1.75;color:var(--ink)">Whether architecting fault-tolerant cloud data pipelines or shaping tactile, editorial web experiences, I believe great engineering feels effortless, clear and deeply human.</p>
    </div>

    <div class="card" style="text-align:center;padding:18px 14px;margin-top:10px;">
      <img src="assets/images/tanvi-signature.png" style="width:220px;display:block;margin:0 auto 8px" alt="Tanvi Kakarala">
      <p style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--mid);margin:0 0 14px;">Work • Learn • Grow</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:10px;">
        <button class="cta a btn" data-go="0" style="margin:0">&#8634; Close Book</button>
        <a class="cta b btn" href="#contact" style="margin:0;display:inline-flex;align-items:center;gap:6px;text-decoration:none;padding:10px 18px;background:var(--rose);color:#fff;border-radius:99px;font-weight:600;font-size:12px;">Work with Me &darr;</a>
      </div>
    </div>

    <div class="book-ft"><span>06</span><span>Hyderabad, India</span></div>
  </section>
 </div>

 <!-- =======================================================================
      LEAF 3: TWO MINDS, METHODOLOGY & AI MANIFESTO
      ======================================================================= -->
 <div class="leaf" id="l3">
  <div class="face R" style="visibility:hidden"></div>
  <div class="face L">
    <section class="pg">
      <div class="hd"><span>Philosophy &amp; Rigor</span><span>05</span></div>
      <div style="text-align:center">
        <svg class="venn" viewBox="0 0 200 200">
          <circle cx="82" cy="100" r="56" fill="rgba(58,138,168,.09)" stroke="#3A8AA8"/>
          <circle cx="118" cy="100" r="56" fill="rgba(196,75,115,.09)" stroke="#C44B73"/>
          <circle cx="100" cy="100" r="76" fill="none" stroke="#C99B8E" stroke-width=".8" stroke-dasharray="3 3"/>
          <text x="100" y="97" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="12" letter-spacing="1.6" fill="#7D4454">PRECISION</text>
          <text x="100" y="112" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="12" letter-spacing="1.6" fill="#7D4454">&amp; POISE</text>
        </svg>
        <h2 style="font-size:26px;margin-top:4px">Two Minds, One Identity</h2>
        <div class="dv c2"><i></i><span class="dv-dot"></span><i></i></div>
        <p style="max-width:320px;margin:4px auto 0;color:var(--ink);font-size:11px;line-height:1.45">Analytical architecture meets visual storytelling—combining structured data pipelines with calm, luxury-grade user interfaces.</p>
      </div>

      <!-- 6-Stage Delivery Process Grid -->
      <div>
        <div class="book-process-grid">
          <div class="book-process-item">
            <b>01 / Brief &amp; Scope</b>
            <span>Clear architectural goals &amp; milestones.</span>
          </div>
          <div class="book-process-item">
            <b>02 / Design &amp; Schema</b>
            <span>Tactile prototypes &amp; lakehouse schemas.</span>
          </div>
          <div class="book-process-item">
            <b>03 / High-Speed Build</b>
            <span>PySpark ETL, React &amp; hardware motion.</span>
          </div>
          <div class="book-process-item">
            <b>04 / Multi-Device QA</b>
            <span>Automated quality checks &amp; SLA validation.</span>
          </div>
        </div>

        <div class="card p" style="margin-top:2px;padding:8px 10px">
          <h3 style="font-size:10.5px;margin-bottom:2px">🧠 AI-Assisted, Human-Reviewed</h3>
          <p style="font-size:10px;line-height:1.4">Leveraging modern AI tooling for 5× velocity, with 100% human-verified code, security &amp; architectural ownership.</p>
        </div>
      </div>

      <div class="book-ft"><button data-go="p">&lsaquo; Medals</button><span>05</span></div>
    </section>
  </div>
 </div>

 <!-- =======================================================================
      LEAF 2: FOUR YEARS. FOUR GOLD MEDALS.
      ======================================================================= -->
 <div class="leaf" id="l2">
  <div class="face R" id="l2f">
    <div class="pg" style="justify-content:center;align-items:center;text-align:center;font:500 24px 'Cormorant Garamond',serif;letter-spacing:.12em;text-transform:uppercase;color:#8F5364">
      About Me
    </div>
  </div>
  <div class="face L">
    <section class="pg">
      <div>
        <div class="hd"><span>Academic Mastery</span><span>Chapter 02</span></div>
        <h2 style="font-size:27px">FOUR YEARS. FOUR GOLD MEDALS.</h2>
        <div class="dv"><i></i><span class="dv-dot"></span><i></i></div>
        <p style="font-size:11px;line-height:1.45;color:var(--ink);margin-top:4px">
          College Topper in <strong>every single year</strong> of B.Tech CSE (AI &amp; ML) at CMR Engineering College. The greatest milestone was escorting my parents onto the grand convocation stage for the presidential felicitation.
        </p>
      </div>

      <!-- 4 Dropping Gold Medals Row -->
      <div>
        <div class="book-medals-row">
          <div class="book-medal-coin">
            <div class="book-medal-badge">1</div>
            <div class="book-medal-year">Year 1</div>
            <div class="book-medal-sub">Rank #1</div>
          </div>
          <div class="book-medal-coin">
            <div class="book-medal-badge">2</div>
            <div class="book-medal-year">Year 2</div>
            <div class="book-medal-sub">Rank #1</div>
          </div>
          <div class="book-medal-coin">
            <div class="book-medal-badge">3</div>
            <div class="book-medal-year">Year 3</div>
            <div class="book-medal-sub">Rank #1</div>
          </div>
          <div class="book-medal-coin">
            <div class="book-medal-badge">4</div>
            <div class="book-medal-year">Year 4</div>
            <div class="book-medal-sub">Rank #1</div>
          </div>
        </div>

        <!-- Academic Distinction Stats -->
        <div class="stats" style="margin:4px 0 6px">
          <div><b>93%</b>B.Tech Aggregate</div>
          <div><b>98%</b>Intermediate MPC</div>
          <div><b>#1</b>Dept Rank 1</div>
        </div>

        <!-- Award Cards -->
        <div class="card medal" style="padding:8px 10px;margin:3px 0">
          <u style="background:linear-gradient(135deg,#F6E2A8,#D9AC54);color:#5E4212;width:30px;height:30px;font-size:12px">&#9733;</u>
          <div>
            <h3 style="color:#6F3948;text-transform:none;letter-spacing:0;font-size:11px;margin-bottom:1px">Academic Excellence &amp; Dean’s Distinction</h3>
            <small style="font-size:8.5px">Gold Honor • Computer &amp; Data Sciences</small>
          </div>
        </div>

        <div class="card medal" style="padding:8px 10px;margin:3px 0">
          <u style="background:linear-gradient(135deg,#F8D5DF,#D46C8C);color:#fff;width:30px;height:30px;font-size:12px">&#9733;</u>
          <div>
            <h3 style="color:#6F3948;text-transform:none;letter-spacing:0;font-size:11px;margin-bottom:1px">Data Engineering Delivery Excellence</h3>
            <small style="font-size:8.5px">Spotlight Award • Enterprise Analytics</small>
          </div>
        </div>
      </div>

      <div class="book-ft"><button data-go="p">&lsaquo; About Me</button><span>03</span></div>
    </section>
  </div>
 </div>

 <!-- =======================================================================
      LEAF 1: FRONT COVER LEAF
      ======================================================================= -->
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
          <p style="font-size:10.5px;color:#8E5B69">Hyderabad, India · TEKsystems Enterprise Analytics</p>
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
      'Spread 2 of 3 • Four Years Four Gold Medals',
      'Spread 3 of 3 • Work With Me'
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

    // Expose globally so navbar and footer can navigate spreads
    window.goToBookSpread = go;

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
