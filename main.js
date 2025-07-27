// ===== NAVBAR BLUEPRINT CANVAS =====
let lastW = 0, lastH = 0;
function animateBlueprintNavbar() {
  const canvas = document.getElementById('navbar-blueprint');
  const nav = document.querySelector('.main-header');
  if (!canvas || !nav) return;

  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth * dpr;
  const h = nav.offsetHeight * dpr;
  if (lastW !== w || lastH !== h) {
    canvas.width = w;
    canvas.height = h;
    canvas.style.width  = window.innerWidth + 'px';
    canvas.style.height = nav.offsetHeight  + 'px';
    lastW = w; lastH = h;
  }

  const ctx = canvas.getContext('2d');
  ctx.setTransform(1,0,0,1,0,0);
  ctx.scale(dpr, dpr);
  const t = performance.now() / 1200;
  ctx.clearRect(0, 0, window.innerWidth, nav.offsetHeight);

  // líneas horizontales
  for (let i = 0; i < 4; i++) {
    const y = 25 + i * (nav.clientHeight / 6);
    const alpha = 0.13 + 0.09 * Math.abs(Math.sin(t + i));
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(window.innerWidth, y);
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 1.1;
    ctx.setLineDash([10,12]);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // líneas verticales
  for (let i = 0; i < window.innerWidth / 140; i++) {
    const x = 80 + i * 140;
    const alpha = 0.12 + 0.08 * Math.abs(Math.cos(t + i));
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, nav.clientHeight);
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 1.05;
    ctx.setLineDash([7,12]);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // círculos pulsantes
  for (let i = 0; i < 7; i++) {
    const cx = 60 + i * (window.innerWidth - 120) / 6;
    const cy = nav.clientHeight/2 + (i%2===0? -30: 38);
    const pulse = 7 + 3 * Math.abs(Math.sin(t*1.1 + i));
    const alpha = 0.12 + 0.20 * Math.abs(Math.cos(t*1.1 + i));
    ctx.beginPath();
    ctx.arc(cx, cy, pulse, 0, 2*Math.PI);
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = alpha;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // regla inferior
  const rulerY = nav.clientHeight - 24;
  ctx.beginPath();
  ctx.moveTo(30, rulerY);
  ctx.lineTo(window.innerWidth - 30, rulerY);
  ctx.strokeStyle = 'rgba(255,255,255,0.44)';
  ctx.lineWidth = 2.3;
  ctx.stroke();

  // marcas y números (opcional)
  const step = 24;
  for (let x = 30, k = 0; x < window.innerWidth - 30; x += step) {
    const tall = (x/step)%5===0? 19:10;
    const ani = 1.0 + 0.22 * Math.sin(t*1.7 + x/100);
    ctx.beginPath();
    ctx.moveTo(x, rulerY);
    ctx.lineTo(x, rulerY - tall*ani);
    ctx.strokeStyle = 'rgba(255,255,255,0.38)';
    ctx.lineWidth = (x/step)%5===0? 2.1:1.2;
    ctx.stroke();
    if ((x/step)%5===0) {
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.40)';
      ctx.fillText(`${k*5}`, x-7, rulerY+17);
      k++;
    }
  }

  requestAnimationFrame(animateBlueprintNavbar);
}

// ===== DOMContentLoaded ÚNICO =====
window.addEventListener('DOMContentLoaded', () => {
  // inicializa blueprint
  animateBlueprintNavbar();
  window.addEventListener('resize', animateBlueprintNavbar);

  // scroll header
  window.addEventListener('scroll', () => {
    document.querySelector('.main-header')
      .classList.toggle('scrolled', window.scrollY > 50);
  });

  // fade-in
  const fades = document.querySelectorAll('.fade-in, .animate-fade-up');
  const reveal = () => fades.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight-50)
      el.classList.add('visible');
  });
  window.addEventListener('scroll', reveal);
  reveal();

  // contadores
  const counters = document.querySelectorAll('.contador-valor');
  let done = false;
  const runCounters = () => {
    if (done) return;
    counters.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight-80) {
        const end = +el.dataset.valor;
        let startTime = null;
        const step = ts => {
          if (!startTime) startTime = ts;
          const prog = Math.min((ts - startTime)/1400, 1);
          el.textContent = Math.floor(prog * end);
          if (prog < 1) requestAnimationFrame(step);
          else { el.textContent = end; done = true; }
        };
        requestAnimationFrame(step);
      }
    });
  };
  window.addEventListener('scroll', runCounters, { passive: true });
  runCounters();

  // typewriter
  const tw = document.getElementById('typewriter');
  if (tw) {
    let i=0, txt='Integra Arquitectos Laguirre';
    const escribe = () => {
      if (i < txt.length) {
        tw.innerHTML += txt[i++];
        setTimeout(escribe, 120);
      }
    };
    escribe();
  }

  // acordeón
  document.querySelectorAll('.acordeon-item').forEach(item =>
    item.addEventListener('click', () => {
      document.querySelectorAll('.acordeon-item')
        .forEach(i=>i.classList.remove('active'));
      item.classList.toggle('active');
    })
  );

  // hamburguesa
  const tog = document.getElementById('hamburger-toggle');
  const menu = document.querySelector('.nav-list-wide');
  if (tog && menu) {
    tog.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a')
      .forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }

  // scroll-spy
  const secs = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-list-wide a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l=>l.classList.remove('active'));
        document.querySelector(`.nav-list-wide a[href*="${e.target.id}"]`)
          ?.classList.add('active');
      }
    });
  }, { threshold: 0.6 });
  secs.forEach(s=>spy.observe(s));
});
