// ==========================================
// AI-Human Management Main JavaScript
// ==========================================

// 1. Header scroll effect
window.addEventListener('scroll', function() {
  var header = document.getElementById('mainHeader');
  var topBtn = document.getElementById('topBtn');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  if (topBtn) {
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }
});

// 2. Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Mobile navigation
function openMobileNav() {
  var mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    mobileNav.classList.add('open');
  }
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  var mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    mobileNav.classList.remove('open');
  }
  document.body.style.overflow = '';
}

function closeMobileNavOutside(e) {
  var mobileNav = document.getElementById('mobileNav');
  if (e.target === mobileNav) {
    closeMobileNav();
  }
}

// 4. FAQ accordion toggle
function toggleFaq(el) {
  var item = el.parentElement;
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(i) {
    i.classList.remove('open');
  });
  if (!isOpen) {
    item.classList.add('open');
  }
}

// 5. Counter animation
function animateCounter(el, target, duration) {
  var start = 0;
  var step = target / (duration / 16);
  var timer = setInterval(function() {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}

// 6. Intersection Observer for stats counter animation
var counterObserved = false;
var counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting && !counterObserved) {
      counterObserved = true;
      entry.target.querySelectorAll('.num').forEach(function(num) {
        var target = parseInt(num.getAttribute('data-target'), 10);
        if (target) {
          animateCounter(num, target, 1500);
        }
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// 7. Hero counter animation on page load
window.addEventListener('load', function() {
  var c1 = document.getElementById('cnt1');
  var c2 = document.getElementById('cnt2');
  if (c1) animateCounter(c1, 150, 2000);
  if (c2) animateCounter(c2, 300, 2000);
});

// 8. Samsung browser detection
if (navigator.userAgent.includes('SamsungBrowser')) {
  var banner = document.getElementById('topBanner');
  if (banner) {
    banner.style.display = 'block';
  }
}

// 9. Scroll animation observer (fadeInUp)
var scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// 10. Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Observe stats grid for counter
  var sg = document.querySelector('.stats-grid');
  if (sg) {
    counterObserver.observe(sg);
  }

  // Observe all fadeInUp elements
  document.querySelectorAll('.fadeInUp').forEach(function(el) {
    el.style.animationPlayState = 'paused';
    scrollObserver.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
