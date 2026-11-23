/**
 * About 3D Scroll-Driven Book
 * Built with React 18, GSAP ScrollTrigger & 3D CSS Transforms
 * 
 * Features:
 * - Perspective 2200px, transform-style preserve-3d
 * - Closed book starts centered in viewport (x: -25%)
 * - 0% - 25% scroll: Front cover opens -180deg; book centers (x: 0%); inside reveals permanent full-bleed portrait
 * - 25% - 55% scroll: Sheet 1 (Who I Am & Philosophy) turns 0 to -180deg
 * - 55% - 82% scroll: Sheet 2 (Selected Work & Impact) turns 0 to -180deg
 * - 82% - 100% scroll: Sheet 3 (Medals & Recognition) active spread
 * - Minimalist bottom progress dots & Prev/Next controls
 * - backface-visibility: hidden on all faces; zero flickering or text mirroring
 */

(function () {
  'use strict';

  const { createElement: h, useState, useEffect, useRef } = React;

  function About3DBook() {
    const sectionRef = useRef(null);
    const bookWrapRef = useRef(null);
    const coverRef = useRef(null);
    const sheet1Ref = useRef(null);
    const sheet2Ref = useRef(null);
    const sheet3Ref = useRef(null);
    const timelineRef = useRef(null);

    const [activePage, setActivePage] = useState(0); // 0: Cover, 1: Philosophy, 2: Impact, 3: Awards
    const [progressPercent, setProgressPercent] = useState(0);

    useEffect(() => {
      if (typeof gsap === 'undefined' || !window.ScrollTrigger) {
        console.warn('GSAP or ScrollTrigger not available');
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const bookWrap = bookWrapRef.current;
      const cover = coverRef.current;
      const sheet1 = sheet1Ref.current;
      const sheet2 = sheet2Ref.current;
      const sheet3 = sheet3Ref.current;

      if (!section || !bookWrap || !cover || !sheet1 || !sheet2) return;

      // Set initial 3D transforms
      gsap.set(bookWrap, { xPercent: -25, transformOrigin: 'center center' });
      gsap.set(cover, { rotateY: 0, transformOrigin: 'left center', zIndex: 30 });
      gsap.set(sheet1, { rotateY: 0, transformOrigin: 'left center', zIndex: 25 });
      gsap.set(sheet2, { rotateY: 0, transformOrigin: 'left center', zIndex: 20 });
      if (sheet3) gsap.set(sheet3, { rotateY: 0, transformOrigin: 'left center', zIndex: 15 });

      // Create scroll-driven master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2600',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setProgressPercent(Math.round(p * 100));

            // Determine active page spread
            if (p < 0.18) {
              setActivePage(0);
            } else if (p < 0.48) {
              setActivePage(1);
            } else if (p < 0.78) {
              setActivePage(2);
            } else {
              setActivePage(3);
            }
          }
        }
      });

      timelineRef.current = tl;

      // STEP 1 (0.00 -> 0.20):
      // Book translates from centered closed position (x: -25%) to centered open spread (x: 0%)
      // Front cover flips 0deg -> -180deg to reveal inside left portrait
      tl.to(bookWrap, {
        xPercent: 0,
        ease: 'power1.inOut',
        duration: 0.20
      }, 0);

      // Smoothly reveal base left portrait page as cover swings open
      const leftBase = document.querySelector('.book-left-base');
      if (leftBase) {
        tl.fromTo(leftBase,
          { opacity: 0, pointerEvents: 'none' },
          { opacity: 1, pointerEvents: 'auto', ease: 'power1.inOut', duration: 0.20 },
          0
        );
      }

      tl.to(cover, {
        rotateY: -180,
        ease: 'power1.inOut',
        duration: 0.20,
        onUpdate: function () {
          cover.style.zIndex = '30';
        }
      }, 0);

      // REST WINDOW 1 (0.20 -> 0.35): Spread 1 (Philosophy) resting and readable

      // STEP 2 (0.35 -> 0.55):
      // Sheet 1 (Who I Am & Philosophy) flips 0deg -> -180deg
      // When landing on the left, it slips UNDER cover (zIndex: 6 vs 30) so portrait remains permanent!
      tl.to(sheet1, {
        rotateY: -180,
        ease: 'power1.inOut',
        duration: 0.20,
        onUpdate: function () {
          const prog = this.progress();
          if (prog > 0.5) {
            sheet1.style.zIndex = '6';
          } else {
            sheet1.style.zIndex = '25';
          }
        }
      }, 0.35);

      // REST WINDOW 2 (0.55 -> 0.70): Spread 2 (Selected Work & Impact) resting and readable

      // STEP 3 (0.70 -> 0.90):
      // Sheet 2 (Selected Work & Impact) flips 0deg -> -180deg
      // When landing on the left, it slips UNDER cover (zIndex: 7 vs 30) so portrait remains permanent!
      tl.to(sheet2, {
        rotateY: -180,
        ease: 'power1.inOut',
        duration: 0.20,
        onUpdate: function () {
          const prog = this.progress();
          if (prog > 0.5) {
            sheet2.style.zIndex = '7';
          } else {
            sheet2.style.zIndex = '20';
          }
        }
      }, 0.70);

      // REST WINDOW 3 (0.90 -> 1.00): Spread 3 (Honors & Recognition) resting and readable

      // Slight settle cushion for final spread
      tl.to({}, { duration: 0.10 }, 0.90);

      // Refresh ScrollTrigger after DOM & images settle
      const refreshTimeout = setTimeout(() => {
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      }, 300);

      const handleRefresh = () => {
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      };
      window.addEventListener('load', handleRefresh);
      window.addEventListener('resize', handleRefresh);

      return () => {
        clearTimeout(refreshTimeout);
        window.removeEventListener('load', handleRefresh);
        window.removeEventListener('resize', handleRefresh);
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      };
    }, []);

    // Navigate to page spread by scroll trigger seeking
    const goToPage = (pageIdx) => {
      const tl = timelineRef.current;
      if (!tl || !tl.scrollTrigger) return;

      const st = tl.scrollTrigger;
      const targetProgress = pageIdx === 0 ? 0.00 : pageIdx === 1 ? 0.27 : pageIdx === 2 ? 0.62 : 0.95;
      const scrollY = st.start + (st.end - st.start) * targetProgress;

      window.scrollTo({
        top: scrollY,
        behavior: 'smooth'
      });
    };

    return h('div', { ref: sectionRef, className: 'book-section-viewport' },
      // Background ambience
      h('div', { className: 'book-ambient-backdrop', 'aria-hidden': 'true' },
        h('div', { className: 'book-glow-orb book-glow-left' }),
        h('div', { className: 'book-glow-orb book-glow-right' })
      ),

      // Header Bar Above Book
      h('div', { className: 'book-header-capsule' },
        h('span', { className: 'book-eyebrow' }, 'BIOGRAPHY // INTERACTIVE MEMOIR'),
        h('h2', { className: 'book-main-title' },
          'The Living Folio. ',
          h('i', null, 'The Story Behind the Craft.')
        )
      ),

      // 3D Perspective Stage
      h('div', { className: 'book-3d-stage' },
        h('div', { ref: bookWrapRef, className: 'book-monolith-wrapper' },

          // Realistic Book Base Platform / Spine Groove Shadow
          h('div', { className: 'book-spine-crease', 'aria-hidden': 'true' }),

          // -------------------------------------------------------------
          // PERMANENT BASE LEFT PAGE: Inside Cover Full-Bleed Portrait
          // -------------------------------------------------------------
          h('div', { className: 'book-leaf book-left-base' },
            h('div', { className: 'book-page-face page-front book-portrait-page' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'portrait-frame-container' },
                  h('img', {
                    src: 'assets/images/tanvi-portrait.webp',
                    alt: 'Tanvi Kakarala — Portrait',
                    className: 'book-portrait-img',
                    loading: 'eager'
                  }),
                  h('div', { className: 'portrait-vignette-overlay' }),
                  h('div', { className: 'portrait-meta-badge' },
                    h('span', { className: 'portrait-badge-dot' }),
                    h('div', { className: 'portrait-badge-text' },
                      h('b', null, 'Tanvi Kakarala'),
                      h('span', null, 'Data Engineer & Digital Solutions Architect')
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-left', 'aria-hidden': 'true' })
            )
          ),

          // -------------------------------------------------------------
          // PERMANENT BASE RIGHT PAGE: Final Spread (Page 3: Honors & Awards)
          // -------------------------------------------------------------
          h('div', { ref: sheet3Ref, className: 'book-leaf book-right-base' },
            h('div', { className: 'book-page-face page-front book-content-page honors-spread' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'book-content-scroll' },
                  h('div', { className: 'page-header-block' },
                    h('span', { className: 'page-chapter-label' }, 'CHAPTER III // HONORS & RECOGNITION'),
                    h('h3', { className: 'page-section-heading' }, 'Academic Excellence & Laurels')
                  ),

                  h('p', { className: 'page-intro-text' },
                    'Consistent academic distinction across all four engineering years, paired with open-source leadership and social education impact.'
                  ),

                  // 4 Gold Medals Grid
                  h('div', { className: 'awards-gold-grid' },
                    [
                      { year: 'Year 1', grade: '9.4 GPA', title: 'College Topper Gold Medal', desc: 'B.Tech CSE (AI & ML)' },
                      { year: 'Year 2', grade: '9.3 GPA', title: 'College Topper Gold Medal', desc: 'Department Distinction' },
                      { year: 'Year 3', grade: '9.2 GPA', title: 'College Topper Gold Medal', desc: 'Academic Rank 1' },
                      { year: 'Year 4', grade: '9.3 GPA', title: 'Overall Topper Gold Medal', desc: 'Valedictorian Honors' }
                    ].map((award, i) =>
                      h('div', { key: i, className: 'award-pill-card' },
                        h('div', { className: 'award-icon-badge' }, '🥇'),
                        h('div', { className: 'award-details' },
                          h('div', { className: 'award-top-row' },
                            h('b', { className: 'award-title' }, award.title),
                            h('span', { className: 'award-grade' }, award.grade)
                          ),
                          h('span', { className: 'award-sub' }, `${award.year} · ${award.desc}`)
                        )
                      )
                    )
                  ),

                  // Community Leadership Callout
                  h('div', { className: 'community-quote-box' },
                    h('b', { className: 'community-title' }, '🌟 Swecha Free Software Movement Core Member'),
                    h('p', null,
                      'Mentored 1,000+ government school and college students in Linux, web development, and curated open Telugu AI datasets.'
                    )
                  ),

                  // Direct Action Link
                  h('div', { className: 'book-cta-action' },
                    h('a', { href: '#contact', className: 'book-connect-btn' },
                      h('span', null, 'Start a Conversation'),
                      h('span', { className: 'btn-arrow' }, '→')
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-right', 'aria-hidden': 'true' })
            )
          ),

          // -------------------------------------------------------------
          // SHEET 2: Selected Work & Impact (Turns to reveal Page 3)
          // -------------------------------------------------------------
          h('div', { ref: sheet2Ref, className: 'book-leaf book-flipping-sheet sheet-2' },
            // Front: Selected Work & Impact
            h('div', { className: 'book-page-face page-front book-content-page work-spread' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'book-content-scroll' },
                  h('div', { className: 'page-header-block' },
                    h('span', { className: 'page-chapter-label' }, 'CHAPTER II // PROVEN DELIVERABLES'),
                    h('h3', { className: 'page-section-heading' }, 'Selected Work & Enterprise Impact')
                  ),

                  // 4 Work Showcase Cards
                  h('div', { className: 'work-portfolio-grid' },
                    [
                      {
                        title: 'OPULENCE Global Trading',
                        role: 'Lead Web Architect',
                        metric: 'Live Client Portal',
                        desc: 'Full-cycle engineering for international luxury export business. Responsive architecture, AI product visuals, and conversion-optimized layout.'
                      },
                      {
                        title: 'Aastha Enterprises',
                        role: 'Digital Experience Designer',
                        metric: 'Beverage Commerce',
                        desc: 'Commercial website experience for automated vending solutions, product staging, and brand positioning.'
                      },
                      {
                        title: 'TEKsystems Enterprise Fabric',
                        role: 'Data Engineer',
                        metric: 'Lakehouse & AI',
                        desc: 'Enterprise Microsoft Fabric pipelines, PySpark medallion ETL, and automated Agentic AI data migration validation.'
                      },
                      {
                        title: 'Swecha Open Source Initiative',
                        role: 'Core Contributor',
                        metric: '1,000+ Mentored',
                        desc: 'Statewide digital literacy bootcamps, GNU/Linux workshops, and Telugu speech datasets for open AI models.'
                      }
                    ].map((item, i) =>
                      h('div', { key: i, className: 'work-mini-card' },
                        h('div', { className: 'work-card-head' },
                          h('b', { className: 'work-card-title' }, item.title),
                          h('span', { className: 'work-badge' }, item.metric)
                        ),
                        h('span', { className: 'work-role' }, item.role),
                        h('p', { className: 'work-desc' }, item.desc)
                      )
                    )
                  ),

                  // Quick Stats Row
                  h('div', { className: 'book-metrics-bar' },
                    h('div', { className: 'b-stat' },
                      h('b', null, '2+ Yrs'),
                      h('span', null, 'Enterprise Exp')
                    ),
                    h('div', { className: 'b-stat' },
                      h('b', null, '93%'),
                      h('span', null, 'B.Tech Aggregate')
                    ),
                    h('div', { className: 'b-stat' },
                      h('b', null, '4×'),
                      h('span', null, 'Gold Medalist')
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-right', 'aria-hidden': 'true' })
            ),

            // Back: Decorative Endpaper Facing Left when flipped
            h('div', { className: 'book-page-face page-back book-endpaper-page' },
              h('div', { className: 'endpaper-inner' },
                h('div', { className: 'endpaper-motif' },
                  h('div', { className: 'endpaper-logo' }, 'TK'),
                  h('span', { className: 'endpaper-quote' },
                    '“Excellence is not an accident. It is the result of high intention, sincere effort, and intelligent execution.”'
                  ),
                  h('span', { className: 'endpaper-cite' }, '— Tanvi Kakarala')
                )
              ),
              h('div', { className: 'page-spine-shadow-left', 'aria-hidden': 'true' })
            )
          ),

          // -------------------------------------------------------------
          // SHEET 1: Who I Am & Philosophy (Turns to reveal Page 2)
          // -------------------------------------------------------------
          h('div', { ref: sheet1Ref, className: 'book-leaf book-flipping-sheet sheet-1' },
            // Front: Who I Am & Philosophy
            h('div', { className: 'book-page-face page-front book-content-page philosophy-spread' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'book-content-scroll' },
                  h('div', { className: 'page-header-block' },
                    h('span', { className: 'page-chapter-label' }, 'CHAPTER I // IDENTITY & PHILOSOPHY'),
                    h('h3', { className: 'page-section-heading' }, 'Who I Am & The Dual-Core Craft')
                  ),

                  h('p', { className: 'page-lead-para' },
                    'I am an enterprise data engineer and freelance digital architect based in Hyderabad. My work thrives at the convergence of mathematical logic and creative intuition.'
                  ),

                  h('div', { className: 'philosophy-pillars-box' },
                    h('div', { className: 'pillar-row' },
                      h('span', { className: 'pillar-icon' }, '⚡'),
                      h('div', null,
                        h('b', null, 'Engineering Rigor:'),
                        h('p', null, 'Architecting resilient Microsoft Fabric lakehouses, PySpark ETL pipelines, and Agentic AI data migration frameworks that process enterprise workloads at scale.')
                      )
                    ),
                    h('div', { className: 'pillar-row' },
                      h('span', { className: 'pillar-icon' }, '🎨'),
                      h('div', null,
                        h('b', null, 'Creative Speed:'),
                        h('p', null, 'Crafting luxury responsive websites, brand identities, and 3D visual experiences that give clients unmistakable digital prestige and immediate trust.')
                      )
                    ),
                    h('div', { className: 'pillar-row' },
                      h('span', { className: 'pillar-icon' }, '🔍'),
                      h('div', null,
                        h('b', null, 'The Meticulous Rule:'),
                        h('p', null, 'Every line of code, visual layout, and pipeline deliverable is audited and reviewed for zero defects before shipping to production.')
                      )
                    )
                  ),

                  // Capability Tags
                  h('div', { className: 'page-tags-cluster' },
                    ['Microsoft Fabric', 'PySpark', 'Agentic AI', 'React & WebGL', 'Brand Design', 'Azure Lakehouse', 'Python'].map((tag, idx) =>
                      h('span', { key: idx, className: 'page-micro-tag' }, tag)
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-right', 'aria-hidden': 'true' })
            ),

            // Back: Decorative Endpaper Facing Left when flipped
            h('div', { className: 'book-page-face page-back book-endpaper-page' },
              h('div', { className: 'endpaper-inner' },
                h('div', { className: 'endpaper-motif' },
                  h('div', { className: 'endpaper-logo' }, '✦'),
                  h('span', { className: 'endpaper-quote' },
                    '“Art and science are two sides of the same coin — one asks what is possible, the other asks how to make it endure.”'
                  ),
                  h('span', { className: 'endpaper-cite' }, '— Engineering Philosophy')
                )
              ),
              h('div', { className: 'page-spine-shadow-left', 'aria-hidden': 'true' })
            )
          ),

          // -------------------------------------------------------------
          // FRONT COVER (Flips -180deg around left spine at 0% - 25% scroll)
          // -------------------------------------------------------------
          h('div', { ref: coverRef, className: 'book-leaf book-cover-leaf' },
            // Front: Embossed Leather & Gold Foil Cover
            h('div', {
              className: 'book-page-face page-front book-front-cover',
              onClick: () => goToPage(1),
              style: { cursor: 'pointer' },
              title: 'Click to open memoir'
            },
              h('div', { className: 'cover-leather-texture' },
                h('div', { className: 'cover-gold-border' },
                  h('div', { className: 'cover-inner-frame' },
                    h('div', { className: 'cover-top-emblem' },
                      h('span', { className: 'cover-crest-icon' }, '❖'),
                      h('span', { className: 'cover-folio-tag' }, 'FOLIO MMXXVI')
                    ),
                    h('div', { className: 'cover-title-group' },
                      h('span', { className: 'cover-pre-title' }, 'ABOUT TANVI KAKARALA'),
                      h('h1', { className: 'cover-heading' },
                        'The Story Behind ',
                        h('br'),
                        h('i', null, 'The Craft.')
                      ),
                      h('div', { className: 'cover-divider-gold' }),
                      h('p', { className: 'cover-subtitle' },
                        'Enterprise Data Engineering · Digital Solutions Architecture · Creative Direction'
                      )
                    ),
                    h('div', { className: 'cover-footer-prompt' },
                      h('span', { className: 'prompt-icon' }, '↓'),
                      h('span', { className: 'prompt-text' }, 'Scroll or Click to Open Memoir')
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-right', 'aria-hidden': 'true' })
            ),

            // Inside of Cover: Becomes Permanent Left Face when flipped -180deg
            h('div', { className: 'book-page-face page-back book-inside-cover' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'portrait-frame-container' },
                  h('img', {
                    src: 'assets/images/tanvi-portrait.webp',
                    alt: 'Tanvi Kakarala — Portrait Inside Cover',
                    className: 'book-portrait-img',
                    loading: 'eager'
                  }),
                  h('div', { className: 'portrait-vignette-overlay' }),
                  h('div', { className: 'portrait-meta-badge' },
                    h('span', { className: 'portrait-badge-dot' }),
                    h('div', { className: 'portrait-badge-text' },
                      h('b', null, 'Tanvi Kakarala'),
                      h('span', null, 'Data Engineer & Digital Solutions Architect')
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-left', 'aria-hidden': 'true' })
            )
          )

        )
      ),

      // -------------------------------------------------------------
      // Minimalist Bottom Controls Bar: Dots & Arrows
      // -------------------------------------------------------------
      h('div', { className: 'book-bottom-controls' },
        h('button', {
          className: 'book-nav-arrow prev-btn',
          onClick: () => goToPage(Math.max(0, activePage - 1)),
          'aria-label': 'Previous page'
        }, '‹'),

        h('div', { className: 'book-progress-dots' },
          [
            { label: 'Cover' },
            { label: 'Philosophy' },
            { label: 'Selected Work' },
            { label: 'Laurels & Impact' }
          ].map((item, idx) =>
            h('button', {
              key: idx,
              className: `book-dot ${activePage === idx ? 'active' : ''}`,
              onClick: () => goToPage(idx),
              'aria-label': `Go to ${item.label}`,
              'aria-selected': activePage === idx ? 'true' : 'false'
            },
              h('span', { className: 'book-dot-tooltip' }, item.label)
            )
          )
        ),

        h('button', {
          className: 'book-nav-arrow next-btn',
          onClick: () => goToPage(Math.min(3, activePage + 1)),
          'aria-label': 'Next page'
        }, '›'),

        h('div', { className: 'book-scroll-progress-line' },
          h('div', {
            className: 'progress-bar-fill',
            style: { width: `${progressPercent}%` }
          })
        )
      )
    );
  }

  // Mount React Component to DOM when DOM ready
  function mountBook() {
    const rootEl = document.getElementById('aboutBookRoot');
    if (!rootEl) return;

    if (ReactDOM.createRoot) {
      const root = ReactDOM.createRoot(rootEl);
      root.render(h(About3DBook));
    } else if (ReactDOM.render) {
      ReactDOM.render(h(About3DBook), rootEl);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountBook);
  } else {
    mountBook();
  }
})();
