# 🍃 SelecTri

**SelecTri** est une application web pédagogique de tri sélectif et de sensibilisation au recyclage, centrée sur la métropole de **Toulouse**. Le projet est développé dans le cadre du **Titre Professionnel Développeur Web et Web Mobile (Bac+2)**, en tant que projet fil rouge évalué lors d'une série d'oraux.

Contrairement aux portails institutionnels souvent froids et peu engageants, SelecTri mise sur une **UX chaleureuse et gamifiée** pour rendre le tri des déchets accessible et motivant, guidée par sa mascotte **Leafi**.

---

## 🎯 Objectifs du projet

- Aider les habitants de Toulouse Métropole à savoir **où et comment trier** leurs déchets
- Favoriser la **réparation plutôt que le remplacement** (dispositif Bonus Réparation, loi AGEC)
- Proposer une **expérience utilisateur différenciante** face aux sites institutionnels (charte graphique chaleureuse, mascotte, gamification)
- Sensibiliser à l'impact environnemental via une **estimation de CO₂ économisé** (indicative, non un chiffre d'émission précis)
- Encourager l'engagement sur la durée grâce à des **défis, badges et un profil personnalisé**
- Respecter les cadres réglementaires : **RGAA** (accessibilité), **RGPD**, **loi AGEC**

---

## ✨ Fonctionnalités clés

### 🔍 Navigation et recherche d'information
- **Barre de recherche dynamique** — recherche en temps réel parmi les consignes de tri, avec résultats renvoyant vers une fiche de consigne complète (où et comment jeter le déchet)
- **Carte des points de dépôt** — localisation interactive des points de dépôt à proximité à partir des données ouvertes de l'**ADEME** et de **Toulouse Métropole**, avec géolocalisation de l'utilisateur et filtres par type de déchet (verre, textile, piles, biodéchets, déchetterie, etc.)
- **Carte des réparateurs labellisés** — localisation des réparateurs éligibles au **Bonus Réparation** (données ADEME), pour favoriser la réparation dans l'esprit de la loi AGEC

### 🌱 Engagement éco-responsable
- **Défis mensuels** — proposés par l'administrateur ; l'utilisateur peut y participer, les déclarer réalisés et consulter son historique
- **Badges** — attribution automatique selon le nombre de défis réalisés, consultables sur le profil
- **Impact environnemental** — estimation du CO₂ économisé (à titre indicatif) en fonction des défis et tris réalisés

### 👤 Gestion du compte utilisateur
- Inscription et connexion sécurisées (mots de passe **hachés** avant stockage)
- Déconnexion à tout moment
- Récupération de compte par lien de réinitialisation envoyé par e-mail (durée de validité limitée)
- Profil dynamique et personnalisé (défis réalisés, CO₂ économisé estimé, badges obtenus)
- Modification des informations personnelles ou suppression définitive du compte
- Gestion des comptes par l'administrateur (consultation et suppression, sans droit de modification)

### 🛠️ Administration
- Gestion des consignes de tri (ajout, modification, suppression)
- Gestion des défis et des badges associés (création, modification, suppression)

### 🎨 Expérience utilisateur
- Interface **responsive** (PC, tablette, mobile)
- Identité visuelle dédiée : charte graphique SelecTri (typographie, palette de couleurs accessible, mascotte Leafi)
- Formulaire de contact pour questions ou signalements

---

## 🎨 Identité visuelle

Charte graphique **« Lime & Miel »** : palette chaude composée de 9 couleurs validées, avec un système de couleurs sémantiques par section (chaque rubrique de navigation possède une couleur signature retrouvée dans l'accordéon correspondant sur la fiche déchet). Typographies et contrastes vérifiés pour l'accessibilité.

> Les variables CSS de la charte sont centralisées dans `style.css` (custom properties).

---

## 🛠️ Stack technique

| Domaine | Technologies | Statut |
|---|---|---|
| Structure | HTML5 sémantique | ✅ En place |
| Style | CSS3 (custom properties, responsive / media queries) | ✅ En place |
| Comportement front | JavaScript (vanilla, sans framework) | ✅ En place |
| Back-end | PHP (POO) | 🔜 À venir |
| Conteneurisation | Docker | 🔜 À venir |
| Base de données | Comptes utilisateurs, consignes, défis, badges | 🔜 À venir |
| Cartographie | API carto (points de dépôt ADEME / Toulouse Métropole, réparateurs Bonus Réparation) | 🔜 À venir |
| Données ouvertes | Open data ADEME, Toulouse Métropole | 🔜 À venir |
| Versioning | Git / GitHub — méthodologie **GitFlow** | ✅ En place |
| Gestion de projet | Agile (backlog, user stories) | ✅ En place |

---

## 🌿 Conformité & bonnes pratiques

- **RGAA** — accessibilité numérique (contrastes, sémantique HTML, navigation clavier)
- **RGPD** — protection des données personnelles (comptes utilisateurs, mots de passe hachés)
- **Loi AGEC** — anti-gaspillage et économie circulaire (dispositif Bonus Réparation, contenu pédagogique)

---

## 🌳 Organisation Git (GitFlow)

```
main                      → version stable / production
develop                   → intégration des fonctionnalités
feature/accueil           → page d'accueil
feature/moteur-recherche  → moteur de recherche et fiches déchets
feature/carte-depot       → carte interactive des points de collecte
```

Les fichiers/assets partagés (charte graphique, styles communs) sont versionnés sur `develop` ; le développement spécifique à chaque fonctionnalité reste isolé sur sa branche dédiée jusqu'à validation puis fusion.

---

## 📁 Structure du projet

```
SelecTri/
├── index.html
├── consignes.html
├── fiche-dechet.html
├── style.css
├── data.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

*(structure indicative, front-end actuel — évoluera avec l'ajout du back-end PHP/Docker)*

---

## 🚀 Lancer le projet en local

Le front-end actuel (HTML/CSS/JS vanilla) ne nécessite aucune installation de dépendances.

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/<ton-compte>/SelecTri.git
   ```
2. Ouvrir `index.html` dans un navigateur, ou utiliser une extension de type *Live Server* pour un rechargement automatique.

*(Des instructions d'installation via Docker seront ajoutées une fois le back-end PHP en place.)*

---

## 🗺️ Roadmap

- [x] Charte graphique
- [x] Mise en place Git / GitFlow
- [x] Moteur de recherche (simulation front-end)
- [ ] Finalisation de la page d'accueil (responsive / media queries)
- [ ] Carte des points de dépôt (données ADEME / Toulouse Métropole, géolocalisation, filtres)
- [ ] Carte des réparateurs labellisés Bonus Réparation
- [ ] Défis mensuels + historique
- [ ] Badges automatiques
- [ ] Estimation du CO₂ économisé
- [ ] Comptes utilisateurs (inscription, connexion, récupération, profil, suppression)
- [ ] Back-office administrateur (consignes, défis, badges, comptes)
- [ ] Back-end PHP / POO + Docker
- [ ] Formulaire de contact

---

## 👩‍💻 Auteure

Projet réalisé par **Cheska**, dans le cadre du Titre Professionnel Développeur Web et Web Mobile (Bac+2).

---

## 📄 Licence

Projet pédagogique — usage dans le cadre de la formation.
