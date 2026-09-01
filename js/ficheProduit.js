const menuOpener = document.querySelector('.js-btn-menu');
const navMenu = document.querySelector('.nav-menu');

if (menuOpener && navMenu) {
    menuOpener.addEventListener('click', function () {
        const isOpen = menuOpener.classList.toggle('open');
        menuOpener.setAttribute('aria-expanded', isOpen);
        navMenu.classList.toggle('open');
    });
}


//============================Bouton retour================//
let btnBack = document.getElementById('btn-black'); 
if(btnBack){
    btnBack.addEventListener('click', function(){
        window.history.back();
    })
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

function afficherFicheProduit(produit) {
    ficheProduit.innerHTML = "";

    let articleFiche = document.createElement('article');
    articleFiche.classList.add('ficheProduit-card');

    articleFiche.innerHTML = `
        <div class="ficheProduit-header">
            <span class="ficheProduit-icone">${produit.icone}</span>

            <div>
                <p class="ficheProduit-categorie">${produit.categorieLabel}</p>
                <h1>${produit.nom}</h1>
            </div>
        </div>

        <div class="ficheProduit-section">
            <h2>Où le jeter ?</h2>
            <p>${produit.poubelle}</p>
        </div>

        <div class="ficheProduit-section">
            <h2>Consigne de tri</h2>
            <p>${produit.consigne}</p>
        </div>

        <div class="ficheProduit-section">
            <h2>Pourquoi ?</h2>
            <p>${produit.description}</p>
        </div>

        <div class="ficheProduit-section">
            <h2>Bons gestes</h2>
            <ul id="liste-bons-gestes"></ul>
        </div>

        <div class="ficheProduit-impact">
            <h2>Impact estimé</h2>
            <p>${produit.co2}</p>
        </div>

        <a href="consignes.html" class="btn-retour">Retour aux consignes</a>
    `;

    ficheProduit.appendChild(articleFiche);

    let listeBonsGestes = document.getElementById('liste-bons-gestes');

    produit.bonsGestes.forEach(function (geste) {
        let li = document.createElement('li');
        li.textContent = geste;
        listeBonsGestes.appendChild(li);
    });
}

if (ficheProduit) {
    let produitTrouve = null;

    DECHETS.forEach(function (dechet) {
        if (dechet.id === idProduit) {
            produitTrouve = dechet;
        }
    });

    if (produitTrouve) {
        afficherFicheProduit(produitTrouve);
    } else {
        afficherMessageErreur();
    }
}