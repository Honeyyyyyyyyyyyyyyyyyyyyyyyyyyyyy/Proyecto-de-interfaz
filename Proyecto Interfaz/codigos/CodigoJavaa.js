<<<<<<< HEAD
/*madre de java*/
(function() {
  const SESSION_KEY = 'liverpool_auth_session';
  
  const overlay = document.getElementById('global-auth-overlay');
  const modal = document.getElementById('global-auth-modal');
  
  // Cambia entre las pantallas de Login, Registro y Recuperación
  function showScreen(screenNum) {
    document.querySelectorAll('.auth-screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`auth-screen-${screenNum}`);
    if(target) target.classList.add('active');
  }

  // Eventos para navegar entre las pestañas del modal
  document.getElementById('go-to-register')?.addEventListener('click', () => showScreen(2));
  document.getElementById('go-to-recover')?.addEventListener('click', () => showScreen(3));
  document.getElementById('back-to-login-1')?.addEventListener('click', () => showScreen(1));
  document.getElementById('back-to-login-2')?.addEventListener('click', () => showScreen(1));

  // FUNCIÓN CLAVE: Limpia por completo el desenfoque (blur) y libera la tienda
  function forceUnlockSite() {
    if (overlay) {
      overlay.style.display = 'none';
      overlay.hidden = true;
      overlay.setAttribute('aria-hidden', 'true');
    }
    
    if (modal && typeof modal.close === 'function') {
      modal.close();
    }

    // Regresa el scroll al cuerpo de la página
    document.body.classList.remove('auth-locked');
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    // REMUEVE EL BLUR RESIDUAL: Limpia los filtros pegados en el contenido principal
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.style.filter = 'none';
      mainContent.style.backdropFilter = 'none';
    }
    document.body.style.filter = 'none';
  }

  // Guarda la sesión en el navegador y desbloquea el sitio
  function grantAccess(email) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ loggedIn: true, email: email }));
    } catch(e){}
    
    forceUnlockSite();
  }

  // --- VALIDACIÓN DE LA PANTALLA 1: INICIAR SESIÓN ---
  document.getElementById('btn-submit-login')?.addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-password').value;
    
    let valid = true;
    if(!email.includes('@')) {
      document.getElementById('login-email-error').textContent = 'Ingresa un correo válido.';
      valid = false;
    } else {
      document.getElementById('login-email-error').textContent = '';
    }

    if(pass.length < 8) {
      document.getElementById('login-pass-error').textContent = 'Mínimo 8 caracteres.';
      valid = false;
    } else {
      document.getElementById('login-pass-error').textContent = '';
    }

    if(valid) {
      grantAccess(email);
    }
  });

  // --- VALIDACIÓN DE LA PANTALLA 2: REGISTRO ---
  document.getElementById('btn-submit-register')?.addEventListener('click', function(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const lastname = document.getElementById('reg-lastname').value.trim();
    const birthdateVal = document.getElementById('reg-birthdate').value;
    const gender = document.getElementById('reg-gender').value;
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-password').value;
    
    let valid = true;
    
// 1. Validar Nombre
    if(name === "") {
      document.getElementById('reg-name-error').textContent = 'Ingresa tu nombre.';
      valid = false;
    } else {
      document.getElementById('reg-name-error').textContent = '';
    }

    // 2. Validar Apellido
    if(lastname === "") {
      document.getElementById('reg-lastname-error').textContent = 'Ingresa tu apellido.';
      valid = false;
    } else {
      document.getElementById('reg-lastname-error').textContent = '';
    }

    // 3. Validar Fecha de Nacimiento y Mayoría de Edad (18 años)
    if(birthdateVal === "") {
      document.getElementById('reg-birth-error').textContent = 'Selecciona tu fecha de nacimiento.';
      valid = false;
    } else {
      // Cálculo de edad preciso
      const birthDate = new Date(birthdateVal);
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      
      // Ajuste por si aún no pasa su cumpleaños en el año actual
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if(age < 18) {
        document.getElementById('reg-birth-error').textContent = 'Debes ser mayor de 18 años para registrarte.';
        valid = false;
      } else {
        document.getElementById('reg-birth-error').textContent = '';
      }
    }

    // 4. Validar Sexo / Género
    if(gender === "") {
      document.getElementById('reg-gender-error').textContent = 'Selecciona una opción.';
      valid = false;
    } else {
      document.getElementById('reg-gender-error').textContent = '';
    }

    // 5. Validar Correo Electrónico
    if(!email.includes('@')) {
      document.getElementById('reg-email-error').textContent = 'Correo inválido.';
      valid = false;
    } else {
      document.getElementById('reg-email-error').textContent = '';
    }

    // 6. Validar Contraseña
    if(pass.length < 8) {
      document.getElementById('reg-pass-error').textContent = 'Mínimo 8 caracteres.';
      valid = false;
    } else {
      document.getElementById('reg-pass-error').textContent = '';
    }

    if(valid) {
      grantAccess(email);
    }
  });

  // --- VALIDACIÓN DE LA PANTALLA 3: RECUPERACIÓN ---
  document.getElementById('btn-submit-recover')?.addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('recover-email').value.trim();
    const errorSpan = document.getElementById('recover-email-error');
    
    if(!email.includes('@')) {
      if(errorSpan) errorSpan.textContent = 'Correo no registrado.';
    } else {
      if(errorSpan) errorSpan.textContent = '';
      alert('Enlace de recuperación enviado a tu correo.');
      showScreen(1);
    }
  });

  // --- COMPROBACIÓN DE SESIÓN AL CARGAR LA PÁGINA ---
  function initAuthGate() {
    let hasSession = false;
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      hasSession = raw ? JSON.parse(raw)?.loggedIn === true : false;
    } catch (_) { }

    if (!hasSession) {
      // Si no ha iniciado sesión, muestra el modal y congela la pantalla
      if (overlay) {
        overlay.style.display = 'flex';
        overlay.hidden = false;
      }
      document.body.classList.add('auth-locked');

      if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
      } else if (modal) {
        modal.removeAttribute('hidden');
        modal.setAttribute('open', '');
      }
      showScreen(1); // Muestra la pantalla de login por defecto
    } else {
      // Si ya inició sesión antes, limpia todo rastro de bloqueo de inmediato
      forceUnlockSite();
    }
  }

  // Arranca el script cuando el HTML esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthGate);
  } else {
    initAuthGate();
  }
})();
=======
// =========================
// Cosas para java
// ========================
<<<<<<< HEAD

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
=======
>>>>>>> 84842e428063ec4a650969b71b212aa9d21848a0
>>>>>>> 397b85d91adc1303ac77567c26556908e0c7e5e5
