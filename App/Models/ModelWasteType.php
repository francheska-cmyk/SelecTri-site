<?php

namespace App\Models;

use PDO;

class ModelWasteType extends Model
{
    private ?int $idType = null;
    private ?string $name = null;
    private ?int $idCategory = null;

    public function getIdType(): ?int{
        return $this->idType;
    }

    public function setIdType(int $idType): self{
        $this->idType = $idType;
        return $this;
    }

    public function getName(): ?string{
        return $this->name;
    }

    public function setName(string $name): self{
        $this->name = $name;
        return $this;
    }

    public function getIdCategory(): ?int{
        return $this->idCategory;
    }

    public function setIdCategory(int $idCategory): self{
        $this->idCategory = $idCategory;
        return $this;
    }

    public function findAll(): array{
        $req = $this->getDb()->prepare('SELECT id, name, id_waste_category FROM waste_type');
        $req->execute();

        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findByCategory(int $idCategory): array{
        $req = $this->getDb()->prepare('SELECT id, name, id_waste_category FROM waste_type WHERE id_waste_category = :id');
        $req->execute(['id' => $idCategory]);

        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

    // Methode pou retrouver UN déchet précis par son id (fiche produit)
    public function findById(int $id): array{
        $req = $this->getDb()->prepare('SELECT id, name, id_waste_category FROM waste_type WHERE id = :id');
        $req->execute(['id' => $id]);

        return $req->fetch(PDO::FETCH_ASSOC) ?: [];
    }

    // Methode pour recherche par nom (saisie : key) dans la barre de recherche
    public function search(string $keyword): array{
        $req = $this->getDb()->prepare(
            'SELECT wt.id, wt.name, wc.name AS categorie, wc.co2_value_kg
            FROM waste_type wt
            JOIN waste_category wc ON wc.id = wt.id_waste_category
            WHERE wt.name LIKE :kw');
        $req->execute(['kw' => '%' . $keyword . '%']);

        return $req->fetchAll(PDO::FETCH_ASSOC);
    }
}
