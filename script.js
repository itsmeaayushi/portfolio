gsap.registerPlugin(ScrollTrigger);

gsap.from('header', {
  opacity: 0,
  y: -40,
  duration: 1,
  ease: 'power3.out'
});

gsap.from('.hero-meta p', {
  opacity: 0,
  y: 24,
  stagger: 0.12,
  duration: 0.8,
  ease: 'power3.out'
});

gsap.from('.hero h1', {
  opacity: 0,
  y: 120,
  duration: 1.3,
  ease: 'power4.out',
  delay: 0.2
});

gsap.utils.toArray('.cards .card').forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 90%'
    },
    opacity: 0,
    y: 120,
    scale: 0.96,
    duration: 1,
    ease: 'power3.out',
    delay: index * 0.08
  });
});

gsap.from('.testimonial .quote-mark', {
  scrollTrigger: {
    trigger: '.testimonial',
    start: 'top 90%'
  },
  opacity: 0,
  scale: 0.8,
  duration: 0.9,
  ease: 'power3.out'
});

gsap.from('.testimonial .quote-copy p', {
  scrollTrigger: {
    trigger: '.testimonial',
    start: 'top 90%'
  },
  opacity: 0,
  x: -90,
  duration: 1,
  ease: 'power3.out',
  delay: 0.1
});

gsap.from('.avatars img', {
  scrollTrigger: {
    trigger: '.testimonial',
    start: 'top 90%'
  },
  opacity: 0,
  y: 40,
  stagger: 0.1,
  duration: 0.7
});

gsap.from('.about-copy p', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 90%'
  },
  opacity: 0,
  y: 60,
  stagger: 0.12,
  duration: 0.95,
  ease: 'power3.out'
});

gsap.from('.about-profile', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 90%'
  },
  opacity: 0,
  x: 80,
  duration: 1,
  ease: 'power3.out'
});

gsap.utils.toArray('.experience .item').forEach((item) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 90%'
    },
    opacity: 0,
    x: -90,
    duration: 1,
    ease: 'power3.out'
  });
});

gsap.utils.toArray('.offscreen-gallery img').forEach((img) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: 'top 95%'
    },
    opacity: 0,
    y: 80,
    duration: 0.9,
    ease: 'power3.out'
  });
});

gsap.utils.toArray('.work-grid img').forEach((img) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: 'top 95%'
    },
    opacity: 0,
    y: 80,
    scale: 0.98,
    duration: 0.9,
    ease: 'power3.out'
  });
});

gsap.from('.contact h2', {
  scrollTrigger: {
    trigger: '.contact',
    start: 'top 95%'
  },
  opacity: 0,
  y: 90,
  duration: 1.1,
  ease: 'power3.out'
});

gsap.from('.contact button', {
  scrollTrigger: {
    trigger: '.contact',
    start: 'top 95%'
  },
  opacity: 0,
  y: 50,
  duration: 0.8,
  delay: 0.12,
  ease: 'power3.out'
});

const supportsCardHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (supportsCardHover) {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(card, {
        rotationY: x / 18,
        rotationX: -y / 18,
        transformPerspective: 900,
        transformOrigin: 'center',
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  });
}

const workGrid = document.querySelector('.work-grid');
if (workGrid) {
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  workGrid.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.pageX - workGrid.offsetLeft;
    scrollLeft = workGrid.scrollLeft;
    workGrid.style.cursor = 'grabbing';
    event.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    workGrid.style.cursor = 'grab';
  });

  workGrid.addEventListener('mouseleave', () => {
    isDragging = false;
    workGrid.style.cursor = 'grab';
  });

  workGrid.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    const x = event.pageX - workGrid.offsetLeft;
    const walk = (x - startX) * 1.2;
    workGrid.scrollLeft = scrollLeft - walk;
  });

  workGrid.addEventListener('touchstart', (event) => {
    isDragging = true;
    startX = event.touches[0].pageX - workGrid.offsetLeft;
    scrollLeft = workGrid.scrollLeft;
  });

  workGrid.addEventListener('touchmove', (event) => {
    if (!isDragging) return;
    const x = event.touches[0].pageX - workGrid.offsetLeft;
    const walk = (x - startX) * 1.2;
    workGrid.scrollLeft = scrollLeft - walk;
  });

  workGrid.addEventListener('touchend', () => {
    isDragging = false;
  });

  workGrid.style.cursor = 'grab';
}

document.querySelectorAll('.gallery-item').forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.dataset.src;
    const modal = document.querySelector('.image-modal');
    const modalImg = modal.querySelector('.image-modal-img');

    modalImg.src = src;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('active');
  });
});

const modal = document.querySelector('.image-modal');
const modalClose = modal.querySelector('.image-modal-close');
const modalBackdrop = modal.querySelector('.image-modal-backdrop');

const closeModal = () => {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modal.querySelector('.image-modal-img').src = '';
};

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});
