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

  // 1. Navigation & Anchor Scroll (Top-Right Pill Navbar & Clickable Service Badges)
  const navPillItems = document.querySelectorAll('.nav-pill-link, .nav-pill-btn, .dock-link, .dock-btn, .nav-rect-link, .nav-rect-btn, .hero-service-badge');
  const sectionIds = ['hero', 'desks', 'engineer', 'creator', 'work', 'about', 'teaching', 'medals', 'process', 'contact'];

  const sectionToNavMap = {
    hero: 'hero',
    desks: 'desks',
    engineer: 'desks',
    creator: 'desks',
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

  // 4. Interactive Studio Color Swatches (#creator)
  const swatchButtons = document.querySelectorAll('#colorSwatches .swatch-btn');
  const creatorSection = document.getElementById('creator');

  const themePalettes = {
    'default': { bar: 'linear-gradient(90deg, #ff2a85, #ffb3c7)' },
    'electric-cyan': { bar: 'linear-gradient(90deg, #00f5ff, #0088ff)' },
    'rose-magenta': { bar: 'linear-gradient(90deg, #ff2a85, #ff758c)' },
    'aurora-gold': { bar: 'linear-gradient(90deg, #ffd700, #ff5e36)' }
  };

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const themeKey = btn.dataset.theme;
      const palette = themePalettes[themeKey] || themePalettes.default;
      
      document.querySelectorAll('.cre .glass').forEach(card => {
        card.style.setProperty('--bar', palette.bar);
      });
    });
  });

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

})();
