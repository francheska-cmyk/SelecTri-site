<?php

namespace App\Models;

use PDO;

class ModelInstruction extends Model
{
    private ?int $idInstruction = null;
    private ?string $content = null;
    private ?string $createdAt = null;
    private ?string $updatedAt = null;
    private ?int $idCategory = null;

    public function getIdInstruction(): ?int{
        return $this->idInstruction;
    }

    public function setIdInstruction(int $idInstruction): self{
        $this->idInstruction = $idInstruction;
        return $this;
    }

    public function getContent(): ?string{
        return $this->content;
    }

    public function setContent(string $content): self{
        $this->content = $content;
        return $this;
    }

    public function findAll(): array{
        $req = $this->getDb()->prepare('SELECT id, content, id_waste_category FROM instruction');
        $req->execute();

        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findById(int $id): array{
        $req = $this->getDb()->prepare('SELECT id, content, id_waste_category FROM instruction WHERE id = :id');
        $req->execute(['id' => $id]);

        return $req->fetch(PDO::FETCH_ASSOC) ?: [];
    }

    public function findByCategory(int $idCategory): array{
        $req = $this->getDb()->prepare('SELECT id, content, id_waste_category FROM instruction WHERE id_waste_category = :id');
        $req->execute(['id' => $idCategory]);

        return $req->fetch(PDO::FETCH_ASSOC) ?: [];
    }

    public function search(string $keyword): array{
        $req = $this->getDb()->prepare('SELECT id, content, id_waste_category FROM instruction WHERE content LIKE :kw');
        $req->execute(['kw' => '%' . $keyword . '%']);

        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add(): void{
        // Administration : à écrire plus tard
    }

    public function update(): void{
        // Administration : à écrire plus tard
    }

    public function delete(): void{
        // Administration : à écrire plus tard
    }
}
