(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function markShown(element) {
    element.setAttribute('data-shown', 'true');
  }

  function setupReveal() {
    var items = document.querySelectorAll('.reveal');

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach(markShown);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var element = entry.target;
          var delay = Number(element.getAttribute('data-delay') || 0);
          window.setTimeout(function () {
            markShown(element);
          }, delay);
          observer.unobserve(element);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );

    items.forEach(function (item, index) {
      var siblingIndex = index % 4;
      item.setAttribute('data-delay', String(siblingIndex * 90));
      observer.observe(item);
    });
  }

  function setupHeroUnderline() {
    var heading = document.querySelector('.hero h1');
    if (!heading) return;
    if (reducedMotion.matches) {
      heading.style.setProperty('--underline', '1');
      return;
    }
    window.requestAnimationFrame(function () {
      heading.style.setProperty('--underline', '1');
    });
  }

  function setupRouteDrawing() {
    var steps = document.querySelector('.steps');
    if (!steps) return;

    if (reducedMotion.matches) {
      steps.style.setProperty('--route-draw', '1');
      return;
    }

    function update() {
      var rect = steps.getBoundingClientRect();
      var viewport = window.innerHeight;
      var start = viewport * 0.85;
      var travelled = start - rect.top;
      var span = rect.height * 0.75;
      var progress = span > 0 ? travelled / span : 1;
      progress = Math.max(0, Math.min(1, progress));
      steps.style.setProperty('--route-draw', String(progress));
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        update();
        ticking = false;
      });
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  function setupStickyBar() {
    var bar = document.querySelector('.topbar');
    if (!bar) return;

    function update() {
      bar.setAttribute('data-stuck', window.scrollY > 8 ? 'true' : 'false');
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  setupReveal();
  setupHeroUnderline();
  setupRouteDrawing();
  setupStickyBar();
})();
