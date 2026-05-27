/* =============================================
   THINLEY WANGCHUK — ONLINE CV
   script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  /* ── 2. ACTIVE NAV HIGHLIGHT ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── 3. SMOOTH SCROLL FOR NAV LINKS ── */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 4. TYPING EFFECT FOR HERO SUBTITLE ── */
  const roles = ['Educator', 'Digital Creator', 'Language & Literature Graduate', 'Designer'];
  const el = document.getElementById('typing-role');
  if (el) {
    let rIdx = 0, cIdx = 0, deleting = false;

    function type() {
      const word = roles[rIdx];
      el.textContent = deleting ? word.substring(0, cIdx--) : word.substring(0, cIdx++);

      if (!deleting && cIdx > word.length)       { deleting = true; setTimeout(type, 1600); return; }
      if (deleting  && cIdx < 0)                  { deleting = false; rIdx = (rIdx + 1) % roles.length; }

      setTimeout(type, deleting ? 60 : 90);
    }
    type();
  }

  /* ── 5. SKILL PILL ENTRANCE STAGGER ── */
  const pills = document.querySelectorAll('.skill-pill');
  const pillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const allPills = entry.target.parentElement.querySelectorAll('.skill-pill');
        allPills.forEach((p, i) => {
          setTimeout(() => p.classList.add('pill-show'), i * 50);
        });
        pillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (pills.length) pillObserver.observe(pills[0]);

  /* ── 6. BACK TO TOP BUTTON ── */
  const backBtn = document.getElementById('back-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
      backBtn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
    });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

});
