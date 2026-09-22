<?php

namespace App\Controllers;

use App\Models\Model;
use App\Views\View;

// Classe mère Controller (inchangée). render() est vide ici : chaque
// Controller fille (ex. ControllerWaste) définit SA façon d'afficher, render() se lance après l'action

class Controller
{
    private Model $model;
    private View $view;

    public function __construct(Model $model, View $view){
        $this->model = $model;
        $this->view = $view;
    }

    public function getModel(): Model{
        return $this->model;
    }

    public function setModel(Model $model): self{
        $this->model = $model;
        return $this;
    }

    public function getView(): View{
        return $this->view;
    }

    public function setView(View $view): self{
        $this->view = $view;
        return $this;
    }

    public function render(): void{
        // Chaque Controller enfant définit sa propre logique
    }
}