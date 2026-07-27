gsap.registerPlugin(ScrollTrigger);

/* ---------- HERO: subtle opening animation ---------- */
/* Content eases in slightly rather than sliding in from far away */

const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

heroTl
  .from('header', { opacity: 0, y: -16, duration: 0.7 })
  .from('.hero-meta p', { opacity: 0, y: 16, stagger: 0.1, duration: 0.7 }, '-=0.35')
  .from('.hero h1', { opacity: 0, y: 32, duration: 1.1 }, '-=0.35');

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
  "Thank you for all the contribution you have been making on Infidigit websites. It was great to see your ideas on how to enhance user experience via your design skills. Your designs have helped us improve user experience for our target audience. Your attention to detail and constant eagerness to learn new things have always amazed me.",
  "Working across time zones with Ayushi never felt like a hurdle. She translated complex proposals into visuals our international partners immediately understood, and every deadline landed on time.",
  "Ayushi brought a sharp, detail-oriented perspective to every design review. Her ability to simplify complex flows made the product noticeably easier for our team to ship and maintain."
];

const testimonialSection = document.querySelector('.testimonial');
const avatarsWrap = document.querySelector('.avatars');
const quoteCopyEl = document.querySelector('.quote-copy');
const avatarItems = document.querySelectorAll('.avatar-item');

function setActiveTestimonial(index) {
  const quote = testimonials[index];
  if (!quote || !quoteCopyEl) return;

  gsap.to(quoteCopyEl, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      quoteCopyEl.textContent = quote;
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

    // Testimonial text only changes on click, not on hover
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

// The about image now grows smoothly from small to full size on hover —
// see the .about-profile-image-wrap / .about:hover rule in style.css.
// A quick fade-in on scroll is kept for the initial appearance only.
gsap.from('.about-profile', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 90%'
  },
  opacity: 0,
  duration: 0.9,
  ease: 'power2.out'
});

/* ---------- EXPERIENCE ---------- */

gsap.utils.toArray('.experience .item').forEach((item) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 90%'
    },
    opacity: 0,
    y: 90,
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
}
