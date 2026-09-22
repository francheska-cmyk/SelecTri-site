<?php

namespace App\Views;

class ViewFooter
{
    private string $buffer = '';

    public function launchBuffer(): self
    {
        ob_start();
?>
    <footer>
        <nav aria-label="navigateur-secondaire">
            <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="#">Mentions légales</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Cookies</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">CGU / Politique de confidentialité</a></li>
            </ul>
        </nav>
        <div class="footer-bas">
            <span class="rs">
                <img src="/assets/images/UI_icone/facebook-logo.svg" alt="logo de facebook">
                <img src="/assets/images/UI_icone/instagram-logo.svg" alt="logo d'instagram">
                <img src="/assets/images/UI_icone/x-logo.svg" alt="logo de réseau social X">
            </span>
            <span class="nom-site">
                <span>&copy;2026</span>
                <span class="logo-selec">Selec</span><span class="logo-tri">Tri</span>
            </span>
        </div>
    </footer>
    <script src="/assets/js/main.js"></script>
</body>
</html>
<?php
        $this->buffer = ob_get_clean();

        return $this;
    }

    public function display(): void
    {
        echo $this->buffer;
    }
}