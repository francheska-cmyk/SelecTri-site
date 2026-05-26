const menuOpener = document.querySelector('.js-btn-menu');
const navMenu = document.querySelector('.nav-menu');

menuOpener.addEventListener('click', () => {
    const isOpen = menuOpener.classList.toggle('open');
    menuOpener.setAttribute('aria-expanded', isOpen);
    console.log(menuOpener);
    navMenu.classList.toggle('open');
});
