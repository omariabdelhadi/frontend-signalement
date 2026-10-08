# Signalement App : Frontend

Interface web Angular d'une application de **signalement citoyen** avec un chatbot IA, selon le rôle de l'utilisateur (Administrateur / Utilisateur).

> **Dépôts liés :** [backend-signalement](https://github.com/omariabdelhadi/backend-signalement) · [agent-signalement](https://github.com/omariabdelhadi/agent-signalement) (chatbot IA)

## Objectif

- créer et consulter des signalements (titre, description, pièces jointes) ;
- se connecter de façon sécurisée ;
- discuter avec l'agent IA adapté à son rôle.

## Technologies

| Domaine | Technologies |
|---|---|
| Framework | Angular, TypeScript |
| Authentification | JWT (via l'API backend) |
| Backend | Spring Boot ([dépôt séparé](https://github.com/omariabdelhadi/backend-signalement)) |
| Agent IA | Spring Boot ([dépôt séparé](https://github.com/omariabdelhadi/agent-signalement)) |

## Lancer le projet

### Prérequis

- Node.js et npm
- Angular CLI : `npm install -g @angular/cli`
- Le backend démarré sur `http://localhost:8080`
- Le service de l'agent IA démarré

### Installation et démarrage

```bash
git clone https://github.com/omariabdelhadi/frontend-signalement.git
cd frontend-signalement
npm install
ng serve
```

Ouvre `http://localhost:4200`.

### Build de production

```bash
ng build
```

Les fichiers générés se trouvent dans `dist/`.
