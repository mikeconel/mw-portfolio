/* ============================================================
   Michael Williams Portfolio — main.js
   ============================================================ */

// ── Navbar scroll effect ──────────────────────────────────────
const nav = document.getElementById('siteNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── Fade-up on scroll (IntersectionObserver) ──────────────────
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));
}

// ── Animated counters ─────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('[data-count]');
if (counterEls.length) {
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObs.observe(el));
}

// ── Skill bar animations ───────────────────────────────────────
const skillBars = document.querySelectorAll('.skill-bar-fill');
if (skillBars.length) {
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = (e.target.dataset.width || 0) + '%';
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => barObs.observe(bar));
}

// ── Skills filter ─────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('[data-cat]').forEach(el => {
        if (cat === 'all' || el.dataset.cat === cat) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
    });
  });
}

// ── Active nav link highlighting ──────────────────────────────
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
  });
})();
