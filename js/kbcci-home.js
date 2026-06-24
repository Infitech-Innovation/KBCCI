/**
 * KBCCI HOMEPAGE — Custom JavaScript
 */

(function () {
  "use strict";

  // ============================================================
  // 1. BACK TO TOP BUTTON
  // ============================================================
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

  // ============================================================
  // 2. FADE-UP REVEAL (IntersectionObserver)
  // ============================================================
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
        { threshold: 0.15 }
      );
      els.forEach(function (el) {
        io.observe(el);
      });
    }
  });

  // ============================================================
  // 3. OWL CAROUSEL INIT (safe, retry if not loaded)
  // ============================================================
  function initOwlSafely() {
    if (window.jQuery && jQuery.fn && jQuery.fn.owlCarousel) {
      jQuery(function ($) {
        $(".header-carousel").owlCarousel({
          items: 1,
          loop: true,
          margin: 24,
          autoplay: true,
          autoplayTimeout: 4200,
          autoplayHoverPause: true,
          smartSpeed: 700,
          dots: true,
          nav: false,
        });
        // Also init testimonial/events carousel if present
        $(".testimonial-carousel").owlCarousel({
          items: 1,
          loop: true,
          margin: 30,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          smartSpeed: 700,
          dots: true,
          nav: false,
        });
      });
      return true;
    }
    return false;
  }

  // Try immediately, then on load, then after a delay
  if (!initOwlSafely()) {
    window.addEventListener("load", initOwlSafely, { once: true });
    setTimeout(initOwlSafely, 400);
  }

  // ============================================================
  // 4. HEADLINE TYPER — fade-swap words (3 times then stop)
  // ============================================================
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

  // ============================================================
  // 5. FEATURE CARDS — hover lift (JS-controlled)
  // ============================================================
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

  // ============================================================
  // 6. KBCCI CARDS (Vision / Mission) — brand hover
  // ============================================================
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

  // ============================================================
  // 7. WAITING LIST MODAL — form handler
  // ============================================================
  (function () {
    var form = document.getElementById("kbcci-waitlist-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var modalEl = document.getElementById("kbcciWaitlistModal");
      if (modalEl) {
        var modal =
          bootstrap.Modal.getInstance(modalEl) ||
          new bootstrap.Modal(modalEl);
        modal.hide();
        setTimeout(function () {
          alert("Thank you! You're on the waiting list.");
        }, 180);
      }
      form.reset();
    });
  })();

  // ============================================================
  // 8. INJECT PULSE KEYFRAMES (fallback if not in CSS)
  // ============================================================
  // The pulse keyframes are already in the CSS, but we add them
  // via JS as a fallback to ensure the back-to-top animation works.
  var style = document.createElement("style");
  style.innerHTML = `
    @keyframes pulse {
      0%, 100% { filter: none; }
      50% { filter: brightness(1.08); }
    }
  `;
  // Only add if not already present (check if #backToTop exists)
  if (document.getElementById("backToTop")) {
    // Avoid duplicate if CSS already has it - but it's harmless to add
    document.head.appendChild(style);
  }
})();