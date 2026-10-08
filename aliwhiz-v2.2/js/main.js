document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile menu
  const burger = document.getElementById('burger');
  const links = document.getElementById('links');
  const setMenu = open => { links.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12 });
    items.forEach(el => io.observe(el));
  } else items.forEach(el => el.classList.add('in'));

  // count-up stats
  const fmtIN = n => n.toLocaleString('en-IN');
  const counters = document.querySelectorAll('[data-count]');
  const run = el => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '', inr = el.dataset.format === 'in';
    const t0 = performance.now(), dur = 1400;
    const tick = t => {
      const p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = (inr ? fmtIN(v) : v) + suf + (inr && p === 1 ? '+' : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { run(e.target); co.unobserve(e.target); }
    }), { threshold: .6 });
    counters.forEach(c => co.observe(c));
  } else counters.forEach(c => { if (c.dataset.format === 'in') c.textContent = '2,00,000+'; });

  // bulk enquiry -> WhatsApp
  document.getElementById('enquiry').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const msg = `Hi Ali Whiz, I'd like bulk pricing.\nName: ${f.get('name')}\nBusiness: ${f.get('type')}\nCity: ${f.get('city')}\nEggs per day: ${f.get('qty')}`;
    window.open('https://wa.me/919957687166?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });

  // pack steppers + WhatsApp order links
  document.querySelectorAll('.pack').forEach(card => {
    const price = +card.dataset.price, name = card.dataset.name;
    const qtyEl = card.querySelector('.qty'), totalEl = card.querySelector('.total'), order = card.querySelector('.order');
    let qty = 1;
    const render = () => {
      qtyEl.textContent = qty;
      totalEl.hidden = qty < 2;
      totalEl.textContent = 'Total ₹' + (price * qty).toLocaleString('en-IN');
      const msg = `Hi Ali Whiz, I'd like to order ${qty} × ${name} (Junaki Standard) — MRP ₹${(price * qty).toLocaleString('en-IN')}. Please confirm availability and delivery.`;
      order.href = 'https://wa.me/919957687166?text=' + encodeURIComponent(msg);
    };
    card.querySelector('.minus').addEventListener('click', () => { qty = Math.max(1, qty - 1); render(); });
    card.querySelector('.plus').addEventListener('click', () => { qty = Math.min(99, qty + 1); render(); });
    render();
  });

  // mascot: bubble opens a modal; tap anywhere outside the video, the Close button or Esc closes it
  const bubble = document.getElementById('mascot'), hide = document.getElementById('mascotHide');
  const mm = document.getElementById('mm'), vid = document.getElementById('mmVid'), closeBtn = document.getElementById('mmClose');
  const openMM = () => { mm.hidden = false; vid.currentTime = 0; vid.muted = false; vid.play().catch(() => { vid.muted = true; vid.play().catch(() => {}); }); closeBtn.focus({ preventScroll: true }); };
  const closeMM = () => { mm.hidden = true; vid.pause(); bubble.focus({ preventScroll: true }); };
  bubble.addEventListener('click', e => {
    if (e.target === hide) { bubble.classList.add('gone'); return; }
    openMM();
  });
  hide.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); e.preventDefault(); bubble.classList.add('gone'); } });
  mm.addEventListener('click', e => { if (e.target !== vid) closeMM(); });
  closeBtn.addEventListener('click', closeMM);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mm.hidden) closeMM(); });

  // gallery lightbox: tap anywhere (or Close / Esc) to dismiss
  const lb = document.getElementById('lb'), lbImg = document.getElementById('lbImg');
  let lastTile = null;
  const closeLB = () => { lb.hidden = true; lbImg.removeAttribute('src'); if (lastTile) lastTile.focus({ preventScroll: true }); };
  document.querySelectorAll('.tile').forEach(t => t.addEventListener('click', () => {
    lastTile = t; lbImg.src = t.dataset.full; lbImg.alt = t.dataset.cap; lb.hidden = false;
    document.getElementById('lbClose').focus({ preventScroll: true });
  }));
  lb.addEventListener('click', closeLB);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) closeLB(); });
});
