const menuOpener = document.querySelector('.js-btn-menu');
const navMenu = document.querySelector('.nav-menu');

if (menuOpener && navMenu) {
    menuOpener.addEventListener('click', function () {
        const isOpen = menuOpener.classList.toggle('open');
        menuOpener.setAttribute('aria-expanded', isOpen);
        navMenu.classList.toggle('open');
    });
}

//======================== Scroll partie accès rapide =====================//

const accesRapide = document.querySelector(".horizontal-scroll");

if (accesRapide) {
    accesRapide.scrollTo({ left: 200, behavior: 'smooth' });
}

//============================================= Barre de recherche =============================================//

let searchInput = document.getElementById('input-search');
let btnClear = document.getElementById('btn-clear');
let btnSearch = document.querySelector('.btn-search');
let searchPreview = document.getElementById('search-preview');

if (searchInput && btnClear) {

btnClear.addEventListener('click',()=>{
    searchInput.value = ""; 
    btnClear.style.display="none"
})
//=============================================Barre de recherche focntionnelle==========================================//
searchInput.addEventListener('input', ()=>{
    if(searchInput.value.length >=1){
        window.location.href = "../pages/consignes.html?q="+encodeURIComponent(searchInput.value);
    }console.log(window.location.href); 
})}
