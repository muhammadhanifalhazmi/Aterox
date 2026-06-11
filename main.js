/**
 * ATEROX FnB Landing Page — js/main.js
 * Features:
 *   1. Navbar shadow on scroll
 *   2. Smooth scroll for all internal links (with navbar offset)
 *   3. Active nav link tracking
 *   4. Scroll reveal (IntersectionObserver)
 *   5. Workflow step-line fill animation
 *   6. Mobile navbar auto-close on link click
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
        Triggers when the Workflow section enters viewport
     ───────────────────────────────────────────── */
  if (stepsLine && workflowSec && 'IntersectionObserver' in window) {

    const lineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Short delay so the steps have started their reveal first
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
        (desktop only, opt-in via prefers-reduced-motion check)
     ───────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mockupWeb    = document.querySelector('.atx-mockup-img--web');
  const heroSection  = document.querySelector('.atx-hero');

  if (!prefersReducedMotion && mockupWeb && heroSection && window.innerWidth >= 992) {

    heroSection.addEventListener('mousemove', function (e) {
      const rect   = heroSection.getBoundingClientRect();
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;
      const dx = (e.clientX - rect.left  - centerX) / centerX; // -1 to 1
      const dy = (e.clientY - rect.top   - centerY) / centerY; // -1 to 1

      const rotY = 8  + dx * -4; // subtle: base 8deg ± 4
      const rotX = 3  + dy *  2; // subtle: base 3deg ± 2

      mockupWeb.style.transform =
        `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    });

    heroSection.addEventListener('mouseleave', function () {
      mockupWeb.style.transform =
        'perspective(1000px) rotateY(8deg) rotateX(3deg)';
    });
  }

})();

// ==================== LOGIKA KALKULATOR KERUGIAN ====================
const omsetRange = document.getElementById('omset-range');
const wasteRange = document.getElementById('waste-range');
const omsetVal = document.getElementById('omset-val');
const wasteVal = document.getElementById('waste-val');
const lossResult = document.getElementById('loss-result');

function hitungKerugian() {
    const omset = parseInt(omsetRange.value);
    const wastePercent = parseInt(wasteRange.value);
    
    // Update Teks Tampilan Slider
    omsetVal.innerText = 'Rp ' + omset.toLocaleString('id-ID');
    wasteVal.innerText = wastePercent + '%';
    
    // Hitung Estimasi Kerugian Mentah
    const totalLoss = omset * (wastePercent / 100);
    lossResult.innerText = 'Rp ' + totalLoss.toLocaleString('id-ID');
}

if(omsetRange && wasteRange) {
    omsetRange.addEventListener('input', hitungKerugian);
    wasteRange.addEventListener('input', hitungKerugian);
}

// ==================== LOGIKA FAQ ACCORDION ====================
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('.faq-icon');
        
        // Cek apakah item ini sudah terbuka
        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = '0px';
            icon.innerText = '+';
            icon.style.transform = 'rotate(0deg)';
        } else {
            // Tutup semua FAQ lain yang mungkin kebuka (Optional, biar rapi)
            document.querySelectorAll('.faq-content').forEach(el => el.style.maxHeight = '0px');
            document.querySelectorAll('.faq-icon').forEach(el => {
                el.innerText = '+';
                el.style.transform = 'rotate(0deg)';
            });
            
            // Buka item yang di-klik
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.innerText = '-';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});