gsap.registerPlugin(ScrollTrigger);

/* ---------- HERO: subtle opening animation ---------- */
/* Content eases in slightly rather than sliding in from far away */

const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

heroTl
  .from('header', { opacity: 0, y: -16, duration: 0.7 })
  .from('.hero-meta p', { opacity: 0, y: 10, stagger: 0.1, duration: 0.6 }, '-=0.35')
  .from('.hero h1', { opacity: 0, y: 24, duration: 0.9 }, '-=0.3');

/* ---------- PROJECT CARDS ---------- */

gsap.utils.toArray('.cards .card').forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 88%'
    },
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'power3.out',
    delay: index * 0.05
  });
});

/* Note: the old hover-tilt effect on project cards has been removed per request. */

/* ---------- TESTIMONIAL ---------- */

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

gsap.from('.testimonial .quote-copy', {
  scrollTrigger: {
    trigger: '.testimonial',
    start: 'top 90%'
  },
  opacity: 0,
  y: 40,
  duration: 1,
  ease: 'power3.out',
  delay: 0.1
});

gsap.from('.avatar-item', {
  scrollTrigger: {
    trigger: '.testimonial',
    start: 'top 85%'
  },
  opacity: 0,
  y: 30,
  stagger: 0.08,
  duration: 0.6
});

const testimonials = [
  {
    quote: "Thank you for all the contribution you have been making on Infidigit websites. It was great to see your ideas on how to enhance user experience via your design skills. Your designs have helped us improve user experience for our target audience. Your attention to detail and constant eagerness to learn new things have always amazed me.",
    name: 'Reporting Manager',
    company: 'Infidigit'
  },
  {
    quote: "Working across time zones with Ayushi never felt like a hurdle. She translated complex proposals into visuals our international partners immediately understood, and every deadline landed on time.",
    name: 'Product Lead',
    company: 'Global Construction Tech'
  },
  {
    quote: "Ayushi brought a sharp eye for detail to every campaign she touched. Her design work consistently lifted engagement across our social channels and made our brands feel cohesive.",
    name: 'Creative Director',
    company: 'ContiGo'
  }
];

const testimonialSection = document.querySelector('.testimonial');
const avatarsWrap = document.querySelector('.avatars');
const quoteCopyEl = document.querySelector('.quote-copy');
const avatarItems = document.querySelectorAll('.avatar-item');

function setActiveTestimonial(index) {
  const data = testimonials[index];
  if (!data || !quoteCopyEl) return;

  gsap.to(quoteCopyEl, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      quoteCopyEl.textContent = data.quote;
      quoteCopyEl.dataset.active = String(index);
      gsap.to(quoteCopyEl, { opacity: 1, duration: 0.35 });
    }
  });

  avatarItems.forEach((item) => {
    item.classList.toggle('is-active', Number(item.dataset.index) === index);
  });
}

if (testimonialSection && avatarsWrap) {
  // Hovering the testimonial area spreads the stacked avatars apart
  testimonialSection.addEventListener('mouseenter', () => {
    avatarsWrap.setAttribute('data-state', 'expanded');
  });

  testimonialSection.addEventListener('mouseleave', () => {
    avatarsWrap.setAttribute('data-state', 'collapsed');
  });

  avatarItems.forEach((item) => {
    const index = Number(item.dataset.index);

    // Hovering the second avatar swaps the testimonial
    item.addEventListener('mouseenter', () => {
      setActiveTestimonial(index);
    });

    // Clicking any avatar (e.g. the third) also swaps the testimonial,
    // and keeps it selected for touch devices where hover doesn't apply
    item.addEventListener('click', () => {
      setActiveTestimonial(index);
    });
  });
}

/* ---------- ABOUT ---------- */

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

// Profile image reveals upward from the bottom as it scrolls into view
gsap.fromTo('.about-profile-image-wrap',
  { clipPath: 'inset(100% 0 0 0)' },
  {
    clipPath: 'inset(0% 0 0 0)',
    duration: 1.4,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.about-profile-image-wrap',
      start: 'top 85%'
    }
  }
);

gsap.from('.about-profile-image-wrap img', {
  scrollTrigger: {
    trigger: '.about-profile-image-wrap',
    start: 'top 85%'
  },
  scale: 1.15,
  duration: 1.4,
  ease: 'power4.out'
});

/* ---------- EXPERIENCE ---------- */

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

gsap.from('.resume-download-row', {
  scrollTrigger: {
    trigger: '.resume-download-row',
    start: 'top 95%'
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power3.out'
});

/* ---------- OFFSCREEN GALLERY ---------- */

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

/* ---------- PLAYGROUND: continuous right-to-left auto scroll ---------- */

const workGrid = document.querySelector('.work-grid');

if (workGrid) {
  // Duplicate the row once so the loop can wrap seamlessly
  const originalChildren = Array.from(workGrid.children);
  originalChildren.forEach((child) => {
    workGrid.appendChild(child.cloneNode(true));
  });

  let marqueeTween;

  const startMarquee = () => {
    // Wait for images to load so we know the true width of one set
    const setWidth = workGrid.scrollWidth / 2;

    marqueeTween = gsap.to(workGrid, {
      x: -setWidth,
      duration: setWidth / 60, // moderate, consistent speed regardless of content length
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % setWidth)
      }
    });
  };

  const imagesInGrid = workGrid.querySelectorAll('img');
  let loaded = 0;
  const onImgReady = () => {
    loaded += 1;
    if (loaded === imagesInGrid.length) {
      startMarquee();
    }
  };

  imagesInGrid.forEach((img) => {
    if (img.complete) {
      onImgReady();
    } else {
      img.addEventListener('load', onImgReady);
      img.addEventListener('error', onImgReady);
    }
  });

  // Pause on hover so users can look closer, resume on mouse leave
  const workViewport = document.querySelector('.work-track-viewport');
  if (workViewport) {
    workViewport.addEventListener('mouseenter', () => marqueeTween && marqueeTween.pause());
    workViewport.addEventListener('mouseleave', () => marqueeTween && marqueeTween.play());
  }
}
