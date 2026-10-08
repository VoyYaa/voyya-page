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

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function setupTripMap() {
    var figure = document.querySelector('.route-map');
    var steps = document.querySelectorAll('.step');
    var approach = document.getElementById('map-approach-route');
    var trip = document.getElementById('map-trip-route');
    var taxi = document.getElementById('map-taxi');
    if (!figure || !steps.length || !approach || !trip || !taxi) return;

    var approachLength = approach.getTotalLength();
    var tripLength = trip.getTotalLength();
    var totalLength = approachLength + tripLength;
    var targets = [0, 0, approachLength / totalLength, 1];
    var position = 0;
    var currentStep = 0;
    var frame = 0;

    function place(progress) {
      var distance = progress * totalLength;
      var point =
        distance <= approachLength
          ? approach.getPointAtLength(distance)
          : trip.getPointAtLength(distance - approachLength);
      taxi.setAttribute(
        'transform',
        'translate(' + point.x + ' ' + point.y + ')',
      );
      position = progress;
    }

    function travel(target) {
      window.cancelAnimationFrame(frame);
      if (reducedMotion.matches) {
        place(target);
        return;
      }
      var from = position;
      var duration = 400 + Math.abs(target - from) * 7000;
      var startedAt = null;

      function tick(now) {
        if (startedAt === null) startedAt = now;
        var t = Math.min(1, (now - startedAt) / duration);
        place(from + (target - from) * easeInOut(t));
        if (t < 1) frame = window.requestAnimationFrame(tick);
      }

      frame = window.requestAnimationFrame(tick);
    }

    function activeStep() {
      var line = window.innerHeight * 0.6;
      var active = 1;
      steps.forEach(function (step, index) {
        if (step.getBoundingClientRect().top < line) active = index + 1;
      });
      return active;
    }

    function update() {
      if (figure.getBoundingClientRect().top < window.innerHeight * 0.9) {
        figure.setAttribute('data-live', 'true');
      }
      var next = activeStep();
      if (next === currentStep) return;
      currentStep = next;
      figure.setAttribute('data-step', String(next));
      travel(targets[next - 1]);
    }

    function onScroll() {
      window.requestAnimationFrame(update);
    }

    place(0);
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  function setupPhone() {
    var phone = document.querySelector('.phone');
    if (!phone || reducedMotion.matches) return;
    var screen = 1;
    window.setInterval(function () {
      screen = screen === 3 ? 1 : screen + 1;
      phone.setAttribute('data-screen', String(screen));
    }, 3400);
  }

  function setupOpsMap() {
    var mapElement = document.querySelector('.ops-map');
    var drivers = [1, 2, 3].map(function (id) {
      return {
        dot: document.getElementById('ops-driver-' + id),
        lane: document.getElementById('ops-lane-' + id),
      };
    });
    var missing = drivers.some(function (driver) {
      return !driver.dot || !driver.lane;
    });
    if (!mapElement || missing) return;

    var speeds = [0.045, 0.035, 0.05];
    var offsets = [0, 0.4, 0.7];
    var lengths = drivers.map(function (driver) {
      return driver.lane.getTotalLength();
    });

    function render(seconds) {
      drivers.forEach(function (driver, index) {
        var cycle = (seconds * speeds[index] + offsets[index]) % 2;
        var progress = cycle <= 1 ? cycle : 2 - cycle;
        var point = driver.lane.getPointAtLength(progress * lengths[index]);
        driver.dot.setAttribute('cx', point.x);
        driver.dot.setAttribute('cy', point.y);
      });
    }

    render(0);
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

    var frame = 0;
    var origin = null;

    function tick(now) {
      if (origin === null) origin = now;
      render((now - origin) / 1000);
      frame = window.requestAnimationFrame(tick);
    }

    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        frame = window.requestAnimationFrame(tick);
      } else {
        window.cancelAnimationFrame(frame);
        origin = null;
      }
    }).observe(mapElement);
  }

  setupReveal();
  setupHeroUnderline();
  setupRouteDrawing();
  setupStickyBar();
  setupTripMap();
  setupPhone();
  setupOpsMap();
})();
