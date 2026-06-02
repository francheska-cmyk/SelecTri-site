const DECHETS = [
{
    id: "bouteille-verre",
    nom: "Bouteille d'eau en verre",
    categorie: "Verre",
    icone: "🍾",
    description: "Le verre se recycle à l'infini sans perdre sa qualité.",
    consigne: "Déposez dans le conteneur à verre de votre quartier. Retirez le bouchon et la capsule métallique avant.",
    bonsGestes: [
    "Retirez le bouchon  ou capsule avant de déposer",
    "Ne jamais jeter dans la poubelle grise"
    ],
    co2: "0.3 kg de CO2 / an",
    ficheComplete: true   
},
{
    id: "pot-confiture",
    nom: "Pot de confiture",
    categorie: "verre",
    categorieLabel: "Verre",
    poubelle: "Conteneur à verre (colonne verte)",
    icone: "🫙",
    description: "Le verre alimentaire se recycle facilement dans les colonnes de collecte.",
    consigne: "Déposez dans le conteneur à verre. Retirez le couvercle métallique.",
    bons_gestes: [
    "Retirez le couvercle avant de trier",
    "Rincez le pot avant dépôt",
    "Pas besoin d'enlever l'étiquette"
    ],
    co2: "0.2 kg de CO2 / an",
    plusRecherche: false
},
{
    id: "canette-soda",
    nom: "Canette de soda",
    categorie: "metal",
    categorieLabel: "Métal",
    poubelle: "Bac de tri jaune",
    icone: "🥤",
    description: "L'aluminium est l'un des matériaux les plus recyclables : recyclé en 60 jours !",
    consigne: "Mettez dans le bac de tri jaune. Écrasez-la pour gagner de la place.",
    bons_gestes: [
    "Rincez la canette avant de trier",
    "Écrasez-la pour gagner de la place",
    "Ne pas laisser de liquide à l'intérieur"
    ],
    co2: "0.5 kg de CO2 / an",
    plusRecherche: true
},
]
