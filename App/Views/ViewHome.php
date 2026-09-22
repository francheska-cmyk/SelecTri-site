<?php

namespace App\Views;

class ViewHome extends View
{
    public function launchBuffer(): self
    {
        ob_start();
?>
    <section class="hero">
        <div class="hero-card">
            <h1>Trier ses déchets, simplement</h1>
            <p>Cherchez un déchet, trouvez la bonne consigne et localisez le bon point de dépôt près de vous.</p>
            <form class="hero-search-row" action="/recherche" method="get">
                <div class="hero-search">
                    <input type="text" name="q" id="input-search" placeholder="Emballage, produit, objet..."
                        autocomplete="off" minlength="1">
                    <button class="btn-clear" id="btn-clear" type="reset" aria-label="effacer la recherche">X</button>
                    <button class="btn-search" type="submit" aria-label="lancer la recherche">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#000000" viewBox="0 0 256 256">
                            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                        </svg>
                    </button>
                </div>
            </form>
            <div class="hero-leafi">
                <p>Hello, je suis Leafi. Bienvenue !</p>
                <img src="/assets/images/identite_site/leafi-classique.svg" alt="Leafi, la mascotte du site">
            </div>
        </div>
    </section>

    <section class="info horizontal-scroll">
        <h2>Comment ça fonctionne ?</h2>
        <p>SelecTri t'aide à mieux trier, déposer et réparer au quotidien.</p>
        <div class="card-info">
            <article class="card-article">
                <div class="card-icone icone-tri">
                    <img src="/assets/images/UI_icone/recycle.svg" alt="Symbole de recyclage">
                </div>
                <div class="card-titre">
                    <h3>Je trie</h3>
                    <p>Consulter les bons gestes de tri</p>
                </div>
                <a class="btn-arrow" href="/recherche" aria-label="voir les consignes de tri">
                    <img src="/assets/images/UI_icone/arrow-right.svg" alt="">
                </a>
            </article>
            <article class="card-article">
                <div class="card-icone icone-depot">
                    <img src="/assets/images/UI_icone/map.svg" alt="Icône carte" class="icone-map">
                    <img src="/assets/images/UI_icone/pin-alt-duotone-line_ (1).png" alt="Icône pin" class="icone-pin">
                </div>
                <div class="card-titre">
                    <h3>Je dépose</h3>
                    <p>Trouver un point de dépôt près de chez moi</p>
                </div>
                <a class="btn-arrow" href="#" aria-label="voir la carte des dépôts">
                    <img src="/assets/images/UI_icone/arrow-right.svg" alt="">
                </a>
            </article>
            <article class="card-article">
                <div class="card-icone icone-repair">
                    <img src="/assets/images/UI_icone/puzzle.svg" alt="Icône réparation">
                </div>
                <div class="card-titre">
                    <h3>Je répare</h3>
                    <p>Découvrir le Bonus Réparation pour mes objets</p>
                </div>
                <a class="btn-arrow" href="#" aria-label="voir le bonus réparation">
                    <img src="/assets/images/UI_icone/arrow-right.svg" alt="">
                </a>
            </article>
        </div>
    </section>

    <section class="info-defi">
        <h2>Défi du mois</h2>
        <div class="card-info">
            <article class="card-article">
                <div class="card-icone">
                    <img src="/assets/images/illustrations/plastic-free.jpg" alt="Zéro plastique jetable">
                </div>
                <div class="card-titre">
                    <h3>Zéro plastique jetable</h3>
                    <p>Remplace une habitude plastique par une alternative durable : <strong>gourde, tote bag, boîte réutilisable.</strong> 1 mois, un geste à la fois.</p>
                </div>
                <button class="btn-principal btn-defi" type="button">Je participe
                    <img src="/assets/images/UI_icone/arrow-right.svg" alt="">
                </button>
            </article>
        </div>
    </section>

    <section class="info-impact horizontal-scroll">
        <div class="titre-impact">
            <h2>Impact collectif <small>- mis à jour régulièrement</small></h2>
        </div>
        <div class="impact">
            <div class="card-impact">
                <h3>kg mensuel recyclés</h3>
                <p>125 kg</p>
            </div>
            <div class="card-impact">
                <h3>Trinautes actifs</h3>
                <p>58</p>
            </div>
            <div class="card-impact">
                <h3>Défis relevés</h3>
                <p>167</p>
            </div>
            <div class="card-impact">
                <h3>Points de dépôts</h3>
                <p>300 points référencés</p>
            </div>
        </div>
    </section>

    <section class="cta-compte">
        <div class="cta-compte-texte">
            <h2>Suivez votre impact écologique et débloquez des badges !</h2>
            <p>Créez un compte gratuit pour enregistrer vos défis accomplis, mesurer vos kg de CO2 évités et rejoindre le mouvement citoyen.</p>
            <button class="btn-principal" type="button">Créer un compte
                <img src="/assets/images/UI_icone/arrow-right.svg" alt="">
            </button>
        </div>
    </section>
<?php
        $this->setBuffer(ob_get_clean());
        return $this;
    }
}