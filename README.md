# 🍃 SelecTri

**SelecTri** est une application web pédagogique de tri sélectif et de sensibilisation au recyclage, centrée sur la métropole de **Toulouse**. Le projet est développé dans le cadre du **Titre Professionnel Développeur Web et Web Mobile (Bac+2)**, en tant que projet fil rouge évalué lors d'une série d'oraux.

Contrairement aux portails institutionnels souvent froids et peu engageants, SelecTri mise sur une **UX chaleureuse et gamifiée** pour rendre le tri des déchets accessible et motivant, guidée par sa mascotte **Leafi**.

---

## 📊 État d'avancement

| Phase | Contenu | Statut |
|---|---|---|
| Cadrage & conception | Cahier des charges (analyse du besoin, personas, SWOT, matrice des risques), diagramme UML *Use Case*, wireframes & mockups | ✅ Fait |
| Développement front | Charte graphique, page d'accueil, moteur de recherche | 🔄 En cours |
| Développement back | Comptes utilisateurs, back-office admin, PHP/POO, Docker | 🔜 À venir |

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

**🔍 Navigation et recherche** — Barre de recherche dynamique des consignes de tri (renvoi vers une fiche complète), carte interactive des points de dépôt (données ADEME / Toulouse Métropole, géolocalisation, filtres par type de déchet), et carte des réparateurs labellisés Bonus Réparation (loi AGEC).

**🌱 Engagement éco-responsable** — Défis mensuels avec historique, badges attribués automatiquement selon les défis réalisés, et estimation indicative du CO₂ économisé.

**👤 Compte utilisateur** — Inscription/connexion sécurisées (mots de passe hachés), récupération de mot de passe par e-mail, profil dynamique personnalisé, modification ou suppression du compte.

**🛠️ Administration** — Back-office dédié pour gérer les consignes de tri, les défis et les badges, ainsi que les comptes utilisateurs (consultation et suppression).

**🎨 Expérience utilisateur** — Interface responsive, identité visuelle dédiée (charte graphique, mascotte Leafi), formulaire de contact.

---

## 🎨 Identité visuelle

Charte graphique **« Lime & Miel »** : palette chaude de 9 couleurs, avec un système sémantique par section de navigation. Audit d'accessibilité **RGAA** (contrastes WCAG) et **simulation de daltonisme** réalisés sur la palette.

> Variables CSS centralisées dans `style.css`.

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

## 📸 Aperçu

<!-- Ajouter les captures d'écran une fois disponibles, ex. : -->
<!-- ![Page d'accueil](assets/screenshots/accueil.png) -->
<!-- ![Moteur de recherche](assets/screenshots/recherche.png) -->

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

---

## 👩‍💻 Auteure

Projet réalisé par **Cheska**, dans le cadre du Titre Professionnel Développeur Web et Web Mobile (Bac+2).

---
