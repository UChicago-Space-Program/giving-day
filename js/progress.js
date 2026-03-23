(function () {
  // Configuration — update these values as donations come in,
  // or replace with an API call to fetch live data.
  var raised = 0;       // dollars raised so far
  var goal = 10000;     // total goal
  var donors = 0;       // number of donors

  var fillEl = document.getElementById("progress-fill");
  var raisedEl = document.getElementById("progress-raised");
  var donorsEl = document.getElementById("progress-donors");

  if (!fillEl) return;

  raisedEl.textContent = "$" + raised.toLocaleString();
  donorsEl.textContent = donors.toLocaleString() + " donor" + (donors !== 1 ? "s" : "");

  // Animate the fill bar after a short delay
  setTimeout(function () {
    var pct = Math.min((raised / goal) * 100, 100);
    fillEl.style.width = pct + "%";
  }, 600);
})();
