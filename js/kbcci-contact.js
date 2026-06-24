/**
 * KBCCI CONTACT PAGE — Custom JavaScript
 */

(function () {
  "use strict";

  // ============================================================
  // 1. MAP SWITCHER
  // ============================================================
  var iframe = document.getElementById("kbcci-map");
  var openLink = document.getElementById("open-maps");

  // External Google Maps URLs (exact links provided)
  var external = {
    brussels:
      "https://maps.google.com/maps/place//data=!4m2!3m1!1s0x47c3c37da28e74df:0xee2bd0b1095e7611?entry=s&sa=X&ved=2ahUKEwiS8YzAvICQAxXkwAIHHXaBK3kQ4kB6BAgbEAA",
    mombasa: "https://maps.app.goo.gl/2E4ytFk56815cAod7",
  };

  // Embed URLs for the iframe
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

  // ============================================================
  // 2. BACK TO TOP BUTTON
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
})();