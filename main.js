/* ═══════════════════════════════════════════════════════
   FUNDARE 3.0 — Shared JavaScript
   ═══════════════════════════════════════════════════════ */

// ── Scroll Reveal Animations ────────────────────────────
(function() {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function(el) {
    observer.observe(el);
  });
})();

// ── Navbar — V7 style always sticky, no scroll change needed ────

// ── Mobile Navigation Toggle ────────────────────────────
(function() {
  var toggle = document.getElementById('navToggle');
  var overlay = document.getElementById('navOverlay');
  var closeBtn = document.getElementById('navOverlayClose');
  if (!toggle || !overlay) return;

  function openNav() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    openNav();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeNav();
    });
  }

  // Close on any link click inside overlay
  var overlayLinks = overlay.querySelectorAll('a');
  for (var i = 0; i < overlayLinks.length; i++) {
    overlayLinks[i].addEventListener('click', function() {
      closeNav();
    });
  }

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeNav();
  });
})();

// ── Calendly Modal ──────────────────────────────────────
(function() {
  function openCalendly(e) {
    if (e) e.preventDefault();
    var modal = document.getElementById('calendlyModal');
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeCalendly() {
    var modal = document.getElementById('calendlyModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  document.addEventListener('click', function(e) {
    var trigger = e.target.closest('[data-calendly-trigger]');
    if (trigger) { openCalendly(e); return; }
    if (e.target.matches('[data-close-calendly]') || e.target.id === 'calendlyModal') closeCalendly();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeCalendly();
  });
})();

// ── Animated Counters ───────────────────────────────────
(function() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(c) { counterObserver.observe(c); });

  function animateCount(el) {
    var target = el.dataset.count;
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var isFloat = target.indexOf('.') !== -1;
    var end = parseFloat(target);
    var duration = 1800;
    var start = performance.now();

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * end;
      if (isFloat) {
        el.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.round(current) + suffix;
      }
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
})();

// ── Smooth scroll for anchor links ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var targetId = this.getAttribute('href');
    if (targetId === '#' || this.hasAttribute('data-calendly-trigger')) return;
    var target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
