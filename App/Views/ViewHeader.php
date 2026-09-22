<?php

namespace App\Views;

class ViewHeader
{
    private string $title;
    private string $buffer = '';

    public function __construct(string $title = 'SelecTri')
    {
        $this->title = $title;
    }

    public function launchBuffer(): self
    {
        ob_start();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/indexStyle.css">
    <link rel="stylesheet" href="/assets/css/consignes.css">
    <link rel="icon" type="image/jpg" href="/assets/images/identite_site/g11.jpg">
    <title><?= htmlspecialchars($this->title) ?></title>
</head>
<body>
    <header>
        <nav aria-label="navigateur-principal" class="header-nav">
            <a href="/" class="logo">
                <img src="/assets/images/identite_site/leafi-logo.svg" alt="Logo du site SelecTri">
                <span>
                    <span class="logo-selec">Selec</span><span class="logo-tri">Tri</span>
                </span>
            </a>
            <ul class="nav-menu">
                <li class="nav-tri nav-item"><a href="/recherche">Consignes de tri</a></li>
                <li class="nav-depot nav-item"><a href="#">Points de dépôts</a></li>
                <li class="nav-repair nav-item"><a href="#">Réparation</a></li>
                <li class="nav-defi nav-item"><a href="#">Défis</a></li>
                <li class="nav-compte nav-item"><a href="#">Mon compte</a></li>
            </ul>
            <div class="header-actions">
                <button class="btn-principal" id="header-btn" type="button" title="Page de connexion à venir">Se connecter</button>
                <button class="js-btn-menu" aria-label="Ouvrir la navigation mobile" aria-expanded="false" type="button">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    </header>
<?php
        $this->buffer = ob_get_clean();

        return $this;
    }

    public function display(): void
    {
        echo $this->buffer;
    }
}