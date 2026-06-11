/**
 * ATEROX FnB Landing Page — js/main.js
 * Features:
 * 1. Navbar shadow on scroll
 * 2. Smooth scroll for all internal links (with navbar offset)
 * 3. Active nav link tracking
 * 4. Scroll reveal (IntersectionObserver)
 * 5. Workflow step-line fill animation
 * 6. Mobile navbar auto-close on link click
 * 7. Interaktif Kalkulator Kerugian & FAQ Accordion
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     CACHE DOM REFERENCES
     ───────────────────────────────────────────── */
  const navbar      = document.getElementById('mainNavbar');
  const navLinks    = document.querySelectorAll('.atx-nav-link[href^="#"]');
  const sections    = document.querySelectorAll('main section[id]');
  const revealEls   = document.querySelectorAll('.atx-reveal');
  const stepsLine   = document.getElementById('stepsLineFill');
  const workflowSec = document.getElementById('workflow');
  const navCollapse = document.getElementById('navMain');


  /* ─────────────────────────────────────────────
     1. NAVBAR — shadow on scroll
     ───────────────────────────────────────────── */
  function onScroll() {
    if (!navbar) return;

    // Navbar shadow
    if (window.scrollY > 24) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }

    // Active nav link tracking
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run immediately on page load


  /* ─────────────────────────────────────────────
     2. SMOOTH SCROLL — all internal href="#..." links
     ───────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetSelector = this.getAttribute('href');

      // Skip bare "#" links
      if (!targetSelector || targetSelector === '#') return;

      const target = document.querySelector(targetSelector);
      if (!target) return;

      e.preventDefault();

      // Account for fixed navbar height + a small breathing room
      const navH   = navbar ? navbar.offsetHeight : 70;
      const offset = target.getBoundingClientRect().top + window.scrollY - navH - 12;

      window.scrollTo({ top: offset, behavior: 'smooth' });

      // Auto-close mobile navbar if open
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsNav = bootstrap.Collapse.getInstance(navCollapse);
        if (bsNav) bsNav.hide();
      }
    });
  });


  /* ─────────────────────────────────────────────
     3. ACTIVE NAV LINK — highlight on scroll
     ───────────────────────────────────────────── */
  function updateActiveLink() {
    if (!navLinks.length || !sections.length) return;

    const scrollMid = window.scrollY + (navbar ? navbar.offsetHeight : 70) + 80;
    let currentId   = '';

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollMid) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('active', isActive);
    });
  }


  /* ─────────────────────────────────────────────
     4. SCROLL REVEAL — IntersectionObserver
     ───────────────────────────────────────────── */
  if ('IntersectionObserver' in window && revealEls.length) {

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target); // fire once
          }
        });
      },
      {
        threshold:  0.12,
        rootMargin: '0px 0px -48px 0px',
      }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

  } else {
    // Fallback: just show everything if observer unavailable
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }


  /* ─────────────────────────────────────────────
     5. WORKFLOW STEP-LINE FILL ANIMATION
     ───────────────────────────────────────────── */
  if (stepsLine && workflowSec && 'IntersectionObserver' in window) {

    const lineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              stepsLine.classList.add('animated');
            }, 300);
            lineObserver.unobserve(workflowSec);
          }
        });
      },
      { threshold: 0.3 }
    );

    lineObserver.observe(workflowSec);
  }


  /* ─────────────────────────────────────────────
     6. HERO MOCKUP — subtle parallax on mouse move
     ───────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mockupWeb    = document.querySelector('.atx-mockup-img--web');
  const heroSection  = document.querySelector('.atx-hero');

  if (!prefersReducedMotion && mockupWeb && heroSection && window.innerWidth >= 992) {

    heroSection.addEventListener('mousemove', function (e) {
      const rect   = heroSection.getBoundingClientRect();
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;
      const dx = (e.clientX - rect.left  - centerX) / centerX;
      const dy = (e.clientY - rect.top   - centerY) / centerY;

      const rotY = 8  + dx * -4;
      const rotX = 3  + dy * 2;

      mockupWeb.style.transform =
        `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    });

    heroSection.addEventListener('mouseleave', function () {
      mockupWeb.style.transform =
        'perspective(1000px) rotateY(8deg) rotateX(3deg)';
    });
  }


  /* ─────────────────────────────────────────────
     7. LOGIKA KALKULATOR KERUGIAN
     ───────────────────────────────────────────── */
  const omsetRange = document.getElementById('omset-range');
  const wasteRange = document.getElementById('waste-range');
  const omsetVal = document.getElementById('omset-val');
  const wasteVal = document.getElementById('waste-val');
  const lossResult = document.getElementById('loss-result');

  function hitungKerugian() {
      if (!omsetRange || !wasteRange) return;
      const omset = parseInt(omsetRange.value);
      const wastePercent = parseInt(wasteRange.value);
      
      if (omsetVal) omsetVal.innerText = 'Rp ' + omset.toLocaleString('id-ID');
      if (wasteVal) wasteVal.innerText = wastePercent + '%';
      
      const totalLoss = omset * (wastePercent / 100);
      if (lossResult) lossResult.innerText = 'Rp ' + totalLoss.toLocaleString('id-ID');
  }

  if (omsetRange && wasteRange) {
      omsetRange.addEventListener('input', hitungKerugian);
      wasteRange.addEventListener('input', hitungKerugian);
  }


  /* ─────────────────────────────────────────────
     8. LOGIKA FAQ ACCORDION
     ───────────────────────────────────────────── */
  const faqToggles = document.querySelectorAll('.atx-faq-toggle');

  faqToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
          const content = toggle.nextElementSibling;
          const icon = toggle.querySelector('.atx-faq-icon');
          const isOpen = toggle.getAttribute('aria-expanded') === 'true';
          
          document.querySelectorAll('.atx-faq-content').forEach(el => {
              el.style.maxHeight = '0px';
          });
          document.querySelectorAll('.atx-faq-icon').forEach(el => {
              el.innerText = '+';
              el.style.transform = 'rotate(0deg)';
          });
          document.querySelectorAll('.atx-faq-toggle').forEach(el => {
              el.setAttribute('aria-expanded', 'false');
          });
          
          if (!isOpen) {
              content.style.maxHeight = content.scrollHeight + 'px';
              if (icon) {
                  icon.innerText = '-';
                  icon.style.transform = 'rotate(180deg)';
              }
              toggle.setAttribute('aria-expanded', 'true');
          }
      });
  });


  /* ─────────────────────────────────────────────
     9. STATS COUNTER ANIMATION
     ───────────────────────────────────────────── */
  const statCounters = document.querySelectorAll('.atx-stat-count');

  if (statCounters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current.toLocaleString('id-ID') + suffix;
            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target.toLocaleString('id-ID') + suffix;
            }
          }

          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statCounters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }


  /* ─────────────────────────────────────────────
     10. FLOATING WHATSAPP — show on scroll
     ───────────────────────────────────────────── */
  const waFloat = document.getElementById('waFloat');

  if (waFloat) {
    function toggleWaFloat() {
      if (window.scrollY > 400) {
        waFloat.classList.add('is-visible');
      } else {
        waFloat.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', toggleWaFloat, { passive: true });
    toggleWaFloat();
  }


  /* ─────────────────────────────────────────────
     11. BACK TO TOP
     ───────────────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    function toggleBackToTop() {
      if (window.scrollY > 600) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
  }


  /* ─────────────────────────────────────────────
     12. COOKIE CONSENT
     ───────────────────────────────────────────── */
  const cookieConsent = document.getElementById('cookieConsent');
  const cookieAccept  = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');

  if (cookieConsent) {
    if (!localStorage.getItem('atx-cookie')) {
      setTimeout(function () {
        cookieConsent.classList.add('is-visible');
      }, 800);
    }

    function dismissCookie() {
      cookieConsent.classList.remove('is-visible');
      localStorage.setItem('atx-cookie', 'set');
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', dismissCookie);
    }

    if (cookieDecline) {
      cookieDecline.addEventListener('click', dismissCookie);
    }
  }


  /* ─────────────────────────────────────────────
     13. NEWSLETTER FORM
     ───────────────────────────────────────────── */
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = document.getElementById('newsletterEmail');
      const thanks = document.getElementById('newsletterThanks');

      if (input && input.value.trim() && input.checkValidity()) {
        newsletterForm.style.display = 'none';
        if (thanks) {
          thanks.removeAttribute('hidden');
        }
      } else {
        input.focus();
        input.reportValidity();
      }
    });
  }

})();