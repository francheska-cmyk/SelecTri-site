<?php

require_once __DIR__ . '/../vendor/autoload.php';

// Si le fichier demandé existe physiquement (CSS, JS, images...),
// on laisse le serveur PHP le servir directement, sans passer par le routeur.
if (PHP_SAPI === 'cli-server') {
    $cheminDemande = __DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if ($cheminDemande !== __DIR__ . '/' && is_file($cheminDemande)) {
        return false;
    }
}

use Utils\Utils;
use App\Views\ViewHome;
use App\Views\ViewWaste;
use App\Controllers\ControllerWaste;
use App\Models\ModelWasteType;

$url = parse_url($_SERVER['REQUEST_URI']);
$path = isset($url['path']) ? $url['path'] : '/';

switch ($path) {
    case '/':
        $view = new ViewHome('SelecTri - Accueil');
        $view->launchBuffer();
        $view->displayAll();
        break;

    case '/recherche':
        $controller = new ControllerWaste(new ModelWasteType(Utils::getConnection()), new ViewWaste('SelecTri - Recherche'));
        $controller->searchWaste();
        $controller->render();
        break;

    case '/fiche':
        $id = (int) ($_GET['id'] ?? 0);
        $controller = new ControllerWaste(new ModelWasteType(Utils::getConnection()), new ViewWaste('SelecTri - Fiche produit'));
        $controller->displayInstruction($id);
        $controller->render();
        break;

    default:
        http_response_code(404);
        echo "Erreur 404 : page non trouvée.";
        break;
}














// <?php

// require_once __DIR__ . '/../vendor/autoload.php';

// use Utils\Utils;

// use App\Views\ViewWaste;
// use App\Controllers\ControllerWaste;
// use App\Models\ModelWasteType;
// use App\Views\ViewHome;

// Récupère le "path" de l'URL demandé par l'utilisateur
// $url = parse_url($_SERVER['REQUEST_URI']);
// $path = isset($url['path']) ? $url['path'] : '/';

//  Appel du contrôleur lié à la route demandée
// switch ($path) {
//     case '/':
//     $view = new ViewHome('SelecTri - Accueil');
//     $view->launchBuffer();
//     $view->displayAll();
//     break;
//     case '/recherche':
//         $controller = new ControllerWaste(
//             new ModelWasteType(Utils::getConnection()),
//             new ViewWaste('SelecTri - Recherche')
//         );
//         $controller->searchWaste();
//         $controller->render();
//         break;

//     case '/fiche':
//         $id = (int) ($_GET['id'] ?? 0);
//         $controller = new ControllerWaste(
//             new ModelWasteType(Utils::getConnection()),
//             new ViewWaste('SelecTri - Fiche produit')
//         );
//         $controller->displayInstruction($id);
//         $controller->render();
//         break;

//     default:
//         http_response_code(404);
//         echo "Erreur 404 : page non trouvée.";
//         break;
// }