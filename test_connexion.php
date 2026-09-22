<?php
require __DIR__ . '/vendor/autoload.php';

use App\Database;

$pdo = Database::getConnection();
echo "Connexion OK. Nombre de déchets en base : "
. $pdo->query('SELECT COUNT(*) FROM waste_type')->fetchColumn() . "\n";