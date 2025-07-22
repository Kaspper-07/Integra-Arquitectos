// ===== Animación blueprint HERO =====
(function(){
  const canvas = document.getElementById('hero-bg');
  if (!canvas) return;
  
  function resize() {
    canvas.width = window.innerWidth;
    // Usa el alto real del hero, ¡siempre!
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const ctx = canvas.getContext('2d');
  function drawBlueprint() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255,255,255,0.10)';
    ctx.lineWidth = 1;
    const gap = 52;
    const time = Date.now() * 0.0008;

    // Líneas verticales animadas
    for (let x = 0; x < canvas.width; x += gap) {
      ctx.beginPath();
      ctx.moveTo(x + Math.sin(time + x * 0.01) * 5, 0);
      ctx.lineTo(x + Math.sin(time + x * 0.01) * 5, canvas.height);
      ctx.stroke();
    }
    // Líneas horizontales animadas
    for (let y = 0; y < canvas.height; y += gap) {
      ctx.beginPath();
      ctx.moveTo(0, y + Math.cos(time + y * 0.01) * 5);
      ctx.lineTo(canvas.width, y + Math.cos(time + y * 0.01) * 5);
      ctx.stroke();
    }
    requestAnimationFrame(drawBlueprint);
  }
  drawBlueprint();
})();


// ===== Efecto fade-in para las secciones al hacer scroll (opcional) =====
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  function onScroll() {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        el.classList.add('visible');
      }
    });
  }
  onScroll();
  window.addEventListener('scroll', onScroll);
});

function drawGridLinesInHeader() {
  const canvas = document.getElementById('header-lines-bg');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('header').offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const spacing = 40;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x < canvas.width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < canvas.height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  draw();
}

window.addEventListener('load', () => {
  drawGridLinesInHeader();
});
