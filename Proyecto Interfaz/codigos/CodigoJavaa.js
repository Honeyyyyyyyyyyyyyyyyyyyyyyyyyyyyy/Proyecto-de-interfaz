/*madre de javascript*/
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
      const err = document.getElementById('login-email-error');
      if(err) err.textContent = 'Ingresa un correo válido.';
      valid = false;
    } else {
      const err = document.getElementById('login-email-error');
      if(err) err.textContent = '';
    }

    if(pass.length < 8) {
      const err = document.getElementById('login-pass-error');
      if(err) err.textContent = 'Mínimo 8 caracteres.';
      valid = false;
    } else {
      const err = document.getElementById('login-pass-error');
      if(err) err.textContent = '';
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
      const err = document.getElementById('reg-name-error');
      if(err) err.textContent = 'Ingresa tu nombre.';
      valid = false;
    } else {
      const err = document.getElementById('reg-name-error');
      if(err) err.textContent = '';
    }

    // 2. Validar Apellido
    if(lastname === "") {
      const err = document.getElementById('reg-lastname-error');
      if(err) err.textContent = 'Ingresa tu apellido.';
      valid = false;
    } else {
      const err = document.getElementById('reg-lastname-error');
      if(err) err.textContent = '';
    }

    // 3. Validar Fecha de Nacimiento y Mayoría de Edad (18 años)
    if(birthdateVal === "") {
      const err = document.getElementById('reg-birth-error');
      if(err) err.textContent = 'Selecciona tu fecha de nacimiento.';
      valid = false;
    } else {
      const birthDate = new Date(birthdateVal);
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if(age < 18) {
        const err = document.getElementById('reg-birth-error');
        if(err) err.textContent = 'Debes ser mayor de 18 años para registrarte.';
        valid = false;
      } else {
        const err = document.getElementById('reg-birth-error');
        if(err) err.textContent = '';
      }
    }

    // 4. Validar Sexo / Género
    if(gender === "") {
      const err = document.getElementById('reg-gender-error');
      if(err) err.textContent = 'Selecciona una opción.';
      valid = false;
    } else {
      const err = document.getElementById('reg-gender-error');
      if(err) err.textContent = '';
    }

    // 5. Validar Correo Electrónico
    if(!email.includes('@')) {
      const err = document.getElementById('reg-email-error');
      if(err) err.textContent = 'Correo inválido.';
      valid = false;
    } else {
      const err = document.getElementById('reg-email-error');
      if(err) err.textContent = '';
    }

    // 6. Validar Contraseña
    if(pass.length < 8) {
      const err = document.getElementById('reg-pass-error');
      if(err) err.textContent = 'Mínimo 8 caracteres.';
      valid = false;
    } else {
      const err = document.getElementById('reg-pass-error');
      if(err) err.textContent = '';
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
      showScreen(1);
    } else {
      forceUnlockSite();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthGate);
  } else {
    initAuthGate();
  }
})();

// =========================================================================================================================
// INTERFACES GENERALES (MENU Y SETTINGS) - SE SEGURO TRAS CARGAR EL DOM
// =========================================================================================================================
document.addEventListener("DOMContentLoaded", () => {

  // --- SETTINGS / PANEL DE PERSONALIZACIÓN ---
  const settingsBtn = document.querySelector('.settings-btn');
  const personalizationPanel = document.getElementById('personalization-panel');
  const closePersonalization = document.querySelector('[data-action="close-personalization"]');

  // Aseguramos que existan antes de asignar el evento para evitar errores catastróficos
  if (settingsBtn && personalizationPanel) {
    settingsBtn.addEventListener('click', () => {
      personalizationPanel.hidden = false;
    });
  }

  if (closePersonalization && personalizationPanel) {
    closePersonalization.addEventListener('click', () => {
      personalizationPanel.hidden = true;
    });
  }

  // --- MODO OSCURO ---
  const darkBtn = document.querySelector('[data-theme="dark"]');
  const lightBtn = document.querySelector('[data-theme="light"]');

  darkBtn?.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
  });

  lightBtn?.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
  });

  // --- TAMAÑO DE TEXTO ---
  let currentSize = 100;
  const fontValue = document.getElementById('font-size-value');
  const increaseBtn = document.querySelector('[data-action="increase-font"]');
  const decreaseBtn = document.querySelector('[data-action="decrease-font"]');
  const resetBtn = document.querySelector('[data-action="reset-font"]');

  increaseBtn?.addEventListener('click', () => {
    currentSize = Math.min(currentSize + 10, 150);
    document.body.style.fontSize = currentSize + '%';
    if (fontValue) fontValue.textContent = currentSize + '%';
  });

  decreaseBtn?.addEventListener('click', () => {
    currentSize = Math.max(currentSize - 10, 100);
    document.body.style.fontSize = currentSize + '%';
    if (fontValue) fontValue.textContent = currentSize + '%';
  });

  resetBtn?.addEventListener('click', () => {
    currentSize = 100;
    document.body.style.fontSize = '100%';
    if (fontValue) fontValue.textContent = '100%';
  });

  // --- MENÚ PRINCIPAL Y SUBMENÚS ---
  const nav = document.getElementById("primary-nav");
  const toggleBtn = document.querySelector('[data-action="toggle-menu"]');

  if (nav && toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      nav.hidden = isOpen;
      toggleBtn.setAttribute("aria-expanded", String(!isOpen));

      toggleBtn.innerHTML = !isOpen
        ? '<span aria-hidden="true">☰</span>'
        : '<span aria-hidden="true">☰</span>';

      if (isOpen) {
        document.querySelectorAll(".submenu").forEach(menu => {
          menu.style.display = "none";
          menu.hidden = true;
        });

        document.querySelectorAll(".primary-nav__link--toggle").forEach(btn => {
          btn.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  // SUBMENÚS (ACORDEÓN DESDE EL PADRE)
  if (nav) {
    nav.addEventListener("click", (event) => {
      const btn = event.target.closest(".primary-nav__link--toggle");
      if (!btn) return;

      event.preventDefault();

      const submenuId = btn.getAttribute("aria-controls");
      const submenu = document.getElementById(submenuId);
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // Resetear todos los demás submenús
      const allButtons = nav.querySelectorAll(".primary-nav__link--toggle");
      allButtons.forEach(b => {
        b.setAttribute("aria-expanded", "false");
        const sub = document.getElementById(b.getAttribute("aria-controls"));
        if (sub) {
          sub.style.display = "none";
          sub.hidden = true;
        }
      });

      // Alternar el actual
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        if (submenu) {
          submenu.style.display = "block";
          submenu.hidden = false;
        }
      }
    });
  }
});