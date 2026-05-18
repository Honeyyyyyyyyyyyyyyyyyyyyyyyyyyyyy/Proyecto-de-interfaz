// =========================
// Cosas para java
// ========================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MENÚ MÓVIL (abrir/cerrar)
  // =========================
  const nav = document.getElementById("primary-nav");
  const openMenuBtn = document.querySelector('[data-action="toggle-menu"]');
  const closeMenuBtn = document.querySelector('[data-action="close-nav"]');

  if (openMenuBtn && nav) {
    openMenuBtn.addEventListener("click", () => {
      nav.hidden = false;
      openMenuBtn.setAttribute("aria-expanded", "true");
    });
  }

  if (closeMenuBtn && nav) {
    closeMenuBtn.addEventListener("click", () => {
      nav.hidden = true;
      openMenuBtn.setAttribute("aria-expanded", "false");
    });
  }


  // =========================
  // SUBMENÚS (dropdowns)
  // =========================
  const toggleButtons = document.querySelectorAll(".primary-nav__link--toggle");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {

      const submenuId = btn.getAttribute("aria-controls");
      const submenu = document.getElementById(submenuId);

      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // cerrar todos los demás submenús
      document.querySelectorAll(".submenu").forEach((menu) => {
        menu.hidden = true;
      });

      document.querySelectorAll(".primary-nav__link--toggle").forEach((b) => {
        b.setAttribute("aria-expanded", "false");
      });

      // abrir el actual si estaba cerrado
      if (!isOpen) {
        submenu.hidden = false;
        btn.setAttribute("aria-expanded", "true");
      }

    });
  });

});