/**
 * Main Application Logic — Tanvi Kakarala Portfolio
 * 
 * Features:
 * 1. IntersectionObserver Scroll Reveals (.rv) & Active Navigation
 * 2. Pipeline Flow Line Trigger (#pipelineFlow)
 * 3. Interactive Agentic AI Migration Simulator (#aiSimulator)
 * 4. Interactive Studio Color Swatches (#creator)
 * 5. Interactive WhatsApp Brief Generator (#bf)
 * 6. Case Study Modal Lightbox (#projectModal)
 * 7. Mobile Navigation Drawer Toggle
 */

(function () {
  'use strict';

  // 1. Navigation & Anchor Scroll (Top-Right Rect Navbar & Clickable Corner Labels)
  const navPillItems = document.querySelectorAll('.nav-pill-link, .nav-pill-btn, .dock-link, .dock-btn, .nav-rect-link, .nav-rect-btn, .hero-corner-label');
  const sectionIds = ['hero', 'desks', 'creator', 'engineer', 'work', 'about', 'teaching', 'medals', 'process', 'contact'];

  const sectionToNavMap = {
    hero: 'hero',
    desks: 'desks',
    creator: 'desks',
    engineer: 'desks',
    work: 'work',
    about: 'about',
    teaching: 'about',
    medals: 'about',
    process: 'about',
    contact: 'contact'
  };

  function setActiveNav(navTarget) {
    navPillItems.forEach(item => {
      if (item.getAttribute('data-section') === navTarget) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  navPillItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetId = item.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          const targetSection = item.getAttribute('data-section');
          if (targetSection) setActiveNav(targetSection);
        }
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const navTarget = sectionToNavMap[id] || id;
          setActiveNav(navTarget);
        }
      });
    }, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY < 80) {
      setActiveNav('hero');
    } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 60) {
      setActiveNav('contact');
    }
  }, { passive: true });

  // 2. Scroll Reveal Observer (.rv)
  const revealElements = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));

    // Pipeline flow observer
    const pipe = document.getElementById('pipelineFlow');
    if (pipe) {
      const pipeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            pipe.classList.add('in');
          }
        });
      }, { threshold: 0.25 });
      pipeObserver.observe(pipe);
    }
  } else {
    revealElements.forEach(el => el.classList.add('in'));
    document.getElementById('pipelineFlow')?.classList.add('in');
  }

  // 3. Interactive Agentic AI Migration Simulator
  const logsEl = document.getElementById('terminalLogs');
  const btnRunValidation = document.getElementById('btnRunValidation');
  const btnSimulateFabric = document.getElementById('btnSimulateFabric');
  const btnChecksumCheck = document.getElementById('btnChecksumCheck');
  const btnClearTerminal = document.getElementById('btnClearTerminal');

  function getTimestamp() {
    const now = new Date();
    return now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
  }

  function appendLog(text, colorClass = 'text-cyan') {
    if (!logsEl) return;
    const line = document.createElement('div');
    line.className = `log-line ${colorClass}`;
    line.innerHTML = `[${getTimestamp()}] ${text}`;
    logsEl.appendChild(line);
    logsEl.scrollTop = logsEl.scrollHeight;
  }

  let isStreaming = false;
  function streamLogs(logArray) {
    if (isStreaming) return;
    isStreaming = true;
    let idx = 0;

    function next() {
      if (idx < logArray.length) {
        const item = logArray[idx];
        appendLog(item.msg, item.cls);
        idx++;
        setTimeout(next, item.delay || 320);
      } else {
        isStreaming = false;
      }
    }
    next();
  }

  btnRunValidation?.addEventListener('click', () => {
    appendLog('--- STARTING AGENTIC SCHEMA VALIDATION ---', 'text-yellow');
    streamLogs([
      { msg: 'Agent scanning source table schemas in SSMS datamart...', cls: 'text-muted', delay: 250 },
      { msg: 'Inferred 48 entity schemas across Enterprise Finance & Inventory marts.', cls: 'text-cyan', delay: 350 },
      { msg: 'Autonomous model mapped 100% of data types to Delta Lake format without drift.', cls: 'text-cyan', delay: 400 },
      { msg: 'Validation status: PASSED · 0 Type Conflicts · Schema Ready for Fabric Lakehouse.', cls: 'text-yellow', delay: 300 }
    ]);
  });

  btnSimulateFabric?.addEventListener('click', () => {
    appendLog('--- EXECUTING SSRS TO FABRIC MODERNIZATION PIPELINE ---', 'text-yellow');
    streamLogs([
      { msg: 'Extracting legacy SSRS RDL XML definitions & SQL queries...', cls: 'text-muted', delay: 250 },
      { msg: 'Transpiling stored procedure logic to optimized PySpark Lakehouse notebook.', cls: 'text-cyan', delay: 400 },
      { msg: 'Generating Direct Lake semantic model for Power BI report binding.', cls: 'text-cyan', delay: 350 },
      { msg: 'Modernization Complete: Query performance boosted by 4.2× via Delta caching.', cls: 'text-yellow', delay: 300 }
    ]);
  });

  btnChecksumCheck?.addEventListener('click', () => {
    appendLog('--- RUNNING ROW-LEVEL CHECKSUM PARITY VERIFICATION ---', 'text-yellow');
    streamLogs([
      { msg: 'Hashing 1.2M rows across on-prem SQL Server and Fabric Silver Lakehouse...', cls: 'text-muted', delay: 300 },
      { msg: 'MD5 Hash comparison: Source=0x7F4A... Target=0x7F4A...', cls: 'text-cyan', delay: 350 },
      { msg: 'Row count match: 1,248,930 / 1,248,930 rows. Parity Rate: 100.00%.', cls: 'text-yellow', delay: 300 },
      { msg: '✓ Integrity Confirmed: Zero data leakage or transformation discrepancy.', cls: 'text-cyan', delay: 250 }
    ]);
  });

  btnClearTerminal?.addEventListener('click', () => {
    if (logsEl) {
      logsEl.innerHTML = `
        <div class="log-line text-cyan">[INIT] Antigravity Agentic Migration Controller v2.4 reset.</div>
        <div class="log-line text-muted">[INFO] Ready for new autonomous simulation commands.</div>
      `;
    }
  });

  // 4. Interactive Studio Color Swatches (#creator) with Dynamic Card Hover Glow Sync
  const swatchButtons = document.querySelectorAll('#colorSwatches .swatch-btn');
  const creatorSection = document.getElementById('creator');

  const themePalettes = {
    'default': {
      bar: 'linear-gradient(90deg, #ff2a85, #ffb3c7)',
      glow: 'rgba(255, 42, 133, 0.5)',
      border: 'rgba(255, 42, 133, 0.65)',
      color: '#ff2a85'
    },
    'electric-cyan': {
      bar: 'linear-gradient(90deg, #00f5ff, #0088ff)',
      glow: 'rgba(0, 245, 255, 0.5)',
      border: 'rgba(0, 245, 255, 0.65)',
      color: '#00f5ff'
    },
    'rose-magenta': {
      bar: 'linear-gradient(90deg, #ff2a85, #ff758c)',
      glow: 'rgba(255, 42, 133, 0.5)',
      border: 'rgba(255, 42, 133, 0.65)',
      color: '#ff2a85'
    },
    'aurora-gold': {
      bar: 'linear-gradient(90deg, #ffd700, #ff5e36)',
      glow: 'rgba(255, 215, 0, 0.5)',
      border: 'rgba(255, 215, 0, 0.65)',
      color: '#ffd700'
    }
  };

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const themeKey = btn.dataset.theme;
      const palette = themePalettes[themeKey] || themePalettes.default;
      
      if (creatorSection) {
        creatorSection.style.setProperty('--creator-active-bar', palette.bar);
        creatorSection.style.setProperty('--creator-active-glow', palette.glow);
        creatorSection.style.setProperty('--creator-active-border', palette.border);
        creatorSection.style.setProperty('--creator-active-color', palette.color);
        creatorSection.style.setProperty('--bar', palette.bar);
      }
      
      document.querySelectorAll('.cre .glass, .hanging-card').forEach(card => {
        card.style.setProperty('--bar', palette.bar);
        card.style.setProperty('--card-glow', palette.glow);
        card.style.setProperty('--card-border', palette.border);
      });
    });
  });

  // 4b. Freelance Studio: "Hanging Clothesline Rope & Flowy Pinned Cards" (GSAP)
  function initCreatorHangingCardsAnimation() {
    const creatorSec = document.getElementById('creator');
    if (!creatorSec || typeof gsap === 'undefined') return;

    const headerRow = creatorSec.querySelector('.creator-header-row');
    const threadWrap = document.getElementById('hangingThreadWrap');
    const ropePaths = creatorSec.querySelectorAll('#hangingRopeCore, #ropeTwistDark, #ropeTwistLight, #ropeGlowLine');
    const cards = creatorSec.querySelectorAll('.hanging-card');
    if (!cards.length) return;

    // Natural slanted resting angles (-3.5deg, +3.0deg, -2.5deg)
    const restingAngles = [-3.5, 3.0, -2.5];

    // Rope natural wave path vs impact dip wave path
    const ropeNormalPath = 'M 0,20 Q 115,22 230,24 Q 415,31 600,25 Q 785,32 970,24 Q 1085,22 1200,20';
    const ropeDipPath = 'M 0,20 Q 115,26 230,28 Q 415,36 600,30 Q 785,37 970,28 Q 1085,25 1200,20';

    // Initial setup: air-flowing starting position from below the viewport
    gsap.set(headerRow, {
      opacity: 0,
      y: 28
    });

    if (threadWrap) {
      gsap.set(threadWrap, {
        opacity: 0,
        scaleX: 0.96,
        transformOrigin: 'center center'
      });
    }

    // Initial card setup: curved air-flowing drift offsets
    const initialOffsets = [
      { y: 260, x: -35, rot: -10, rotY: 6 },
      { y: 260, x: 12, rot: 9, rotY: -5 },
      { y: 260, x: 35, rot: -10, rotY: 7 }
    ];

    cards.forEach((card, idx) => {
      const off = initialOffsets[idx] || { y: 260, x: 0, rot: 0, rotY: 0 };
      gsap.set(card, {
        opacity: 0,
        y: off.y,
        x: off.x,
        rotation: off.rot,
        rotateY: off.rotY,
        scale: 0.94,
        transformOrigin: '50% 0%'
      });
    });

    let hasAnimated = false;

    function runHangingEntranceSequence() {
      if (hasAnimated) return;
      hasAnimated = true;

      const tl = gsap.timeline();

      // Step 1: Heading slides into place (0.5s ease-out)
      tl.to(headerRow, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      // Step 2: Glowing clothesline rope reveals and tightens with natural wave
      if (threadWrap) {
        tl.to(threadWrap, {
          opacity: 1,
          scaleX: 1,
          duration: 0.5,
          ease: 'power2.out'
        }, '-=0.2');
      }

      // Step 3: Cards fly up like caught in an upward breeze and stick to rope (0.16s stagger)
      const baseStart = 0.55;

      cards.forEach((card, idx) => {
        const cardStartTime = baseStart + (idx * 0.16);
        const flyDuration = 0.85;
        const targetAngle = restingAngles[idx] || 0;
        const impactTime = cardStartTime + flyDuration;

        // Upward breeze floating motion
        tl.to(card, {
          opacity: 1,
          y: 0,
          x: 0,
          rotation: targetAngle,
          rotateY: 0,
          scale: 1,
          duration: flyDuration,
          ease: 'power2.out'
        }, cardStartTime);

        // Clothespin sticks onto the rope:
        // 1) Rope dips 5px at impact and bounces back with elastic ease
        if (ropePaths.length) {
          tl.to(ropePaths, {
            attr: { d: ropeDipPath },
            duration: 0.16,
            ease: 'power1.in'
          }, impactTime);

          tl.to(ropePaths, {
            attr: { d: ropeNormalPath },
            duration: 0.9,
            ease: 'elastic.out(1, 0.45)'
          }, impactTime + 0.16);
        }

        // 2) Card top-hinged tactile rebound into slanted resting angle
        tl.to(card, {
          rotation: targetAngle,
          scale: 1.0,
          duration: 0.6,
          ease: 'elastic.out(1.1, 0.5)',
          onComplete: () => {
            // Start continuous flowy breeze movement
            startFlowyAirMovement(card, idx, targetAngle);
          }
        }, impactTime);
      });

      // Subtle breathing wave motion on the clothesline rope
      if (ropePaths.length) {
        gsap.to(ropePaths, {
          y: 1.5,
          duration: 3.4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: 2.0
        });
      }
    }

    // Continuous, flowy air movement simulation (pendulum sway + subtle air lift + 3D flutter)
    function startFlowyAirMovement(card, idx, restingAngle) {
      const airConfigs = [
        { amp: 3.2, lift: 3.5, flutter: 4.5, dur: 4.8 },
        { amp: 2.8, lift: 4.0, flutter: -4.0, dur: 5.6 },
        { amp: 3.2, lift: 3.2, flutter: 4.8, dur: 4.4 }
      ];
      const cfg = airConfigs[idx] || { amp: 3.0, lift: 3.5, flutter: 4.0, dur: 5.0 };

      // Flowy pendulum sway
      const swayTween = gsap.to(card, {
        rotation: restingAngle + cfg.amp,
        y: cfg.lift,
        rotateY: cfg.flutter,
        duration: cfg.dur,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      card._swayTween = swayTween;
      card._restingAngle = restingAngle;

      // Hover interaction: smoothly straighten to 0deg, scale up to 1.05, lift card slightly
      card.addEventListener('mouseenter', () => {
        if (card._swayTween) card._swayTween.pause();
        gsap.to(card, {
          rotation: 0,
          rotateY: 0,
          scale: 1.05,
          y: -6,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotation: card._restingAngle,
          rotateY: 0,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => {
            if (card._swayTween) card._swayTween.play();
          }
        });
      });
    }

    // Trigger when user opens or scrolls into this section (once: true)
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runHangingEntranceSequence();
          }
        });
      }, {
        threshold: 0.2
      });
      observer.observe(creatorSec);
    } else {
      runHangingEntranceSequence();
    }

    // ScrollTrigger hook if available
    if (typeof ScrollTrigger !== 'undefined') {
      try {
        ScrollTrigger.create({
          trigger: creatorSec,
          start: 'top 75%',
          once: true,
          onEnter: runHangingEntranceSequence
        });
      } catch (e) {}
    }
  }

  initCreatorHangingCardsAnimation();

  // 5. Interactive WhatsApp Brief Generator (#bf)
  const needBtns = document.querySelectorAll('#needOpts .opt-btn');
  const timeBtns = document.querySelectorAll('#timeOpts .opt-btn');
  const clientNameInput = document.getElementById('clientNameInput');
  const waBriefBtn = document.getElementById('waBriefBtn');

  let selectedNeed = 'Business Website';
  let selectedTime = 'This week';

  function updateWhatsAppLink() {
    if (!waBriefBtn) return;
    const name = clientNameInput?.value.trim() || 'A Potential Client';
    const message = `Hi Tanvi! My name is ${name}. I am looking for: ${selectedNeed}. Desired timeline: ${selectedTime}. Let's discuss details and next steps!`;
    const encoded = encodeURIComponent(message);
    waBriefBtn.href = `https://wa.me/917569844574?text=${encoded}`;
  }

  needBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      needBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      selectedNeed = btn.dataset.val;
      updateWhatsAppLink();
    });
  });

  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      selectedTime = btn.dataset.val;
      updateWhatsAppLink();
    });
  });

  clientNameInput?.addEventListener('input', updateWhatsAppLink);

  // 6. Case Study Modal Lightbox Data & Logic
  const caseStudiesData = {
    'opulence': {
      title: 'OPULENCE — Premium Export Business Website',
      category: 'International Trading & Commodity Export · Production Live',
      heroImage: 'assets/images/opulence.svg',
      liveUrl: 'https://opulence-trading.netlify.app',
      overview: 'Developed a high-prestige, responsive corporate website for OPULENCE, an international export and trading enterprise dealing in agricultural commodities and minerals. Built from scratch with an emphasis on visual storytelling, interactive catalogs, and responsive performance.',
      challenges: [
        'Needed a website that would establish immediate credibility with high-value institutional and government buyers across Europe, the Middle East, and Asia.',
        'Required fast loading across varied mobile device networks in port regions worldwide.',
        'Integrating AI-assisted visual animations and product showcases without slowing down the site.'
      ],
      solutions: [
        'Crafted a bespoke, dark-gold aesthetic with custom typography and smooth CSS micro-interactions.',
        'Engineered an interactive commodity catalog showcasing product specifications, packaging standards, and global shipping terms.',
        'Leveraged AI-assisted video and visual workflows to generate cinematic product visual loops.',
        'Achieved sub-second first-contentful-paint (FCP) and deployed to global Netlify edge servers with automated SSL and caching.'
      ],
      techStack: ['HTML5', 'Modern CSS3', 'JavaScript ES6+', 'AI Visual Pipelines', 'Netlify Edge', 'Responsive UI/UX']
    },
    'aastha': {
      title: 'Aastha Enterprises — Commercial Beverage Experience',
      category: 'Beverage Solutions & Smart Vending · Staging Deployment',
      heroImage: 'assets/images/aastha.svg',
      overview: 'Crafting a product-centric digital platform for Aastha Enterprises, a premier commercial beverage premix manufacturer and smart vending machine distributor. Features photorealistic AI-generated commercial photography and an automated corporate inquiry funnel.',
      challenges: [
        'Physical commercial photography for dozens of premixes and vending machines was cost-prohibitive and time-consuming.',
        'Needed to clearly communicate technical vending machine capacity, power specifications, and corporate leasing models.',
        'Generating verified B2B leads from offices, IT parks, and factories looking for turnkey beverage machines.'
      ],
      solutions: [
        'Deployed AI creative pipelines to generate studio-grade commercial product imagery for tea, coffee, and soup blends.',
        'Created an interactive machine spec visualizer comparing cup output, dimensions, and operational requirements.',
        'Architected a step-by-step corporate leasing quote calculator directing leads directly to sales WhatsApp and email channels.'
      ],
      techStack: ['Angular', 'Modern CSS', 'AI Commercial Photography', 'Interactive Product Visualizers', 'B2B Lead Generation']
    },
    'teksystems': {
      title: 'Enterprise Microsoft Fabric Lakehouse & Agentic AI Migration',
      category: 'Cloud Modernization · Enterprise TEKsystems Initiative',
      heroImage: 'assets/images/teksystems-fabric.svg',
      overview: 'Participating in a production-scale enterprise data modernization initiative at TEKsystems, migrating legacy on-premise SQL Server and SSRS reporting workloads to Microsoft Fabric Lakehouse with agentic AI validation.',
      challenges: [
        'Legacy SSRS reports contained hundreds of hard-coded stored procedures and complex business logic.',
        'High manual effort and risk of data drift during schema and stored procedure translation.',
        'Ensuring absolute 100% row-level data reconciliation across multi-million row enterprise datamarts.'
      ],
      solutions: [
        'Architected Medallion Lakehouse patterns (Bronze to Silver to Gold) on OneLake using Delta Lake format.',
        'Employed an Agentic AI workflow to automate table schema inference, cutting manual mapping turnaround by 60%.',
        'Implemented PySpark validation routines and MD5 checksum comparisons ensuring zero discrepancy during migration.',
        'Upgraded paginated SSRS reports to high-impact Power BI semantic models utilizing Direct Lake mode.'
      ],
      techStack: ['Microsoft Fabric', 'PySpark', 'SQL Server / SSMS', 'Delta Lake', 'Power BI', 'SSRS Modernization', 'Agentic AI']
    }
  };

  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalDynamicContent');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const projectTriggers = document.querySelectorAll('[data-project-trigger]');

  function openProjectModal(key) {
    const data = caseStudiesData[key];
    if (!data || !modalContent || !modal) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="k" style="color: var(--cy);">${data.category}</span>
        <h2 style="font-family: var(--font-serif); font-size: clamp(24px, 3.2vw, 36px); margin: 6px 0 16px; color: #fff;">${data.title}</h2>
        <img src="${data.heroImage}" alt="${data.title}" style="width: 100%; max-height: 280px; object-fit: contain; border-radius: 14px; background: #060a12; padding: 16px; border: 1px solid rgba(255, 255, 255, 0.15);">
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-family: var(--font-mono); color: var(--rose); font-size: 14px; text-transform: uppercase; margin-bottom: 8px;">Project Overview</h4>
        <p style="color: #cfe0f0; font-size: 14.5px; line-height: 1.6;">${data.overview}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px;">
        <div style="background: rgba(255, 255, 255, 0.04); padding: 18px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.1);">
          <h4 style="font-family: var(--font-mono); color: #ff5f56; font-size: 13px; text-transform: uppercase; margin-bottom: 8px;">Key Challenges</h4>
          <ul style="padding-left: 18px; color: #bcd6ff; font-size: 13.5px; line-height: 1.5;">
            ${data.challenges.map(c => `<li style="margin-bottom: 6px;">${c}</li>`).join('')}
          </ul>
        </div>

        <div style="background: rgba(255, 255, 255, 0.04); padding: 18px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.1);">
          <h4 style="font-family: var(--font-mono); color: #27c93f; font-size: 13px; text-transform: uppercase; margin-bottom: 8px;">Architectural Solutions</h4>
          <ul style="padding-left: 18px; color: #bcd6ff; font-size: 13.5px; line-height: 1.5;">
            ${data.solutions.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-family: var(--font-mono); color: var(--cy); font-size: 13px; text-transform: uppercase; margin-bottom: 10px;">Technologies & Tools</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${data.techStack.map(t => `<span style="padding: 5px 12px; border-radius: 99px; background: rgba(0, 245, 255, 0.12); border: 1px solid rgba(0, 245, 255, 0.3); font: 500 12px var(--font-mono); color: #e0f7ff;">${t}</span>`).join('')}
        </div>
      </div>

      ${data.liveUrl ? `
        <div style="margin-top: 20px;">
          <a href="${data.liveUrl}" target="_blank" rel="noopener" class="btn btn-duo-glow" style="width: 100%;">
            <span>Launch Live Production Website</span> <span>↗</span>
          </a>
        </div>
      ` : ''}
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.projectTrigger;
      openProjectModal(key);
    });
  });

  closeModalBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });

  // Featured Case Study Tabs Logic (#work)
  const workTabBtns = document.querySelectorAll('.work-tab-btn');
  const workCases = document.querySelectorAll('.work-case');
  workTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-work-target');
      if (!targetId) return;

      workTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      workCases.forEach(wc => {
        if (wc.id === targetId) {
          wc.classList.add('active');
          wc.style.display = 'grid';
        } else {
          wc.classList.remove('active');
          wc.style.display = 'none';
        }
      });
    });
  });

  // Cursor-Following Radial Glow on Left Grid (.room.e)
  const roomEngineer = document.querySelector('.room.e');
  if (roomEngineer) {
    let glowTicking = false;
    roomEngineer.addEventListener('mousemove', (e) => {
      if (!glowTicking) {
        requestAnimationFrame(() => {
          const rect = roomEngineer.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          roomEngineer.style.setProperty('--gx', `${x.toFixed(1)}%`);
          roomEngineer.style.setProperty('--gy', `${y.toFixed(1)}%`);
          glowTicking = false;
        });
        glowTicking = true;
      }
    });
  }

})();
