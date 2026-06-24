/**
 * KBCCI MEMBERSHIP PAGE — Custom JavaScript
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
  // 2. INJECT PULSE KEYFRAMES (if not already in CSS)
  //    (We already have them in the CSS, but keep for fallback)
  // ============================================================
  // Pulse keyframes are now in the CSS, so this is optional.
  // However, we keep it to ensure the animation exists even if CSS is missing.
  // But we can skip it; the CSS already has @keyframes pulse.

  // ============================================================
  // 3. INITIALISE WOW.JS
  // ============================================================
  if (typeof WOW !== "undefined") {
    new WOW().init();
  }
})();