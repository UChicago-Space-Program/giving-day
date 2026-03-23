document.addEventListener("DOMContentLoaded", function () {
  // Open modal when clicking anywhere on the card
  document.querySelectorAll(".card[data-modal]").forEach(function (card) {
    card.addEventListener("click", function () {
      var modal = document.getElementById(card.dataset.modal);
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      // Reset carousel to first slide
      var carousel = modal.querySelector(".carousel");
      if (carousel && carousel._goTo) carousel._goTo(0);
    });
  });

  // Close modal on X button
  document.querySelectorAll(".modal-close").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.closest(".modal").classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close modal on backdrop click
  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Close modal on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var active = document.querySelector(".modal.active");
      if (active) {
        active.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });

  // Close modal when "Donate now" is clicked (scrolls to donate section)
  document.querySelectorAll(".modal-donate").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.closest(".modal").classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Carousel navigation with dots and swipe
  document.querySelectorAll(".carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel-track");
    var slides = track.querySelectorAll(".carousel-slide");
    var index = 0;

    // Create dot indicators
    var dotsContainer = document.createElement("div");
    dotsContainer.className = "carousel-dots";
    var dots = [];
    for (var i = 0; i < slides.length; i++) {
      var dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.dataset.index = i;
      dot.addEventListener("click", function () {
        goTo(parseInt(this.dataset.index, 10));
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
    carousel.appendChild(dotsContainer);

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (d, di) {
        d.classList.toggle("active", di === index);
      });
    }

    // Expose goTo for reset on modal open
    carousel._goTo = goTo;

    carousel.querySelector(".carousel-prev").addEventListener("click", function () {
      goTo(index - 1);
    });

    carousel.querySelector(".carousel-next").addEventListener("click", function () {
      goTo(index + 1);
    });

    // Touch/swipe support
    var startX = 0;
    var startY = 0;
    var dragging = false;

    carousel.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      dragging = true;
    }, { passive: true });

    carousel.addEventListener("touchend", function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0) goTo(index + 1);
        else goTo(index - 1);
      }
    }, { passive: true });
  });
});
