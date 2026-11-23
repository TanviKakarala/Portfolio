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

  // 4. Interactive Studio Color Swatches (#creator) — safely guarded if swatches element exists
  const swatchButtons = document.querySelectorAll('#colorSwatches .swatch-btn');
  const creatorSection = document.getElementById('creator');
  if (swatchButtons.length && creatorSection) {
    const themePalettes = {
      'default': { bar: 'linear-gradient(90deg, #ff2a85, #ffb3c7)', glow: 'rgba(255, 42, 133, 0.5)', border: 'rgba(255, 42, 133, 0.65)', color: '#ff2a85' },
      'electric-cyan': { bar: 'linear-gradient(90deg, #00f5ff, #0088ff)', glow: 'rgba(0, 245, 255, 0.5)', border: 'rgba(0, 245, 255, 0.65)', color: '#00f5ff' },
      'rose-magenta': { bar: 'linear-gradient(90deg, #ff2a85, #ff758c)', glow: 'rgba(255, 42, 133, 0.5)', border: 'rgba(255, 42, 133, 0.65)', color: '#ff2a85' },
      'aurora-gold': { bar: 'linear-gradient(90deg, #ffd700, #ff5e36)', glow: 'rgba(255, 215, 0, 0.5)', border: 'rgba(255, 215, 0, 0.65)', color: '#ffd700' }
    };
    swatchButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        swatchButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const themeKey = btn.dataset.theme;
        const palette = themePalettes[themeKey] || themePalettes.default;
        creatorSection.style.setProperty('--creator-active-bar', palette.bar);
        creatorSection.style.setProperty('--creator-active-glow', palette.glow);
        creatorSection.style.setProperty('--creator-active-border', palette.border);
        creatorSection.style.setProperty('--creator-active-color', palette.color);
        creatorSection.style.setProperty('--bar', palette.bar);
      });
    });
  }

  // 4b. Freelance Studio: "Hanging Clothesline Rope & Wind-Blown Cards" (GSAP)
  function initCreatorHangingCardsAnimation() {
    const creatorSec = document.getElementById('creator');
    if (!creatorSec || typeof gsap === 'undefined') return;

    const headerRow = creatorSec.querySelector('.creator-header-row');
    const threadWrap = document.getElementById('hangingThreadWrap');
    const ropePaths = creatorSec.querySelectorAll('#hangingRopeShadow, #hangingRopeCore, #ropeTwistDark, #ropeTwistLight');
    const cards = creatorSec.querySelectorAll('.hanging-card');
    if (!cards.length) return;

    // Natural slanted resting angles (-3.5deg, +3.5deg, -2.8deg) matching reference photo
    const restingAngles = [-3.5, 3.5, -2.8];

    // Authentic Organic Catenary Sag Curve vs Elastic Impact Dip
    const ropeNormalPath = 'M 0,28 C 100,30 150,35 200,36 C 360,40 460,50 600,50 C 740,50 840,40 1000,36 C 1050,35 1100,30 1200,28';
    const ropeDipPath    = 'M 0,28 C 100,32 150,39 200,42 C 360,46 460,57 600,57 C 740,57 840,46 1000,42 C 1050,39 1100,32 1200,28';

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

    // Initial card setup: deep below viewport with fluttering initial bank angles
    const initialOffsets = [
      { y: 460, x: -50, rot: -20, rotY: 18, rotX: 8 },
      { y: 480, x: 45, rot: 18, rotY: -16, rotX: 10 },
      { y: 460, x: -40, rot: -16, rotY: 15, rotX: 8 }
    ];

    cards.forEach((card, idx) => {
      const off = initialOffsets[idx] || { y: 460, x: 0, rot: 0, rotY: 0, rotX: 0 };
      gsap.set(card, {
        opacity: 0,
        y: off.y,
        x: off.x,
        rotation: off.rot,
        rotateY: off.rotY,
        rotateX: off.rotX,
        scale: 0.90,
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

      // Step 2: Clothesline rope reveals with organic catenary sag
      if (threadWrap) {
        tl.to(threadWrap, {
          opacity: 1,
          scaleX: 1,
          duration: 0.55,
          ease: 'power2.out'
        }, '-=0.2');
      }

      // Step 3: Cards fly up like paper caught in a rising updraft (reverse movement of falling down)
      const baseStart = 0.55;

      cards.forEach((card, idx) => {
        const cardStartTime = baseStart + (idx * 0.18);
        const targetAngle = restingAngles[idx] || 0;

        const draftConfig = [
          { midX: 30, midRot: 15, midRotY: -14, crestX: -10, crestRot: -6 },
          { midX: -28, midRot: -15, midRotY: 13, crestX: 10, crestRot: 6 },
          { midX: 26, midRot: 13, midRotY: -12, crestX: -8, crestRot: -5 }
        ][idx] || { midX: 20, midRot: 10, midRotY: -10, crestX: 0, crestRot: 0 };

        const cardFlightTl = gsap.timeline();

        // Stage 1: Ascends from deep below, catching air draft and swooping across
        cardFlightTl.to(card, {
          opacity: 0.7,
          y: 280,
          x: draftConfig.midX,
          rotation: draftConfig.midRot,
          rotateY: draftConfig.midRotY,
          rotateX: 4,
          scale: 0.94,
          duration: 0.34,
          ease: 'sine.out'
        })
        // Stage 2: Swooping S-curve back across as it gains lift
        .to(card, {
          opacity: 0.95,
          y: 120,
          x: draftConfig.crestX,
          rotation: draftConfig.crestRot,
          rotateY: draftConfig.midRotY * -0.6,
          rotateX: -3,
          scale: 0.98,
          duration: 0.32,
          ease: 'sine.inOut'
        })
        // Stage 3: Approaches rope at the top with slight upward aerodynamic overshoot
        .to(card, {
          opacity: 1,
          y: -8,
          x: 0,
          rotation: targetAngle * 0.7,
          rotateY: 0,
          rotateX: 0,
          scale: 1.01,
          duration: 0.22,
          ease: 'power1.out'
        })
        // Stage 4: Clothespin clips onto rope & card elastically rebounds to resting angle
        .to(card, {
          y: 0,
          x: 0,
          rotation: targetAngle,
          rotateY: 0,
          rotateX: 0,
          scale: 1.0,
          duration: 0.7,
          ease: 'elastic.out(1.15, 0.45)',
          onComplete: () => {
            startWindBreezeMovement(card, idx, targetAngle);
          }
        });

        tl.add(cardFlightTl, cardStartTime);

        // Rope physical reaction on clothespin impact: dips and bounces
        const impactTime = cardStartTime + 0.88;
        if (ropePaths.length) {
          tl.to(ropePaths, {
            attr: { d: ropeDipPath },
            duration: 0.16,
            ease: 'power2.in'
          }, impactTime);

          tl.to(ropePaths, {
            attr: { d: ropeNormalPath },
            duration: 0.95,
            ease: 'elastic.out(1.15, 0.42)'
          }, impactTime + 0.16);
        }
      });

      // Subtle living wave breathing motion on the clothesline rope
      if (ropePaths.length) {
        gsap.to(ropePaths, {
          y: 1.5,
          duration: 4.0,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: 2.5
        });
      }
    }

    // Continuous, amplified wind blowing & airy hover physics (multi-point bidirectional pendulum, draft lift & billow)
    function startWindBreezeMovement(card, idx, restingAngle) {
      const windTimeline = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'sine.inOut' }
      });

      const swayAmp = [7.5, 8.5, 7.8][idx] || 8.0;
      const liftAmp = [-14, -18, -15][idx] || -16;
      const rotXAmp = [18, 22, 19][idx] || 20;
      const rotYAmp = [8, -9, 8][idx] || 8;
      const dur = [5.8, 6.8, 6.2][idx] || 6.0;

      // Phase 1: Wind gust catches face — card swings to one side, lifts upward and tilts out toward viewer
      windTimeline.to(card, {
        rotation: restingAngle + swayAmp,
        rotateX: rotXAmp,
        rotateY: rotYAmp,
        y: liftAmp,
        x: (idx % 2 === 0 ? 8 : -8),
        duration: dur * 0.28
      })
      // Phase 2: Decelerates and swings back through center while floating on air cushion
      .to(card, {
        rotation: restingAngle,
        rotateX: rotXAmp * 0.45,
        rotateY: -rotYAmp * 0.3,
        y: liftAmp * 0.6,
        x: 0,
        duration: dur * 0.24
      })
      // Phase 3: Swings through to opposite side, catching secondary wind draft
      .to(card, {
        rotation: restingAngle - swayAmp * 0.85,
        rotateX: rotXAmp * 0.8,
        rotateY: -rotYAmp,
        y: liftAmp * 0.85,
        x: (idx % 2 === 0 ? -7 : 7),
        duration: dur * 0.28
      })
      // Phase 4: Gently settles back toward rest position to complete seamless loop
      .to(card, {
        rotation: restingAngle,
        rotateX: 4,
        rotateY: 0,
        y: 0,
        x: 0,
        duration: dur * 0.20
      });

      // Stagger start of wind loop per card
      windTimeline.seek(idx * 1.8);

      card._windTimeline = windTimeline;
      card._restingAngle = restingAngle;

      // Hover interaction: smoothly straighten to 0deg, scale up, lift card for clear inspection
      card.addEventListener('mouseenter', () => {
        if (card._windTimeline) card._windTimeline.pause();
        gsap.to(card, {
          rotation: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1.04,
          y: -12,
          x: 0,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotation: card._restingAngle,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          y: 0,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => {
            if (card._windTimeline) card._windTimeline.play();
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

  // ============================================================================
  // 6. Enterprise Engineering Services: Conveyor Belt Robotic Arm Synchronization
  // ============================================================================
  // 4c. Enterprise Engineering Services: Robotic Conveyor Belt Synchronizer (#engineer)
  function initEngineerConveyorSync() {
    const engineerSec = document.getElementById('engineer');
    const video = document.getElementById('engineerBgVideo');
    const track = document.getElementById('conveyorCardsTrack');
    if (!engineerSec || !video || !track) return;

    const cards = Array.from(engineerSec.querySelectorAll('.conveyor-card'));
    const dots = Array.from(engineerSec.querySelectorAll('.conveyor-dot'));
    const prevBtn = document.getElementById('conveyorPrevBtn');
    const nextBtn = document.getElementById('conveyorNextBtn');
    if (!cards.length) return;

    let loopCount = 0;
    let isHovered = false;
    let isSeeking = false;
    let lastTime = 0;

    const HALF_CYCLE = 1.958;
    const ROLL_START = 1.60;
    const ROLL_END = 0.50;
    const TOTAL_ROLL_SPAN = (HALF_CYCLE - ROLL_START) + ROLL_END; // 0.858s

    // Set video playback rate to smooth studio pace (~3.4s per card)
    video.playbackRate = 0.58;

    // Hover pause on conveyor stage
    track.addEventListener('mouseenter', () => {
      isHovered = true;
      video.pause();
    });

    track.addEventListener('mouseleave', () => {
      isHovered = false;
      if (!isSeeking) video.play().catch(() => {});
    });

    // Update active dot indicator
    function updateDots(activeIdx) {
      dots.forEach((dot, i) => {
        if (i === activeIdx) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }

    // Manual navigation: seek to specific card in held inspection state
    function seekToCard(targetIdx) {
      isSeeking = true;
      const target = ((targetIdx % 3) + 3) % 3;
      if (target === 0) {
        loopCount = 0;
        video.currentTime = 1.25;
      } else if (target === 1) {
        loopCount = 0;
        video.currentTime = 3.208;
      } else {
        loopCount = 1;
        video.currentTime = 1.25;
      }
      lastTime = video.currentTime;
      renderPositionsAtTime(video.currentTime, loopCount);
      setTimeout(() => { isSeeking = false; }, 400);
    }

    // Dot navigation
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        seekToCard(idx);
      });
    });

    let currentActiveCard = 0;
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        seekToCard(currentActiveCard - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        seekToCard(currentActiveCard + 1);
      });
    }

    // Continuous, mathematically smooth conveyor ring renderer
    // Zero seeks, zero card teleporting, monotonic physical conveyor glide
    function renderPositionsAtTime(t, loops) {
      const trackWidth = track.offsetWidth || 1200;
      const slotOffset = Math.min(380, Math.max(260, trackWidth * 0.30));
      const L = 3 * slotOffset;

      const halfCycleIdx = t >= HALF_CYCLE ? 1 : 0;
      const tau = t - halfCycleIdx * HALF_CYCLE;
      const continuousHalfCycles = loops * 2 + halfCycleIdx;

      // Compute continuous slot progress (monotonically advancing)
      let slotProgress;
      if (tau < ROLL_END) {
        const p = ((HALF_CYCLE - ROLL_START) + tau) / TOTAL_ROLL_SPAN;
        const easeP = 0.5 - 0.5 * Math.cos(p * Math.PI);
        slotProgress = (continuousHalfCycles - 1) + easeP;
      } else if (tau < ROLL_START) {
        slotProgress = continuousHalfCycles;
      } else {
        const p = (tau - ROLL_START) / TOTAL_ROLL_SPAN;
        const easeP = 0.5 - 0.5 * Math.cos(p * Math.PI);
        slotProgress = continuousHalfCycles + easeP;
      }

      // Active card index for dot indicator
      currentActiveCard = ((Math.round(slotProgress) % 3) + 3) % 3;
      updateDots(currentActiveCard);

      // Position all 3 cards along the continuous conveyor ring
      cards.forEach((card, i) => {
        let rawX = (((-i + slotProgress) % 3 + 3) % 3) * slotOffset;
        if (rawX > L / 2) rawX -= L;
        const ax = Math.abs(rawX);

        // Opacity: fully visible within ±slotOffset, fades out smoothly between slotOffset and 1.4*slotOffset
        let opacity;
        if (ax <= slotOffset) {
          opacity = 0.75 + 0.25 * Math.max(0, 1 - ax / (slotOffset * 0.5));
        } else if (ax < 1.4 * slotOffset) {
          opacity = 0.75 * Math.max(0, 1 - (ax - slotOffset) / (0.4 * slotOffset));
        } else {
          opacity = 0;
        }

        // Scale
        const scale = ax <= slotOffset ? (0.90 + 0.10 * Math.max(0, 1 - ax / slotOffset)) : 0.85;

        // Claw hold inspection state with neon cyan glow (card stays grounded on belt)
        const isPicked = (ax < 35) && (tau >= 1.05 && tau < 1.48);

        if (isPicked) {
          card.classList.add('is-picked');
        } else {
          card.classList.remove('is-picked');
        }

        const zIndex = ax < 35 ? 10 : (ax <= slotOffset ? 5 : 2);

        card.style.transform = `translate3d(${rawX.toFixed(2)}px, 0px, 0) scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = zIndex.toString();
        card.style.pointerEvents = opacity > 0.2 ? 'auto' : 'none';
      });
    }

    // 60fps Animation Loop: Plays naturally through video loops with zero seeking stalls
    let animFrameId = null;

    function renderConveyorLoop() {
      if (!isHovered && !isSeeking && video && !video.paused) {
        const curTime = video.currentTime;

        // Detect natural video loop wrap (at 3.917s back to 0.0s)
        if (curTime < lastTime - 1.0) {
          loopCount++;
        }
        lastTime = curTime;

        renderPositionsAtTime(curTime, loopCount);
      }

      animFrameId = requestAnimationFrame(renderConveyorLoop);
    }

    // Initial render
    renderPositionsAtTime(0, 0);
    updateDots(0);

    // Optimize with IntersectionObserver: only run RAF when visible
    if ('IntersectionObserver' in window) {
      const secObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.playbackRate = 0.58;
            if (!animFrameId) animFrameId = requestAnimationFrame(renderConveyorLoop);
            if (!isHovered && video.paused) video.play().catch(() => {});
          } else {
            if (animFrameId) {
              cancelAnimationFrame(animFrameId);
              animFrameId = null;
            }
            if (!video.paused) video.pause();
          }
        });
      }, { threshold: 0.15 });
      secObserver.observe(engineerSec);
    } else {
      animFrameId = requestAnimationFrame(renderConveyorLoop);
    }
  }

  initEngineerConveyorSync();

})();
