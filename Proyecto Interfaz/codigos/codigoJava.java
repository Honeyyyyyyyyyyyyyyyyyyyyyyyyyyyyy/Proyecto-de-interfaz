<!-- =========================
     SCRIPT SETTINGS
========================= -->

<script>

const gearButton = document.querySelector('.fa-gear').parentElement;

const settingsPopup = document.getElementById('settingsPopup');
const settingsOverlay = document.getElementById('settingsOverlay');
const closeSettings = document.getElementById('closeSettings');

const darkModeToggle = document.getElementById('darkModeToggle');
const fontSizeToggle = document.getElementById('fontSizeToggle');


// ABRIR SETTINGS
gearButton.addEventListener('click', (e) => {
    e.preventDefault();

    settingsPopup.classList.add('active');
    settingsOverlay.classList.add('active');
});


// CERRAR SETTINGS
closeSettings.addEventListener('click', cerrarSettings);
settingsOverlay.addEventListener('click', cerrarSettings);

function cerrarSettings(){
    settingsPopup.classList.remove('active');
    settingsOverlay.classList.remove('active');
}


// MODO OSCURO
darkModeToggle.addEventListener('change', () => {

    document.body.classList.toggle('dark-mode');

});


// LETRAS GRANDES
fontSizeToggle.addEventListener('change', () => {

    document.body.classList.toggle('big-text');

});

</script>