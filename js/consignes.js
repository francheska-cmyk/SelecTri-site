//A VERIFIER APERCU DE RECHERCHE NE FONNCTIONNE QUE SUR LA BARRE d'ACCUEIL 



const menuOpener = document.querySelector('.js-btn-menu');
const navMenu = document.querySelector('.nav-menu');

if (menuOpener && navMenu) {
    menuOpener.addEventListener('click', () => {
        const isOpen = menuOpener.classList.toggle('open');
        menuOpener.setAttribute('aria-expanded', isOpen);
        console.log(menuOpener);
        navMenu.classList.toggle('open');
    });

}

//=============================================== Barre de recherche ===================================================//

let searchInput = document.getElementById('input-search');
let btnClear = document.getElementById('btn-clear');
let btnSearch = document.querySelector('.btn-search');
let sectionResultats = document.getElementById('section-resultats');

if (searchInput && btnClear) {

    searchInput.addEventListener('focus', function () {
        searchInput.removeAttribute('placeholder');
    });

    searchInput.addEventListener('blur', function () {
        searchInput.setAttribute('placeholder', 'Emballage, produit, objet...');
    });

    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() !== "") {
            btnClear.style.display = "block";
        } else {
            btnClear.style.display = "none";
        }
    });

    btnClear.addEventListener('click', function () {
        searchInput.value = "";
        btnClear.style.display = "none";
        searchInput.focus();
    });

    function lancerRecherche() {
        let recherche = searchInput.value.trim();

        if (recherche.length >= 1) {
            window.location.href = "consignes.html?q=" + encodeURIComponent(recherche);
        }
    }

    searchInput.addEventListener('keydown', function (event) {
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
        messageErreur.textContent = "Aucun résultat trouvé.Ce déchet n'existe pas encore dans notre base de données. Leafi y travaille ! En attendant, réferez-vous à la catégorie correspondante à votre déchet";

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






//=============================================== Fonctions résultats ===================================================//

function creerCardDechet(dechet) {
    let article = document.createElement('article');
    article.classList.add('card-dechet-resultat');

    const iconeContent = dechet.icone.trim().match(/\.(png|jpg|jpeg|svg|webp)$/i)
        ? `<img src="${dechet.icone.trim()}" alt="icône ${dechet.nom}">`
        : dechet.icone;

    article.innerHTML = `
        <div class="categorie-icone">
        <span class="resultat-icone">${iconeContent}</span>
        </div>

        <div class="card-titre">
            <h3>${dechet.nom}</h3>
            <p><strong>${dechet.categorieLabel}</strong> · ${dechet.poubelle}</p>
            <p>${dechet.description}</p>
        </div>

        <a href="ficheProduit.html?id=${encodeURIComponent(dechet.id)}" class="btn-voirPlus">
            Voir
        </a>
    `;

    return article;
}

function afficherMessageErreur(titre, message) {
    sectionResultats.style.display = "block";
    sectionResultats.innerHTML = "";

    let articleErreur = document.createElement('article');
    articleErreur.classList.add('message-erreur-recherche');

    articleErreur.innerHTML = `
        <h2>${titre}</h2>
        <p>${message}</p>
        <p>Essaie avec : <strong>bouteille</strong>, <strong>canette</strong>, <strong>verre</strong> ou <strong>pot</strong>.</p>
    `;

    sectionResultats.appendChild(articleErreur);
    sectionResultats.scrollIntoView({ behavior: "smooth", block: "start" });
}

function afficherResultats(liste, recherche) {
    if (!sectionResultats) {
        return;
    }

    sectionResultats.style.display = "block";
    sectionResultats.innerHTML = "";

    if (liste.length === 0) {
        afficherMessageErreur(
            'Aucun résultat pour "' + recherche + '"',
            "Ce produit n'existe pas encore dans notre base de données. Leafi y travaille ! En attendant, réferez-vous à la catégorie correspondante à votre déchet"
        );
        return;
    }

    let titre = document.createElement('h2');
    titre.textContent = 'Résultats pour "' + recherche + '"';
    sectionResultats.appendChild(titre);

    let divResultats = document.createElement('div');
    divResultats.classList.add('resultats-list');

    liste.forEach(function (dechet) {
        let card = creerCardDechet(dechet);
        divResultats.appendChild(card);
    });

    sectionResultats.appendChild(divResultats);
    sectionResultats.scrollIntoView({ behavior: "smooth", block: "start" });
}

//=============================================== Recherche depuis URL ===================================================//

let params = new URLSearchParams(window.location.search);
let recherche = params.get('q');

if (sectionResultats && recherche) {
    let texte = recherche.trim().toLowerCase();
    let resultats = [];

    if (searchInput) {
        searchInput.value = recherche;
        btnClear.style.display = "block";
    }

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

    afficherResultats(resultats, recherche);
}
