document.addEventListener('DOMContentLoaded', () => {
  const btnHamburger = document.getElementById('btn-hamburger');
  const btnCloseMenu = document.getElementById('btn-close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  function openMenu() {
    mobileMenu?.classList.add('open');
    menuOverlay?.classList.add('active');
    btnHamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Evita scroll en la tienda trasera
  }

  function closeMenu() {
    mobileMenu?.classList.remove('open');
    menuOverlay?.classList.remove('active');
    btnHamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto'; // Devuelve el scroll
  }

  btnHamburger?.addEventListener('click', openMenu);
  btnCloseMenu?.addEventListener('click', closeMenu);
  menuOverlay?.addEventListener('click', closeMenu);
});