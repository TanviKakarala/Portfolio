/**
 * About 3D Scroll-Driven Book
 * Built with React 18, GSAP ScrollTrigger & 3D CSS Transforms
 * 
 * Choreography:
 * - 0% scroll: Book starts closed & centered in viewport with Tanvi's photo title cover
 * - 0% - 20% scroll: Book translates to centered spread; photo lifts off in 3D arc, flies across spine and docks permanently as the left page!
 * - 20% - 35% scroll: Spread 1 (Chapter I: Who I Am & Philosophy) is open and readable
 * - 35% - 55% scroll: Sheet 1 turns 3D (-180deg) and slips under the permanent left portrait
 * - 55% - 70% scroll: Spread 2 (Chapter II: Selected Work & Impact) is open and readable
 * - 70% - 90% scroll: Sheet 2 turns 3D (-180deg) and slips under the permanent left portrait
 * - 90% - 100% scroll: Spread 3 (Chapter III: Academic Excellence, Laurels & CTA) is open and readable
 * - Floating side navigation arrows (← / →) matching "The Long Light" template
 * - Bottom progress dots & scrub indicator
 */

(function () {
  'use strict';

  const { createElement: h, useState, useEffect, useRef } = React;

  function About3DBook() {
    const sectionRef = useRef(null);
    const bookWrapRef = useRef(null);
    const casingRef = useRef(null);
    const spineRef = useRef(null);
    const flyingCardRef = useRef(null);
    const coverTitleRef = useRef(null);
    const portraitBadgeRef = useRef(null);
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
      const casing = casingRef.current;
      const spine = spineRef.current;
      const flyingCard = flyingCardRef.current;
      const coverTitle = coverTitleRef.current;
      const portraitBadge = portraitBadgeRef.current;
      const sheet1 = sheet1Ref.current;
      const sheet2 = sheet2Ref.current;
      const sheet3 = sheet3Ref.current;

      if (!section || !bookWrap || !flyingCard || !sheet1 || !sheet2) return;

      // Set initial 3D transforms
      // Closed book starts centered in viewport (xPercent: -25 centers the right half)
      gsap.set(bookWrap, { xPercent: -25, transformOrigin: 'center center' });
      gsap.set(flyingCard, {
        xPercent: 0,
        yPercent: 0,
        z: 0,
        rotateY: 0,
        scale: 1,
        transformOrigin: 'center center',
        zIndex: 40
      });
      if (casing) gsap.set(casing, { opacity: 0 });
      if (spine) gsap.set(spine, { opacity: 0 });
      if (coverTitle) gsap.set(coverTitle, { opacity: 1, y: 0 });
      if (portraitBadge) gsap.set(portraitBadge, { opacity: 0, y: 12 });

      gsap.set(sheet1, { rotateY: 0, transformOrigin: 'left center', zIndex: 25 });
      gsap.set(sheet2, { rotateY: 0, transformOrigin: 'left center', zIndex: 20 });
      if (sheet3) gsap.set(sheet3, { rotateY: 0, transformOrigin: 'left center', zIndex: 10 });

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

            // Strictly hide casing, spine, and left base when book is closed (p <= 0.03)
            if (casing) {
              if (p <= 0.03) {
                casing.style.opacity = '0';
              } else if (p < 0.20) {
                const fade = Math.min(1, Math.max(0, (p - 0.03) / 0.14));
                casing.style.opacity = fade.toFixed(3);
              } else {
                casing.style.opacity = '1';
              }
            }

            if (spine) {
              if (p <= 0.03) {
                spine.style.opacity = '0';
              } else if (p < 0.20) {
                const fade = Math.min(1, Math.max(0, (p - 0.03) / 0.14));
                spine.style.opacity = fade.toFixed(3);
              } else {
                spine.style.opacity = '1';
              }
            }
          }
        }
      });

      timelineRef.current = tl;

      // =============================================================
      // STEP 1 (0.00 -> 0.20): PHOTO FLIES AND STICKS LEFT!
      // =============================================================
      // 1. Book centers on screen
      tl.to(bookWrap, {
        xPercent: 0,
        ease: 'power2.inOut',
        duration: 0.20
      }, 0);

      // Casing and spine fade in as book opens into spread
      if (casing) {
        tl.to(casing, {
          opacity: 1,
          ease: 'power1.inOut',
          duration: 0.15
        }, 0.04);
      }

      if (spine) {
        tl.to(spine, {
          opacity: 1,
          ease: 'power1.inOut',
          duration: 0.15
        }, 0.04);
      }

      // 2. Photo Card flies across spine to the left (-100%) in 3D arc
      tl.to(flyingCard, {
        xPercent: -100,
        ease: 'power2.inOut',
        duration: 0.20
      }, 0);

      // 3. 3D Elevation arc: lifts up along Z, tilts slightly, then lands smoothly
      tl.to(flyingCard, {
        z: 110,
        rotateY: -10,
        scale: 1.035,
        ease: 'power2.out',
        duration: 0.10
      }, 0);

      tl.to(flyingCard, {
        z: 0,
        rotateY: 0,
        scale: 1,
        ease: 'power2.in',
        duration: 0.10
      }, 0.10);

      // 4. Editorial Title on cover dissolves as photo flies
      if (coverTitle) {
        tl.to(coverTitle, {
          opacity: 0,
          y: -18,
          ease: 'power1.out',
          duration: 0.12
        }, 0);
      }

      // 5. Left Portrait Badge illuminates upon landing on the left
      if (portraitBadge) {
        tl.to(portraitBadge, {
          opacity: 1,
          y: 0,
          ease: 'power1.out',
          duration: 0.09
        }, 0.11);
      }

      // =============================================================
      // REST WINDOW 1 (0.20 -> 0.35): Spread 1 (Philosophy) readable
      // =============================================================

      // =============================================================
      // STEP 2 (0.35 -> 0.55): Page 1 turns in 3D to reveal Page 2
      // =============================================================
      tl.to(sheet1, {
        rotateY: -180,
        ease: 'power1.inOut',
        duration: 0.20,
        onUpdate: function () {
          const prog = this.progress();
          if (prog > 0.5) {
            sheet1.style.zIndex = '6'; // Slips underneath permanent left photo (zIndex: 40)
          } else {
            sheet1.style.zIndex = '25';
          }
        }
      }, 0.35);

      // =============================================================
      // REST WINDOW 2 (0.55 -> 0.70): Spread 2 (Selected Work) readable
      // =============================================================

      // =============================================================
      // STEP 3 (0.70 -> 0.90): Page 2 turns in 3D to reveal Page 3
      // =============================================================
      tl.to(sheet2, {
        rotateY: -180,
        ease: 'power1.inOut',
        duration: 0.20,
        onUpdate: function () {
          const prog = this.progress();
          if (prog > 0.5) {
            sheet2.style.zIndex = '7'; // Slips underneath permanent left photo (zIndex: 40)
          } else {
            sheet2.style.zIndex = '20';
          }
        }
      }, 0.70);

      // =============================================================
      // REST WINDOW 3 (0.90 -> 1.00): Spread 3 (Honors & CTA) readable
      // =============================================================
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

      if (pageIdx === 0) {
        if (casingRef.current) casingRef.current.style.opacity = '0';
        if (spineRef.current) spineRef.current.style.opacity = '0';
      }

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

      // Floating Left Navigation Arrow (matches "The Long Light" template)
      h('button', {
        className: 'book-floating-arrow arrow-left',
        onClick: () => goToPage(Math.max(0, activePage - 1)),
        disabled: activePage === 0,
        'aria-label': 'Previous page',
        title: 'Previous page'
      },
        h('span', { className: 'arrow-icon' }, '←')
      ),

      // Floating Right Navigation Arrow (matches "The Long Light" template)
      h('button', {
        className: 'book-floating-arrow arrow-right',
        onClick: () => goToPage(Math.min(3, activePage + 1)),
        disabled: activePage === 3,
        'aria-label': 'Next page',
        title: 'Next page'
      },
        h('span', { className: 'arrow-icon' }, '→')
      ),

      // 3D Perspective Stage
      h('div', { className: 'book-3d-stage' },
        h('div', { ref: bookWrapRef, className: 'book-monolith-wrapper' },

          // Hardcover Casing Frame (Backing of open spread)
          h('div', { ref: casingRef, className: 'book-casing-frame', 'aria-hidden': 'true' }),

          // Center Spine Groove Shadow & Gold Crease
          h('div', { ref: spineRef, className: 'book-spine-crease', 'aria-hidden': 'true' }),

          // -------------------------------------------------------------
          // PERMANENT BASE LEFT PAGE (Hardcover Inner Lining)
          // -------------------------------------------------------------
          h('div', { className: 'book-leaf book-left-base' },
            h('div', { className: 'book-page-face page-front book-left-lining' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'left-lining-texture' },
                  h('div', { className: 'lining-monogram' }, 'TK')
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
          // THE FLYING PORTRAIT CARD: Starts as Cover, Flies & Sticks Left!
          // -------------------------------------------------------------
          h('div', {
            ref: flyingCardRef,
            className: `flying-portrait-card ${activePage === 0 ? 'is-cover-state' : 'is-stuck-left'}`,
            onClick: activePage === 0 ? () => goToPage(1) : undefined,
            title: activePage === 0 ? 'Click to open memoir' : undefined,
            style: { cursor: activePage === 0 ? 'pointer' : 'default' }
          },
            h('div', { className: 'portrait-card-inner' },
              // High-resolution Portrait Image
              h('img', {
                src: 'assets/images/tanvi-portrait.webp',
                alt: 'Tanvi Kakarala — Portrait Cover',
                className: 'portrait-card-img',
                loading: 'eager'
              }),

              // Luxury Vignette Overlay
              h('div', { className: 'portrait-card-vignette' }),

              // -------------------------------------------------------
              // COVER EDITORIAL FRAME: Visible at 0% scroll, dissolves as photo flies
              // -------------------------------------------------------
              h('div', { ref: coverTitleRef, className: 'cover-editorial-frame' },
                h('div', { className: 'cover-top-emblem' },
                  h('span', { className: 'cover-crest-icon' }, '❖'),
                  h('span', { className: 'cover-folio-tag' }, 'FOLIO MMXXVI')
                ),
                h('div', { className: 'cover-title-group' },
                  h('span', { className: 'cover-pre-title' }, 'MEMOIR // THE LIVING FOLIO'),
                  h('h1', { className: 'cover-heading' },
                    'TANVI KAKARALA',
                    h('br'),
                    h('i', null, 'The Story Behind The Craft')
                  ),
                  h('div', { className: 'cover-divider-gold' }),
                  h('p', { className: 'cover-subtitle' },
                    'Enterprise Data Engineering · Digital Solutions Architecture'
                  )
                ),
                h('div', { className: 'cover-footer-prompt' },
                  h('span', { className: 'prompt-icon' }, '→'),
                  h('span', { className: 'prompt-text' }, 'Scroll or Click to Open')
                )
              ),

              // -------------------------------------------------------
              // PORTRAIT METADATA BADGE: Illuminates once landed on left!
              // -------------------------------------------------------
              h('div', { ref: portraitBadgeRef, className: 'portrait-meta-badge' },
                h('span', { className: 'portrait-badge-dot' }),
                h('div', { className: 'portrait-badge-text' },
                  h('b', null, 'Tanvi Kakarala'),
                  h('span', null, 'Data Engineer & Digital Solutions Architect')
                )
              )
            ),
            h('div', { className: 'page-spine-shadow-left', 'aria-hidden': 'true' })
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
          disabled: activePage === 0,
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
          disabled: activePage === 3,
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
