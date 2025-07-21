// ====== HEADER: LÍNEAS ARQUITECTÓNICAS ANIMADAS ======

function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.header-hero').offsetHeight;
}

function drawArchitectLines(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  ctx.lineWidth = 1.2;
  ctx.setLineDash([6, 8]);

  // Líneas horizontales animadas
  for (let i = 1; i < 8; i++) {
    let y = (h / 8) * i + Math.sin(Date.now() / 1200 + i) * 6;
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(w - 40, y);
    ctx.stroke();
  }
  // Líneas verticales animadas
  for (let i = 1; i < 8; i++) {
    let x = (w / 8) * i + Math.cos(Date.now() / 1600 + i) * 7;
    ctx.beginPath();
    ctx.moveTo(x, 30);
    ctx.lineTo(x, h - 30);
    ctx.stroke();
  }
  // Líneas diagonales animadas
  ctx.setLineDash([]);
  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  for (let i = 1; i < 5; i++) {
    let progress = ((Date.now()/2000)+i)%1;
    ctx.beginPath();
    ctx.moveTo(w * progress, 0);
    ctx.lineTo(w, h * progress);
    ctx.stroke();
  }
}

// Inicializa animación de header al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('architect-lines');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function animate() {
    resizeCanvas(canvas);
    drawArchitectLines(ctx, canvas.width, canvas.height);
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => resizeCanvas(canvas));
});


// ====== BODY: LÍNEAS BLUEPRINT ANIMADAS EN EL FONDO ======

function resizeBgCanvas() {
  const bgCanvas = document.getElementById('bg-lines');
  if (!bgCanvas) return;
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}

function drawBgLines() {
  const canvas = document.getElementById('bg-lines');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(32,80,183,0.21)";
  ctx.lineWidth = 1;
  ctx.setLineDash([12, 20]);
  // Líneas horizontales animadas
  for (let i = 1; i < 16; i++) {
    let y = (canvas.height / 16) * i + Math.sin(Date.now() / 2000 + i) * 9;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  // Líneas verticales animadas
  for (let i = 1; i < 12; i++) {
    let x = (canvas.width / 12) * i + Math.cos(Date.now() / 2100 + i) * 7;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  requestAnimationFrame(drawBgLines);
}

// Inicializa animación de fondo al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  resizeBgCanvas();
  drawBgLines();
  window.addEventListener('resize', resizeBgCanvas);
});


// ====== EFECTO FADE-IN EN SECCIONES AL SCROLL ======

function revealOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in');
  const trigger = window.innerHeight * 0.92;

  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);


// ====== SCROLL SUAVE PARA LOS ENLACES DEL MENÚ ======

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const offset = target.getBoundingClientRect().top + window.scrollY - 24; // Ajusta -24 si tu header es fijo y alto
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  });
});
