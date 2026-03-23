(function () {
  var counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  var animated = false;

  function animateCounters() {
    if (animated) return;
    animated = true;

    counters.forEach(function (el) {
      var target = parseInt(el.dataset.count, 10);
      var duration = 1200;
      var start = performance.now();

      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(eased * target);
        el.textContent = "$" + current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(function (el) {
    observer.observe(el);
  });
})();
