(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Small yellow cursor detail on desktop.
  const dot = document.querySelector('.cursor-dot');
  if (dot && !reducedMotion && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    }, { passive: true });
  }

  // Active state for the fixed side navigator.
  const navLinks = [...document.querySelectorAll('.side-nav a')];
  const observedSections = ['top', 'works', 'profile', 'project-01', 'project-02', 'project-03', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === entry.target.id));
    });
  }, { rootMargin: '-44% 0px -44% 0px', threshold: 0 });
  observedSections.forEach(section => observer.observe(section));

  // No-animation / CDN-failure fallback.
  const showFallback = () => {
    const about = document.getElementById('aboutReveal');
    if (about) {
      about.style.visibility = 'visible';
    }
  };

  if (reducedMotion || !window.gsap || !window.ScrollTrigger) {
    showFallback();
    document.querySelectorAll('.about-reveal').forEach(el => { el.style.opacity = 1; });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ------------------------------------------------------------
  // 00 — First O portal transition.
  // ------------------------------------------------------------
  const portalO = document.getElementById('portalO');
  const aboutReveal = document.getElementById('aboutReveal');

  const portalScale = () => {
    if (!portalO) return 50;
    const rect = portalO.getBoundingClientRect();
    const base = Math.max(rect.width, 1);
    return (Math.max(window.innerWidth, window.innerHeight) / base) * 2.25;
  };

  if (portalO && aboutReveal) {
    gsap.set(aboutReveal, { autoAlpha: 0, y: 22 });

    const portalTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.portal-scene',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    portalTL
      .to('.eyebrow, .signature, .scroll-cue', {
        opacity: 0,
        y: -12,
        duration: .15,
        ease: 'none'
      }, 0.06)
      .to('.hero-title', {
        color: 'rgba(12,35,64,0)',
        duration: .22,
        ease: 'none'
      }, 0.11)
      .to(portalO, {
        scale: portalScale,
        duration: .52,
        ease: 'power1.inOut'
      }, 0.08)
      .to(portalO, {
        opacity: .08,
        duration: .14,
        ease: 'none'
      }, 0.55)
      .to(aboutReveal, {
        autoAlpha: 1,
        y: 0,
        duration: .24,
        ease: 'power2.out'
      }, 0.56)
      .fromTo('.about-image-wrap', {
        x: -40,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: .22,
        ease: 'power2.out'
      }, 0.6)
      .fromTo('.about-copy > *', {
        x: 35,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: .2,
        stagger: .035,
        ease: 'power2.out'
      }, 0.61);
  }

  // ------------------------------------------------------------
  // Reusable reveal animations.
  // ------------------------------------------------------------
  gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.from(el, {
      y: 45,
      opacity: 0,
      duration: .9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 84%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  gsap.utils.toArray('.gallery-card').forEach(card => {
    const fromLeft = card.classList.contains('from-left');
    gsap.from(card, {
      x: fromLeft ? -150 : 150,
      opacity: 0,
      duration: 1.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 86%',
        end: 'top 42%',
        scrub: .75
      }
    });
  });

  // Profile columns arrive from three directions.
  const profileAnimations = [
    ['.profile-from-left', { x: -80 }],
    ['.profile-from-bottom', { y: 70 }],
    ['.profile-from-right', { x: 80 }]
  ];
  profileAnimations.forEach(([selector, movement]) => {
    const el = document.querySelector(selector);
    if (!el) return;
    gsap.from(el, {
      ...movement,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // ------------------------------------------------------------
  // Project hero entrances.
  // ------------------------------------------------------------
  gsap.utils.toArray('.project-hero').forEach(hero => {
    const fromRight = hero.classList.contains('hero-right');
    const image = hero.querySelector('.project-image-panel');
    const copy = hero.querySelector('.project-intro-panel');

    gsap.from(image, {
      xPercent: fromRight ? 12 : -12,
      clipPath: fromRight ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
      duration: 1.15,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: hero,
        start: 'top 76%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from(copy.children, {
      x: fromRight ? -45 : 45,
      opacity: 0,
      duration: .8,
      stagger: .06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: hero,
        start: 'top 68%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // ------------------------------------------------------------
  // Plan zoom: each project's plan grows as the visitor scrolls.
  // ------------------------------------------------------------
  gsap.utils.toArray('.plan-scroll').forEach(section => {
    const frame = section.querySelector('.plan-frame');
    const copy = section.querySelector('.plan-copy');
    const image = section.querySelector('.plan-frame img');

    gsap.fromTo(frame,
      { scale: .72, y: 65 },
      {
        scale: 1.08,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      }
    );

    gsap.fromTo(image,
      { scale: 1 },
      {
        scale: 1.14,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      }
    );

    gsap.fromTo(copy,
      { opacity: 1, y: 0 },
      {
        opacity: .12,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 10%',
          end: 'bottom 60%',
          scrub: 1
        }
      }
    );
  });

  // Project technical/detail images slide in from the edge.
  gsap.utils.toArray('.detail-slide-right, .detail-slide-left').forEach(el => {
    const left = el.classList.contains('detail-slide-left');
    gsap.from(el, {
      x: left ? -110 : 110,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Contact reveal and subtle footer entrance.
  gsap.from('.contact-footer', {
    opacity: 0,
    y: 30,
    duration: .9,
    scrollTrigger: {
      trigger: '.contact-footer',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
// Extended About section animations
const aboutMore = document.querySelector('.about-more-section');

if (aboutMore) {

  gsap.from('.about-more-heading', {
    y: 70,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: aboutMore,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from('.about-more-intro', {
    x: -70,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-more-grid',
      start: 'top 78%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from('.about-more-writing p', {
    x: 70,
    opacity: 0,
    duration: .8,
    stagger: .12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-more-writing',
      start: 'top 78%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from('.about-more-bottom span', {
    y: 20,
    opacity: 0,
    duration: .5,
    stagger: .07,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-more-bottom',
      start: 'top 88%'
    }
  });

}
