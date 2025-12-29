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

// Pricing section
/* =========================
   Pricing toggle logic
========================== */

const pricingToggleButtons = document.querySelectorAll(
  ".pricing__toggle-button"
);
const pricingPriceBlocks = document.querySelectorAll(".pricing-card__price");
const savingsNote = document.querySelector(".pricing__savings");

function formatMoney(n) {
  return `$${Math.round(n).toLocaleString()}`;
}

function ensureBilledLine(priceEl) {
  let billed = priceEl.querySelector(".pricing-card__billed");
  if (!billed) {
    billed = document.createElement("div");
    billed.className = "pricing-card__billed";
    billed.style.marginTop = "6px";
    billed.style.fontSize = "0.9em";
    billed.style.opacity = "0.8";
    billed.style.color = "inherit";
    billed.hidden = true;
    priceEl.appendChild(billed);
  }
  return billed;
}

function setBillingMode(mode) {
  const billingMode = mode === "yearly" ? "yearly" : "monthly";

  // Update toggle buttons (this fixes your "yearly selected on reload" bug)
  pricingToggleButtons.forEach((btn) => {
    btn.setAttribute(
      "aria-pressed",
      btn.dataset.billing === billingMode ? "true" : "false"
    );
  });

  // Update prices
  pricingPriceBlocks.forEach((priceEl) => {
    const monthly = Number(priceEl.dataset.monthly);
    const amountEl = priceEl.querySelector(".pricing-card__amount");
    const periodEl = priceEl.querySelector(".pricing-card__period");
    const billedEl = ensureBilledLine(priceEl);

    if (billingMode === "yearly") {
      // Discounted monthly equivalent (20% off)
      const discountedMonthly = monthly * 0.8;
      const billedYearlyTotal = discountedMonthly * 12;

      amountEl.textContent = formatMoney(discountedMonthly);
      periodEl.textContent = "/mo";
      billedEl.textContent = `Billed ${formatMoney(billedYearlyTotal)} yearly`;
      billedEl.hidden = false;
    } else {
      amountEl.textContent = formatMoney(monthly);
      periodEl.textContent = "/mo";
      billedEl.hidden = true;
    }
  });

  if (savingsNote) savingsNote.hidden = billingMode !== "yearly";
}

// Click handling
pricingToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setBillingMode(button.dataset.billing);
  });
});

// ✅ Always start in MONTHLY mode on page load
setBillingMode("monthly");
