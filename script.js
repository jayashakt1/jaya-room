/* ==========================================================
   JAYA'S ROOM — script
   Small, self-contained interactions. No build step, no
   dependencies — just vanilla JS.
   ========================================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- INTRO OVERLAY ---------- */
const intro = document.getElementById('intro');
const enterBtn = document.getElementById('enterBtn');

function dismissIntro() {
  intro.classList.add('hidden');
}
enterBtn.addEventListener('click', dismissIntro);
// Also let an eager visitor click anywhere on the intro card's backdrop
intro.addEventListener('click', (e) => {
  if (e.target === intro) dismissIntro();
});

/* ---------- MODALS ---------- */
const overlay = document.getElementById('modalOverlay');
const modalCards = Array.from(document.querySelectorAll('.modal-card'));
const hotspots = Array.from(document.querySelectorAll('.hotspot'));

function openModal(name) {
  modalCards.forEach(card => card.classList.toggle('active', card.dataset.modal === name));
  overlay.classList.add('open');
  const active = modalCards.find(c => c.dataset.modal === name);
  if (active) {
    const closeBtn = active.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }
}

function closeModal() {
  overlay.classList.remove('open');
}

hotspots.forEach(spot => {
  spot.addEventListener('click', () => openModal(spot.dataset.modal));
});

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', closeModal);
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    dismissIntro();
  }
});

/* ---------- GALLERY (inside the "my drawings" modal) ---------- */
// Replace/extend this array as you add real artwork to assets/drawings/.
// Each entry just needs a src path and a caption line.
const drawings = [
  { src: 'assets/drawings/placeholder-01.svg', caption: 'little drawing #01' },
  { src: 'assets/drawings/placeholder-02.svg', caption: 'little drawing #02' },
  { src: 'assets/drawings/placeholder-03.svg', caption: 'little drawing #03' },
];
let galleryIndex = 0;

const galleryImage = document.getElementById('galleryImage');
const galleryCaption = document.getElementById('galleryCaption');

function renderGallery() {
  const item = drawings[galleryIndex];
  galleryImage.src = item.src;
  galleryImage.alt = item.caption;
  galleryCaption.innerHTML = `${item.caption}<br><span class="modal-small">made by me ♡</span>`;
}

document.querySelector('.gallery-prev').addEventListener('click', () => {
  galleryIndex = (galleryIndex - 1 + drawings.length) % drawings.length;
  renderGallery();
});
document.querySelector('.gallery-next').addEventListener('click', () => {
  galleryIndex = (galleryIndex + 1) % drawings.length;
  renderGallery();
});

/* ---------- SECRET: the note peeking out from under a book ---------- */
const secretNote = document.getElementById('secretNote');
const secretToast = document.getElementById('secretToast');
let toastTimer;

function showSecret(text) {
  secretToast.textContent = text;
  secretToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => secretToast.classList.remove('show'), 2400);
}

if (secretNote) {
  secretNote.addEventListener('click', (e) => {
    e.stopPropagation();
    showSecret('you found me.');
  });
}

/* ---------- AMBIENT PARTICLES (dust / fireflies) ---------- */
// Skipped entirely when the visitor prefers reduced motion.
const particleField = document.getElementById('particles');

if (!prefersReducedMotion) {
  const PARTICLE_COUNT = 16;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${10 + Math.random() * 12}s`;
    p.style.animationDelay = `${Math.random() * 12}s`;
    p.style.opacity = String(0.3 + Math.random() * 0.4);
    const size = 3 + Math.random() * 4;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    const colors = ['#F3D98B', '#EFB6B8', '#C9B7D8', '#AFCFE0'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    particleField.appendChild(p);
  }
}

/* ---------- CLICK SPARKLES ---------- */
// A tiny sparkle blooms wherever the visitor clicks, then fades.
if (!prefersReducedMotion) {
  document.addEventListener('click', (e) => {
    const sparkle = document.createElement('span');
    sparkle.className = 'click-sparkle';
    sparkle.textContent = ['✦', '✧', '⋆', '✿'][Math.floor(Math.random() * 4)];
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 650);
  });
}
