gsap.registerPlugin(ScrollTrigger);

/* ---------- HERO: subtle opening animation ---------- */
/* Content eases in slightly rather than sliding in from far away */

const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

heroTl
  .from('header', { opacity: 0, y: -16, duration: 0.7 })
  .from('.hero-meta p', { opacity: 0, y: 16, stagger: 0.1, duration: 0.7 }, '-=0.35')
  .from('.hero h1', { opacity: 0, y: 32, duration: 1.1 }, '-=0.35');

/* ---------- PROJECT CARDS ---------- */

gsap.utils.toArray('.cards .card').forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 90%',
      once: true
    },
    opacity: 0,
    y: 70,
    duration: 0.95,
    ease: 'power3.out'
  });
});

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

// Reveal the image, then grow it progressively as the About section is scrolled.
gsap.from('.about-profile', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 90%',
    once: true
  },
  opacity: 0,
  duration: 0.75,
  ease: 'power2.out'
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const aboutImage = document.querySelector('.about-profile-image-wrap');

if (aboutImage) {
  if (prefersReducedMotion) {
    gsap.set(aboutImage, { scale: 1 });
  } else {
    ScrollTrigger.matchMedia({
      '(min-width: 901px)': () => gsap.fromTo(
        aboutImage,
        { scale: 0.55 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about',
            start: 'top 82%',
            end: 'bottom 38%',
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        }
      ),
      '(max-width: 900px)': () => gsap.fromTo(
        aboutImage,
        { scale: 0.78 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: aboutImage,
            start: 'top 92%',
            end: 'center 55%',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        }
      )
    });
  }
}

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

const modal = document.querySelector('.image-modal');
const modalImg = modal?.querySelector('.image-modal-img');
const modalClose = modal?.querySelector('.image-modal-close');
const modalBackdrop = modal?.querySelector('.image-modal-backdrop');

if (modal && modalImg) {
  document.querySelectorAll('.gallery-item').forEach((button) => {
    button.addEventListener('click', () => {
      const src = button.dataset.src;
      if (!src) return;

      modalImg.src = src;
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.body.style.overflow = '';
  };

  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ---------- PLAYGROUND: continuous right-to-left auto scroll ---------- */

const workGrid = document.querySelector('.work-grid');

if (workGrid && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const originalItems = Array.from(workGrid.children);

  // Duplicate the original row for a seamless infinite loop.
  // Force cloned images to load because lazy-loaded off-screen clones can prevent
  // the old marquee code from ever starting.
  const clonedItems = originalItems.map((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');

    clone.querySelectorAll('img').forEach((img) => {
      img.loading = 'eager';
    });

    workGrid.appendChild(clone);
    return clone;
  });

  let marqueeTween;
  let resizeTimer;

  const startMarquee = () => {
    marqueeTween?.kill();
    gsap.set(workGrid, { x: 0 });

    const firstOriginal = originalItems[0];
    const firstClone = clonedItems[0];

    if (!firstOriginal || !firstClone) return;

    // offsetLeft gives the exact width of one complete set, including the gap.
    const loopDistance = firstClone.offsetLeft - firstOriginal.offsetLeft;
    if (loopDistance <= 0) return;

    marqueeTween = gsap.to(workGrid, {
      x: -loopDistance,
      duration: loopDistance / 60,
      ease: 'none',
      repeat: -1
    });
  };

  // Start after layout is ready. Width attributes allow this to work even while
  // some image files are still downloading.
  requestAnimationFrame(() => requestAnimationFrame(startMarquee));

  // Recalculate the distance when the viewport size changes.
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(startMarquee, 150);
  });
}

window.addEventListener('load', () => ScrollTrigger.refresh());
