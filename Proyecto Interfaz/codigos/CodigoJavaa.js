// =========================
// Cosas para java
// ========================

const settingsBtn = document.querySelector('.settings-btn');

const personalizationPanel =
document.getElementById('personalization-panel');

const closePersonalization =
document.querySelector('[data-action="close-personalization"]');


// ABRIR PANEL
settingsBtn.addEventListener('click', () => {

    personalizationPanel.hidden = false;

});


// CERRAR PANEL
closePersonalization.addEventListener('click', () => {

    personalizationPanel.hidden = true;

});


//parte donde si jalan los settings

// ==========================
// MODO OSCURO
// ==========================

const darkBtn = document.querySelector('[data-theme="dark"]');
const lightBtn = document.querySelector('[data-theme="light"]');

darkBtn.addEventListener('click', () => {

    document.body.classList.add('dark-mode');

});

lightBtn.addEventListener('click', () => {

    document.body.classList.remove('dark-mode');

});


// ==========================
// TAMAÑO DE TEXTO
// ==========================

let currentSize = 100;

const fontValue = document.getElementById('font-size-value');

const increaseBtn =
document.querySelector('[data-action="increase-font"]');

const decreaseBtn =
document.querySelector('[data-action="decrease-font"]');

const resetBtn =
document.querySelector('[data-action="reset-font"]');


// AUMENTAR
increaseBtn.addEventListener('click', () => {

    currentSize = Math.min(currentSize + 10, 150)

    document.body.style.fontSize = currentSize + '%';

    fontValue.textContent = currentSize + '%';

});


// DISMINUIR
decreaseBtn.addEventListener('click', () => {

    currentSize = Math.max(currentSize - 10, 100);

    document.body.style.fontSize = currentSize + '%';

    fontValue.textContent = currentSize + '%';

});


// RESET
resetBtn.addEventListener('click', () => {

    currentSize = 100;

    document.body.style.fontSize = '100%';

    fontValue.textContent = '100%';

});

//=========================================================================================================================

document.addEventListener("DOMContentLoaded", () => {

  const nav = document.getElementById("primary-nav");
  const toggleBtn = document.querySelector('[data-action="toggle-menu"]');

  // =========================
  // MENÚ PRINCIPAL
  // =========================
  if (nav && toggleBtn) {

    toggleBtn.addEventListener("click", () => {

      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";

      nav.hidden = isOpen;
      toggleBtn.setAttribute("aria-expanded", String(!isOpen));

      // icono hamburguesa
      toggleBtn.innerHTML = !isOpen
        ? '<span aria-hidden="true">☰</span>'
        : '<span aria-hidden="true">☰</span>';

      // si se cierra, cerrar submenús también
      if (isOpen) {
        document.querySelectorAll(".submenu").forEach(menu => menu.hidden = true);

        document.querySelectorAll(".primary-nav__link--toggle").forEach(btn => {
          btn.setAttribute("aria-expanded", "false");
        });
      }

    });

  }

  // =========================
  // SUBMENÚS (ACORDEÓN) - VERSIÓN DEFINITIVA
  // =========================
  if (nav) {
    nav.addEventListener("click", (event) => {
      // 1. Detectar si lo que el usuario tocó fue el botón o algo dentro de él
      const btn = event.target.closest(".primary-nav__link--toggle");
      
      // Si no tocó un botón de submenú, ignoramos el click
      if (!btn) return;

      // Evitamos que el botón intente recargar la página o hacer cosas raras
      event.preventDefault();

      const submenuId = btn.getAttribute("aria-controls");
      const submenu = document.getElementById(submenuId);
      
      // 2. Guardar el estado actual (¿Estaba abierto?)
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // 3. CERRAR TODOS los botones y submenús primero
      const allButtons = nav.querySelectorAll(".primary-nav__link--toggle");
      allButtons.forEach(b => {
        b.setAttribute("aria-expanded", "false");
        const sub = document.getElementById(b.getAttribute("aria-controls"));
        if (sub) {
          sub.style.display = "none"; // Forzamos por inline style para ganarle al CSS
          sub.hidden = true;
        }
      });

      // 4. Si el botón NO estaba abierto, lo abrimos
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        if (submenu) {
          submenu.style.display = "block"; // Forzamos la aparición
          submenu.hidden = false;
        }
      }
      // Si SÍ estaba abierto, se queda cerrado gracias al paso 3.
    });
  }

});