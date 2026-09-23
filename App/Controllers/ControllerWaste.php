<?php

namespace App\Controllers;

use App\Models\ModelWasteType;
use App\Models\ModelWasteCategory;
use App\Models\ModelInstruction;

class ControllerWaste extends Controller
{
    public function searchWaste(): void{
        $term = trim($_GET['q'] ?? '');
        $model = $this->getModel();
        $resultats = $term !== '' ? $model->search($term) : [];

        $this->getView()->displaySearchResults($resultats, $term);
    }

            /** @var ModelWasteType $model */

    public function displayInstruction(int $idWasteType): void{
        /** @var ModelWasteType $wasteTypeModel */
        $wasteTypeModel = $this->getModel();
        $wasteType = $wasteTypeModel->findById($idWasteType);

        if (empty($wasteType)) {
            $this->getView()->displayInstruction([]);
            return;
        }

        $categoryModel = new ModelWasteCategory($wasteTypeModel->getDb());
        $category = $categoryModel->findById((int) $wasteType['id_waste_category']);

        $instructionModel = new ModelInstruction($wasteTypeModel->getDb());
        $instruction = $instructionModel->findByCategory((int) $wasteType['id_waste_category']);

        $donnees = [
            'name'         => $wasteType['name'],
            'categorie'    => $category['name'] ?? '',
            'co2_value_kg' => $category['co2_value_kg'] ?? null,
            'consigne'     => $instruction['content'] ?? null,
        ];

        $this->getView()->displayInstruction($donnees);
    }

    public function displayCategories(): void{
        /** @var ModelWasteType $wasteTypeModel */
        $wasteTypeModel = $this->getModel();

        $categoryModel = new ModelWasteCategory($wasteTypeModel->getDb());
        $categories = $categoryModel->findAll();

        $this->getView()->displayCategories($categories);
    }

    public function render(): void{
        $this->getView()->displayAll();
    }
}