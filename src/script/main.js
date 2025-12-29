// Navigation toggle
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("primary-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");

    menu.classList.toggle("is-open");
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      toggle.click();
      toggle.focus();
    }
  });
}
// Close menu on link click (for single-page sites)
const navLinks = menu.querySelectorAll("a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      toggle.click();
    }
  });
});
