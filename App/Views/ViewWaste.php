<?php

namespace App\Views;

class ViewWaste extends View
{
    private string $mode = '';
    private string $searchTerm = '';

    public function displayCategories(array $categories): self
    {
        $this->mode = 'categories';
        $this->setdata($categories);
        return $this;
    }

    public function displayInstruction(array $dechet): self
    {
        $this->mode = 'instruction';
        $this->setdata([$dechet]);
        return $this;
    }

    public function displaySearchResults(array $resultats, string $term): self
    {
        $this->mode = 'search';
        $this->searchTerm = $term;
        $this->setdata($resultats);
        return $this;
    }

    public function launchBuffer(): self
    {
        ob_start();

        if ($this->mode === 'search') {
            $this->afficherRecherche();
        } elseif ($this->mode === 'instruction') {
            $this->afficherInstruction();
        } elseif ($this->mode === 'categories') {
            $this->afficherCategories();
        }

        $this->setBuffer(ob_get_clean());
        return $this;
    }

    private function afficherRecherche(): void
    {
        $resultats = $this->getdata() ?? [];
?>
    <section class="hero">
        <div class="hero-card">
            <h1>Trier ses déchets, simplement</h1>
            <p>Cherche un déchet et trouve la bonne consigne de tri.</p>
            <form class="hero-search-row" action="/recherche" method="get">
                <div class="hero-search">
                    <input type="text" name="q" id="input-search" placeholder="Emballage, produit, objet..."
                           value="<?= htmlspecialchars($this->searchTerm) ?>" autocomplete="off" minlength="1">
                    <button class="btn-clear" id="btn-clear" type="reset" aria-label="effacer la recherche">X</button>
                    <button class="btn-search" type="submit" aria-label="lancer la recherche">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#000000" viewBox="0 0 256 256">
                            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    </section>

    <section id="section-resultats">
    <?php if ($this->searchTerm !== ''): ?>
        <?php if (empty($resultats)): ?>
            <article class="message-erreur-recherche">
                <h2>Aucun résultat pour "<?= htmlspecialchars($this->searchTerm) ?>"</h2>
                <p>Ce déchet n'existe pas encore dans notre base de données.</p>
                <p>Essaie avec : <strong>bouteille</strong>, <strong>canette</strong>, <strong>pot</strong>...</p>
            </article>
        <?php else: ?>
            <h2>Résultats pour "<?= htmlspecialchars($this->searchTerm) ?>"</h2>
            <div class="resultats-list">
                <?php foreach ($resultats as $dechet): ?>
                    <a class="card-dechet-resultat" href="/fiche?id=<?= (int) $dechet['id'] ?>">
                        <div class="categorie-icone"></div>
                        <div class="card-titre">
                            <h2><?= htmlspecialchars($dechet['categorie']) ?></h2>
                            <h3><?= htmlspecialchars($dechet['name']) ?></h3>
                        </div>
                        <span class="btn-chevron">›</span>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    <?php endif; ?>
    </section>
<?php
    }

    private function afficherInstruction(): void
    {
        $dechet = ($this->getdata() ?? [])[0] ?? [];
?>
    <nav aria-label="fil d'Ariane">
        <ol class="breadcrumb">
            <li><a href="/">Accueil</a></li>
            <li><a href="/recherche">Consignes de tri</a></li>
            <li><span><?= htmlspecialchars($dechet['name'] ?? 'Fiche produit') ?></span></li>
        </ol>
    </nav>

    <section class="ficheProduit">
    <?php if (!empty($dechet)): ?>
        <div class="ficheProduit-card">
            <div class="ficheProduit-header">
                <div class="ficheProduit-icone"></div>
                <div>
                    <span class="ficheProduit-categorie"><?= htmlspecialchars($dechet['categorie']) ?></span>
                    <h1><?= htmlspecialchars($dechet['name']) ?></h1>
                </div>
            </div>

            <div class="ficheProduit-section">
                <h2>Où le jeter ?</h2>
                <p><?= !empty($dechet['consigne'])
                        ? nl2br(htmlspecialchars($dechet['consigne']))
                        : "Consigne non disponible pour ce déchet." ?></p>
            </div>

            <?php if (!empty($dechet['co2_value_kg'])): ?>
                <div class="ficheProduit-impact">
                    <p>Bravo ! Ce geste évite environ <strong><?= htmlspecialchars($dechet['co2_value_kg']) ?> kg</strong> de CO2 <em>(estimation indicative)</em>.</p>
                </div>
            <?php endif; ?>

            <a class="btn-retour" href="/recherche">Retour à la recherche</a>
        </div>
    <?php else: ?>
        <p>Déchet introuvable.</p>
        <a class="btn-retour" href="/recherche">Retour à la recherche</a>
    <?php endif; ?>
    </section>
<?php
    }

    private function afficherCategories(): void
    {
        $categories = $this->getdata() ?? [];
?>
    <h1>Catégories de déchets</h1>
    <div class="categorie-type">
        <?php foreach ($categories as $categorie): ?>
            <div class="categorie-card"><?= htmlspecialchars($categorie['name']) ?></div>
        <?php endforeach; ?>
    </div>
<?php
    }
}