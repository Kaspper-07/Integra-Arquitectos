// ========== ANIMACIONES FADE-IN y FADE-UP ==========
document.addEventListener("DOMContentLoaded", () => {
  const animatedEls = document.querySelectorAll('.fade-in, .animate-fade-up');
  function revealOnScroll() {
    animatedEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  
});

// ========== CONTADOR ANIMADO ==========
function animateCounter(el, value, duration = 1400) {
  let start = 0;
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = Math.min((timestamp - startTime) / duration, 1);
    el.textContent = Math.floor(progress * (value - start) + start);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = value;
      el.parentElement.parentElement.classList.add('active');
      setTimeout(() => el.parentElement.parentElement.classList.remove('active'), 650);
    }
  }
  requestAnimationFrame(step);
}

function activateCountersWhenVisible() {
  const counters = document.querySelectorAll('.contador-valor');
  let activated = false;
  function onScroll() {
    if (activated) return;
    counters.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        animateCounter(el, parseInt(el.dataset.valor, 10));
        activated = true;
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Por si ya está en pantalla al cargar
}
document.addEventListener('DOMContentLoaded', activateCountersWhenVisible);

// ========== BLUEPRINT NAVBAR ANIMADO (sin parpadeos) ==========
function animateBlueprintNavbar() {
  const canvas = document.getElementById('navbar-blueprint');
  const nav = document.querySelector('.main-header');
  if (!canvas || !nav) return;

  // Solo redimensiona el canvas si el tamaño cambió (NO en cada frame)
  const navHeight = nav.offsetHeight;
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth * dpr;
  const height = navHeight * dpr;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = navHeight + "px";
  }

  const ctx = canvas.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  const t = performance.now() / 1200;
  ctx.clearRect(0, 0, window.innerWidth, navHeight);

  // Líneas horizontales animadas
  for (let i = 0; i < 4; i++) {
    const y = 25 + i * (navHeight / 6);
    const alpha = 0.13 + 0.09 * Math.abs(Math.sin(t + i));
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(window.innerWidth, y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = 1.1;
    ctx.setLineDash([10, 12]);
    ctx.stroke();
  }

  // Líneas verticales animadas
  for (let i = 0; i < window.innerWidth / 140; i++) {
    const x = 80 + i * 140;
    const alpha = 0.12 + 0.08 * Math.abs(Math.cos(t + i));
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, navHeight);
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = 1.05;
    ctx.setLineDash([7, 12]);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Círculos técnicos pulsantes
  for (let i = 0; i < 7; i++) {
    let cx = 60 + i * (window.innerWidth - 120) / 6;
    let cy = navHeight / 2 + ((i % 2 === 0) ? -30 : 38);
    let pulse = 7 + 3 * Math.abs(Math.sin(t * 1.1 + i));
    let alpha = 0.12 + 0.20 * Math.abs(Math.cos(t * 1.1 + i));
    ctx.beginPath();
    ctx.arc(cx, cy, pulse, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = alpha;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Escalímetro animado (regla técnica)
  const rulerY = navHeight - 24;
  const step = 24;
  ctx.beginPath();
  ctx.moveTo(30, rulerY);
  ctx.lineTo(window.innerWidth - 30, rulerY);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.44)";
  ctx.lineWidth = 2.3;
  ctx.setLineDash([]);
  ctx.shadowColor = "rgba(255, 255, 255, 0.25)";
  ctx.shadowBlur = 4;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Marcas animadas de escalímetro
  for (let x = 30; x < window.innerWidth - 30; x += step) {
    let tall = (x / step) % 5 === 0 ? 19 : 10;
    let ani = 1.0 + 0.22 * Math.sin(t * 1.7 + x / 100);
    ctx.beginPath();
    ctx.moveTo(x, rulerY);
    ctx.lineTo(x, rulerY - tall * ani);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.38)";
    ctx.lineWidth = (x / step) % 5 === 0 ? 2.1 : 1.2;
    ctx.stroke();
  }

  // Numeritos de escala (cada 5 marcas)
  ctx.font = "11px monospace";
  ctx.fillStyle = "rgba(255, 255, 255, 0.40)";
  for (let x = 30, k = 0; x < window.innerWidth - 30; x += step) {
    if ((x / step) % 5 === 0) {
      ctx.fillText(`${k * 5}`, x - 7, rulerY + 17);
      k++;
    }
  }

  requestAnimationFrame(animateBlueprintNavbar);
}
window.addEventListener('resize', animateBlueprintNavbar);
window.addEventListener('DOMContentLoaded', animateBlueprintNavbar);

// ========== TYPEWRITER HERO ==========
function typeWriterEffect(element, text, speed = 120) {
  let i = 0;
  element.innerHTML = ''; // Asegura que esté limpio

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

document.addEventListener('DOMContentLoaded', () => {
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    typeWriterEffect(typewriter, 'Integra Arquitectos Laguirre', 120);
  }
});


// ========== ACORDEON ESPECIALIDADES ==========
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.acordeon-item').forEach(item => {
    item.addEventListener('click', function(e) {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        return;
      }
      document.querySelectorAll('.acordeon-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// ========== NAVBAR STICKY + SCROLLED ==========
window.addEventListener('scroll', () => {
  document.querySelector('.main-header')
    .classList.toggle('scrolled', window.scrollY > 50);
});

// ========== SCROLL-SPY (menú activo según sección) ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list-wide a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-list-wide a[href*="${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      link && link.classList.add('active');
    }
  });
}, { threshold: 0.6 });
sections.forEach(sec => spy.observe(sec));


document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("hamburger-toggle");
  const menu = document.querySelector(".nav-list-wide");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    // Cerrar el menú al hacer clic en un enlace
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
      });
    });
  }
});
