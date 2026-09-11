/**
 * Uday Kumar Avula - Portfolio Client Controller
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Hamburger Navigation
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);
      }
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });

    // Close menu when clicking outside of navbar
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !mobileBtn.contains(event.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      }
    });
  }

  // 3. Scroll Spy / Active Navigation Highlighting
  const sections = document.querySelectorAll('section[id]');
  
  const handleScrollSpy = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

      if (targetLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy(); // Initial run

  // 4. Testimonial Carousel Implementation
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dotsContainer = document.getElementById('carousel-dots');

  if (track && prevBtn && nextBtn && dotsContainer) {
    const slides = Array.from(track.children);
    let currentIndex = 0;

    // Create dot indicators
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => moveToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const updateControls = (index) => {
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });
    };

    const moveToSlide = (targetIndex) => {
      if (targetIndex < 0) {
        targetIndex = slides.length - 1;
      } else if (targetIndex >= slides.length) {
        targetIndex = 0;
      }
      track.style.transform = `translateX(-${targetIndex * 100}%)`;
      currentIndex = targetIndex;
      updateControls(currentIndex);
    };

    prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
  }
});