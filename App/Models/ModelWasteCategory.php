<?php

namespace App\Models;

use PDO;

class ModelWasteCategory extends Model
{
    private ?int $idCategory = null;
    private ?string $name = null;
    private ?float $co2ValueKg = null;

    public function getIdCategory(): ?int{
        return $this->idCategory;
    }

    public function setIdCategory(int $idCategory): self{
        $this->idCategory = $idCategory;
        return $this;
    }

    public function getName(): ?string{
        return $this->name;
    }

    public function setName(string $name): self{
        $this->name = $name;
        return $this;
    }

    public function getCo2ValueKg(): ?float{
        return $this->co2ValueKg;
    }

    public function setCo2ValueKg(float $co2): self{
        $this->co2ValueKg = $co2;
        return $this;
    }

    public function findAll(): array{
        $req = $this->getDb()->prepare('SELECT id, name, co2_value_kg FROM waste_category');
        $req->execute();

        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findById(int $id): array{
        $req = $this->getDb()->prepare('SELECT id, name, co2_value_kg FROM waste_category WHERE id = :id');
        $req->execute(['id' => $id]);

        return $req->fetch(PDO::FETCH_ASSOC) ?: [];
    }

    public function search(string $keyword): array{
        $req = $this->getDb()->prepare('SELECT id, name, co2_value_kg FROM waste_category WHERE name LIKE :kw');
        $req->execute(['kw' => '%' . $keyword . '%']);

        return $req->fetchAll(PDO::FETCH_ASSOC);
    }
}
