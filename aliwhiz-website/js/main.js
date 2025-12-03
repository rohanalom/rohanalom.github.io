// basic interactions: mobile nav + reveal on scroll + year
document.addEventListener('DOMContentLoaded', function () {
  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // mobile nav
  const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');
  const mobileNav = document.getElementById('mobileNav');

  function openNav() {
    if (!mobileNav) return;
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileNav.classList.add('open');
  }
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNav.classList.remove('open');
  }

  if (navToggle) navToggle.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);

  // close when clicking a mobile link
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  // simple intersection observer for fade-in
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade').forEach(el => io.observe(el));

  // smooth scroll to anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (ev) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          ev.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
