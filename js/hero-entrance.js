/**
 * Hero Kinetic Stagger Entrance, 3D Mouse Parallax & Floating Dock Arrival
 * — Powered by GSAP & 60FPS Damped Transform3D Engine
 *
 * Sequence:
 * 1. Cosmic smoke video & central brain render INSTANTLY with continuous zero-G float.
 * 2. 'TANVI KAKARALA' enters via Kinetic Stagger: individual characters animate from
 *    opacity: 0, y: 40px, filter: blur(8px) with a 0.04s stagger delay per letter and spring easing.
 * 3. The continuous gradient flows from cyan on the left, through bright white/ice-violet in the center,
 *    to hot pink on the right without any muddy middle colors.
 * 4. Tagline 'DESIGN ENGINEER • AI & UI/UX' and split-brain micro-labels fade in seamlessly.
 * 5. Frosted-glass floating pill dock arrives near bottom-center of the viewport.
 * 6. Interactive 3D Mouse Parallax: Shifts the name layer (±26px X, ±16px Y) and applies 3D perspective
 *    rotational tilt (±4.5deg Y, ±3deg X) in the opposite direction of the cursor.
 */

(function () {
  'use strict';

  function initHeroEngine() {
    const titleContainer = document.getElementById('massiveText');
    const chars = document.querySelectorAll('#heroMassiveTitle .char');
    const parallaxLayer = document.getElementById('heroParallaxLayer');
    const cornerLabels = document.querySelectorAll('.hero-corner-label');
    const topNavBar = document.getElementById('topNavBar');
    const heroScrollCue = document.getElementById('heroScrollCue');

    // --- 1. Dynamic Per-Character Linear Gradient Alignment ---
    function alignGradient() {
      if (!titleContainer || chars.length === 0) return;
      const containerRect = titleContainer.getBoundingClientRect();
      const totalWidth = containerRect.width;

      if (totalWidth <= 0) return;

      titleContainer.style.setProperty('--title-w', `${totalWidth}px`);

      chars.forEach((c) => {
        const cRect = c.getBoundingClientRect();
        const offsetX = cRect.left - containerRect.left;
        c.style.setProperty('--char-x', `${offsetX}px`);
      });
    }

    // Run gradient alignment immediately
    alignGradient();
    window.addEventListener('resize', alignGradient, { passive: true });
    window.addEventListener('orientationchange', alignGradient, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(alignGradient);
    }

    // --- 2. GSAP Entrance Orchestration ---
    if (typeof gsap !== 'undefined' && chars.length > 0) {
      // Set initial hidden states
      gsap.set(chars, {
        opacity: 0,
        y: 40,
        filter: 'blur(8px)'
      });

      if (cornerLabels.length > 0) {
        gsap.set(cornerLabels, {
          opacity: 0,
          y: 8
        });
      }

      if (topNavBar) {
        gsap.set(topNavBar, {
          opacity: 0,
          y: -14,
          pointerEvents: 'none'
        });
      }

      if (heroScrollCue) {
        gsap.set(heroScrollCue, {
          opacity: 0
        });
      }

      // Step A: Kinetic Stagger Entrance for 'TANVI KAKARALA'
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.95,
        stagger: 0.04,
        ease: 'back.out(1.5)',
        delay: 0.12,
        onUpdate: function () {
          if (this.progress() < 0.25) alignGradient();
        },
        onComplete: function () {
          alignGradient();
        }
      });

      // Step B: Minimal Movie-Poster Corner Labels Fade In at Bottom
      if (cornerLabels.length > 0) {
        gsap.to(cornerLabels, {
          opacity: 0.85,
          y: 0,
          duration: 0.75,
          delay: 0.85,
          ease: 'power2.out'
        });
      }

      // Step C: Top-Right Rectangular Navbar Glides Into Corner
      if (topNavBar) {
        gsap.to(topNavBar, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: 1.05,
          ease: 'power3.out',
          onComplete: function () {
            topNavBar.style.pointerEvents = 'auto';
            topNavBar.style.transform = 'translateY(0)';
          }
        });
      }

      // Step D: Minimal Scroll Cue Fades In at Bottom Center
      if (heroScrollCue) {
        gsap.to(heroScrollCue, {
          opacity: 0.7,
          duration: 0.6,
          delay: 1.25,
          ease: 'power2.out'
        });
      }
    } else {
      // Graceful fallback if GSAP is unavailable
      chars.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
        c.style.filter = 'none';
      });
      if (cornerLabels.length > 0) {
        cornerLabels.forEach((cl) => {
          cl.style.opacity = '0.85';
          cl.style.transform = 'none';
        });
      }
      if (topNavBar) {
        topNavBar.style.opacity = '1';
        topNavBar.style.transform = 'none';
        topNavBar.style.pointerEvents = 'auto';
      }
      if (heroScrollCue) {
        heroScrollCue.style.opacity = '0.7';
      }
    }

    // --- 3. 3D Spatial Mouse Parallax & Perspective Tilt Engine ---
    if (parallaxLayer) {
      let targetX = 0;
      let targetY = 0;
      let targetRotX = 0;
      let targetRotY = 0;

      let currentX = 0;
      let currentY = 0;
      let currentRotX = 0;
      let currentRotY = 0;
      let parallaxRaf = null;

      function updateParallax() {
        // High-precision damped lerp easing (0.09 factor)
        currentX += (targetX - currentX) * 0.09;
        currentY += (targetY - currentY) * 0.09;
        currentRotX += (targetRotX - currentRotX) * 0.09;
        currentRotY += (targetRotY - currentRotY) * 0.09;

        // Apply true 3D spatial translation + perspective tilt
        parallaxLayer.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

        const isMoving = Math.abs(targetX - currentX) > 0.03 ||
                         Math.abs(targetY - currentY) > 0.03 ||
                         Math.abs(targetRotX - currentRotX) > 0.02 ||
                         Math.abs(targetRotY - currentRotY) > 0.02;

        if (isMoving) {
          parallaxRaf = requestAnimationFrame(updateParallax);
        } else {
          parallaxRaf = null;
        }
      }

      function handleMouseMove(e) {
        // Normalized cursor coordinates (-0.5 to +0.5 from center)
        const nx = (e.clientX / window.innerWidth) - 0.5;
        const ny = (e.clientY / window.innerHeight) - 0.5;

        // 1. Noticeable floating shift in opposite direction of cursor (±26px horizontal, ±16px vertical)
        targetX = -nx * 52;
        targetY = -ny * 32;

        // 2. Dynamic 3D perspective rotational tilt (±4.5deg Y-axis, ±3.0deg X-axis)
        targetRotY = -nx * 9.0;
        targetRotX = ny * 6.0;

        if (!parallaxRaf) {
          parallaxRaf = requestAnimationFrame(updateParallax);
        }
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Safety fallback: Ensure full visibility after 2.5s
    setTimeout(() => {
      chars.forEach((c) => {
        c.style.opacity = '1';
        c.style.filter = 'none';
      });
      if (cornerLabels.length > 0) {
        cornerLabels.forEach((cl) => { cl.style.opacity = '0.85'; });
      }
      if (topNavBar) {
        topNavBar.style.opacity = '1';
        topNavBar.style.pointerEvents = 'auto';
      }
      if (heroScrollCue) heroScrollCue.style.opacity = '0.7';
      alignGradient();
    }, 2500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroEngine);
  } else {
    initHeroEngine();
  }
})();
