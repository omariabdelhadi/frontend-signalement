# Signalement App : Frontend

Interface web Angular d'une application de **signalement citoyen** avec un agent IA, selon le rôle de l'utilisateur (Administrateur / Utilisateur).

> **Dépôt backend (Spring Boot) :** [backend-signalement](https://github.com/omariabdelhadi/backend-signalement)

## Objectif

- créer et consulter des signalements (titre, description, pièces jointes) ;
- se connecter de façon sécurisée ;
- utiliser l'agent IA adapté à son rôle.

## Technologies

| Domaine | Technologies |
|---|---|
| Framework | Angular, TypeScript |
| Authentification | JWT (via l'API backend) |
| Backend | Spring Boot ([dépôt séparé](https://github.com/omariabdelhadi/backend-signalement)) |

## Lancer le projet

### Prérequis

- Node.js et npm
- Angular CLI : `npm install -g @angular/cli`
- Le backend démarré sur `http://localhost:8080`

### Installation et démarrage

```bash
git clone https://github.com/omariabdelhadi/frontend-signalement.git
cd frontend-signalement
npm install
ng serve
```

Ouvre `http://localhost:4200`. L'application se recharge à chaque modification.

### Build de production

```bash
ng build
```

Les fichiers générés se trouvent dans `dist/`.
