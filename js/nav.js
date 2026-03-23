(function () {
  var navbar = document.getElementById("navbar");
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hamburger menu
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    var hero = document.querySelector(".hero");

    function setHeroOffset(open) {
      if (hero) {
        hero.style.marginTop = open ? links.scrollHeight + "px" : "0";
      }
    }

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen);
      setHeroOffset(isOpen);
    });

    // Close menu when a link is clicked
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        setHeroOffset(false);
      }
    });

    // Reset on resize above mobile breakpoint
    window.addEventListener("resize", function () {
      if (window.innerWidth > 640) {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        setHeroOffset(false);
      }
    });
  }
})();
