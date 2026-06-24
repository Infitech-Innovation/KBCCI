/**
 * KBCCI — Master JavaScript
 * Merged from theme, homepage, membership, contact, and back-to-top scripts.
 * Optimized for performance and cross‑page compatibility.
 */
(function () {
  "use strict";

  // ==============================================================
  //  0. DETECT JQUERY & OWL CAROUSEL AVAILABILITY
  // ==============================================================
  var hasJQuery = typeof window.jQuery !== "undefined";
  var hasOwl = hasJQuery && jQuery.fn && jQuery.fn.owlCarousel;

  // ==============================================================
  //  1. BACK TO TOP BUTTON  (shared, vanilla)
  // ==============================================================
  var backBtn = document.getElementById("backToTop");
  if (backBtn) {
    function handleScroll() {
      if (window.scrollY > 300) {
        backBtn.classList.add("show");
      } else {
        backBtn.classList.remove("show");
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    backBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==============================================================
  //  2. WOW.JS INIT  (if available)
  // ==============================================================
  if (typeof WOW !== "undefined") {
    new WOW().init();
  }

  // ==============================================================
  //  3. SPINNER  (from theme)
  // ==============================================================
  (function () {
    var spinner = document.getElementById("spinner");
    if (spinner) {
      setTimeout(function () {
        spinner.classList.remove("show");
      }, 1);
    }
  })();

  // ==============================================================
  //  4. STICKY NAVBAR  (from theme)
  // ==============================================================
  (function () {
    var sticky = document.querySelector(".sticky-top");
    if (!sticky) return;
    var originalTop = sticky.style.top || "0px";

    function onScrollNav() {
      if (window.scrollY > 300) {
        sticky.classList.add("bg-white", "shadow-sm");
        sticky.style.top = "0px";
      } else {
        sticky.classList.remove("bg-white", "shadow-sm");
        sticky.style.top = "-150px";
      }
    }
    window.addEventListener("scroll", onScrollNav, { passive: true });
    onScrollNav(); // set initial state
  })();

  // ==============================================================
  //  5. OWL CAROUSEL INIT  (safe, jQuery dependent)
  // ==============================================================
  function initOwlSafely() {
    if (!hasJQuery || !jQuery.fn.owlCarousel) return false;

    jQuery(function ($) {
      // Header carousel
      if ($(".header-carousel").length) {
        $(".header-carousel").owlCarousel({
          items: 1,
          loop: true,
          margin: 24,
          autoplay: true,
          autoplayTimeout: 4200,
          autoplayHoverPause: true,
          smartSpeed: 1000,
          dots: true,
          nav: false,
        });
      }

      // Testimonial / events carousel
      if ($(".testimonial-carousel").length) {
        $(".testimonial-carousel").owlCarousel({
          items: 1,
          loop: true,
          margin: 30,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          smartSpeed: 1000,
          animateIn: "fadeIn",
          animateOut: "fadeOut",
          dots: true,
          nav: false,
        });
      }
    });
    return true;
  }

  // Try immediately, then on load, then after a delay
  if (!initOwlSafely()) {
    window.addEventListener("load", initOwlSafely, { once: true });
    setTimeout(initOwlSafely, 400);
  }

  // ==============================================================
  //  6. FADE-UP REVEAL  (IntersectionObserver)
  // ==============================================================
  document.addEventListener("DOMContentLoaded", function () {
    var els = document.querySelectorAll(".fade-up");
    if (els.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      els.forEach(function (el) {
        io.observe(el);
      });
    }
  });

  // ==============================================================
  //  7. HEADLINE TYPER  (fade‑swap words, 3 times then stop)
  // ==============================================================
  document.addEventListener("DOMContentLoaded", function () {
    var el = document.getElementById("kb-typer");
    if (!el) return;

    var words = ["Growth", "Trade", "Investment", "Innovation"];
    var HOLD = 1200;
    var OUT = 350;
    var MAX_CHANGES = 3;

    var idx = 0;
    var swaps = 0;

    el.textContent = words[idx];

    function next() {
      if (swaps >= MAX_CHANGES) return;

      setTimeout(function () {
        el.classList.add("is-out");
        setTimeout(function () {
          idx = (idx + 1) % words.length;
          el.textContent = words[idx];
          el.classList.remove("is-out");
          swaps++;
          next();
        }, OUT);
      }, HOLD);
    }

    next();
  });

  // ==============================================================
  //  8. FEATURE CARDS  (hover lift, JS‑controlled)
  // ==============================================================
  (function () {
    var wrap = document.getElementById("kbcci-feature-cards");
    if (!wrap) return;
    var cards = wrap.querySelectorAll(".feature-card");
    cards.forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        card.style.transform = "translateY(-4px)";
        card.style.boxShadow = "0 14px 28px rgba(0,0,0,.12)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "none";
        card.style.boxShadow = "0 6px 14px rgba(0,0,0,.06)";
      });
    });
  })();

  // ==============================================================
  //  9. KBCCI CARDS  (Vision / Mission) — brand hover
  // ==============================================================
  (function () {
    var cards = document.querySelectorAll(".kbcci-card");
    cards.forEach(function (card) {
      var bg = card.getAttribute("data-bg");
      var color = card.getAttribute("data-color");
      var border = card.getAttribute("data-border");
      var hBg = card.getAttribute("data-hover-bg");
      var hColor = card.getAttribute("data-hover-color");
      var hBorder = card.getAttribute("data-hover-border");

      function apply(bgC, fgC, brC, elevate) {
        card.style.backgroundColor = bgC;
        card.style.color = fgC;
        card.style.borderColor = brC === "transparent" ? "transparent" : brC;
        card.style.transform = elevate ? "translateY(-6px)" : "none";
        card.style.boxShadow = elevate
          ? "0 14px 28px rgba(0,0,0,.12)"
          : "0 6px 14px rgba(0,0,0,.06)";
        card.querySelectorAll("h3, p, i").forEach(function (el) {
          el.style.color = "inherit";
        });
      }

      card.addEventListener("mouseenter", function () {
        apply(hBg, hColor, hBorder, true);
      });
      card.addEventListener("mouseleave", function () {
        apply(bg, color, border, false);
      });

      // Keyboard accessibility
      card.setAttribute("tabindex", "0");
      card.addEventListener("focus", function () {
        apply(hBg, hColor, hBorder, true);
      });
      card.addEventListener("blur", function () {
        apply(bg, color, border, false);
      });

      // Ensure initial state
      apply(bg, color, border, false);
    });
  })();

  // ==============================================================
  //  10. WAITING LIST MODAL  (form handler)
  // ==============================================================
  (function () {
    var form = document.getElementById("kbcci-waitlist-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var modalEl = document.getElementById("kbcciWaitlistModal");
      if (modalEl) {
        var modal =
          bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
        setTimeout(function () {
          alert("Thank you! You're on the waiting list.");
        }, 180);
      }
      form.reset();
    });
  })();

  // ==============================================================
  //  11. MAP SWITCHER  (contact page)
  // ==============================================================
  (function () {
    var iframe = document.getElementById("kbcci-map");
    var openLink = document.getElementById("open-maps");
    if (!iframe || !openLink) return;

    var external = {
      brussels:
        "https://maps.google.com/maps/place//data=!4m2!3m1!1s0x47c3c37da28e74df:0xee2bd0b1095e7611?entry=s&sa=X&ved=2ahUKEwiS8YzAvICQAxXkwAIHHXaBK3kQ4kB6BAgbEAA",
      mombasa: "https://maps.app.goo.gl/2E4ytFk56815cAod7",
    };

    var embeds = {
      brussels:
        "https://www.google.com/maps?q=Montjoielaan%20293%20bus%2012%2C%201180%20Brussels%2C%20Belgium%20(Kifaru%20Tech%20%26%20Bed)&output=embed",
      mombasa:
        "https://www.google.com/maps?q=Ratna%20Square%2C%20Nyali%2C%20Mombasa%2C%20Kenya&output=embed",
    };

    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-map]");
      if (!btn) return;
      var city = btn.getAttribute("data-map");

      if (embeds[city]) iframe.src = embeds[city];
      if (external[city]) openLink.href = external[city];
    });
  })();

  // ==============================================================
  //  12. PULSE KEYFRAMES  (fallback if not in CSS)
  // ==============================================================
  (function () {
    // Only inject if a back-to-top button exists (so the animation is used)
    if (!document.getElementById("backToTop")) return;

    // Check if @keyframes pulse already exists
    var existing = false;
    try {
      var sheets = document.styleSheets;
      for (var i = 0; i < sheets.length; i++) {
        var rules = sheets[i].cssRules || sheets[i].rules;
        if (rules) {
          for (var j = 0; j < rules.length; j++) {
            if (rules[j].name === "pulse") {
              existing = true;
              break;
            }
          }
        }
        if (existing) break;
      }
    } catch (e) {
      // Cross‑origin stylesheets may cause SecurityError – ignore
    }

    if (!existing) {
      var style = document.createElement("style");
      style.textContent = `
        @keyframes pulse {
          0%, 100% { filter: none; }
          50% { filter: brightness(1.08); }
        }
      `;
      document.head.appendChild(style);
    }
  })();
})();

