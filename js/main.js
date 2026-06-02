const menuOpener = document.querySelector('.js-btn-menu');
const navMenu = document.querySelector('.nav-menu');

menuOpener.addEventListener('click', () => {
    const isOpen = menuOpener.classList.toggle('open');
    menuOpener.setAttribute('aria-expanded', isOpen);
    console.log(menuOpener);
    navMenu.classList.toggle('open');
});

//========================Scroll partie accès rapide=====================//
const accesRapide = document.querySelector(".horizontal-scroll");
accesRapide.scrollTo({left:200, behavior:'smooth'});


//============================================= barre de recherche=========================================//

let searchInput = document.getElementById('input-search'); 
let btnClear = document.getElementById('btn-clear');
searchInput.addEventListener ('focus', function(){
    searchInput.removeAttribute('placeholder')
});
searchInput.addEventListener('blur', function(){
    searchInput.setAttribute('placeholder', 'Emballage, produit, objet...');

});
searchInput.addEventListener('input',()=>{
    if (searchInput.value.trim() !=="")//trim prend en compte si user met espace. Espace pas vu comme contenu
        {btnClear.style.display="block";
    } else {
        btnClear.style.display="none"
    }}); 

btnClear.addEventListener('click',()=>{
    searchInput.value = ""; 
    btnClear.style.display="none"
})
//=============================================Barre de recherche focntionnelle==========================================//
searchInput.addEventListener('input', ()=>{
    if(searchInput.value.length >=1){
        window.location.href = "../pages/consignes.html?q="+encodeURIComponent(searchInput.value);
    }console.log(window.location.href); 
})
