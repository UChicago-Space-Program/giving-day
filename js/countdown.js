(function () {
  // Giving Day ends: April 1, 2026 at 12:00 PM Central Time (CDT, UTC-5)
  var deadline = new Date("2026-04-01T12:00:00-05:00").getTime();

  var daysEl = document.getElementById("cd-days");
  var hoursEl = document.getElementById("cd-hours");
  var minsEl = document.getElementById("cd-mins");
  var secsEl = document.getElementById("cd-secs");

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function tick() {
    var now = Date.now();
    var diff = deadline - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var mins = Math.floor((diff / (1000 * 60)) % 60);
    var secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);

    requestAnimationFrame(tick);
  }

  tick();
})();