(function () {
  "use strict";

  const track = document.getElementById("membersCarouselTrack");
  const viewport = document.getElementById("membersCarouselViewport");
  const dotsContainer = document.getElementById("membersCarouselDots");
  const prevBtn = document.querySelector(".members-carousel-btn.prev");
  const nextBtn = document.querySelector(".members-carousel-btn.next");
  const statusEl = document.getElementById("carouselStatus");

  if (!track || !viewport) return;

  const slides = track.querySelectorAll(".members-carousel-slide");
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoPlayTimer = null;
  let isAutoPlaying = true;
  const AUTO_INTERVAL = 4500;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    const offset = index * 100;
    track.style.transform = `translateX(-${offset}%)`;

    document.querySelectorAll(".members-carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    if (statusEl) {
      statusEl.textContent = isAutoPlaying
        ? `⏵ auto‑play  •  ${index + 1} / ${totalSlides}`
        : `⏸ paused  •  ${index + 1} / ${totalSlides}`;
    }
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function buildDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className =
        "members-carousel-dot" + (i === currentIndex ? " active" : "");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        goToSlide(i);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function resetAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    if (isAutoPlaying) {
      autoPlayTimer = setInterval(nextSlide, AUTO_INTERVAL);
    }
    if (statusEl) {
      statusEl.textContent = isAutoPlaying
        ? `⏵ auto‑play  •  ${currentIndex + 1} / ${totalSlides}`
        : `⏸ paused  •  ${currentIndex + 1} / ${totalSlides}`;
    }
  }

  function toggleAutoPlay() {
    isAutoPlaying = !isAutoPlaying;
    resetAutoPlay();
  }

  buildDots();
  goToSlide(0);

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
  });
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
  });

  const wrapper = document.querySelector(".members-carousel-wrapper");
  wrapper.addEventListener("mouseenter", () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  });
  wrapper.addEventListener("mouseleave", resetAutoPlay);

  if (statusEl) {
    statusEl.addEventListener("click", toggleAutoPlay);
  }

  resetAutoPlay();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      goToSlide(currentIndex);
    }, 150);
  });

  // Entrance animation via observer
  const logos = document.querySelectorAll(".member-logo");
  if (logos.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.05 },
    );
    logos.forEach((logo) => observer.observe(logo));

    setTimeout(() => {
      logos.forEach((logo) => {
        const rect = logo.getBoundingClientRect();
        const winH =
          window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < winH - 20) {
          logo.classList.add("animate");
        }
      });
    }, 100);
  }
})();
