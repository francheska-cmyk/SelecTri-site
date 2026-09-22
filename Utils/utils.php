<?php
namespace Utils;

use PDO;

class Utils{

    // Une seule connexion, réutilisée partout. Demande si connexion déjà établie ou non avant envoie réponse : PDO
    private static ?PDO $pdo = null;

    public static function getConnection(): PDO{
        if (self::$pdo === null) {
            $bdd = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;

            self::$pdo = new PDO($bdd, DB_USER, DB_PASSWORD, [PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES   => false,]);
        }
        return self::$pdo;
    }
    public static function sanitize(string $data):string{
        return htmlentities(strip_tags(stripslashes(trim($data))));
    }

}