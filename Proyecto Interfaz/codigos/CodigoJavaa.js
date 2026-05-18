// =========================
// ELEMENTOS
// =========================
const dialog = document.getElementById('login-dialog');
const openBtn = document.getElementById('open-login');
const closeBtn = document.querySelector('[data-action="close-login"]');

// =========================
// ABRIR MODAL
// =========================
openBtn.addEventListener('click', () => {
    dialog.showModal();
});

// =========================
// CERRAR MODAL (BOTÓN X)
// =========================
closeBtn.addEventListener('click', () => {
    dialog.close();
});

// =========================
// CERRAR AL HACER CLICK FUERA DEL CONTENIDO
// =========================
dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
        dialog.close();
    }
});

// =========================
// ESC CIERRA (opcional, ya es default en dialog)
// =========================
dialog.addEventListener('cancel', (e) => {
    dialog.close();
});