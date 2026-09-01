//A VERIFIER APERCU DE RECHERCHE NE FONNCTIONNE QUE SUR LA BARRE d'ACCUEIL 


const menuOpener = document.querySelector('.js-btn-menu');
const navMenu = document.querySelector('.nav-menu');

if (menuOpener && navMenu) {
    menuOpener.addEventListener('click', function () {
        const isOpen = menuOpener.classList.toggle('open');
        menuOpener.setAttribute('aria-expanded', isOpen);
        navMenu.classList.toggle('open');
    });
}

//==================================== Barre de recherche=================================//

let searchInput = document.getElementById('input-search');
let btnClear = document.getElementById('btn-clear');
let btnSearch = document.querySelector('.btn-search');

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




//=============================================== Fiche produit ===================================================//

let ficheProduit = document.getElementById('ficheProduit');

let params = new URLSearchParams(window.location.search);
let idProduit = params.get('id');

function afficherMessageErreur() {
    ficheProduit.innerHTML = "";

    let articleErreur = document.createElement('article');
    articleErreur.classList.add('ficheProduit-card');

    articleErreur.innerHTML = `
        <h1>Produit introuvable</h1>
        <p>Ce produit n'existe pas dans la base de données.</p>
        <p>Retourne sur la page des consignes pour faire une nouvelle recherche.</p>
        <a href="consignes.html" class="btn-retour">Retour aux consignes</a>
    `;

    ficheProduit.appendChild(articleErreur);
}

//=================== Pour récupérer l'icone de la catégorie déchet en HTML
function iconeEnHtml(icone, nom){
    return icone.trim().match(/\.(png|jpg|jpeg|svg|webp)$/i)
        ? `<img src="${icone.trim()}" alt="icône ${nom}">`
        : icone;
}

//===============Création des accordéons (fiche déchet)
function initAccordeons(articleFiche) {
    let accordionHeaders = articleFiche.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(function (header) {
        header.addEventListener('click', function () {
            let body = document.getElementById(header.getAttribute('aria-controls'));
            let estOuvert = header.getAttribute('aria-expanded') === 'true';

            header.setAttribute('aria-expanded', String(!estOuvert));

            if (estOuvert) {
                body.setAttribute('hidden', '');
            } else {
                body.removeAttribute('hidden');
            }
        });
    });

    //====== pour fermer le contenu d'un  accordéon 
    let btnFermer = articleFiche.querySelector('.accordion-fermer');

    if (btnFermer) {
        btnFermer.addEventListener('click', function () {
            let header = articleFiche.querySelector('.accordion-bleu .accordion-header');
            let body = document.getElementById('accordion-body-jeter');
            header.setAttribute('aria-expanded', 'false');
            body.setAttribute('hidden', '');
        });
    }
}

//======== pour afficher une suggestion de déchet de la même catégorie 

function afficherMemeCategorie(produit) {
    let autresDechets = DECHETS.filter(function (dechet) {
        return dechet.categorie === produit.categorie && dechet.id !== produit.id;
    });

    let sectionMemeCategorie = document.querySelector('.meme-categorie');
    let listeMemeCategorie = document.getElementById('meme-categorie-liste');

    if (autresDechets.length === 0) {
        sectionMemeCategorie.style.display = "none";
        return;
    }

    autresDechets.forEach(function (autre) {
        let miniCard = document.createElement('article');
        miniCard.classList.add('mini-card-dechet');

        miniCard.innerHTML = `
            ${iconeEnHtml(autre.icone, autre.nom)}
            <h3>${autre.nom}</h3>
            <a href="ficheProduit.html?id=${encodeURIComponent(autre.id)}" class="btn-voirPlus">Voir</a>
        `;

        listeMemeCategorie.appendChild(miniCard);
    });
}

//Pour mettre à jour le fil ariane pour aller à la page suivante

function mettreAJourFilAriane(produit) {
    let lienCategorie = document.getElementById('breadcrumb-categorie-link');
    let spanProduit = document.getElementById('breadcrumb-produit');

    if (lienCategorie) {
        lienCategorie.textContent = produit.categorieLabel;
        lienCategorie.href = "categorie.html?type=" + encodeURIComponent(produit.categorie);
    }

    if (spanProduit) {
        spanProduit.textContent = produit.nom;
    }

    document.title = "SelecTri - " + produit.nom;
}

function afficherFicheProduit(produit) {
ficheProduit.innerHTML = "";
    mettreAJourFilAriane(produit);

    let articleFiche = document.createElement('article');
    articleFiche.classList.add('ficheProduit-card');

    let bonsGestesHtml = produit.bonsGestes.map(function (geste) {
        return `<li>${geste}</li>`;
    }).join('');

// le code HTML intégré dynamiquement dans l'espace prévu 
articleFiche.innerHTML = `
        <div class="ficheProduit-header">
            <span class="ficheProduit-icone">${iconeEnHtml(produit.icone, produit.nom)}</span>

            <div>
                <p class="ficheProduit-categorie">${produit.categorieLabel}</p>
                <h1>${produit.nom}</h1>
            </div>
        </div>

        <p class="ficheProduit-description">${produit.description}</p>

        <div class="accordion accordion-bleu">
            <button class="accordion-header" type="button" aria-expanded="true" aria-controls="accordion-body-jeter">
                <span>Où le jeter ?</span>
                <img class="icon-chevron" src="../images/UI_icone/caret-down.svg" alt="">
            </button>
            <div class="accordion-body" id="accordion-body-jeter">
                <div class="accordion-content">
                    <img src="../images/UI_icone/map-pin.svg" alt="">
                    <p>${produit.consigne}</p>
                </div>
                <button class="accordion-fermer" type="button">fermer ✕</button>
            </div>
        </div>

        <div class="accordion accordion-vert">
            <button class="accordion-header" type="button" aria-expanded="false" aria-controls="accordion-body-gestes">
                <span>Bons gestes associés</span>
                <img class="icon-chevron" src="../images/UI_icone/caret-down.svg" alt="">
            </button>
            <div class="accordion-body" id="accordion-body-gestes" hidden>
                <ul>${bonsGestesHtml}</ul>
            </div>
        </div>

        <div class="points-collecte-banniere" title="Fonctionnalité à venir : carte des points de dépôt">
            <span>Points de collecte proche</span>
            <span class="lien-carte">Voir la carte →</span>
        </div>

        <div class="leafi-message">
            <img src="../images/identite_site/leafi-classique.svg" alt="Leafi, la mascotte de SelecTri">
            <p>Bravo ! Ce geste évite environ <strong>${produit.co2}</strong> <em>(estimation indicative)</em>.</p>
        </div>

        <section class="meme-categorie">
            <h2>Dans la même catégorie</h2>
            <div class="meme-categorie-liste" id="meme-categorie-liste"></div>
        </section>

        <a href="consignes.html" class="btn-retour">Retour aux consignes</a>
    `;


    ficheProduit.appendChild(articleFiche);
    initAccordeons(articleFiche); 
    afficherMemeCategorie(produit); 
}

// action du produit non trouvé 
if (ficheProduit) {
    let produitTrouve = null;

    DECHETS.forEach(function (dechet) {
        if (dechet.id === idProduit) {
            produitTrouve = dechet;
        }
    });
// Affichage si le produit est trouvé
    if (produitTrouve) {
        afficherFicheProduit(produitTrouve);
    } else {
        afficherMessageErreur();
    }
}