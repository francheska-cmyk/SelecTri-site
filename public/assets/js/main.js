//======================== menu burger  =====================//

const menuOpener = document.querySelector('.js-btn-menu');
const navMenu = document.querySelector('.nav-menu');

if (menuOpener && navMenu) {
    menuOpener.addEventListener('click', function () {
        const isOpen = menuOpener.classList.toggle('open');
        menuOpener.setAttribute('aria-expanded', isOpen);
        navMenu.classList.toggle('open');
    });
}

//============================================= Barre de recherche =============================================//
const searchInput = document.getElementById('input-search');
const btnClear = document.getElementById('btn-clear');

if (searchInput && btnClear) {
    searchInput.addEventListener('focus', () => searchInput.removeAttribute('placeholder'));
    searchInput.addEventListener('blur', () => searchInput.setAttribute('placeholder', 'Emballage, produit, objet...'));

    searchInput.addEventListener('input', () => {
        btnClear.style.display = searchInput.value.trim() !== '' ? 'block' : 'none';
    });

    btnClear.addEventListener('click', () => {
        searchInput.value = '';
        btnClear.style.display = 'none';
        searchInput.focus();
    });
}

//======================== Scroll partie accès rapide =====================//

const accesRapide = document.querySelector(".horizontal-scroll");

if (accesRapide) {
    accesRapide.scrollTo({ left: 200, behavior: 'smooth' });
}
