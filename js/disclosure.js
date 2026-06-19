document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".dev-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const disclosure = toggle.closest(".dev-disclosure");
      if (!disclosure) return;

      const isOpen = disclosure.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });
});
