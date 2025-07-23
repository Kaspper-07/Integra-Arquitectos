// ============ Animaciones Fade-In y Fade-Up ============ //
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

// ============ Contador animado de cifras ============ //
function animateCounter(element, end, duration = 1600) {
  let start = 0;
  const step = Math.ceil(end / (duration / 16));
  function update() {
    start += step;
    if (start < end) {
      element.textContent = start;
      requestAnimationFrame(update);
    } else {
      element.textContent = end;
    }
  }
  update();
}

// Solo animar cuando aparecen en pantalla
function statsObserver() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  let triggered = false;
  function onScrollStats() {
    const statsSection = document.querySelector('.stats-section');
    if (!triggered && statsSection && statsSection.getBoundingClientRect().top < window.innerHeight - 90) {
      counters.forEach(el => animateCounter(el, parseInt(el.dataset.goal, 10)));
      triggered = true;
      window.removeEventListener('scroll', onScrollStats);
    }
  }
  window.addEventListener('scroll', onScrollStats);
  onScrollStats();
}
document.addEventListener("DOMContentLoaded", statsObserver);

// ============ Blueprint Lines Animation (Hero) ============ //
function drawBlueprintLines() {
  const canvas = document.getElementById('blueprint-lines');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  // Ajuste para pantallas retina/dispositivos con alta densidad de pixeles
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width = window.innerWidth * dpr;
  const h = canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Vertical lines
  for(let i = 0; i < window.innerWidth; i += 120) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, window.innerHeight);
    ctx.strokeStyle = 'rgba(200, 169, 112, 0.11)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 10]);
    ctx.stroke();
  }
  // Horizontal lines
  for(let i = 0; i < window.innerHeight; i += 120) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(window.innerWidth, i);
    ctx.strokeStyle = 'rgba(200, 169, 112, 0.12)';
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 16]);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}
// Redibuja en resize y al cargar
window.addEventListener('resize', drawBlueprintLines);
window.addEventListener('DOMContentLoaded', drawBlueprintLines);
