/**
 * About 3D Flipping Portfolio Book
 * Built with React 18, GSAP ScrollTrigger & 3D CSS Transforms
 * 
 * Aesthetic:
 * - Sweeping dual-tone blue and rose-pink translucent wave backdrop with soft reflective floor & subtle gold rings
 * - Front cover matches finalized editorial artwork: PORTFOLIO, oval gold cameo with Tanvi's portrait, cursive script
 * - Spread 1: Left: Large crisp portrait of Tanvi (assets/images/tanvi-portrait.webp) with blush-rose frame & caption badge
 *             Right: About Me editorial overview (Data Engineering + Creative Web & Automation)
 * - Spread 2: Left: Medals & Honors showcase (4× College Topper Gold Medals, Valedictorian)
 *             Right: Milestones, Certifications & Impact (Microsoft Fabric, PySpark, Agentic AI, metrics)
 * - Spread 3: Left: Signature Spotlight (Swecha Core Contributor, 1,000+ mentored, Telugu AI open datasets)
 *             Right: Engineering Rigor Meets Creative Design + CTA buttons
 * - Sizing: Fills ~88%-94% of viewport height
 * - Controls: ScrollTrigger scrub + floating side arrows (← / →) + bottom progress dots
 */

(function () {
  'use strict';

  const { createElement: h, useState, useEffect, useRef } = React;

  function About3DBook() {
    const sectionRef = useRef(null);
    const bookWrapRef = useRef(null);
    const spineRef = useRef(null);
    const coverRef = useRef(null);
    const sheet1Ref = useRef(null);
    const sheet2Ref = useRef(null);
    const sheet3Ref = useRef(null);
    const timelineRef = useRef(null);

    const [activePage, setActivePage] = useState(0); // 0: Cover, 1: Spread 1 (About), 2: Spread 2 (Medals), 3: Spread 3 (Craft Finale)
    const [progressPercent, setProgressPercent] = useState(0);

    useEffect(() => {
      if (typeof gsap === 'undefined' || !window.ScrollTrigger) {
        console.warn('GSAP or ScrollTrigger not available');
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const bookWrap = bookWrapRef.current;
      const spine = spineRef.current;
      const cover = coverRef.current;
      const sheet1 = sheet1Ref.current;
      const sheet2 = sheet2Ref.current;
      const sheet3 = sheet3Ref.current;

      if (!section || !bookWrap || !cover || !sheet1 || !sheet2) return;

      // Set initial 3D transforms
      // Closed book starts centered in viewport (xPercent: -25 shifts the right-half cover to center screen)
      gsap.set(bookWrap, { xPercent: -25, transformOrigin: 'center center' });
      gsap.set(cover, { rotateY: 0, transformOrigin: 'left center', zIndex: 35 });
      gsap.set(sheet1, { rotateY: 0, transformOrigin: 'left center', zIndex: 30 });
      gsap.set(sheet2, { rotateY: 0, transformOrigin: 'left center', zIndex: 25 });
      if (sheet3) gsap.set(sheet3, { rotateY: 0, transformOrigin: 'left center', zIndex: 10 });
      if (spine) gsap.set(spine, { opacity: 0 });

      // Create scroll-driven master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2800',
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

            // Spine crease visibility control
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
      // STEP 1 (0.00 -> 0.22): FRONT COVER OPENS TO SPREAD 1
      // =============================================================
      // 1. Book centers on screen
      tl.to(bookWrap, {
        xPercent: 0,
        ease: 'power2.inOut',
        duration: 0.22
      }, 0);

      // Spine crease fades in as book opens
      if (spine) {
        tl.to(spine, {
          opacity: 1,
          ease: 'power1.inOut',
          duration: 0.16
        }, 0.04);
      }

      // Cover swings open around left spine (-180deg)
      tl.to(cover, {
        rotateY: -180,
        ease: 'power2.inOut',
        duration: 0.22,
        onUpdate: function () {
          const prog = this.progress();
          if (prog > 0.5) {
            cover.style.zIndex = '15'; // When on left, sits under later sheets
          } else {
            cover.style.zIndex = '35';
          }
        }
      }, 0);

      // =============================================================
      // REST WINDOW 1 (0.22 -> 0.35): Spread 1 (About Intro) readable
      // Left: Tanvi Portrait | Right: About Story & Pillars
      // =============================================================

      // =============================================================
      // STEP 2 (0.35 -> 0.58): SHEET 1 FLIPS TO SPREAD 2
      // =============================================================
      tl.to(sheet1, {
        rotateY: -180,
        ease: 'power2.inOut',
        duration: 0.23,
        onUpdate: function () {
          const prog = this.progress();
          if (prog > 0.5) {
            sheet1.style.zIndex = '20'; // Lands on left over the cover back
          } else {
            sheet1.style.zIndex = '30';
          }
        }
      }, 0.35);

      // =============================================================
      // REST WINDOW 2 (0.58 -> 0.70): Spread 2 (Medals & Recognition) readable
      // Left: 4× Gold Medals | Right: Milestones & Certifications
      // =============================================================

      // =============================================================
      // STEP 3 (0.70 -> 0.92): SHEET 2 FLIPS TO SPREAD 3
      // =============================================================
      tl.to(sheet2, {
        rotateY: -180,
        ease: 'power2.inOut',
        duration: 0.22,
        onUpdate: function () {
          const prog = this.progress();
          if (prog > 0.5) {
            sheet2.style.zIndex = '25'; // Lands on left over Sheet 1
          } else {
            sheet2.style.zIndex = '25';
          }
        }
      }, 0.70);

      // =============================================================
      // REST WINDOW 3 (0.92 -> 1.00): Spread 3 (Craft Finale + CTA) readable
      // Left: Swecha Spotlight | Right: Convergence & Connect CTA
      // =============================================================
      tl.to({}, { duration: 0.08 }, 0.92);

      // Refresh ScrollTrigger after DOM & images settle
      const refreshTimeout = setTimeout(() => {
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      }, 350);

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
      const targetProgress = pageIdx === 0 ? 0.00 : pageIdx === 1 ? 0.28 : pageIdx === 2 ? 0.64 : 0.96;
      const scrollY = st.start + (st.end - st.start) * targetProgress;

      if (pageIdx === 0 && spineRef.current) {
        spineRef.current.style.opacity = '0';
      }

      window.scrollTo({
        top: scrollY,
        behavior: 'smooth'
      });
    };

    return h('div', { ref: sectionRef, className: 'book-section-viewport' },
      // Dual-tone blue and rose-pink translucent wave backdrop with reflective floor
      h('div', { className: 'book-wave-backdrop', 'aria-hidden': 'true' },
        h('img', {
          src: 'assets/images/about-backdrop-clean.jpg',
          alt: 'Wave Backdrop',
          className: 'wave-backdrop-img',
          loading: 'eager'
        }),
        h('div', { className: 'wave-backdrop-tint' }),
        h('div', { className: 'wave-reflective-floor' })
      ),

      // Minimal Sleek Eyebrow Capsule (Pill layout that never collides with book)
      h('div', { className: 'book-header-capsule' },
        h('span', { className: 'book-eyebrow' }, '● THE LIVING FOLIO · THE STORY BEHIND THE CRAFT')
      ),

      // Floating Left Navigation Arrow (matches "The Long Light" template)
      h('button', {
        className: 'book-floating-arrow arrow-left',
        onClick: () => goToPage(Math.max(0, activePage - 1)),
        disabled: activePage === 0,
        'aria-label': 'Previous spread',
        title: 'Previous page'
      },
        h('span', { className: 'arrow-icon' }, '←')
      ),

      // Floating Right Navigation Arrow (matches "The Long Light" template)
      h('button', {
        className: 'book-floating-arrow arrow-right',
        onClick: () => goToPage(Math.min(3, activePage + 1)),
        disabled: activePage === 3,
        'aria-label': 'Next spread',
        title: 'Next page'
      },
        h('span', { className: 'arrow-icon' }, '→')
      ),

      // 3D Perspective Stage (perspective: 2400px, transform-style: preserve-3d)
      h('div', { className: 'book-3d-stage' },
        h('div', { ref: bookWrapRef, className: 'book-monolith-wrapper' },

          // Hardcover Casing Frame (Backing of open spread)
          h('div', { className: 'book-casing-frame', 'aria-hidden': 'true' }),

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
          // PERMANENT BASE RIGHT PAGE: SPREAD 3 RIGHT (Craft Finale & CTA)
          // -------------------------------------------------------------
          h('div', { ref: sheet3Ref, className: 'book-leaf book-right-base' },
            h('div', { className: 'book-page-face page-front book-content-page craft-finale-spread' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'book-content-scroll' },
                  h('div', { className: 'page-header-block' },
                    h('span', { className: 'page-chapter-label' }, 'CHAPTER III // THE CONVERGENCE'),
                    h('h3', { className: 'page-section-heading' }, 'Engineering Rigor Meets Creative Design')
                  ),

                  h('p', { className: 'page-lead-para' },
                    'Every enterprise data pipeline I build is architected with mathematical precision, self-healing integrity, and automated telemetry. Every digital product I design is crafted with luxury visual storytelling and 60FPS fluid motion.'
                  ),

                  // Dual-Core Synthesis Box
                  h('div', { className: 'synthesis-callout-card' },
                    h('div', { className: 'synthesis-item' },
                      h('span', { className: 'synthesis-icon' }, '⚡'),
                      h('div', null,
                        h('b', null, 'Uncompromising Ownership:'),
                        h('p', null, 'From data schema blueprint to production cloud deployment, every deliverable is personal and battle-tested.')
                      )
                    ),
                    h('div', { className: 'synthesis-item' },
                      h('span', { className: 'synthesis-icon' }, '💎'),
                      h('div', null,
                        h('b', null, 'End-to-End Speed:'),
                        h('p', null, 'Eliminating handoff friction between design and engineering to ship high-converting experiences in days, not months.')
                      )
                    )
                  ),

                  // Key Competencies Cluster
                  h('div', { className: 'competencies-row' },
                    h('span', { className: 'comp-badge' }, 'Microsoft Fabric Lakehouse'),
                    h('span', { className: 'comp-badge' }, 'PySpark Medallion ETL'),
                    h('span', { className: 'comp-badge' }, 'Agentic AI Workflows'),
                    h('span', { className: 'comp-badge' }, 'React & 3D WebGL')
                  ),

                  // Final CTA Connect Row
                  h('div', { className: 'book-cta-action' },
                    h('a', { href: '#contact', className: 'book-connect-btn' },
                      h('span', null, 'Start a Conversation'),
                      h('span', { className: 'btn-arrow' }, '→')
                    ),
                    h('a', { href: '#work', className: 'book-secondary-btn' },
                      h('span', null, 'Explore Projects ↗')
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-right', 'aria-hidden': 'true' })
            )
          ),

          // -------------------------------------------------------------
          // SHEET 2: Turns 0 to -180deg
          // Front = Spread 2 Right: Milestones & Enterprise Impact
          // Back  = Spread 3 Left: Signature Spotlight (Swecha Community Leadership)
          // -------------------------------------------------------------
          h('div', { ref: sheet2Ref, className: 'book-leaf book-flipping-sheet sheet-2' },
            // Front: Spread 2 Right — Milestones & Certifications
            h('div', { className: 'book-page-face page-front book-content-page milestones-spread' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'book-content-scroll' },
                  h('div', { className: 'page-header-block' },
                    h('span', { className: 'page-chapter-label' }, 'CHAPTER II // PROVEN TRACK RECORD'),
                    h('h3', { className: 'page-section-heading' }, 'Milestones, Certifications & Impact')
                  ),

                  // 3 Enterprise Milestone Cards
                  h('div', { className: 'milestones-grid' },
                    [
                      {
                        title: 'Enterprise Microsoft Fabric Lakehouse',
                        scope: 'TEKsystems · Data Engineer',
                        desc: 'Architected medallion architecture pipelines, automated PySpark transformation workflows, and engineered Agentic AI data migration validators.'
                      },
                      {
                        title: 'Global Export Commerce Architecture',
                        scope: 'OPULENCE Global Trading · Lead Architect',
                        desc: 'Engineered conversion-driven digital platform for international luxury exports, custom quotation workflows, and 3D product visual staging.'
                      },
                      {
                        title: 'Open Source Community Mentorship',
                        scope: 'Swecha Free Software · Core Contributor',
                        desc: 'Trained 1,000+ government school and college students across Telangana in GNU/Linux, Python, and open Telugu AI speech datasets.'
                      }
                    ].map((m, idx) =>
                      h('div', { key: idx, className: 'milestone-card' },
                        h('div', { className: 'milestone-header' },
                          h('b', { className: 'milestone-title' }, m.title),
                          h('span', { className: 'milestone-scope' }, m.scope)
                        ),
                        h('p', { className: 'milestone-desc' }, m.desc)
                      )
                    )
                  ),

                  // Metrics Bar
                  h('div', { className: 'book-metrics-bar' },
                    h('div', { className: 'b-stat' },
                      h('b', null, '4×'),
                      h('span', null, 'Gold Medalist')
                    ),
                    h('div', { className: 'b-stat' },
                      h('b', null, '93%'),
                      h('span', null, 'B.Tech Aggregate')
                    ),
                    h('div', { className: 'b-stat' },
                      h('b', null, '2+ Yrs'),
                      h('span', null, 'Enterprise Exp')
                    ),
                    h('div', { className: 'b-stat' },
                      h('b', null, '1,000+'),
                      h('span', null, 'Mentored')
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-right', 'aria-hidden': 'true' })
            ),

            // Back: Spread 3 Left — Signature Spotlight (Swecha Community Leadership)
            h('div', { className: 'book-page-face page-back book-content-page signature-spotlight-spread' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'book-content-scroll' },
                  h('div', { className: 'page-header-block' },
                    h('span', { className: 'page-chapter-label' }, 'SIGNATURE SPOTLIGHT // PUBLIC IMPACT'),
                    h('h3', { className: 'page-section-heading' }, 'Swecha Free Software Leadership')
                  ),

                  // Spotlight Visual Box
                  h('div', { className: 'spotlight-hero-card' },
                    h('div', { className: 'spotlight-badge-row' },
                      h('span', { className: 'spotlight-tag' }, 'COMMUNITY CORE CONTRIBUTOR'),
                      h('span', { className: 'spotlight-year' }, '2022 – PRESENT')
                    ),
                    h('h4', { className: 'spotlight-lead-title' },
                      'Democratizing Open Technology Across Telangana'
                    ),
                    h('p', { className: 'spotlight-lead-desc' },
                      'As an active volunteer and core contributor in the Swecha Free Software Movement, I spearheaded digital empowerment bootcamps, taught hundreds of underprivileged school students the fundamentals of Linux, and contributed to the curation of the largest open Telugu language dataset for indigenous AI model training.'
                    )
                  ),

                  // Impact Stats
                  h('div', { className: 'spotlight-stats-row' },
                    h('div', { className: 'spot-stat' },
                      h('b', null, '1,000+'),
                      h('span', null, 'Students Trained')
                    ),
                    h('div', { className: 'spot-stat' },
                      h('b', null, '15+'),
                      h('span', null, 'Workshops Led')
                    ),
                    h('div', { className: 'spot-stat' },
                      h('b', null, 'Open AI'),
                      h('span', null, 'Telugu Datasets')
                    )
                  ),

                  // Valedictorian Peer Quote
                  h('div', { className: 'valedictorian-quote-box' },
                    h('span', { className: 'valedictorian-icon' }, '🎓'),
                    h('p', null,
                      '“Tanvi combines academic brilliance with deep empathy and mentorship, elevating every peer and student she teaches.”'
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-left', 'aria-hidden': 'true' })
            )
          ),

          // -------------------------------------------------------------
          // SHEET 1: Turns 0 to -180deg
          // Front = Spread 1 Right: About Introduction Overview
          // Back  = Spread 2 Left: Medals & Honors Showcase (4× Gold Medals)
          // -------------------------------------------------------------
          h('div', { ref: sheet1Ref, className: 'book-leaf book-flipping-sheet sheet-1' },
            // Front: Spread 1 Right — About Introduction Overview
            h('div', { className: 'book-page-face page-front book-content-page about-intro-spread' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'book-content-scroll' },
                  h('div', { className: 'page-header-block' },
                    h('span', { className: 'page-chapter-label' }, 'CHAPTER I // IDENTITY & CRAFT'),
                    h('h3', { className: 'page-section-heading' }, 'About Tanvi Kakarala')
                  ),

                  h('p', { className: 'page-lead-para' },
                    'I am an enterprise data engineer and freelance digital architect based in Hyderabad. My work bridges rigorous mathematical lakehouse architecture with bespoke luxury web design.'
                  ),

                  // Two Distinct Domains
                  h('div', { className: 'domains-split-box' },
                    h('div', { className: 'domain-card data-domain' },
                      h('div', { className: 'domain-header' },
                        h('span', { className: 'domain-icon' }, '📊'),
                        h('b', null, 'Data Engineering & Intelligence')
                      ),
                      h('p', null,
                        'Architecting resilient Microsoft Fabric lakehouses, PySpark ETL pipelines, SQL data models, and automated Agentic AI data migration frameworks for enterprise scalability.'
                      )
                    ),
                    h('div', { className: 'domain-card web-domain' },
                      h('div', { className: 'domain-header' },
                        h('span', { className: 'domain-icon' }, '✨'),
                        h('b', null, 'Creative Web & Automation')
                      ),
                      h('p', null,
                        'Crafting high-converting responsive websites, luxury brand identities, 3D interactive experiences, and business workflow automations that command trust.'
                      )
                    )
                  ),

                  // Micro Tags Cluster
                  h('div', { className: 'page-tags-cluster' },
                    ['Microsoft Fabric', 'PySpark', 'Agentic AI', 'Azure Synapse', 'React & 3D', 'SQL Architecture', 'Python'].map((tag, idx) =>
                      h('span', { key: idx, className: 'page-micro-tag' }, tag)
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-right', 'aria-hidden': 'true' })
            ),

            // Back: Spread 2 Left — Medals & Honors Showcase (4× Gold Medals)
            h('div', { className: 'book-page-face page-back book-content-page medals-showcase-spread' },
              h('div', { className: 'book-page-bevel' },
                h('div', { className: 'book-content-scroll' },
                  h('div', { className: 'page-header-block' },
                    h('span', { className: 'page-chapter-label' }, 'ACADEMIC EXCELLENCE // LAURELS'),
                    h('h3', { className: 'page-section-heading' }, '4× College Topper Gold Medals')
                  ),

                  h('p', { className: 'page-intro-text' },
                    'Consistent academic distinction across all four engineering years, earning top collegiate honors each consecutive academic session.'
                  ),

                  // 4 Gold Medals Grid
                  h('div', { className: 'awards-gold-grid' },
                    [
                      { year: 'Year 1', grade: '9.4 GPA', title: 'College Topper Gold Medal', desc: 'B.Tech CSE (AI & ML) · College Rank 1' },
                      { year: 'Year 2', grade: '9.3 GPA', title: 'College Topper Gold Medal', desc: 'Department Distinction · Academic Rank 1' },
                      { year: 'Year 3', grade: '9.2 GPA', title: 'College Topper Gold Medal', desc: 'Core Engineering Excellence · Rank 1' },
                      { year: 'Year 4', grade: '9.3 GPA', title: 'Overall Topper Gold Medal', desc: 'Valedictorian Honors · 4-Year College Topper' }
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

                  // Intermediate Distinction Callout
                  h('div', { className: 'state-distinction-badge' },
                    h('span', { className: 'badge-icon' }, '🌟'),
                    h('div', null,
                      h('b', null, 'State Board Academic Distinction: 98% Aggregate'),
                      h('p', null, 'Board of Intermediate Education — State Distinction in Mathematics, Physics & Chemistry.')
                    )
                  )
                )
              ),
              h('div', { className: 'page-spine-shadow-left', 'aria-hidden': 'true' })
            )
          ),

          // -------------------------------------------------------------
          // FRONT COVER LEAF: Turns 0 to -180deg
          // Front = Closed Front Cover (matches uploaded artwork book-cover-final.webp)
          // Back  = Spread 1 Left: Large Crisp Portrait with Blush-Rose Frame
          // -------------------------------------------------------------
          h('div', { ref: coverRef, className: 'book-leaf book-cover-leaf' },
            // Front: Closed Cover State
            h('div', {
              className: 'book-page-face page-front book-front-cover-artwork',
              onClick: () => goToPage(1),
              title: 'Click to open memoir',
              style: { cursor: 'pointer' }
            },
              h('div', { className: 'cover-artwork-wrapper' },
                h('img', {
                  src: 'assets/images/book-cover-final.webp',
                  alt: 'Tanvi Kakarala — Portfolio Book Cover',
                  className: 'cover-artwork-img',
                  loading: 'eager'
                }),
                // Gilded gold page edges on the right book-block
                h('div', { className: 'cover-gilded-edge-trim', 'aria-hidden': 'true' }),
                // Subtle prompt badge
                h('div', { className: 'cover-prompt-pill' },
                  h('span', { className: 'prompt-icon' }, '→'),
                  h('span', { className: 'prompt-text' }, 'Scroll or Click to Open')
                )
              ),
              h('div', { className: 'page-spine-shadow-right', 'aria-hidden': 'true' })
            ),

            // Back: Spread 1 Left — Large Crisp Portrait with Blush-Rose Frame
            h('div', { className: 'book-page-face page-back book-portrait-spread' },
              h('div', { className: 'book-page-bevel portrait-page-bevel' },
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
                      h('span', null, 'Data & Creative Builder')
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
          disabled: activePage === 0,
          'aria-label': 'Previous spread'
        }, '‹'),

        h('div', { className: 'book-progress-dots' },
          [
            { label: 'Cover' },
            { label: 'About Intro' },
            { label: 'Medals & Milestones' },
            { label: 'Craft Finale' }
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
          'aria-label': 'Next spread'
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
