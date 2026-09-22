<?php

namespace App\Views;

//Classe mère View avec les héritages.
//launchBuffer() doit être écrit parchaque View fille (ex. ViewWaste), en fonction de ce qu'elle affiche.


class View
{
    private ?array $data = null;
    private ViewHeader $header;
    private ViewFooter $footer;
    private string $buffer = '';

    public function __construct(string $title = 'SelecTri')
    {
        $this->header = new ViewHeader($title);
        $this->footer = new ViewFooter();
    }

    public function getData(): ?array{
        return $this->data;
    }

    public function setData(array $data): self{
        $this->data = $data;
        return $this;
    }
    

    public function getBuffer(): string{
        return $this->buffer;
    }

    public function setBuffer(string $buffer): self{
        $this->buffer = $buffer;
        return $this;
    }

    public function display(): void{
        echo $this->buffer;
    }

    public function displayAll(): void{
        $this->header->launchBuffer()->display();
        $this->launchBuffer()->display();
        $this->footer->launchBuffer()->display();
    }
}
