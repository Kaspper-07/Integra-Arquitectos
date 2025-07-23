// Animación fade-in y personalizada al hacer scroll
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
  revealOnScroll(); // Ejecutar al cargar por si ya está visible
});


// Contador animado de cifras
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
