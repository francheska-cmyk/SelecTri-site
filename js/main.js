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

    searchInput.addEventListener('focus', function () {
        searchInput.removeAttribute('placeholder');
    });

    searchInput.addEventListener('blur', function () {
        searchInput.setAttribute('placeholder', 'Emballage, produit, objet...');
    });

    searchInput.addEventListener('input', function () {
        let recherche = searchInput.value.trim();

        if (recherche !== "") {
            btnClear.style.display = "block";
        } else {
            btnClear.style.display = "none";
        }

        afficherApercu(recherche);
    });

    btnClear.addEventListener('click', function () {
        searchInput.value = "";
        btnClear.style.display = "none";

        if (searchPreview) {
            searchPreview.innerHTML = "";
            searchPreview.style.display = "none";
        }

        searchInput.focus();
    });

    function lancerRecherche() {
        let recherche = searchInput.value.trim();

        if (recherche.length >= 1) {
            window.location.href = "pages/consignes.html?q=" + encodeURIComponent(recherche);
        }
    }

    searchInput.addEventListener('', function (event) {
        if (event.key === "Enter") {
            lancerRecherche();
        }
    });

    if (btnSearch) {
        btnSearch.addEventListener('click', function () {
            lancerRecherche();
        });
    }
}

//============================================= Aperçu recherche =============================================//

function afficherApercu(recherche) {
    if (!searchPreview) {
        return;
    }

    searchPreview.innerHTML = "";

    if (recherche.length < 1) {
        searchPreview.style.display = "none";
        return;
    }

    let texte = recherche.toLowerCase();
    let resultats = [];

    DECHETS.forEach(function (dechet) {
        let nom = dechet.nom.toLowerCase();
        let categorie = dechet.categorie.toLowerCase();
        let categorieLabel = dechet.categorieLabel.toLowerCase();

        if (
            nom.includes(texte) ||
            categorie.includes(texte) ||
            categorieLabel.includes(texte)
        ) {
            resultats.push(dechet);
        }
    });

    searchPreview.style.display = "block";

    if (resultats.length === 0) {
        let messageErreur = document.createElement('p');
        messageErreur.classList.add('preview-empty');
        messageErreur.textContent = "Aucun résultat trouvé";

        searchPreview.appendChild(messageErreur);
        return;
    }

    resultats.forEach(function (dechet, index) {
        if (index < 5) {
            let lien = document.createElement('a');
            lien.classList.add('preview-item');
            lien.href = "pages/ficheProduit.html?id=" + encodeURIComponent(dechet.id);

            lien.innerHTML = `
                    <strong>${dechet.nom}</strong>
            `;

            searchPreview.appendChild(lien);
        }
    });
}